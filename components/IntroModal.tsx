import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX, Play, CheckCircle, Loader2 } from 'lucide-react';
import { generateSpeech } from '../services/geminiService';

interface IntroModalProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    title: "Ласкаво просимо на Мапу Послуг!",
    text: "Ми об'єднали майже 300 перевірених організацій у всіх регіонах України в єдину мережу допомоги. Знаходьте благодійні фонди, державні соцслужби, шелтери та гуманітарні штаби у своєму місті.",
  },
  {
    title: "Дистанційна підтримка",
    text: "Не маєте можливості відвідати центр особисто? Натисніть нову кнопку «Дистанційна підтримка» у верхньому меню, щоб миттєво знайти урядові гарячі лінії, безкоштовних юристів та психологів онлайн.",
  },
  {
    title: "Пані Думка — ваш голос підтримки",
    text: "Наша ШІ-помічниця тепер ще розумніша. Натисніть мікрофон у чаті, і пані Думка знайде потрібні контакти, підкаже графік роботи або просто підтримає розмову, коли це необхідно.",
  },
  {
    title: "Почнімо роботу",
    text: "Оберіть свій регіон або залиште «Вся Україна», щоб побачити повну картину допомоги. Ми постійно оновлюємо дані, щоб ви мали доступ до актуальної інформації.",
  }
];

export const IntroModal: React.FC<IntroModalProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    return () => {
      stopAudio();
      audioContextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (hasStarted && isPlaying) {
      playCurrentSlide();
    }
  }, [currentStep]);

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop(); } catch(e) {}
      sourceNodeRef.current = null;
    }
  };

  const playCurrentSlide = async () => {
    stopAudio();
    setIsLoadingAudio(true);
    
    try {
      const audioData = await generateSpeech(SLIDES[currentStep].text);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const buffer = await decodeAudioData(audioData, audioContextRef.current);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => {
        if (sourceNodeRef.current === source) {
          sourceNodeRef.current = null;
        }
      };
      source.start(0);
      sourceNodeRef.current = source;
    } catch (e) {
      console.error("Audio playback error", e);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const decodeAudioData = async (data: ArrayBuffer, ctx: AudioContext): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const handleStart = () => {
    setHasStarted(true);
    setIsPlaying(true);
    playCurrentSlide();
  };

  const handleNext = () => {
    if (currentStep < SLIDES.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    stopAudio();
    handleFinish();
  };

  const handleFinish = () => {
    if (dontShowAgain) {
      localStorage.setItem('hide_intro_annotation', 'true');
    }
    onComplete();
  };

  const toggleMute = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playCurrentSlide();
    }
  };

  const content = SLIDES[currentStep];
  const isLastSlide = currentStep === SLIDES.length - 1;

  return (
    <div className="fixed inset-0 z-[5000] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300">
        
        <div className="h-32 bg-teal-600 bg-[url('https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-teal-900/40"></div>
          <div className="absolute bottom-4 left-6 text-white z-10">
            <h2 className="text-2xl font-bold drop-shadow-md">{content.title}</h2>
          </div>
          
          <button 
            onClick={toggleMute}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition-all"
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="min-h-[120px] text-lg text-slate-700 leading-relaxed relative flex items-center">
             {!hasStarted ? (
               <div className="w-full flex flex-col items-center justify-center gap-4 py-2 text-center">
                 <p className="font-medium">Пані Думка хоче розповісти вам про можливості мапи.</p>
                 <button 
                   onClick={handleStart}
                   className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105"
                 >
                   <Play size={20} fill="currentColor" /> Розпочати тур
                 </button>
               </div>
             ) : (
                <div className="relative w-full">
                  {isLoadingAudio && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                       <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                    </div>
                  )}
                  <p className="animate-in fade-in duration-500">
                    {content.text}
                  </p>
                </div>
             )}
          </div>

          <div className="flex gap-2 justify-center">
            {SLIDES.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-teal-600' : 'w-2 bg-slate-200'}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
             <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-500 hover:text-slate-700 select-none">
               <input 
                 type="checkbox" 
                 checked={dontShowAgain}
                 onChange={(e) => setDontShowAgain(e.target.checked)}
                 className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 border-slate-300"
               />
               <span>Більше не показувати</span>
             </label>

             <div className="flex items-center gap-3">
               {!isLastSlide && (
                 <button 
                   onClick={handleSkip}
                   className="px-4 py-2 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                 >
                   Пропустити
                 </button>
               )}
               
               {hasStarted && (
                 <button 
                   onClick={handleNext}
                   disabled={isLoadingAudio}
                   className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-teal-700 text-white rounded-lg font-bold transition-colors shadow-md disabled:opacity-50"
                 >
                   {isLastSlide ? 'Почати роботу' : 'Далі'}
                   {!isLastSlide ? <ArrowRight size={18} /> : <CheckCircle size={18} />}
                 </button>
               )}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};