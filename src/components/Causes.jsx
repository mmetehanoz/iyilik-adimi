import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { getFeaturedDonations } from '../services/api';

const colorClasses = {
    bg: "bg-[#12985a]",
    text: "text-[#12985a]",
    bar: "bg-[#12985a]",
    btn: "bg-[#12985a] hover:opacity-90",
};

export default function Causes() {
    const [causes, setCauses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCauses = async () => {
            try {
                setLoading(true);
                const data = await getFeaturedDonations();
                const donations = Array.isArray(data) ? data : (data.results || []);

                // Öne çıkan bağışları formatla (is_featured=true ve target_amount var)
                const formattedCauses = donations.map(donation => ({
                    id: donation.id,
                    slug: donation.slug,
                    title: donation.title,
                    description: donation.short_description || donation.description || '',
                    goal: parseFloat(donation.target_amount || donation.fixed_price || 0),
                    raised: parseFloat(donation.raised_amount || 0),
                    percentage: parseFloat(donation.target_amount || 0) > 0
                        ? (parseFloat(donation.raised_amount || 0) / parseFloat(donation.target_amount)) * 100
                        : (donation.share_progress || 0),
                    image: donation.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
                }));

                setCauses(formattedCauses);
            } catch (err) {
                console.error('Öne çıkan bağışlar yüklenirken hata:', err);
                setError('Bağışlar yüklenemedi');
            } finally {
                setLoading(false);
            }
        };

        fetchCauses();
    }, []);

    if (loading) {
        return (
            <section id="projelerimiz" className="mx-auto max-w-7xl px-4 py-24">
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-[#12985a] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="projelerimiz" className="mx-auto max-w-7xl px-4 py-24">
                <div className="text-center text-red-500">
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section id="projelerimiz" className="mx-auto max-w-7xl px-4 py-24">
            <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#12985a]">
                        PROJELERİMİZ
                    </h3>
                    <h2 className="mt-2 text-6xl font-black text-gray-700">
                        YARDIM <span className="text-[#12985a]">ET!</span>
                    </h2>
                </div>

                <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <p className="text-gray-500 lg:max-w-md">
                        İyilik paylaştıkça çoğalır. Siz de projelerimize destek olarak ihtiyaç sahiplerinin yüzündeki tebessümün sebebi olabilirsiniz.
                    </p>
                    <Link
                        to="/bagislar"
                        className="whitespace-nowrap rounded-full bg-[#103e6a] px-8 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                    >
                        TÜMÜNÜ GÖR
                    </Link>
                </div>
            </div>

            {causes.length > 0 ? (
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={causes.length > 3}
                    speed={2000}
                    grabCursor={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10 !px-4"
                >
                    {causes.map((cause) => (
                        <SwiperSlide key={cause.id}>
                            <div className="group overflow-hidden rounded-2xl border-2 border-[#12985a]/20 bg-white shadow-sm transition-all hover:border-[#12985a] hover:shadow-md">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <img
                                        src={cause.image}
                                        alt={cause.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className={`absolute bottom-0 right-10 ${colorClasses.bg} px-6 py-2 text-xs font-bold text-white`}>
                                        BAĞIŞ YAP
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-gray-900 px-[14px] py-[8px] text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-1.647-2.865A8.995 8.995 0 0112 18z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-700">{cause.title}</h3>
                                    <div
                                        className="mt-4 text-sm leading-relaxed text-gray-500 h-20 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: cause.description }}
                                    />

                                    {(cause.goal > 0 || cause.percentage > 0) && (
                                        <div className="mt-8">
                                            <div className="relative h-1 w-full bg-gray-100">
                                                <div
                                                    className={`absolute left-0 top-0 h-full ${colorClasses.bar}`}
                                                    style={{ width: `${Math.min(cause.percentage || 0, 100)}%` }}
                                                />
                                                <div
                                                    className={`absolute -top-3 ${colorClasses.bg} px-2 py-0.5 text-[10px] font-bold text-white transition-all duration-500`}
                                                    style={{ left: `${Math.min(cause.percentage || 0, 100)}%` }}
                                                >
                                                    {Math.round(cause.percentage || 0)}%
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {cause.goal > 0 && (
                                        <div className="mt-4 flex items-center justify-between text-xs font-bold tracking-wider text-gray-500">
                                            <div>HEDEF : {cause.goal.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ₺</div>
                                            <div>TOPLANAN : {cause.raised.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ₺</div>
                                        </div>
                                    )}

                                    <Link
                                        to="/bagislar"
                                        className="mt-8 inline-block rounded-full bg-[#103e6a] px-6 py-2.5 text-xs font-bold text-white transition-colors hover:opacity-90"
                                    >
                                        DETAYLARI GÖR
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="text-center text-gray-500 py-12">
                    <p>Henüz öne çıkan bağış bulunmamaktadır.</p>
                </div>
            )}
        </section>
    );
}
