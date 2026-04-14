import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import Modal from '../components/Modal';

export default function Auth() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [notification, setNotification] = useState(false);
    const [showMembershipModal, setShowMembershipModal] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(false);

    // OTP States
    const [showOtp, setShowOtp] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [loginEmail, setLoginEmail] = useState(''); // To keep email across OTP step

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const data = await api.login(email, password);
            if (data.requires_otp) {
                setLoginEmail(email);
                setShowOtp(true);
            } else {
                // OTP gerekmiyorsa (backend ayarına bağlı) direkt login
                login(
                    { id: data.user_id, email: data.email, name: data.full_name },
                    { access: data.access, refresh: data.refresh }
                );
                navigate('/hesabim');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Giriş yapılamadı. E-posta veya şifre hatalı.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const data = await api.verifyOtp(phone.replace(/\D/g, '').substring(0, 10), otpCode);
            if (data.success) {
                login(
                    { id: data.user_id, email: data.email, name: data.full_name },
                    { access: data.access, refresh: data.refresh }
                );
                navigate('/hesabim');
            } else {
                setError(data.error || 'Doğrulama kodu hatalı.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Doğrulama sırasında bir hata oluştu.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        if (!agreement) {
            setError('Üyelik sözleşmesini kabul etmelisiniz.');
            return;
        }

        setIsLoading(true);
        try {
            const [firstName, ...lastNameParts] = fullName.split(' ');
            const lastName = lastNameParts.join(' ');

            const userData = {
                email,
                username: email, // Email'i kullanıcı adı olarak kullan
                password,
                password2: confirmPassword,
                first_name: firstName,
                last_name: lastName || '.',
                phone_number: phone.replace(/\D/g, '').substring(0, 10),
                membership_agreement_consent: agreement,
                notification_consent: notification
            };

            await api.register(userData);
            setIsRegisterSuccess(true);
        } catch (err) {
            const details = err.response?.data?.details;
            if (details) {
                const firstError = Object.values(details)[0];
                setError(firstError);
            } else {
                setError(err.response?.data?.error || 'Kayıt sırasında bir hata oluştu.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.startsWith('0')) value = value.substring(1);
        value = value.substring(0, 10);
        let formattedValue = '';
        if (value.length > 0) formattedValue = '(' + value.substring(0, 3);
        if (value.length > 3) formattedValue += ') ' + value.substring(3, 6);
        if (value.length > 6) formattedValue += ' ' + value.substring(6, 8);
        if (value.length > 8) formattedValue += ' ' + value.substring(8, 10);
        setPhone(formattedValue);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
            <div className="mx-auto max-w-lg">
                {/* Error Message */}
                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-100 flex items-center gap-3 animate-shake">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <p className="text-sm font-medium text-red-700">{error}</p>
                    </div>
                )}
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
                        {showOtp ? (
                            <div className="text-center">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-[#103e6a] mb-2">SMS Doğrulama</h2>
                                    <p className="text-gray-500">Telefonunuza gönderilen 6 haneli doğrulama kodunu giriniz.</p>
                                </div>
                                <form onSubmit={handleOtpVerify} className="space-y-6">
                                    <div>
                                        <input
                                            type="text"
                                            maxLength="6"
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                            className="w-full text-center text-3xl tracking-[1em] font-bold rounded-lg border border-gray-300 px-4 py-4 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                            placeholder="XXXXXX"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full rounded-full bg-[#103e6a] py-4 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50"
                                    >
                                        {isLoading ? 'DOĞRULANIYOR...' : 'DOĞRULA'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowOtp(false)}
                                        className="text-sm text-gray-400 hover:text-gray-600 underline"
                                    >
                                        Geri Dön
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 text-center">
                                    <h2 className="text-3xl font-bold text-[#103e6a] mb-2">Giriş Yap</h2>
                                    <p className="text-gray-500">Mevcut hesabınızla giriş yapın.</p>
                                </div>

                                <form className="space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">E-Posta Adresi</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                            placeholder="ornek@email.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a]" />
                                            <span className="text-sm text-gray-600">Beni Hatırla</span>
                                        </label>
                                        <a href="#" className="text-sm font-medium text-[#12985a] hover:underline">Şifremi Unuttum</a>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full rounded-full bg-[#103e6a] py-4 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50"
                                    >
                                        {isLoading ? 'GİRİŞ YAPILIYOR...' : 'GİRİŞ YAP'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                )}

                {/* Register Section */}
                {activeTab === 'register' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 animate-fade-in">
                        {isRegisterSuccess ? (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-[#12985a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#12985a" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-[#103e6a] mb-4">Kaydınız Başarıyla Alındı</h2>
                                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                                    Üyeliğinizi tamamlamak için lütfen e-posta adresinize gönderilen aktivasyon linkine tıklayınız.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsRegisterSuccess(false);
                                        setActiveTab('login');
                                    }}
                                    className="rounded-full bg-[#103e6a] px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
                                >
                                    GİRİŞ YAP
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 text-center">
                                    <h2 className="text-3xl font-bold text-[#12985a] mb-2">Üye Ol</h2>
                                    <p className="text-gray-500">Yeni bir hesap oluşturun ve iyilik hareketine katılın.</p>
                                </div>

                                <form className="space-y-4" onSubmit={handleRegister}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                            placeholder="Adınız Soyadınız"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cep Telefonu</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                            placeholder="(5XX) XXX XX XX"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">E-Posta Adresi</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                            placeholder="ornek@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Şifre Tekrar</label>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#12985a] focus:ring-1 focus:ring-[#12985a] transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={agreement}
                                                    onChange={(e) => setAgreement(e.target.checked)}
                                                    className="w-5 h-5 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a] mt-0.5"
                                                    required
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600 leading-tight group-hover:text-gray-900 transition-colors">
                                                <button type="button" onClick={() => setShowMembershipModal(true)} className="font-semibold text-[#12985a] hover:underline">Üyelik Sözleşmesi</button>'ni ve <button type="button" onClick={() => setShowConsentModal(true)} className="font-semibold text-[#12985a] hover:underline">Kişisel Rıza Metni</button>'ni okudum, onaylıyorum.
                                            </span>
                                        </label>

                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={notification}
                                                    onChange={(e) => setNotification(e.target.checked)}
                                                    className="w-5 h-5 rounded border-gray-300 text-[#12985a] focus:ring-[#12985a] mt-0.5"
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600 leading-tight group-hover:text-gray-900 transition-colors">
                                                Kampanya ve duyurulardan e-posta ve SMS yoluyla haberdar olmak istiyorum.
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full rounded-full bg-[#12985a] py-4 font-bold text-white transition-all hover:bg-[#0e7a48] hover:shadow-lg mt-4 disabled:opacity-50"
                                    >
                                        {isLoading ? 'KAYIT YAPILIYOR...' : 'ÜYE OL'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                )}
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
