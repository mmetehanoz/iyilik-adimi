import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import ContactBar from './ContactBar';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1509098681029-b45e9c845022?q=80&w=2000&auto=format&fit=crop',
        title: 'Her Adımda İyilik!',
        subtitle: 'İYİLİK ADIMI İNSANİ YARDIM DERNEĞİ'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop',
        title: 'Umut Ol!',
        subtitle: 'BİR ÇOCUĞUN GÜLÜMSEMESİ DÜNYAYA BEDEL'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2000&auto=format&fit=crop',
        title: 'Paylaşmak Güzeldir',
        subtitle: 'İHTİYAÇ SAHİPLERİNE EL UZAT'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2000&auto=format&fit=crop',
        title: 'Geleceğe Dokun',
        subtitle: 'EĞİTİME DESTEK, GELECEĞE IŞIK'
    }
];

export default function Hero() {
    return (
        <section id="anasayfa" className="relative z-10 min-h-[80vh] w-full">
            <div className="absolute inset-0 z-0 h-full w-full">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    loop={true}
                    speed={1000}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    className="h-full w-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-full w-full flex items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/40" />

                                <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
                                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                                        {slide.title}
                                    </h1>
                                    <p className="mt-4 text-sm sm:text-base tracking-[0.2em] text-white/90 drop-shadow-md font-medium">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <button className="h-12 w-12 rounded-full border-2 border-[#12985a] text-white hover:bg-[#12985a]/10 animate-bounce pointer-events-auto">
                    ↓
                </button>
            </div>

            <ContactBar />
        </section>
    );
}
