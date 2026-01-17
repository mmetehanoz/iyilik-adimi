import { useCart } from '../context/CartContext';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
    const drawerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        }

        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            // Prevent body scroll when drawer is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen, setIsCartOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-bold text-[#103e6a]">Bağış Sepetiniz</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <div>
                                    <p className="text-lg font-medium">Sepetiniz boş</p>
                                    <p className="text-sm">Henüz bir bağış eklemediniz.</p>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-4 px-6 py-2 bg-[#12985a] text-white rounded-full font-bold hover:bg-[#0e7a48] transition-colors"
                                >
                                    Bağışlara Göz At
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>

                                        {item.selectedOption && (
                                            <p className="text-xs text-gray-500 mt-1">{item.selectedOption}</p>
                                        )}

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center bg-white rounded-lg border border-gray-200">
                                                <button
                                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="font-bold text-[#12985a]">
                                                {new Intl.NumberFormat('tr-TR').format(item.price * item.quantity)} ₺
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 font-medium">Toplam Tutar</span>
                                <span className="text-2xl font-bold text-[#103e6a]">
                                    {new Intl.NumberFormat('tr-TR').format(cartTotal)} ₺
                                </span>
                            </div>
                            <Link
                                to="/odeme"
                                onClick={() => setIsCartOpen(false)}
                                className="block w-full py-4 bg-[#103e6a] text-white rounded-xl font-bold hover:bg-[#0d3257] active:scale-[0.98] transition-all shadow-lg shadow-[#103e6a]/20 text-center"
                            >
                                ÖDEME YAP
                            </Link>
                            <p className="text-xs text-center text-gray-500 mt-3">
                                Güvenli ödeme altyapısı ile korunmaktadır.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
