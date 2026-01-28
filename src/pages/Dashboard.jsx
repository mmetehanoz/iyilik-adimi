import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('summary');
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const response = await api.getUserDashboard();
                if (response.success) {
                    setDashboardData(response.data);
                } else {
                    setError('Veriler yüklenemedi.');
                }
            } catch (err) {
                setError('Dashboard verileri alınırken bir sunucu hatası oluştu.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const renderContent = () => {
        if (isLoading) return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#103e6a]"></div>
            </div>
        );

        if (error) return (
            <div className="text-center py-20">
                <p className="text-red-500 font-medium mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-[#103e6a] underline"
                >
                    Tekrar Dene
                </button>
            </div>
        );

        switch (activeTab) {
            case 'summary':
                return <SummarySection data={dashboardData} />;
            case 'donations':
                return <DonationsSection />;
            case 'receipts':
                return <ReceiptsSection data={dashboardData} />;
            case 'settings':
                return <SettingsSection user={user} />;
            default:
                return <SummarySection data={dashboardData} />;
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
                                <h3 className="font-bold text-lg">{user?.name || 'Kullanıcı'}</h3>
                                <p className="text-sm opacity-80">{user?.email}</p>
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

function SummarySection({ data }) {
    const stats = data?.stats || {};
    const recentDonations = data?.recent_donations || [];

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">Hesap Özeti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SummaryCard
                    title="Toplam Bağış"
                    value={stats.total_amount_formatted || '0.00 TL'}
                    color="bg-blue-50 text-blue-700"
                />
                <SummaryCard
                    title="Bağış Adedi"
                    value={stats.total_donations || '0'}
                    color="bg-green-50 text-green-700"
                />
                <SummaryCard
                    title="Aktif Hisseler"
                    value={stats.active_shares || '0'}
                    color="bg-purple-50 text-purple-700"
                />
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
                        {recentDonations.length > 0 ? (
                            recentDonations.map((donation) => (
                                <tr key={donation.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="px-4 py-3">
                                        {new Date(donation.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-[#103e6a]">
                                        {donation.donation_title}
                                    </td>
                                    <td className="px-4 py-3">
                                        {donation.formatted_amount}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${donation.payment_status === 'completed' || donation.payment_status === 'success'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {donation.payment_status === 'completed' || donation.payment_status === 'success' ? 'Tamamlandı' : 'Beklemede'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-8 text-center text-gray-500 italic">
                                    Henüz bir bağış hareketiniz bulunmuyor.
                                </td>
                            </tr>
                        )}
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
    const [donations, setDonations] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchDonations = async () => {
            setIsLoading(true);
            try {
                const response = await api.getUserDonations({ page });
                if (response.success) {
                    setDonations(response.data.donations);
                    setPagination(response.data.pagination);
                }
            } catch (err) {
                console.error("Bağışlar yüklenirken hata:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDonations();
    }, [page]);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">Bağış Geçmişi</h2>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#12985a]"></div>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto border border-gray-100 rounded-xl mb-6">
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
                                {donations.length > 0 ? (
                                    donations.map((donation) => (
                                        <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-gray-500">
                                                {new Date(donation.created_at).toLocaleDateString('tr-TR')}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-[#103e6a]">
                                                {donation.donation_title}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {donation.payment_gateway || 'Kredi Kartı'}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-700">
                                                {donation.formatted_amount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${donation.payment_status === 'completed' || donation.payment_status === 'success'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {donation.payment_status === 'completed' || donation.payment_status === 'success' ? 'Başarılı' : 'Beklemede'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                                            Bağış kaydı bulunamadı.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.page_count > 1 && (
                        <div className="flex justify-center gap-2">
                            {[...Array(pagination.page_count)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-all ${page === i + 1
                                        ? 'bg-[#103e6a] text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

function ReceiptsSection({ data }) {
    const receipts = data?.recent_pdfs || [];

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">PDF Makbuzlarım</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {receipts.length > 0 ? (
                    receipts.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#12985a] hover:shadow-sm transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{item.title || `Makbuz #${index + 1}`}</p>
                                    <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString('tr-TR')}</p>
                                </div>
                            </div>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#12985a] font-medium text-sm flex items-center gap-1 group-hover:underline"
                            >
                                İndir
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="md:col-span-2 text-center py-12 text-gray-500 italic bg-gray-50 rounded-xl">
                        Henüz oluşturulmuş bir makbuzunuz bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    );
}

function SettingsSection({ user }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Yeni şifreler eşleşmiyor.' });
            return;
        }

        setIsLoading(true);
        try {
            await api.changePassword({
                old_password: oldPassword,
                new_password: newPassword,
                new_password2: confirmPassword
            });
            setMessage({ type: 'success', text: 'Şifreniz başarıyla güncellendi.' });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Şifre değiştirilirken bir hata oluştu.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#103e6a] mb-6">Hesap Ayarları</h2>

            {message.text && (
                <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="max-w-2xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-gray-100">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                        <input type="text" readOnly value={user?.name || ''} className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 outline-none text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-Posta Adresi</label>
                        <input type="email" readOnly value={user?.email || ''} className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 outline-none text-gray-500 cursor-not-allowed" />
                    </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#103e6a]">Şifre Değiştir</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mevcut Şifre</label>
                        <input
                            type="password"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre</label>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-full bg-[#12985a] px-8 py-3 font-bold text-white transition-all hover:bg-[#0e7a48] hover:shadow-lg disabled:opacity-50"
                        >
                            {isLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
