import React, { useState } from 'react';
import bgImage from '../assets/services-bg.jpg';
import service1 from '../assets/service-1.jpg';
import service2 from '../assets/service-2.jpg';
import service3 from '../assets/service-3.jpg';
import testimonyImg from '../assets/testimony.jpg';
import RecentDonations from './RecentDonations';


export default function Services() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Bağışlarım gerçekten ihtiyaç sahiplerine ulaşıyor mu?",
            answer: "Evet. İyilik Adımı Derneği olarak bağış süreçlerimizi şeffaflık ve hesap verebilirlik ilkeleri doğrultusunda yürütüyoruz. Yapılan bağışlar, belirlenen proje ve yardım alanları kapsamında doğrudan ihtiyaç sahiplerine ulaştırılmakta, süreçler düzenli olarak takip edilmektedir. Talep eden bağışçılarımıza, yardım faaliyetlerine ilişkin fotoğraf ve video paylaşımları yapılmaktadır."
        },
        {
            question: "Yardımlar hangi bölgelerde yapılıyor?",
            answer: "Yardımlarımız; ihtiyaç tespitine göre yurt içinde ve yurt dışında, dünyanın farklı coğrafyalarında gerçekleştirilmektedir. İhtiyacın olduğu her yerde, imkânlarımız dâhilinde iyiliğin izini sürmeye devam ediyoruz."
        },
        {
            question: "Derneğiniz siyasi ya da ideolojik bir yapıya bağlı mı?",
            answer: "Hayır. İyilik Adımı Derneği, hiçbir siyasi veya ideolojik yapıya bağlı değildir. Tüm çalışmalarını yalnızca insani değerler ve yardım ilkeleri doğrultusunda yürütür."
        },
        {
            question: "Derneğiniz denetleniyor mu?",
            answer: "Evet. İyilik Adımı Derneği, ilgili mevzuatlar kapsamında resmi kurumlar tarafından denetlenmektedir. Mali ve idari süreçler, yasal çerçevede yürütülür."
        },
        {
            question: "Yardım ulaştırılan kişiler nasıl belirleniyor?",
            answer: "İhtiyaç sahipleri; yerel gözlemler, saha ekipleri, güvenilir yerel paydaşlar ve başvurular doğrultusunda titizlikle belirlenir. Öncelik, acil ve gerçek ihtiyaç durumlarına verilir."
        }
    ];

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

                        {/* Left List - FAQ */}
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black text-[#103e6a] mb-8">
                                SIKÇA SORULAN SORULAR
                            </h3>

                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`border-l-4 pl-6 py-2 transition-all duration-300 cursor-pointer ${openIndex === index
                                                ? 'border-[#12985a] bg-gray-50/50'
                                                : 'border-gray-200 hover:border-[#12985a]/50'
                                            }`}
                                        onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                    >
                                        <div className="flex justify-between items-center group">
                                            <h4 className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-[#103e6a]' : 'text-gray-700 group-hover:text-[#103e6a]'
                                                }`}>
                                                {faq.question}
                                            </h4>
                                            <span className={`text-2xl font-light text-[#12985a] transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                                                +
                                            </span>
                                        </div>

                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <img src={testimonyImg} alt="Çocuğumuz" className="h-[600px] w-full object-cover rounded-lg shadow-xl grayscale transition-all hover:grayscale-0" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
