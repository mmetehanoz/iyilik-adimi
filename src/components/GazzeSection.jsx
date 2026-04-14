import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/services-bg.jpg';
import { getCategories, getDonations } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const GAZZE_BULLETS = {
    yemek: ['Taze pişirim', 'Görüntülü bilgilendirme', 'Gerçek ihtiyaç sahipleri'],
    su: ['Bölge içinden hızlı tedarik', 'Doğrudan teslimat', 'e-Mail bilgilendirmesi'],
    kumanya: ['Bir ailenin aylık gıda ihtiyacı', 'Besleyici paket içeriği', 'SMS ile bağış bildirimi'],
};

function getGazzeBullets(title) {
    const lower = (title || '').toLowerCase();
    if (lower.includes('yemek')) return GAZZE_BULLETS.yemek;
    if (lower.includes('su')) return GAZZE_BULLETS.su;
    if (lower.includes('kumanya')) return GAZZE_BULLETS.kumanya;
    return [];
}

function GazzeCard({ donation, onAddToCart, adding, isPrimary }) {
    const bullets = getGazzeBullets(donation.name);
    const price = donation.price > 0 ? donation.price : 0;

    return (
        <div
            className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
                isPrimary
                    ? 'bg-[#103e6a] text-white transform md:scale-105 z-10 shadow-2xl border-4 border-[#103e6a]'
                    : 'bg-white text-gray-800 border border-gray-100'
            }`}
        >
            {/* Image */}
            <div className="h-48 overflow-hidden relative shrink-0">
                <img
                    src={donation.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80'}
                    alt={donation.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80'; }}
                />
                {isPrimary && <div className="absolute inset-0 bg-[#103e6a]/20" />}
            </div>

            {/* Content */}
            <div className="p-8 text-center flex flex-col flex-grow">
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                    isPrimary ? 'text-blue-200' : 'text-gray-500'
                }`}>
                    {donation.name}
                </h3>

                <div className="mb-2 flex items-center justify-center">
                    <span className={`text-4xl font-black tracking-tight ${
                        isPrimary ? 'text-white' : 'text-[#12985a]'
                    }`}>
                        {price > 0 ? price.toLocaleString('tr-TR', { maximumFractionDigits: 0 }) : '—'}
                    </span>
                    {price > 0 && (
                        <span className={`text-xl font-bold ml-1 ${
                            isPrimary ? 'text-white' : 'text-[#12985a]'
                        }`}>₺</span>
                    )}
                </div>

                <div className={`text-xs font-bold tracking-wider mb-6 ${
                    isPrimary ? 'text-blue-200' : 'text-gray-400'
                }`}>
                    / GAZZE
                </div>

                <ul className={`space-y-3 mb-8 text-left mx-auto w-full max-w-[240px] flex-grow ${
                    isPrimary ? 'text-blue-100' : 'text-gray-600'
                }`}>
                    {bullets.map((b, i) => (
                        <li key={i} className="flex items-center text-sm">
                            <svg className="w-5 h-5 mr-3 shrink-0 text-[#12985a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {b}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => onAddToCart(donation)}
                    disabled={adding === donation.id}
                    className={`w-full py-4 rounded-full text-sm font-bold tracking-wider transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                        isPrimary
                            ? 'bg-white text-[#103e6a] hover:bg-gray-50'
                            : 'bg-[#103e6a] text-white hover:bg-[#0d3257] hover:scale-105'
                    }`}
                >
                    {adding === donation.id ? (
                        <><div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />EKLENİYOR...</>
                    ) : 'SEPETE EKLE'}
                </button>
            </div>
        </div>
    );
}

function GazzeKosesi() {
    const [donations, setDonations] = useState([]);
    const [adding, setAdding] = useState(null);
    const { addToCart } = useCart();
    const showToast = useToast();

    useEffect(() => {
        const fetchGazzeDonations = async () => {
            try {
                const [catsData, donationsData] = await Promise.all([getCategories(), getDonations()]);
                const cats = Array.isArray(catsData) ? catsData : (catsData.results || []);
                const allDonations = Array.isArray(donationsData) ? donationsData : (donationsData.results || []);
                const gazzeCat = cats.find(c => (c.name || '').toLowerCase().includes('gazze'));
                if (!gazzeCat) return;
                const gazzeAll = allDonations.filter(d => d.category_id === gazzeCat.id);
                const findBy = (...keywords) =>
                    gazzeAll.find(d => keywords.some(kw => (d.title || '').toLowerCase().includes(kw)));
                const ordered = [
                    findBy('yemek'),
                    findBy('tanker', 'su'),
                    findBy('kumanya'),
                ].filter(Boolean);
                const gazzeDonations = ordered
                    .map(d => {
                        const variants = d.price_variants || [];
                        const types = d.donation_types || [];
                        // Fiyat önceliği: fixed_price → ilk varyant fiyatı → ilk tip fiyatı → min_price
                        const resolvedPrice = parseFloat(
                            d.fixed_price ||
                            variants[0]?.price ||
                            types[0]?.price ||
                            d.min_price ||
                            0
                        );
                        return {
                            id: d.id,
                            name: d.title,
                            description: d.short_description || d.description,
                            price: resolvedPrice,
                            image: d.image,
                            currency: d.currency,
                            is_fixed: d.price_type === 'fixed',
                            donation_type: types[0]?.name || null,
                        };
                    });
                setDonations(gazzeDonations);
            } catch (err) {
                console.error('Gazze bağışları yüklenemedi:', err);
            }
        };
        fetchGazzeDonations();
    }, []);

    const handleAddToCart = async (donation) => {
        setAdding(donation.id);
        try {
            await addToCart({
                id: donation.id,
                price: donation.price,
                currency: donation.currency,
                quantity: 1,
                ...(donation.donation_type ? { donation_type: donation.donation_type } : {}),
            });
            showToast('Bağış sepete eklendi.', 'success');
        } catch {
            showToast('Sepete eklenirken bir hata oluştu.', 'error');
        } finally {
            setAdding(null);
        }
    };

    if (donations.length === 0) return null;

    return (
        <div className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-4">
                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {donations.map((donation, index) => (
                        <GazzeCard
                            key={donation.id}
                            donation={donation}
                            onAddToCart={handleAddToCart}
                            adding={adding}
                            isPrimary={index === 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function GazzeSection() {
    return (
        <section>
            {/* Header Banner */}
            <div
                className="relative flex items-center justify-center py-32 text-center text-white"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 mx-auto max-w-4xl px-4">
                    <h2 className="mb-6 text-5xl font-black">
                        KARDEŞLİĞİN SINAVI: GAZZE
                    </h2>
                    <p className="mb-8 text-lg font-medium text-white/90">
                        Sizin desteğinizle Gazze'de sıcak yemek, temiz su ve kumanya ulaştırarak yaraları sarıyor; her adımda bir kardeşimizin sofrasına umut ve bereket taşıyoruz.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/bagislar?kategori=gazze"
                            className="rounded-full bg-[#103e6a] px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:opacity-90"
                        >
                            BAĞIŞ YAP
                        </Link>
                        <Link
                            to="/iletisim"
                            className="rounded-full bg-[#103e6a] px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:opacity-90"
                        >
                            İLETİŞİM
                        </Link>
                    </div>
                </div>
            </div>

            {/* Gazze Köşesi */}
            <GazzeKosesi />
        </section>
    );
}
