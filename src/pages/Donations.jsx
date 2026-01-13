import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

// Donation Data Structure with Images and Descriptions
// Reliable Image Mappings
const categoryImages = {
    kurban: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop', // Cow/Farm
    gazze: 'https://images.unsplash.com/photo-1534777367038-9404f45b869a?q=80&w=800&auto=format&fit=crop', // Tents/Camp
    yemek: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop', // Food serving
    kumanya: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=800&auto=format&fit=crop', // Grocery/Box
    genel: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop', // Charity/Helping
    sukuyusu: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800&auto=format&fit=crop', // Water
    nakdi: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop', // Hands giving
    acil: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop' // Emergency/Dark
};

const donationCategories = [
    {
        id: 'kurban',
        title: 'KURBAN',
        icon: '🐑',
        items: [
            {
                id: 'inek',
                name: 'İnek',
                price: 60000,
                image: categoryImages.kurban,
                description: 'İhtiyaç sahibi aileler için büyükbaş kurban bağışı.'
            },
            {
                id: 'koyun',
                name: 'Koyun',
                price: 7000,
                image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=800&auto=format&fit=crop',
                description: 'Mazlum coğrafyalarda küçükbaş kurban sevinci yaşatın.'
            },
            {
                id: 'keci',
                name: 'Keçi',
                price: 6000,
                image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=800&auto=format&fit=crop',
                description: 'Afrika ve Asya\'da ihtiyaç sahiplerine keçi kurbanı ulaştırın.'
            }
        ]
    },
    {
        id: 'gazze',
        title: 'GAZZE',
        icon: '🇵🇸',
        items: [
            { id: 'gazze_acil', name: 'Acil Yardım', price: 100, min: true, image: categoryImages.gazze, description: 'Gazze\'deki kardeşlerimize acil insani yardım ulaştırıyoruz.' },
            { id: 'gazze_yemek', name: '1 Öğün Yemek', price: 150, image: categoryImages.yemek, description: 'Savaş mağduru bir kişiye sıcak yemek ikramı.' },
            { id: 'gazze_su', name: '1 Hisse Su Bedeli', price: 50, image: categoryImages.sukuyusu, description: 'Temiz suya erişimi olmayanlar için su desteği.' },
            { id: 'gazze_cadir', name: 'Çadır', price: 45000, image: categoryImages.gazze, description: 'Evsiz kalan aileler için barınma (çadır) desteği.' }
        ]
    },
    {
        id: 'yemek',
        title: 'YEMEK',
        icon: '🍲',
        items: [
            { id: 'yemek_3', name: '3 Kişilik Yemek', price: 240, image: categoryImages.yemek, description: 'Bir aile için sıcak iftar veya akşam yemeği.' },
            { id: 'yemek_5', name: '5 Kişilik Yemek', price: 400, image: categoryImages.yemek, description: 'Geniş bir aileye sofra kurun.' },
            { id: 'yemek_10', name: '10 Kişilik Yemek', price: 800, image: categoryImages.yemek, description: 'Kalabalık sofralara bereket olun.' },
            { id: 'yemek_100', name: '100 Kişilik Yemek', price: 8000, image: categoryImages.yemek, description: 'Bir köy veya kamp için toplu yemek organizasyonu.' },
            { id: 'yemek_500', name: '500 Kişilik Yemek', price: 40000, image: categoryImages.yemek, description: 'Büyük çaplı yemek dağıtımı ile yüzleri güldürün.' }
        ]
    },
    {
        id: 'kumanya',
        title: 'KUMANYA',
        icon: '📦',
        items: [
            { id: 'kumanya_paketi', name: 'Kumanya Bedeli', price: 1600, image: categoryImages.kumanya, description: 'Bir ailenin bir aylık temel gıda ihtiyacını karşılayan paket.' }
        ]
    },
    {
        id: 'genel',
        title: 'GENEL BAĞIŞ',
        icon: '🌍',
        items: [
            { id: 'sut_kecisi', name: 'Süt Keçisi', price: 3000, image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=800&auto=format&fit=crop', description: 'Ailelere sürdürülebilir geçim kaynağı sağlayın.' },
            { id: 'ekmek', name: 'Ekmek', price: 10, options: ['Somali', 'Afganistan'], image: categoryImages.yemek, description: 'Fırınlarda pişirilen sıcak ekmekleri ihtiyaç sahiplerine ulaştırıyoruz.' },
            { id: 'su_tankeri_yemen', name: 'Su Tankeri (Yemen)', price: 2000, image: categoryImages.sukuyusu, description: 'Yemen\'de susuzlukla mücadele eden köylere tankerle su taşıyoruz.' },
            { id: 'su_tankeri_gazze', name: 'Su Tankeri (Gazze)', price: 24000, image: categoryImages.sukuyusu, description: 'Gazze\'de temiz suya erişim için tanker desteği.' },
            { id: 'elbise', name: 'Elbise Dağıtımı', price: 1000, options: ['Afganistan', 'Somali'], quantities: [1, 3, 5], image: categoryImages.genel, description: 'Çocuklara ve yetişkinlere yeni bayramlık ve günlük kıyafetler.' },
            { id: 'kuran', name: 'Kuran-ı Kerim Bağış', price: 500, desc: '5 Adet', options: ['Somali', 'Afganistan', 'Tanzanya'], quantities: [5, 10, 20, 50], image: categoryImages.genel, description: 'Kuran-ı Kerim\'e ulaşamayan öğrencilere hediye edin.' },
            { id: 'hijyen', name: 'Temizlik Hijyen Paketi', price: 1750, options: ['Tanzanya', 'Yemen'], quantities: [1, 3, 5], image: categoryImages.acil, description: 'Salgın hastalıklara karşı sabun, deterjan vb. içeren hijyen seti.' },
            { id: 'kirtasiye_dis', name: 'Kırtasiye (Yurt Dışı)', price: 2000, options: ['Tanzanya', 'Yemen'], quantities: [1, 3, 5, 10], image: categoryImages.genel, description: 'Okul çantası, defter, kalem gibi eğitim materyalleri.' },
            { id: 'kirtasiye_tr', name: 'Kırtasiye (Türkiye)', price: 3000, quantities: [1, 3, 5, 10], image: categoryImages.genel, description: 'Türkiye\'deki ihtiyaç sahibi öğrenciler için eğitim seti.' }
        ]
    },
    {
        id: 'sukuyusu',
        title: 'SU KUYUSU',
        icon: '💧',
        items: [
            { id: 'su_hisseli', name: 'Hisseli Su Kuyusu (1 Hisse)', price: 500, options: ['Bangladeş', 'Somali', 'Tanzanya'], quantities: [1, 2, 3, 4, 5, 10], image: categoryImages.sukuyusu, description: 'Bir su kuyusuna hisse ile ortak olun.' },
            { id: 'tek_tulumbali_fayansli', name: 'Tek Tulumbalı Kuyu (Bangladeş - Fayanslı)', price: 19000, image: categoryImages.sukuyusu, description: 'Bangladeş\'te uzun ömürlü, fayans kaplamalı tulumba.' },
            { id: 'tek_tulumbali_fayanssiz', name: 'Tek Tulumbalı Kuyu (Bangladeş - Fayanssız)', price: 12000, image: categoryImages.sukuyusu, description: 'Bangladeş köylerinde ekonomik su çözümü.' },
            { id: 'sadirvan_tanzanya', name: 'Şadırvanlı Kuyu (Tanzanya)', price: 93000, image: categoryImages.sukuyusu, description: 'Cami yanına veya köy meydanına çok musluklu şadırvanlı kuyu.' },
            { id: 'sadirvan_banglades', name: 'Şadırvanlı Kuyu (Bangladeş)', price: 45000, image: categoryImages.sukuyusu, description: 'Bangladeş\'te toplu kullanıma uygun şadırvanlı sistem.' },
            { id: 'sadirvan_afganistan', name: 'Şadırvanlı Kuyu (Afganistan)', price: 45000, image: categoryImages.sukuyusu, description: 'Afganistan\'da kuraklığa karşı kalıcı çözüm.' }
        ]
    },
    {
        id: 'nakdi',
        title: 'NAKDİ YARDIM',
        icon: '💰',
        items: [
            { id: 'sadaka', name: 'Sadaka', price: 100, min: true, options: ['Afganistan', 'Yemen', 'Bangladeş', 'Tanzanya', 'Gazze', 'Somali'], image: categoryImages.nakdi, description: 'Belaları def eden, malı bereketlendiren sadaka bağışı.' },
            { id: 'zekat', name: 'Zekat', price: 100, min: true, options: ['Afganistan', 'Yemen', 'Bangladeş', 'Tanzanya', 'Gazze', 'Somali'], image: categoryImages.nakdi, description: 'Dinen farz olan zekatınızı ihtiyaç sahiplerine ulaştırıyoruz.' },
            { id: 'ogrenci', name: 'Öğrenci Yardımı', price: 100, min: true, options: ['Türkiye', 'Tanzanya', 'Yemen'], image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop', description: 'Eğitim hayatını sürdüren öğrencilere maddi destek.' }
        ]
    },
    {
        id: 'acil',
        title: 'ACİL YARDIMLAR',
        icon: '🚨',
        items: [
            { id: 'acil_genel', name: 'Acil Yardım', price: 100, min: true, options: ['Türkiye', 'Afganistan', 'Yemen', 'Bangladeş', 'Tanzanya', 'Gazze', 'Somali'], image: categoryImages.acil, description: 'Afet ve kriz bölgelerine hızlı müdahale fonu.' }
        ]
    }
];

export default function Donations() {
    const [activeTab, setActiveTab] = useState(donationCategories[0].id);

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
                                delay: 2000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            modules={[FreeMode, Autoplay]}
                            className="w-full !pb-4 !px-1"
                        >
                            {donationCategories.map((cat) => (
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
                            {donationCategories.map((cat) => {
                                if (cat.id !== activeTab) return null;

                                return (
                                    <div key={cat.id}>
                                        <div className="flex items-center gap-3 mb-8 border-b pb-4">
                                            <span className="text-4xl">{cat.icon}</span>
                                            <h2 className="text-2xl font-bold text-[#103e6a]">{cat.title}</h2>
                                        </div>

                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {cat.items.map((item) => (
                                                <DonationCard key={item.id} item={item} />
                                            ))}
                                        </div>
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
    const [selectedOption, setSelectedOption] = useState(item.options ? item.options[0] : null);
    const [selectedQty, setSelectedQty] = useState(item.quantities ? item.quantities[0] : 1);
    const [amount, setAmount] = useState(item.price || '');
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // For variable price items (min limit)
        let finalPrice = item.price;
        if (!item.price || item.min) {
            if (!amount || Number(amount) < (item.price || 0)) {
                alert(`Lütfen geçerli bir tutar giriniz. (Minimum: ${item.price} ₺)`);
                return;
            }
            finalPrice = Number(amount);
        }

        const cartItem = {
            ...item,
            price: finalPrice,
            selectedOption,
            quantity: item.quantities ? selectedQty : 1
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
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="font-bold text-white text-lg">{item.name}</h3>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                {item.desc && <p className="text-xs text-[#12985a] font-bold mb-2 uppercase tracking-wide">{item.desc}</p>}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                <div className="mt-auto space-y-3">
                    {item.options && (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Ülke</label>
                            <select
                                className="w-full mt-1 p-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#12985a] outline-none bg-gray-50"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    )}

                    {item.quantities && (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Adet</label>
                            <select
                                className="w-full mt-1 p-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#12985a] outline-none bg-gray-50"
                                value={selectedQty}
                                onChange={(e) => setSelectedQty(Number(e.target.value))}
                            >
                                {item.quantities.map(q => <option key={q} value={q}>{q} Adet</option>)}
                            </select>
                        </div>
                    )}

                    {/* Custom Amount Input for Variable/Min Price Items */}
                    {(item.min || !item.price) && (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Bağış Tutarı (₺)</label>
                            <div className="relative mt-1">
                                <input
                                    type="number"
                                    min={item.price}
                                    placeholder={`Min ${item.price} ₺`}
                                    className="w-full p-2 pl-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#12985a] outline-none"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <span className="absolute right-3 top-2 text-gray-400 text-sm">₺</span>
                            </div>
                        </div>
                    )}

                    <div className="pt-2 flex items-center justify-between gap-4">
                        <div className="font-bold text-[#103e6a] text-xl">
                            {!item.min && item.price
                                ? <span>{new Intl.NumberFormat('tr-TR').format(item.price * (item.quantities ? selectedQty : 1))} ₺</span>
                                : null
                            }
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
