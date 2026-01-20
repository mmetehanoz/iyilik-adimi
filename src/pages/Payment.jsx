import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

export default function Payment() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Modal States
    const [showMembershipModal, setShowMembershipModal] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardName: '',
        isAnonymous: false,
        isOnBehalf: false,
        onBehalfOfName: '',
        agreementsAccepted: false
    });

    // Pre-fill user data if logged in
    useEffect(() => {
        if (isAuthenticated && user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            }));
        }
    }, [isAuthenticated, user]);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !success) {
            navigate('/');
        }
    }, [cartItems, navigate, success]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        // Format: XXXX XXXX XXXX XXXX
        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setFormData(prev => ({ ...prev, cardNumber: formatted }));
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        // Format: MM/YY
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setFormData(prev => ({ ...prev, expiry: value }));
    };

    const handlePayment = (e) => {
        e.preventDefault();

        if (!formData.agreementsAccepted) {
            alert('Lütfen Üyelik Sözleşmesi ve Kişisel Veri Rıza Metnini onaylayın.');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            clearCart();
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-32">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Ödeme Başarılı!</h2>
                    <p className="text-gray-600 mb-8">
                        Bağışınız için teşekkür ederiz. Makbuzunuz e-posta adresinize gönderilecektir.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-[#12985a] text-white rounded-xl font-bold hover:bg-[#0e7a48] transition-colors"
                    >
                        Anasayfaya Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-[#103e6a] mb-8">Ödeme ve Bağış Tamamlama</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Donor Info Form */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-[#103e6a] text-white rounded-full flex items-center justify-center text-sm">1</span>
                                Bağışçı Bilgileri
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Ad Soyad</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all"
                                        placeholder="Adınız Soyadınız"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">E-posta</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all"
                                        placeholder="ornek@email.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Telefon</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all"
                                        placeholder="(5XX) XXX XX XX"
                                        required
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Adres</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all resize-none"
                                        placeholder="Adresiniz"
                                        required
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Şehir</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all"
                                        placeholder="Örn: İstanbul"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Donation Options */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-[#103e6a] text-white rounded-full flex items-center justify-center text-sm">2</span>
                                Bağış Seçenekleri
                            </h2>
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isAnonymous"
                                            checked={formData.isAnonymous}
                                            onChange={handleChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a]"
                                        />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">İsimsiz bağış yapmak istiyorum</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isOnBehalf"
                                            checked={formData.isOnBehalf}
                                            onChange={handleChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a]"
                                        />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Başkası adına bağış yapmak istiyorum</span>
                                </label>

                                {formData.isOnBehalf && (
                                    <div className="pl-8 animate-fade-in">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kimin Adına?</label>
                                        <input
                                            type="text"
                                            name="onBehalfOfName"
                                            value={formData.onBehalfOfName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all"
                                            placeholder="Ad Soyad"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-[#103e6a] text-white rounded-full flex items-center justify-center text-sm">3</span>
                                Ödeme Bilgileri
                            </h2>
                            <form id="payment-form" onSubmit={handlePayment} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all"
                                        placeholder="Metehan Öztürk"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Kart Numarası</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.cardNumber}
                                            onChange={handleCardNumberChange}
                                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all font-mono"
                                            placeholder="0000 0000 0000 0000"
                                            maxLength={19}
                                            required
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Son Kullanma Tarihi</label>
                                        <input
                                            type="text"
                                            value={formData.expiry}
                                            onChange={handleExpiryChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all text-center"
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all text-center"
                                            placeholder="123"
                                            maxLength={3}
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-32">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>

                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-3 text-sm">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                            {item.selectedOption && <p className="text-gray-500 text-xs">{item.selectedOption}</p>}
                                            <div className="flex justify-between mt-1 text-xs text-gray-600">
                                                <span>{item.quantity} Adet</span>
                                                <span className="font-bold">{new Intl.NumberFormat('tr-TR').format(item.price * item.quantity)} ₺</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Ara Toplam</span>
                                    <span>{new Intl.NumberFormat('tr-TR').format(cartTotal)} ₺</span>
                                </div>
                                <div className="flex justify-between text-[#103e6a] font-bold text-xl pt-2 border-t border-gray-50">
                                    <span>Toplam</span>
                                    <span>{new Intl.NumberFormat('tr-TR').format(cartTotal)} ₺</span>
                                </div>
                            </div>

                            <div className="mb-6 pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center mt-1">
                                        <input
                                            type="checkbox"
                                            name="agreementsAccepted"
                                            checked={formData.agreementsAccepted}
                                            onChange={handleChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a]"
                                            required
                                            form="payment-form"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 leading-tight group-hover:text-gray-900 transition-colors">
                                        <button type="button" onClick={() => setShowMembershipModal(true)} className="font-semibold text-[#12985a] hover:underline">
                                            Üyelik Sözleşmesi
                                        </button>
                                        'ni ve{' '}
                                        <button type="button" onClick={() => setShowConsentModal(true)} className="font-semibold text-[#12985a] hover:underline">
                                            Kişisel Veri Rıza Metni
                                        </button>
                                        'ni okudum ve kabul ediyorum.
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                form="payment-form"
                                disabled={loading}
                                className="w-full py-4 bg-[#103e6a] text-white rounded-xl font-bold hover:bg-[#0d3257] active:scale-[0.98] transition-all shadow-lg shadow-[#103e6a]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        İşleniyor...
                                    </>
                                ) : (
                                    <>
                                        <span>Ödemeyi Tamamla</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                isOpen={showMembershipModal}
                onClose={() => setShowMembershipModal(false)}
                title="Üyelik Sözleşmesi"
            >
                <div>
                    <h4 className="font-bold mb-2">1. Taraflar</h4>
                    <p className="mb-4">İşbu sözleşme İyilik Adımı ile Kullanıcı arasında akdedilmiştir...</p>
                    <h4 className="font-bold mb-2">2. Konu</h4>
                    <p className="mb-4">Sözleşmenin konusu, kullanıcının internet sitesinden faydalanma şartlarının belirlenmesidir.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </Modal>

            <Modal
                isOpen={showConsentModal}
                onClose={() => setShowConsentModal(false)}
                title="Kişisel Veri Rıza Metni"
            >
                <div>
                    <h4 className="font-bold mb-2">Kişisel Verilerin İşlenmesi</h4>
                    <p className="mb-4">6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca...</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </Modal>
        </div>
    );
}
