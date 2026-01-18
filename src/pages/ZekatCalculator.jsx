import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// --- CONSTANTS ---

// Categories Definition
const CATEGORIES = [
    {
        id: 'TRY_CASH',
        label: 'Türk Lirası',
        description: 'Asli ihtiyaçlarınız ve gelecek bir yıl içerisinde vadesi dolacak borçlarınız dışında kenarda nakit olarak bulunan Türk Lirası cinsinden paralarınızı giriniz.',
        inputLabel: 'Tutar (TL)',
        unit: 'TL'
    },
    {
        id: 'FX_CASH',
        label: 'Döviz',
        description: 'Asli ihtiyaçlarınız ve gelecek bir yıl içerisinde vadesi dolacak borçlarınız dışında kenarda nakit olarak bulunan döviz cinsinden paralarınızı giriniz. Her döviz türünü ayrı ayrı girerek sepete eklemeniz gerekmektedir.',
        inputLabel: 'Tutar',
        hasCurrencySelect: true
    },
    {
        id: 'GOLD',
        label: 'Altın',
        description: 'Asli ihtiyaçlarınız ve gelecek bir yıl içerisinde vadesi dolacak borçlarınız dışında kenarda bulunan altınlarınızı türlerine göre ayrı ayrı girerek sepete ekleyiniz.',
        inputLabel: 'Miktar / Adet',
        hasGoldSelect: true
    },
    {
        id: 'SILVER',
        label: 'Gümüş',
        description: 'Asli ihtiyaçlarınız ve gelecek bir yıl içerisinde vadesi dolacak borçlarınız dışında kenarda bulunan gümüşlerinizi sepete ekleyiniz.',
        inputLabel: 'Miktar (Gram)',
        unit: 'Gram'
    },
    {
        id: 'TRADE_GOODS',
        label: 'Ticari Mallar',
        description: 'Asli ihtiyaçlarınız ve gelecek bir yıl içerisinde vadesi dolacak borçlarınız dışında depolarınızda veya raflarınızda bulunan mamul veya yarı mamul ticari mallarınızı Türk lirası veya döviz cinsinden olmak üzere ayrı ayrı sepete ekleyiniz.',
        inputLabel: 'Malın Değeri',
        hasSimpleCurrencySelect: true
    },
    {
        id: 'OTHER',
        label: 'Diğer (Hisse, Çek, vb.)',
        description: 'Asli ihtiyaçlarınız ve gelecek bir yıl içerisinde vadesi dolacak borçlarınız dışında hisse senedi, çek, senet, sukuk, kira sertifikası vb. diğer mallarınızı Türk lirası veya döviz cinsinden olmak üzere ayrı ayrı sepete ekleyiniz.',
        inputLabel: 'Tutar',
        hasNameInput: true,
        hasSimpleCurrencySelect: true
    },
    {
        id: 'RECEIVABLE',
        label: 'Alacaklar',
        description: 'Bu programda sadece kuvvetli alacaklar üzerinden hesaplama yapılmaktadır. Türk lirası, döviz, altın, gümüş kategorisindeki alacaklarınızı ilgili cinsten ekleyiniz.',
        moreInfoLink: 'https://kurul.diyanet.gov.tr/Cevap-Ara/423/alacagin-zekatini-vermek-gerekir-mi',
        inputLabel: 'Alacak Tutarı',
        hasSimpleCurrencySelect: true
    },
    {
        id: 'DEBT',
        label: 'Borçlar',
        description: 'Sadece gelecek bir yıl içerisinde vadesi dolacak borçlarınızı hesaplamadan düşmek için buraya ekleyiniz.',
        inputLabel: 'Borç Tutarı',
        hasSimpleCurrencySelect: true,
        isDebt: true
    }
];

const CURRENCIES = [
    { id: 'USD', label: 'Amerikan Doları' },
    { id: 'EUR', label: 'Euro' },
    { id: 'AUD', label: 'Avustralya Doları' },
    { id: 'AZN', label: 'Azerbaycan Manatı' },
    { id: 'AED', label: 'B.A.E Dirhemi' },
    { id: 'BGN', label: 'Bulgar Levası' },
    { id: 'CNY', label: 'Çin Yuanı' },
    { id: 'GBP', label: 'İngiliz Sterlini' },
    { id: 'CHF', label: 'İsviçre Frangı' },
    { id: 'JPY', label: 'Japon Yeni' },
    { id: 'CAD', label: 'Kanada Doları' },
    { id: 'KWD', label: 'Kuveyt Dinarı' },
    { id: 'RON', label: 'Romanya Leyi' },
    { id: 'RUB', label: 'Rus Rublesi' },
    { id: 'SAR', label: 'Suudi Arabistan Riyali' }
];

