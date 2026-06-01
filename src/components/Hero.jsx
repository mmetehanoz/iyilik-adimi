import { Link } from 'react-router-dom';
import QuickDonation from './QuickDonation';
import DonationCategoryShowcase from './DonationCategoryShowcase';
import slider2 from '../assets/slider/s1.webp';
import slider3 from '../assets/slider/s2.webp';
import slider4 from '../assets/slider/s3.webp';
import slider5 from '../assets/slider/s4.webp';
import slider6 from '../assets/slider/s5.webp';
import slider7 from '../assets/slider/s6.webp';
import slider8 from '../assets/slider/s69.webp';
// import slider9 from '../assets/slider/kurban-bayrami-iyilikadimi4.webp';

const slides = [
    // {
    //     id: 1,
    //     image: slider9,
    // },
    { id: 1, image: slider2, title: 'Umut Ol!', subtitle: 'BİR ÇOCUĞUN GÜLÜMSEMESİ DÜNYAYA BEDEL' },
    { id: 2, image: slider3, title: 'Paylaşmak Güzeldir', subtitle: 'İHTİYAÇ SAHİPLERİNE EL UZAT' },
    { id: 3, image: slider4, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
    { id: 4, image: slider5, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
    { id: 5, image: slider6, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
    { id: 6, image: slider7, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
    { id: 7, image: slider8, title: 'Geleceğe Dokun', subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK' },
];

export default function Hero() {
    return (
        <>
            {/* Wrapper: Slider content */}
            <div id="anasayfa" className="relative z-20 pt-24 md:pt-0">

                {/* Slider section — overflow-hidden sadece burada */}
                <section className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:min-h-[80vh]">

                    {/* Background slides */}
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className="absolute inset-0 bg-cover bg-[position:62%_center] bg-no-repeat transition-opacity duration-1000 sm:bg-[position:58%_center] lg:bg-center"
                            style={{
                                opacity: index === 0 ? 1 : 0,
                                backgroundImage: `url(${slide.image})`,
                            }}
                        />
                    ))}

                    {/* Slide CTA */}
                    <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center px-4 sm:bottom-4 lg:bottom-auto lg:top-[42%]">
                        <div className="text-center">
                            <Link
                                to="/bagislar?kategori=Kurban%20Bayramı"
                                className="hero-cta animate-heartbeat inline-flex items-center justify-center rounded-full bg-[#12985a] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-[#0f7c49] sm:px-6 sm:text-xs lg:px-7 lg:py-3 lg:text-sm"
                            >
                                Kurban Bağışı Yap
                            </Link>
                        </div>
                    </div>

                    {/* Scroll down button (desktop only) */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 hidden lg:flex justify-center pointer-events-none">
                        <button className="h-12 w-12 rounded-full border-2 border-[#12985a] text-white hover:bg-[#12985a]/10 animate-bounce pointer-events-auto">
                            ↓
                        </button>
                    </div>
                </section>

            </div>

            {/* QuickDonation: Normal flow, slider'dan ayrı */}
            <QuickDonation />
            <DonationCategoryShowcase />
        </>
    );
}
