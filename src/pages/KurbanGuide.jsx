import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import kurbanHeroBg from '../assets/kurban-hero-bg.webp';
import kurban1 from '../assets/kurban-1.webp';
import kurban2 from '../assets/kurban-2.webp';
import kurban3 from '../assets/kurban-3.webp';

const sections = [
    {
        number: '01',
        title: 'VACİP KURBAN: İBADETİNİZ, ONLARIN BAYRAMI OLSUN',
        content: (
            <>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Kurban bayramı günlerinde ibadet niyetiyle kesilen kurbandır. Zenginlik nisabına malik olan her Müslüman için vacip olan bu ibadet, paylaşmanın en somut halidir.
                </p>
                <div className="bg-[#103e6a]/5 rounded-xl p-5 border-l-4 border-[#103e6a] mb-4">
                    <p className="text-gray-700 font-medium">
                        <strong className="text-[#103e6a]">Vekalet Yoluyla Kesim:</strong> Bağışladığınız vacip kurbanlar, bayram namazının ardından İslami usullere göre kesilir.
                    </p>
                </div>
                <p className="text-gray-600 leading-relaxed mb-3">
                    <strong className="text-[#103e6a]">Nerelere Ulaştırıyoruz?</strong>
                </p>
                <p className="text-gray-600 leading-relaxed mb-3">
                    Başta Gazze ve Afrika olmak üzere, açlık ve krizle mücadele eden bölgelerdeki gerçek ihtiyaç sahiplerine, yetim ailelerine ve dul annelere ulaştırılır.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    <strong className="text-[#103e6a]">Bilgilendirme:</strong> Kurbanınız kesildiğinde tarafınıza SMS ile bilgi verilir; kesim videoları ve görselleri sistemimiz aracılığıyla sizlere ulaştırılır ve tam şeffaflık sağlanır.
                </p>
            </>
        ),
    },
    {
        number: '02',
        title: 'ADAK KURBANI: SÖZÜNÜZÜ İYİLİĞE DÖNÜŞTÜRÜN',
        content: (
            <>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Bir işin gerçekleşmesi veya bir dileğin kabulü şartına bağlı olarak Allah'a adanan kurbandır. Kişinin kendisine vacip kıldığı bu söz, ihtiyaç sahipleri için bir bayram müjdesine dönüşür.
                </p>
                <div className="bg-[#103e6a]/5 rounded-xl p-5 border-l-4 border-[#103e6a] mb-4">
                    <p className="text-gray-700 font-medium">
                        <strong className="text-[#103e6a]">Hükmü:</strong> Adak kurbanının etinden, kurbanı adayan kişi ve bakmakla yükümlü olduğu (anne, baba, çocuk vb.) kimseler yiyemez. Bu nedenle etin tamamı derneğimiz aracılığıyla muhtaçlara dağıtılır.
                    </p>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    <strong className="text-[#103e6a]">Kesim Takvimi:</strong> Yılın 365 günü vekaletiniz alınarak kesim gerçekleştirilir. Kesim ve dağıtım görüntüleri sizlere iletilir. Dilendiği takdirde yemekli dağıtım organizasyonu da gerçekleştirilebilir.
                </p>
            </>
        ),
    },
    {
        number: '03',
        title: 'AKİKA KURBANI: YENİ BİR NEFES İÇİN ŞÜKÜR',
        content: (
            <>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Yeni doğan çocuk için Allah'a şükretmek amacıyla kesilen kurbandır. Peygamber Efendimiz'in (s.a.v) sünneti olan bu ibadet, evladınızın ömrüne bereket, bir mazlumun sofrasına et olur.
                </p>
                <div className="bg-[#103e6a]/5 rounded-xl p-5 border-l-4 border-[#103e6a] mb-4">
                    <p className="text-gray-700 font-medium">
                        <strong className="text-[#103e6a]">Geleceğe İyilik:</strong> Evladınızın adına atılan bu ilk iyilik adımı, dünyanın öbür ucundaki bir yetimin duasına karışır.
                    </p>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    <strong className="text-[#103e6a]">Kesim Takvimi:</strong> Yılın 365 günü vekaletiniz alınarak kesim gerçekleştirilir. Kesim ve dağıtım görüntüleri sizlere iletilir. Dilendiği takdirde yemekli dağıtım organizasyonu da gerçekleştirilebilir.
                </p>
            </>
        ),
    },
    {
        number: '04',
        title: 'ŞÜKÜR KURBANI: NİMETLERİN ŞÜKRÜ PAYLAŞTIKÇA ARTAR',
        content: (
            <>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Herhangi bir vesileyle (yeni bir ev, iş, kaza beladan kurtulma vb.) Allah'ın verdiği nimetlere teşekkür etmek amacıyla kesilen kurbandır.
                </p>
                <div className="bg-[#103e6a]/5 rounded-xl p-5 border-l-4 border-[#103e6a]">
                    <p className="italic text-gray-700 font-medium">
                        "Şükrederseniz nimetimi artırırım"
                        <span className="block mt-1 text-sm text-[#103e6a] not-italic font-bold">— İbrahim Suresi, 7. Ayet</span>
                    </p>
                </div>
                <p className="text-gray-600 leading-relaxed mt-4">
                    <strong className="text-[#103e6a]">Bereket Kapısı:</strong> Bu ayet-i kerimeye uygun olarak, şükrünüzü ihtiyaç sahipleriyle paylaşıp bereketinizi artırabilirsiniz.
                </p>
            </>
        ),
    },
];

