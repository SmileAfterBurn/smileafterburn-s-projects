
// Власник: Чернов Ілля
import React, { useState } from 'react';
import { X, Heart, Share2, Github, Mail, Globe, Award, Wallet, ArrowRight, Target, Users, ShieldCheck, Briefcase } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'donate' | 'partners'>('about');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Посилання на мапу скопійовано! Дякуємо за поширення.');
  };

  return (
    <div className="fixed inset-0 z-[6000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header with Cover */}
        <div className="h-36 bg-gradient-to-r from-teal-700 to-blue-800 relative flex flex-col items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 text-center text-white">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30 shadow-lg">
               <Heart className="w-6 h-6 text-white" fill="currentColor" />
             </div>
             <h2 className="text-2xl font-bold drop-shadow-md tracking-tight">Інклюзивна мапа соціальних послуг</h2>
             <p className="text-teal-100 text-sm font-medium opacity-90">Соціальний проект для кожного українця</p>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 shrink-0">
          <button 
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-3 text-sm font-bold transition-colors relative ${activeTab === 'about' ? 'text-teal-700 bg-teal-50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Про проект
            {activeTab === 'about' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('partners')}
            className={`flex-1 py-3 text-sm font-bold transition-colors relative ${activeTab === 'partners' ? 'text-teal-700 bg-teal-50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Для Бізнесу та Партнерів
            {activeTab === 'partners' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('donate')}
            className={`flex-1 py-3 text-sm font-bold transition-colors relative ${activeTab === 'donate' ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <span className="flex items-center justify-center gap-2">
              <Wallet className="w-4 h-4" />
              Підтримати
            </span>
            {activeTab === 'donate' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-500"></div>}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
           
           {activeTab === 'about' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="prose prose-slate text-slate-600">
                 <p className="text-lg leading-relaxed">
                   <strong>«Інклюзивна мапа»</strong> — це інструмент, що поєднує інновації та турботу. Ми створили єдину базу, де кожен, хто потребує допомоги (ВПО, люди з інвалідністю, ветерани), може знайти підтримку за лічені секунди.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">Швидкість</h4>
                    <p className="text-xs text-slate-500">Миттєвий пошук послуг та контактів поруч з вами.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">Інклюзія</h4>
                    <p className="text-xs text-slate-500">Адаптовано для людей з порушеннями зору та слуху.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">Довіра</h4>
                    <p className="text-xs text-slate-500">Лише перевірені фонди та державні установи.</p>
                  </div>
               </div>

               <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                 <h3 className="font-bold text-yellow-800 mb-2 text-sm uppercase tracking-wide">Плани розвитку (Roadmap)</h3>
                 <ul className="space-y-2 text-sm text-yellow-900">
                   <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                     Інтеграція з Дією (в процесі перемовин)
                   </li>
                   <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                     Офлайн-режим для роботи без інтернету
                   </li>
                   <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                     Розширення бази на деокуповані території
                   </li>
                 </ul>
               </div>
             </div>
           )}

           {activeTab === 'partners' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                 <div className="absolute right-0 top-0 opacity-10">
                   <Briefcase size={120} />
                 </div>
                 <h3 className="text-xl font-bold mb-2 relative z-10">Станьте генеральним партнером</h3>
                 <p className="text-slate-300 text-sm mb-4 max-w-md relative z-10">
                   Ваш бренд може допомогти тисячам українців знайти підтримку. Ми пропонуємо інтеграцію вашого логотипу, згадки у ЗМІ та статус соціально-відповідального бізнесу.
                 </p>
                 <a 
                   href="mailto:sponsorship@social-map.ua?subject=Спонсорство"
                   className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-bold hover:bg-slate-100 transition relative z-10"
                 >
                   <Mail className="w-4 h-4" />
                   Отримати презентацію
                 </a>
               </div>

               <div className="text-center mb-4 mt-6">
                 <h3 className="text-lg font-bold text-slate-800">Наші поточні партнери</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 font-bold text-xl border border-teal-100">П</div>
                    <div>
                      <h4 className="font-bold text-slate-800">БФ «ПОСМІШКА ЮА»</h4>
                      <p className="text-xs text-slate-500">Генеральний партнер, гуманітарна підтримка.</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-2 border-dashed border-slate-200 shadow-sm flex items-center gap-4 opacity-75 hover:opacity-100 hover:border-teal-300 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-teal-500 font-bold border border-slate-100 group-hover:bg-teal-50 transition-colors">
                       <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-teal-700 transition-colors">Ваш логотип тут</h4>
                      <p className="text-xs text-slate-500">Приєднуйтесь до ініціативи</p>
                    </div>
                  </div>
               </div>
             </div>
           )}

           {activeTab === 'donate' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 text-center">
               <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <Heart className="w-8 h-8 fill-current" />
               </div>
               
               <h3 className="text-xl font-bold text-slate-800">Підтримайте розробку</h3>
               <p className="text-slate-600 text-sm max-w-md mx-auto">
                 Цей проект розробляється волонтерськими зусиллями Іллі Чернова. Ваша підтримка дозволить оплатити сервери, покращити ШІ-асистента та додати нові регіони.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mt-4">
                 <button 
                    onClick={() => window.open('https://send.monobank.ua/jar/YOUR_JAR_ID', '_blank')}
                    className="p-4 bg-black text-white rounded-xl hover:bg-slate-800 transition flex flex-col items-center gap-2 shadow-lg group"
                 >
                   <span className="font-bold text-lg group-hover:scale-105 transition-transform">Monobank Банка</span>
                   <span className="text-xs text-slate-400">Швидкий донат</span>
                 </button>
                 
                 <button 
                    onClick={() => window.open('https://www.buymeacoffee.com/', '_blank')}
                    className="p-4 bg-yellow-400 text-black rounded-xl hover:bg-yellow-300 transition flex flex-col items-center gap-2 shadow-lg group"
                 >
                   <span className="font-bold text-lg group-hover:scale-105 transition-transform">Buy Me a Coffee</span>
                   <span className="text-xs text-black/60">Міжнародна підтримка</span>
                 </button>
               </div>

               <p className="text-xs text-slate-400 mt-4">
                 Всі кошти йдуть виключно на технічну підтримку та розвиток інфраструктури проекту. Звітність публікується щомісяця.
               </p>
             </div>
           )}

           <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleShare}
                className="flex-1 py-3 bg-teal-50 text-teal-700 font-bold rounded-xl hover:bg-teal-100 transition flex items-center justify-center gap-2 border border-teal-200"
              >
                <Share2 className="w-5 h-5" />
                Поділитися мапою
              </button>
              
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Репозиторій буде відкрито після перевірки безпеки."); }}
                className="flex-1 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-2 border border-slate-200"
              >
                <Github className="w-5 h-5" />
                Код проекту
              </a>
           </div>

           <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                <Award className="w-3 h-3" />
                Розробник: Ілля Чернов
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
