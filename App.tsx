
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LayoutGrid, Map as MapIcon, Table as TableIcon, Search, Sparkles, HeartHandshake, MapPin, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, PhoneForwarded, Anchor, Ship, Sun, Building2, Zap, Landmark, Coffee, GraduationCap, Globe, Castle, Trees, Mountain, Wheat, Church, Flower2, Shield, Info, Heart, Menu, X, Filter, Check, MessageCircle, Gem, Lock } from 'lucide-react';
import { MapView } from './components/MapView';
import { TableView } from './components/TableView';
import { GeminiChat } from './components/GeminiChat';
import { IntroModal } from './components/IntroModal';
import { RemoteSupportModal } from './components/RemoteSupportModal';
import { ReferralModal } from './components/ReferralModal';
import { AboutModal } from './components/AboutModal';
import { INITIAL_ORGANIZATIONS, REGION_CONFIG } from './constants';
import { Organization, ViewMode, RegionName } from './types';

// Avatar URL for the button
const PANI_DUMKA_AVATAR = "https://drive.google.com/thumbnail?id=1CKyZ-yqoy3iEKIqnXkrg07z0GmK-e099&sz=w256";

// Custom Tryzub Icon (Contour only)
const Tryzub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 280" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="16" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M100 20 V 220" />
    <path d="M35 20 V 150 C 35 210 100 250 100 250" />
    <path d="M165 20 V 150 C 165 210 100 250 100 250" />
    <path d="M70 20 V 150 C 70 180 100 190 100 190" />
    <path d="M130 20 V 150 C 130 180 100 190 100 190" />
  </svg>
);

// Map string icon names to components
const ICON_COMPONENTS: Record<string, React.ElementType> = {
  Anchor, Ship, Sun, Building2, Zap, Landmark, Coffee, GraduationCap, Globe, Castle, Trees, Mountain, Wheat, Church, Flower2, Shield, Gem, Tryzub
};

