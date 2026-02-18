import React, { useState, useEffect, useMemo } from 'react';
import { getCinAliItems, addCinAliToCart } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

// Afrika çocuk görselleri
import afrikaEmpty from '../assets/cin_ali/afrika/achild-00.webp';
import afrikaEnvelope from '../assets/cin_ali/afrika/achild-envelope.webp';
import afrikaClothes from '../assets/cin_ali/afrika/achild-clothes.webp';
import afrikaFood from '../assets/cin_ali/afrika/achild-food.webp';
import afrikaStationery from '../assets/cin_ali/afrika/achild-astationery.webp';
import afrikaEnvelopeClothes from '../assets/cin_ali/afrika/achild-envelope-clothes.webp';
import afrikaEnvelopeFood from '../assets/cin_ali/afrika/achild-food-envelope.webp';
import afrikaEnvelopeStationery from '../assets/cin_ali/afrika/achild-envelope-astationery.webp';
import afrikaClothesFood from '../assets/cin_ali/afrika/achild-clothes-food.webp';
import afrikaStationeryClothes from '../assets/cin_ali/afrika/achild-astationery-clothes.webp';
import afrikaStationeryFood from '../assets/cin_ali/afrika/achild-astationery-food.webp';
import afrikaEnvelopeClothesFood from '../assets/cin_ali/afrika/achild-envelope-clothes-food.webp';
import afrikaEnvelopeStationeryClothes from '../assets/cin_ali/afrika/achild-envelope-astationery-clothes.webp';
import afrikaEnvelopeStationeryFood from '../assets/cin_ali/afrika/achild-envelope-food-astationery.webp';
import afrikaStationeryClothesFood from '../assets/cin_ali/afrika/achild-astationery-clothes-food.webp';
import afrikaAll from '../assets/cin_ali/afrika/achild-envelope-astationery-clothes-food.webp';

// Gazze çocuk görselleri
import gazzeEmpty from '../assets/cin_ali/gazze/achild-00.webp';
import gazzeEnvelope from '../assets/cin_ali/gazze/achild-envelope.webp';
import gazzeClothes from '../assets/cin_ali/gazze/achild-clothes.webp';
import gazzeFood from '../assets/cin_ali/gazze/achild-food.webp';
import gazzeStationery from '../assets/cin_ali/gazze/achild-astationery.webp';
import gazzeEnvelopeClothes from '../assets/cin_ali/gazze/achild-envelope-clothes.webp';
import gazzeEnvelopeFood from '../assets/cin_ali/gazze/achild-envelope-food.webp';
import gazzeEnvelopeStationery from '../assets/cin_ali/gazze/achild-envelope-astationery.webp';
import gazzeClothesFood from '../assets/cin_ali/gazze/achild-clothes-food.webp';
import gazzeStationeryClothes from '../assets/cin_ali/gazze/achild-clothes-astationery.webp';
import gazzeStationeryFood from '../assets/cin_ali/gazze/achild-astationery-food.webp';
import gazzeEnvelopeClothesFood from '../assets/cin_ali/gazze/achild-envelope-clothes-food.webp';
import gazzeEnvelopeStationeryClothes from '../assets/cin_ali/gazze/achild-envelope-clothes-astationery.webp';
import gazzeEnvelopeStationeryFood from '../assets/cin_ali/gazze/achild-envelope-astationery-food.webp';
import gazzeStationeryClothesFood from '../assets/cin_ali/gazze/achild-astationery-clothes-food.webp';
import gazzeAll from '../assets/cin_ali/gazze/achild-clothes-envelope-astationery-food.webp';

// Görsel kombinasyon haritası oluştur
// Anahtar: sıralı item_type listesi (virgülle birleştirilmiş), Değer: görsel
const afrikaImageMap = {
    '': afrikaEmpty,
    'envelope': afrikaEnvelope,
    'clothing': afrikaClothes,
    'food': afrikaFood,
    'education': afrikaStationery,
    'clothing,envelope': afrikaEnvelopeClothes,
    'envelope,food': afrikaEnvelopeFood,
    'education,envelope': afrikaEnvelopeStationery,
    'clothing,food': afrikaClothesFood,
    'clothing,education': afrikaStationeryClothes,
    'education,food': afrikaStationeryFood,
    'clothing,envelope,food': afrikaEnvelopeClothesFood,
    'clothing,education,envelope': afrikaEnvelopeStationeryClothes,
    'education,envelope,food': afrikaEnvelopeStationeryFood,
    'clothing,education,food': afrikaStationeryClothesFood,
    'clothing,education,envelope,food': afrikaAll,
};

