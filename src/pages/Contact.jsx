import { useEffect, useState } from 'react';

export default function Contact() {
    useEffect(() => {
        document.title = 'İletişim - İyilik Adımı';
        window.scrollTo(0, 0);
    }, []);

    const [formStatus, setFormStatus] = useState(null); // null, 'submitting', 'success', 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormStatus('success');
            e.target.reset();
        }, 1500);
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-20">
            {/* Hero Section */}
            <div className="relative py-20 bg-[#103e6a] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#12985a]/20 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#12985a]/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Bize Ulaşın</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Sorularınız, görüşleriniz veya bağışlarınızla ilgili her konuda bize yazabilirsiniz.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

                    {/* Left Column: Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">İletişim Bilgileri</h2>
                            <p className="text-gray-600 mb-8">
                                Derneğimizle ilgili her türlü konuda aşağıdaki kanallardan bize ulaşabilir veya formu doldurabilirsiniz.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#12985a]/10 flex items-center justify-center shrink-0">
                                        <span className="text-2xl">📍</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Adres</h3>
                                        <p className="text-gray-600 mt-1">
                                            Yukarı Dudullu Mah. Katibim Sk.<br />
                                            No:1 D:1 Ümraniye / İstanbul
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#12985a]/10 flex items-center justify-center shrink-0">
                                        <span className="text-2xl">📧</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">E-Posta</h3>
                                        <a href="mailto:info@iyilikadimi.org.tr" className="text-gray-600 mt-1 block hover:text-[#12985a]">
                                            info@iyilikadimi.org.tr
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#12985a]/10 flex items-center justify-center shrink-0">
                                        <span className="text-2xl">☎️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Telefon</h3>
                                        <a href="tel:+905555555555" className="text-gray-600 mt-1 block hover:text-[#12985a]">
                                            +90 (555) 555 55 55
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="h-64 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.610264627038!2d29.1729052!3d41.0166014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabbd2f5a6a6a3%3A0x6b0a0a0a0a0a0a0a!2sYukar%C4%B1%20Dudullu%2C%20Katibim%20Sk.%20No%3A1%2C%2034775%20%C3%9Cmraniye%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Column: Submission Form */}
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-[#103e6a] mb-6">İletişim Formu</h2>

                        {formStatus === 'success' ? (
                            <div className="bg-green-100 text-green-700 p-6 rounded-xl flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                                <span className="text-6xl mb-4">✅</span>
                                <h3 className="font-bold text-xl mb-2">Mesajınız Alındı!</h3>
                                <p>En kısa sürede size dönüş yapacağız.</p>
                                <button onClick={() => setFormStatus(null)} className="mt-6 text-sm underline hover:text-green-800">
                                    Yeni Mesaj Gönder
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#12985a] focus:ring-2 focus:ring-[#12985a]/20 outline-none transition-all"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Posta Adresiniz</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#12985a] focus:ring-2 focus:ring-[#12985a]/20 outline-none transition-all"
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon Numaranız</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#12985a] focus:ring-2 focus:ring-[#12985a]/20 outline-none transition-all"
                                        placeholder="05XX XXX XX XX"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#12985a] focus:ring-2 focus:ring-[#12985a]/20 outline-none transition-all resize-none"
                                        placeholder="Mesajınızı buraya yazınız..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full bg-[#103e6a] text-white font-bold py-4 rounded-xl hover:bg-[#0c2f50] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {formStatus === 'submitting' ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Gönderiliyor...
                                        </>
                                    ) : (
                                        'Gönder'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
