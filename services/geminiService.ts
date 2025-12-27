
import { GoogleGenAI, GenerateContentResponse, LiveServerMessage, Modality } from "@google/genai";
import { Organization } from "../types";

const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("API_KEY access error:", e);
  }
  return undefined;
};

const getClient = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key not found.");
  }
  return new GoogleGenAI({ apiKey });
};

// --- Neural Text-to-Speech (High Quality) ---

export const generateSpeech = async (text: string): Promise<ArrayBuffer> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Скажи емпатично, лагідно та з турботою: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is warm and professional
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio data returned");

    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("TTS Generation Error:", error);
    throw error;
  }
};

// --- Text Analysis ---

export const analyzeData = async (
  query: string, 
  organizations: Organization[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    const dataContext = JSON.stringify(organizations.map(o => ({
      name: o.name,
      address: o.address,
      services: o.services,
      phone: o.phone,
      email: o.email,
      category: o.category,
      status: o.status, 
      region: o.region,
      establishedDate: o.establishedDate
    })), null, 2);
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `База даних організацій: ${dataContext}\n\nЗапитання користувача: ${query}`,
      config: {
        temperature: 0.7, 
        systemInstruction: `Ти — пані Думка, емпатична цифрова помічниця. Твій тон: теплий, материнський, турботливий. Мова: Виключно українська. Твоя місія — допомогти знайти підтримку.`
      }
    });

    return response.text || "Вибачте, я зараз не можу відповісти.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Вибачте, виникла технічна помилка.";
  }
};

// --- Live Audio Session ---

export class LiveSession {
  private client: GoogleGenAI | null = null;
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private nextStartTime = 0;
  private sources = new Set<AudioBufferSourceNode>();
  private session: any = null;
  private stream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private inputSource: MediaStreamAudioSourceNode | null = null;
  private isActive = false;

  constructor(private organizations: Organization[], private onStatusChange: (active: boolean) => void) {
    try {
        this.client = getClient();
    } catch (e) {
        this.client = null;
    }
  }

  async connect() {
    if (!this.client) throw new Error("API Key missing");

    this.isActive = true;
    this.onStatusChange(true);

    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      this.inputAudioContext = new AudioContextClass({ sampleRate: 16000 });
      this.outputAudioContext = new AudioContextClass({ sampleRate: 24000 });
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const dataContext = JSON.stringify(this.organizations.map(o => ({
        name: o.name,
        address: o.address,
        services: o.services,
        region: o.region
      })), null, 2);

      const sessionPromise = this.client.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `Ти — пані Думка. Твій голос має звучати лагідно та емпатично. Допомагай знайти послуги. Дані: ${dataContext}`,
        },
        callbacks: {
          onopen: () => this.startAudioStream(sessionPromise),
          onmessage: async (message: LiveServerMessage) => await this.handleMessage(message),
          onclose: () => this.disconnect(),
          onerror: () => this.disconnect()
        }
      });
      this.session = sessionPromise;
    } catch (error) {
      this.disconnect();
      throw error;
    }
  }

  private startAudioStream(sessionPromise: Promise<any>) {
    if (!this.inputAudioContext || !this.stream) return;
    this.inputSource = this.inputAudioContext.createMediaStreamSource(this.stream);
    this.scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);
    this.scriptProcessor.onaudioprocess = (e) => {
      if (!this.isActive) return;
      const inputData = e.inputBuffer.getChannelData(0);
      const pcmBlob = this.createBlob(inputData);
      sessionPromise.then((session) => {
        if (this.isActive) session.sendRealtimeInput({ media: pcmBlob });
      });
    };
    this.inputSource.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.inputAudioContext.destination);
  }

  private async handleMessage(message: LiveServerMessage) {
    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    if (base64Audio && this.outputAudioContext && this.isActive) {
      const audioData = this.decodeBase64(base64Audio);
      const audioBuffer = await this.decodeAudioData(audioData, this.outputAudioContext, 24000, 1);
      this.playAudio(audioBuffer);
    }
    if (message.serverContent?.interrupted) this.stopAllAudio();
  }

  private playAudio(buffer: AudioBuffer) {
    if (!this.outputAudioContext || !this.isActive) return;
    this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
    const source = this.outputAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.outputAudioContext.destination);
    source.onended = () => this.sources.delete(source);
    source.start(this.nextStartTime);
    this.nextStartTime += buffer.duration;
    this.sources.add(source);
  }

  private stopAllAudio() {
    this.sources.forEach(source => { try { source.stop(); } catch(e) {} });
    this.sources.clear();
    this.nextStartTime = 0;
  }

  disconnect() {
    this.isActive = false;
    this.onStatusChange(false);
    this.stopAllAudio();
    if (this.session) this.session.then((s: any) => { try { s.close(); } catch(e) {} });
    try {
      this.scriptProcessor?.disconnect();
      this.inputSource?.disconnect();
      this.stream?.getTracks().forEach(track => track.stop());
      this.inputAudioContext?.close();
      this.outputAudioContext?.close();
    } catch(e) {}
    this.session = null;
    this.stream = null;
  }

  private createBlob(data: Float32Array) {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      let s = Math.max(-1, Math.min(1, data[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    const bytes = new Uint8Array(int16.buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' };
  }

  private decodeBase64(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  private async decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  }
}
