import React from 'react';
import { MagnifyingGlassIcon, BuildingOfficeIcon, PlusIcon } from './icons';

interface EmptyStateProps {
    isDirectoryEmpty: boolean;
    hasFilters: boolean;
    onClearFilters: () => void;
    onAddCompany: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isDirectoryEmpty, hasFilters, onClearFilters, onAddCompany }) => {
    if (isDirectoryEmpty) {
        return (
            <div className="text-center bg-white py-16 px-6 rounded-xl shadow-sm">
                <BuildingOfficeIcon className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Your directory is empty</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by adding your first company to the directory.
                </p>
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={onAddCompany}
                        className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-sky-600 hover:bg-sky-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200"
                    >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        Add Company
                    </button>
                </div>
            </div>
        );
    }
    
    if (hasFilters) {
        return (
            <div className="text-center bg-white py-16 px-6 rounded-xl shadow-sm">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No companies found</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your criteria or clear all filters to see all companies.
                </p>
                 <div className="mt-6">
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-slate-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center bg-white py-16 px-6 rounded-xl shadow-sm">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No companies found</h3>
            <p className="mt-1 text-sm text-gray-500">
                Your search and filter combination did not return any results. Try adjusting your criteria.
            </p>
        </div>
    );
};

export default EmptyState;