import React, { useEffect, useRef } from 'react';
import { Organization } from '../types';
import { MapPin, Phone, Mail, ChevronRight, Calendar } from 'lucide-react';

interface TableViewProps {
  organizations: Organization[];
  selectedOrgId: string | null;
  onSelectOrg: (id: string) => void;
  filterStatus?: string;
  onFilterStatusChange?: (status: string) => void;
  filterCategory?: string;
  onFilterCategoryChange?: (category: string) => void;
  availableCategories?: string[];
}

export const TableView: React.FC<TableViewProps> = ({ 
  organizations, 
  selectedOrgId, 
  onSelectOrg
}) => {
  const selectedRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (selectedOrgId && selectedRowRef.current) {
      selectedRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedOrgId]);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-100">
            <tr>
              <th className="px-4 py-3 font-bold tracking-wider">Організація та контакти</th>
              <th className="px-4 py-3 font-bold tracking-wider hidden md:table-cell w-1/3">Послуги</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {organizations.map((org) => {
              const isSelected = selectedOrgId === org.id;
              const cleanPhone = org.phone ? org.phone.replace(/[^\d+]/g, '') : '';
              
              return (
                <tr
                  key={org.id}
                  ref={isSelected ? selectedRowRef : null}
                  onClick={() => onSelectOrg(org.id)}
                  className={`cursor-pointer transition-all duration-200 group relative ${
                    isSelected ? 'bg-teal-50/60' : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600 z-10" />
                  )}
                  
                  <td className="px-4 py-5 align-top">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className={`font-bold text-base leading-tight transition-colors ${
                            isSelected ? 'text-teal-900' : 'text-slate-800'
                          }`}>
                            {org.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                              org.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                              org.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              org.status === 'In Development' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
                              {org.status === 'Active' ? 'Активний' : 
                               org.status === 'Pending' ? 'Очікує' : 
                               org.status === 'In Development' ? 'В розробці' :
                               'Архів'}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                              {org.category}
                            </span>
                            {org.establishedDate && (
                              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                <Calendar size={10} />
                                Засновано: {org.establishedDate}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isSelected ? 'text-teal-500 translate-x-1' : 'text-slate-300'}`} />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
                          <span className="leading-tight">{org.address}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 pt-1">
                           {org.phone && (
                             <a 
                               href={`tel:${cleanPhone}`} 
                               onClick={(e) => e.stopPropagation()} 
                               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-100 text-xs font-bold hover:bg-teal-100 hover:border-teal-200 transition-all shadow-sm active:scale-95 group"
                             >
                               <Phone className="w-3 h-3 group-hover:scale-110 transition-transform" /> 
                               {org.phone}
                             </a>
                           )}
                           {org.email && (
                             <a 
                               href={`mailto:${org.email}`} 
                               onClick={(e) => e.stopPropagation()} 
                               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-teal-400 hover:text-teal-700 transition-all shadow-sm active:scale-95 break-all"
                             >
                               <Mail className="w-3 h-3" /> {org.email}
                             </a>
                           )}
                        </div>
                      </div>

                      {/* Mobile-only services view */}
                      <div className="md:hidden mt-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Послуги:</p>
                         <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">{org.services}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-5 align-top hidden md:table-cell">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-5">
                      {org.services}
                    </p>
                  </td>
                </tr>
              );
            })}
            {organizations.length === 0 && (
              <tr>
                <td colSpan={2} className="px-4 py-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                      <MapPin className="w-8 h-8 opacity-20" />
                    </div>
                    <p className="text-sm font-bold">Організацій не знайдено</p>
                    <p className="text-xs">Спробуйте змінити параметри пошуку або фільтри</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};