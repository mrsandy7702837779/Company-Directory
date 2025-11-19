import React from 'react';
import { SearchIcon, BuildingOfficeIcon, UserCircleIcon, PlusIcon } from './icons';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    onAddNewClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, onAddNewClick }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center space-x-2.5 group">
                        <div className="p-2 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors duration-300">
                            <BuildingOfficeIcon className="h-7 w-7 text-sky-600 transition-transform duration-300 ease-in-out group-hover:rotate-[-12deg] group-hover:scale-110" />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight">CompanyDir</span>
                    </a>

                    {/* Search Bar */}
                    <div className="flex-1 flex justify-center px-2 lg:ml-8 lg:justify-end">
                        <div className="max-w-lg w-full lg:max-w-xs">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 sm:text-sm transition-all duration-200 shadow-sm"
                                    placeholder="Search directory..."
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center ml-4 space-x-4">
                        <button
                          onClick={onAddNewClick}
                          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-sky-600 hover:bg-sky-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transform hover:-translate-y-0.5 transition-all duration-200 group"
                        >
                          <PlusIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                          Add Company
                        </button>
                         <button
                          onClick={onAddNewClick}
                          className="sm:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-white bg-sky-600 hover:bg-sky-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transform hover:scale-105 transition-all duration-200 group"
                        >
                           <PlusIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <button className="p-1 rounded-full text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-200">
                            <UserCircleIcon className="h-9 w-9" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;