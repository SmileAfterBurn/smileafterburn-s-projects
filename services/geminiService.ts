
import { GoogleGenAI, GenerateContentResponse, LiveServerMessage, Modality } from "@google/genai";
import { Organization } from "../types";

// Safe access to API Key to prevent ReferenceError if process is undefined
const getApiKey = () => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    console.warn("process.env.API_KEY is not accessible");
    return undefined;
  }
};

const getClient = () => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API Key not found. Please ensure process.env.API_KEY is set.");
  }

  return new GoogleGenAI({ apiKey });
};

// --- Text Analysis ---

export const analyzeData = async (
  query: string, 
  organizations: Organization[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Prepare concise context with ALL available details including new detailed fields
    const dataContext = JSON.stringify(organizations.map(o => ({
      name: o.name,
      address: o.address,
      services: o.services,
      phone: o.phone,
      email: o.email,
      category: o.category,
      budget: o.budget, 
      status: o.status, 
      region: o.region,
      workingHours: o.workingHours,
      additionalPhones: o.additionalPhones,
      establishedDate: o.establishedDate
    })), null, 2);
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `База даних організацій: ${dataContext}\n\nЗапитання користувача: ${query}`,
      config: {
        temperature: 0.6, 
        systemInstruction: `Ти — пані Думка, турботлива та мудра цифрова помічниця із соціальних питань. Ти працюєш на Всеукраїнській Мапі соціальних послуг.

ТВОЯ ОСОБИСТІСТЬ:
- Тон: **доброзичливий, заспокійливий, оптимістичний**.
- Мова: **Виключно українська**.

ТВОЇ ФУНКЦІЇ:
1. **Детальна інформація**: Якщо запитують деталі, використовуй графік роботи, додаткові телефони та дату заснування.
2. **Пошук допомоги**: Допомагай знайти послуги за запитом у конкретному регіоні.
3. **Перенаправлення**: Нагадуй про кнопку "Запит на перенаправлення".

ПРАВИЛА ВІДПОВІДІ:
- Будь лаконічною, але теплою.
- Використовуй жирний шрифт для **назв**, **телефонів** та **графіку роботи**.
- Якщо даних немає, порадь зателефонувати.`
      }
    });

    return response.text || "Вибачте, я зараз не можу відповісти. Спробуйте пізніше.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a friendly message instead of throwing
    return "Вибачте, виникла технічна помилка зі зв'язком. Спробуйте ще раз або перевірте налаштування ключа.";
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
        console.error("Failed to initialize Gemini client:", e);
        this.client = null;
    }
  }

  async connect() {
    if (!this.client) {
        console.error("Gemini client is not initialized.");
        this.disconnect();
        throw new Error("API Key missing");
    }

    this.isActive = true;
    this.onStatusChange(true);

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
          throw new Error("AudioContext not supported");
      }

      this.inputAudioContext = new AudioContextClass({ sampleRate: 16000 });
      this.outputAudioContext = new AudioContextClass({ sampleRate: 24000 });
      
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.error("Microphone access denied:", err);
        throw new Error("Microphone access denied");
      }

      // Prepare Context
      const dataContext = JSON.stringify(this.organizations.map(o => ({
        name: o.name,
        address: o.address,
        services: o.services,
        region: o.region,
        phone: o.phone,
        category: o.category,
        workingHours: o.workingHours
      })), null, 2);

      const sessionPromise = this.client.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `Ти — пані Думка, голос підтримки Всеукраїнської Мапи соціальних послуг. Тон: доброзичливий. Мова: Українська. Допомагай знайти послуги. Дані: ${dataContext}`,
        },
        callbacks: {
          onopen: () => {
            console.log('Live Session Opened');
            this.startAudioStream(sessionPromise);
          },
          onmessage: async (message: LiveServerMessage) => {
            await this.handleMessage(message);
          },
          onclose: () => {
            console.log('Live Session Closed');
            this.disconnect();
          },
          onerror: (err) => {
            console.error('Live Session Error:', err);
            this.disconnect();
          }
        }
      });
      
      this.session = sessionPromise;

    } catch (error) {
      console.error("Failed to start live session", error);
      this.disconnect();
      throw error; // Re-throw to be caught by UI
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
        session.sendRealtimeInput({ media: pcmBlob });
      });
    };

    this.inputSource.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.inputAudioContext.destination);
  }

  private async handleMessage(message: LiveServerMessage) {
    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio && this.outputAudioContext) {
      try {
        const audioData = this.decodeBase64(base64Audio);
        const audioBuffer = await this.decodeAudioData(
          audioData, 
          this.outputAudioContext, 
          24000, 
          1
        );
        
        this.playAudio(audioBuffer);
      } catch (e) {
        console.error("Audio decoding error", e);
      }
    }

    if (message.serverContent?.interrupted) {
      this.stopAllAudio();
    }
  }

  private playAudio(buffer: AudioBuffer) {
    if (!this.outputAudioContext) return;
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
    this.sources.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    this.sources.clear();
    this.nextStartTime = 0;
  }

  disconnect() {
    this.isActive = false;
    this.onStatusChange(false);
    this.stopAllAudio();

    if (this.session) {
      this.session.then((s: any) => {
        try { s.close(); } catch(e) {}
      });
    }

    try {
      if (this.scriptProcessor) this.scriptProcessor.disconnect();
      if (this.inputSource) this.inputSource.disconnect();
      this.stream?.getTracks().forEach(track => track.stop());
      this.inputAudioContext?.close();
      this.outputAudioContext?.close();
    } catch(e) {
      console.warn("Error closing audio contexts", e);
    }
    
    this.session = null;
    this.stream = null;
  }

  private createBlob(data: Float32Array) {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      let s = Math.max(-1, Math.min(1, data[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    const bytes = new Uint8Array(int16.buffer);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return {
      data: btoa(binary),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  private decodeBase64(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  private async decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }
}
