import React from 'react';
import { SortOption } from '../types';
import { MOCK_LOCATIONS, MOCK_INDUSTRIES } from '../services/api';
import { XMarkIcon } from './icons';

interface MobileFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    location: string;
    setLocation: (location: string) => void;
    industries: string[];
    setIndustries: (industries: string[]) => void;
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
    clearFilters: () => void;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
    isOpen, onClose, location, setLocation, industries, setIndustries,
    sortOption, setSortOption, clearFilters
}) => {
    const handleClear = () => {
        clearFilters();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-70 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            
            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white rounded-l-2xl shadow-xl border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="filters-heading"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 id="filters-heading" className="text-lg font-semibold text-gray-900">Filters</h2>
                        <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 group" aria-label="Close filters">
                            <XMarkIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
                        </button>
                    </div>
                    
                    <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                        <div>
                            <label htmlFor="mobile-location" className="text-sm font-medium text-gray-700">Location</label>
                            <select
                                id="mobile-location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1 w-full h-10 px-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200"
                            >
                                <option value="all">All Locations</option>
                                {MOCK_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700">Industry</label>
                            <div className="mt-1 space-y-2 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-lg">
                                {MOCK_INDUSTRIES.map(industry => (
                                    <label key={industry} className="flex items-center px-2 py-1.5 text-sm text-gray-800 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-150">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                            checked={industries.includes(industry)}
                                            onChange={() => {
                                                const newIndustries = industries.includes(industry)
                                                    ? industries.filter(i => i !== industry)
                                                    : [...industries, industry];
                                                setIndustries(newIndustries);
                                            }}
                                        />
                                        <span className="ml-3">{industry}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="mobile-sort-by" className="text-sm font-medium text-gray-700">Sort By</label>
                            <select
                                id="mobile-sort-by"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className="mt-1 w-full h-10 px-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200"
                            >
                                <option value="name_asc">Name (A-Z)</option>
                                <option value="name_desc">Name (Z-A)</option>
                                <option value="employees_asc">Employees (Low-High)</option>
                                <option value="employees_desc">Employees (High-Low)</option>
                                <option value="founded_asc">Founded (Oldest First)</option>
                                <option value="founded_desc">Founded (Newest First)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-200 grid grid-cols-2 gap-3">
                        <button onClick={handleClear} className="w-full px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200">
                            Clear
                        </button>
                        <button onClick={onClose} className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg shadow-sm hover:bg-sky-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileFilterDrawer;