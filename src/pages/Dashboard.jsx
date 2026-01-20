import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('summary');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'summary':
                return <SummarySection />;
            case 'donations':
                return <DonationsSection />;
            case 'receipts':
                return <ReceiptsSection />;
            case 'settings':
                return <SettingsSection />;
            default:
                return <SummarySection />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-[#103e6a] text-white">
                                <h3 className="font-bold text-lg">Metehan Öztürk</h3>
                                <p className="text-sm opacity-80">Üye No: 190724</p>
                            </div>
                            <nav className="flex flex-col p-2">
                                <SidebarItem
                                    active={activeTab === 'summary'}
                                    onClick={() => setActiveTab('summary')}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>}
                                    text="Hesap Özeti"
                                />
                                <SidebarItem
                                    active={activeTab === 'donations'}
                                    onClick={() => setActiveTab('donations')}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" /></svg>}
                                    text="Son Bağışlar"
                                />
                                <SidebarItem
                                    active={activeTab === 'receipts'}
                                    onClick={() => setActiveTab('receipts')}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>}
                                    text="PDF Makbuzlarım"
                                />
                                <SidebarItem
                                    active={activeTab === 'settings'}
                                    onClick={() => setActiveTab('settings')}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.756.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" /></svg>}
                                    text="Hesap Ayarları"
                                />
                            </nav>
                            <div className="p-4 border-t border-gray-100 mt-auto">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" /></svg>
                                    Çıkış Yap
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ active, icon, text, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-left ${active ? 'bg-[#12985a]/10 text-[#12985a]' : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            {icon}
            {text}
        </button>
    );
}

function SummarySection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">Hesap Özeti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SummaryCard title="Toplam Bağış" value="4.250 TL" color="bg-blue-50 text-blue-700" />
                <SummaryCard title="Son Bağış" value="250 TL" color="bg-green-50 text-green-700" />
                <SummaryCard title="Desteklenen Proje" value="8" color="bg-purple-50 text-purple-700" />
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-4">Son Hareketler</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Tarih</th>
                            <th className="px-4 py-3">Bağış Tipi</th>
                            <th className="px-4 py-3">Tutar</th>
                            <th className="px-4 py-3 rounded-tr-lg">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                            <td className="px-4 py-3">15.01.2024</td>
                            <td className="px-4 py-3 font-medium text-[#103e6a]">Genel Bağış</td>
                            <td className="px-4 py-3">500 TL</td>
                            <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700">Tamamlandı</span></td>
                        </tr>
                        <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                            <td className="px-4 py-3">02.01.2024</td>
                            <td className="px-4 py-3 font-medium text-[#103e6a]">Su Kuyusu</td>
                            <td className="px-4 py-3">3000 TL</td>
                            <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700">Tamamlandı</span></td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                            <td className="px-4 py-3">12.12.2023</td>
                            <td className="px-4 py-3 font-medium text-[#103e6a]">Zekat</td>
                            <td className="px-4 py-3">750 TL</td>
                            <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700">Tamamlandı</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SummaryCard({ title, value, color }) {
    return (
        <div className={`p-6 rounded-xl ${color}`}>
            <p className="text-sm opacity-80 mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
}

function DonationsSection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">Son Bağışlar</h2>
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left">
                    <thead className="bg-[#103e6a] text-white text-sm">
                        <tr>
                            <th className="px-6 py-4">Tarih</th>
                            <th className="px-6 py-4">Bağış Tipi / Proje</th>
                            <th className="px-6 py-4">Ödeme Yöntemi</th>
                            <th className="px-6 py-4">Tutar</th>
                            <th className="px-6 py-4">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                        {/* Mock Data */}
                        {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-500">1{item}.01.2024</td>
                                <td className="px-6 py-4 font-medium text-[#103e6a]">Genel Bağış Desteği</td>
                                <td className="px-6 py-4 text-gray-500">Kredi Kartı</td>
                                <td className="px-6 py-4 font-bold text-gray-700">{item * 150} TL</td>
                                <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Başarılı</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ReceiptsSection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">PDF Makbuzlarım</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#12985a] hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Bağış Makbuzu #{2024000 + item}</p>
                                <p className="text-xs text-gray-500">1{item}.01.2024</p>
                            </div>
                        </div>
                        <button className="text-[#12985a] font-medium text-sm flex items-center gap-1 group-hover:underline">
                            İndir
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SettingsSection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">Hesap Ayarları</h2>
            <form className="max-w-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                        <input type="text" defaultValue="Metehan Öztürk" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                        <input type="text" defaultValue="+90 (532) 236 57 97" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a]" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-Posta Adresi</label>
                        <input type="email" defaultValue="metehan@example.com" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a]" />
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-[#103e6a] mb-4">Şifre Değiştir</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre</label>
                            <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                            <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a]" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button className="rounded-full bg-[#12985a] px-8 py-3 font-bold text-white transition-all hover:bg-[#0e7a48] hover:shadow-lg">
                        Değişiklikleri Kaydet
                    </button>
                </div>
            </form>
        </div>
    );
}
