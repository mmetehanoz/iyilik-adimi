import { useEffect } from 'react';

export default function ZekatGuide() {
    useEffect(() => {
        document.title = 'Zekat Nedir? - İyilik Adımı';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen pt-20">
            {/* Hero Section */}
            <div className="relative py-20 bg-[#103e6a] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#12985a]/20 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#12985a]/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#12985a]/20 border border-[#12985a]/50 text-[#12985a] font-bold text-sm mb-4 backdrop-blur-sm">
                        BAĞIŞ REHBERİ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Zekat Nedir?</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        İslam'ın beş şartından biri olan zekat ibadeti hakkında bilmeniz gereken her şey.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">

                    {/* Definition */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#103e6a] mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#12985a]/10 flex items-center justify-center text-[#12985a]">01</span>
                            Zekatın Tanımı
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Zekat, İslam'ın beş temel şartından biri olup, zenginlik ölçüsü kabul edilen miktarda (nisap) malı olan Müslümanların, Allah rızası için mallarının belirli bir bölümünü (genellikle kırkta bir, yani %2.5) ihtiyaç sahiplerine vermesidir. Kelime anlamı olarak "artma, çoğalma, arınma ve bereket" manalarına gelir.
                        </p>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Importance */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#103e6a] mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#12985a]/10 flex items-center justify-center text-[#12985a]">02</span>
                            Zekatın Önemi
                        </h2>
                        <div className="bg-[#103e6a]/5 rounded-xl p-6 border-l-4 border-[#103e6a] mb-6">
                            <p className="italic text-gray-700 font-medium">
                                "Namazı kılın, zekâtı verin. Önceden kendiniz için ne hayır yaparsanız onu Allah katında bulursunuz. Şüphesiz Allah yaptıklarınızı görmektedir."
                                <span className="block mt-2 text-sm text-[#103e6a] not-italic font-bold">- Bakara Suresi, 110. Ayet</span>
                            </p>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Zekat, sosyal yardımlaşma ve dayanışmanın en güzel örneğidir. Zengin ile fakir arasındaki uçurumu azaltır, kalplerdeki cimrilik hastalığını temizler ve malı bereketlendirir. Toplumsal huzurun ve barışın teminatıdır.
                        </p>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Conditions */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#103e6a] mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#12985a]/10 flex items-center justify-center text-[#12985a]">03</span>
                            Kimlere Zekat Verilir?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Kuran-ı Kerim'de (Tevbe Suresi, 60. ayet) zekatın kimlere verileceği açıkça belirtilmiştir:
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-3">
                            {[
                                'Yoksullar ve düşkünler',
                                'Borçlular',
                                'Yolda kalmışlar',
                                'Özgürlüğünü yitirmiş olanlar',
                                'Kalbi İslam’a ısındırılacaklar',
                                'Allah yolunda olanlar',
                                'Zekat memurları'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <svg className="w-5 h-5 text-[#12985a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="bg-[#12985a] rounded-xl p-8 text-center text-white mt-8">
                        <h3 className="text-2xl font-bold mb-4">Zekatınızı Hemen Ulaştırın</h3>
                        <p className="mb-6 text-white/90">
                            İyilik Adımı Derneği olarak zekatlarınızı gerçek ihtiyaç sahiplerine güvenle ulaştırıyoruz.
                        </p>
                        <a href="/bagislar" className="inline-block bg-white text-[#12985a] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                            Zekat Bağışı Yap
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
