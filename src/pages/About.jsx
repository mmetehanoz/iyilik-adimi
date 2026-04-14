import { useEffect } from 'react';
import hakkimizdaImg from '../assets/images/hakkimizda.webp';

export default function About() {
    useEffect(() => {
        document.title = 'Hakkımızda - İyilik Adımı';
    }, []);

    const countries = [
        { name: 'Türkiye', flag: '\ud83c\uddf9\ud83c\uddf7' },
        { name: 'Gazze', flag: '\ud83c\uddf5\ud83c\uddf8' },
        { name: 'Yemen', flag: '\ud83c\uddfe\ud83c\uddea' },
        { name: 'Sudan', flag: '\ud83c\uddf8\ud83c\udde9' },
        { name: 'Banglade\u015f', flag: '\ud83c\udde7\ud83c\udde9' },
        { name: 'Afganistan', flag: '\ud83c\udde6\ud83c\uddeb' },
        { name: 'Tanzanya', flag: '\ud83c\uddf9\ud83c\uddff' },
        { name: 'Endonezya', flag: '\ud83c\uddee\ud83c\udde9' },
        { name: 'Gambia', flag: '\ud83c\uddec\ud83c\uddf2' },
        { name: '\u00c7ad', flag: '\ud83c\uddf9\ud83c\udde9' },
        { name: 'Somali', flag: '\ud83c\uddf8\ud83c\uddf4' },
    ];
    const mottoWords = ['D\u00fcnyan\u0131n', 'her', 'yerinde', 'iyilik', 'ad\u0131mlar\u0131yla', 'mazlum', 'g\u00f6n\u00fcllere', 'umut', 've', '\u0131\u015f\u0131k', 'oluyoruz.'];

    const serviceAreas = [
        { country: 'Türkiye', areas: ['Eğitim', 'Acil Yardım'] },
        { country: 'Somali', areas: ['Su Kuyusu', 'Gıda'] },
        { country: 'Gazze', areas: ['Acil İnsani Yardım', 'Sağlık'] },
        { country: 'Afganistan', areas: ['Eğitim', 'Giyim'] },
        { country: 'Bangladeş', areas: ['Su Kuyusu', 'Barınma'] },
        { country: 'Yemen', areas: ['Gıda', 'Sağlık'] },
    ];

    const documents = [
        { title: 'Faaliyet Belgesi', date: '2024', size: '0.5 MB', file: '/faaliyet_belgesi.pdf' },
        { title: 'Dernek Sorgulama', date: '2024', size: '0.1 MB', file: '/dernek_sorgulama.pdf' },
        { title: 'Marka Tescil', date: '2024', size: '14 MB', file: '/marka_tescil.pdf' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pt-20">
            {/* Hero Section */}
            <div className="relative py-20 bg-[#103e6a] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#12985a]/20 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#12985a]/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#12985a]/20 border border-[#12985a]/50 text-[#12985a] font-bold text-sm mb-4 backdrop-blur-sm">
                        HAKKIMIZDA
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Her Adımda İyilik</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        İyilik Adımı Derneği, insan onurunu merkeze alan, samimiyeti ve sürekliliği esas kabul eden bir sivil toplum kuruluşudur.
                    </p>
                </div>
            </div>

            {/* Main Content & Mission/Vision */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Main Text */}
                        <div className="lg:w-7/12 space-y-12">
                            {/* Intro with Drop Cap & Highlight */}
                            <div className="relative">
                                <h2 className="text-3xl lg:text-4xl font-bold text-[#103e6a] mb-6 flex items-center gap-3">
                                    <span className="w-2 h-10 bg-[#12985a] rounded-r-full"></span>
                                    Bizim İçin İyilik...
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed font-light">
                                    <span className="text-6xl float-left mr-3 mt-[-10px] text-[#12985a] font-serif">İ</span>
                                    yilik Adımı Derneği, <span className="font-semibold text-[#103e6a]">"Her Adımda İyilik"</span> mottosuyla yola çıkmış; insan onurunu merkeze alan, samimiyeti ve sürekliliği esas kabul eden bir sivil toplum kuruluşudur.
                                </p>
                            </div>

                            {/* Philosophy Box */}
                            <div className="bg-[#103e6a]/5 rounded-2xl p-8 border-l-4 border-[#103e6a] relative group transition-all duration-300 hover:bg-[#103e6a]/10">
                                <div className="absolute top-4 right-4 text-[#103e6a]/10 group-hover:text-[#103e6a]/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                </div>
                                <h3 className="font-bold text-[#103e6a] text-lg mb-3">Emanet Bilinci</h3>
                                <p className="text-gray-700 italic leading-relaxed relative z-10">
                                    "Derneğimiz, <span className="bg-white/50 px-1 rounded shadow-sm text-[#12985a] not-italic font-semibold">insanın insana emanet olduğu</span> inancıyla hareket eder.
                                    İyiliğin büyük bütçelerden önce; samimiyetle atılan küçük ama istikrarlı adımlarla büyüdüğüne inanır."
                                </p>
                            </div>

                            {/* Impact Areas Grid */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12l-1.667 9.167a2 2 0 01-1.99 1.833H7.657a2 2 0 01-1.99-1.833L4 12m16 0V8a4 4 0 10-8 0v4m0-4h.01M4 12b0-1.1.9-2 2-2h12a2 2 0 012 2v0" /></svg>
                                    </div>
                                    <p className="text-sm text-gray-600">Kurak topraklarda susuzluğa çare olan bir damla su.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
                                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-sm text-gray-600">Bir yetimin gözlerinde beliren tebessüm.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-sm text-gray-600">Yeryüzünün dört bir yanında iyiliğin izi.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-sm text-gray-600">İyiliği geçici değil, kalıcı kılmak.</p>
                                </div>
                            </div>

                            {/* Additional Text Blocks */}
                            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                                <p>
                                    Biz, yardımı yukarıdan aşağı bir ilişki olarak görmeyiz. İyilik Adımı Derneği için esas olan;
                                    <span className="text-[#103e6a] font-medium ml-1">birlikte yürümek, birlikte güçlenmek ve kimseyi geride bırakmamaktır.</span>
                                </p>
                                <p>
                                    İnanıyoruz ki iyilik büyük şeylerle başlamaz. Bazen bir avuç suyla, bazen içten bir tebessümle, bazen de fark edilmeyen küçük bir adımla başlar.
                                    Ama doğru yerden atılan her adım, dalga dalga büyür ve nice hayatlara dokunur.
                                </p>
                            </div>

                            {/* Closing Motto */}
                            <div className="text-center pt-8 border-t border-gray-100">
                                <p className="text-2xl font-bold text-[#103e6a] mb-2 font-serif">
                                    "İyilik çoğalır. İyilik iz bırakır."
                                </p>
                                <p className="text-[#12985a] font-medium">Ve iyilik, her adımda yeniden başlar.</p>
                            </div>
                        </div>

                        {/* Vision & Mission Side */}
                        <div className="lg:w-5/12 space-y-8">
                            {/* Vision */}
                            <div className="bg-gradient-to-br from-[#12985a]/10 to-transparent p-8 rounded-3xl border border-[#12985a]/20 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-[#103e6a] mb-4 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-[#12985a] rounded-full"></span>
                                    Vizyonumuz
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    İyiliğin dünyanın her köşesine ulaştığı adımlar atarak; dayanışmanın güçlendiği ve kimsenin kendini yalnız hissetmediği bir dünya inşa etmek.
                                    İnsanlığa umut veren, güvenilir ve sürdürülebilir yardım çalışmalarıyla örnek bir sivil toplum kuruluşu olmak.
                                </p>
                            </div>

                            {/* Mission */}
                            <div className="bg-gradient-to-br from-[#103e6a]/5 to-transparent p-8 rounded-3xl border border-[#103e6a]/10 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22M12 6l7.53 13H4.47" /></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-[#103e6a] mb-4 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-[#103e6a] rounded-full"></span>
                                    Misyonumuz
                                </h3>
                                <ul className="text-gray-700 leading-relaxed space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#12985a] mt-2 shrink-0"></div>
                                        <span>İhtiyaç sahiplerine din, dil, ırk ve coğrafya ayrımı gözetmeksizin ulaşmak.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#12985a] mt-2 shrink-0"></div>
                                        <span>Acil yardım ve sosyal destek projeleriyle insan hayatına dokunmak.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#12985a] mt-2 shrink-0"></div>
                                        <span>Kalıcı ve sürdürülebilir çözümler üreterek toplumsal dayanışmayı güçlendirmek.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#12985a] mt-2 shrink-0"></div>
                                        <span>Her adımda iyiliği çoğaltan, insanlığa fayda sağlayan projeler hayata geçirmek.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Section */}
            <div className="max-w-6xl mx-auto px-4 relative z-10 mb-24">
                <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-video bg-gray-900 border border-gray-100">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/ut22ViMc8x8"
                        title="İyilik Adımı Tanıtım Filmi"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>

            {/* History Timeline - Auto Scrolling */}
            <div className="py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                    <h2 className="text-4xl font-bold text-[#103e6a] mb-4">Tarihçemiz</h2>
                    <p className="text-gray-600">Dünyanın dört bir yanında iyilik adımları atıyoruz.</p>
                </div>

                {/* Scrolling timeline */}
                <div className="timeline-wrapper relative overflow-hidden">
                    {/* Connecting line */}
                    <div className="absolute top-[0.7rem] left-0 right-0 h-0.5 bg-gray-200 z-0"></div>

                    <div className="timeline-track flex" style={{ width: 'max-content' }}>
                        {[...countries, ...countries, ...countries].map((c, index) => (
                            <div key={index} className="timeline-item flex-shrink-0 relative group text-center">
                                {/* Dot */}
                                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-4 border-[#12985a] mx-auto mb-4 md:mb-6 relative z-10 group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>

                                {/* Big faded country name */}
                                <span className="block text-3xl md:text-6xl font-bold text-gray-200 mb-1 md:mb-4 group-hover:text-[#103e6a]/20 transition-colors duration-300">{c.name}</span>
                                {/* Flag only */}
                                <span className="text-2xl md:text-3xl">{c.flag}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Motto - scrolling reverse */}
                <div className="motto-wrapper mt-6 md:mt-10 overflow-hidden">
                    <div className="motto-track flex" style={{ width: 'max-content' }}>
                        {[...mottoWords, ...mottoWords, ...mottoWords, ...mottoWords, ...mottoWords, ...mottoWords].map((word, i) => (
                            <span key={i} className="inline-flex items-center mx-1.5 md:mx-3">
                                <span className="text-sm md:text-xl font-medium text-gray-400 italic">{word}</span>
                                {i % mottoWords.length !== mottoWords.length - 1 && (
                                    <span className="text-[#12985a] mx-1.5 md:mx-3 text-sm md:text-base">-</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                <style>{`
                    .timeline-item {
                        width: 200px;
                    }
                    @media (min-width: 768px) {
                        .timeline-item {
                            width: 350px;
                        }
                    }
                    @keyframes timeline-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-100% / 3)); }
                    }
                    @keyframes motto-scroll {
                        0% { transform: translateX(calc(-100% / 6)); }
                        100% { transform: translateX(0); }
                    }
                    .timeline-track {
                        animation: timeline-scroll 100s linear infinite;
                    }
                    .motto-track {
                        animation: motto-scroll 50s linear infinite;
                    }
                    .timeline-wrapper:hover .timeline-track,
                    .motto-wrapper:hover .motto-track {
                        animation-play-state: paused;
                    }
                `}</style>
            </div>

            {/* Service Areas */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <span className="text-[#12985a] font-bold tracking-wider text-sm">HİZMET AĞIMIZ</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#103e6a] mt-2 mb-6">Sınır Tanımayan İyilik</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Dünyanın dört bir yanında, dil, din, ırk ayrımı gözetmeksizin ihtiyaç sahiplerine ulaşıyoruz.
                                Acil yardımdan eğitime, su kuyularından kalıcı eserlere kadar geniş bir yelpazede hizmet veriyoruz.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {serviceAreas.map((area, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#12985a]/30 transition-colors hover:bg-[#12985a]/5 group">
                                        <h4 className="font-bold text-[#103e6a] group-hover:text-[#12985a] transition-colors">{area.country}</h4>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {area.areas.map(tag => (
                                                <span key={tag} className="text-xs bg-white text-gray-500 px-2 py-1 rounded border shadow-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute inset-0 bg-[#12985a]/10 rounded-full blur-[100px]"></div>
                            <img
                                src={hakkimizdaImg}
                                alt="Dünya Haritası Temsili"
                                className="relative z-10 w-full rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Official Documents */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#103e6a] mb-8 text-center">Resmi Belgelerimiz</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {documents.map((doc, idx) => (
                            <a
                                key={idx}
                                href={doc.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer group no-underline"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">{doc.size}</span>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#103e6a] transition-colors">{doc.title}</h3>
                                <p className="text-sm text-gray-400 mb-3">{doc.date}</p>
                                <div className="flex items-center gap-1 text-[#12985a] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    PDF Görüntüle
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
