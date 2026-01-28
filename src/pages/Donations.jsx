import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { getCategories, getDonations } from '../services/api';
import { useToast } from '../context/ToastContext';

// Helper to assign icons based on category name
const getCategoryIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('kurban')) return '🐑';
    if (lowerName.includes('gazze')) return '🇵🇸';
    if (lowerName.includes('yemek') || lowerName.includes('gıda') || lowerName.includes('iftar')) return '🍲';
    if (lowerName.includes('su') || lowerName.includes('kuyu')) return '💧';
    if (lowerName.includes('yetim') || lowerName.includes('çocuk')) return '👦';
    if (lowerName.includes('acil')) return '🚨';
    if (lowerName.includes('eğitim') || lowerName.includes('kırtasiye') || lowerName.includes('öğrenci')) return '✏️';
    if (lowerName.includes('sağlık') || lowerName.includes('ilaç')) return '⚕️';
    if (lowerName.includes('nakdi') || lowerName.includes('zekat') || lowerName.includes('sadaka')) return '💰';
    if (lowerName.includes('kumanya')) return '📦';
    return '🌍';
};

// Placeholder image if backend sends none
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop';

export default function Donations() {
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Kategorileri ve tüm bağışları paralel çek
                const [catsData, donationsData] = await Promise.all([
                    getCategories(),
                    getDonations() // Tüm aktif bağışları çeker
                ]);

                const rawCategories = Array.isArray(catsData) ? catsData : (catsData.results || []);
                const rawDonations = Array.isArray(donationsData) ? donationsData : (donationsData.results || []);

                // Kategorileri frontend yapısına dönüştür
                const processedCategories = rawCategories.map(cat => {
                    // Bu kategoriye ait bağışları filtrele
                    const catItems = rawDonations.filter(d => d.category_id === cat.id).map(d => ({
                        id: d.id,
                        slug: d.slug,
                        name: d.title,
                        category_name: cat.name, // Kategori adı eklendi
                        description: d.short_description || d.description,
                        price: parseFloat(d.fixed_price || d.min_price || 0),
                        min_price: parseFloat(d.min_price || 0),
                        is_fixed: d.price_type === 'fixed',
                        image: d.image || PLACEHOLDER_IMAGE,
                        available_countries: d.available_countries || [],
                        donation_types: d.donation_types || [],
                        price_variants: d.price_variants || [], // Backend'den gelen yeni alan
                        currency: d.currency,
                        original_data: d
                    }));

                    return {
                        id: cat.id,
                        title: cat.name.toUpperCase(),
                        icon: getCategoryIcon(cat.name),
                        items: catItems
                    };
                }).filter(cat => cat.items.length > 0); // İçi boş kategorileri gösterme

                setCategories(processedCategories);
                if (processedCategories.length > 0) {
                    setActiveTab(processedCategories[0].id);
                }

            } catch (err) {
                console.error("Veri yükleme hatası:", err);
                setError("Bağışlar yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#103e6a] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#103e6a] font-medium">Bağışlar Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Hata Oluştu</h2>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-[#103e6a] text-white rounded-lg hover:bg-opacity-90"
                    >
                        Tekrar Dene
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-16">
            <div className="mx-auto max-w-7xl px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#103e6a] mb-12">
                    Bağış Kategorileri
                </h1>

                <div className="flex flex-col gap-8">
                    {/* Tabs (Swiper) */}
                    <div className="w-full">
                        <Swiper
                            slidesPerView={'auto'}
                            spaceBetween={12}
                            freeMode={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            modules={[FreeMode, Autoplay]}
                            className="w-full !pb-4 !px-1"
                        >
                            {categories.map((cat) => (
                                <SwiperSlide key={cat.id} className="!w-auto">
                                    <button
                                        onClick={() => setActiveTab(cat.id)}
                                        className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 font-bold border text-sm sm:text-base whitespace-nowrap
                      ${activeTab === cat.id
                                                ? 'bg-[#103e6a] text-white border-[#103e6a] shadow-lg scale-105'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#12985a] hover:text-[#12985a]'
                                            }`}
                                    >
                                        <span className="text-xl">{cat.icon}</span>
                                        <span>{cat.title}</span>
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Content Area */}
                    <div className="w-full">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border border-gray-100">
                            {categories.map((cat) => {
                                if (cat.id !== activeTab) return null;

                                return (
                                    <div key={cat.id}>
                                        <div className="flex items-center gap-3 mb-8 border-b pb-4">
                                            <span className="text-4xl">{cat.icon}</span>
                                            <h2 className="text-2xl font-bold text-[#103e6a]">{cat.title}</h2>
                                        </div>

                                        {cat.items.length === 0 ? (
                                            <p className="text-gray-500 text-center py-8">Bu kategoride henüz gösterilecek bağış bulunmamaktadır.</p>
                                        ) : (
                                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {cat.items.map((item) => (
                                                    <DonationCard key={item.id} item={item} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DonationCard({ item }) {
    // States
    const [selectedCountry, setSelectedCountry] = useState(
        item.available_countries && item.available_countries.length > 0 ? item.available_countries[0] : null
    );

    // Varyantı varsayılan olarak seç, fiyata göre sıralı (küçükten büyüğe)
    const [selectedType, setSelectedType] = useState(() => {
        if (item.donation_types && item.donation_types.length > 0) {
            const sorted = [...item.donation_types].sort((a, b) => (a.price || 0) - (b.price || 0));
            return sorted[0];
        }
        return null;
    });

    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const showToast = useToast();

    // Determine Logic Type
    const hasVariants = item.donation_types && item.donation_types.length > 0;
    const isFixed = item.is_fixed;



    // Logic Calculation with Price Variants Lookup
    let currentPrice = 0;

    if (hasVariants && selectedType) {
        // 1. Önce tam eşleşme (Ülke + Tip) ara
        let variant = null;
        if (selectedCountry) {
            variant = item.price_variants.find(v =>
                v.donation_type_id === selectedType.id &&
                v.country === selectedCountry
            );
        }

        // 2. Bulunamazsa sadece Tip eşleşmesi ara (Ülke bağımsız varyant)
        if (!variant) {
            variant = item.price_variants.find(v =>
                v.donation_type_id === selectedType.id &&
                !v.country
            );
        }

        if (variant) {
            // Varyant tablosundan gelen fiyat
            currentPrice = parseFloat(variant.price);
        } else {
            // Hiçbiri yoksa DonationType'ın kendi fiyatı
            currentPrice = parseFloat(selectedType.price || 0);
        }

        // Fallback: Eğer hala 0 ise ve bağışın ana fiyatı varsa onu kullan
        if (currentPrice === 0 && item.price > 0) {
            currentPrice = item.price;
        }

    } else if (isFixed) {
        // Fixed Price - Check for country-specific variant first
        let variant = null;
        if (selectedCountry) {
            variant = item.price_variants.find(v =>
                v.country === selectedCountry &&
                !v.donation_type_id
            );
        }

        if (variant) {
            currentPrice = parseFloat(variant.price);
        } else {
            // Donation.jsx mapping uses item.price for fixed_price/min_price
            currentPrice = parseFloat(item.price || 0);
        }
    } else {
        // Flexible
        currentPrice = amount ? parseFloat(amount) : 0;
    }

    const handleAddToCart = () => {
        // Validation
        if (!isFixed && !hasVariants) {
            // Flexible validation
            const min = item.min_price || 0;
            if (!amount || parseFloat(amount) < min) {
                showToast(`Lütfen minimum ${min} ₺ tutarında bağış giriniz.`, 'error');
                return;
            }
        }

        // Fiyat Güvenlik Kontrolü
        if (!currentPrice || currentPrice <= 0) {
            console.error("Fiyat Hatası:", { currentPrice, selectedType, selectedCountry });
            showToast("Bağış tutarı geçersiz (0 TL). Lütfen seçimlerinizi kontrol ediniz.", 'error');
            return;
        }

        // Eğer selectedCountry null ise ve available_countries varsa, ilkini seç (fallback)
        let finalSelectedCountry = selectedCountry;
        if (!finalSelectedCountry && item.available_countries && item.available_countries.length > 0) {
            finalSelectedCountry = item.available_countries[0];
        }

        const cartItem = {
            id: item.id,
            name: item.name,
            image: item.image,
            price: currentPrice,
            selectedOption: selectedType ? selectedType.name : (finalSelectedCountry || null),
            // Backend için detaylar (Eski yöntem)
            selected_country: finalSelectedCountry || null,
            donation_type: selectedType
                ? selectedType.name
                : (isFixed ? 'Genel Bağış' : `${item.category_name} ${item.name}`),
            // Yeni Güvenli Yöntem: _submissionData
            _submissionData: {
                donation: item.id,
                amount: currentPrice,
                currency: (item.currency && typeof item.currency === 'object') ? item.currency.id : item.currency,
                selected_country: finalSelectedCountry, // Doğru ülke ismi
                donation_type: selectedType
                    ? selectedType.name
                    : (isFixed ? 'Genel Bağış' : `${item.category_name} ${item.name}`),
                form_data: {
                    selected_country: finalSelectedCountry,
                    donation_type: selectedType
                        ? selectedType.name
                        : (isFixed ? 'Genel Bağış' : `${item.category_name} ${item.name}`)
                }
            },
            quantity: hasVariants ? 1 : quantity,
            currency: item.currency,
            type: 'donation',
            slug: item.slug
        };

        addToCart(cartItem);
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#12985a] hover:shadow-lg transition-all duration-300 bg-white group flex flex-col h-full">
            {/* Image */}
            <div className="h-48 overflow-hidden relative">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="font-bold text-white text-lg leading-tight">{item.name}</h3>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div
                    className="text-sm text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                />

                <div className="mt-auto space-y-3">

                    {/* Ülke Seçimi */}
                    {item.available_countries && item.available_countries.length > 0 && (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Ülke</label>
                            <select
                                className="w-full mt-1 p-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#12985a] outline-none bg-gray-50"
                                value={selectedCountry || ''}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                {item.available_countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Varyant (Adet) Seçimi */}
                    {hasVariants && (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">ADET</label>
                            <select
                                className="w-full mt-1 p-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#12985a] outline-none bg-gray-50"
                                value={selectedType?.id}
                                onChange={(e) => {
                                    const type = item.donation_types.find(t => t.id === parseInt(e.target.value));
                                    setSelectedType(type);
                                }}
                            >
                                {item.donation_types
                                    .slice()
                                    .sort((a, b) => (a.price || 0) - (b.price || 0))
                                    .map(type => (
                                        <option key={type.id} value={type.id}>
                                            {/* Sadece Varyant Adı (Fiyat kaldırıldı) */}
                                            {type.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}

                    {/* Flexible Price Input */}
                    {!isFixed && !hasVariants && (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Bağış Tutarı (₺)</label>
                            <div className="relative mt-1">
                                <input
                                    type="number"
                                    min={item.min_price}
                                    placeholder={`Min ${item.min_price} ₺`}
                                    className="w-full p-2 pl-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#12985a] outline-none"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <span className="absolute right-3 top-2 text-gray-400 text-sm">₺</span>
                            </div>
                        </div>
                    )}

                    {/* Footer: Price & Button */}
                    <div className="pt-2 flex items-center justify-between gap-4">
                        <div className="font-bold text-[#103e6a] text-xl whitespace-nowrap">
                            {!isFixed && !hasVariants ? (
                                amount ? <span>{new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(amount)} ₺</span> : <span>Min: {item.min_price} ₺</span>
                            ) : (
                                <span>{new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(currentPrice)} ₺</span>
                            )}
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-[#12985a] text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-[#0e7a48] active:scale-95 transition-all flex-1 shadow-md hover:shadow-lg flex justify-center items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            SEPETE EKLE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