const gazzeImageMap = {
    '': gazzeEmpty,
    'envelope': gazzeEnvelope,
    'clothing': gazzeClothes,
    'food': gazzeFood,
    'education': gazzeStationery,
    'clothing,envelope': gazzeEnvelopeClothes,
    'envelope,food': gazzeEnvelopeFood,
    'education,envelope': gazzeEnvelopeStationery,
    'clothing,food': gazzeClothesFood,
    'clothing,education': gazzeStationeryClothes,
    'education,food': gazzeStationeryFood,
    'clothing,envelope,food': gazzeEnvelopeClothesFood,
    'clothing,education,envelope': gazzeEnvelopeStationeryClothes,
    'education,envelope,food': gazzeEnvelopeStationeryFood,
    'clothing,education,food': gazzeStationeryClothesFood,
    'clothing,education,envelope,food': gazzeAll,
};

const tabConfig = [
    { key: 'african', label: 'Afrika', color: '#12985a' },
    { key: 'gaza', label: 'Gazze', color: '#103e6a' },
];

export default function CinAliDonation() {
    const [activeTab, setActiveTab] = useState('african');
    const [quantities, setQuantities] = useState({});
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);
    const { setIsCartOpen, fetchCart } = useCart();
    const showToast = useToast();

    // API'den öğeleri getir
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const data = await getCinAliItems(activeTab);
                if (data.items && data.items.length > 0) {
                    setItems(prev => ({ ...prev, [activeTab]: data.items }));
                } else {
                    setItems(prev => ({ ...prev, [activeTab]: [] }));
                }
            } catch (error) {
                console.error('Cin Ali öğeleri yüklenemedi:', error);
                setItems(prev => ({ ...prev, [activeTab]: [] }));
            }
            setLoading(false);
        };

        if (!items[activeTab]) {
            fetchItems();
        } else {
            setLoading(false);
        }
    }, [activeTab]);

    const currentItems = items[activeTab] || [];

    // Seçili öğelerin key'lerini oluştur (sıralı)
    const selectedKeys = useMemo(() => {
        return currentItems
            .filter(item => (quantities[`${activeTab}-${item.item_type}`] || 0) > 0)
            .map(item => item.item_type)
            .sort()
            .join(',');
    }, [quantities, activeTab, currentItems]);

    // Çocuk görselini seç
    const childImage = useMemo(() => {
        const imageMap = activeTab === 'african' ? afrikaImageMap : gazzeImageMap;
        return imageMap[selectedKeys] || (activeTab === 'african' ? afrikaEmpty : gazzeEmpty);
    }, [selectedKeys, activeTab]);

    // Miktar işlemleri
    const getQuantity = (itemType) => quantities[`${activeTab}-${itemType}`] || 0;

    const updateQuantity = (itemType, delta) => {
        const key = `${activeTab}-${itemType}`;
        const current = quantities[key] || 0;
        const newVal = Math.max(0, current + delta);
        setQuantities(prev => ({ ...prev, [key]: newVal }));
    };

    // Toplam hesapla
    const total = useMemo(() => {
        return currentItems.reduce((sum, item) => {
            const qty = getQuantity(item.item_type);
            return sum + (parseFloat(item.price) * qty);
        }, 0);
    }, [quantities, activeTab, currentItems]);

    const activeColor = tabConfig.find(t => t.key === activeTab)?.color || '#12985a';

    const handleAddToCart = async () => {
        if (total === 0) {
            showToast("Lütfen en az bir öğe seçiniz.", "warning");
            return;
        }

        setAddingToCart(true);
        try {
            // Seçili öğeleri filtrele
            const selectedItems = currentItems.filter(item => getQuantity(item.item_type) > 0);

            // Her birini sepete ekle
            for (const item of selectedItems) {
                const qty = getQuantity(item.item_type);
                await addCinAliToCart({
                    cin_ali_item_id: item.id,
                    quantity: qty,
                    country: activeTab
                });
            }

            showToast("Bağışlarınız başarıyla sepete eklendi.", "success");

            // Seçimleri sıfırla
            const newQuantities = { ...quantities };
            selectedItems.forEach(item => {
                newQuantities[`${activeTab}-${item.item_type}`] = 0;
            });
            setQuantities(newQuantities);

            // Sepeti yenile ve aç
            await fetchCart();
            setIsCartOpen(true);
        } catch (error) {
            console.error("Sepete ekleme hatası:", error);
            showToast("Sepete eklenirken bir hata oluştu.", "error");
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4">

                {/* Tabs */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-6 md:mb-8">
                    {tabConfig.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab.key
                                ? 'text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            style={activeTab === tab.key ? { backgroundColor: tab.color } : {}}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Title */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
                        {activeTab === 'african'
                            ? "Merhaba, ben Afrika'dan bir çocuğum."
                            : "Merhaba, ben Gazze'den bir çocuğum."
                        }
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-2">
                        {activeTab === 'african'
                            ? "Afrika'da zor şartlarda yaşıyorum. Bana ve benim gibi diğer arkadaşlarıma yapacağınız yardımlar için teşekkürler. İyi ki varsınız."
                            : "Gazze'de zor şartlar altında yaşamımı sürdürmeye çalışıyorum. Yapacağınız her yardım bizim için umut demek. İyi ki varsınız."
                        }
                    </p>
                </div>

                {/* === MOBILE LAYOUT (< md) === */}
                <div className="md:hidden flex flex-col items-center">
                    {/* Child + Items Container */}
                    <div className="relative w-full max-w-[360px] mx-auto" style={{ minHeight: '420px' }}>
                        {/* Child Image - Center */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-44 z-10">
                            <img
                                src={childImage}
                                alt="Çocuk"
                                className="w-full h-auto transition-all duration-500 ease-in-out drop-shadow-xl"
                                draggable="false"
                            />
                        </div>

                        {/* Top-Left Item */}
                        {currentItems[0] && (
                            <div className="absolute top-0 left-0">
                                <ItemCard
                                    item={currentItems[0]}
                                    quantity={getQuantity(currentItems[0].item_type)}
                                    onUpdate={(delta) => updateQuantity(currentItems[0].item_type, delta)}
                                    activeColor={activeColor}
                                    compact
                                />
                            </div>
                        )}

                        {/* Top-Right Item */}
                        {currentItems[1] && (
                            <div className="absolute top-0 right-0">
                                <ItemCard
                                    item={currentItems[1]}
                                    quantity={getQuantity(currentItems[1].item_type)}
                                    onUpdate={(delta) => updateQuantity(currentItems[1].item_type, delta)}
                                    activeColor={activeColor}
                                    compact
                                />
                            </div>
                        )}

                        {/* Bottom-Left Item */}
                        {currentItems[2] && (
                            <div className="absolute bottom-0 left-0">
                                <ItemCard
                                    item={currentItems[2]}
                                    quantity={getQuantity(currentItems[2].item_type)}
                                    onUpdate={(delta) => updateQuantity(currentItems[2].item_type, delta)}
                                    activeColor={activeColor}
                                    compact
                                />
                            </div>
                        )}

                        {/* Bottom-Right Item */}
                        {currentItems[3] && (
                            <div className="absolute bottom-0 right-0">
                                <ItemCard
                                    item={currentItems[3]}
                                    quantity={getQuantity(currentItems[3].item_type)}
                                    onUpdate={(delta) => updateQuantity(currentItems[3].item_type, delta)}
                                    activeColor={activeColor}
                                    compact
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* === DESKTOP LAYOUT (>= md) === */}
                <div className="hidden md:flex items-center justify-center gap-4 lg:gap-8 min-h-[420px]">

                    {/* Left Items */}
                    <div className="flex flex-col gap-10 items-end w-1/3">
                        {currentItems.filter((_, i) => i < 2).map(item => (
                            <ItemCard
                                key={item.item_type}
                                item={item}
                                quantity={getQuantity(item.item_type)}
                                onUpdate={(delta) => updateQuantity(item.item_type, delta)}
                                activeColor={activeColor}
                            />
                        ))}
                    </div>

                    {/* Center Child Image */}
                    <div className="flex-shrink-0 w-72 lg:w-80 flex items-center justify-center">
                        <img
                            src={childImage}
                            alt="Çocuk"
                            className="w-full h-auto transition-all duration-500 ease-in-out drop-shadow-xl"
                            draggable="false"
                        />
                    </div>

                    {/* Right Items */}
                    <div className="flex flex-col gap-10 items-start w-1/3">
                        {currentItems.filter((_, i) => i >= 2).map(item => (
                            <ItemCard
                                key={item.item_type}
                                item={item}
                                quantity={getQuantity(item.item_type)}
                                onUpdate={(delta) => updateQuantity(item.item_type, delta)}
                                activeColor={activeColor}
                            />
                        ))}
                    </div>
                </div>

                {/* Total & Cart Button */}
                <div className="flex flex-col items-center justify-center mt-8 md:mt-12 space-y-3 md:space-y-4 text-center">
                    <p className="text-xl md:text-2xl font-bold text-gray-800">
                        Toplam: <span style={{ color: activeColor }}>{total.toLocaleString('tr-TR')}₺</span>
                    </p>
                    <button
                        onClick={handleAddToCart}
                        disabled={total === 0 || addingToCart}
                        className="px-8 md:px-10 py-3 md:py-4 rounded-full text-white font-bold text-base md:text-lg tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        style={{ backgroundColor: total > 0 && !addingToCart ? activeColor : '#9ca3af' }}
                    >
                        {addingToCart ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                EKLENİYOR...
                            </>
                        ) : (
                            "Sepete Ekle"
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}

// ItemCard alt bileşeni
function ItemCard({ item, quantity, onUpdate, activeColor, compact = false }) {
    const isActive = quantity > 0;
    const imageUrl = item.image_url || item.image;

    return (
        <div className={`flex flex-col items-center text-center transition-all duration-300 ${isActive ? 'scale-105' : 'opacity-80 hover:opacity-100'}`}>
            {/* Item Image */}
            <div
                className={`${compact ? 'w-14 h-14 rounded-xl' : 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl'} flex items-center justify-center mb-1.5 transition-all duration-300 overflow-hidden ${isActive ? 'ring-4 shadow-lg' : 'bg-gray-100'
                    }`}
                style={isActive ? { ringColor: activeColor, borderColor: activeColor, boxShadow: `0 4px 18px ${activeColor}40` } : {}}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        draggable="false"
                    />
                ) : (
                    <span className={`${compact ? 'text-lg' : 'text-2xl'} text-gray-300`}>📦</span>
                )}
            </div>

            {/* Name */}
            <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-gray-800 mb-1`}>{item.name}</h4>

            {/* Price Badge */}
            <span
                className={`${compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'} font-bold text-white rounded-full mb-1.5`}
                style={{ backgroundColor: activeColor }}
            >
                {parseFloat(item.price).toLocaleString('tr-TR')}₺
            </span>

            {/* Quantity Controls */}
            <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
                <button
                    onClick={() => onUpdate(-1)}
                    className={`${compact ? 'w-6 h-6 text-sm' : 'w-8 h-8 text-lg'} rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition-colors`}
                    disabled={quantity === 0}
                >
                    −
                </button>
                <span className={`${compact ? 'text-sm w-4' : 'text-lg w-6'} font-bold text-gray-800 text-center`}>{quantity}</span>
                <button
                    onClick={() => onUpdate(1)}
                    className={`${compact ? 'w-6 h-6 text-sm' : 'w-8 h-8 text-lg'} rounded-full text-white flex items-center justify-center font-bold transition-colors hover:opacity-90`}
                    style={{ backgroundColor: activeColor }}
                >
                    +
                </button>
            </div>
        </div>
    );
}
