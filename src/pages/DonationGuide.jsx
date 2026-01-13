import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const guideContent = {
    zekat: {
        title: "ZEKAT: Malın Bereket Kapısı",
        subtitle: "Paylaştıkça çoğalan, verdiğinizde azalmayan tek şey",
        heroImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600&auto=format&fit=crop",
        description: "Zekat, İslam'ın beş şartından biridir. Malın temizlenmesi, şükrü ve artmasıdır. Paylaştıkça çoğalan bir berekettir.",
        icon: "💰",
        stats: [
            { value: "2.5%", label: "Zekat Oranı" },
            { value: "354", label: "Gün (1 Kameri Yıl)" },
            { value: "80.18gr", label: "Nisab Miktarı (Altın)" }
        ],
        cards: [
            {
                icon: "👥",
                title: "KİMLER ZEKAT VERİR?",
                content: "Akıl sağlığı yerinde, ergenlik çağına girmiş ve temel ihtiyaçlarının dışında 'Nisab Miktarı' (yaklaşık 80.18 gr altın veya değeri) mala sahip olan her Müslüman zekat vermekle yükümlüdür.",
                highlight: "Nisab Miktarı"
            },
            {
                icon: "📅",
                title: "NE ZAMAN VERİLİR?",
                content: "Nisab miktarı mala sahip olduktan sonra üzerinden tam bir kameri yıl (354 gün) geçmesi gerekir. Ramazan ayı, sevabının katlanması sebebiyle zekat için en çok tercih edilen vakittir.",
                highlight: "Ramazan Ayı"
            },
            {
                icon: "🧮",
                title: "NE KADAR VERİLİR?",
                content: "Sahip olunan nakit para, altın, döviz ve ticaret mallarının toplam değerinin %2.5'i (kırkta biri) zekat olarak hesaplanır ve ihtiyaç sahiplerine ulaştırılır.",
                highlight: "%2.5"
            }
        ],
        calculator: {
            title: "💡 Hızlı Zekat Hesaplama",
            description: "Toplam varlıklarınızı girin, zekat miktarınızı öğrenin"
        },
        faq: [
            { q: "Zekat Kimlere Verilebilir?", a: "Kur'an-ı Kerim'de belirtildiği üzere (Tevbe, 60): Fakirler, miskinler, borçlular, yolda kalmışlar, Allah yolundakiler ve kalpleri İslam'a ısındırılacak olanlara verilir." },
            { q: "Akrabaya Zekat Verilir mi?", a: "Kişi; annesine, babasına, dedesine, ninesine, eşine, çocuklarına ve torunlarına zekat veremez. Bunların dışındaki ihtiyaç sahibi kardeş, hala, dayı, teyze gibi akrabalara zekat vermek daha faziletlidir." },
            { q: "Zekat Hesaplaması Nasıl Yapılır?", a: "Elinizdeki tüm birikimlerin (altın, döviz, TL) güncel değerini toplayıp, varsa borçlarınızı düştükten sonra kalan miktarın 1/40'ını (yüzde 2.5) zekat olarak vermelisiniz." },
            { q: "Vergi Zekat Yerine Geçer mi?", a: "Hayır, vergi bir vatandaşlık görevi, zekat ise dini bir ibadettir. Biri diğerinin yerine geçmez." }
        ],
        donationLink: "/bagislar"
    },
    fitre: {
        title: "FİTRE: Ramazan'ın Şükrü",
        subtitle: "Bayram sevincini herkesle paylaşmanın yolu",
        heroImage: "https://images.unsplash.com/photo-1615743454746-17b5f54117b9?q=80&w=1600&auto=format&fit=crop",
        description: "Fitre (Fıtır Sadakası), Ramazan ayına kavuşmanın ve bayrama ulaşmanın bir şükrü olarak verilen, yoksulların bayram sevincine ortak olmayı sağlayan bir sadakadır.",
        icon: "🌙",
        stats: [
            { value: "Vacip", label: "İbadet Türü" },
            { value: "Bayram", label: "Namazından Önce" },
            { value: "Herkes", label: "İçin Ayrı Ayrı" }
        ],
        cards: [
            {
                icon: "📖",
                title: "FİTRE NEDİR?",
                content: "Ramazan Bayramı'na kavuşan ve temel ihtiyaçlarının dışında belli bir miktar mala sahip olan Müslümanların, kendileri ve bakmakla yükümlü oldukları kişiler için vermesi vacip olan sadakadır.",
                highlight: "Vacip"
            },
            {
                icon: "💵",
                title: "2024 FİTRE MİKTARI",
                content: "Diyanet İşleri Başkanlığı tarafından belirlenen miktar, bir kişinin bir günlük asgari gıda ihtiyacını karşılayacak tutardır. Bu miktar asgari sınırdır, durumu iyi olanların daha fazla vermesi tavsiye edilir.",
                highlight: "Asgari Sınır"
            },
            {
                icon: "⏰",
                title: "NE ZAMAN ÖDENMELİ?",
                content: "Ramazan ayı içerisinde verilmesi gerekir. En faziletli olanı, bayram namazından önce verilmesidir ki ihtiyaç sahipleri de bayrama hazırlıklı girebilsin.",
                highlight: "Bayram Namazından Önce"
            }
        ],
        faq: [
            { q: "Fitre Kimler İçin Verilir?", a: "Aile reisi, kendisi ve bakmakla yükümlü olduğu (ergenlik çağına girmemiş) çocukları için fitre verir." },
            { q: "Öğrenciye Fitre Verilir mi?", a: "Evet, durumu olmayan ve zekat alabilecek sınıfta bulunan öğrencilere fitre verilebilir. Bu, onların eğitimine destek olması bakımından da güzeldir." },
            { q: "Fitre Bayramdan Sonraya Kalırsa?", a: "Fitrenin bayram namazından önce verilmesi esastır. Eğer unutulursa veya imkan olmazsa, bayramdan sonra da 'kaza' niyetiyle değil, yine fitre niyetiyle mutlaka verilmelidir." }
        ],
        donationLink: "/bagislar"
    },
    sadaka: {
        title: "SADAKA: İyiliğin En Güzel Hali",
        subtitle: "Tebessümünüz bile bir sadakadır",
        heroImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600&auto=format&fit=crop",
        description: "Sadaka, belaları def eder ve ömrü uzatır. Az veya çok demeden yapılan her iyilik bir sadakadır.",
        icon: "🤲",
        stats: [
            { value: "∞", label: "Sınırsız Sevap" },
            { value: "Her Zaman", label: "Verilebilir" },
            { value: "Her Şey", label: "Sadaka Olabilir" }
        ],
        cards: [
            {
                icon: "💝",
                title: "SADAKA NEDİR?",
                content: "Allah rızası için ihtiyaç sahiplerine yapılan her türlü maddi ve manevi yardımdır. Sadece para ile değil, tebessümle bile olur.",
                highlight: "Tebessüm"
            },
            {
                icon: "🌟",
                title: "ÇEŞİTLERİ NELERDİR?",
                content: "Nafile sadaka, fıtır sadakası (fitre) ve sadaka-i cariye (kalıcı iyilik) gibi çeşitleri vardır.",
                highlight: "Sadaka-i Cariye"
            },
            {
                icon: "✨",
                title: "FAZİLETİ",
                content: "'Az sadaka çok belayı def eder' hadis-i şerifiyle önemine dikkat çekilmiştir.",
                highlight: "Bela Defeder"
            }
        ],
        faq: [
            { q: "Sadaka-i Cariye nedir?", a: "Kişi öldükten sonra da sevabı devam eden (cami, çeşme, okul yaptırmak gibi) sadakadır." },
            { q: "Sadaka kime verilmez?", a: "Zengin olanlara sadaka verilmez. Ancak hediyeleşmek sünnettir." }
        ],
        donationLink: "/bagislar"
    },
    adak: {
        title: "ADAK: Allah'a Verilen Söz",
        subtitle: "Dileğiniz kabul oldu mu? Sözünüzü yerine getirin",
        heroImage: "https://images.unsplash.com/photo-1561731671-5f05b0a33e38?q=80&w=1600&auto=format&fit=crop",
        description: "Allah'a verilen bir sözün yerine getirilmesidir. Bir dileğin gerçekleşmesine bağlanan ibadet.",
        icon: "🐑",
        stats: [
            { value: "Vacip", label: "Gerçekleşince" },
            { value: "%100", label: "Dağıtılmalı" },
            { value: "0", label: "Kendiniz Yiyemezsiniz" }
        ],
        cards: [
            {
                icon: "📝",
                title: "ADAK NEDİR?",
                content: "Kişinin dinen yükümlü olmadığı halde, farz veya vacip cinsinden bir ibadeti yapacağına dair Allah'a söz vermesidir.",
                highlight: "Allah'a Söz"
            },
            {
                icon: "✅",
                title: "ŞARTLARI",
                content: "Adağın yerine getirilmesi için dileğin gerçekleşmesi gerekir. Gerçekleşince bekletmeden kesilmesi vaciptir.",
                highlight: "Bekletmeden"
            },
            {
                icon: "🚫",
                title: "KİMLER YİYEMEZ?",
                content: "Adak sahibinin kendisi, eşi, çocukları, torunları, anne ve babası adak etinden yiyemez. Tamamı dağıtılmalıdır.",
                highlight: "Tamamı Dağıtılmalı"
            }
        ],
        faq: [
            { q: "Adak yerine para verilir mi?", a: "Eğer 'kurban keseceğim' diye adandıysa mutlaka kurban kesilmelidir, bedeli para olarak verilemez." },
            { q: "Adak eti kimlere dağıtılır?", a: "Tamamı yoksul ve ihtiyaç sahiplerine dağıtılmalıdır." }
        ],
        donationLink: "/bagislar"
    }
};

