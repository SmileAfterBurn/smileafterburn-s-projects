
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LayoutGrid, Map as MapIcon, Table as TableIcon, Search, Sparkles, HeartHandshake, MapPin, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, PhoneForwarded, Anchor, Ship, Sun, Building2, Zap, Landmark, Coffee, GraduationCap, Globe, Castle, Trees, Mountain, Wheat, Church, Flower2, Shield, Info, Heart, Menu, X, Filter, Check, MessageCircle } from 'lucide-react';
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

const App: React.FC = () => {
  const [organizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Split);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Modals State
  const [isRemoteSupportOpen, setIsRemoteSupportOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [referralOrg, setReferralOrg] = useState<Organization | null>(null);

  // Sidebar state for Split View
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Region State
  const [activeRegion, setActiveRegion] = useState<RegionName>('All');
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  // Intro/Onboarding State
  const [showIntro, setShowIntro] = useState(false);

  // --- NEW FILTER STATE ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialization Logic
  useEffect(() => {
    // 1. Check Intro status
    const hasSeenIntro = localStorage.getItem('hide_intro_annotation');
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
    } else {
      setShowIntro(true);
      return; 
    }

    // 2. Parse URL Params
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

  // Sync URL with State
  useEffect(() => {
    try {
      if (window.history && typeof window.history.replaceState === 'function') {
        const params = new URLSearchParams(window.location.search);
        
        if (activeRegion && activeRegion !== 'All') {
          params.set('region', activeRegion);
        } else {
          params.delete('region');
        }

        if (selectedOrgId) {
          params.set('org', selectedOrgId);
        } else {
          params.delete('org');
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, '', newUrl);
      }
    } catch (e) {}
  }, [activeRegion, selectedOrgId]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    if (activeRegion === 'All') {
      setIsRegionModalOpen(true);
    }
  };

  const handleRegionSelect = (region: RegionName) => {
    setActiveRegion(region);
    setIsRegionModalOpen(false);
    setSelectedOrgId(null);
  };

  // Derive unique categories
  const availableCategories = useMemo(() => 
    Array.from(new Set(organizations.map(o => o.category))).sort(), 
  [organizations]);

  // Priority Sorting Logic Updated
  const getOrganizationPriority = (org: Organization) => {
    const name = org.name.toLowerCase();
    const category = org.category.toLowerCase();

    // 1. Posmishka Sobornyi (Main)
    if (name.includes("посмішка") && name.includes("соборний")) return 1;
    
    // 2. Posmishka Nezalezhnoi (Office 2)
    if (name.includes("посмішка") && name.includes("незалежної")) return 2;
    
    // 3. NGO Divchata
    if (name.includes("дівчата")) return 3;

    // 4. Municipal Institutions (Social Protection, Departments)
    if (
      category.includes("комунальн") || 
      name.includes("департамент") || 
      name.includes("управління") || 
      name.includes("центр соціальних") || 
      name.includes("служба")
    ) return 4;

    // 5. International/Major NGOs (Red Cross, Caritas)
    if (
      name.includes("червоний хрест") || 
      name.includes("карітас") ||
      name.includes("проліска") ||
      name.includes("рокада") || 
      name.includes("irc")
    ) return 5;

    // 6. Others
    return 6;
  };

  const filteredOrgs = organizations.filter(c => {
    // 1. Region
    if (activeRegion && activeRegion !== 'All' && c.region !== activeRegion) {
      return false;
    }

    // 2. Search
    const term = searchTerm.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term) ||
      c.address.toLowerCase().includes(term) ||
      c.phone.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term);
    
    if (!matchesSearch) return false;

    // 3. Status (Multi-select)
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(c.status)) {
      return false;
    }

    // 4. Category (Multi-select)
    if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    const priorityA = getOrganizationPriority(a);
    const priorityB = getOrganizationPriority(b);
    if (priorityA !== priorityB) return priorityA - priorityB;
    return a.name.localeCompare(b.name);
  });

  const handleOrgSelect = (id: string) => {
    setSelectedOrgId(id);
    if (viewMode === ViewMode.Map) {
      setViewMode(ViewMode.Split);
      setIsSidebarOpen(true);
    }
  };

  const handleOpenReferral = (org: Organization) => {
    setReferralOrg(org);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSelectedStatuses([]);
    setSelectedCategories([]);
    setSearchTerm('');
  };

  // Map settings
  const mapCenter: [number, number] = useMemo(() => {
    if (activeRegion && REGION_CONFIG[activeRegion]) return REGION_CONFIG[activeRegion].center;
    return REGION_CONFIG['All'].center; 
  }, [activeRegion]);
  
  const mapZoom = useMemo(() => {
    if (activeRegion && REGION_CONFIG[activeRegion]) return REGION_CONFIG[activeRegion].zoom;
    return REGION_CONFIG['All'].zoom;
  }, [activeRegion]);

  // Calculate active filter count
  const activeFilterCount = selectedStatuses.length + selectedCategories.length;

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden relative font-sans">
      
      {showIntro && <IntroModal onComplete={handleIntroComplete} />}
      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      {referralOrg && <ReferralModal organization={referralOrg} onClose={() => setReferralOrg(null)} />}
      {isRemoteSupportOpen && <RemoteSupportModal onClose={() => setIsRemoteSupportOpen(false)} />}

      {/* Region Modal */}
      {isRegionModalOpen && !showIntro && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full p-6 md:p-10 text-center animate-in fade-in zoom-in duration-300 relative overflow-hidden my-auto">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"></div>
             <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Вітаємо на Мапі соціальних послуг</h1>
             <p className="text-slate-500 mb-8">Оберіть ваш регіон</p>
             <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {(Object.keys(REGION_CONFIG) as RegionName[]).sort().map(region => (
                <button key={region} onClick={() => handleRegionSelect(region)} className="p-4 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition font-bold text-sm">
                  {REGION_CONFIG[region].label}
                </button>
              ))}
             </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="h-auto md:h-18 bg-white border-b border-slate-200 flex flex-wrap md:flex-nowrap items-center justify-between px-4 py-2 shrink-0 z-20 relative gap-y-2">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-teal-200 shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-800 leading-none">
              Мапа послуг
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate max-w-[150px]">
                {activeRegion ? REGION_CONFIG[activeRegion].label : 'Вся Україна'}
              </span>
              <button onClick={() => setIsRegionModalOpen(true)} className="text-[10px] text-teal-600 hover:underline font-bold bg-teal-50 px-1.5 rounded shrink-0">ЗМІНИТИ</button>
            </div>
          </div>
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg ml-auto">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Search */}
        <div className="flex-1 max-w-lg mx-4 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Пошук (назва, послуги, адреса)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium"
            />
          </div>
        </div>

        {/* Action Buttons Area */}
        <div className="flex items-center gap-2 md:ml-auto w-full md:w-auto justify-between md:justify-end overflow-x-auto pb-1 md:pb-0">
          
          {/* Support Project (Heart) */}
          <button
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center justify-center w-10 h-10 text-rose-500 hover:bg-rose-50 rounded-full transition-colors shrink-0"
            title="Підтримати проект"
          >
            <Heart className="w-6 h-6 fill-rose-500" />
          </button>

          {/* Remote Support Button */}
          <button 
            onClick={() => setIsRemoteSupportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full font-bold text-xs transition-colors border border-indigo-100 shrink-0 shadow-sm"
            title="Телефони гарячих ліній та онлайн допомога"
          >
            <PhoneForwarded className="w-4 h-4" />
            <span>Дистанційна підтримка</span>
          </button>

          {/* Assistant Button (Big with Avatar) */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`flex items-center gap-3 px-1.5 py-1.5 pr-4 rounded-full transition-all border shadow-sm shrink-0 group ${
                isChatOpen 
                ? 'bg-teal-50 border-teal-200 text-teal-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 group-hover:border-teal-300 transition-colors">
               <img src={PANI_DUMKA_AVATAR} alt="Думка" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-start leading-none">
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Помічниця</span>
               <span className="font-bold text-sm">Думка</span>
            </div>
          </button>

          {/* Desktop View Toggles */}
          <div className="hidden md:flex bg-slate-100 rounded-lg p-1 gap-1 ml-2 shrink-0">
            <button onClick={() => { setViewMode(ViewMode.Grid); setIsSidebarOpen(true); }} className={`p-1.5 rounded transition ${viewMode === ViewMode.Grid ? 'bg-white shadow text-teal-600' : 'text-slate-400'}`}><TableIcon size={18} /></button>
            <button onClick={() => { setViewMode(ViewMode.Split); setIsSidebarOpen(true); }} className={`p-1.5 rounded transition ${viewMode === ViewMode.Split ? 'bg-white shadow text-teal-600' : 'text-slate-400'}`}><LayoutGrid size={18} /></button>
            <button onClick={() => setViewMode(ViewMode.Map)} className={`p-1.5 rounded transition ${viewMode === ViewMode.Map ? 'bg-white shadow text-teal-600' : 'text-slate-400'}`}><MapIcon size={18} /></button>
          </div>
        </div>

        {/* Mobile Menu (Simplified - removed Filters and Remote Support since they are visible now) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl z-[60] flex flex-col p-4 animate-in slide-in-from-top-2 duration-200 md:hidden">
             <input type="text" placeholder="Пошук..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 bg-slate-100 rounded-xl mb-4 text-sm" />
             <div className="grid grid-cols-3 gap-2 mt-2 bg-slate-100 p-1 rounded-xl">
                <button onClick={() => { setViewMode(ViewMode.Grid); setIsSidebarOpen(true); setIsMobileMenuOpen(false); }} className={`p-2 rounded-lg text-xs font-bold ${viewMode === ViewMode.Grid ? 'bg-white shadow' : ''}`}>Таблиця</button>
                <button onClick={() => { setViewMode(ViewMode.Split); setIsSidebarOpen(true); setIsMobileMenuOpen(false); }} className={`p-2 rounded-lg text-xs font-bold ${viewMode === ViewMode.Split ? 'bg-white shadow' : ''}`}>Спільний</button>
                <button onClick={() => { setViewMode(ViewMode.Map); setIsMobileMenuOpen(false); }} className={`p-2 rounded-lg text-xs font-bold ${viewMode === ViewMode.Map ? 'bg-white shadow' : ''}`}>Мапа</button>
             </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className={`flex-1 flex ${viewMode === ViewMode.Split ? 'flex-col md:flex-row relative' : 'flex-col'}`}>
          
          {/* Sidebar / List */}
          <div className={`
            flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out overflow-hidden
            ${viewMode === ViewMode.Split
               ? (isSidebarOpen ? 'h-1/2 md:h-full w-full md:w-1/2 opacity-100' : 'h-0 md:h-full w-full md:w-0 border-none opacity-0')
               : (viewMode === ViewMode.Grid ? 'h-full w-full opacity-100' : 'hidden')
            }
          `}>
             {/* Filter Bar (Placed here as requested "near list of people") */}
             <div className="p-3 border-b border-slate-100 bg-white flex items-center justify-between z-30 relative" ref={filterRef}>
                <div className="flex items-center gap-2">
                   <button 
                     onClick={() => setIsFilterOpen(!isFilterOpen)}
                     className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors border ${
                       isFilterOpen || activeFilterCount > 0 
                         ? 'bg-slate-800 text-white border-slate-800' 
                         : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                     }`}
                   >
                     <Filter size={14} />
                     Фільтри
                     {activeFilterCount > 0 && (
                       <span className="bg-teal-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full -mr-1">
                         {activeFilterCount}
                       </span>
                     )}
                   </button>

                   {(activeFilterCount > 0 || searchTerm) && (
                     <button onClick={resetFilters} className="text-[10px] text-rose-500 font-bold hover:underline px-2">
                       Скинути
                     </button>
                   )}
                </div>
                <div className="text-xs font-medium text-slate-400">
                  {filteredOrgs.length} знайдено
                </div>

                {/* Filter Popover */}
                {isFilterOpen && (
                  <div className="absolute top-full left-2 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50 animate-in zoom-in-95 duration-200">
                    <h4 className="font-bold text-sm text-slate-800 mb-3">Статус організації</h4>
                    <div className="space-y-2 mb-4">
                      {['Active', 'Pending', 'Inactive'].map(status => (
                        <label key={status} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                           <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedStatuses.includes(status) ? 'bg-slate-800 border-slate-800' : 'border-slate-300'}`}>
                              {selectedStatuses.includes(status) && <Check size={10} className="text-white" />}
                           </div>
                           <input type="checkbox" className="hidden" checked={selectedStatuses.includes(status)} onChange={() => toggleStatus(status)} />
                           <span className="text-slate-600">{status === 'Active' ? 'Активний' : status === 'Pending' ? 'В очікуванні' : 'Неактивний'}</span>
                        </label>
                      ))}
                    </div>
                    
                    <h4 className="font-bold text-sm text-slate-800 mb-3 border-t border-slate-100 pt-3">Тип закладу</h4>
                    <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
                      {availableCategories.map(cat => (
                        <label key={cat} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-slate-50 p-1.5 rounded">
                           <div className={`w-3 h-3 rounded border flex items-center justify-center transition-colors shrink-0 ${selectedCategories.includes(cat) ? 'bg-teal-600 border-teal-600' : 'border-slate-300'}`}>
                              {selectedCategories.includes(cat) && <Check size={8} className="text-white" />}
                           </div>
                           <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                           <span className="text-slate-600 leading-tight">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
             </div>

             <TableView 
                organizations={filteredOrgs} 
                selectedOrgId={selectedOrgId}
                onSelectOrg={handleOrgSelect}
                filterStatus="All" // Deprecated props, functionality moved to app level
                onFilterStatusChange={() => {}}
                filterCategory="All"
                onFilterCategoryChange={() => {}}
                availableCategories={[]}
              />
          </div>

          {/* Map Section */}
          <div className={`
            relative bg-slate-200 transition-all duration-300 ease-in-out
            ${viewMode === ViewMode.Split
               ? (isSidebarOpen ? 'h-1/2 md:h-full w-full md:w-1/2' : 'h-full w-full')
               : (viewMode === ViewMode.Map ? 'h-full w-full' : 'hidden')
            }
          `}>
            {viewMode === ViewMode.Split && (
               <button
                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                 className="absolute z-[40] flex items-center justify-center bg-white border border-slate-300 shadow-sm text-slate-500 hover:text-teal-600 hover:bg-slate-50 transition-all focus:outline-none left-1/2 -translate-x-1/2 top-0 w-10 h-5 rounded-b-md border-t-0 md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-5 md:h-10 md:rounded-r-md md:rounded-bl-none md:border-l-0"
               >
                 <div className="hidden md:block">{isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}</div>
                 <div className="block md:hidden">{isSidebarOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</div>
               </button>
            )}

            {viewMode !== ViewMode.Grid && (
               <MapView 
                 organizations={filteredOrgs}
                 selectedOrgId={selectedOrgId}
                 onSelectOrg={handleOrgSelect}
                 onOpenReferral={handleOpenReferral}
                 center={mapCenter}
                 zoom={mapZoom}
               />
            )}
          </div>
        </div>

        <GeminiChat organizations={filteredOrgs} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>
    </div>
  );
};

export default App;
