import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LayoutGrid, Map as MapIcon, Table as TableIcon, Search, Sparkles, HeartHandshake, MapPin, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, PhoneForwarded, Anchor, Ship, Sun, Building2, Zap, Landmark, Coffee, GraduationCap, Globe, Castle, Trees, Mountain, Wheat, Church, Flower2, Shield, Info, Heart, Menu, X, Filter, Check, MessageCircle, Gem, Lock, Waves } from 'lucide-react';
import { MapView } from './components/MapView.tsx';
import { TableView } from './components/TableView.tsx';
import { GeminiChat } from './components/GeminiChat.tsx';
import { IntroModal } from './components/IntroModal.tsx';
import { RemoteSupportModal } from './components/RemoteSupportModal.tsx';
import { ReferralModal } from './components/ReferralModal.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { PresentationModal } from './components/PresentationModal.tsx';
import { INITIAL_ORGANIZATIONS, REGION_CONFIG } from './constants.ts';
import { Organization, ViewMode, RegionName } from './types.ts';

const PANI_DUMKA_AVATAR = "https://drive.google.com/thumbnail?id=1CKyZ-yqoy3iEKIqnXkrg07z0GmK-e099&sz=w256";

const Tryzub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M100 20 V 220" />
    <path d="M35 20 V 150 C 35 210 100 250 100 250" />
    <path d="M165 20 V 150 C 165 210 100 250 100 250" />
    <path d="M70 20 V 150 C 70 180 100 190 100 190" />
    <path d="M130 20 V 150 C 130 180 100 190 100 190" />
  </svg>
);

const ICON_COMPONENTS: Record<string, React.ElementType> = {
  Anchor, Ship, Sun, Building2, Zap, Landmark, Coffee, GraduationCap, Globe, Castle, Trees, Mountain, Wheat, Church, Flower2, Shield, Gem, Tryzub, Waves
};

