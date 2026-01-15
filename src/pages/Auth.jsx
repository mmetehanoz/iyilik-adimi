import { useState } from 'react';

export default function Auth() {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
            <div className="mx-auto max-w-lg">
                <div className="flex rounded-full bg-white p-1 mb-8 shadow-sm border border-gray-100">
                    <button
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 rounded-full py-3 text-sm font-bold transition-all ${activeTab === 'login'
                                ? 'bg-[#103e6a] text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        GİRİŞ YAP
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`flex-1 rounded-full py-3 text-sm font-bold transition-all ${activeTab === 'register'
                                ? 'bg-[#12985a] text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        ÜYE OL
                    </button>
                </div>

                {/* Login Section */}
                {activeTab === 'login' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 animate-fade-in">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-[#103e6a] mb-2">Giriş Yap</h2>
                            <p className="text-gray-500">Mevcut hesabınızla giriş yapın.</p>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">E-Posta Adresi</label>
                                <input
                                    type="email"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                    placeholder="ornek@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                                <input
                                    type="password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a]" />
                                    <span className="text-sm text-gray-600">Beni Hatırla</span>
                                </label>
                                <a href="#" className="text-sm font-medium text-[#12985a] hover:underline">Şifremi Unuttum</a>
                            </div>

                            <button className="w-full rounded-full bg-[#103e6a] py-4 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
                                GİRİŞ YAP
                            </button>
                        </form>
                    </div>
                )}

                {/* Register Section */}
                {activeTab === 'register' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 animate-fade-in">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-[#12985a] mb-2">Üye Ol</h2>
                            <p className="text-gray-500">Yeni bir hesap oluşturun ve iyilik hareketine katılın.</p>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cep Telefonu</label>
                                <input
                                    type="tel"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                    placeholder="05XX XXX XX XX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">E-Posta Adresi</label>
                                <input
                                    type="email"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                    placeholder="ornek@email.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                                    <input
                                        type="password"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Şifre Tekrar</label>
                                    <input
                                        type="password"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a] mt-0.5" />
                                    </div>
                                    <span className="text-sm text-gray-600 leading-tight group-hover:text-gray-900 transition-colors">
                                        <a href="#" className="font-semibold text-[#12985a] hover:underline">Üyelik Sözleşmesi</a>'ni ve <a href="#" className="font-semibold text-[#12985a] hover:underline">Kişisel Rıza Metni</a>'ni okudum, onaylıyorum.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a] mt-0.5" />
                                    </div>
                                    <span className="text-sm text-gray-600 leading-tight group-hover:text-gray-900 transition-colors">
                                        Kampanya ve duyurulardan e-posta ve SMS yoluyla haberdar olmak istiyorum.
                                    </span>
                                </label>
                            </div>

                            <button className="w-full rounded-full bg-[#12985a] py-4 font-bold text-white transition-all hover:bg-[#0e7a48] hover:shadow-lg mt-4">
                                ÜYE OL
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
