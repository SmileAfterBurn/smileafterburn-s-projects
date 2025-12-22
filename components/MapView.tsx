
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, AttributionControl, ZoomControl } from 'react-leaflet';
import { Organization } from '../types';
import { MapPin, Heart, Phone, Mail, FileText, Locate, Navigation, Loader2, AlertCircle } from 'lucide-react';
import L from 'leaflet';

// Utility for strict coordinate validation
const isValCoord = (val: any): val is number => 
  typeof val === 'number' && !isNaN(val) && Number.isFinite(val);

const isValidLatLng = (lat: any, lng: any): boolean => 
  isValCoord(lat) && isValCoord(lng);

// Function to create custom SVG icons with enhanced selected state
const createCustomIcon = (color: string, size: number, isSelected: boolean = false) => {
  const strokeColor = isSelected ? '#fbbf24' : 'white'; 
  const strokeWidth = isSelected ? '3' : '2';
  const dropShadow = isSelected 
    ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' 
    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
  
  return new L.DivIcon({
    className: 'custom-marker-icon',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="filter: ${dropShadow}; width: 100%; height: 100%; transition: all 0.3s ease;">
        <path d="M20 10c0 6-9 13-9 13s-9-7-9-13a6.5 6.5 0 0 1 13 0Z"></path>
        <circle cx="12" cy="10" r="3" fill="white"></circle>
      </svg>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const userLocationIcon = new L.DivIcon({
  className: 'user-location-icon',
  html: `
    <div class="relative flex h-6 w-6">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-6 w-6 bg-blue-600 border-2 border-white shadow-md items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const defaultIcon = createCustomIcon('#0d9488', 36, false); 
const devIcon = createCustomIcon('#3b82f6', 36, false); 
const selectedIcon = createCustomIcon('#dc2626', 52, true);

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
  useEffect(() => {
    if (!map) return;
    
    if (center && isValidLatLng(center[0], center[1])) {
      try {
        map.invalidateSize();
        const safeZoom = isValCoord(zoom) ? zoom : 8;
        map.flyTo(center, safeZoom, { 
          duration: 1.5,
          easeLinearity: 0.25
        });
      } catch (e) {
        console.warn("Map update error suppressed", e);
      }
    }
  }, [center, zoom, map]);
  return null;
};

const MapLegend = () => (
  <div className="leaflet-bottom leaflet-left mb-6 ml-4 pointer-events-auto z-[400] hidden sm:block">
     <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-2.5">
        <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Статус</h4>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-600 shadow-sm"></div>
          <span className="text-xs font-medium text-slate-700">Активні</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"></div>
          <span className="text-xs font-medium text-slate-700">В розробці</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm"></div>
          <span className="text-xs font-medium text-slate-700">Обрано</span>
        </div>
        <div className="h-px bg-slate-100 my-0.5"></div>
        <div className="flex items-center gap-2">
           <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
          <span className="text-xs font-medium text-slate-700">Ви тут</span>
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
      if (isValidLatLng(e.latlng.lat, e.latlng.lng)) {
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
    map.locate({ setView: false, enableHighAccuracy: true });
  };

  return (
    <>
      <div className="leaflet-top leaflet-left mt-20 ml-3 pointer-events-auto z-[400] absolute">
         <div className="leaflet-control leaflet-bar">
            <button 
              onClick={handleLocate}
              className="bg-white hover:bg-slate-50 text-slate-700 w-[30px] h-[30px] flex items-center justify-center border-b border-slate-300 cursor-pointer shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              title="Знайти мене"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin text-teal-600" />
              ) : (
                <Locate size={18} />
              )}
            </button>
         </div>
      </div>
      {position && isValidLatLng(position[0], position[1]) && (
        <Marker position={position} icon={userLocationIcon} zIndexOffset={2000}>
          <Popup>Ви тут</Popup>
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
  center = [48.3794, 31.1656], // Default to center of Ukraine
  zoom = 6
}) => {
  const selectedOrg = organizations.find(c => c.id === selectedOrgId);
  
  const hasSelectedLocation = selectedOrg && isValidLatLng(selectedOrg.lat, selectedOrg.lng);
  
  // Define fallback center explicitly
  const defaultCenter: [number, number] = [48.3794, 31.1656];
  
  // Safe calculation of target center
  const targetCenter: [number, number] = hasSelectedLocation
    ? [selectedOrg!.lat, selectedOrg!.lng]
    : (center && isValidLatLng(center[0], center[1]) ? center : defaultCenter);

  const safeZoom = isValCoord(zoom) ? zoom : 6;
  const targetZoom = selectedOrg ? 15 : safeZoom;

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={targetCenter}
        zoom={safeZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        dragging={true}
        className="z-0"
        attributionControl={false}
        zoomControl={false}
      >
        <AttributionControl prefix="Розробник: Ілля Чернов" position="bottomright" />
        <ZoomControl position="topleft" zoomInTitle="Наблизити" zoomOutTitle="Віддалити" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={targetCenter} zoom={targetZoom} />
        <LocationMarker />
        <MapLegend />

        {organizations.map((org) => {
          if (!isValidLatLng(org.lat, org.lng)) {
            return null;
          }

          const isSelected = selectedOrgId === org.id;
          const cleanPhone = org.phone ? org.phone.replace(/[^\d+]/g, '') : '';
          const markerIcon = isSelected ? selectedIcon : (org.status === 'In Development' ? devIcon : defaultIcon);

          return (
            <Marker
              key={org.id}
              position={[org.lat, org.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => onSelectOrg(org.id),
              }}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup className="min-w-[250px] max-w-[calc(100vw-40px)]">
                <div className="p-1">
                  <div className="flex flex-col gap-2 mb-2">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-1 pr-2">
                      <Heart className={`w-4 h-4 shrink-0 ${isSelected ? 'text-red-500 fill-red-500' : 'text-rose-500 fill-rose-500'}`} />
                      {org.name}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide w-fit ${
                      org.status === 'Active' ? 'bg-green-100 text-green-700' :
                      org.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      org.status === 'In Development' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {org.status === 'Active' ? 'Активний' : 
                       org.status === 'Pending' ? 'Очікує' : 
                       org.status === 'In Development' ? 'В розробці' : 
                       'Неактивний'}
                    </span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-slate-600 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        {org.address}
                      </p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${org.lat},${org.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 pl-5"
                      >
                        <Navigation className="w-3 h-3" />
                        Прокласти маршрут
                      </a>
                    </div>
                    
                    {org.notes && (
                      <div className="bg-amber-50 p-2.5 rounded border border-amber-200 text-xs text-amber-900 flex gap-2 items-start leading-snug">
                         <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
                         <span>{org.notes}</span>
                      </div>
                    )}
                    
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <p className="text-xs font-bold text-slate-700 mb-1">Послуги:</p>
                      <p className="text-xs text-slate-600 leading-snug">{org.services}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      {org.phone && (
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <a href={`tel:${cleanPhone}`} className="hover:underline hover:text-teal-700 font-medium">
                              {org.phone}
                            </a>
                        </div>
                      )}
                      {org.email && (
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <a href={`mailto:${org.email}`} className="hover:underline hover:text-teal-700 font-medium break-all">
                              {org.email}
                            </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {org.email && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenReferral(org);
                      }}
                      className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Запит на перенаправлення
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
