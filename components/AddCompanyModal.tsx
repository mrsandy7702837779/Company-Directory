import React, { useState, useEffect } from 'react';
import { Company } from '../types';
import { MOCK_INDUSTRIES } from '../services/api';
import { XMarkIcon, SpinnerIcon, PhotoIcon, TrashIcon } from './icons';
// @ts-ignore
import confetti from 'canvas-confetti';

interface AddCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (companyData: Omit<Company, 'id'> & { id?: number }) => Promise<void>;
    companyToEdit?: Company;
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ isOpen, onClose, onSave, companyToEdit }) => {
    const isEditMode = !!companyToEdit;
    const [shouldRender, setShouldRender] = useState(isOpen);
    
    const initialState: Omit<Company, 'id'> = {
        name: '',
        industry: '',
        description: '',
        location: '',
        employees: 0,
        foundedYear: new Date().getFullYear(),
        logo: '',
    };
    
    const [formData, setFormData] = useState(initialState);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Handle entry/exit animations
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && companyToEdit) {
                 setFormData({
                    ...companyToEdit
                });
                setLogoPreview(companyToEdit.logo);
            } else {
                setFormData(initialState);
                setLogoPreview(null);
            }
        }
    }, [isOpen, companyToEdit, isEditMode]);

    if (!shouldRender) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        let processedValue: string | number = value;
        if (type === 'number') {
           processedValue = value ? parseInt(value, 10) : 0;
        }

        setFormData(prev => ({
            ...prev,
            [name]: processedValue,
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                setFormData(prev => ({...prev, logo: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        setLogoPreview(null);
        setFormData(prev => ({...prev, logo: ''}));
    };

    const triggerSuccessConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 9999 // Ensure confetti is above the modal (modal is z-[100])
        };

        function fire(particleRatio: number, opts: any) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const dataToSave = {
                ...formData,
                ...(isEditMode && companyToEdit ? { id: companyToEdit.id } : {}),
                logo: logoPreview || `https://picsum.photos/seed/${encodeURIComponent(formData.name)}/100/100`,
            };
            await onSave(dataToSave);
            
            triggerSuccessConfetti();
            
            onClose();
        } catch (error) {
            console.error("Failed to save company", error);
        } finally {
            setIsSaving(false);
        }
    };
    
    const currentYear = new Date().getFullYear();

    return (
        <div 
            className="fixed inset-0 z-[100] flex justify-center items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-company-modal-title"
        >
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            
            {/* Modal Panel */}
            <div 
                className={`bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`} 
                onClick={e => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between p-6 sm:p-7 border-b border-slate-200">
                        <h3 id="add-company-modal-title" className="text-xl font-bold text-gray-900">{isEditMode ? 'Edit Company Details' : 'Add New Company'}</h3>
                        <button type="button" onClick={onClose} disabled={isSaving} className="p-2 rounded-lg text-gray-400 hover:bg-slate-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 group">
                            <XMarkIcon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
                        </button>
                    </div>

                    <div className="p-6 sm:p-7 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Company Logo</label>
                            <div className="flex items-center space-x-4">
                                <span className="inline-block h-20 w-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shadow-inner">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <PhotoIcon className="h-8 w-8 text-slate-400" />
                                    )}
                                </span>
                                <div className="flex items-center gap-3">
                                    <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200">
                                        <span>Upload logo</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleLogoChange} accept="image/*" disabled={isSaving} />
                                    </label>
                                    {logoPreview && (
                                        <button type="button" onClick={handleRemoveLogo} className="flex items-center gap-1.5 py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 group">
                                            <TrashIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-start">
                                <span className="pr-3 bg-white text-sm font-semibold text-slate-900 tracking-wider uppercase">Core Information</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                             <div className="md:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required disabled={isSaving} className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200" placeholder="e.g. Innovate Inc." />
                            </div>

                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                                <select name="industry" id="industry" value={formData.industry} onChange={handleChange} required disabled={isSaving} className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white transition-all duration-200">
                                    <option value="" disabled>Select an industry</option>
                                    {MOCK_INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>
                             
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required disabled={isSaving} className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200" placeholder="e.g. San Francisco" />
                            </div>
                        </div>
                        
                        {/* Section Divider */}
                         <div className="relative pt-2">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-start">
                                <span className="pr-3 bg-white text-sm font-semibold text-slate-900 tracking-wider uppercase">Additional Details</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} disabled={isSaving} className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200" placeholder="A brief description of the company's mission and services."></textarea>
                                <p className="text-xs text-slate-500 text-right mt-1">{formData.description.length} / 250</p>
                            </div>
                        
                            <div>
                                <label htmlFor="employees" className="block text-sm font-medium text-slate-700 mb-1">Number of Employees</label>
                                <input type="number" name="employees" id="employees" value={formData.employees} onChange={handleChange} min="1" disabled={isSaving} className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200" />
                            </div>
                            <div>
                                <label htmlFor="foundedYear" className="block text-sm font-medium text-slate-700 mb-1">Founded Year</label>
                                <input type="number" name="foundedYear" id="foundedYear" value={formData.foundedYear} onChange={handleChange} min="1800" max={currentYear} disabled={isSaving} className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-7 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex justify-end space-x-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            disabled={isSaving} 
                            className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSaving} 
                            className="inline-flex items-center justify-center px-6 py-2.5 min-w-[140px] text-sm font-bold text-white bg-sky-600 rounded-lg shadow-sm hover:bg-sky-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            {isSaving ? (
                                <>
                                    <SpinnerIcon className="animate-spin -ml-1 mr-2 h-5 w-5 text-white/90" />
                                    Saving...
                                </>
                            ) : (
                                isEditMode ? 'Update Company' : 'Save Company'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCompanyModal;