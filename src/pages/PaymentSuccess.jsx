import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        document.title = 'Ödeme Başarılı - İyilik Adımı';
        window.scrollTo(0, 0);

        const params = new URLSearchParams(location.search);
        const orderId = params.get('order_id');
        const amount = params.get('amount');
        const currency = params.get('currency');

        if (orderId) {
            setOrderDetails({
                orderId,
                amount,
                currency
            });
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-32 pb-20">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ödeme Başarılı!</h2>

                {orderDetails && (
                    <div className="bg-gray-50 rounded-lg p-5 mb-6 text-left border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-500 font-medium">İşlem No:</span>
                            <span className="text-[#103e6a] font-bold text-sm bg-blue-50 px-2 py-1 rounded">{orderDetails.orderId}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                            <span className="text-gray-500 font-medium">Tutar:</span>
                            <span className="font-bold text-lg text-green-600">
                                {orderDetails.amount ? new Intl.NumberFormat('tr-TR').format(Number(orderDetails.amount)) : ''} {orderDetails.currency || 'TL'}
                            </span>
                        </div>
                    </div>
                )}

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Bağışınız başarıyla tarafımıza ulaştı. İyiliğe vesile olduğunuz için teşekkür ederiz. İşleminize ait makbuz e-posta adresinize iletilecektir.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="w-full py-4 bg-[#12985a] text-white rounded-xl font-bold hover:bg-[#0e7a48] shadow-lg shadow-[#12985a]/20 transition-all active:scale-[0.98]"
                >
                    Anasayfaya Dön
                </button>
            </div>
        </div>
    );
}
