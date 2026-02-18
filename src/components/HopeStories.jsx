import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getHomepageData } from '../services/api';

export default function HopeStories() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                setLoading(true);
                const data = await getHomepageData();
                if (data && data.stories) {
                    setStories(data.stories);
                }
            } catch (err) {
                console.error('Hikayeler yüklenirken hata:', err);
                setError('Hikayeler yüklenemedi');
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    if (loading) {
        return null;
    }

    if (error) {
        return null;
    }

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#12985a]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#103e6a]/5 rounded-full blur-3xl"></div>

            <div className="mx-auto max-w-7xl px-4 relative z-10">
                {/* Section Header */}
                <div className="mb-16 flex flex-col items-center text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#12985a]">
                        UMUT IŞIĞI OLANLAR
                    </h3>
                    <h2 className="mt-2 text-4xl lg:text-5xl font-black text-[#103e6a]">
                        İYİLİK ADIMI <span className="text-[#12985a]">HİKAYELERİ</span>
                    </h2>
                    <div className="mt-4 w-24 h-1.5 bg-[#12985a] rounded-full"></div>
                    <p className="mt-6 max-w-2xl text-lg text-gray-500">
                        Sizlerin desteğiyle hayatlarına dokunduğumuz, umut olduğumuz gerçek yaşam hikayeleri.
                    </p>
                </div>

                {/* Swiper Slider */}
                {stories.length > 0 ? (
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        speed={1000}
                        loop={true}
                        grabCursor={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="!pb-16 !px-4"
                    >
                        {stories.map((story) => (
                            <SwiperSlide key={story.id} className="h-auto">
                                <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={story.image_url || story.image}
                                            alt={story.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                                        {/* Location Badge */}
                                        {story.location && (
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#12985a]" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-xs font-bold text-[#103e6a] uppercase tracking-wide">
                                                    {story.location}
                                                </span>
                                            </div>
                                        )}

                                        {/* Category Badge */}
                                        {story.category && (
                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-[#12985a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                    {story.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow relative">
                                        {/* Date */}
                                        {story.date && (
                                            <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {story.date}
                                            </div>
                                        )}

                                        <h3 className="text-xl font-bold text-[#103e6a] mb-3 line-clamp-2 group-hover:text-[#12985a] transition-colors">
                                            <Link to={`/hikayeler/${story.slug}`}>
                                                {story.title}
                                            </Link>
                                        </h3>

                                        <div className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {story.summary}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                            <Link
                                                to={`/hikayeler/${story.slug}`}
                                                className="text-[#103e6a] font-bold text-sm flex items-center gap-2 group/btn"
                                            >
                                                HİKAYEYİ OKU
                                                <span className="bg-[#103e6a]/10 p-1.5 rounded-full transition-colors group-hover/btn:bg-[#12985a] group-hover/btn:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm mx-auto max-w-2xl">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-[#12985a]/10 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#12985a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz Hikaye Eklenmemiş</h3>
                        <p className="text-gray-500">
                            Şu anda görüntülenecek başarı hikayesi bulunmamaktadır. İyilik adımlarımızın sonuçlarını çok yakında burada paylaşacağız.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
