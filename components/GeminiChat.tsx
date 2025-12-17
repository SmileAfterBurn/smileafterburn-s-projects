
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, Download, Type, Eye, Mic, MicOff } from 'lucide-react';
import { analyzeData, LiveSession } from '../services/geminiService';
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
      text: 'Вітаю вас! Я пані Думка, ваша помічниця. Я можу знайти для вас найближчі пункти допомоги, надати телефони гарячих ліній або просто підтримати порадою. Напишіть своє запитання або натисніть мікрофон, щоб сказати голосом.',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  
  // Voice Chat State
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const liveSessionRef = useRef<LiveSession | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLargeText]);

  useEffect(() => {
    return () => {
      if (liveSessionRef.current) {
        liveSessionRef.current.disconnect();
      }
    };
  }, []);

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
        console.error("Failed to start voice chat:", e);
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
            <div className={`max-w-[90%] p-4 rounded-2xl shadow-sm leading-relaxed ${textSizeClass} ${msg.role === 'user' ? `${messageUserClass} rounded-br-none` : `${messageModelClass} rounded-bl-none`}`}>
              <div className="flex items-center gap-2 mb-1 opacity-80 text-[10px] uppercase font-bold tracking-wider">
                {msg.role === 'model' ? 'пані Думка' : 'Ви'}
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