const App: React.FC = () => {
  const [organizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Split);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const [isRemoteSupportOpen, setIsRemoteSupportOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [referralOrg, setReferralOrg] = useState<Organization | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        if (data.country_code === 'UA') {
          setIsAllowedLocation(true);
        } else {
          setIsAllowedLocation(false);
        }
      } catch (error) {
        setIsAllowedLocation(true); 
      }
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
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
    } else {
      setShowIntro(true);
      return; 
    }

    let regionParam = null;
    let orgParam = null;
    try {
      const params = new URLSearchParams(window.location.search);
      regionParam = params.get('region');
      orgParam = params.get('org');
    } catch (e) {}

    let regionSet = false;
    if (regionParam && REGION_CONFIG[regionParam as RegionName]) {
      setActiveRegion(regionParam as RegionName);
      regionSet = true;
    }

    if (orgParam) {
      const orgExists = organizations.find(o => o.id === orgParam);
      if (orgExists) {
        setSelectedOrgId(orgParam);
        if (!regionSet && orgExists.region) {
          setActiveRegion(orgExists.region);
          regionSet = true;
        }
      }
    }

    if (!regionSet && !orgParam) {
      setIsRegionModalOpen(true);
    }
  }, [organizations]);

  useEffect(() => {
    try {
      if (window.history && typeof window.history.replaceState === 'function') {
        const params = new URLSearchParams(window.location.search);
        if (activeRegion && activeRegion !== 'All') params.set('region', activeRegion);
        else params.delete('region');
        if (selectedOrgId) params.set('org', selectedOrgId);
        else params.delete('org');
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, '', newUrl);
      }
    } catch (e) {}
  }, [activeRegion, selectedOrgId]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    if (activeRegion === 'All') setIsRegionModalOpen(true);
  };

  const handleRegionSelect = (region: RegionName) => {
    setActiveRegion(region);
    setIsRegionModalOpen(false);
    setSelectedOrgId(null);
  };

  const availableCategories = useMemo(() => 
    Array.from(new Set(organizations.map(o => o.category))).sort(), 
  [organizations]);

  const getOrganizationPriority = (org: Organization) => {
    const name = org.name.toLowerCase();
    const category = org.category.toLowerCase();
    if (name.includes("посмішка") || name.includes("posmishka")) return 1;
    if (name.includes("дівчата") || name.includes("divchata")) return 2;
    if (
      category.includes("комунальн") || category.includes("державн") ||
      name.includes("департамент") || name.includes("управління") || 
      name.includes("центр соціальних") || name.includes("служба") ||
      name.includes("рада")
    ) return 3;
    if (
      name.includes("червоний хрест") || name.includes("red cross") ||
      name.includes("карітас") || name.includes("caritas") ||
      name.includes("проліска") || name.includes("proliska") ||
      name.includes("рокада") || name.includes("rokada") || 
      name.includes("irc") || name.includes("unicef") || name.includes("мальтійська")
    ) return 4;
    return 5;
  };

  const filteredOrgs = organizations.filter(c => {
    if (activeRegion && activeRegion !== 'All' && c.region !== activeRegion) return false;
    const term = searchTerm.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term) ||
      c.address.toLowerCase().includes(term) ||
      c.phone.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term);
    if (!matchesSearch) return false;
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(c.status)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
    return true;
  }).sort((a, b) => {
    const priorityA = getOrganizationPriority(a);
    const priorityB = getOrganizationPriority(b);
    if (priorityA !== priorityB) return priorityA - priorityB;
    
    // Stable sort for Posmishka to preserve DB order (Sobornyi above Nezalezhnoi)
    if (priorityA === 1) {
      return INITIAL_ORGANIZATIONS.indexOf(a) - INITIAL_ORGANIZATIONS.indexOf(b);
    }
    
    return a.name.localeCompare(b.name);
  });

  const handleOrgSelect = (id: string) => {
    setSelectedOrgId(id);
    if (viewMode === ViewMode.Map) {
      setViewMode(ViewMode.Split);
      setIsSidebarOpen(true);
    }
  };

  const handleOpenReferral = (org: Organization) => setReferralOrg(org);
  const toggleStatus = (status: string) => setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  const toggleCategory = (category: string) => setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  const resetFilters = () => { setSelectedStatuses([]); setSelectedCategories([]); setSearchTerm(''); };

  const mapCenter: [number, number] = useMemo(() => activeRegion && REGION_CONFIG[activeRegion] ? REGION_CONFIG[activeRegion].center : REGION_CONFIG['All'].center, [activeRegion]);
  const mapZoom = useMemo(() => activeRegion && REGION_CONFIG[activeRegion] ? REGION_CONFIG[activeRegion].zoom : REGION_CONFIG['All'].zoom, [activeRegion]);
  const activeFilterCount = selectedStatuses.length + selectedCategories.length;

  if (isAllowedLocation === false) {
    return (
      <div className="h-screen w-full bg-slate-900 flex items-center justify-center p-4 text-center">
        <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl">
          <Lock size={48} className="mx-auto text-red-600 mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Обмежений доступ</h1>
          <p className="text-slate-600 mb-6">Доступ дозволено лише з території України.</p>
          <button onClick={() => setIsAllowedLocation(true)} className="w-full py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition">Я українець за кордоном</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden relative font-sans">
      {showIntro && <IntroModal onComplete={handleIntroComplete} />}
      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      {referralOrg && <ReferralModal organization={referralOrg} onClose={() => setReferralOrg(null)} />}
      {isRemoteSupportOpen && <RemoteSupportModal onClose={() => setIsRemoteSupportOpen(false)} />}

      {isRegionModalOpen && !showIntro && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full p-6 md:p-10 text-center animate-in fade-in zoom-in duration-300 relative overflow-hidden flex flex-col max-h-[90vh]">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"></div>
             <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Оберіть ваш регіон</h1>
             <p className="text-slate-500 mb-6">Знайдіть перевірену допомогу поруч</p>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto custom-scrollbar p-2">
              {(Object.keys(REGION_CONFIG) as RegionName[]).sort().map(region => {
                const config = REGION_CONFIG[region];
                const Icon = ICON_COMPONENTS[config.icon] || Globe;
                return (
                  <button key={region} onClick={() => handleRegionSelect(region)} className="group flex flex-col items-center gap-2">
                    <div className={`w-full aspect-square rounded-xl shadow bg-gradient-to-br ${config.gradient} text-white flex items-center justify-center transition-transform hover:scale-105`}>
                       <Icon className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{config.label.replace(' область', '')}</span>
                  </button>
                );
              })}
             </div>
          </div>
        </div>
      )}

      <header className="h-auto md:h-18 bg-white border-b border-slate-200 flex flex-wrap md:flex-nowrap items-center justify-between px-4 py-2 z-20 gap-2">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-teal-200 shrink-0"><HeartHandshake className="w-5 h-5" /></div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-800 leading-none">Мапа послуг</h1>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate max-w-[150px]">{activeRegion ? REGION_CONFIG[activeRegion].label : 'Вся Україна'}</span>
              <button onClick={() => setIsRegionModalOpen(true)} className="text-[10px] text-teal-600 font-bold bg-teal-50 px-1 rounded ml-1">ЗМІНИТИ</button>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-600 ml-auto"><Menu size={24} /></button>
        </div>

        <div className="flex-1 max-w-lg mx-4 hidden lg:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Пошук допомоги..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-teal-500/20" />
        </div>

        <div className="flex items-center gap-2 md:ml-auto w-full md:w-auto justify-between md:justify-end pb-1 md:pb-0">
          <button onClick={() => setIsAboutOpen(true)} className="w-10 h-10 text-rose-500 rounded-full hover:bg-rose-50 shrink-0"><Heart className="w-6 h-6 fill-rose-500" /></button>
          <button onClick={() => setIsRemoteSupportOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full font-bold text-xs border border-indigo-100 shrink-0 shadow-sm"><PhoneForwarded className="w-4 h-4" /><span>Дистанційна підтримка</span></button>
          <button onClick={() => setIsChatOpen(!isChatOpen)} className={`flex items-center gap-3 px-1.5 py-1.5 pr-4 rounded-full border transition-all shrink-0 ${isChatOpen ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-white hover:bg-slate-50 text-slate-700'}`}>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200"><img src={PANI_DUMKA_AVATAR} alt="Думка" className="w-full h-full object-cover" /></div>
            <div className="flex flex-col items-start leading-none"><span className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Помічниця</span><span className="font-bold text-sm">Думка</span></div>
          </button>
          <div className="hidden md:flex bg-slate-100 rounded-lg p-1 gap-1 shrink-0">
            <button onClick={() => { setViewMode(ViewMode.Grid); setIsSidebarOpen(true); }} className={`p-1.5 rounded ${viewMode === ViewMode.Grid ? 'bg-white shadow text-teal-600' : 'text-slate-400'}`}><TableIcon size={18} /></button>
            <button onClick={() => { setViewMode(ViewMode.Split); setIsSidebarOpen(true); }} className={`p-1.5 rounded ${viewMode === ViewMode.Split ? 'bg-white shadow text-teal-600' : 'text-slate-400'}`}><LayoutGrid size={18} /></button>
            <button onClick={() => setViewMode(ViewMode.Map)} className={`p-1.5 rounded ${viewMode === ViewMode.Map ? 'bg-white shadow text-teal-600' : 'text-slate-400'}`}><MapIcon size={18} /></button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className={`flex-1 flex ${viewMode === ViewMode.Split ? 'flex-col md:flex-row relative' : 'flex-col'}`}>
          <div className={`flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${viewMode === ViewMode.Split ? (isSidebarOpen ? 'h-1/2 md:h-full w-full md:w-1/2' : 'h-0 md:h-full w-full md:w-0 border-none') : (viewMode === ViewMode.Grid ? 'h-full w-full' : 'hidden')}`}>
             <div className="p-3 border-b border-slate-100 bg-white flex items-center justify-between z-30 relative" ref={filterRef}>
                <div className="flex items-center gap-2">
                   <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border ${isFilterOpen || activeFilterCount > 0 ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'}`}>
                     <Filter size={14} />Фільтри {activeFilterCount > 0 && <span className="bg-teal-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{activeFilterCount}</span>}
                   </button>
                   {(activeFilterCount > 0 || searchTerm) && <button onClick={resetFilters} className="text-[10px] text-rose-500 font-bold hover:underline px-2">Скинути</button>}
                </div>
                <div className="text-xs font-medium text-slate-400">{filteredOrgs.length} знайдено</div>
                {isFilterOpen && (
                  <div className="absolute top-full left-2 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50">
                    <h4 className="font-bold text-sm mb-3">Статус</h4>
                    <div className="space-y-2 mb-4">
                      {['Active', 'Pending', 'Inactive', 'In Development'].map(s => (
                        <label key={s} className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={selectedStatuses.includes(s)} onChange={() => toggleStatus(s)} /> {
                          s === 'Active' ? 'Активний' : 
                          s === 'Pending' ? 'Очікує' : 
                          s === 'In Development' ? 'В розробці' :
                          'Архів'
                        }</label>
                      ))}
                    </div>
                    <h4 className="font-bold text-sm mb-3 border-t pt-3">Категорія</h4>
                    <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
                      {availableCategories.map(c => (
                        <label key={c} className="flex items-center gap-2 text-xs cursor-pointer"><input type="checkbox" checked={selectedCategories.includes(c)} onChange={() => toggleCategory(c)} /> {c}</label>
                      ))}
                    </div>
                  </div>
                )}
             </div>
             <TableView organizations={filteredOrgs} selectedOrgId={selectedOrgId} onSelectOrg={handleOrgSelect} />
          </div>

          <div className={`relative bg-slate-200 transition-all duration-300 ${viewMode === ViewMode.Split ? (isSidebarOpen ? 'h-1/2 md:h-full w-full md:w-1/2' : 'h-full w-full') : (viewMode === ViewMode.Map ? 'h-full w-full' : 'hidden')}`}>
            {viewMode === ViewMode.Split && (
               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute z-[40] bg-white border border-slate-300 shadow-sm left-1/2 -translate-x-1/2 top-0 md:left-0 md:top-1/2 md:-translate-y-1/2 w-10 h-5 rounded-b-md md:w-5 md:h-10 md:rounded-r-md">
                 <div className="hidden md:block">{isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}</div>
                 <div className="block md:hidden">{isSidebarOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</div>
               </button>
            )}
            {viewMode !== ViewMode.Grid && <MapView organizations={filteredOrgs} selectedOrgId={selectedOrgId} onSelectOrg={handleOrgSelect} onOpenReferral={handleOpenReferral} center={mapCenter} zoom={mapZoom} />}
          </div>
        </div>
        <GeminiChat organizations={filteredOrgs} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>
    </div>
  );
};

export default App;