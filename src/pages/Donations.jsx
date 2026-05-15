import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getCategories, getDonations } from '../services/api';
import { useToast } from '../context/ToastContext';
import KurbanShareModal from '../components/KurbanShareModal';
import { getCategoryIcon, normalizeCategoryName } from '../utils/donationCategories';

// Placeholder image if backend sends none
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop';

const getPriceValue = (value) => {
    const parsed = parseFloat(value || 0);
    return Number.isFinite(parsed) ? parsed : 0;
};

const getSortedDonationTypes = (item) => (
    item.donation_types
        ? [...item.donation_types].sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price))
        : []
);

const resolveMatchingVariant = (item, selectedCountry, selectedType) => {
    const variants = item.price_variants || [];
    const donationTypeId = selectedType?.id || null;

    if (donationTypeId && selectedCountry) {
        const exactVariant = variants.find((variant) =>
            variant.donation_type_id === donationTypeId && variant.country === selectedCountry
        );
        if (exactVariant) return exactVariant;
    }

    if (donationTypeId) {
        const typeVariant = variants.find((variant) =>
            variant.donation_type_id === donationTypeId && !variant.country
        );
        if (typeVariant) return typeVariant;
    }

    if (selectedCountry) {
        const countryVariant = variants.find((variant) =>
            variant.country === selectedCountry && !variant.donation_type_id
        );
        if (countryVariant) return countryVariant;
    }

    if (donationTypeId) {
        const fallbackTypeVariant = variants.find((variant) => variant.donation_type_id === donationTypeId);
        if (fallbackTypeVariant) return fallbackTypeVariant;
    }

    if (selectedCountry) {
        const fallbackCountryVariant = variants.find((variant) => variant.country === selectedCountry);
        if (fallbackCountryVariant) return fallbackCountryVariant;
    }

    return variants[0] || null;
};

const getDefaultSelections = (item) => {
    const sortedTypes = getSortedDonationTypes(item);
    const variants = [...(item.price_variants || [])]
        .sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));

    const preferredVariant = variants.find((variant) => variant.donation_type_id && variant.country) || variants[0] || null;

    const defaultType = preferredVariant?.donation_type_id
        ? sortedTypes.find((type) => type.id === preferredVariant.donation_type_id) || null
        : (sortedTypes[0] || null);

    const defaultCountry = preferredVariant?.country
        || item.available_countries?.[0]
        || null;

    return {
        defaultCountry,
        defaultType
    };
};

const getCategoryLayoutClass = (index, total) => {
    const classes = ['col-span-1'];

    if (total % 2 === 1 && index === total - 1) {
        classes.push('col-span-2');
    }

    if (total > 4) {
        const remainder = total % 4;

        if (remainder === 1 && index === total - 1) {
            classes.push('lg:col-span-2', 'lg:col-start-4');
        } else if (remainder === 2) {
            if (index === total - 2) classes.push('lg:col-span-2', 'lg:col-start-3');
            if (index === total - 1) classes.push('lg:col-span-2', 'lg:col-start-5');
        } else if (remainder === 3) {
            if (index === total - 3) classes.push('lg:col-span-2', 'lg:col-start-2');
            if (index === total - 2) classes.push('lg:col-span-2', 'lg:col-start-4');
            if (index === total - 1) classes.push('lg:col-span-2', 'lg:col-start-6');
        } else {
            classes.push('lg:col-span-2');
        }
    } else {
        classes.push('lg:col-span-2');
    }

    return classes.join(' ');
};

