import React, { useEffect, useState, useMemo, useRef, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, AttributionControl, ZoomControl } from 'react-leaflet';
import { Organization } from '../types';
import { MapPin, Heart, Phone, Mail, FileText, Locate, Navigation, Loader2, AlertCircle, ExternalLink, Calendar } from 'lucide-react';
import L from 'leaflet';

// Utility for strict coordinate validation
const isValCoord = (val: any): val is number => {
  const n = Number(val);
  return typeof n === 'number' && !isNaN(n) && Number.isFinite(n);
};

const isValidLatLng = (lat: any, lng: any): boolean => 
  isValCoord(lat) && isValCoord(lng) && Math.abs(Number(lat)) <= 90 && Math.abs(Number(lng)) <= 180;

// Function to create custom SVG icons - memoized outside to prevent recreation
const createCustomIcon = (color: string, size: number, isSelected: boolean = false) => {
  const strokeColor = isSelected ? '#ffffff' : 'white'; 
  const strokeWidth = isSelected ? '3' : '2';
  const shadowOpacity = isSelected ? '0.6' : '0.3';
  const scale = isSelected ? '1.2' : '1';
  
  return new L.DivIcon({
    className: `custom-marker-${isSelected ? 'selected' : 'default'}`,
    html: `
      <div style="transform: scale(${scale}); transition: transform 0.2s ease-out;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,${shadowOpacity}));">
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

// Optimized MapUpdater to handle camera moves smoothly
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  const lastTarget = useRef<string>("");

  useEffect(() => {
    if (!map) return;
    const targetKey = `${center[0].toFixed(4)},${center[1].toFixed(4)},${zoom}`;
    if (lastTarget.current === targetKey) return;

    map.invalidateSize();
    map.flyTo(center as L.LatLngExpression, zoom, { 
      duration: 1.2,
      easeLinearity: 0.3
    });
    lastTarget.current = targetKey;
  }, [center, zoom, map]);
  return null;
};

// Extracted for performance
const OrganizationMarker = memo(({ org, isSelected, onSelectOrg, onOpenReferral }: { 
  org: Organization, 
  isSelected: boolean, 
  onSelectOrg: (id: string) => void,
  onOpenReferral: (org: Organization) => void
}) => {
  if (!isValidLatLng(org.lat, org.lng)) return null;

  const icon = isSelected ? ICONS.selected : (org.status === 'In Development' ? ICONS.dev : ICONS.default);
  const cleanPhone = org.phone ? org.phone.replace(/[^\d+]/g, '') : '';

  return (
    <Marker
      position={[Number(org.lat), Number(org.lng)]}
      icon={icon}
      eventHandlers={{ click: () => onSelectOrg(org.id) }}
      zIndexOffset={isSelected ? 1000 : 0}
    >
      <Popup className="custom-org-popup" minWidth={280} maxWidth={320}>
        <div className="flex flex-col overflow-hidden rounded-xl">
          <div className={`p-4 ${isSelected ? 'bg-rose-600' : 'bg-teal-700'} text-white`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-black uppercase tracking-widest border border-white/10">
                {org.category}
              </span>
            </div>
            <h3 className="font-bold text-base leading-tight">{org.name}</h3>
          </div>
          <div className="p-4 space-y-3 bg-white">
            <div className="text-xs text-slate-600 flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
              {org.address}
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Послуги:</p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-3">{org.services}</p>
            </div>
            <div className="space-y-1.5 pt-1">
              {org.phone && (
                <a href={`tel:${cleanPhone}`} className="flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-teal-700">
                  <Phone className="w-3.5 h-3.5 text-teal-600" /> {org.phone}
                </a>
              )}
              {org.email && (
                <a href={`mailto:${org.email}`} className="flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-teal-700 break-all">
                  <Mail className="w-3.5 h-3.5 text-teal-600" /> {org.email}
                </a>
              )}
            </div>
            <div className="pt-2 flex flex-col gap-2">
              {org.email && (
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenReferral(org); }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-lg transition-colors shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 inline mr-2" /> Надіслати запит
                </button>
              )}
              {org.website && (
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-white border border-slate-200 hover:border-teal-200 text-slate-700 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 inline mr-2" /> Сайт
                </a>
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
  const selectedOrg = useMemo(() => organizations.find(o => o.id === selectedOrgId), [organizations, selectedOrgId]);
  
  const targetCenter = useMemo<[number, number]>(() => {
    if (selectedOrg && isValidLatLng(selectedOrg.lat, selectedOrg.lng)) return [selectedOrg.lat, selectedOrg.lng];
    return center;
  }, [selectedOrg, center]);

  const targetZoom = useMemo(() => selectedOrg ? 15 : zoom, [selectedOrg, zoom]);

  // Memoize markers to prevent bulk re-renders
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

  return (
    <div className="h-full w-full relative overflow-hidden bg-slate-100">
      <style>{`
        .leaflet-popup-content-wrapper { border-radius: 1rem; padding: 0; overflow: hidden; }
        .leaflet-popup-content { margin: 0; }
        .leaflet-container { background: #f1f5f9; }
      `}</style>
      <MapContainer
        center={targetCenter}
        zoom={targetZoom}
        preferCanvas={true} // Performance optimization for large datasets
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
    map.on('locationfound', (e) => {
      setUserPos([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 14);
      setLoading(false);
    });
    map.on('locationerror', () => setLoading(false));
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
      {userPos && <Marker position={userPos} icon={ICONS.user} zIndexOffset={2000} />}
    </>
  );
};
