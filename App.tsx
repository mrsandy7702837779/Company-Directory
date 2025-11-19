import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchCompanies } from './services/api';
import { Company, SortOption } from './types';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import CompanyTable from './components/CompanyTable';
import CompanyCard from './components/CompanyCard';
import Pagination from './components/Pagination';
import SkeletonLoader from './components/SkeletonLoader';
import EmptyState from './components/EmptyState';
import MobileFilterDrawer from './components/MobileFilterDrawer';
import AddCompanyModal from './components/AddCompanyModal';
import CompanyDetail from './components/CompanyDetail';
import ErrorState from './components/ErrorState';

const ITEMS_PER_PAGE = 9;

const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    // Raw data state
    const [allCompanies, setAllCompanies] = useState<Company[]>([]);
    
    // UI state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [companyToEdit, setCompanyToEdit] = useState<Company | undefined>(undefined);
    
    // Parallax State
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Filtering and Sorting state
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('all');
    const [industries, setIndustries] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<SortOption>('name_asc');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);

    // Routing state (hash-based)
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

    // --- DATA FETCHING ---
    const loadCompanies = useCallback(async () => {
        setIsLoading(true);
        setError(null); // Reset error state on new load attempt
        try {
            const data = await fetchCompanies();
            setAllCompanies(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial data load on component mount
    useEffect(() => {
        loadCompanies();
    }, [loadCompanies]);

    // --- MOUSE MOVE HANDLER FOR PARALLAX ---
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 20, // Move up to 20px
                y: (e.clientY / window.innerHeight) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    // --- ROUTING LOGIC (HASH-BASED) ---
    // This effect listens for changes in the URL hash to show/hide the company detail view.
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const match = hash.match(/^#\/company\/(\d+)$/);
            if (match) {
                setSelectedCompanyId(parseInt(match[1], 10));
            } else {
                setSelectedCompanyId(null);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Check hash on initial load

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);


    // --- FILTERING, SORTING & PAGINATION LOGIC ---
    // `useMemo` is used here for performance optimization.
    // The filtering and sorting logic only re-runs when its dependencies change.
    const filteredAndSortedCompanies = useMemo(() => {
        let companies = [...allCompanies];

        // 1. Filter by search term (case-insensitive)
        if (searchTerm) {
            companies = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // 2. Filter by location
        if (location !== 'all') {
            companies = companies.filter(c => c.location === location);
        }

        // 3. Filter by selected industries
        if (industries.length > 0) {
            companies = companies.filter(c => industries.includes(c.industry));
        }

        // 4. Sort the filtered results
        companies.sort((a, b) => {
            switch (sortOption) {
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                case 'employees_asc':
                    return a.employees - b.employees;
                case 'employees_desc':
                    return b.employees - a.employees;
                case 'founded_asc':
                    return a.foundedYear - b.foundedYear;
                case 'founded_desc':
                    return b.foundedYear - a.foundedYear;
                default:
                    return 0;
            }
        });

        return companies;
    }, [allCompanies, searchTerm, location, industries, sortOption]);

    // Calculate pagination details based on the filtered list
    const totalPages = Math.ceil(filteredAndSortedCompanies.length / ITEMS_PER_PAGE);
    const paginatedCompanies = filteredAndSortedCompanies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Effect to reset page number when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, location, industries, sortOption]);


    // --- EVENT HANDLERS ---
    const clearFilters = () => {
        setLocation('all');
        setIndustries([]);
        setSortOption('name_asc');
        setSearchTerm('');
    };

    const handleSaveCompany = async (companyData: Omit<Company, 'id'> & { id?: number }) => {
        // This function simulates saving data. In a real app, this would be an API call.
        if (companyData.id) { // Editing existing company
            setAllCompanies(prev => prev.map(c => c.id === companyData.id ? { ...c, ...companyData, id: c.id } : c));
        } else { // Adding new company
            const newCompany = { ...companyData, id: Date.now() }; // Use timestamp for unique ID in mock
            setAllCompanies(prev => [newCompany, ...prev]);
        }
    };
    
    const handleEditClick = (company: Company) => {
        // Directly open modal to prevent conflict with hover states/flip cards
        setCompanyToEdit(company);
        setIsAddModalOpen(true);
    };

    const handleAddNewClick = () => {
        setCompanyToEdit(undefined); // Ensure we are in "add" mode
        setIsAddModalOpen(true);
    };

    const selectedCompany = useMemo(() => {
        if (!selectedCompanyId) return null;
        return allCompanies.find(c => c.id === selectedCompanyId) || null;
    }, [selectedCompanyId, allCompanies]);

    // --- RENDER LOGIC ---
    const renderContent = () => {
        if (isLoading) {
            return <SkeletonLoader viewMode={viewMode} count={ITEMS_PER_PAGE} />;
        }
        if (error) {
            return <ErrorState message={error} onRetry={loadCompanies} />;
        }
        if (paginatedCompanies.length === 0) {
            const isDirectoryEmpty = allCompanies.length === 0;
            const hasActiveFilters = searchTerm !== '' || location !== 'all' || industries.length > 0;
            return (
                <EmptyState 
                    isDirectoryEmpty={isDirectoryEmpty}
                    hasFilters={hasActiveFilters}
                    onClearFilters={clearFilters}
                    onAddCompany={handleAddNewClick}
                />
            );
        }
        if (viewMode === 'table') {
            return <CompanyTable companies={paginatedCompanies} onEdit={handleEditClick} />;
        }
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedCompanies.map((company, index) => (
                    <CompanyCard key={company.id} company={company} index={index} onEdit={handleEditClick} />
                ))}
            </div>
        );
    };

    // If a company detail page is active, render it. Otherwise, render the main directory.
    if (selectedCompanyId) {
        if (isLoading) return <div className="p-8"><SkeletonLoader viewMode="card" count={1} /></div>; // or a specific detail skeleton
        if (!selectedCompany) return <div className="p-8"><EmptyState isDirectoryEmpty={false} hasFilters={false} onClearFilters={() => {}} onAddCompany={() => {}} /></div>; // Or a "Not Found" page
        
        return (
            <div className="bg-slate-50 min-h-screen">
                <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
                     <CompanyDetail 
                        company={selectedCompany} 
                        onBack={() => window.location.hash = ''} 
                    />
                </main>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen overflow-hidden relative">
            {/* Background Parallax Layer */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute top-0 left-0 w-96 h-96 bg-sky-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
                    style={{ transform: `translate(-${mousePos.x}px, -${mousePos.y}px)` }}
                ></div>
                <div 
                    className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
                    style={{ animationDelay: '2s', transform: `translate(${mousePos.x}px, -${mousePos.y}px)` }}
                ></div>
                <div 
                    className="absolute -bottom-8 left-20 w-96 h-96 bg-teal-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
                    style={{ animationDelay: '4s', transform: `translate(-${mousePos.x}px, ${mousePos.y}px)` }}
                ></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    onAddNewClick={handleAddNewClick}
                />
                <main className="flex-grow max-w-7xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        <FilterBar
                            location={location}
                            setLocation={setLocation}
                            industries={industries}
                            setIndustries={setIndustries}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            clearFilters={clearFilters}
                            onMobileFiltersClick={() => setIsMobileFiltersOpen(true)}
                            onRefresh={loadCompanies}
                        />
                        
                        {renderContent()}

                        {!isLoading && !error && paginatedCompanies.length > 0 && totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                </main>

                {/* Minimal Clean Footer */}
                <footer className="mt-auto py-8 border-t border-slate-200 bg-white/60 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                         <p className="text-slate-500 text-sm">
                             © {new Date().getFullYear()} CompanyDir. All rights reserved.
                         </p>
                    </div>
                </footer>
            </div>
            
            <MobileFilterDrawer
                isOpen={isMobileFiltersOpen}
                onClose={() => setIsMobileFiltersOpen(false)}
                location={location}
                setLocation={setLocation}
                industries={industries}
                setIndustries={setIndustries}
                sortOption={sortOption}
                setSortOption={setSortOption}
                clearFilters={clearFilters}
            />

            <AddCompanyModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveCompany}
                companyToEdit={companyToEdit}
            />
        </div>
    );
};

export default App;