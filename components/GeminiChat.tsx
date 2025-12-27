
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, Download, Type, Eye, Mic, MicOff, Volume2 } from 'lucide-react';
import { analyzeData, LiveSession, generateSpeech } from '../services/geminiService';
import { Organization, ChatMessage } from '../types';

const PANI_DUMKA_AVATAR = "https://drive.google.com/thumbnail?id=1CKyZ-yqoy3iEKIqnXkrg07z0GmK-e099&sz=w256";
const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop";

interface GeminiChatProps {
  organizations: Organization[];
  isOpen: boolean;
  onClose: () => void;
}

export const GeminiChat: React.FC<GeminiChatProps> = ({ organizations, isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Вітаю вас! Я пані Думка, ваша цифрова помічниця. \n\nЯ можу:\n- Знайти контакти допомоги у вашому місті.\n- Підказати номери гарячих ліній.\n- Просто підтримати та вислухати.\n\nЯкщо вам потрібна дистанційна допомога (юрист, психолог онлайн), запитайте мене або натисніть кнопку **"Дистанційна підтримка"** у меню.',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  
  // Voice Chat State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const liveSessionRef = useRef<LiveSession | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLargeText]);

  useEffect(() => {
    return () => {
      if (liveSessionRef.current) liveSessionRef.current.disconnect();
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
    if (speakingMessageId === msgId) {
      stopAudioPlayback();
      return;
    }
    
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
      for (let i = 0; i < dataInt16.length; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => {
        if (speakingMessageId === msgId) setSpeakingMessageId(null);
      };
      source.start(0);
      sourceNodeRef.current = source;
    } catch (e) {
      console.error("Speech playback error", e);
      setSpeakingMessageId(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await analyzeData(input, organizations);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceChat = async () => {
    if (isVoiceActive) {
      if (liveSessionRef.current) {
        liveSessionRef.current.disconnect();
        liveSessionRef.current = null;
      }
    } else {
      try {
        liveSessionRef.current = new LiveSession(organizations, (active) => {
          setIsVoiceActive(active);
        });
        await liveSessionRef.current.connect();
      } catch (e) {
        alert("Не вдалося запустити голосовий чат.");
      }
    }
  };

  const handleDownloadTranscript = () => {
    if (messages.length <= 1) return;
    const textContent = messages
      .map(m => `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.role === 'model' ? 'пані Думка' : 'Користувач'}:\n${m.text}\n`)
      .join('\n-------------------\n');
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-transcript.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_AVATAR;
  };

  if (!isOpen) return null;

  const textSizeClass = isLargeText ? 'text-lg' : 'text-sm font-medium';
  
  const containerClass = isHighContrast 
    ? 'bg-black text-white border-l-4 border-yellow-400' 
    : 'bg-white text-slate-900 border-l border-slate-200';

  const headerClass = isHighContrast
    ? 'bg-slate-900 border-b-2 border-yellow-400 text-yellow-400'
    : "bg-teal-700 bg-[url('https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center border-b border-white/20 text-white";

  const messageUserClass = isHighContrast
    ? 'bg-yellow-400 text-black border-2 border-white font-bold'
    : 'bg-teal-600 text-white';

  const messageModelClass = isHighContrast
    ? 'bg-black text-white border-2 border-white font-medium'
    : 'bg-white text-slate-800 border border-slate-100';

  return (
    <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${containerClass}`}>
      <div className={`p-4 flex flex-col gap-3 shadow-md z-10 ${headerClass}`}>
        <div className={`absolute inset-0 bg-black/40 pointer-events-none ${isHighContrast ? 'hidden' : 'block'}`}></div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full border-2 overflow-hidden flex-shrink-0 bg-white ${isHighContrast ? 'border-yellow-400' : 'border-white'}`}>
              <img src={PANI_DUMKA_AVATAR} alt="Avatar" onError={handleImageError} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white leading-tight">пані Думка</h3>
              <div className="flex items-center gap-2">
                 <span className="text-white/80 text-xs font-medium">Ваша помічниця</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
             <button onClick={handleDownloadTranscript} className="p-2 rounded hover:bg-white/20 text-white"><Download className="w-5 h-5" /></button>
             <button onClick={onClose} className="p-2 rounded hover:bg-white/20 text-white">✕</button>
          </div>
        </div>

        <div className={`relative z-10 flex items-center justify-between px-2 py-1.5 rounded ${isHighContrast ? 'bg-slate-800 border border-white' : 'bg-black/30 backdrop-blur-sm border border-white/20'}`}>
           <div className="flex items-center gap-2">
              <button onClick={() => setIsLargeText(!isLargeText)} className="p-1.5 rounded flex items-center gap-1 text-xs font-bold text-white hover:bg-white/20"><Type className="w-4 h-4" /> A+</button>
              <button onClick={() => setIsHighContrast(!isHighContrast)} className="p-1.5 rounded flex items-center gap-1 text-xs font-bold text-white hover:bg-white/20"><Eye className="w-4 h-4" /> Контраст</button>
           </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-5 ${isHighContrast ? 'bg-black' : 'bg-slate-50'}`}>
        {isVoiceActive && (
          <div className="sticky top-0 z-20 flex justify-center pb-4">
             <div className="bg-rose-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-3 animate-pulse">
                <Mic className="w-4 h-4" />
                <span className="text-sm font-bold">Слухаю...</span>
             </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl shadow-sm leading-relaxed relative ${textSizeClass} ${msg.role === 'user' ? `${messageUserClass} rounded-br-none` : `${messageModelClass} rounded-bl-none`}`}>
              <div className="flex items-center justify-between mb-1 opacity-80 text-[10px] uppercase font-bold tracking-wider">
                <span>{msg.role === 'model' ? 'пані Думка' : 'Ви'}</span>
                {msg.role === 'model' && (
                  <button 
                    onClick={() => speakText(msg.id, msg.text)}
                    className={`p-1 rounded hover:bg-black/10 transition-colors ${speakingMessageId === msg.id ? 'text-teal-600 animate-pulse' : ''}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`p-4 rounded-xl rounded-bl-none shadow-sm flex items-center gap-3 ${messageModelClass}`}>
              <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-4 ${isHighContrast ? 'bg-black border-t-2 border-yellow-400' : 'bg-white border-t border-slate-100'}`}>
        <div className="flex gap-3">
          <button onClick={toggleVoiceChat} className={`p-3 rounded-full transition-all shadow-md ${isVoiceActive ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
            {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isVoiceActive}
            placeholder={isVoiceActive ? "Вимкніть голос..." : "Напишіть повідомлення..."}
            className={`flex-1 px-5 py-3 rounded-full focus:outline-none focus:ring-2 transition-all ${isHighContrast ? 'bg-slate-900 text-yellow-400 border-white focus:ring-yellow-400' : 'bg-slate-50 border-slate-200 focus:ring-teal-500'} ${textSizeClass}`}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className={`p-3 rounded-full shadow-md transition-all ${isHighContrast ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
