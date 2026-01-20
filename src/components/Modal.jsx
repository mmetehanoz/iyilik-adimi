import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl transform rounded-2xl bg-white p-6 text-left shadow-2xl transition-all sm:p-8 animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="mb-4 pr-8 shrink-0">
                    <h3 className="text-2xl font-bold leading-6 text-[#103e6a]">
                        {title}
                    </h3>
                </div>

                {/* Body (Scrollable) */}
                <div className="overflow-y-auto pr-2 custom-scrollbar">
                    <div className="text-sm text-gray-600 space-y-4">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="bg-[#103e6a] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#0d3257] transition-colors"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}
