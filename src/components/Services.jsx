import React from 'react';
import bgImage from '../assets/services-bg.jpg';
import service1 from '../assets/service-1.jpg';
import service2 from '../assets/service-2.jpg';
import service3 from '../assets/service-3.jpg';
import testimonyImg from '../assets/testimony.jpg';

export default function Services() {
    return (
        <section id="bagis-rehberi">
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
                        TÜM HİZMETLERİMİZ
                    </h2>
                    <p className="mb-8 text-lg font-medium text-white/90">
                        Bağışlarınızla ihtiyaç sahiplerine umut, çocuklara gelecek, ailelere huzur taşıyoruz.
                        Her yardım bir iyilik adımıdır.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="rounded-full bg-[#103e6a] px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:opacity-90">
                            BAŞVUR
                        </button>
                        <button className="rounded-full border-2 border-[#103e6a] bg-transparent px-8 py-3 text-sm font-bold text-white transition-transform hover:bg-[#103e6a] hover:scale-105">
                            İLETİŞİM
                        </button>
                    </div>
                </div>
            </div>

            {/* Pricing/Support Cards */}
            <div className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Card 1: Monthly Help */}
                        <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="h-64 overflow-hidden">
                                <img src={service1} alt="Aylık Destek" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="p-8 text-center">
                                <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">AYLIK DESTEK</h4>
                                <div className="mb-1 flex justify-center text-[#12985a]">
                                    <span className="text-5xl font-black">150</span>
                                    <span className="mt-2 text-xl font-bold">₺</span>
                                </div>
                                <p className="mb-6 text-sm font-bold text-gray-400">/ ÇOCUK</p>

                                <ul className="mb-8 space-y-3 text-left text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Eğitim ve kırtasiye desteği
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Sağlık taramaları
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Düzenli gıda yardımı
                                    </li>
                                </ul>

                                <button className="w-full rounded-full bg-[#103e6a] px-6 py-3 text-xs font-bold text-white transition-colors hover:opacity-90">
                                    DAHA FAZLA
                                </button>
                            </div>
                        </div>

                        {/* Card 2: Annual Help (Highlighted) */}
                        <div className="group relative -mt-4 overflow-hidden rounded-xl bg-[#103e6a] text-white shadow-2xl ring-4 ring-[#103e6a]/20 transition-all hover:-translate-y-1 lg:-mt-8">
                            <div className="h-64 overflow-hidden opacity-90">
                                <img src={service2} alt="Yıllık Destek" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="p-8 text-center">
                                <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-white/70">YILLIK DESTEK</h4>
                                <div className="mb-1 flex justify-center text-white">
                                    <span className="text-5xl font-black">1800</span>
                                    <span className="mt-2 text-xl font-bold">₺</span>
                                </div>
                                <p className="mb-6 text-sm font-bold text-white/50">/ AİLE</p>

                                <ul className="mb-8 space-y-3 text-left text-sm text-white/80">
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Kira ve yakacak yardımı
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Giyim ve eşya desteği
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Acil durum fonu
                                    </li>
                                </ul>

                                <button className="w-full rounded-full bg-white px-6 py-3 text-xs font-bold text-[#103e6a] transition-colors hover:bg-gray-100">
                                    BAĞIŞ YAP
                                </button>
                            </div>
                        </div>

                        {/* Card 3: One Time */}
                        <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="h-64 overflow-hidden">
                                <img src={service3} alt="Tek Seferlik" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="p-8 text-center">
                                <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">TEK SEFERLİK</h4>
                                <div className="mb-1 flex justify-center text-[#12985a]">
                                    <span className="text-5xl font-black">1650</span>
                                    <span className="mt-2 text-xl font-bold">₺</span>
                                </div>
                                <p className="mb-6 text-sm font-bold text-gray-400">/ OKUL</p>

                                <ul className="mb-8 space-y-3 text-left text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Tadilat ve onarım
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Kütüphane kurulumu
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#12985a]">✓</span> Su kuyusu açılışı
                                    </li>
                                </ul>

                                <button className="w-full rounded-full bg-[#103e6a] px-6 py-3 text-xs font-bold text-white transition-colors hover:opacity-90">
                                    İLETİŞİME GEÇ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features & Testimony */}
            <div className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

                        {/* Left List */}
                        <div className="space-y-12">
                            <div className="relative pl-8">
                                <span className="absolute left-0 top-0 text-xs font-bold text-gray-300">01</span>
                                <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-900">HASTANELER</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Bölgelerdeki sağlık hizmetlerine erişimi kolaylaştırmak için klinikler kuruyor,
                                    tıbbi malzeme ve ilaç desteği sağlıyoruz.
                                </p>
                                <div className="mt-4 h-px w-24 bg-gray-200" />
                            </div>

                            <div className="relative pl-8">
                                <span className="absolute left-0 top-0 text-xs font-bold text-gray-300">02</span>
                                <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-900">OKULLAR</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Eğitimden mahrum kalan çocuklar için köy okulları inşa ediyor,
                                    öğretmen ve materyal desteği veriyoruz.
                                </p>
                                <div className="mt-4 h-px w-24 bg-gray-200" />
                            </div>

                            <div className="relative pl-8">
                                <span className="absolute left-0 top-0 text-xs font-bold text-gray-300">03</span>
                                <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-900">SOSYAL DESTEK</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Yetimhaneler ve bakım evleri ile kimsesizlere sıcak bir yuva,
                                    psikolojik destek ve rehabilitasyon imkanı sunuyoruz.
                                </p>
                                <div className="mt-4 h-px w-24 bg-gray-200" />
                            </div>

                            <div className="relative pl-8">
                                <span className="absolute left-0 top-0 text-xs font-bold text-gray-300">04</span>
                                <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-900">ENTEGRASYON</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Meslek edindirme kursları ile ailelerin kendi ayakları üzerinde
                                    durmalarını sağlıyor, topluma katılımlarını destekliyoruz.
                                </p>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <img src={testimonyImg} alt="Çocuğumuz" className="h-[600px] w-full object-cover rounded-lg shadow-xl grayscale transition-all hover:grayscale-0" />

                            <div className="absolute -bottom-8 -right-8 flex h-40 w-40 flex-col items-center justify-center bg-[#fcd34d] p-4 text-center shadow-lg">
                                <span className="text-5xl font-black text-white">24</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">AKTİF PROJE</span>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">HİKAYELERİMİZ</h4>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
