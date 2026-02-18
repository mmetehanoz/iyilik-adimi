import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { getHomepageData } from '../services/api';

export default function LatestNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await getHomepageData();
                if (data && data.news) {
                    setNews(data.news);
                }
            } catch (err) {
                console.error('Haberler yüklenirken hata:', err);
                setError('Haberler yüklenemedi');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return null; // Ana sayfada loading göstermeyelim, sadece veri gelince rendersın
    }

    if (error) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-24 bg-gray-50/50">
            <div className="mb-16 flex flex-col items-center text-center">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#12985a]">
                    GÜNCEL GELİŞMELER
                </h3>
                <h2 className="mt-2 text-4xl lg:text-5xl font-black text-[#103e6a]">
                    BİZDEN <span className="text-[#12985a]">HABERLER</span>
                </h2>
                <div className="mt-4 w-24 h-1.5 bg-[#12985a] rounded-full"></div>
            </div>

            {news.length > 0 ? (
                <Swiper
                    modules={[Autoplay]}
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
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!pb-12 !px-4"
                >
                    {news.map((item) => (
                        <SwiperSlide key={item.id} className="h-auto">
                            <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-[#12985a]/30 hover:-translate-y-1">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.list_image || item.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop'}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                                    {/* Date Badge */}
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg text-center min-w-[60px]">
                                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            {new Date(item.publish_date).toLocaleDateString('tr-TR', { month: 'short' })}
                                        </span>
                                        <span className="block text-xl font-bold text-[#103e6a]">
                                            {new Date(item.publish_date).getDate()}
                                        </span>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#12985a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            {item.category?.name || 'Genel'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow relative">
                                    <h3 className="text-xl font-bold text-[#103e6a] mb-3 line-clamp-2 group-hover:text-[#12985a] transition-colors">
                                        <Link to={`/medya/haberler/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </h3>

                                    <div
                                        className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: item.summary }}
                                    />

                                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                        <Link
                                            to={`/medya/haberler/${item.slug}`}
                                            className="text-[#103e6a] font-bold text-sm flex items-center gap-2 group/btn"
                                        >
                                            DEVAMINI OKU
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz Haber Eklenmemiş</h3>
                    <p className="text-gray-500">
                        Şu anda görüntülenecek güncel haber bulunmamaktadır. Derneğimizden en son gelişmeler çok yakında burada olacak.
                    </p>
                </div>
            )}

            <div className="mt-8 text-center">
                <Link
                    to="/medya/haberler"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#103e6a] px-8 py-3 text-sm font-bold text-[#103e6a] transition-all hover:bg-[#103e6a] hover:text-white"
                >
                    TÜM HABERLERİ GÖR
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
