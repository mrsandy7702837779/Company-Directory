import React from 'react';
import { Company } from '../types';
import { MapPinIcon, PencilIcon, ChevronRightIcon, UsersIcon, BriefcaseIcon } from './icons';

interface CompanyCardProps {
    company: Company;
    index: number;
    onEdit: (company: Company) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, index, onEdit }) => {
    const handleViewDetails = (companyId: number) => {
        window.location.hash = `#/company/${companyId}`;
    };

    return (
        <div
            className="group h-96 [perspective:1000px] animate-fadeInUp transition-all duration-500 hover:-translate-y-3"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Card Inner Container - The Flipper */}
            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-md group-hover:shadow-2xl rounded-3xl">
                
                {/* --- FRONT FACE --- */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col">
                    {/* Front Content */}
                    <div className="h-32 bg-gradient-to-r from-sky-100 via-indigo-50 to-blue-50 relative">
                        {/* Decorative subtle pattern or sheen could go here */}
                    </div>
                    <div className="px-6 relative flex-grow flex flex-col items-center">
                         <div className="relative -mt-16 mb-6">
                             <div className="h-32 w-32 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                 <img className="h-full w-full object-cover" src={company.logo} alt={company.name} />
                             </div>
                         </div>
                         <div className="text-center mb-2">
                             <h3 className="text-2xl font-bold text-slate-900 mb-2">{company.name}</h3>
                             <span className="inline-block px-4 py-1.5 bg-sky-50 text-sky-600 text-xs font-bold uppercase tracking-wider rounded-full border border-sky-100">
                                 {company.industry}
                             </span>
                         </div>
                         
                         {/* Subtle Front Hint */}
                         <div className="mt-auto mb-8 flex items-center gap-2 text-slate-400 text-sm animate-pulse">
                            <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                            <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                            <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                         </div>
                    </div>
                </div>

                {/* --- BACK FACE --- */}
                <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col p-6 text-center justify-between bg-gradient-to-br from-white to-slate-50">
                    
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(company); }}
                            className="p-2.5 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-400 hover:text-sky-600 transition-all duration-200 shadow-sm"
                            title="Edit Company"
                        >
                            <PencilIcon className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-4 space-y-5">
                        <h3 className="text-xl font-bold text-slate-800">{company.name}</h3>
                        
                        {/* Interactive Popping Icons */}
                        <div className="flex justify-center gap-4 sm:gap-6">
                            <div className="flex flex-col items-center group/icon">
                                <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl mb-2 transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-sm border border-rose-100">
                                    <MapPinIcon className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 whitespace-nowrap max-w-[80px] truncate">{company.location}</span>
                            </div>
                             <div className="flex flex-col items-center group/icon">
                                <div className="p-3 bg-indigo-50 text-indigo-500 rounded-2xl mb-2 transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 shadow-sm border border-indigo-100">
                                    <UsersIcon className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">{company.employees}</span>
                            </div>
                             <div className="flex flex-col items-center group/icon">
                                <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl mb-2 transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-300 shadow-sm border border-amber-100">
                                    <BriefcaseIcon className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400 whitespace-nowrap max-w-[80px] truncate">{company.industry}</span>
                            </div>
                        </div>

                        <div className="relative">
                            <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed px-2">
                                {company.description}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleViewDetails(company.id)}
                        className="w-full inline-flex items-center justify-center text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-200 hover:shadow-sky-300 px-4 py-3 rounded-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        View Details
                        <ChevronRightIcon className="h-4 w-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCard;