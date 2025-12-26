import React from 'react';
import { X } from 'lucide-react';
import ConsentForm from './ConsentForm';

interface ConsentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 my-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors z-10"
                >
                    <X size={24} />
                </button>
                <div className="max-h-[90vh] overflow-y-auto rounded-2xl">
                    <ConsentForm />
                </div>
            </div>
        </div>
    );
};
