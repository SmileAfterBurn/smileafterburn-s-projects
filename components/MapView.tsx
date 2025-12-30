import { useEffect, useState, useMemo, useRef, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, AttributionControl, ZoomControl } from 'react-leaflet';
import { Organization } from '../types';
import { MapPin, Phone, FileText, Locate, Loader2, AlertCircle, ExternalLink, Clock, Globe } from 'lucide-react';
import L from 'leaflet';

/**
 * Strictly validates if a value is a finite number suitable for coordinates.
 */
const isNumeric = (val: any): val is number => {
  if (typeof val === 'number') return !isNaN(val) && isFinite(val);
  if (typeof val === 'string') {
    const n = parseFloat(val);
    return !isNaN(n) && isFinite(n);
  }
  return false;
};

/**
 * Checks if a pair of coordinates is valid for Leaflet.
 */
const isValidLatLng = (lat: any, lng: any): boolean => {
  if (!isNumeric(lat) || !isNumeric(lng)) return false;
  const nLat = Number(lat);
  const nLng = Number(lng);
  return Math.abs(nLat) <= 90 && Math.abs(nLng) <= 180;
};

// Function to create custom SVG icons
const createCustomIcon = (color: string, size: number, isSelected: boolean = false) => {
  const scale = isSelected ? '1.2' : '1';
  const strokeColor = isSelected ? '#ffffff' : 'white';
  const strokeWidth = isSelected ? '3' : '2';
  
  return new L.DivIcon({
    className: `custom-marker-${isSelected ? 'selected' : 'default'}`,
    html: `
      <div style="transform: scale(${scale}); transition: transform 0.2s ease-out;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-9 13-9 13s-9-7-9-13a6.5 6.5 0 0 1 13 0Z"></path>
          <circle cx="12" cy="10" r="3" fill="white"></circle>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const ICONS = {
  default: createCustomIcon('#0d9488', 32, false),
  dev: createCustomIcon('#3b82f6', 32, false),
  selected: createCustomIcon('#e11d48', 42, true),
  user: new L.DivIcon({
    className: 'user-location-icon',
    html: `<div class="relative flex h-8 w-8"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span class="relative inline-flex rounded-full h-8 w-8 bg-blue-600 border-4 border-white shadow-lg"></span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
};

interface MapViewProps {
  organizations: Organization[];
  selectedOrgId: string | null;
  onSelectOrg: (id: string) => void;
  onOpenReferral: (org: Organization) => void;
  center?: [number, number];
  zoom?: number;
}

const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  const lastTarget = useRef<string>("");

  useEffect(() => {
    if (!map) return;
    
    if (!isValidLatLng(center[0], center[1])) {
      console.warn("MapUpdater: Skipping move due to invalid Lat/Lng", center);
      return;
    }

    const [lat, lng] = [Number(center[0]), Number(center[1])];
    const validZoom = isNumeric(zoom) ? Number(zoom) : 6;
    const targetKey = `${lat.toFixed(4)},${lng.toFixed(4)},${validZoom}`;
    
    if (lastTarget.current === targetKey) return;

    map.invalidateSize();
    try {
      map.flyTo([lat, lng], validZoom, { 
        duration: 1.2,
        easeLinearity: 0.3
      });
      lastTarget.current = targetKey;
    } catch (e) {
      console.warn("Leaflet flyTo failed:", e);
    }
  }, [center, zoom, map]);

  return null;
};

const OrganizationMarker = memo(({ org, isSelected, onSelectOrg, onOpenReferral }: { 
  org: Organization, 
  isSelected: boolean, 
  onSelectOrg: (id: string) => void,
  onOpenReferral: (org: Organization) => void
}) => {
  if (!isValidLatLng(org.lat, org.lng)) {
    console.warn(`Skipping marker for ${org.name} due to invalid coordinates: [${org.lat}, ${org.lng}]`);
    return null;
  }

  const icon = isSelected ? ICONS.selected : (org.status === 'In Development' ? ICONS.dev : ICONS.default);
  const cleanPhone = org.phone ? org.phone.replace(/[^\d+]/g, '') : '';
  const pos: [number, number] = [Number(org.lat), Number(org.lng)];

  return (
    <Marker
      position={pos}
      icon={icon}
      eventHandlers={{ click: () => onSelectOrg(org.id) }}
      zIndexOffset={isSelected ? 1000 : 0}
    >
      <Popup className="custom-org-popup" minWidth={280} maxWidth={320}>
        <div className="flex flex-col overflow-hidden rounded-xl max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className={`p-4 shrink-0 ${isSelected ? 'bg-rose-600' : 'bg-teal-700'} text-white`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-black uppercase tracking-widest border border-white/10">
                {org.category}
              </span>
            </div>
            <h3 className="font-bold text-base leading-tight">{org.name}</h3>
          </div>
          <div className="p-4 space-y-4 bg-white">
            {/* Основна адреса */}
            <div className="text-xs text-slate-600 flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
              {org.address}
            </div>

            {/* Робочі години */}
            {org.workingHours && (
              <div className="text-xs text-slate-600 flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" />
                <span className="font-medium">{org.workingHours}</span>
              </div>
            )}

            {/* Опис послуг */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Послуги:</p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-3">{org.services}</p>
            </div>

            {/* Важливі примітки */}
            {org.notes && (
              <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100 flex gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-800 leading-tight font-medium italic">{org.notes}</p>
              </div>
            )}

            {/* Контакти */}
            <div className="space-y-2 pt-1">
              <div className="flex flex-col gap-1.5">
                {org.phone && (
                  <a href={`tel:${cleanPhone}`} className="flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-teal-700 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-teal-600" /> {org.phone}
                  </a>
                )}
                {org.additionalPhones?.map((phone, idx) => (
                  <a key={idx} href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-700 ml-5 transition-colors">
                    {phone}
                  </a>
                ))}
              </div>

              {org.website && (
                <a 
                  href={org.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors pt-1"
                >
                  <Globe className="w-3.5 h-3.5" /> 
                  Відвідати веб-сайт 
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            {/* Кнопка перенаправлення */}
            <div className="pt-2">
              {org.email && (
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenReferral(org); }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-lg transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" /> Надіслати запит
                </button>
              )}
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
});

export const MapView: React.FC<MapViewProps> = ({ 
  organizations, 
  selectedOrgId, 
  onSelectOrg,
  onOpenReferral,
  center = [48.3794, 31.1656], 
  zoom = 6
}) => {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  
  const targetCenter = useMemo<[number, number]>(() => {
    const defaultCenter: [number, number] = [48.3794, 31.1656];
    
    if (selectedOrgId) {
      const selectedOrg = organizations.find(o => o.id === selectedOrgId);
      if (selectedOrg && isValidLatLng(selectedOrg.lat, selectedOrg.lng)) {
        return [Number(selectedOrg.lat), Number(selectedOrg.lng)];
      }
    }
    
    if (center && isValidLatLng(center[0], center[1])) {
      return [Number(center[0]), Number(center[1])];
    }
    
    return defaultCenter;
  }, [selectedOrgId, organizations, center]);

  const targetZoom = useMemo(() => {
    const selectedOrg = selectedOrgId ? organizations.find(o => o.id === selectedOrgId) : null;
    return selectedOrg ? 15 : (isNumeric(zoom) ? Number(zoom) : 6);
  }, [selectedOrgId, organizations, zoom]);

  const markers = useMemo(() => (
    organizations.map(org => (
      <OrganizationMarker 
        key={org.id} 
        org={org} 
        isSelected={selectedOrgId === org.id} 
        onSelectOrg={onSelectOrg} 
        onOpenReferral={onOpenReferral}
      />
    ))
  ), [organizations, selectedOrgId, onSelectOrg, onOpenReferral]);

  if (!isValidLatLng(targetCenter[0], targetCenter[1])) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 gap-2">
        <AlertCircle size={48} className="text-rose-500" />
        <p className="font-bold">Помилка завантаження координат</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative overflow-hidden bg-slate-100">
      <style>{`
        .leaflet-popup-content-wrapper { border-radius: 1rem; padding: 0; overflow: hidden; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
        .leaflet-popup-content { margin: 0; }
        .leaflet-container { background: #f1f5f9; }
      `}</style>
      <MapContainer
        center={targetCenter}
        zoom={targetZoom}
        preferCanvas={true}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
        zoomControl={false}
        className="z-0"
      >
        <AttributionControl prefix="Ілля Чернов" position="bottomright" />
        <ZoomControl position="topleft" />
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={targetCenter} zoom={targetZoom} />
        {markers}
        <LocationControl setUserPos={setUserPos} userPos={userPos} />
      </MapContainer>
    </div>
  );
};

const LocationControl = ({ setUserPos, userPos }: { setUserPos: (p: [number, number]) => void, userPos: [number, number] | null }) => {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!map) return;
    
    const handleLocationFound = (e: L.LocationEvent) => {
      if (isValidLatLng(e.latlng.lat, e.latlng.lng)) {
        setUserPos([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, 14);
      }
      setLoading(false);
    };

    const handleLocationError = () => {
      setLoading(false);
    };

    map.on('locationfound', handleLocationFound);
    map.on('locationerror', handleLocationError);
    
    return () => {
      map.off('locationfound', handleLocationFound);
      map.off('locationerror', handleLocationError);
    };
  }, [map, setUserPos]);

  return (
    <>
      <div className="leaflet-top leaflet-left mt-24 ml-3 pointer-events-auto z-[400] absolute">
        <button 
          onClick={() => { setLoading(true); map.locate({ setView: false }); }}
          className="bg-white hover:bg-slate-50 text-slate-700 w-11 h-11 rounded-xl shadow-lg flex items-center justify-center transition-all active:scale-95 border border-slate-200"
          disabled={loading}
        >
          {loading ? <Loader2 size={18} className="animate-spin text-teal-600" /> : <Locate size={18} />}
        </button>
      </div>
      {userPos && isValidLatLng(userPos[0], userPos[1]) && <Marker position={userPos} icon={ICONS.user} zIndexOffset={2000} />}
    </>
  );
};