import React, { useEffect, useRef } from 'react';
import { Organization } from '../types';
import { MapPin, Phone, Mail, Filter, Building2, ExternalLink } from 'lucide-react';

interface TableViewProps {
  organizations: Organization[];
  selectedOrgId: string | null;
  onSelectOrg: (id: string) => void;
  filterStatus: string;
  onFilterStatusChange: (status: string) => void;
  filterCategory: string;
  onFilterCategoryChange: (category: string) => void;
  availableCategories: string[];
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'Active': return 'Активний';
    case 'Inactive': return 'Неактивний';
    case 'Pending': return 'В очікуванні';
    default: return status;
  }
};

export const TableView: React.FC<TableViewProps> = ({ 
  organizations, 
  selectedOrgId, 
  onSelectOrg,
  filterStatus,
  onFilterStatusChange,
  filterCategory,
  onFilterCategoryChange,
  availableCategories
}) => {
  const selectedRowRef = useRef<HTMLTableRowElement>(null);

  // Auto-scroll to selected row
  useEffect(() => {
    if (selectedOrgId && selectedRowRef.current) {
      selectedRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedOrgId]);

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200">
      {/* Filters Toolbar */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm flex flex-col sm:flex-row gap-3 items-start sm:items-center sticky top-0 z-20">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
          <Filter className="w-3.5 h-3.5" />
          <span>Фільтри:</span>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => onFilterStatusChange(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-2 bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none cursor-pointer hover:border-slate-300 transition-colors shadow-sm flex-1 sm:flex-none"
          >
            <option value="All">Всі статуси</option>
            <option value="Active">Активні</option>
            <option value="Pending">В очікуванні</option>
            <option value="Inactive">Неактивні</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => onFilterCategoryChange(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-2 bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none cursor-pointer hover:border-slate-300 transition-colors shadow-sm flex-1 sm:flex-none max-w-[200px]"
          >
            <option value="All">Всі категорії</option>
            {availableCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="sm:ml-auto text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">
          Знайдено: {organizations.length}
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-4 py-3 font-bold text-slate-700 w-3/5">Організація та Контакти</th>
              <th className="px-4 py-3 font-bold text-slate-700 w-2/5 hidden sm:table-cell">Опис послуг</th>
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
                    {/* Header Info */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className={`font-bold text-base leading-snug ${isSelected ? 'text-teal-900' : 'text-slate-900'}`}>
                        {org.name}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2 mb-3">
                       <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          org.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 
                          org.status === 'Inactive' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                        }`}>
                          {getStatusLabel(org.category)}
                        </span>
                        <div className="text-slate-500 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> 
                          <span className="truncate max-w-[200px]">{org.address}</span>
                        </div>
                    </div>

                    {/* Services (Mobile Only - shown inline) */}
                    <div className="sm:hidden mb-3 text-xs text-slate-600 bg-white/50 p-2 rounded border border-slate-100 italic">
                        {org.services}
                    </div>

                    {/* Contacts Block - Moved DOWN as requested */}
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-100/50">
                      {org.phone && (
                        <a 
                          href={`tel:${cleanPhone}`} 
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-teal-700 group/link w-fit p-1 -ml-1 rounded hover:bg-white"
                        >
                          <div className="w-6 h-6 bg-teal-50 text-teal-600 rounded flex items-center justify-center shrink-0 group-hover/link:bg-teal-100 transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          {org.phone}
                        </a>
                      )}
                      
                      {org.email && (
                        <a 
                          href={`mailto:${org.email}`} 
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-xs text-slate-600 hover:text-teal-700 group/link w-fit p-1 -ml-1 rounded hover:bg-white"
                        >
                           <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded flex items-center justify-center shrink-0 group-hover/link:bg-blue-100 transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                          </div>
                          <span className="truncate max-w-[200px]">{org.email}</span>
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Desktop Services Column */}
                  <td className="px-4 py-4 align-top text-slate-700 hidden sm:table-cell">
                    <div className={`text-xs leading-relaxed p-3 rounded-lg border h-full ${isSelected ? 'bg-white border-teal-100 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
                      {org.services}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};