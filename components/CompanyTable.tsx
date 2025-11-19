import React from 'react';
import { Company } from '../types';
import { PencilIcon, ChevronRightIcon, MapPinIcon, UsersIcon, CalendarIcon } from './icons';

interface CompanyTableProps {
    companies: Company[];
    onEdit: (company: Company) => void;
}

const IndustryBadge: React.FC<{ industry: string }> = ({ industry }) => {
    // Deterministic pastel color generation based on industry name
    const getStyle = (name: string) => {
        const styles = [
            'bg-blue-50 text-blue-700 ring-blue-600/20',
            'bg-purple-50 text-purple-700 ring-purple-600/20',
            'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
            'bg-amber-50 text-amber-700 ring-amber-600/20',
            'bg-rose-50 text-rose-700 ring-rose-600/20',
            'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
            'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
        ];
        // Simple hash to pick a color consistently
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % styles.length;
        return styles[index];
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${getStyle(industry)} transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-sm`}>
            {industry}
        </span>
    );
};

const CompanyTable: React.FC<CompanyTableProps> = ({ companies, onEdit }) => {
    const handleViewDetails = (companyId: number) => {
        window.location.hash = `#/company/${companyId}`;
    };

    return (
        <div className="relative w-full perspective-1000">
            {/* Floating Card Container */}
            <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-left">
                        {/* Sticky Header */}
                        <thead className="bg-slate-50/90 backdrop-blur border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0 w-[35%]">
                                    Company
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0 w-[15%]">
                                    Industry
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0 w-[15%]">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0 w-[10%]">
                                    Employees
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0 w-[10%]">
                                    Founded
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right w-[15%]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody className="divide-y divide-slate-100 bg-slate-50/30">
                            {companies.map((company, index) => (
                                <tr 
                                    key={company.id} 
                                    className="group bg-white hover:bg-sky-50 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:translate-y-[-4px] hover:scale-[1.002] hover:z-10 relative animate-table-3d"
                                    style={{ 
                                        animationDelay: `${index * 80}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    {/* Company Name & Desc */}
                                    <td className="px-6 py-5 align-middle border-r border-slate-50 group-hover:border-transparent transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-12 w-12 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <img 
                                                    className="h-12 w-12 rounded-xl object-cover border border-slate-100 shadow-sm" 
                                                    src={company.logo} 
                                                    alt="" 
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                                                    {company.name}
                                                </span>
                                                <span className="text-xs text-slate-500 truncate max-w-[200px] font-medium group-hover:text-slate-600">
                                                    {company.description}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Industry Tag */}
                                    <td className="px-6 py-5 align-middle border-r border-slate-50 group-hover:border-transparent transition-colors">
                                        <div className="transform transition-transform duration-300">
                                            <IndustryBadge industry={company.industry} />
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="px-6 py-5 align-middle border-r border-slate-50 group-hover:border-transparent transition-colors">
                                        <div className="flex items-center text-slate-600 gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
                                            <MapPinIcon className="h-4 w-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
                                            <span className="text-sm font-medium group-hover:text-slate-900">{company.location}</span>
                                        </div>
                                    </td>

                                    {/* Employees */}
                                    <td className="px-6 py-5 align-middle border-r border-slate-50 group-hover:border-transparent transition-colors">
                                        <div className="flex items-center text-slate-600 gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
                                            <UsersIcon className="h-4 w-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
                                            <span className="text-sm font-medium tabular-nums group-hover:text-slate-900">{company.employees.toLocaleString()}</span>
                                        </div>
                                    </td>

                                    {/* Founded Year */}
                                    <td className="px-6 py-5 align-middle border-r border-slate-50 group-hover:border-transparent transition-colors">
                                        <div className="flex items-center text-slate-600 gap-2 transform transition-transform duration-300 group-hover:translate-x-1">
                                            <CalendarIcon className="h-4 w-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                                            <span className="text-sm font-medium tabular-nums group-hover:text-slate-900">{company.foundedYear}</span>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-5 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => onEdit(company)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200 hover:scale-110 active:scale-95"
                                                title="Edit"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleViewDetails(company.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-sky-600 hover:border-sky-600 hover:text-white hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                                            >
                                                View
                                                <ChevronRightIcon className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Simple footer summary inside the table context */}
            <div className="mt-2 px-2 text-xs text-slate-400 font-medium flex justify-end animate-fadeInUp" style={{ animationDelay: '600ms' }}>
                Showing {companies.length} results
            </div>
        </div>
    );
};

export default CompanyTable;