import React from 'react';
import { ExclamationTriangleIcon } from './icons';

interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
    return (
        <div className="text-center bg-red-50 border border-red-200 py-16 px-6 rounded-xl shadow-sm">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-2 text-lg font-medium text-red-900">An Error Occurred</h3>
            <p className="mt-1 text-sm text-red-700">{message}</p>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={onRetry}
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                    Try Again
                </button>
            </div>
            <div className="mt-4">
                <a href="mailto:support@companydir.com" className="text-sm font-medium text-red-600 hover:text-red-800 underline decoration-red-300 hover:decoration-red-800 transition-all duration-200">
                    Contact Support
                </a>
            </div>
        </div>
    );
};

export default ErrorState;