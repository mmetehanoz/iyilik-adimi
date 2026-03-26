import React from 'react';

export default function ScrollToTopButton() {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 left-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#103e6a] text-white shadow-[0_4px_14px_0_rgba(16,62,106,0.39)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(16,62,106,0.4)] hover:-translate-y-1 active:scale-95"
            aria-label="Sayfanın başına git"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
            </svg>
        </button>
    );
}
