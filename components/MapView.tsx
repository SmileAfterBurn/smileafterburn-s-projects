
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, AttributionControl, ZoomControl, GeoJSON } from 'react-leaflet';
import { Organization } from '../types';
import { MapPin, Heart, Phone, Mail, FileText, Locate, Navigation, Loader2, AlertCircle, ExternalLink, Calendar } from 'lucide-react';
import L from 'leaflet';
import ukraineGeoJSON from '../maps/ukraine_services_map.geojson'; // Ensure this import works with your bundler

// Utility for strict coordinate validation with type coercion
const isValCoord = (val: any): val is number => {
  const n = Number(val);
  return typeof n === 'number' && !isNaN(n) && Number.isFinite(n);
};

const isValidLatLng = (lat: any, lng: any): boolean => 
  isValCoord(lat) && isValCoord(lng) && Math.abs(Number(lat)) <= 90 && Math.abs(Number(lng)) <= 180;

// Function to create custom SVG icons
const createCustomIcon = (color: string, size: number, isSelected: boolean = false) => {
  const strokeColor = isSelected ? '#ffffff' : 'white'; 
  const strokeWidth = isSelected ? '3' : '2';
  const shadowOpacity = isSelected ? '0.6' : '0.3';
  const scale = isSelected ? '1.2' : '1';
  
  return new L.DivIcon({
    className: 'custom-marker-wrapper',
    html: `
      <div style="transform: scale(${scale}); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,${shadowOpacity}));">
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

const userLocationIcon = new L.DivIcon({
  className: 'user-location-icon',
  html: `
    <div class="relative flex h-8 w-8">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-8 w-8 bg-blue-600 border-4 border-white shadow-lg items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const defaultIcon = createCustomIcon('#0d9488', 36, false); 
const devIcon = createCustomIcon('#3b82f6', 36, false); 
const selectedIcon = createCustomIcon('#e11d48', 48, true);

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
  const lastPosRef = useRef<string>("");

  useEffect(() => {
    if (!map) return;
    
    // Check if coordinates are valid and different from the last flyTo to prevent loops
    if (Array.isArray(center) && isValidLatLng(center[0], center[1])) {
      const posKey = `${center[0]},${center[1]},${zoom}`;
      if (lastPosRef.current === posKey) return;

      try {
        const safeZoom = isValCoord(zoom) ? zoom : 8;
        map.invalidateSize();
        map.flyTo(center as L.LatLngExpression, safeZoom, { 
          duration: 1.5,
          easeLinearity: 0.25
        });
        lastPosRef.current = posKey;
      } catch (e) {
        console.warn("Leaflet flyTo error suppressed:", e);
      }
    }
  }, [center, zoom, map]);
  return null;
};

const MapLegend = () => (
  <div className="leaflet-bottom leaflet-left mb-8 ml-4 pointer-events-auto z-[400] hidden sm:block">
     <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 flex flex-col gap-3 min-w-[140px]">
        <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Легенда мапи</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#0d9488] shadow-sm"></div>
            <span className="text-xs font-bold text-slate-700">Активні</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-sm"></div>
            <span className="text-xs font-bold text-slate-700">В розробці</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#e11d48] shadow-sm"></div>
            <span className="text-xs font-bold text-slate-700">Обрано</span>
          </div>
          <div className="h-px bg-slate-100 my-1"></div>
          <div className="flex items-center gap-2.5">
             <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 border-2 border-white"></span>
              </span>
            <span className="text-xs font-bold text-slate-700">Ви тут</span>
          </div>
        </div>
     </div>
  </div>
);

const LocationMarker = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const map = useMap();

  useEffect(() => {
    const onLocationFound = (e: L.LocationEvent) => {
      if (e.latlng && isValidLatLng(e.latlng.lat, e.latlng.lng)) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, 14, { duration: 1.5 });
      }
      setIsLoading(false);
    };

    const onLocationError = (e: L.ErrorEvent) => {
      console.warn("Location error:", e.message);
      setIsLoading(false);
    };

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
    };
  }, [map]);

  const handleLocate = () => {
    setIsLoading(true);
    try {
      map.locate({ setView: false, enableHighAccuracy: true });
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="leaflet-top leaflet-left mt-24 ml-3 pointer-events-auto z-[400] absolute">
         <div className="leaflet-control leaflet-bar border-none shadow-lg overflow-hidden rounded-xl">
            <button 
              onClick={handleLocate}
              className="bg-white hover:bg-slate-50 text-slate-700 w-11 h-11 flex items-center justify-center cursor-pointer transition-all active:scale-95 disabled:opacity-70"
              title="Знайти мене"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin text-teal-600" />
              ) : (
                <Locate size={20} />
              )}
            </button>
         </div>
      </div>
      {position && isValidLatLng(position[0], position[1]) && (
        <Marker position={position} icon={userLocationIcon} zIndexOffset={2000}>
          <Popup className="custom-popup-user">Ваше місцезнаходження</Popup>
        </Marker>
      )}
    </>
  );
};

