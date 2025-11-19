import React from 'react';

interface SkeletonLoaderProps {
    viewMode: 'table' | 'card';
    count: number;
}

const CardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl p-6 relative overflow-hidden shadow-sm">
        <div className="animate-pulse">
            <div className="flex items-start space-x-4 mb-4">
                <div className="h-14 w-14 bg-slate-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 bg-slate-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
                </div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-slate-200 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
            </div>
            <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
            <div className="mt-6 h-10 w-full bg-slate-200 rounded-lg"></div>
        </div>
    </div>
);

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ viewMode, count }) => {
    if (viewMode === 'table') {
        return (
            <div className="overflow-x-auto bg-gray-100 rounded-xl shadow-sm relative">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Founded</th>
                            <th className="relative px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Array.from({ length: count }).map((_, i) => (
                           <tr key={i} className="animate-pulse">
                               <td className="px-6 py-4"><div className="flex items-center"><div className="h-10 w-10 rounded-lg bg-slate-200"></div><div className="ml-4 h-4 w-32 bg-slate-200 rounded"></div></div></td>
                               <td className="px-6 py-4"><div className="h-6 w-24 bg-slate-200 rounded-full"></div></td>
                               <td className="px-6 py-4"><div className="h-4 w-20 bg-slate-200 rounded"></div></td>
                               <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-200 rounded"></div></td>
                               <td className="px-6 py-4"><div className="h-4 w-12 bg-slate-200 rounded"></div></td>
                               <td className="px-6 py-4"><div className="flex justify-end space-x-2"><div className="h-8 w-8 bg-slate-200 rounded-lg"></div><div className="h-8 w-16 bg-slate-200 rounded-lg"></div></div></td>
                           </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
    );
};

export default SkeletonLoader;