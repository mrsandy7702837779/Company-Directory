import React from 'react';
import { Company } from '../types';
import { ArrowLeftIcon, MapPinIcon, UsersIcon, CalendarIcon } from './icons';

interface CompanyDetailProps {
    company: Company;
    onBack: () => void;
}

type StatVariant = 'location' | 'employees' | 'founded';

interface StatItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    delay: number;
    variant: StatVariant;
}

// Enhanced StatItem with distinct visual themes and interactions
const StatItem: React.FC<StatItemProps> = ({ icon, label, value, delay, variant }) => {
    
    const variants = {
        location: {
            containerBg: "bg-white",
            borderColor: "border-rose-100 hover:border-rose-200",
            iconBg: "bg-rose-50 text-rose-500",
            hoverIconBg: "group-hover:bg-rose-500 group-hover:text-white",
            blobColor: "bg-rose-200",
            valueColor: "text-slate-800 group-hover:text-rose-600"
        },
        employees: {
            containerBg: "bg-white",
            borderColor: "border-sky-100 hover:border-sky-200",
            iconBg: "bg-sky-50 text-sky-600",
            hoverIconBg: "group-hover:bg-sky-600 group-hover:text-white",
            blobColor: "bg-sky-200",
            valueColor: "text-slate-800 group-hover:text-sky-700"
        },
        founded: {
            containerBg: "bg-white",
            borderColor: "border-amber-100 hover:border-amber-200",
            iconBg: "bg-amber-50 text-amber-500",
            hoverIconBg: "group-hover:bg-amber-500 group-hover:text-white",
            blobColor: "bg-amber-200",
            valueColor: "text-slate-800 group-hover:text-amber-700"
        }
    };

    const theme = variants[variant];

    return (
        <div 
            className={`relative flex flex-col items-center text-center p-8 rounded-3xl border-2 ${theme.containerBg} ${theme.borderColor} shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group animate-fadeInUp overflow-hidden`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Decorative Background Blobs */}
            <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full ${theme.blobColor} opacity-20 blur-3xl group-hover:opacity-40 transition-all duration-700 ease-in-out group-hover:scale-125`}></div>
            <div className={`absolute -bottom-12 -left-12 w-32 h-32 rounded-full ${theme.blobColor} opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700 ease-in-out group-hover:scale-125`}></div>

            {/* Icon Container */}
            <div className={`relative mb-6 p-5 rounded-2xl ${theme.iconBg} ${theme.hoverIconBg} transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:rotate-6 group-hover:scale-110`}>
                {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8" })}
            </div>
            
            {/* Text Content */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 relative z-10">{label}</h3>
            <p className={`text-3xl font-black ${theme.valueColor} relative z-10 transition-colors duration-300`}>{value}</p>
        </div>
    );
};

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack }) => {
    return (
        <div className="animate-fadeInUp">
            <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-4 py-2 -ml-2 mb-6 rounded-lg text-sm font-medium text-gray-600 hover:text-sky-600 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300 transform hover:-translate-x-1 group"
            >
                <ArrowLeftIcon className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-sky-600" />
                Back to Directory
            </button>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50 backdrop-blur-sm">
                <div className="p-8 md:p-12 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-full filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 relative z-10">
                        <div className="relative group cursor-pointer self-center md:self-start">
                            <div className="absolute inset-0 bg-gradient-to-tr from-sky-300 to-indigo-300 rounded-2xl transform rotate-6 scale-90 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out blur-sm"></div>
                            <img 
                                src={company.logo} 
                                alt={`${company.name} logo`} 
                                className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white shadow-xl flex-shrink-0 transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2 bg-white"
                            />
                        </div>
                        
                        <div className="flex-grow text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4 flex-wrap">
                                <span className="px-4 py-1.5 inline-flex text-sm font-bold leading-5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 shadow-sm">
                                    {company.industry}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">{company.name}</h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto md:mx-0">{company.description}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50/50 border-t border-slate-100 p-8 md:p-12">
                     <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-sky-500 rounded-full"></span>
                        Company Overview
                     </h2>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <StatItem 
                            icon={<MapPinIcon />} 
                            label="Location"
                            value={company.location}
                            delay={100}
                            variant="location"
                        />
                        <StatItem 
                            icon={<UsersIcon />} 
                            label="Employees"
                            value={company.employees.toLocaleString()}
                            delay={200}
                            variant="employees"
                        />
                        <StatItem 
                            icon={<CalendarIcon />} 
                            label="Founded"
                            value={company.foundedYear}
                            delay={300}
                            variant="founded"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;