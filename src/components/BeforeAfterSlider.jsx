import React, { useState, useRef, useEffect } from 'react';

// Images directly from src/assets/images
import beforeImage from '../assets/images/1.webp';
import afterImage from '../assets/images/2.webp';

export default function BeforeAfterSlider() {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);

    // Track container width for perfect image alignment
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Intro animation: 0% → 100% → 50%
    useEffect(() => {
        if (hasAnimated) return;

        const step1 = setTimeout(() => {
            setSliderPosition(100);
        }, 500);

        const step2 = setTimeout(() => {
            setSliderPosition(0);
        }, 2800);

        const step3 = setTimeout(() => {
            setSliderPosition(50);
        }, 5500);

        const step4 = setTimeout(() => {
            setIsAnimating(false);
            setHasAnimated(true);
        }, 8000);

        return () => {
            clearTimeout(step1);
            clearTimeout(step2);
            clearTimeout(step3);
            clearTimeout(step4);
        };
    }, [hasAnimated]);

    const getPosition = (e) => {
        if (!containerRef.current) return null;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        return (x / rect.width) * 100;
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const pos = getPosition(e);
        if (pos !== null) setSliderPosition(pos);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        const pos = getPosition(e);
        if (pos !== null) setSliderPosition(pos);
    };

    // Global event listeners for drag
    useEffect(() => {
        const handleGlobalMove = (e) => {
            if (!isDragging || !containerRef.current) return;
            const pos = getPosition(e);
            if (pos !== null) setSliderPosition(pos);
        };

        const handleGlobalEnd = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMove);
            window.addEventListener('mouseup', handleGlobalEnd);
            window.addEventListener('touchmove', handleGlobalMove, { passive: false });
            window.addEventListener('touchend', handleGlobalEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalEnd);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalEnd);
        };
    }, [isDragging]);

    return (
        <section className="py-24 bg-[#eef2f6] text-center select-none overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-[#103e6a] mb-6">
                    Bir hayatı renklendirin!
                </h2>
                <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
                    Yapacağınız yardımlar <span className="font-bold text-[#3b82f6] underline decoration-2 underline-offset-4 decoration-[#3b82f6]/30">birinin</span> hayatını değiştirebilir.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                <div
                    ref={containerRef}
                    className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing group touch-none border-4 border-white"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    {/* Background Image (After - Full Color) */}
                    <img
                        src={afterImage}
                        alt="Renkli Hayat (Sonrası)"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                        draggable="false"
                    />

                    {/* Foreground Image (Before - Grayscale) - Clipped */}
                    <div
                        className={`absolute inset-y-0 left-0 overflow-hidden pointer-events-none select-none z-10 ${isAnimating ? 'transition-[width] duration-2000 ease-in-out' : ''
                            }`}
                        style={{ width: `${sliderPosition}%` }}
                    >
                        <img
                            src={beforeImage}
                            alt="Siyah Beyaz Hayat (Öncesi)"
                            className="absolute inset-y-0 left-0 max-w-none h-full object-cover pointer-events-none select-none"
                            style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
                            draggable="false"
                        />
                    </div>

                    {/* Divider Line */}
                    <div
                        className={`absolute inset-y-0 z-20 pointer-events-none ${isAnimating ? 'transition-[left] duration-2000 ease-in-out' : ''}`}
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute inset-y-0 -translate-x-1/2 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center transform -translate-x-1/2 ${isAnimating ? 'transition-[left] duration-2000 ease-in-out' : ''
                            }`}
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl text-[#103e6a] transition-transform duration-200 group-hover:scale-110 border-4 border-[#eef2f6]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
