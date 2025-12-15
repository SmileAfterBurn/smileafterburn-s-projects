
import React from 'react';
import { X, Heart, Share2, Github, Mail, Globe, Award } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Посилання на мапу скопійовано!');
  };

  return (
    <div className="fixed inset-0 z-[6000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header with Cover */}
        <div className="h-32 bg-gradient-to-r from-teal-600 to-blue-600 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 text-center text-white">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30">
               <Heart className="w-6 h-6 text-white" fill="currentColor" />
             </div>
             <h2 className="text-2xl font-bold drop-shadow-md">Про проект</h2>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
           <div className="prose prose-slate text-slate-600 mb-6">
             <p className="text-lg leading-relaxed">
               <strong>«Інклюзивна мапа соціальних послуг»</strong> — це соціальний проект, створений для швидкого пошуку допомоги у будь-якому куточку України. Ми об'єднуємо державні установи, благодійні фонди та волонтерські ініціативи на одній зручній платформі.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-teal-600" />
                  Розробка
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  Проект розроблено та підтримується власними силами.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                   <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">ІЧ</div>
                   Ілля Чернов
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                   <Heart className="w-5 h-5 text-rose-500" />
                   Підтримка
                </h3>
                 <p className="text-sm text-slate-600 mb-2">
                  Генеральний партнер проекту:
                </p>
                <div className="font-bold text-teal-700">БФ «ПОСМІШКА ЮА»</div>
              </div>
           </div>

           <div className="flex flex-col gap-3">
              <button 
                onClick={handleShare}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Поділитися мапою (Скопіювати посилання)
              </button>
              
              <div className="flex gap-3">
                 <a 
                   href="mailto:support@social-map.ua?subject=Партнерство"
                   className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2"
                 >
                   <Mail className="w-4 h-4" />
                   Стати партнером
                 </a>
                 <a 
                   href="#"
                   onClick={(e) => { e.preventDefault(); alert("GitHub репозиторій скоро буде доступний!"); }}
                   className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2"
                 >
                   <Github className="w-4 h-4" />
                   GitHub
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
