import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, AttributionControl, ZoomControl } from 'react-leaflet';
import { Organization } from '../types';
import { MapPin, Heart, Phone, Mail, FileText, Locate, Navigation, Loader2 } from 'lucide-react';
import L from 'leaflet';

// Function to create custom SVG icons with enhanced selected state
const createCustomIcon = (color: string, size: number, isSelected: boolean = false) => {
  const strokeColor = isSelected ? '#fbbf24' : 'white'; // Amber-400 for selected, White for default
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

// User Location Icon (Blue Dot with Pulse)
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

const defaultIcon = createCustomIcon('#0d9488', 36, false); // Teal-600
const selectedIcon = createCustomIcon('#dc2626', 52, true);  // Red-600, significantly larger

interface MapViewProps {
  organizations: Organization[];
  selectedOrgId: string | null;
  onSelectOrg: (id: string) => void;
  onOpenReferral: (org: Organization) => void;
  center?: [number, number];
  zoom?: number;
}

const isValidCoordinate = (lat: any, lng: any): boolean => {
  return (
    typeof lat === 'number' && 
    typeof lng === 'number' && 
    Number.isFinite(lat) && 
    Number.isFinite(lng)
  );
};

// Component to handle imperative map animations (flyTo)
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && isValidCoordinate(center[0], center[1])) {
      try {
        map.flyTo(center, zoom, { 
          duration: 1.5,
          easeLinearity: 0.25
        });
      } catch (e) {
        console.warn("Leaflet flyTo error:", e);
      }
    }
  }, [center, zoom, map]);
  return null;
};

// Component to handle Geolocation
const LocationMarker = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const map = useMap();

  useEffect(() => {
    const onLocationFound = (e: L.LocationEvent) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 14, { duration: 1.5 });
      setIsLoading(false);
    };

    const onLocationError = (e: L.ErrorEvent) => {
      alert("Не вдалося визначити місцезнаходження: " + e.message);
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
      {position && (
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
  center = [46.9750, 31.9946],
  zoom = 8
}) => {
  const selectedOrg = organizations.find(c => c.id === selectedOrgId);
  
  const hasSelectedLocation = selectedOrg && isValidCoordinate(selectedOrg.lat, selectedOrg.lng);
  
  const targetCenter: [number, number] = hasSelectedLocation
    ? [selectedOrg!.lat, selectedOrg!.lng] as [number, number]
    : (center && isValidCoordinate(center[0], center[1]) ? (center as [number, number]) : [46.9750, 31.9946] as [number, number]);

  const safeCenter: [number, number] = isValidCoordinate(targetCenter[0], targetCenter[1])
    ? targetCenter
    : [46.9750, 31.9946];

  const targetZoom = selectedOrg ? 15 : zoom;

  return (
    <div className="h-full w-full relative z-0">
      <style>{`
        @keyframes bounce-slight {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      <MapContainer
        center={safeCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        dragging={true}
        className="z-0"
        attributionControl={false}
        zoomControl={false}
        markerZoomAnimation={true}
      >
        <AttributionControl prefix="Ілля Чернов | Leaflet" position="bottomright" />
        <ZoomControl position="topleft" zoomInTitle="Наблизити" zoomOutTitle="Віддалити" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> спільнота'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={safeCenter} zoom={targetZoom} />
        <LocationMarker />

        {organizations.map((org) => {
          if (!isValidCoordinate(org.lat, org.lng)) {
            return null;
          }

          const isSelected = selectedOrgId === org.id;
          const cleanPhone = org.phone ? org.phone.replace(/[^\d+]/g, '') : '';

          return (
            <Marker
              key={org.id}
              position={[org.lat, org.lng]}
              icon={isSelected ? selectedIcon : defaultIcon}
              // Cast eventHandlers to any to bypass strict type checking
              {...({ eventHandlers: {
                click: () => {
                  onSelectOrg(org.id);
                },
              }} as any)}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup className="min-w-[300px]">
                <div className="p-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-1 pr-2">
                       <Heart className={`w-4 h-4 shrink-0 ${isSelected ? 'text-red-500 fill-red-500' : 'text-rose-500 fill-rose-500'}`} />
                       {org.name}
                    </h3>
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
                    
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <p className="text-xs font-bold text-slate-700 mb-1">Послуги:</p>
                      <p className="text-xs text-slate-600 leading-snug">{org.services}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                          <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          {org.phone ? (
                            <a href={`tel:${cleanPhone}`} className="hover:underline hover:text-teal-700 font-medium">
                              {org.phone}
                            </a>
                          ) : (
                            <span className="text-slate-400 italic">Не вказано</span>
                          )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                          <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          {org.email ? (
                            <a 
                              href={`mailto:${org.email}?subject=Запит%20на%20допомогу`} 
                              className="hover:underline hover:text-teal-700 font-medium break-all"
                            >
                              {org.email}
                            </a>
                          ) : (
                            <span className="text-slate-400 italic">Не вказано</span>
                          )}
                      </div>
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