
import React, { useState, useMemo, useEffect } from 'react';
import { LayoutGrid, Map as MapIcon, Table as TableIcon, Search, Sparkles, HeartHandshake, MapPin, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, PhoneForwarded, Anchor, Ship, Sun, Building2, Zap, Landmark, Coffee, GraduationCap, Globe, Castle, Trees, Mountain, Wheat, Church, Flower2, Shield } from 'lucide-react';
import { MapView } from './components/MapView';
import { TableView } from './components/TableView';
import { GeminiChat } from './components/GeminiChat';
import { IntroModal } from './components/IntroModal';
import { RemoteSupportModal } from './components/RemoteSupportModal';
import { ReferralModal } from './components/ReferralModal'; // Import Referral Modal
import { INITIAL_ORGANIZATIONS, REGION_CONFIG } from './constants';
import { Organization, ViewMode, RegionName } from './types';

const App: React.FC = () => {
  const [organizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Split);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Remote Support Modal State
  const [isRemoteSupportOpen, setIsRemoteSupportOpen] = useState(false);

  // Referral Modal State
  const [referralOrg, setReferralOrg] = useState<Organization | null>(null);

  // Sidebar state for Split View
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Region State
  const [activeRegion, setActiveRegion] = useState<RegionName>('All'); // Default to All
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  // Intro/Onboarding State
  const [showIntro, setShowIntro] = useState(false);

  // Filter states
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Initialization Logic
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hide_intro_annotation');
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
      // Ensure modal is open on first load if not explicitly set otherwise, or keep closed and default to 'All'
      setIsRegionModalOpen(true);
    } else {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsRegionModalOpen(true);
  };

  const handleRegionSelect = (region: RegionName) => {
    setActiveRegion(region);
    setIsRegionModalOpen(false);
    // Reset selection when changing regions
    setSelectedOrgId(null);
  };

  // Derive unique categories for the filter dropdown
  const availableCategories = useMemo(() => 
    Array.from(new Set(organizations.map(o => o.category))).sort(), 
  [organizations]);

  // Helper function for sorting priority
  const getOrganizationPriority = (org: Organization) => {
    const name = org.name.toUpperCase();
    const category = org.category.toUpperCase();

    // Priority 1: "ПОСМІШКА ЮА" (ALWAYS FIRST)
    if (name.includes("ПОСМІШКА ЮА")) return 1;

    // Priority 2: Communal/State Institutions
    // Checks for specific keywords in name or category
    if (
      category.includes("КОМУНАЛЬН") || 
      name.includes("ДЕПАРТАМЕНТ") || 
      name.includes("УПРАВЛІННЯ") || 
      name.includes("ЛІКАРНЯ") || 
      name.includes("ЦЕНТР") ||
      name.includes("СЛУЖБА") ||
      name.includes("ПОЛІКЛІНІКА") ||
      name.includes("СОЦЗАХИСТ") ||
      name.includes("АДМІНІСТРАЦІЯ") ||
      name.includes("РАДА")
    ) return 2;

    // Priority 3: "Дівчата"
    if (name.includes("ДІВЧАТА")) return 3;

    // Priority 4: Everything else
    return 4;
  };

  const filteredOrgs = organizations.filter(c => {
    // 1. Filter by Region (if not 'All')
    if (activeRegion && activeRegion !== 'All' && c.region !== activeRegion) {
      return false;
    }

    // 2. Filter by Search Term
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 3. Filter by Dropdowns
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || c.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    const priorityA = getOrganizationPriority(a);
    const priorityB = getOrganizationPriority(b);

    // Sort by priority group first
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // If priorities match, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });

  const handleOrgSelect = (id: string) => {
    setSelectedOrgId(id);
    if (viewMode === ViewMode.Map) {
      setViewMode(ViewMode.Split);
      setIsSidebarOpen(true); // Ensure sidebar opens when selecting from map
    }
  };

  // Handler for opening Referral Modal
  const handleOpenReferral = (org: Organization) => {
    setReferralOrg(org);
  };

  // Determine Map Center and Zoom with strict validation to prevent NaN errors
  const mapCenter: [number, number] = useMemo(() => {
    if (activeRegion && REGION_CONFIG[activeRegion]) {
      return REGION_CONFIG[activeRegion].center;
    }
    return REGION_CONFIG['All'].center; 
  }, [activeRegion]);
  
  const mapZoom = useMemo(() => {
    if (activeRegion && REGION_CONFIG[activeRegion]) {
      return REGION_CONFIG[activeRegion].zoom;
    }
    return REGION_CONFIG['All'].zoom;
  }, [activeRegion]);

  // Helper to get region styling
  const getRegionVisuals = (region: RegionName) => {
    switch (region) {
      case 'All':
        return {
          gradient: 'from-blue-600 to-yellow-500',
          icon: <Globe className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Єдина країна'
        };
      case 'Odesa':
        return {
          gradient: 'from-blue-400 to-teal-500',
          icon: <Anchor className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Перлина біля моря'
        };
      case 'Mykolaiv':
        return {
          gradient: 'from-indigo-400 to-blue-600',
          icon: <Ship className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Місто на хвилі'
        };
      case 'Kherson':
        return {
          gradient: 'from-yellow-400 to-green-500',
          icon: <Sun className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Сонячний край'
        };
      case 'Dnipro':
        return {
          gradient: 'from-sky-500 to-indigo-700',
          icon: <Building2 className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Серце індустрії'
        };
      case 'Zaporizhzhia':
        return {
          gradient: 'from-orange-400 to-rose-600',
          icon: <Zap className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Козацька сила'
        };
      case 'Kyiv':
        return {
          gradient: 'from-blue-700 to-yellow-400',
          icon: <Landmark className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Серце України'
        };
      case 'Lviv':
        return {
          gradient: 'from-amber-700 to-orange-500',
          icon: <Coffee className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Західний форпост'
        };
      case 'Kharkiv':
        return {
          gradient: 'from-green-600 to-emerald-400',
          icon: <GraduationCap className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Місто героїв'
        };
      case 'Volyn':
        return {
          gradient: 'from-green-700 to-emerald-600',
          icon: <Castle className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Замок Любарта'
        };
      case 'Zhytomyr':
        return {
          gradient: 'from-emerald-600 to-green-800',
          icon: <Trees className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Полісся'
        };
      case 'Rivne':
        return {
          gradient: 'from-emerald-500 to-teal-700',
          icon: <Trees className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Бурштиновий край'
        };
      case 'Sumy':
        return {
          gradient: 'from-blue-500 to-yellow-500',
          icon: <Wheat className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Північний форпост'
        };
      case 'Ternopil':
        return {
          gradient: 'from-teal-600 to-green-700',
          icon: <Castle className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Файне місто'
        };
      case 'Chernivtsi':
        return {
          gradient: 'from-red-700 to-rose-900',
          icon: <Building2 className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Буковинська перлина'
        };
      case 'Khmelnytskyi':
        return {
          gradient: 'from-indigo-600 to-purple-700',
          icon: <Shield className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Подільський край'
        };
      case 'Chernihiv':
        return {
          gradient: 'from-slate-600 to-gray-800',
          icon: <Church className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Місто легенд'
        };
      case 'IvanoFrankivsk':
        return {
          gradient: 'from-sky-600 to-blue-800',
          icon: <Mountain className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Прикарпаття'
        };
      case 'Kirovohrad':
        return {
          gradient: 'from-amber-500 to-yellow-600',
          icon: <Wheat className="w-12 h-12 text-white drop-shadow-md" />,
          description: 'Золоте серце'
        };
      default:
        return {
          gradient: 'from-slate-400 to-slate-600',
          icon: <MapPin className="w-12 h-12 text-white" />,
          description: 'Регіон'
        };
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden relative">
      
      {/* Intro / Annotation Modal (Highest Priority) */}
      {showIntro && (
        <IntroModal onComplete={handleIntroComplete} />
      )}

      {/* Referral Modal */}
      {referralOrg && (
        <ReferralModal 
          organization={referralOrg} 
          onClose={() => setReferralOrg(null)} 
        />
      )}

      {/* Remote Support Modal */}
      {isRemoteSupportOpen && (
        <RemoteSupportModal onClose={() => setIsRemoteSupportOpen(false)} />
      )}

      {/* Welcome / Region Selection Modal */}
      {isRegionModalOpen && !showIntro && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full p-6 md:p-10 text-center animate-in fade-in zoom-in duration-300 relative overflow-hidden my-auto">
            
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"></div>

            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 shadow-inner">
              <HeartHandshake className="w-8 h-8" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">
              Вітаємо всіх, хто шукає допомогу та підтримку на нашій мапі.
            </h1>
            <p className="text-base text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed">
              Оберіть ваш регіон, щоб побачити доступні послуги допомоги
            </p>
            
            {/* Region Grid - Modern Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {(Object.keys(REGION_CONFIG) as RegionName[]).sort((a, b) => {
                  if (a === 'All') return -1;
                  if (b === 'All') return 1;
                  return REGION_CONFIG[a].label.localeCompare(REGION_CONFIG[b].label, 'uk');
              }).map((region) => {
                const visuals = getRegionVisuals(region);
                return (
                  <button
                    key={region}
                    onClick={() => handleRegionSelect(region)}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-48 sm:h-56"
                  >
                    {/* Visual Header */}
                    <div className={`h-24 sm:h-32 bg-gradient-to-br ${visuals.gradient} flex items-center justify-center relative overflow-hidden`}>
                       {/* Background Pattern */}
                       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent scale-150"></div>
                       
                       {/* Icon with scale effect */}
                       <div className="transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                         {visuals.icon}
                       </div>
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 p-3 sm:p-4 flex flex-col items-center justify-center bg-white relative z-10">
                      <span className="font-bold text-slate-800 text-sm sm:text-base md:text-lg group-hover:text-teal-700 transition-colors leading-tight mb-1">
                        {REGION_CONFIG[region].label.replace(' область', '')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">
                        {visuals.description}
                      </span>
                      
                      {/* Active Indicator Line */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <p className="mt-8 text-[10px] text-slate-400 font-medium uppercase tracking-widest opacity-60">
              Інклюзивна мапа соціальних послуг України
            </p>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-teal-200">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-800 leading-none">
              Мапа соціальних послуг
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                {activeRegion ? REGION_CONFIG[activeRegion].label : 'Вся Україна'}
              </span>
              <button 
                onClick={() => setIsRegionModalOpen(true)}
                className="text-[10px] text-teal-600 hover:text-teal-800 hover:underline font-bold px-1.5 py-0.5 rounded bg-teal-50"
              >
                ЗМІНИТИ
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Пошук (назва, категорія, адреса, контакти)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          
          {/* Remote Support Button (New) */}
          <button 
            onClick={() => setIsRemoteSupportOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-bold text-xs transition-colors border border-rose-200"
            title="Дистанційна підтримка будь-де"
          >
            <PhoneForwarded className="w-4 h-4" />
            <span className="hidden md:inline">Дистанційна підтримка</span>
          </button>

          {/* View Toggles */}
          <div className="hidden md:flex bg-slate-100 rounded-lg p-1 gap-1 mr-2">
            <button
              onClick={() => { setViewMode(ViewMode.Grid); setIsSidebarOpen(true); }}
              className={`p-2 rounded-md transition ${viewMode === ViewMode.Grid ? 'bg-white shadow text-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
              title="Таблиця"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setViewMode(ViewMode.Split); setIsSidebarOpen(true); }}
              className={`p-2 rounded-md transition ${viewMode === ViewMode.Split ? 'bg-white shadow text-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
              title="Розділений вид"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode(ViewMode.Map)}
              className={`p-2 rounded-md transition ${viewMode === ViewMode.Map ? 'bg-white shadow text-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
              title="Карта"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition border ${
                isChatOpen 
                ? 'bg-teal-50 border-teal-200 text-teal-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Помічниця</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Container handling layout logic */}
        <div className={`flex-1 flex ${viewMode === ViewMode.Split ? 'flex-col md:flex-row relative' : 'flex-col'}`}>
          
          {/* Table Section */}
          <div className={`
            transition-all duration-300 ease-in-out overflow-hidden
            ${viewMode === ViewMode.Split
               ? (isSidebarOpen ? 'h-1/2 md:h-full w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-200 opacity-100' : 'h-0 md:h-full w-full md:w-0 border-none opacity-0')
               : (viewMode === ViewMode.Grid ? 'h-full w-full opacity-100' : 'hidden')
            }
          `}>
            {viewMode !== ViewMode.Map && (
              <TableView 
                organizations={filteredOrgs} 
                selectedOrgId={selectedOrgId}
                onSelectOrg={handleOrgSelect}
                filterStatus={filterStatus}
                onFilterStatusChange={setFilterStatus}
                filterCategory={filterCategory}
                onFilterCategoryChange={setFilterCategory}
                availableCategories={availableCategories}
              />
            )}
          </div>

          {/* Map Section */}
          <div className={`
            relative bg-slate-200 transition-all duration-300 ease-in-out
            ${viewMode === ViewMode.Split
               ? (isSidebarOpen ? 'h-1/2 md:h-full w-full md:w-1/2' : 'h-full w-full')
               : (viewMode === ViewMode.Map ? 'h-full w-full' : 'hidden')
            }
          `}>
            {/* Toggle Button for Sidebar (Only in Split View) */}
            {viewMode === ViewMode.Split && (
               <button
                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                 className={`
                   absolute z-[40] flex items-center justify-center bg-white border border-slate-300 shadow-sm text-slate-500 hover:text-teal-600 hover:bg-slate-50 transition-all focus:outline-none
                   /* Mobile positioning: Top edge, horizontal toggle */
                   left-1/2 -translate-x-1/2 top-0 w-10 h-5 rounded-b-md border-t-0
                   /* Desktop positioning: Left edge, vertical toggle */
                   md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-5 md:h-10 md:rounded-r-md md:rounded-bl-none md:border-l-0
                 `}
                 title={isSidebarOpen ? "Згорнути панель" : "Розгорнути панель"}
               >
                 {/* Icons based on state and screen size (handled via CSS visibility if needed, or JS check) */}
                 <div className="hidden md:block">
                   {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                 </div>
                 <div className="block md:hidden">
                   {isSidebarOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                 </div>
               </button>
            )}

            {viewMode !== ViewMode.Grid && (
               <MapView 
                 organizations={filteredOrgs}
                 selectedOrgId={selectedOrgId}
                 onSelectOrg={handleOrgSelect}
                 onOpenReferral={handleOpenReferral} // Pass the handler
                 center={mapCenter}
                 zoom={mapZoom}
               />
            )}
          </div>

        </div>

        {/* AI Chat Overlay */}
        <GeminiChat 
          organizations={filteredOrgs}
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />

      </main>
    </div>
  );
};

export default App;
