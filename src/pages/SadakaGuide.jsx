import { useEffect } from 'react';

export default function SadakaGuide() {
    useEffect(() => {
        document.title = 'Sadaka Nedir? - İyilik Adımı';
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Sadaka Nedir?</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Maddi ve manevi her türlü iyiliği kapsayan sadaka ibadeti hakkında bilmeniz gerekenler.
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
                            Sadakanın Tanımı
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Sadaka, kelime olarak "doğruluk" (sıdk) kökünden gelir ve Allah’a olan sadakatin bir göstergesi olarak, yalnızca O'nun rızasını kazanmak amacıyla yapılan her türlü maddi ve manevi iyiliği ifade eder. Sadaka sadece para ile değil, güler yüzle, güzel sözle ve bir başkasının işini kolaylaştırmakla da verilebilir.
                        </p>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Importance */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#103e6a] mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#12985a]/10 flex items-center justify-center text-[#12985a]">02</span>
                            Sadakanın Fazileti
                        </h2>
                        <div className="bg-[#103e6a]/5 rounded-xl p-6 border-l-4 border-[#103e6a] mb-6">
                            <p className="italic text-gray-700 font-medium">
                                "Sadaka belayı defeder ve ömrü uzatır."
                                <span className="block mt-2 text-sm text-[#103e6a] not-italic font-bold">- Hadis-i Şerif</span>
                            </p>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Sadaka, malı eksiltmez bilakis bereketlendirir. İnsanı hırstan ve dünya sevgisinin aşırılığından korur. Kardeşlik bağlarını güçlendirir ve toplumsal dayanışmayı artırır.
                        </p>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Types */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#103e6a] mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#12985a]/10 flex items-center justify-center text-[#12985a]">03</span>
                            Sadaka Çeşitleri
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            İslam'da sadaka çok geniş bir kavramdır ve çeşitli şekillerde yerine getirilebilir:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <span className="text-2xl">💧</span>
                                <div>
                                    <strong className="block text-[#103e6a]">Sadaka-i Cariye</strong>
                                    <span className="text-sm">Öldükten sonra da sevabı devam eden kalıcı hayırlar (cami, çeşme, okul yaptırmak gibi).</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <span className="text-2xl">🍞</span>
                                <div>
                                    <strong className="block text-[#103e6a]">Maddi Sadaka</strong>
                                    <span className="text-sm">İhtiyaç sahiplerine para, gıda veya eşya yardımı yapmak.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <span className="text-2xl">😊</span>
                                <div>
                                    <strong className="block text-[#103e6a]">Manevi Sadaka</strong>
                                    <span className="text-sm">Güler yüz göstermek, selam vermek, ilim öğretmek, hasta ziyareti yapmak.</span>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <div className="bg-[#12985a] rounded-xl p-8 text-center text-white mt-8">
                        <h3 className="text-2xl font-bold mb-4">Bir İyilik Yapın, Sadaka Olsun</h3>
                        <p className="mb-6 text-white/90">
                            Küçük bir yardım bile bir başkasının hayatında büyük bir umut olabilir.
                        </p>
                        <a href="/bagislar" className="inline-block bg-white text-[#12985a] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                            Sadaka Bağışı Yap
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
