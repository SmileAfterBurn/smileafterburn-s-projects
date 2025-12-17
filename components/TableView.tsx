
import React, { useEffect, useRef } from 'react';
import { Organization } from '../types';
import { MapPin, Phone, Mail } from 'lucide-react';

interface TableViewProps {
  organizations: Organization[];
  selectedOrgId: string | null;
  onSelectOrg: (id: string) => void;
  // Deprecated props kept for interface compatibility if needed, but unused internally now
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
    <div className="h-full flex flex-col bg-white border-r border-slate-200">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm text-left border-collapse table-fixed">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-4 py-3 font-bold text-slate-700 w-full sm:w-[70%]">Організація та Контакти</th>
              <th className="px-4 py-3 font-bold text-slate-700 w-[30%] hidden sm:table-cell">Опис послуг</th>
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
                  className={`cursor-pointer transition-colors group ${
                    isSelected ? 'bg-teal-50 hover:bg-teal-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className={`font-bold text-base leading-snug ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                        {org.name}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${
                        org.status === 'Active' ? 'bg-green-100 text-green-700' :
                        org.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {org.status === 'Active' ? 'Активний' : org.status === 'Pending' ? 'Очікує' : 'Неактивний'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[200px]">{org.address}</span>
                      </div>
                      <div className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">
                        {org.category}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                       {org.phone && (
                         <a href={`tel:${cleanPhone}`} onClick={(e) => e.stopPropagation()} className={`flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-bold transition-colors ${isSelected ? 'bg-white border-teal-200 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-teal-300 hover:text-teal-700'}`}>
                           <Phone className="w-3 h-3" /> {org.phone}
                         </a>
                       )}
                       {org.email && (
                         <a href={`mailto:${org.email}`} onClick={(e) => e.stopPropagation()} className={`flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-bold transition-colors break-all ${isSelected ? 'bg-white border-teal-200 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-teal-300 hover:text-teal-700'}`}>
                           <Mail className="w-3 h-3" /> {org.email}
                         </a>
                       )}
                    </div>
                    
                    <div className="sm:hidden mt-3 pt-2 border-t border-slate-100/50">
                       <p className="text-xs text-slate-500 leading-relaxed font-medium">{org.services}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top hidden sm:table-cell">
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 font-medium">{org.services}</p>
                  </td>
                </tr>
              );
            })}
            {organizations.length === 0 && (
              <tr><td colSpan={2} className="px-4 py-8 text-center text-slate-400 text-sm font-medium">Організацій не знайдено</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
