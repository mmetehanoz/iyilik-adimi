import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Activation() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const message = searchParams.get('message');

    useEffect(() => {
        // Here we just handle the UI based on the message from URL
        if (message === 'activated' || message === 'already_active') {
            setStatus('success');
        } else if (message === 'invalid_token' || message === 'invalid_link') {
            setStatus('error');
        } else {
            setStatus('error');
        }
    }, [message]);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
            <div className="mx-auto max-w-lg">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 text-center">
                    {status === 'loading' && (
                        <div className="py-12">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#103e6a] mx-auto mb-6"></div>
                            <h2 className="text-2xl font-bold text-[#103e6a]">İşleminiz Yapılıyor...</h2>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="py-8">
                            <div className="w-20 h-20 bg-[#12985a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#12985a" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-[#103e6a] mb-4">Hesabınız Aktifleştirildi!</h2>
                            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                                Tebrikler! Hesabınız başarıyla aktifleştirildi. Artık giriş yapabilir ve iyilik hareketine katılabilirsiniz.
                            </p>
                            <button
                                onClick={() => navigate('/uyelik')}
                                className="w-full rounded-full bg-[#103e6a] py-4 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
                            >
                                GİRİŞ YAP
                            </button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="py-8">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#ef4444" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-red-600 mb-4">Aktivasyon Başarısız</h2>
                            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                                Üzgünüz, aktivasyon bağlantısı geçersiz veya süresi dolmuş olabilir. Lütfen yeni bir aktivasyon bağlantısı isteyin veya destek ekibiyle iletişime geçin.
                            </p>
                            <button
                                onClick={() => navigate('/uyelik')}
                                className="w-full rounded-full bg-gray-800 py-4 font-bold text-white transition-all hover:bg-gray-700 hover:shadow-lg"
                            >
                                ÜYELİK SAYFASINA DÖN
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
