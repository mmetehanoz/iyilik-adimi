import { useEffect } from 'react';

export default function About() {
    useEffect(() => {
        document.title = 'Hakkımızda - İyilik Adımı';
    }, []);

    const historyEvents = [
        { year: '1986', title: 'Kuruluş', description: 'İyilik yolculuğumuzun ilk adımları atıldı.' },
        { year: '1995', title: 'İlk Yurt Dışı Faaliyeti', description: 'Afrika kıtasında ilk insani yardım operasyonu.' },
        { year: '2005', title: 'Dernekleşme', description: 'Kurumsal yapıya geçerek faaliyet alanlarımızı genişlettik.' },
        { year: '2015', title: '1 Milyon Kişiye Ulaştık', description: 'Global ölçekte yardımlarımız 1 milyon ihtiyaç sahibine ulaştı.' },
        { year: '2024', title: 'Geleceğe Umut', description: 'Teknoloji ve insanlığı birleştirerek büyümeye devam ediyoruz.' },
    ];

    const serviceAreas = [
        { country: 'Türkiye', areas: ['Eğitim', 'Acil Yardım'] },
        { country: 'Somali', areas: ['Su Kuyusu', 'Gıda'] },
        { country: 'Gazze', areas: ['Acil İnsani Yardım', 'Sağlık'] },
        { country: 'Afganistan', areas: ['Eğitim', 'Giyim'] },
        { country: 'Bangladeş', areas: ['Su Kuyusu', 'Barınma'] },
        { country: 'Yemen', areas: ['Gıda', 'Sağlık'] },
    ];

    const documents = [
        { title: 'Dernek Tüzüğü', date: '2023', size: '1.2 MB' },
        { title: 'Faaliyet Raporu 2023', date: '2023', size: '4.5 MB' },
        { title: 'Vergi Muafiyet Belgesi', date: '2015', size: '0.8 MB' },
        { title: 'Stratejik Plan', date: '2024-2029', size: '2.1 MB' },
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
                        BİZ KİMİZ?
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">İyiliğin İzinde Bir Ömür</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Mazlum coğrafyalarda umut olmak, ihtiyaç sahiplerine el uzatmak ve dünyayı iyilikle sarmak için yola çıktık.
                    </p>
                </div>
            </div>

            {/* Video Section */}
            <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 mb-24">
                <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-video bg-gray-900 group cursor-pointer hover:scale-[1.01] transition-transform duration-500">
                    <img
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop"
                        alt="Tanıtım Filmi"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300 border border-white/50">
                            <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white text-2xl font-bold">Tanıtım Filmi</h3>
                        <p className="text-gray-300">Hikayemizi ve vizyonumuzu izleyin.</p>
                    </div>
                </div>
            </div>

            {/* History Timeline */}
            <div className="py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                    <h2 className="text-4xl font-bold text-[#103e6a] mb-4">Tarihçemiz</h2>
                    <p className="text-gray-600">1986'dan bugüne uzanan iyilik yolculuğumuz.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className="relative flex flex-col md:flex-row justify-between items-start gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[2.2rem] left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>

                        {historyEvents.map((event, index) => (
                            <div key={index} className="flex-1 relative group w-full md:w-auto flex md:block items-start gap-4 md:gap-0">
                                {/* Dot */}
                                <div className="w-6 h-6 rounded-full bg-white border-4 border-[#12985a] md:mx-auto mb-6 shrink-0 relative z-10 group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>

                                {/* Connecting Line (Mobile) */}
                                {index !== historyEvents.length - 1 && (
                                    <div className="md:hidden absolute left-[11px] top-6 bottom-[-2rem] w-0.5 bg-gray-200"></div>
                                )}

                                <div className="text-left md:text-center pt-1 md:pt-0">
                                    <span className="block text-5xl md:text-6xl font-bold text-gray-200 mb-2 md:mb-4 group-hover:text-[#103e6a]/20 transition-colors duration-300">{event.year}</span>
                                    <h3 className="text-lg font-bold text-[#103e6a] mb-1">{event.title}</h3>
                                    <p className="text-sm text-gray-500 max-w-[200px] md:mx-auto">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
                                src="https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=1200&auto=format&fit=crop"
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
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {documents.map((doc, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200group cursor-pointer group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">{doc.size}</span>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#103e6a] transition-colors">{doc.title}</h3>
                                <p className="text-sm text-gray-400">{doc.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