const SIMPLE_CURRENCIES = [
    { id: 'TL', label: 'Türk Lirası' },
    { id: 'USD', label: 'Dolar ($)' },
    { id: 'EUR', label: 'Euro (€)' }
];

const GOLD_TYPES = [
    { id: 'yarim', label: 'Yarım Altın', gram: 3.50, purity: 0.916 },
    { id: 'teklik', label: 'Teklik Altın', gram: 7.00, purity: 0.916 },
    { id: 'tam', label: 'Tam Altın', gram: 7.00, purity: 0.916 },
    { id: 'resat', label: 'Reşat Altın', gram: 7.20, purity: 0.916 },
    { id: 'hamit', label: 'Hamit Altın', gram: 7.20, purity: 0.916 },
    { id: 'gremse', label: 'Gremse Altın', gram: 17.50, purity: 0.916 },
    { id: 'ceyrek', label: 'Çeyrek Altın', gram: 1.75, purity: 0.916 },
    { id: 'cumhuriyet', label: 'Cumhuriyet Altını', gram: 7.20, purity: 0.916 },
    { id: 'ata_besli', label: 'Ata Beşli', gram: 36.00, purity: 0.916 },
    { id: 'ata', label: 'Ata Altın', gram: 7.20, purity: 0.916 },
    { id: 'ata_2_5', label: 'Ata 2.5', gram: 18.00, purity: 0.916 },
    { id: 'gram_24', label: '24 Ayar Gram Altın', isGram: true, purity: 1.0 },
    { id: 'gram_22', label: '22 Ayar Gram Altın', isGram: true, purity: 0.916 },
    { id: 'bilezik_22', label: '22 Ayar Bilezik (Gr)', isGram: true, purity: 0.916 },
    { id: 'gram_18', label: '18 Ayar Gram Altın', isGram: true, purity: 0.750 },
    { id: 'gram_14', label: '14 Ayar Gram Altın', isGram: true, purity: 0.585 }
];

const NISAP_GOLD_GRAMS = 80.18;

// --- HELPER FUNCTIONS ---

const formatCurrency = (amount) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

const calculateItemValues = (item, rates) => {
    let buyValue = 0;
    let sellValue = 0;
    const amount = parseFloat(item.amount) || 0;

    // TL
    if (item.category === 'TRY_CASH' || item.currency === 'TL') {
        return { buyValue: amount, sellValue: amount };
    }

    // FX
    if (item.category === 'FX_CASH' || item.currency) {
        let currencyCode = item.currency || 'USD';
        // Normalize SIMPLE_CURRENCIES to match standard codes if needed
        const rate = rates[currencyCode];
        if (rate) {
            buyValue = amount * (parseFloat(rate.buy) || 0);
            sellValue = amount * (parseFloat(rate.sell) || 0);
            return { buyValue, sellValue };
        }
    }

    // Gold
    if (item.category === 'GOLD') {
        const goldInfo = GOLD_TYPES.find(g => g.id === item.goldType);
        if (goldInfo && rates.GOLD) {
            let totalPureGrams = 0;
            if (goldInfo.isGram) {
                totalPureGrams = amount * goldInfo.purity;
            } else {
                totalPureGrams = (amount * goldInfo.gram) * goldInfo.purity;
            }
            buyValue = totalPureGrams * (parseFloat(rates.GOLD.buy) || 0);
            sellValue = totalPureGrams * (parseFloat(rates.GOLD.sell) || 0);
            return { buyValue, sellValue };
        }
    }

    // Silver
    if (item.category === 'SILVER' && rates.SILVER) {
        buyValue = amount * (parseFloat(rates.SILVER.buy) || 0);
        sellValue = amount * (parseFloat(rates.SILVER.sell) || 0);
        return { buyValue, sellValue };
    }

    return { buyValue: 0, sellValue: 0 };
};

