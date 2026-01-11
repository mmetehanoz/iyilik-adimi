import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const videos = [
    {
        id: 1,
        url: "https://www.youtube.com/embed/Snwt5fDLhoY",
        title: "Tanıtım Videosu 1"
    },
    {
        id: 2,
        url: "https://www.youtube.com/embed/ut22ViMc8x8",
        title: "Tanıtım Videosu 2"
    },
    {
        id: 3,
        url: "https://www.youtube.com/embed/K4afQ7fMSPo",
        title: "Tanıtım Videosu 3"
    }
];

export default function Videos() {
    return (
        <section id="medya" className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#12985a]">
                        MEDYA GALERİSİ
                    </h3>
                    <h2 className="mt-2 text-4xl font-black text-gray-900 sm:text-5xl">
                        TANITIM VİDEOLARIMIZ
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-24 bg-[#12985a] rounded-full"></div>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        speed={1000}
                        grabCursor={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="pb-10 !px-4"
                    >
                        {videos.map((video) => (
                            <SwiperSlide key={video.id}>
                                <div className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all hover:shadow-xl">
                                    <div className="aspect-w-16 aspect-h-9 relative w-full pt-[56.25%]">
                                        <iframe
                                            src={video.url}
                                            title={video.title}
                                            className="absolute top-0 left-0 bottom-0 right-0 h-full w-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Youtube Subscribe Bar */}
                <div className="mx-auto mt-12 max-w-4xl relative overflow-hidden rounded-2xl p-[3px]">
                    {/* Animated Border Background */}
                    <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#12985a_50%,#E2E8F0_100%)]" />

                    {/* Content Container */}
                    <div className="relative flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#CC0000] p-6 text-white shadow-xl md:flex-row md:px-12 md:py-8 h-full w-full text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[#CC0000] shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xl md:text-2xl font-black">KANALIMIZA ABONE OLUN!</h4>
                                <p className="mt-1 text-sm md:text-base text-white/90">Faaliyetlerimizi ve yardım çalışmalarımızı yakından takip edin.</p>
                            </div>
                        </div>
                        <a
                            href="https://www.youtube.com/@iyilikadimitr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whitespace-nowrap rounded-full bg-white px-8 py-3 text-sm font-bold text-[#CC0000] transition-transform animate-heartbeat hover:scale-105 hover:bg-gray-100 active:scale-95 shadow-lg"
                        >
                            ABONE OL
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
