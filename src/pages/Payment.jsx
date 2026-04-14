import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import { paymentCheckout, testCheckout } from '../services/api';

export default function Payment() {
    const { cartItems, cartTotal, clearCart } = useCart();

    const hasKurbanItems = cartItems.some(item =>
        item.donation_category?.toLowerCase().includes('kurban') ||
        item.form_data?.donation_type?.toLowerCase().includes('kurban')
    );
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const showToast = useToast();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null); // Sipariş no gösterimi için
    const [turnstileToken, setTurnstileToken] = useState(null);
    const turnstileRef = useRef(null);
    const paymentFormRef = useRef(null); // Banka formu için ref

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
        isAnonymous: false,
        isOnBehalf: false,
        onBehalfOfName: '',
        note: '',
        vekaletAccepted: false,
        agreementsAccepted: false,
        paymentProvider: 'vakif' // Default Vakıf Katılım
    });

    // Banka Formu State'i (Otomatik submit için)
    const [bankForm, setBankForm] = useState(null);

    // Pre-fill user data if logged in
    useEffect(() => {
        if (isAuthenticated && user) {
            setFormData(prev => ({
                ...prev,
                name: user.first_name ? `${user.first_name} ${user.last_name}` : (user.name || ''),
                email: user.email || '',
                phone: user.phone_number || user.phone || ''
            }));
        }
    }, [isAuthenticated, user]);

    // Turnstile Widget Implementation (Direct Render)
    useEffect(() => {
        let widgetId = null;
        let retryCount = 0;

        const renderTurnstile = () => {
            const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAACU3BgJDxn-xHO4P";

            // Script yüklendi mi ve ref hazır mı?
            if (window.turnstile && turnstileRef.current) {
                try {
                    turnstileRef.current.innerHTML = ''; // Temizle

                    // Render et ve direkt callback fonksiyonu ver
                    widgetId = window.turnstile.render(turnstileRef.current, {
                        sitekey: siteKey,
                        callback: (token) => {
                            console.log('✅ Turnstile Başarılı, Token:', token);
                            setTurnstileToken(token);
                        },
                        'expired-callback': () => {
                            console.warn('⚠️ Turnstile süresi doldu');
                            setTurnstileToken(null);
                        },
                        'error-callback': (err) => {
                            console.error('❌ Turnstile Hatası:', err);
                        },
                    });
                } catch (e) {
                    console.error('Turnstile render exception:', e);
                }
            } else if (retryCount < 20) {
                // Script yüklenmesini bekle (20 saniye kadar)
                retryCount++;
                setTimeout(renderTurnstile, 1000);
            }
        };

        renderTurnstile();

        // Cleanup
        return () => {
            if (widgetId && window.turnstile) {
                try {
                    window.turnstile.remove(widgetId);
                } catch (e) { }
            }
        };
    }, []);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !success) {
            navigate('/');
        }
    }, [cartItems, navigate, success]);

    // Banka formu oluştuğunda otomatik submit et
    useEffect(() => {
        if (bankForm && paymentFormRef.current) {
            console.log("🚀 Banka sayfasına yönlendiriliyor...", bankForm.url);
            paymentFormRef.current.submit();
        }
    }, [bankForm]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Sadece rakamlar

        // Eğer 0 ile başlıyorsa 0'ı kaldır (5XX formatı için)
        if (value.startsWith('0')) {
            value = value.substring(1);
        }

        if (value.length > 10) value = value.slice(0, 10); // Max 10 hane

        // Aşamalı formatlama
        if (value.length > 6) {
            // 5XX XXX XX XX formatı için
            // İlk 3 hane
            let formatted = value.slice(0, 3);
            // Sonraki 3
            formatted += ' ' + value.slice(3, 6);
            // Sonraki 2
            formatted += ' ' + value.slice(6, 8);
            // Varsa son 2
            if (value.length > 8) {
                formatted += ' ' + value.slice(8, 10);
            }
            value = formatted;
        } else if (value.length > 3) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        }

        setFormData(prev => ({ ...prev, phone: value }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!formData.agreementsAccepted) {
            showToast('Lütfen Üyelik Sözleşmesi ve Kişisel Veri Rıza Metnini onaylayın.', 'error');
            return;
        }

        if (hasKurbanItems && !formData.vekaletAccepted) {
            showToast('Kurban bağışı için vekâlet onayı zorunludur.', 'error');
            return;
        }

        // LOCALDE BYPASS:
        const isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');

        if (!turnstileToken && !isLocal) {
            showToast('Lütfen güvenlik doğrulamasını tamamlayın.', 'error');
            return;
        }

        // Backend'e gönderilecek token (Localde ise dummy)
        const tokenToSend = isLocal ? 'LOCAL_TEST_TOKEN' : turnstileToken;

        setLoading(true);

        try {
            // Backend'in beklediği format
            const checkoutData = {
                // CartItems zaten backend'de mevcut, sadece ekstra bilgileri gönderiyoruz
                contact_info: {
                    first_name: formData.name.split(' ')[0] || formData.name, // Ad
                    last_name: formData.name.split(' ').slice(1).join(' ') || '.', // Soyad (basit parse)
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    postal_code: '00000', // Frontend formda yoksa default
                    donate_on_behalf: formData.isOnBehalf,
                    behalf_person_name: formData.onBehalfOfName,
                    notes: formData.note,
                    vekalet_accepted: formData.vekaletAccepted
                },
                payment_provider: formData.paymentProvider,
                cf_turnstile_response: tokenToSend
            };

            // Test ödemesi (sanal pos bypass)
            if (formData.paymentProvider === 'test') {
                // Test için items listesi de gönderilmeli
                checkoutData.items = cartItems.map(item => ({
                    donation_id: item.donation?.id || item.id,
                    cin_ali_item_id: item.cin_ali_item?.id || item.cin_ali_item_id,
                    price: item.unit_amount || item.amount || 0,
                    quantity: item.quantity,
                    name: item.donation_title || item.donation?.title || item.name,
                    type: item.item_type || 'donation',
                    selected_country: item.selected_country,
                    donation_type: item.donation_type,
                    form_data: item.form_data || {}
                }));
                checkoutData.payment_method = 'test_skip';

                const response = await testCheckout(checkoutData);

                if (response.success) {
                    setSuccess(true);
                    setOrderNumber(response.order_number);
                    await clearCart(); // API üzerinden sepeti temizle
                    showToast('Bağışınız başarıyla alındı. Teşekkür ederiz!', 'success');
                } else {
                    showToast('Ödeme işleminde bir sorun oluştu: ' + (response.error || 'Bilinmeyen hata'), 'error');
                }
            }
            // Gerçek Ödeme Gateway (Vakıf Katılım / Ziraat vb.)
            else {
                const response = await paymentCheckout(checkoutData);

                if (response.success) {
                    // API 'form_data' ve 'gateway_url' dönecek
                    // Biz de bir form oluşturup submit edeceğiz
                    if (response.form_data && response.gateway_url) {
                        setBankForm({
                            url: response.gateway_url,
                            fields: response.form_data,
                            method: 'POST'
                        });
                    } else if (response.redirect_url) {
                        // Direkt redirect (varsa)
                        window.location.href = response.redirect_url;
                    } else {
                        showToast('Ödeme sağlayıcıdan geçersiz yanıt alındı.', 'error');
                    }
                } else {
                    showToast('Ödeme başlatılamadı: ' + (response.error || 'Bilinmeyen hata'), 'error');
                }
            }

        } catch (error) {
            console.error("Ödeme hatası:", error);
            showToast('Ödeme işleminde bir hata oluştu: ' + (error.response?.data?.error || error.message), 'error');
            // Reset turnstile on failure
            if (window.turnstile) window.turnstile.reset();
        } finally {
            if (!bankForm) { // Eğer banka formuna setlendiyse loading kalmalı (redirect olacak)
                setLoading(false);
            }
        }
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
                    {orderNumber && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4 inline-block">
                            <span className="text-gray-500 text-sm">Sipariş No:</span>
                            <span className="text-[#103e6a] font-bold ml-2 text-lg">{orderNumber}</span>
                        </div>
                    )}
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

    // Görünmez Banka Formu Render
    if (bankForm) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#103e6a] mb-4"></div>
                <h2 className="text-xl font-bold text-[#103e6a] mb-2">Güvenli Ödeme Sayfasına Yönlendiriliyorsunuz...</h2>
                <p className="text-gray-600">Lütfen bekleyiniz, banka sayfasına aktarılıyorsunuz.</p>

                <form
                    ref={paymentFormRef}
                    action={bankForm.url}
                    method={bankForm.method || "POST"}
                    style={{ display: 'none' }}
                >
                    {Object.entries(bankForm.fields).map(([key, value]) => (
                        <input key={key} type="hidden" name={key} value={value} />
                    ))}
                </form>
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
                                        onChange={handlePhoneChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all"
                                        placeholder="5XX XXX XX XX"
                                        maxLength={13}
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

                                {hasKurbanItems && (
                                    <div className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="relative flex items-center mt-0.5">
                                                <input
                                                    type="checkbox"
                                                    name="vekaletAccepted"
                                                    checked={formData.vekaletAccepted}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                                                />
                                            </div>
                                            <span className="text-sm text-amber-900 leading-snug group-hover:text-amber-950 transition-colors">
                                                <span className="font-semibold">Kurban Vekâleti: </span>
                                                Sepetimde bulunan kurban bağışları için kurbanımın usulüne uygun kesilmesi, dağıtılması ve gerekli işlemlerin yapılması konusunda derneğinize <strong>vekâlet veriyorum</strong>.
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notunuz (Opsiyonel)</label>
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#103e6a] focus:ring-2 focus:ring-[#103e6a]/20 outline-none transition-all resize-none"
                                    placeholder="Bağışınızla ilgili eklemek istediğiniz bir not varsa buraya yazabilirsiniz..."
                                />
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-[#103e6a] text-white rounded-full flex items-center justify-center text-sm">3</span>
                                Ödeme Yöntemi
                            </h2>

                            <form id="payment-form" onSubmit={handlePayment} className="space-y-4">

                                {/* Payment Provider Selection */}
                                <div className="space-y-3 mb-4">
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Banka Seçimi</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        <label className={`
                                            cursor-pointer rounded-xl border-2 p-3 flex items-center gap-3 transition-all
                                            ${formData.paymentProvider === 'vakif' ? 'border-[#103e6a] bg-blue-50' : 'border-gray-100 hover:border-gray-200'}
                                        `}>
                                            <input
                                                type="radio"
                                                name="paymentProvider"
                                                value="vakif"
                                                checked={formData.paymentProvider === 'vakif'}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                                                {formData.paymentProvider === 'vakif' && <div className="w-3 h-3 bg-[#103e6a] rounded-full"></div>}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-[#103e6a]">Vakıf Katılım</div>
                                                <div className="text-xs text-gray-500">Güvenli Ödeme</div>
                                            </div>
                                        </label>

                                        {/* Geliştirme ortamında test seçeneği */}
                                        {(window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) && (
                                            <label className={`
                                                cursor-pointer rounded-xl border-2 p-3 flex items-center gap-3 transition-all
                                                ${formData.paymentProvider === 'test' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}
                                            `}>
                                                <input
                                                    type="radio"
                                                    name="paymentProvider"
                                                    value="test"
                                                    checked={formData.paymentProvider === 'test'}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                                                    {formData.paymentProvider === 'test' && <div className="w-3 h-3 bg-orange-500 rounded-full"></div>}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-orange-700">Test Ödemesi</div>
                                                    <div className="text-xs text-gray-500">Kartsız Devam Et</div>
                                                </div>
                                            </label>
                                        )}
                                    </div>

                                    <div className="mt-4 p-4 bg-blue-50 text-[#103e6a] rounded-lg text-sm border border-blue-100">
                                        <div className="flex items-start gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p>
                                                "Ödemeyi Tamamla" butonuna tıkladıktan sonra bankanın <strong>3D Güvenli Ödeme</strong> sayfasına yönlendirileceksiniz. Kart bilgilerinizi o sayfada gireceksiniz.
                                            </p>
                                        </div>
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
                                {cartItems.map((item, index) => {
                                    const donationImage = item.donation?.image || item.donation_image || item.cin_ali_item?.image;
                                    const donationTitle = item.donation?.title || item.donation_title || item.cin_ali_item?.name;
                                    const unitPrice = item.unit_amount || item.amount || 0;

                                    return (
                                        <div key={index} className="flex gap-3 text-sm">
                                            {donationImage && (
                                                <img src={donationImage} alt={donationTitle} className="w-12 h-12 object-cover rounded-md" />
                                            )}
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 line-clamp-2">{donationTitle}</p>
                                                {item.form_data?.selected_country && <p className="text-gray-500 text-xs">{item.form_data.selected_country}</p>}
                                                <div className="flex justify-between mt-1 text-xs text-gray-600">
                                                    <span>{item.quantity} Adet</span>
                                                    <span className="font-bold">{new Intl.NumberFormat('tr-TR').format(unitPrice * item.quantity)} ₺</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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

                            {/* Cloudflare Turnstile */}
                            {/* LOCALDE KAPALI: Sadece production'da göster */}
                            {!window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1') && (
                                <div className="mb-6">
                                    <p className="text-xs text-gray-400 text-center mb-2">Güvenlik Doğrulaması</p>
                                    <div className="flex justify-center min-h-[65px] border border-dashed border-gray-200 rounded-lg p-2 bg-gray-50/50">
                                        <div ref={turnstileRef}></div>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                form="payment-form"
                                disabled={loading || (!turnstileToken && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1'))}
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
                <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                    <h4 className="font-bold text-[#103e6a]">İYİLİK ADIMI ULUSLARARASI İNSANİ YARDIM DERNEĞİ</h4>
                    <h4 className="font-bold text-[#103e6a]">ÜYELİK VE KULLANIM KOŞULLARI</h4>

                    <div>
                        <h5 className="font-bold mb-1">1. TARAFLAR</h5>
                        <p>Bu sözleşme, İyilik Adımı Uluslararası İnsani Yardım Derneği ile siteye üye olan kullanıcı ("Üye") arasında akdedilmiştir.</p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">2. ÜYELİK ŞARTLARI</h5>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Üye, verdiği bilgilerin doğru ve güncel olduğunu kabul eder.</li>
                            <li>Yanlış veya eksik bilgi verilmesi halinde Dernek üyeliği askıya alma veya sonlandırma hakkına sahiptir.</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">3. KULLANIM KOŞULLARI</h5>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Site yalnızca hukuka uygun amaçlarla kullanılabilir.</li>
                            <li>Üye, başkalarının haklarını ihlal edecek davranışlarda bulunamaz.</li>
                            <li>Dernek, site içeriğinde değişiklik yapma hakkını saklı tutar.</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">4. BAĞIŞ VE İŞLEMLER</h5>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Yapılan bağışlar ilgili mevzuat kapsamında değerlendirilir.</li>
                            <li>Üye, bağış işlemlerinin kendi rızasıyla gerçekleştiğini kabul eder.</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">5. FİKRİ MÜLKİYET</h5>
                        <p>Site içeriği, tasarım, logo ve tüm materyaller Derneğe aittir ve izinsiz kullanılamaz.</p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">6. SORUMLULUK SINIRI</h5>
                        <p>Dernek, teknik aksaklıklar veya üçüncü taraf hizmetlerden kaynaklı kesintilerden sorumlu değildir.</p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">7. SÖZLEŞME DEĞİŞİKLİĞİ</h5>
                        <p>Dernek, sözleşme koşullarını güncelleme hakkını saklı tutar.</p>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={showConsentModal}
                onClose={() => setShowConsentModal(false)}
                title="Kişisel Veri Rıza Metni"
            >
                <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                    <h4 className="font-bold text-[#103e6a]">İYİLİK ADIMI ULUSLARARASI İNSANİ YARDIM DERNEĞİ</h4>
                    <h4 className="font-bold text-[#103e6a]">KİŞİSEL VERİLERİN KORUNMASINA İLİŞKİN AYDINLATMA METNİ</h4>

                    <p>T.C. İstanbul Valiliği İl Sivil Toplumla İlişkiler Müdürlüğü'nün 10.04.2025 tarihli onayı ile 34-292-063 kütük numarası ile faaliyet gösteren İyilik Adımı Uluslararası İnsani Yardım Derneği ("Dernek") olarak; 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, üyelerimizin, gönüllülerimizin, bağışçılarımızın ve tüm paydaşlarımızın kişisel verilerinin korunmasına büyük önem vermekteyiz.</p>
                    <p>Derneğimiz, Veri Sorumlusu sıfatıyla; tarafımıza iletilen kişisel verilerin kaydedileceğini, saklanacağını, güncelleneceğini, mevzuatın izin verdiği durumlarda üçüncü kişilere aktarılabileceğini ve KVKK'da öngörülen şekillerde işlenebileceğini bilgilerinize sunar.</p>

                    <div>
                        <h5 className="font-bold mb-1">1. HANGİ KİŞİSEL VERİLERİ İŞLİYORUZ?</h5>
                        <p className="mb-2">Derneğimiz tarafından aşağıdaki kişisel veriler işlenebilmektedir:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Kimlik bilgileri (ad, soyad)</li>
                            <li>İletişim bilgileri (telefon, e-posta, adres)</li>
                            <li>Dernek faaliyetlerine ilişkin görsel ve işitsel kayıtlar (fotoğraf ve video)</li>
                            <li>Bağış bilgileri</li>
                            <li>Gönüllülük ve üyelik süreçlerine ilişkin bilgiler</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">2. KİŞİSEL VERİLERİN TOPLANMA YÖNTEMİ</h5>
                        <p className="mb-2">Kişisel verileriniz;</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Derneğimizin internet sitesi üzerinden,</li>
                            <li>Sosyal medya hesaplarımız aracılığıyla,</li>
                            <li>Dernek merkezinde veya etkinliklerde doldurulan formlar yoluyla,</li>
                            <li>E-posta, telefon veya diğer iletişim kanalları ile</li>
                        </ul>
                        <p className="mt-2">sözlü, yazılı veya elektronik ortamda toplanmaktadır.</p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">3. KİŞİSEL VERİLERİN İŞLENME AMAÇLARI</h5>
                        <p className="mb-2">Toplanan kişisel verileriniz;</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Üyelik ve gönüllülük süreçlerinin yürütülmesi</li>
                            <li>Bağış ve yardım organizasyonlarının yönetilmesi</li>
                            <li>Dernek faaliyetleri hakkında bilgilendirme yapılması</li>
                            <li>Etkinliklerin planlanması ve yürütülmesi</li>
                            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                            <li>İstatistiksel analizlerin yapılması (kimlik ifşa edilmeden)</li>
                            <li>Dernek ile paydaşlar arasındaki iletişimin sağlanması</li>
                        </ul>
                        <p className="mt-2">amaçlarıyla işlenmektedir.</p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">4. KİŞİSEL VERİLERİN AKTARILABİLECEĞİ KİŞİ VE KURULUŞLAR</h5>
                        <p className="mb-2">Kişisel verileriniz;</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>İlgili mevzuat gereği yetkili kamu kurum ve kuruluşlarına,</li>
                            <li>Bankalar, ödeme kuruluşları, muhasebe hizmet sağlayıcıları gibi iş ortaklarına,</li>
                            <li>Hukuki zorunluluklar kapsamında yetkili mercilere</li>
                        </ul>
                        <p className="mt-2">aktarılabilecektir.</p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">5. KVKK KAPSAMINDAKİ HAKLARINIZ</h5>
                        <p className="mb-2">KVKK'nın 11. maddesi uyarınca;</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>İşlenmişse bilgi talep etme</li>
                            <li>İşlenme amacını öğrenme</li>
                            <li>Aktarıldığı üçüncü kişileri bilme</li>
                            <li>Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
                            <li>Silinmesini veya yok edilmesini isteme</li>
                            <li>Bu işlemlerin üçüncü kişilere bildirilmesini isteme</li>
                            <li>Otomatik sistemlere itiraz etme</li>
                            <li>Zarara uğramanız hâlinde tazminat talep etme</li>
                        </ul>
                        <p className="mt-2">haklarına sahipsiniz.</p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-1">6. BAŞVURU YOLLARI</h5>
                        <p className="mb-2">Haklarınızı kullanmak için taleplerinizi; ıslak imzalı dilekçe ile aşağıdaki adrese gönderebilir veya e-posta yoluyla iletebilirsiniz:</p>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                            <p><strong>Veri Sorumlusu:</strong> İyilik Adımı Uluslararası İnsani Yardım Derneği</p>
                            <p><strong>Adres:</strong> Yukarı Dudullu Mah. Katibim Sokak Dış Kapı No: 1 İç Kapı No: 1 Ümraniye / İstanbul / Türkiye</p>
                            <p><strong>E-posta:</strong> info@iyilikadimi.org.tr</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
