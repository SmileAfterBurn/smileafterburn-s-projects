import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, AttributionControl, ZoomControl } from 'react-leaflet';
import { Organization } from '../types';
import { MapPin, Heart, Phone, Mail, FileText } from 'lucide-react';
import L from 'leaflet';

// Function to create custom SVG icons with enhanced selected state
const createCustomIcon = (color: string, size: number, isSelected: boolean = false) => {
  const strokeColor = isSelected ? '#fbbf24' : 'white'; // Amber-400 for selected, White for default
  const strokeWidth = isSelected ? '3' : '2';
  const dropShadow = isSelected 
    ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' 
    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
  
  // Add a pulsing animation class to the SVG if selected (using Tailwind/CSS)
  const animationClass = isSelected ? 'animate-bounce-slight' : '';

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

const defaultIcon = createCustomIcon('#0d9488', 36, false); // Teal-600
const selectedIcon = createCustomIcon('#dc2626', 52, true);  // Red-600, significantly larger

interface MapViewProps {
  organizations: Organization[];
  selectedOrgId: string | null;
  onSelectOrg: (id: string) => void;
  onOpenReferral: (org: Organization) => void; // New prop for Referral
  center?: [number, number];
  zoom?: number;
}

const isValidCoordinate = (lat: any, lng: any): boolean => {
  return (
    typeof lat === 'number' && 
    typeof lng === 'number' && 
    !isNaN(lat) && 
    !isNaN(lng)
  );
};

// Component to handle imperative map animations (flyTo)
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    // Defensive check: verify coordinates are valid numbers before flying
    if (center && isValidCoordinate(center[0], center[1])) {
      try {
        // Smooth animation to the target
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

export const MapView: React.FC<MapViewProps> = ({ 
  organizations, 
  selectedOrgId, 
  onSelectOrg,
  onOpenReferral,
  center = [46.9750, 31.9946], // Default near Mykolaiv
  zoom = 8
}) => {
  const selectedOrg = organizations.find(c => c.id === selectedOrgId);
  
  // Use organization location if selected, otherwise provided center
  const hasSelectedLocation = selectedOrg && isValidCoordinate(selectedOrg.lat, selectedOrg.lng);
  
  // Explicitly cast arrays to [number, number] to satisfy TypeScript tuple requirement
  const targetCenter: [number, number] = hasSelectedLocation
    ? [selectedOrg!.lat, selectedOrg!.lng] as [number, number]
    : (center && isValidCoordinate(center[0], center[1]) ? center : [46.9750, 31.9946] as [number, number]);

  // Double check to ensure we never pass NaN to MapContainer
  const safeCenter: [number, number] = isValidCoordinate(targetCenter[0], targetCenter[1])
    ? targetCenter
    : [46.9750, 31.9946];

  // Zoom in closer when an organization is selected
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
        zoomControl={false} // Disable default English zoom control
        markerZoomAnimation={true}
      >
        {/* Localized Controls */}
        <AttributionControl prefix="Ілля Чернов | Leaflet" position="bottomright" />
        <ZoomControl position="topleft" zoomInTitle="Наблизити" zoomOutTitle="Віддалити" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> спільнота'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={safeCenter} zoom={targetZoom} />

        {organizations.map((org) => {
          // Strict filtering for markers
          if (!isValidCoordinate(org.lat, org.lng)) {
            return null;
          }

          const isSelected = selectedOrgId === org.id;
          // Sanitize phone for tel: link (remove spaces, parentheses, dashes)
          const cleanPhone = org.phone ? org.phone.replace(/[^\d+]/g, '') : '';

          return (
            <Marker
              key={org.id}
              position={[org.lat, org.lng]}
              icon={isSelected ? selectedIcon : defaultIcon}
              eventHandlers={{
                click: () => {
                  onSelectOrg(org.id);
                },
              }}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup className="min-w-[240px]">
                <div className="p-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-1 pr-2">
                       <Heart className={`w-4 h-4 shrink-0 ${isSelected ? 'text-red-500 fill-red-500' : 'text-rose-500 fill-rose-500'}`} />
                       {org.name}
                    </h3>
                  </div>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-slate-600 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {org.address}
                    </p>
                    
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

                  {/* Referral Button */}
                  {org.email && (
                    <button
                      onClick={(e) => {
                        // Prevent map click propagation if needed, though popup usually handles it
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