const neden = [
    {
        icon: '🎬',
        title: 'Tam Şeffaflık',
        desc: 'Kesim ve dağıtım videolarınızı isminizin okunduğu an ile birlikte sizlere ulaştırıyoruz.',
    },
    {
        icon: '🕌',
        title: 'İslami Hassasiyet',
        desc: 'Hayvanların seçiminden kesim usulüne kadar tüm süreçte fıkhi kurallara titizlikle uyuyoruz.',
    },
    {
        icon: '📍',
        title: 'Bölgesel İhtiyaç',
        desc: 'Bağışlarınızı "en çok ihtiyaç duyulan" bölgelere yönlendirerek, yardımın gerçek yerini bulmasını sağlıyoruz.',
    },
    {
        icon: '📲',
        title: 'Hızlı Bilgilendirme',
        desc: 'Vekalet alımından dağıtım aşamasına kadar her adımda WhatsApp, SMS ve e-posta ile sizi bilgilendiriyoruz.',
    },
];

const faqs = [
    {
        q: 'Vekalet Nasıl Verilir?',
        a: 'Online bağış panelimizde "Vekalet veriyorum" kutucuğunu işaretleyerek veya telefonla bize ulaşarak vekaletinizi kolayca verebilirsiniz.',
    },
    {
        q: 'Hangi Hayvanlar Kesilir?',
        a: 'Kurban olma vasıflarını (yaş, sağlık durumu vb.) eksiksiz taşıyan büyükbaş ve küçükbaş hayvanlar seçilir. Büyükbaş hayvanlarda 7 hisseye kadar ortaklık yapılarak kesim gerçekleştirilir.',
    },
];

export default function KurbanGuide() {
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        document.title = 'Kurban Nedir? - İyilik Adımı';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen pt-20">
            {/* Hero Section */}
            <div className="relative py-20 text-white overflow-hidden">
                <img src={kurbanHeroBg} alt="Kurban" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#103e6a]/75"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#12985a]/20 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#12985a]/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#12985a]/20 border border-[#12985a]/50 text-[#12985a] font-bold text-sm mb-4 backdrop-blur-sm">
                        BAĞIŞ REHBERİ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        KURBAN REHBERİ
                    </h1>
                    <p className="text-lg font-semibold text-[#12985a] mb-6">
                        İYİLİKTE PAYDAŞ, KARDEŞLİKTE BİRİZ
                    </p>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Kurban, sadece bir kan akıtmak değil; Hz. İbrahim'in sadakati, Hz. İsmail'in teslimiyeti ve Rabbimize yakınlaşma (kurbiyet) arzusudur. İyilik Adımı Derneği olarak, kurban emanetlerinizi İslami hassasiyetlere tam riayet ederek, dünyanın en mahzun coğrafyalarında bizleri bekleyen mazlumların sofralarına ulaştırıyoruz.
                    </p>
                </div>
            </div>

            {/* Kurban Types */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">
                    {sections.map((sec, i) => {
            const sectionImages = [kurban1, kurban2, kurban3];
            const sectionImg = sectionImages[i] || null;
            return (
                <div key={i}>
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-[#103e6a] mb-4 flex items-start gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#12985a]/10 flex items-center justify-center text-[#12985a] shrink-0 mt-0.5 text-sm">
                                {sec.number}
                            </span>
                            {sec.title}
                        </h2>
                        {sectionImg && (
                            <div className="ml-11 mb-5 rounded-xl overflow-hidden shadow-md">
                                <img src={sectionImg} alt={sec.title} className="w-full h-56 object-cover" />
                            </div>
                        )}
                        <div className="ml-11">
                            {sec.content}
                        </div>
                    </section>
                    {i < sections.length - 1 && <hr className="border-gray-100" />}
                </div>
            );
        })}
                </div>
            </div>

            {/* Neden İyilik Adımı */}
            <div className="bg-[#103e6a] py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">
                        NEDEN İYİLİK ADIMI İLE KURBAN BAĞIŞI?
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {neden.map((item, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <p className="text-[#12985a] font-bold text-lg italic mb-6">
                            "Her Adımda İyilik" sloganımızla, kurban emanetinizi sadece bir gıda yardımı olarak değil, kardeşlik köprüsü olarak taşıyoruz.
                        </p>
                        <Link
                            to="/bagislar?kategori=kurban"
                            className="inline-block bg-[#12985a] text-white px-10 py-3 rounded-full font-bold hover:bg-[#12985a]/90 transition-colors shadow-lg"
                        >
                            Kurban Bağışı Yap 🐑
                        </Link>
                    </div>
                </div>
            </div>

            {/* SSS */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-[#103e6a] mb-8 text-center">Sıkça Sorulan Sorular</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`border-l-4 pl-6 py-2 transition-all duration-300 cursor-pointer ${openFaq === i ? 'border-[#12985a] bg-gray-50/50' : 'border-gray-200 hover:border-[#12985a]/50'}`}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <div className="flex justify-between items-center gap-4">
                                    <h4 className={`text-base font-bold transition-colors ${openFaq === i ? 'text-[#103e6a]' : 'text-gray-700'}`}>
                                        {faq.q}
                                    </h4>
                                    <span className={`text-2xl font-light text-[#12985a] transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </div>
                                <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
