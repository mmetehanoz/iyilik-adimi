import React from 'react';
import bgImage from '../assets/services-bg.jpg';
import service1 from '../assets/service-1.jpg';
import service2 from '../assets/service-2.jpg';
import service3 from '../assets/service-3.jpg';
import testimonyImg from '../assets/testimony.jpg';
import RecentDonations from './RecentDonations';

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

            {/* Recent Donations Section */}
            <div className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-4">
                    <RecentDonations />
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