export default function DonationGuide() {
    const { type } = useParams();
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [calculatorValue, setCalculatorValue] = useState('');
    const [zekatAmount, setZekatAmount] = useState(0);
    const data = guideContent[type] || guideContent.zekat;

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${data.title} - İyilik Adımı`;
    }, [type, data.title]);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const calculateZekat = (value) => {
        const amount = parseFloat(value.replace(/[^0-9.]/g, ''));
        if (!isNaN(amount)) {
            setZekatAmount((amount * 0.025).toFixed(2));
        } else {
            setZekatAmount(0);
        }
    };

    const handleCalculatorInput = (e) => {
        const value = e.target.value;
        setCalculatorValue(value);
        calculateZekat(value);
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-20">
            {/* Hero with Parallax Effect */}
            <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent z-10"></div>
                <img
                    src={data.heroImage}
                    alt={data.title}
                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="relative z-20 text-center text-white px-4 max-w-4xl animate-fade-in">
                    <div className="text-6xl mb-4 animate-bounce-slow">{data.icon}</div>
                    <span className="uppercase tracking-[0.3em] text-[#12985a] font-bold text-sm bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-6 inline-block border border-white/30 shadow-lg">
                        BAĞIŞ REHBERİ
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">{data.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-100 font-light italic mb-6">{data.subtitle}</p>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">{data.description}</p>
                </div>
            </div>

            {/* Stats Section */}
            {data.stats && (
                <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-30 mb-16">
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                        {data.stats.map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-2xl text-center transform hover:scale-105 transition-all duration-300 border-t-4 border-[#12985a]">
                                <div className="text-3xl md:text-5xl font-bold text-[#103e6a] mb-2">{stat.value}</div>
                                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Interactive Calculator (Only for Zekat) */}
            {type === 'zekat' && data.calculator && (
                <div className="max-w-4xl mx-auto px-4 mb-16">
                    <div className="bg-gradient-to-br from-[#103e6a] to-[#12985a] rounded-3xl p-8 md:p-12 shadow-2xl text-white">
                        <h3 className="text-3xl font-bold mb-4 text-center">{data.calculator.title}</h3>
                        <p className="text-center text-gray-200 mb-8">{data.calculator.description}</p>
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <input
                                type="text"
                                placeholder="Toplam varlıklarınız (₺)"
                                value={calculatorValue}
                                onChange={handleCalculatorInput}
                                className="flex-1 px-6 py-4 rounded-xl text-gray-800 text-lg font-semibold focus:ring-4 focus:ring-white/50 outline-none"
                            />
                            <div className="bg-white/20 backdrop-blur px-8 py-4 rounded-xl border-2 border-white/40 min-w-[200px] text-center">
                                <div className="text-sm text-gray-200 mb-1">Zekat Miktarınız</div>
                                <div className="text-3xl font-bold">₺{zekatAmount.toLocaleString('tr-TR')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Cards with Icons */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {data.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-[#12985a] transform hover:-translate-y-2"
                        >
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                            <h3 className="text-xl font-bold text-[#103e6a] mb-4 group-hover:text-[#12985a] transition-colors">{card.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {card.content.split(card.highlight).map((part, i, arr) => (
                                    i < arr.length - 1 ? (
                                        <span key={i}>
                                            {part}
                                            <span className="bg-[#12985a]/10 text-[#12985a] font-bold px-2 py-1 rounded">{card.highlight}</span>
                                        </span>
                                    ) : part
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section with Better Animations */}
            <div className="max-w-4xl mx-auto px-4 pb-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#103e6a] mb-4">💬 Sıkça Sorulan Sorular</h2>
                    <p className="text-gray-600">Merak ettiklerinizin cevaplarını burada bulabilirsiniz</p>
                </div>
                <div className="space-y-4">
                    {data.faq.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <button
                                onClick={() => toggleAccordion(idx)}
                                className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-800 hover:bg-gradient-to-r hover:from-[#12985a]/5 hover:to-transparent transition-all duration-300"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-2xl">{activeAccordion === idx ? '❓' : '💡'}</span>
                                    {item.q}
                                </span>
                                <span className={`transform transition-all duration-500 text-[#12985a] text-xl ${activeAccordion === idx ? 'rotate-180 scale-125' : ''}`}>
                                    ▼
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ${activeAccordion === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 text-gray-700 border-t border-gray-100 bg-gradient-to-b from-[#12985a]/5 to-transparent leading-relaxed">
                                    ✅ {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="bg-gradient-to-r from-[#103e6a] via-[#12985a] to-[#103e6a] py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="text-6xl mb-6 animate-bounce-slow">🤲</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">İyiliğe Vesile Olun</h2>
                    <p className="text-gray-100 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Allah rızası için yapacağınız bağışlar, ihtiyaç sahiplerinin yüzünde tebessüm olsun.
                        Haydi, bugün bir iyilik yapın! 💚
                    </p>
                    <Link
                        to={data.donationLink}
                        className="inline-flex items-center gap-3 bg-white text-[#103e6a] hover:bg-gray-100 font-bold py-5 px-14 rounded-full transition-all transform hover:scale-110 shadow-2xl text-lg group"
                    >
                        <span>BAĞIŞ YAP</span>
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
