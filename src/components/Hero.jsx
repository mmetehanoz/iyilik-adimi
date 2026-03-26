import { useState, useEffect } from 'react';
import QuickDonation from './QuickDonation';
import slider2 from '../assets/slider/s1.webp';
import slider3 from '../assets/slider/s2.webp';
import slider4 from '../assets/slider/s3.webp';
import slider5 from '../assets/slider/s4.webp';
import slider6 from '../assets/slider/s5.webp';
import slider7 from '../assets/slider/s6.webp';
import slider8 from '../assets/slider/s69.webp';

const slides = [
    { id: 2, image: slider2, title: 'Umut Ol!', subtitle: 'BİR ÇOCUĞUN GÜLÜMSEMESİ DÜNYAYA BEDEL' },
    { id: 3, image: slider3, title: 'Paylaşmak Güzeldir', subtitle: 'İHTİYAÇ SAHİPLERİNE EL UZAT' },
    { id: 4, image: slider4, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
    { id: 5, image: slider5, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
    { id: 6, image: slider6, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
    { id: 7, image: slider7, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
    { id: 8, image: slider8, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        /* Wrapper: QuickDonation absolute positioning buna göre çalışır */
        <div id="anasayfa" className="relative z-20 pt-24 md:pt-0">

            {/* Slider section — overflow-hidden sadece burada */}
            <section className="relative aspect-video md:aspect-auto md:min-h-[80vh] w-full overflow-hidden">

                {/* Background slides */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="absolute inset-0 transition-opacity duration-1000 bg-cover bg-center bg-no-repeat"
                        style={{
                            opacity: index === current ? 1 : 0,
                            backgroundImage: `url(${slide.image})`,
                        }}
                    />
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Slide text */}
                <div className="absolute inset-0 flex items-start justify-center z-10 pt-45">
                    <div className="w-full px-4 text-center text-white">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                            {slides[current].title}
                        </h1>
                        <p className="mt-4 text-xs sm:text-sm md:text-base tracking-[0.2em] text-white/90 drop-shadow-md font-medium">
                            {slides[current].subtitle}
                        </p>
                    </div>
                </div>

                {/* Scroll down button (desktop only) */}
                <div className="absolute bottom-20 left-0 right-0 z-20 hidden md:flex justify-center pointer-events-none">
                    <button className="h-12 w-12 rounded-full border-2 border-[#12985a] text-white hover:bg-[#12985a]/10 animate-bounce pointer-events-auto">
                        ↓
                    </button>
                </div>
            </section>

            {/* QuickDonation: mobilde slider'ın altında, masaüstünde overlay */}
            <QuickDonation />
        </div>
    );
}
