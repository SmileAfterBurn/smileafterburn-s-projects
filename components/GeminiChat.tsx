
import React, { useState, useRef, useEffect } from 'react';
// Added X icon to imports
import { Send, User, Loader2, Download, Type, Eye, Mic, MicOff, Volume2, PlayCircle, Heart, X } from 'lucide-react';
import { analyzeData, generateSpeech } from '../services/geminiService';
import { Organization, ChatMessage } from '../types';

const PANI_DUMKA_AVATAR = "https://drive.google.com/thumbnail?id=1CKyZ-yqoy3iEKIqnXkrg07z0GmK-e099&sz=w256";
const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop";

interface GeminiChatProps {
  organizations: Organization[];
  isOpen: boolean;
  onClose: () => void;
  onOpenPresentation?: () => void;
}

// Extend window interface for Web Speech API
interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

export const GeminiChat: React.FC<GeminiChatProps> = ({ organizations, isOpen, onClose, onOpenPresentation }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Вітаю вас, сонечко! Я пані Думка. \n\nЯ допоможу вам знайти підтримку у будь-якому куточку нашої країни. \n\nСьогодні ми також шукаємо партнерів для розвитку мапи (дивіться нашу **презентацію**) та збираємо кошти на нове обладнання, щоб працювати ще швидше. \n\nЧим я можу вам допомогти?',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages, isOpen, isLargeText]);

  // Initialize Speech Recognition
  useEffect(() => {
    const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow;
    const SpeechRecognitionConstructor = SpeechRecognition || webkitSpeechRecognition;

    if (SpeechRecognitionConstructor) {
      const recognition = new SpeechRecognitionConstructor();
      recognition.lang = 'uk-UA';
      recognition.continuous = false; // Stop after silence
      recognition.interimResults = true; // Show text while speaking

      recognition.onstart = () => setIsRecording(true);
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onend = () => setIsRecording(false);
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      stopAudioPlayback();
      audioContextRef.current?.close();
    };
  }, []);

  const stopAudioPlayback = () => {
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop(); } catch(e) {}
      sourceNodeRef.current = null;
    }
    setSpeakingMessageId(null);
  };

  const speakText = async (msgId: string, text: string) => {
    if (speakingMessageId === msgId) { stopAudioPlayback(); return; }
    stopAudioPlayback();
    setSpeakingMessageId(msgId);
    try {
      const cleanText = text.replace(/\*\*/g, '').replace(/<br\/>/g, ' ');
      const audioData = await generateSpeech(cleanText);
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const dataInt16 = new Int16Array(audioData);
      const buffer = audioContextRef.current.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => { if (speakingMessageId === msgId) setSpeakingMessageId(null); };
      source.start(0);
      sourceNodeRef.current = source;
    } catch (e) {
      setSpeakingMessageId(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const responseText = await analyzeData(input, organizations);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Ваш браузер не підтримує голосове введення.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setInput(''); // Clear input before new dictation
      recognitionRef.current.start();
    }
  };

  if (!isOpen) return null;

  const textSizeClass = isLargeText ? 'text-lg md:text-xl' : 'text-sm md:text-base font-medium';
  const containerClass = isHighContrast ? 'bg-black text-white' : 'bg-white text-slate-900';

  return (
    <div className={`fixed inset-0 md:inset-y-0 md:right-0 md:w-[500px] shadow-2xl z-[5500] flex flex-col transform transition-transform duration-300 ease-in-out ${containerClass}`}>
      
      {/* Header */}
      <div className={`shrink-0 p-4 flex flex-col gap-3 border-b ${isHighContrast ? 'border-yellow-400 bg-slate-900 text-yellow-400' : 'bg-teal-700 text-white'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white shrink-0">
               <img src={PANI_DUMKA_AVATAR} alt="Думка" className="w-full h-full object-cover" />
             </div>
             <div>
               <h3 className="font-black text-lg md:text-xl leading-none uppercase tracking-tight">Пані Думка</h3>
               <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Цифрова помічниця</span>
             </div>
          </div>
          {/* Close button with X icon */}
          <button onClick={onClose} className="p-2 hover:bg-black/20 rounded-full transition-all"><X size={24} /></button>
        </div>
        
        <div className="flex items-center gap-2">
           <button onClick={() => setIsLargeText(!isLargeText)} className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${isLargeText ? 'bg-white text-teal-700' : 'bg-white/10 border-white/20'}`}>A+</button>
           <button onClick={() => setIsHighContrast(!isHighContrast)} className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${isHighContrast ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-white/10 border-white/20'}`}>Контраст</button>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar ${isHighContrast ? 'bg-black' : 'bg-slate-50'}`}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl shadow-sm leading-relaxed ${textSizeClass} ${msg.role === 'user' ? (isHighContrast ? 'bg-yellow-400 text-black font-bold' : 'bg-teal-600 text-white') : (isHighContrast ? 'bg-slate-900 text-white border-2 border-yellow-400' : 'bg-white text-slate-800 border border-slate-200')}`}>
              <div className="flex items-center justify-between mb-2 opacity-60 text-[9px] font-black uppercase tracking-[0.2em]">
                <span>{msg.role === 'model' ? 'Думка' : 'Ви'}</span>
                {msg.role === 'model' && (
                  <button onClick={() => speakText(msg.id, msg.text)} className={`p-1 rounded-full transition-all ${speakingMessageId === msg.id ? 'bg-teal-100 text-teal-600 animate-pulse' : 'hover:bg-slate-100'}`}>
                    <Volume2 size={14} />
                  </button>
                )}
              </div>
              <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
            <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`p-4 rounded-2xl shadow-sm ${isHighContrast ? 'bg-slate-900 border-yellow-400 border-2' : 'bg-white border-slate-200 border'}`}>
               <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`shrink-0 p-4 border-t ${isHighContrast ? 'border-yellow-400 bg-black' : 'bg-white'}`}>
        
        {/* Quick Actions */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
           <button onClick={onOpenPresentation} className="shrink-0 flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 active:scale-95 transition-all">
             <PlayCircle size={14} /> Презентація
           </button>
           <button onClick={() => setInput("Як підтримати проект?")} className="shrink-0 flex items-center gap-2 px-3 py-2 bg-rose-50 text-rose-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-100 active:scale-95 transition-all">
             <Heart size={14} fill="currentColor" /> Збір 158к
           </button>
        </div>

        <div className="flex gap-3 items-end">
          <button onClick={toggleRecording} className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90 ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`} title="Диктувати повідомлення">
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder={isRecording ? "Кажіть, я записую..." : "Напишіть пані Думці..."}
              className={`w-full p-3 pr-12 rounded-2xl border outline-none focus:ring-4 transition-all resize-none max-h-32 min-h-[48px] ${isHighContrast ? 'bg-slate-900 text-yellow-400 border-yellow-400 focus:ring-yellow-400/20' : 'bg-slate-50 border-slate-200 focus:border-teal-500 focus:ring-teal-500/10'}`}
              rows={1}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="absolute right-2 bottom-2 w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-xl shadow-lg active:scale-90 transition-all disabled:opacity-50">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
