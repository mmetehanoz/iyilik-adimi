import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
    const location = useLocation();
    const navigate = useNavigate();
    const [errorDetails, setErrorDetails] = useState({
        orderId: '',
        error: '',
        errorCode: '',
        amount: ''
    });

    useEffect(() => {
        document.title = 'Ödeme Başarısız - İyilik Adımı';
        window.scrollTo(0, 0);

        const params = new URLSearchParams(location.search);

        setErrorDetails({
            orderId: params.get('order_id') || '',
            error: params.get('error') || 'İşlem gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.',
            errorCode: params.get('error_code') || '',
            amount: params.get('amount') || ''
        });

    }, [location]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-32 pb-20">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border-t-8 border-red-500">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ödeme Başarısız</h2>

                <p className="text-gray-600 mb-6">
                    Üzgünüz, işleminiz sırasında bir hata oluştu veya reddedildi.
                </p>

                <div className="bg-red-50 rounded-xl p-4 mb-8 text-left border border-red-100">
                    <p className="text-red-800 text-sm font-medium">Hata Bildirimi</p>
                    <p className="text-red-600 mt-1 mb-2 font-bold leading-tight">{errorDetails.error}</p>

                    {(errorDetails.orderId && errorDetails.orderId !== '0') && (
                        <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-red-200/50 flex justify-between items-start gap-2">
                            <span className="shrink-0 mt-1">Sipariş / Kayıt No:</span>
                            <span className="font-mono text-gray-600 bg-white px-2 py-1 rounded shadow-sm break-all text-right">{errorDetails.orderId}</span>
                        </div>
                    )}
                    {errorDetails.errorCode && (
                        <div className="text-xs text-gray-400 mt-2 flex justify-between items-start gap-2">
                            <span className="shrink-0 mt-1">Banka Hata Kodu:</span>
                            <span className="font-mono text-gray-600 bg-white px-2 py-1 rounded shadow-sm break-all text-right">{errorDetails.errorCode}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/odeme')}
                        className="w-full py-4 bg-[#103e6a] text-white rounded-xl font-bold hover:bg-[#0d3257] active:scale-[0.98] transition-all shadow-lg shadow-[#103e6a]/20"
                    >
                        Ödemeye Geri Dön / Tekrar Dene
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-white text-gray-600 rounded-xl font-bold hover:bg-gray-50 border-2 border-gray-100 transition-colors"
                    >
                        Anasayfaya Dön
                    </button>
                </div>
            </div>
        </div>
    );
}