export const MapView: React.FC<MapViewProps> = ({ 
  organizations, 
  selectedOrgId, 
  onSelectOrg,
  onOpenReferral,
  center = [48.3794, 31.1656], 
  zoom = 6
}) => {
  const selectedOrg = organizations.find(c => c.id === selectedOrgId);
  
  const targetCenter = useMemo<[number, number]>(() => {
    if (selectedOrg && isValidLatLng(selectedOrg.lat, selectedOrg.lng)) {
      return [Number(selectedOrg.lat), Number(selectedOrg.lng)];
    }
    if (Array.isArray(center) && isValidLatLng(center[0], center[1])) {
      return [Number(center[0]), Number(center[1])];
    }
    return [48.3794, 31.1656]; 
  }, [selectedOrg, center]);

  const targetZoom = useMemo(() => {
    if (selectedOrg) return 15;
    return isValCoord(zoom) ? Number(zoom) : 6;
  }, [selectedOrg, zoom]);

  if (!isValidLatLng(targetCenter[0], targetCenter[1])) {
    return (
      <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
        Помилка ініціалізації мапи
      </div>
    );
  }

  return (
    <div className="h-full w-full relative z-0">
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 1.5rem;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        .leaflet-popup-close-button {
          color: white !important;
          padding: 12px !important;
          font-size: 20px !important;
          z-index: 50;
        }
      `}</style>
      <MapContainer
        center={targetCenter}
        zoom={targetZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        dragging={true}
        className="z-0"
        attributionControl={false}
        zoomControl={false}
      >
        <AttributionControl prefix="Ілля Чернов" position="bottomright" />
        <ZoomControl position="topleft" />

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={targetCenter} zoom={targetZoom} />
        <LocationMarker />
        <MapLegend />

        {/* Render GeoJSON if available */}
        {ukraineGeoJSON && (
          <GeoJSON 
            data={ukraineGeoJSON as any} 
            style={{
              color: '#0d9488',
              weight: 2,
              opacity: 0.5,
              fillOpacity: 0.1
            }}
          />
        )}

        {organizations.map((org) => {
          if (!isValidLatLng(org.lat, org.lng)) return null;

          const isSelected = selectedOrgId === org.id;
          const cleanPhone = org.phone ? org.phone.replace(/[^\d+]/g, '') : '';
          const markerIcon = isSelected ? selectedIcon : (org.status === 'In Development' ? devIcon : defaultIcon);

          return (
            <Marker
              key={org.id}
              position={[Number(org.lat), Number(org.lng)]}
              icon={markerIcon}
              eventHandlers={{
                click: () => onSelectOrg(org.id),
              }}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup className="min-w-[280px] max-w-[320px]">
                <div className="flex flex-col">
                  {/* Popup Header */}
                  <div className={`p-5 pb-4 ${isSelected ? 'bg-rose-600' : 'bg-teal-700'} text-white`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest border border-white/10">
                        {org.category}
                      </span>
                      {org.establishedDate && (
                        <span className="px-2 py-0.5 rounded-full bg-black/20 backdrop-blur-sm text-[9px] font-bold ml-1 border border-white/10">
                          {org.establishedDate}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-lg leading-tight flex items-start gap-2 pr-4">
                      {org.name}
                    </h3>
                  </div>

                  {/* Popup Body */}
                  <div className="p-5 space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1.5">
                        <p className="text-sm text-slate-600 flex items-start gap-2 leading-snug">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                          {org.address}
                        </p>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${org.lat},${org.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 pl-6 group"
                        >
                          <Navigation className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          Навігація
                        </a>
                      </div>

                      {org.establishedDate && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 pl-1">
                           <Calendar size={14} className="text-slate-400" />
                           <span>Засновано: <b>{org.establishedDate}</b></span>
                        </div>
                      )}

                      {org.notes && (
                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-xs text-amber-900 flex gap-2.5 items-start">
                           <AlertCircle size={16} className="shrink-0 text-amber-500" />
                           <span className="leading-relaxed">{org.notes}</span>
                        </div>
                      )}

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Основні послуги:</p>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{org.services}</p>
                      </div>

                      <div className="space-y-2 pt-1">
                        {org.phone && (
                          <a href={`tel:${cleanPhone}`} className="flex items-center gap-2.5 text-sm font-bold text-slate-800 hover:text-teal-700 transition-colors py-1 group">
                              <Phone className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                              {org.phone}
                          </a>
                        )}
                        {org.email && (
                          <a href={`mailto:${org.email}`} className="flex items-center gap-2.5 text-sm font-bold text-slate-800 hover:text-teal-700 transition-colors py-1 group break-all">
                              <Mail className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                              {org.email}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      {org.email && (
                        <button
                          onClick={(e) => { e.stopPropagation(); onOpenReferral(org); }}
                          className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                        >
                          <FileText className="w-4 h-4" />
                          Надіслати запит
                        </button>
                      )}
                      {org.website && (
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2.5 bg-white border-2 border-slate-100 hover:border-teal-200 text-slate-700 text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all active:scale-95"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Сайт організації
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
