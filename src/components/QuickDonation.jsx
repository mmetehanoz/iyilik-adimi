import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getQuickDonationSettings } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function QuickDonation() {
    const [amount, setAmount] = useState('');
    const [selectedDonation, setSelectedDonation] = useState('');
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAmountDisabled, setIsAmountDisabled] = useState(false);
    const [placeholder, setPlaceholder] = useState('');

    const { addToCart } = useCart();
    const showToast = useToast();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getQuickDonationSettings();
                console.log("🔍 QuickDonation API Response:", response); // DEBUG

                let settingsData = response;
                if (response && response.data && !response.is_active) {
                    settingsData = response.data;
                } else if (Array.isArray(response)) {
                    settingsData = response[0];
                }

                if (settingsData && settingsData.is_active) {
                    setSettings(settingsData);
                    // Varsayılan seçim
                    if (settingsData.default_donation) {
                        const defVal = typeof settingsData.default_donation === 'object'
                            ? settingsData.default_donation.id
                            : settingsData.default_donation;
                        console.log("Setting default selection:", defVal);
                        setSelectedDonation(String(defVal));
                    } else if (settingsData.available_donations && settingsData.available_donations.length > 0) {
                        setSelectedDonation(String(settingsData.available_donations[0].id));
                    }
                } else {
                    console.warn("Settings not active or empty:", settingsData);
                    throw new Error("Settings not active or empty");
                }
            } catch (error) {
                console.warn('Hızlı bağış ayarları yüklenemedi, varsayılanlar kullanılıyor:', error);
                // Fallback / Varsayılan Ayarlar
                const fallbackSettings = {
                    is_active: true,
                    min_amount: 10,
                    max_amount: 100000,
                    available_donations: [
                        { id: 'genel', title: 'Genel Bağış', price_type: 'flexible', min_price: 10, currency: { code: 'TRY' } },
                        { id: 'kurban', title: 'Kurban Bağışı', price_type: 'flexible', min_price: 5000, currency: { code: 'TRY' } },
                    ]
                };
                setSettings(fallbackSettings);
                setSelectedDonation('genel');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // Seçilen bağış değiştiğinde fiyat inputunu ayarla
    useEffect(() => {
        if (!settings || !selectedDonation) return;

        const donation = settings.available_donations.find(d => String(d.id) === String(selectedDonation));
        if (donation) {
            // Price Logic
            // Fiyat Hesaplama Mantığı
            let targetAmount = 0;
            let isFixed = false;
            let placeholderText = '';

            // 1. Varyant varsa ve fiyatları geçerliyse en düşük fiyatlı varyantı bul
            if (donation.donation_types && donation.donation_types.length > 0) {
                const validVariants = donation.donation_types.filter(v => v.price && parseFloat(v.price) > 0);
                if (validVariants.length > 0) {
                    const sortedVariants = validVariants.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                    targetAmount = parseFloat(sortedVariants[0].price);
                    isFixed = true;
                }
            }

            // Eğer yukarıdan fiyat gelmediyse (varyant yok veya fiyatları 0)
            if (targetAmount === 0) {
                // 2. Flexible
                if (donation.price_type !== 'fixed') {
                    targetAmount = parseFloat(donation.min_price) || settings.min_amount || 10;
                    isFixed = false;
                }
                // 3. Fixed
                else {
                    targetAmount = parseFloat(donation.fixed_price);
                    isFixed = true;
                }
            }

            // Eğer targetAmount 0 veya geçersizse düzelt
            if (!targetAmount || isNaN(targetAmount)) targetAmount = 0;

            const formatted = new Intl.NumberFormat('tr-TR').format(targetAmount);

            if (isFixed) {
                setAmount(`${formatted} ₺`);
                setIsAmountDisabled(true);
                setPlaceholder(`${formatted} ₺`);
            } else {
                setAmount(`${formatted} ₺`);
                setIsAmountDisabled(false);
                setPlaceholder(`Min: ${formatted} ₺`);
            }
        }
    }, [selectedDonation, settings]);

    const handleAmountChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            const formatted = new Intl.NumberFormat('tr-TR').format(value);
            setAmount(`${formatted} ₺`);
        } else {
            setAmount('');
        }
    };

    const handleDonate = async () => {
        const rawAmount = parseInt(amount.replace(/[^0-9]/g, ''));

        if (!rawAmount || rawAmount <= 0) {
            showToast('Lütfen geçerli bir bağış tutarı giriniz.', 'error');
            return;
        }

        if (!selectedDonation) {
            showToast('Lütfen bir bağış türü seçiniz.', 'error');
            return;
        }

        const donation = settings.available_donations.find(d => String(d.id) === String(selectedDonation));

        // Validation
        if (donation) {
            // Min price check for flexible donations
            if (donation.price_type !== 'fixed') {
                let effectiveMinPrice = parseFloat(donation.min_price) || settings.min_amount || 10;

                // Varyant varsa, en düşük varyant fiyatını min price olarak kabul et
                if (donation.donation_types && donation.donation_types.length > 0) {
                    const variantPrices = donation.donation_types
                        .map(v => parseFloat(v.price))
                        .filter(p => !isNaN(p) && p > 0);

                    if (variantPrices.length > 0) {
                        const minVariantPrice = Math.min(...variantPrices);
                        // Eğer varyant fiyatı ana min_price'dan küçükse veya min_price yoksa, varyantı kullan
                        if (minVariantPrice < effectiveMinPrice || !donation.min_price) {
                            effectiveMinPrice = minVariantPrice;
                        }
                    }
                }

                if (rawAmount < effectiveMinPrice) {
                    showToast(`Bu bağış için minimum tutar ${effectiveMinPrice} ₺'dir.`, 'error');
                    return;
                }
            }

            // Global limits check
            if (settings) {
                const max = parseFloat(settings.max_amount) || 100000;
                if (rawAmount > max) {
                    showToast(`Maximum bağış tutarı ${max} ₺'dir.`, 'error');
                    return;
                }
            }
        }

        // Fallback donation logic if not found
        let targetDonation = donation;
        if (!targetDonation) {
            if (selectedDonation === 'genel') targetDonation = { id: 'genel', title: 'Genel Bağış', type: 'donation' };
            else if (selectedDonation === 'kurban') targetDonation = { id: 'kurban', title: 'Kurban Bağışı', type: 'donation' };
        }

        if (!targetDonation) {
            alert('Hata: Bağış bulunamadı.');
            return;
        }

        // Fiyat ve Varyant Eşleştirme Mantığı
        let selectedVariant = null;
        let submissionCountry = "";
        let submissionType = targetDonation.title; // Fallback

        if (targetDonation.donation_types && targetDonation.donation_types.length > 0) {
            // Price'a uyan varyantları bul
            const matchingVariants = targetDonation.donation_types.filter(v => parseFloat(v.price) === rawAmount);

            if (matchingVariants.length > 0) {
                // Eşleşen varsa ilkini kullan (genellikle en mantıklısı veya sıralamada ilk geleni)
                selectedVariant = matchingVariants[0];

                // Eğer varyantın description'ı ülke içeriyorsa veya adında ülke varsa ayrıştırılabilir
                // Ancak API'den gelen donation_types genellikle sadece {id, name, price, description} dönüyor
                // Backend'den gelen price_variants verisi varsa daha net olurdu.
                // Şimdilik donation_types içindeki name'i type olarak kullanalım.
                submissionType = selectedVariant.name;

                // Eğer QuickDonation component'inde varyantın ülke bilgisini tutan bir yapı yoksa (ki şu an yok gibi)
                // Backend 'price_variants' (Country + Type + Price) verisini frontend'e 'donation_types' içinde mi gönderiyor?
                // serializers.py'da DonationListSerializer -> get_donation_types varyant fiyatını override ediyor ama ülke bilgisini eklemiyor.
                // DonationListSerializer -> get_price_variants ise FULL varyant listesi dönüyor.

                // Burada `donation.price_variants`'a erişmemiz lazım.
                if (targetDonation.price_variants && targetDonation.price_variants.length > 0) {
                    const exactVariant = targetDonation.price_variants.find(v => parseFloat(v.price) === rawAmount);
                    if (exactVariant) {
                        submissionCountry = exactVariant.country || "";
                        // donation_type_id varsa onu bulup adını alabiliriz ama şimdilik name'i variant'tan almak zor olabilir
                        // serializer da country name dönüyor string olarak.
                    }
                }
            }
        }

        const item = {
            id: targetDonation.id,
            name: targetDonation.title,
            price: rawAmount,
            quantity: 1,
            selectedOption: submissionCountry || submissionType, // Sepette görünen özet bilgi
            image: targetDonation.image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=200&auto=format&fit=crop',
            currency: targetDonation.currency || { code: 'TRY' },
            type: 'donation',
            donation_type: submissionType,
            slug: targetDonation.slug || '',
            _submissionData: {
                donation: targetDonation.id,
                amount: rawAmount,
                currency: (targetDonation.currency && targetDonation.currency.id) ? targetDonation.currency.id : 1,
                selected_country: submissionCountry, // Bulunan ülke veya boş string (backend validate_selected_country '' kabul ediyor)
                donation_type: submissionType,
                form_data: { // Form data'yı da doldur
                    selected_country: submissionCountry,
                    donation_type: submissionType
                }
            }
        };

        await addToCart(item);
        if (!isAmountDisabled) {
            setAmount('');
        }
    };

    if (loading) {
        return (
            <div className="md:absolute md:-bottom-10 md:left-0 md:right-0 md:z-20 w-full">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="rounded-2xl bg-black/70 text-white backdrop-blur p-6 border-2 border-[#12985a]">
                        <div className="flex justify-center">
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Settings varsa göster
    if (!settings || !settings.is_active) {
        return null;
    }

    return (
        <div className="md:absolute md:-bottom-10 md:left-0 md:right-0 md:z-20 w-full">
            <div className="mx-auto max-w-7xl px-4">

                {/* Desktop layout */}
                <div className="hidden md:grid md:grid-cols-3 gap-4 rounded-2xl bg-black/70 text-white backdrop-blur p-6 border-2 border-[#12985a] shadow-[0_0_30px_rgba(18,152,90,0.3)]">
                    <div>
                        <label className="text-xs uppercase tracking-wide text-white/70">BAĞIŞ TÜRÜ</label>
                        <select
                            value={selectedDonation}
                            onChange={(e) => setSelectedDonation(e.target.value)}
                            className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#12985a] [&>option]:text-black"
                        >
                            {settings.available_donations && settings.available_donations.map((donation) => (
                                <option key={donation.id} value={donation.id}>
                                    {donation.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-wide text-white/70">BAĞIŞ TUTARI</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            disabled={isAmountDisabled}
                            className={`mt-2 w-full rounded-md bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#12985a] placeholder-white/50 ${isAmountDisabled ? 'opacity-70 cursor-not-allowed bg-white/5' : ''}`}
                            placeholder={placeholder}
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleDonate}
                            className="w-full rounded-full bg-[#103e6a] py-3 font-semibold text-white transition-all duration-300 animate-heartbeat hover:opacity-90 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,62,106,0.5)] active:scale-95"
                        >
                            BAĞIŞ YAP
                        </button>
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden relative -mt-5 px-4 pb-4">
                    <div className="rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
                        {/* Başlık */}
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#12985a]/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#12985a]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Hızlı Bağış</span>
                        </div>

                        {/* Form */}
                        <div className="px-4 pt-3 pb-4">
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <div>
                                    <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Bağış Türü</label>
                                    <select
                                        value={selectedDonation}
                                        onChange={(e) => setSelectedDonation(e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#12985a] focus:border-transparent"
                                    >
                                        {settings.available_donations && settings.available_donations.map((donation) => (
                                            <option key={donation.id} value={donation.id}>
                                                {donation.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Tutar</label>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        disabled={isAmountDisabled}
                                        className={`mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#12985a] focus:border-transparent placeholder-gray-400 ${isAmountDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                                        placeholder={placeholder}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleDonate}
                                className="w-full rounded-full bg-[#103e6a] py-2.5 text-sm font-bold text-white transition-all duration-300 animate-heartbeat active:scale-95"
                            >
                                BAĞIŞ YAP
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
