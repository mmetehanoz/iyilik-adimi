import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const guideContent = {
    zekat: {
        title: "ZEKAT: Malın Bereket Kapısı",
        heroImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600&auto=format&fit=crop",
        description: "Zekat, İslam'ın beş şartından biridir. Malın temizlenmesi, şükrü ve artmasıdır. Paylaştıkça çoğalan bir berekettir.",
        cards: [
            { title: "KİMLER ZEKAT VERİR?", content: "Akıl sağlığı yerinde, ergenlik çağına girmiş ve temel ihtiyaçlarının dışında 'Nisab Miktarı' (yaklaşık 80.18 gr altın veya değeri) mala sahip olan her Müslüman zekat vermekle yükümlüdür." },
            { title: "NE ZAMAN VERİLİR?", content: "Nisab miktarı mala sahip olduktan sonra üzerinden tam bir kameri yıl (354 gün) geçmesi gerekir. Ramazan ayı, sevabının katlanması sebebiyle zekat için en çok tercih edilen vakittir." },
            { title: "NE KADAR VERİLİR?", content: "Sahip olunan nakit para, altın, döviz ve ticaret mallarının toplam değerinin %2.5'i (kırkta biri) zekat olarak hesaplanır ve ihtiyaç sahiplerine ulaştırılır." }
        ],
        faq: [
            { q: "Zekat Kimlere Verilebilir?", a: "Kur'an-ı Kerim'de belirtildiği üzere (Tevbe, 60): Fakirler, miskinler, borçlular, yolda kalmışlar, Allah yolundakiler ve kalpleri İslam'a ısındırılacak olanlara verilir." },
            { q: "Akrabaya Zekat Verilir mi?", a: "Kişi; annesine, babasına, dedesine, ninesine, eşine, çocuklarına ve torunlarına zekat veremez. Bunların dışındaki ihtiyaç sahibi kardeş, hala, dayı, teyze gibi akrabalara zekat vermek daha faziletlidir." },
            { q: "Zekat Hesaplaması Nasıl Yapılır?", a: "Elinizdeki tüm birikimlerin (altın, döviz, TL) güncel değerini toplayıp, varsa borçlarınızı düştükten sonra kalan miktarın 1/40'ını (yüzde 2.5) zekat olarak vermelisiniz." },
            { q: "Vergi Zekat Yerine Geçer mi?", a: "Hayır, vergi bir vatandaşlık görevi, zekat ise dini bir ibadettir. Biri diğerinin yerine geçmez." }
        ],
        donationLink: "/bagislar"
    },
    sadaka: {
        title: "Sadaka: İyiliğin En Güzel Hali",
        heroImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600&auto=format&fit=crop",
        description: "Sadaka, belaları def eder ve ömrü uzatır. Az veya çok demeden yapılan her iyilik bir sadakadır.",
        cards: [
            { title: "Sadaka Nedir?", content: "Allah rızası için ihtiyaç sahiplerine yapılan her türlü maddi ve manevi yardımdır. Sadece para ile değil, tebessümle bile olur." },
            { title: "Çeşitleri Nelerdir?", content: "Nafile sadaka, fıtır sadakası (fitre) ve sadaka-i cariye (kalıcı iyilik) gibi çeşitleri vardır." },
            { title: "Fazileti", content: "'Az sadaka çok belayı def eder' hadis-i şerifiyle önemine dikkat çekilmiştir." }
        ],
        faq: [
            { q: "Sadaka-i Cariye nedir?", a: "Kişi öldükten sonra da sevabı devam eden (cami, çeşme, okul yaptırmak gibi) sadakadır." },
            { q: "Sadaka kime verilmez?", a: "Zengin olanlara sadaka verilmez. Ancak hediyeleşmek sünnettir." }
        ],
        donationLink: "/bagislar"
    },
    fitre: {
        title: "FİTRE: Ramazan'ın Şükrü",
        heroImage: "https://images.unsplash.com/photo-1615743454746-17b5f54117b9?q=80&w=1600&auto=format&fit=crop",
        description: "Fitre (Fıtır Sadakası), Ramazan ayına kavuşmanın ve bayrama ulaşmanın bir şükrü olarak verilen, yoksulların bayram sevincine ortak olmayı sağlayan bir sadakadır.",
        cards: [
            { title: "FİTRE NEDİR?", content: "Ramazan Bayramı'na kavuşan ve temel ihtiyaçlarının dışında belli bir miktar mala sahip olan Müslümanların, kendileri ve bakmakla yükümlü oldukları kişiler için vermesi vacip olan sadakadır." },
            { title: "2024 FİTRE MİKTARI", content: "Diyanet İşleri Başkanlığı tarafından belirlenen miktar, bir kişinin bir günlük asgari gıda ihtiyacını karşılayacak tutardır. Bu miktar asgari sınırdır, durumu iyi olanların daha fazla vermesi tavsiye edilir." },
            { title: "NE ZAMAN ÖDENMELİ?", content: "Ramazan ayı içerisinde verilmesi gerekir. En faziletli olanı, bayram namazından önce verilmesidir ki ihtiyaç sahipleri de bayrama hazırlıklı girebilsin." }
        ],
        faq: [
            { q: "Fitre Kimler İçin Verilir?", a: "Aile reisi, kendisi ve bakmakla yükümlü olduğu (ergenlik çağına girmemiş) çocukları için fitre verir." },
            { q: "Öğrenciye Fitre Verilir mi?", a: "Evet, durumu olmayan ve zekat alabilecek sınıfta bulunan öğrencilere fitre verilebilir. Bu, onların eğitimine destek olması bakımından da güzeldir." },
            { q: "Fitre Bayramdan Sonraya Kalırsa?", a: "Fitrenin bayram namazından önce verilmesi esastır. Eğer unutulursa veya imkan olmazsa, bayramdan sonra da 'kaza' niyetiyle değil, yine fitre niyetiyle mutlaka verilmelidir." }
        ],
        donationLink: "/bagislar"
    },
    adak: {
        title: "Adak (Nezir) Kurbanı",
        heroImage: "https://images.unsplash.com/photo-1561731671-5f05b0a33e38?q=80&w=1600&auto=format&fit=crop", // Sheep layout
        description: "Allah'a verilen bir sözün yerine getirilmesidir. Bir dileğin gerçekleşmesine bağlanan ibadet.",
        cards: [
            { title: "Adak Nedir?", content: "Kişinin dinen yükümlü olmadığı halde, farz veya vacip cinsinden bir ibadeti yapacağına dair Allah'a söz vermesidir." },
            { title: "Şartları", content: "Adağın yerine getirilmesi için dileğin gerçekleşmesi gerekir. Gerçekleşince bekletmeden kesilmesi vaciptir." },
            { title: "Kimler Yiyemez?", content: "Adak sahibinin kendisi, eşi, çocukları, torunları, anne ve babası adak etinden yiyemez. Tamamı dağıtılmalıdır." }
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
    const data = guideContent[type] || guideContent.zekat; // Default to zekat if type unknown

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-20">
            {/* Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <img src={data.heroImage} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="relative z-20 text-center text-white px-4 max-w-4xl">
                    <span className="uppercase tracking-[0.2em] text-[#12985a] font-bold text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-4 inline-block border border-white/20">
                        BAĞIŞ REHBERİ
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{data.title}</h1>
                    <p className="text-lg md:text-xl text-gray-200">{data.description}</p>
                </div>
            </div>

            {/* Content Cards */}
            <div className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-30">
                <div className="grid md:grid-cols-3 gap-8">
                    {data.cards.map((card, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-[#12985a]">
                            <h3 className="text-xl font-bold text-[#103e6a] mb-4">{card.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{card.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto px-4 pb-20">
                <h2 className="text-3xl font-bold text-center text-[#103e6a] mb-12">Sıkça Sorulan Sorular</h2>
                <div className="space-y-4">
                    {data.faq.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleAccordion(idx)}
                                className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                            >
                                <span>{item.q}</span>
                                <span className={`transform transition-transform duration-300 ${activeAccordion === idx ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 text-gray-600 border-t border-gray-100 mt-2">
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#103e6a] py-16 text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">İyiliğe Vesile Olun</h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Allah rızası için yapacağınız bağışlar, ihtiyaç sahiplerinin yüzünde tebessüm olsun.
                    </p>
                    <Link
                        to={data.donationLink}
                        className="inline-block bg-[#12985a] hover:bg-[#0e7a48] text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-lg"
                    >
                        BAĞIŞ YAP
                    </Link>
                </div>
            </div>
        </div>
    );
}
