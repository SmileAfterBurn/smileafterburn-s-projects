import React, { useState } from 'react';
import { X, Heart, Share2, Github, Mail, Globe, Award, Wallet, ArrowRight, Target, Users, ShieldCheck, Briefcase, Copy, ExternalLink, Laptop, PlayCircle } from 'lucide-react';
import { ModalOverlay } from './shared/ModalOverlay';

interface AboutModalProps {
  onClose: () => void;
  onOpenPresentation?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose, onOpenPresentation }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'donate' | 'partners'>('about');
  const [copied, setCopied] = useState(false);

  const MONO_JAR_URL = "https://send.monobank.ua/jar/3upLLMPr6P";
  const CARD_NUMBER = "4874 1000 2054 3750";

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Посилання на мапу скопійовано!');
  };

  const copyCardNumber = () => {
    navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModalOverlay backdropVariant="dark" zIndex={6000}>
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[95vh] border border-white/20">
        
        <div className="h-28 md:h-36 bg-gradient-to-r from-teal-700 to-blue-800 relative flex flex-col items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 text-center text-white px-4">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 border border-white/30 shadow-lg">
               <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" />
             </div>
             <h2 className="text-lg md:text-2xl font-black drop-shadow-md tracking-tight uppercase">Інклюзивна мапа</h2>
             <p className="text-teal-100 text-[9px] md:text-xs font-black uppercase tracking-widest opacity-90">Соціальна екосистема</p>
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all"><X size={18} /></button>
        </div>

        <div className="flex border-b border-slate-100 shrink-0 bg-slate-50/50">
          {['about', 'partners', 'donate'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex-1 py-3 md:py-4 text-[9px] md:text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? (tab === 'donate' ? 'text-rose-600 bg-rose-50' : 'text-teal-700 bg-teal-50') : 'text-slate-400 hover:bg-white'}`}>
              {tab === 'about' ? 'Про проект' : tab === 'partners' ? 'Партнери' : 'Підтримати'}
              {activeTab === tab && <div className={`absolute bottom-0 left-0 w-full h-1 ${tab === 'donate' ? 'bg-rose-500' : 'bg-teal-600'}`}></div>}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar flex-1">
           {activeTab === 'about' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <p className="text-sm md:text-lg text-slate-600 leading-relaxed font-medium"><strong>«Інклюзивна мапа»</strong> — це єдиний верифікований реєстр допомоги для ВПО та вразливих груп населення в Україні.</p>
               <button onClick={onOpenPresentation} className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-teal-700 transition flex items-center justify-center gap-3 shadow-lg group active:scale-95"><PlayCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" /> Дивитись Pitch Deck проєкту</button>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {[
                    { icon: Target, label: 'Швидкість', text: 'Миттєвий пошук допомоги.', color: 'teal' },
                    { icon: Users, label: 'Інклюзія', text: 'Голосовий інтерфейс Думка.', color: 'blue' },
                    { icon: ShieldCheck, label: 'Довіра', text: 'Перевірені організації.', color: 'purple' }
                  ].map(item => (
                    <div key={item.label} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center flex md:flex-col items-center gap-4 md:gap-3">
                      <div className={`w-10 h-10 bg-${item.color}-100 text-${item.color}-600 rounded-xl flex items-center justify-center shrink-0`}><item.icon size={20} /></div>
                      <div className="text-left md:text-center"><h4 className="font-black text-slate-800 text-[10px] uppercase mb-0.5">{item.label}</h4><p className="text-[10px] text-slate-500 font-medium">{item.text}</p></div>
                    </div>
                  ))}
               </div>
             </div>
           )}

           {activeTab === 'partners' && (
             <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="bg-slate-900 text-white p-5 md:p-6 rounded-[2rem] shadow-xl relative overflow-hidden border border-white/10">
                 <div className="absolute right-[-20px] top-[-20px] opacity-10"><Briefcase size={120} /></div>
                 <h3 className="text-lg md:text-xl font-black mb-2 uppercase tracking-tight relative z-10">Для Бізнесу</h3>
                 <p className="text-slate-300 text-[10px] md:text-sm mb-4 font-medium relative z-10">Пропонуємо стратегічне партнерство та статус соціально-відповідальної компанії.</p>
                 <div className="flex flex-col gap-2 relative z-10">
                   <button onClick={onOpenPresentation} className="w-full py-3 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-50 transition active:scale-95 flex items-center justify-center gap-2"><PlayCircle size={16} /> Презентація</button>
                   <a href="mailto:info@social-map.ua" className="w-full py-3 bg-teal-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-700 transition text-center active:scale-95 flex items-center justify-center gap-2"><Mail size={16} /> Зв'язатися</a>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'donate' && (
             <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-4">
               <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-[2rem] p-5 md:p-7 text-white shadow-xl shadow-rose-200/50 relative overflow-hidden border border-white/20">
                 <div className="absolute right-[-30px] top-[-30px] opacity-10 rotate-12"><Laptop size={150} /></div>
                 <h3 className="text-lg md:text-2xl font-black mb-3 leading-tight uppercase relative z-10">Збір на обладнання розробки</h3>
                 <p className="text-[10px] md:text-sm text-white/90 font-medium leading-relaxed mb-6 relative z-10">Оновлення техніки Surface Laptop Go 2 для стабільної розробки інклюзивних функцій мапи.</p>
                 <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/10">
                   <div className="flex justify-between items-end mb-2"><span className="text-[8px] font-black uppercase tracking-widest opacity-80">Цільова сума</span><span className="text-xl md:text-3xl font-black">158 000.00 ₴</span></div>
                   <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden"><div className="bg-white h-full w-[8%] rounded-full animate-pulse shadow-[0_0_10px_white]"></div></div>
                 </div>
                 <div className="flex flex-col gap-3 relative z-10">
                   <button onClick={() => window.open(MONO_JAR_URL, '_blank')} className="w-full py-4 bg-white text-rose-600 font-black uppercase text-[10px] md:text-xs tracking-widest rounded-xl hover:bg-rose-50 transition shadow-lg active:scale-95 flex items-center justify-center gap-2">Підтримати в MONOBANK</button>
                   <div className="flex items-center gap-2 bg-white/10 rounded-xl border border-white/20 p-1.5">
                     <div className="flex-1 px-3 py-2 text-[10px] md:text-xs font-black font-mono tracking-widest truncate">{CARD_NUMBER}</div>
                     <button onClick={copyCardNumber} className={`px-4 py-2 rounded-lg font-black text-[9px] uppercase transition-all shrink-0 ${copied ? 'bg-green-500 text-white' : 'bg-white text-rose-600'}`}>{copied ? 'OK' : 'Копія'}</button>
                   </div>
                 </div>
               </div>
             </div>
           )}
        </div>

        <div className="p-4 md:p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-2 md:gap-3 bg-slate-50/50 shrink-0">
           <button onClick={handleShare} className="flex-1 py-3.5 bg-white text-teal-700 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-teal-50 transition flex items-center justify-center gap-2 border border-slate-200 active:scale-95 shadow-sm"><Share2 size={16} /> Поділитися</button>
           <a href="https://github.com/illia-chernov" target="_blank" className="flex-1 py-3.5 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-slate-800 transition flex items-center justify-center gap-2 active:scale-95 shadow-lg"><Github size={16} /> GitHub</a>
        </div>
      </div>
    </ModalOverlay>
  );
};
