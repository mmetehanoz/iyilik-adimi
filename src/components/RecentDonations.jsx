import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDonations } from '../services/api';

export default function RecentDonations() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const data = await getDonations();
                const donationsList = Array.isArray(data) ? data : (data.results || []);
                // Sadece ilk 3 bağışı al
                setDonations(donationsList.slice(0, 3));
            } catch (error) {
                console.error('Bağışlar yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    if (loading) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-16">
                <div className="flex justify-center">
                    <div className="w-10 h-10 border-4 border-[#12985a] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    if (donations.length === 0) {
        return null;
    }

    // Her bağış için standart özellikler (Veritabanında olmadığı için)
    // İleride backend'den 'features' alanı gelirse oradan çekilebilir
    const getFeatures = (donation) => [
        "Güvenilir ve şeffaf süreç",
        "SMS ve E-posta bilgilendirmesi",
        donation.status_display || "Hızlı ve güvenli ulaştırma"
    ];

    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {donations.map((donation, index) => {
                    // Ortadaki kart (index 1) öne çıkan (primary) stilinde olsun
                    const isPrimary = index === 1;

                    // Fiyat hesaplama: Varyant varsa en düşüğünü al, yoksa sabit/min fiyatı al
                    let price = parseFloat(donation.fixed_price || donation.min_price || 0);
                    if (donation.price_variants && donation.price_variants.length > 0) {
                        const variantPrices = donation.price_variants.map(v => parseFloat(v.price));
                        const minVariantPrice = Math.min(...variantPrices);
                        if (minVariantPrice > 0) {
                            price = minVariantPrice;
                        }
                    }

                    // Kategori ismini birim olarak kullan (Örn: / EĞİTİM)
                    const unit = donation.category_name ? `/ ${donation.category_name.toUpperCase()}` : "";

                    return (
                        <div
                            key={donation.id}
                            className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${isPrimary
                                ? 'bg-[#103e6a] text-white transform md:scale-105 z-10 shadow-2xl border-4 border-[#103e6a]'
                                : 'bg-white text-gray-800 border border-gray-100'
                                }`}
                        >
                            {/* Resim Alanı */}
                            <div className="h-48 overflow-hidden relative shrink-0">
                                <img
                                    src={donation.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80'}
                                    alt={donation.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80';
                                    }}
                                />
                                {isPrimary && (
                                    <div className="absolute inset-0 bg-[#103e6a]/20"></div>
                                )}
                            </div>

                            {/* İçerik Alanı */}
                            <div className="p-8 text-center flex flex-col flex-grow">
                                <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 line-clamp-1 ${isPrimary ? 'text-blue-200' : 'text-gray-500'
                                    }`}>
                                    {donation.title}
                                </h3>

                                <div className="mb-2 flex items-center justify-center">
                                    <span className={`text-4xl font-black tracking-tight ${isPrimary ? 'text-white' : 'text-[#12985a]'
                                        }`}>
                                        {price.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                                    </span>
                                    <span className={`text-xl font-bold ml-1 ${isPrimary ? 'text-white' : 'text-[#12985a]'
                                        }`}>₺</span>
                                </div>

                                <div className={`text-xs font-bold tracking-wider mb-8 ${isPrimary ? 'text-blue-200' : 'text-gray-400'
                                    }`}>
                                    {unit}
                                </div>

                                <ul className={`space-y-4 mb-8 text-left mx-auto w-full max-w-[240px] flex-grow ${isPrimary ? 'text-blue-100' : 'text-gray-600'
                                    }`}>
                                    {getFeatures(donation).map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm">
                                            <svg
                                                className={`w-5 h-5 mr-3 shrink-0 ${isPrimary ? 'text-[#12985a]' : 'text-[#12985a]'
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="line-clamp-1">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={`/bagislar/${donation.slug}`}
                                    className={`block w-full py-4 rounded-full text-sm font-bold tracking-wider transition-all shadow-lg hover:shadow-xl ${isPrimary
                                        ? 'bg-white text-[#103e6a] hover:bg-gray-50'
                                        : 'bg-[#103e6a] text-white hover:bg-[#0d3257] hover:scale-105'
                                        }`}
                                >
                                    {isPrimary ? "BAĞIŞ YAP" : "DAHA FAZLA"}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