const App: React.FC = () => {
  const [organizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Split);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRemoteSupportOpen, setIsRemoteSupportOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [referralOrg, setReferralOrg] = useState<Organization | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeRegion, setActiveRegion] = useState<RegionName>('All');
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isAllowedLocation, setIsAllowedLocation] = useState<boolean | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIsAllowedLocation(data.country_code === 'UA');
      } catch (error) { setIsAllowedLocation(true); }
    };
    checkLocation();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hide_intro_annotation');
    if (hasSeenIntro === 'true') { setShowIntro(false); } else { setShowIntro(true); return; }

    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get('region');
    const orgParam = params.get('org');

    let regionSet = false;
    if (regionParam && REGION_CONFIG[regionParam as RegionName]) {
      setActiveRegion(regionParam as RegionName);
      regionSet = true;
    }

    if (orgParam) {
      const orgExists = organizations.find(o => o.id === orgParam);
      if (orgExists) {
        setSelectedOrgId(orgParam);
        if (!regionSet && orgExists.region) { setActiveRegion(orgExists.region); regionSet = true; }
      }
    }

    if (!regionSet && !orgParam) { setIsRegionModalOpen(true); }
  }, [organizations]);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (activeRegion && activeRegion !== 'All') params.set('region', activeRegion); else params.delete('region');
      if (selectedOrgId) params.set('org', selectedOrgId); else params.delete('org');
      
      if (window.location.origin && !window.location.origin.includes('goog')) {
        window.history.replaceState(null, '', `?${params.toString()}`);
      }
    } catch (e) {
      console.warn("Could not update history state (possibly due to sandbox restrictions):", e);
    }
  }, [activeRegion, selectedOrgId]);

  const handleRegionSelect = (region: RegionName) => {
    setActiveRegion(region);
    setIsRegionModalOpen(false);
    setSelectedOrgId(null);
  };

  const availableCategories = useMemo(() => Array.from(new Set(organizations.map(o => o.category))).sort(), [organizations]);

  const filteredOrgs = organizations.filter(c => {
    if (activeRegion && activeRegion !== 'All' && c.region !== activeRegion) return false;
    const term = searchTerm.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(term) || c.category.toLowerCase().includes(term) || c.address.toLowerCase().includes(term);
    if (!matchesSearch) return false;
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(c.status)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
    return true;
  });

  const handleOrgSelect = (id: string) => {
    setSelectedOrgId(id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const mapCenter: [number, number] = useMemo(() => {
    const config = REGION_CONFIG[activeRegion] || REGION_CONFIG['All'];
    return config.center as [number, number];
  }, [activeRegion]);

  const mapZoom = useMemo(() => (REGION_CONFIG[activeRegion] || REGION_CONFIG['All']).zoom, [activeRegion]);

  if (isAllowedLocation === false) {
    return (
      <div className="h-screen w-full bg-slate-900 flex items-center justify-center p-4 text-center">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl">
          <Lock size={48} className="mx-auto text-red-600 mb-4" />
          <h1 className="text-2xl font-black text-slate-800 mb-2 uppercase">Обмежений доступ</h1>
          <p className="text-slate-600 mb-6 font-medium">Для безпеки даних доступ дозволено лише з території України.</p>
          <button onClick={() => setIsAllowedLocation(true)} className="w-full py-4 bg-teal-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-teal-700 transition shadow-lg">Я українець за кордоном</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden relative font-sans">
      {showIntro && <IntroModal onComplete={() => setShowIntro(false)} />}
      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} onOpenPresentation={() => setIsPresentationOpen(true)} />}
      {isPresentationOpen && <PresentationModal onClose={() => setIsPresentationOpen(false)} />}
      {referralOrg && <ReferralModal organization={referralOrg} onClose={() => setReferralOrg(null)} />}
      {isRemoteSupportOpen && <RemoteSupportModal onClose={() => setIsRemoteSupportOpen(false)} />}

      {isRegionModalOpen && !showIntro && (
        <div className="fixed inset-0 z-[500] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-7xl w-full p-6 md:p-10 text-center animate-in fade-in zoom-in duration-300 relative overflow-hidden flex flex-col max-h-[90vh]">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"></div>
             <h1 className="text-2xl md:text-4xl font-black text-slate-800 mb-2 uppercase tracking-tight">Оберіть ваш регіон</h1>
             <p className="text-slate-500 mb-8 text-sm font-medium uppercase tracking-widest">Географія допомоги: Ми поруч</p>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto custom-scrollbar p-2 pb-10">
              {(Object.keys(REGION_CONFIG) as RegionName[]).sort().map(region => {
                const config = REGION_CONFIG[region];
                const Icon = ICON_COMPONENTS[config.icon] || Globe;
                return (
                  <button key={region} onClick={() => handleRegionSelect(region)} className="group flex flex-col items-center gap-3">
                    <div className={`w-full aspect-square rounded-[2rem] shadow-sm bg-gradient-to-br ${config.gradient} text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 hover:shadow-xl`}>
                       <Icon className="w-10 h-10 md:w-12 md:h-12" />
                    </div>
                    <span className="text-[10px] md:text-xs font-black text-slate-700 leading-tight uppercase tracking-wider">{config.label.replace(' область', '')}</span>
                  </button>
                );
              })}
             </div>
          </div>
        </div>
      )}

      <header className="shrink-0 bg-white border-b border-slate-200 flex flex-col md:flex-row items-center justify-between px-3 py-2 md:px-4 md:py-3 z-20 gap-2">
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200 shrink-0"><HeartHandshake size={20} /></div>
            <div className="overflow-hidden">
              <h1 className="font-black text-xs md:text-base tracking-tight text-slate-800 leading-none truncate uppercase">Мапа послуг</h1>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[8px] md:text-[10px] font-black text-teal-600 uppercase tracking-widest truncate">{activeRegion ? REGION_CONFIG[activeRegion].label : 'Україна'}</span>
                <button onClick={() => setIsRegionModalOpen(true)} className="text-[7px] md:text-[9px] text-white font-black bg-teal-600 px-1.5 py-0.5 rounded ml-1 uppercase transition-colors hover:bg-teal-700">Змінити</button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 md:hidden">
             <button onClick={() => setIsAboutOpen(true)} className="w-9 h-9 flex items-center justify-center text-rose-500 rounded-xl bg-rose-50 border border-rose-100 shadow-sm"><Heart size={18} fill="currentColor" /></button>
             <button onClick={() => setIsRemoteSupportOpen(true)} className="w-9 h-9 flex items-center justify-center text-indigo-600 rounded-xl bg-indigo-50 border border-indigo-100 shadow-sm"><PhoneForwarded size={18} /></button>
          </div>
        </div>

        <div className="w-full md:flex-1 md:max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Пошук послуги або міста..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-xs md:text-sm border border-slate-200 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium" 
          />
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => setIsAboutOpen(true)} className="w-10 h-10 flex items-center justify-center text-rose-500 rounded-xl hover:bg-rose-50 bg-rose-50/30 border border-rose-100 transition-colors"><Heart size={20} fill="currentColor" /></button>
          <button onClick={() => setIsRemoteSupportOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md transition-all active:scale-95"><PhoneForwarded size={16} /><span>Гарячі лінії</span></button>
          <button onClick={() => setIsChatOpen(!isChatOpen)} className={`flex items-center gap-3 px-1.5 py-1.5 pr-4 rounded-xl border transition-all shadow-sm active:scale-95 ${isChatOpen ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}>
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20"><img src={PANI_DUMKA_AVATAR} alt="Думка" className="w-full h-full object-cover" /></div>
            <div className="flex flex-col items-start leading-tight"><span className={`text-[9px] font-black uppercase mb-0.5 ${isChatOpen ? 'text-teal-100' : 'text-slate-400'}`}>AI Думка</span><span className="font-bold text-xs">Чат</span></div>
          </button>
        </div>

        <button onClick={() => setIsChatOpen(!isChatOpen)} className="md:hidden w-full flex items-center justify-center gap-2 py-2 bg-teal-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
           <MessageCircle size={16} /> Чат з Пані Думкою
        </button>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          <div className={`transition-all duration-500 flex flex-col bg-white border-r border-slate-200 ${isSidebarOpen ? 'h-[60%] md:h-full w-full md:w-[450px] lg:w-[500px]' : 'h-0 md:h-full w-full md:w-0 overflow-hidden border-none'}`}>
             <div className="p-3 border-b border-slate-100 bg-white flex items-center justify-between sticky top-0 z-30">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${isFilterOpen || (selectedStatuses.length + selectedCategories.length) > 0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}>
                   <Filter size={14} /> Фільтри {(selectedStatuses.length + selectedCategories.length) > 0 && <span className="ml-1 bg-teal-500 text-white px-1.5 rounded-md">{(selectedStatuses.length + selectedCategories.length)}</span>}
                </button>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredOrgs.length} результатів</span>
                {isFilterOpen && (
                  <div className="absolute top-full left-3 right-3 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-4"><h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Налаштування пошуку</h4><button onClick={() => {setSelectedStatuses([]); setSelectedCategories([]);}} className="text-[9px] text-rose-500 font-black uppercase">Скинути</button></div>
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                       <div><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Статус</p>
                       <div className="grid grid-cols-2 gap-2">{['Active', 'Pending', 'In Development'].map(s => (
                         <button key={s} onClick={() => setSelectedStatuses(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} className={`px-2 py-2 rounded-lg text-[10px] font-bold border transition-all ${selectedStatuses.includes(s) ? 'bg-teal-600 border-teal-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                           {s === 'Active' ? 'Активно' : s === 'Pending' ? 'Очікує' : 'Розробка'}
                         </button>
                       ))}</div></div>
                       <div><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Послуги</p>
                       <div className="flex flex-col gap-1.5">{availableCategories.map(c => (
                         <button key={c} onClick={() => setSelectedCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} className={`text-left px-3 py-2 rounded-lg text-[10px] font-bold border transition-all ${selectedCategories.includes(c) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                           {c}
                         </button>
                       ))}</div></div>
                    </div>
                  </div>
                )}
             </div>
             <TableView organizations={filteredOrgs} selectedOrgId={selectedOrgId} onSelectOrg={handleOrgSelect} />
          </div>

          <div className="flex-1 relative bg-slate-100">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute z-[40] bg-white border border-slate-300 shadow-xl left-1/2 -translate-x-1/2 top-0 md:left-0 md:top-1/2 md:-translate-y-1/2 w-14 h-7 rounded-b-2xl md:w-7 md:h-14 md:rounded-r-2xl flex items-center justify-center text-slate-400 hover:text-teal-600 transition-all active:scale-90">
              <div className="hidden md:block">{isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}</div>
              <div className="block md:hidden">{isSidebarOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
            </button>
            <MapView organizations={filteredOrgs} selectedOrgId={selectedOrgId} onSelectOrg={handleOrgSelect} onOpenReferral={setReferralOrg} center={mapCenter} zoom={mapZoom} />
          </div>

        <GeminiChat organizations={filteredOrgs} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onOpenPresentation={() => { setIsPresentationOpen(true); setIsChatOpen(false); }} />
      </main>
    </div>
  );
};

export default App;