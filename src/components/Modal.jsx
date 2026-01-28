import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    // Escape key listener
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with enhanced blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content with glassmorphism and premium shadows */}
            <div className="relative w-full max-w-2xl transform rounded-3xl bg-white/95 p-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all sm:p-10 animate-zoom-in max-h-[90vh] flex flex-col border border-white/20 backdrop-blur-xl">
                {/* Close Button - Premium Style */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 rounded-full p-2 text-gray-400 hover:bg-gray-100/80 hover:text-[#103e6a] transition-all duration-300 z-10 hover:rotate-90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="mb-6 pr-8 shrink-0">
                    <h3 className="text-3xl font-black leading-tight text-[#103e6a]">
                        {title}
                    </h3>
                    <div className="h-1.5 w-12 bg-[#12985a] rounded-full mt-2" />
                </div>

                {/* Body (Scrollable) */}
                <div className="overflow-y-auto pr-4 custom-scrollbar">
                    <div className="text-base text-gray-700 leading-relaxed space-y-6 font-medium">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="bg-[#103e6a] text-white px-8 py-3 rounded-2xl font-black hover:bg-[#0d3257] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#103e6a]/20"
                    >
                        Anladım, Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}