export default function Donations() {
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleTabChange = (category) => {
        setActiveTab(category.id);

        const params = new URLSearchParams(location.search);
        params.delete('category');
        params.set('kategori', category.title);

        navigate({
            pathname: location.pathname,
            search: `?${params.toString()}`
        }, { replace: true });
    };

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
                        price: parseFloat(d.fixed_price || d.min_price || (d.is_shareable && d.price_variants?.length > 0 ? d.price_variants[0].price : 0) || 0),
                        min_price: parseFloat(d.min_price || 0),
                        is_fixed: d.price_type === 'fixed',
                        is_shareable: d.is_shareable || false,
                        max_shares: d.max_shares || 0,
                        image: d.image || PLACEHOLDER_IMAGE,
                        available_countries: d.available_countries || [],
                        donation_types: d.donation_types || [],
                        price_variants: d.price_variants || [], // Backend'den gelen yeni alan
                        currency: d.currency,
                        original_data: d
                    }));

                    return {
                        id: cat.id,
                        title: cat.name.toLocaleUpperCase('tr-TR'),
                        icon: getCategoryIcon(cat.name),
                        items: catItems
                    };
                }).filter(cat => cat.items.length > 0); // İçi boş kategorileri gösterme

                setCategories(processedCategories);
                if (processedCategories.length > 0) {
                    const params = new URLSearchParams(location.search);
                    // ID parametresini kontrol et (Header menüden gelmişse)
                    const categoryId = params.get('category');
                    // İsim parametresini kontrol et (projektler menüsünden gelmişse)
                    const kategori = params.get('kategori');

                    let match = null;
                    if (categoryId) {
                        match = processedCategories.find(cat => cat.id === parseInt(categoryId));
                    } else if (kategori) {
                        const normalizedKategori = normalizeCategoryName(kategori);

                        // Önce tam eşleşme dene; bulunamazsa eski esnek eşleşmeye düş.
                        match = processedCategories.find(cat =>
                            normalizeCategoryName(cat.title) === normalizedKategori
                        ) || processedCategories.find(cat => {
                            const normalizedTitle = normalizeCategoryName(cat.title);
                            return normalizedTitle.includes(normalizedKategori) || normalizedKategori.includes(normalizedTitle);
                        });
                    }
                    setActiveTab(match ? match.id : processedCategories[0].id);
                }

            } catch (err) {
                console.error("Veri yükleme hatası:", err);
                setError("Bağışlar yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.search]);

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
                    İyiliği Paylaşın;<br />
                    Bağış Videonuzla<br />
                    Şeffaflığa Şahitlik Edin! 📲
                </h1>

                <div className="flex flex-col gap-8">
                    <div className="w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
                        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-8">
                            {categories.map((cat, index) => (
                                <div key={cat.id} className={getCategoryLayoutClass(index, categories.length)}>
                                    <button
                                        onClick={() => handleTabChange(cat)}
                                        className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-center text-xs font-bold transition-all duration-200 sm:min-h-12 sm:px-4 sm:text-sm ${activeTab === cat.id
                                            ? 'border-[#103e6a]/25 bg-[#103e6a]/8 text-[#103e6a] shadow-sm'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-[#12985a]/50 hover:text-[#12985a]'}`}
                                    >
                                        <span className="text-base leading-none sm:text-lg">{cat.icon}</span>
                                        <span className="line-clamp-1">{cat.title}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
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
    const defaultSelections = getDefaultSelections(item);

    // States
    const [selectedCountry, setSelectedCountry] = useState(defaultSelections.defaultCountry);
    const [selectedType, setSelectedType] = useState(defaultSelections.defaultType);

    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [kurbanModalOpen, setKurbanModalOpen] = useState(false);
    const { addToCart } = useCart();
    const showToast = useToast();

    // Determine Logic Type
    const hasVariants = item.donation_types && item.donation_types.length > 0;
    const isFixed = item.is_fixed;



    // Logic Calculation with Price Variants Lookup
    let currentPrice = 0;

    const activeVariant = resolveMatchingVariant(item, selectedCountry, selectedType);

    if (hasVariants && selectedType) {
        if (activeVariant) {
            currentPrice = parseFloat(activeVariant.price);
        } else {
            // Hiçbiri yoksa DonationType'ın kendi fiyatı
            currentPrice = parseFloat(selectedType.price || 0);
        }

        // Fallback: Eğer hala 0 ise ve bağışın ana fiyatı varsa onu kullan
        if (currentPrice === 0 && item.price > 0) {
            currentPrice = item.price;
        }

    } else if (isFixed) {
        currentPrice = activeVariant ? parseFloat(activeVariant.price) : parseFloat(item.price || 0);
    } else {
        // Flexible
        currentPrice = amount ? parseFloat(amount) : 0;
    }

    const donationType = selectedType?.name
        || activeVariant?.donation_type
        || (item.is_fixed ? 'Genel Bağış' : `${item.category_name} ${item.name}`);

    const buildCartItem = (price, shareCount, participants, finalSelectedCountry) => {
        const submissionData = {
            donation: item.id,
            amount: price,
            currency: (item.currency && typeof item.currency === 'object') ? item.currency.id : item.currency,
            selected_country: finalSelectedCountry,
            donation_type: donationType,
            form_data: {
                selected_country: finalSelectedCountry,
                donation_type: donationType,
            }
        };
        if (shareCount) {
            submissionData.requested_shares = shareCount;
            submissionData.form_data.requested_shares = shareCount;
            submissionData.form_data.participants = participants || [];
        }
        return {
            id: item.id,
            name: item.name,
            image: item.image,
            price: price,
            selectedOption: selectedType ? selectedType.name : (finalSelectedCountry || null),
            selected_country: finalSelectedCountry || null,
            donation_type: donationType,
            _submissionData: submissionData,
            quantity: hasVariants ? 1 : quantity,
            currency: item.currency,
            type: 'donation',
            slug: item.slug
        };
    };

    const handleAddToCart = () => {
        // Kurban hisse bağışı — modalı aç (tek hisseli dahil)
        if (item.is_shareable) {
            setKurbanModalOpen(true);
            return;
        }

        // Validation
        if (!isFixed && !hasVariants) {
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
        let finalSelectedCountry = selectedCountry || activeVariant?.country || null;
        if (!finalSelectedCountry && item.available_countries && item.available_countries.length > 0) {
            finalSelectedCountry = item.available_countries[0];
        }

        addToCart(buildCartItem(currentPrice, null, null, finalSelectedCountry));
    };

    const handleKurbanConfirm = ({ requested_shares, amount: totalAmount, participants }) => {
        let finalSelectedCountry = selectedCountry || activeVariant?.country || null;
        if (!finalSelectedCountry && item.available_countries && item.available_countries.length > 0) {
            finalSelectedCountry = item.available_countries[0];
        }

        addToCart(buildCartItem(totalAmount, requested_shares, participants, finalSelectedCountry));
        setKurbanModalOpen(false);
        const msg = requested_shares > 1
            ? `${requested_shares} hisse kurban bağışı sepete eklendi.`
            : 'Kurban bağışı sepete eklendi.';
        showToast(msg, 'success');
    };

    return (
        <>
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

        {item.is_shareable && (
            <KurbanShareModal
                donation={item}
                selectedCountry={selectedCountry}
                perSharePrice={currentPrice}
                isOpen={kurbanModalOpen}
                onClose={() => setKurbanModalOpen(false)}
                onConfirm={handleKurbanConfirm}
            />
        )}
        </>
    );
}