export default function ZekatCalculator() {
    const [basket, setBasket] = useState([]);
    const [activeCatId, setActiveCatId] = useState('TRY_CASH');

    // Form Inputs
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [simpleCurrency, setSimpleCurrency] = useState('TL');
    const [goldType, setGoldType] = useState('ceyrek');
    const [itemName, setItemName] = useState('');

    // Rates State
    // Format: { USD: { buy: '', sell: '' }, GOLD: { buy: '', sell: '' } }
    const [userRates, setUserRates] = useState({
        GOLD: { buy: '', sell: '' } // Always required for Nisap
    });

    // Determine needed rates based on basket
    const neededRates = useMemo(() => {
        const needed = new Set(['GOLD']); // Always need gold for Nisap
        basket.forEach(item => {
            if (item.category === 'SILVER') needed.add('SILVER');
            if (item.category === 'FX_CASH') needed.add(item.currency);
            if (item.currency && item.currency !== 'TL') needed.add(item.currency); // For Trade/Other/Debt
        });
        return Array.from(needed);
    }, [basket]);

    const [results, setResults] = useState(null);

    // --- CALCULATION ---
    const handleCalculate = () => {
        // Validate Rates
        const missingRates = neededRates.some(key => {
            const rate = userRates[key];
            return !rate || !rate.buy || !rate.sell;
        });

        if (missingRates) {
            alert("Lütfen listenizdeki tüm varlıklar için 'Alış' ve 'Satış' kur bilgilerini giriniz.");
            return;
        }

        // 1. Calculate Nisap Threshold
        const gold24Buy = parseFloat(userRates.GOLD.buy);
        const nisapThreshold = NISAP_GOLD_GRAMS * gold24Buy;

        let totalAssetsBuy = 0;
        let totalDebtsBuy = 0;
        let totalAssetsSell = 0;
        let totalDebtsSell = 0;

        basket.forEach(item => {
            const { buyValue, sellValue } = calculateItemValues(item, userRates);
            const isDebt = CATEGORIES.find(c => c.id === item.category)?.isDebt;

            if (isDebt) {
                totalDebtsBuy += buyValue;
                totalDebtsSell += sellValue;
            } else {
                totalAssetsBuy += buyValue;
                totalAssetsSell += sellValue;
            }
        });

        const netBuy = totalAssetsBuy - totalDebtsBuy;
        const isEligible = netBuy >= nisapThreshold;
        const netSell = totalAssetsSell - totalDebtsSell;
        const zekatDue = isEligible && netSell > 0 ? netSell * 0.025 : 0;

        setResults({
            nisapAmount: nisapThreshold,
            netAssetBuy: netBuy,
            netAssetSell: netSell,
            isEligible,
            zekatDue: Math.max(0, zekatDue)
        });

        // Auto-scroll to results on mobile
        if (window.innerWidth < 1024) {
            setTimeout(() => {
                document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    // --- EFFECT: Sync needed rates with state ---
    // Ensure all needed keys exist in userRates so inputs are controlled
    useEffect(() => {
        setUserRates(prev => {
            const next = { ...prev };
            neededRates.forEach(key => {
                if (!next[key]) next[key] = { buy: '', sell: '' };
            });
            return next;
        });
    }, [neededRates]);


    // --- HANDLERS ---
    const handleAddItem = (e) => {
        e.preventDefault();
        // Parse Turkish format: remove dots, replace comma with dot
        const cleanAmount = amount.replace(/\./g, '').replace(',', '.');
        const parsedAmount = parseFloat(cleanAmount);

        if (!cleanAmount || parsedAmount <= 0) return;

        const category = CATEGORIES.find(c => c.id === activeCatId);

        const newItem = {
            id: Date.now(),
            category: activeCatId,
            amount: parsedAmount,
            description: itemName
        };

        if (category.hasCurrencySelect) newItem.currency = currency;
        if (category.hasGoldSelect) newItem.goldType = goldType;
        if (category.hasSimpleCurrencySelect) newItem.currency = simpleCurrency;

        setBasket([...basket, newItem]);
        setAmount('');
        setItemName('');
        setResults(null); // Reset results when basket changes, need recalculation
    };

    const handleRemoveItem = (id) => {
        setBasket(basket.filter(item => item.id !== id));
        setResults(null);
    };

    const activeCategory = CATEGORIES.find(c => c.id === activeCatId);

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12 md:pt-32 md:pb-20">
            <div className="max-w-6xl mx-auto px-4">

                <div className="text-center mb-8 md:mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#12985a]/10 text-[#12985a] font-bold text-xs md:text-sm mb-4">
                        ZEKAT HESAPLAMA ARACI
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-[#103e6a] mb-4">
                        Adım Adım Zekat Hesabı
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                        1. Varlıklarınızı sepete ekleyin.<br />
                        2. Güncel kur bilgilerini girin.<br />
                        3. Sonucu hesaplayın.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Form & List */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Add Item */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Categories Sidebar / Mobile Dropdown */}
                                <div className="w-full md:w-1/4 shrink-0">
                                    {/* Mobile: Dropdown */}
                                    <div className="md:hidden mb-4">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Varlık Türü Seçiniz</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 font-bold focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none appearance-none"
                                            value={activeCatId}
                                            onChange={(e) => { setActiveCatId(e.target.value); setAmount(''); }}
                                            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23103e6a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto', paddingRight: '2.5em' }}
                                        >
                                            {CATEGORIES.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Desktop: Vertical Buttons */}
                                    <div className="hidden md:flex flex-col gap-2">
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat.id}
                                                onClick={() => { setActiveCatId(cat.id); setAmount(''); }}
                                                className={`px-4 py-3 text-sm font-bold rounded-xl text-left transition-all flex items-center justify-between group ${activeCatId === cat.id
                                                    ? 'bg-[#103e6a] text-white shadow-lg'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <span>{cat.label}</span>
                                                {activeCatId === cat.id && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Form Area */}
                                <div className="flex-1">
                                    <form onSubmit={handleAddItem} className="space-y-6">
                                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                                            <p>{activeCategory.description}</p>
                                            {activeCategory.moreInfoLink && (
                                                <a href={activeCategory.moreInfoLink} target="_blank" rel="noopener noreferrer" className="text-[#103e6a] font-bold underline mt-2 block hover:text-[#12985a]">
                                                    Detaylı Bilgi
                                                </a>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {activeCategory.hasGoldSelect && (
                                                <div className="space-y-1 md:col-span-2">
                                                    <label className="text-sm font-medium text-gray-700">Altın Türü</label>
                                                    <select
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none bg-white"
                                                        value={goldType}
                                                        onChange={(e) => setGoldType(e.target.value)}
                                                    >
                                                        {GOLD_TYPES.map(t => (
                                                            <option key={t.id} value={t.id}>{t.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            {activeCategory.hasCurrencySelect && (
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Para Birimi</label>
                                                    <select
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none bg-white"
                                                        value={currency}
                                                        onChange={(e) => setCurrency(e.target.value)}
                                                    >
                                                        {CURRENCIES.map(c => (
                                                            <option key={c.id} value={c.id}>{c.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            {activeCategory.hasSimpleCurrencySelect && (
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">Para Birimi</label>
                                                    <select
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none bg-white"
                                                        value={simpleCurrency}
                                                        onChange={(e) => setSimpleCurrency(e.target.value)}
                                                    >
                                                        {SIMPLE_CURRENCIES.map(c => (
                                                            <option key={c.id} value={c.id}>{c.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            {activeCategory.hasNameInput && (
                                                <div className="space-y-1 md:col-span-2">
                                                    <label className="text-sm font-medium text-gray-700">Malın Adı</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Örn: Hisse Senedi..."
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none"
                                                        value={itemName}
                                                        onChange={(e) => setItemName(e.target.value)}
                                                    />
                                                </div>
                                            )}

                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-sm font-medium text-gray-700">
                                                    {activeCategory.inputLabel}
                                                </label>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="0,00"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none text-base md:text-sm"
                                                    value={amount}
                                                    onChange={(e) => {
                                                        // Remove non-digit and non-comma characters
                                                        let raw = e.target.value.replace(/[^0-9,]/g, '');

                                                        // Handle multiple commas - keep only first
                                                        const parts = raw.split(',');
                                                        if (parts.length > 2) {
                                                            raw = parts[0] + ',' + parts.slice(1).join('');
                                                        }

                                                        // Format integer part with dots
                                                        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                                                        // Reconstruct
                                                        let formatted = integerPart;
                                                        if (parts.length > 1) {
                                                            formatted += ',' + parts[1].substring(0, 2); // Limit decimal to 2 chars
                                                        }

                                                        setAmount(formatted);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-[#103e6a] text-white rounded-xl font-bold hover:bg-[#0d3257] transition-all"
                                        >
                                            Sepete Ekle
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* 2. Basket & Rates */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-[#103e6a] text-white rounded-full flex items-center justify-center text-sm">2</span>
                                Varlık Sepeti & Kurlar
                            </h2>

                            {/* Basket List */}
                            <div className="mb-8 space-y-3">
                                {basket.length === 0 ? (
                                    <p className="text-center text-gray-400 py-4">Sepet boş.</p>
                                ) : (
                                    basket.map(item => {
                                        const cat = CATEGORIES.find(c => c.id === item.category);
                                        return (
                                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 text-sm gap-2">
                                                <div className="flex-1">
                                                    <span className="font-bold text-gray-800 block sm:inline">{cat.label}</span>
                                                    <span className="text-gray-500 sm:ml-2 block sm:inline">
                                                        {new Intl.NumberFormat('tr-TR').format(item.amount)} {cat.unit || ''}
                                                        {item.currency && ` (${item.currency})`}
                                                        {item.goldType && ` - ${GOLD_TYPES.find(g => g.id === item.goldType)?.label}`}
                                                        {item.description && ` (${item.description})`}
                                                    </span>
                                                </div>
                                                <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 font-medium self-end sm:self-auto px-2 py-1 bg-white border border-red-100 rounded shadow-sm">Sil</button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Rates Input Section */}
                            <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-200">
                                <h3 className="font-bold text-[#103e6a] mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                    </svg>
                                    Güncel Kur Bilgileri
                                </h3>
                                <p className="text-xs text-gray-500 mb-4">
                                    Nisap hesaplaması için <strong>Alış</strong>, zekat hesaplaması için <strong>Satış</strong> fiyatlarını giriniz.
                                    <br />Altın için <strong>24 Ayar (Has Altın) Gram</strong> fiyatını giriniz.
                                </p>

                                <div className="grid gap-3">
                                    {neededRates.map(key => {
                                        let label = key;
                                        if (key === 'GOLD') label = '24 Ayar Has Altın (Gram)';
                                        else if (key === 'SILVER') label = 'Gümüş (Gram)';
                                        else label = `${key} (Döviz)`;

                                        return (
                                            <div key={key} className="flex flex-col md:flex-row md:items-center gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                                <span className="font-semibold text-gray-700 text-sm md:w-1/3 break-words">{label}</span>
                                                <div className="grid grid-cols-2 gap-2 w-full md:w-2/3">
                                                    <div className="relative">
                                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold pointer-events-none">ALIŞ</span>
                                                        <input
                                                            type="number"
                                                            className="w-full pl-10 pr-2 py-3 border rounded-lg text-base focus:border-[#103e6a] outline-none bg-gray-50/50"
                                                            value={userRates[key]?.buy || ''}
                                                            onChange={(e) => setUserRates(prev => ({
                                                                ...prev,
                                                                [key]: { ...prev[key], buy: e.target.value }
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold pointer-events-none">SATIŞ</span>
                                                        <input
                                                            type="number"
                                                            className="w-full pl-10 pr-2 py-3 border rounded-lg text-base focus:border-[#103e6a] outline-none bg-gray-50/50"
                                                            value={userRates[key]?.sell || ''}
                                                            onChange={(e) => setUserRates(prev => ({
                                                                ...prev,
                                                                [key]: { ...prev[key], sell: e.target.value }
                                                            }))}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={handleCalculate}
                                    className="mt-6 w-full py-3 bg-[#12985a] text-white rounded-xl font-bold hover:bg-[#0f8750] transition-colors shadow-lg active:scale-95 transform duration-100"
                                >
                                    HESAPLA
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Results */}
                    <div className="lg:col-span-1" id="results-section">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Sonuç</h2>

                            {!results ? (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    Varlıkları ekleyip, kurları girdikten sonra "Hesapla" butonuna basınız.
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Nisap Info */}
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-2">
                                        <div className="flex justify-between text-sm text-blue-800">
                                            <span>Nisap (80.18gr Altın)</span>
                                            <span className="font-bold">{formatCurrency(results.nisapAmount)}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 space-y-3">
                                        <div className="flex justify-between text-gray-600 text-sm">
                                            <span>Net Varlık (Alış)</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(results.netAssetBuy)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-sm">
                                            <span>Net Varlık (Satış)</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(results.netAssetSell)}</span>
                                        </div>

                                        <div className={`p-3 rounded-lg text-center font-bold text-sm ${results.isEligible ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {results.isEligible
                                                ? '✅ Zekat Yükümlüsüsünüz'
                                                : '⚠️ Nisap Altındasınız'}
                                        </div>
                                    </div>

                                    {results.isEligible && (
                                        <div className="bg-[#12985a] text-white p-6 rounded-2xl text-center shadow-lg shadow-green-900/10 animate-fade-in-up">
                                            <p className="text-green-100 text-sm mb-1 uppercase tracking-wider font-medium">Ödenecek Zekat</p>
                                            <div className="text-4xl font-bold mb-2">
                                                {formatCurrency(results.zekatDue)}
                                            </div>
                                            <p className="text-xs text-green-100/80 mb-6">
                                                (Net Varlık Satış Değeri'nin %2.5'i)
                                            </p>

                                            <Link
                                                to="/bagislar"
                                                className="block w-full py-3 bg-white text-[#12985a] rounded-xl font-bold hover:bg-green-50 transition-colors"
                                            >
                                                Zekat Ver
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
