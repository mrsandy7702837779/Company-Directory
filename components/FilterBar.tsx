import React, { useState, useRef, useEffect } from 'react';
import { SortOption } from '../types';
import { MOCK_LOCATIONS, MOCK_INDUSTRIES } from '../services/api';
import { ListIcon, GridIcon, ChevronDownIcon, AdjustmentsHorizontalIcon, ArrowPathIcon } from './icons';

interface FilterBarProps {
    location: string;
    setLocation: (location: string) => void;
    industries: string[];
    setIndustries: (industries: string[]) => void;
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
    viewMode: 'table' | 'card';
    setViewMode: (mode: 'table' | 'card') => void;
    clearFilters: () => void;
    onMobileFiltersClick: () => void;
    onRefresh: () => void;
}

const IndustryDropdown: React.FC<{ selected: string[], setSelected: (industries: string[]) => void }> = ({ selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleIndustry = (industry: string) => {
        const newSelected = selected.includes(industry)
            ? selected.filter(i => i !== industry)
            : [...selected, industry];
        setSelected(newSelected);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full h-11 px-4 text-sm text-left font-bold text-slate-700 bg-white border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-100 ${isOpen ? 'border-sky-500 ring-4 ring-sky-500/10' : 'border-slate-200 hover:border-sky-400 hover:text-sky-700'}`}
            >
                <span className="truncate">{selected.length > 0 ? `${selected.length} Selected` : 'All Industries'}</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'text-sky-500 transform rotate-180' : 'text-slate-400'}`} />
            </button>
            {isOpen && (
                <div className="absolute z-50 w-64 mt-2 origin-top-right bg-white rounded-xl shadow-2xl border border-slate-100 ring-1 ring-black ring-opacity-5 animate-fadeInUp" style={{ animationDuration: '0.2s' }}>
                    <div className="p-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                        {MOCK_INDUSTRIES.map(industry => (
                            <label key={industry} className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-700 rounded-lg hover:bg-sky-50 cursor-pointer transition-colors duration-150 group">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 transition-all duration-200 ease-in-out"
                                    checked={selected.includes(industry)}
                                    onChange={() => toggleIndustry(industry)}
                                />
                                <span className="ml-3 group-hover:text-sky-700 transition-colors">{industry}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const FilterBar: React.FC<FilterBarProps> = ({
    location, setLocation, industries, setIndustries, sortOption, setSortOption,
    viewMode, setViewMode, clearFilters, onMobileFiltersClick, onRefresh
}) => {
    const hasActiveFilters = location !== 'all' || industries.length > 0;

    const selectClass = "w-full h-11 px-4 text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100 hover:text-sky-700 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all duration-300 cursor-pointer appearance-none";

    return (
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/60 relative z-30">
             <div className="md:hidden flex items-center justify-between">
                <button 
                    onClick={onMobileFiltersClick} 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-sky-500 hover:text-sky-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all duration-200">
                    <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    Filters
                </button>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={onRefresh}
                        className="p-2.5 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 group"
                        aria-label="Refresh data"
                    >
                        <ArrowPathIcon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                    </button>
                    <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                </div>
            </div>
            <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                <div className="col-span-3 relative">
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={selectClass}
                    >
                        <option value="all">All Locations</option>
                        {MOCK_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>
                <div className="col-span-3">
                    <IndustryDropdown selected={industries} setSelected={setIndustries} />
                </div>
                <div className="col-span-3 relative">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className={selectClass}
                    >
                        <option value="name_asc">Sort: Name (A-Z)</option>
                        <option value="name_desc">Sort: Name (Z-A)</option>
                        <option value="employees_asc">Sort: Employees (Low-High)</option>
                        <option value="employees_desc">Sort: Employees (High-Low)</option>
                        <option value="founded_asc">Sort: Founded (Oldest)</option>
                        <option value="founded_desc">Sort: Founded (Newest)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>
                <div className="col-span-3 flex items-center justify-end space-x-3">
                     <button
                        onClick={onRefresh}
                        className="p-2.5 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 group border-2 border-transparent hover:border-sky-100"
                        aria-label="Refresh data"
                    >
                        <ArrowPathIcon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                    </button>
                    
                    <div className="h-8 w-px bg-slate-200 mx-1"></div>

                    <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                    
                    {hasActiveFilters && (
                        <button 
                            onClick={clearFilters} 
                            className="ml-2 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-200 border border-transparent hover:border-rose-200"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const ViewToggle: React.FC<{ viewMode: 'table' | 'card', setViewMode: (mode: 'table' | 'card') => void }> = ({ viewMode, setViewMode }) => (
    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 ${viewMode === 'table' ? 'bg-white shadow-sm text-sky-600 scale-105' : 'text-slate-400 hover:text-sky-600 hover:bg-slate-200/50'}`}
        >
            <ListIcon className="h-5 w-5" />
        </button>
        <button
            onClick={() => setViewMode('card')}
            className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 ${viewMode === 'card' ? 'bg-white shadow-sm text-sky-600 scale-105' : 'text-slate-400 hover:text-sky-600 hover:bg-slate-200/50'}`}
        >
            <GridIcon className="h-5 w-5" />
        </button>
    </div>
);


export default FilterBar;