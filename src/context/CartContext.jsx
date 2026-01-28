import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const showToast = useToast();

    // Initial Fetch
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await api.getCart();
            console.log('🛒 DEBUG - Cart Data:', data);
            // Backendden dönen veriyi state'e yaz
            setCartItems(data.items || []);
            setCartTotal(parseFloat(data.total_amount || 0));
            setCartCount(data.items_count || 0);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (item) => {
        try {
            setLoading(true);

            // 0. Duplicate Check (Sepette aynı ürün var mı?)
            const existingCartItem = cartItems.find(cartItem => {
                // ID Kontrolü
                const cartDonationId = cartItem.donation ? String(cartItem.donation.id) : null;
                if (!cartDonationId || cartDonationId !== String(item.id)) return false;

                // Fiyat Kontrolü (unit_amount)
                const cartPrice = parseFloat(cartItem.unit_amount || 0);
                const itemPrice = parseFloat(item.price || 0);
                if (Math.abs(cartPrice - itemPrice) > 0.01) return false;

                // Varyant ve Ülke Kontrolü
                const cartFormData = cartItem.form_data || cartItem.donation_submission?.form_data || {};

                let newItemCountry = "";
                let newItemVariant = "";

                if (item._submissionData) {
                    newItemCountry = item._submissionData.selected_country || "";
                    newItemVariant = item._submissionData.donation_type || "";
                } else {
                    // Fallback
                    newItemVariant = item.donation_type || item.type || "";
                    // item.selectedOption bazen ülke adı, bazen varyant adı olabiliyordu.
                    // _submissionData yoksa güvenilir değil ama deneyelim
                    newItemCountry = item.selectedOption === newItemVariant ? "" : (item.selectedOption || "");
                }

                const cartCountry = cartFormData.selected_country || "";
                const cartVariant = cartFormData.donation_type || "";

                // Null/Empty string normalization
                const isCountryMatch = (newItemCountry || "") === (cartCountry || "");
                const isVariantMatch = (newItemVariant || "") === (cartVariant || "");

                return isCountryMatch && isVariantMatch;
            });

            if (existingCartItem) {
                console.log("Sepette aynı ürün bulundu, miktar güncelleniyor. Item ID:", existingCartItem.id);
                // Miktarı arttır
                const newQuantity = (existingCartItem.quantity || 1) + (item.quantity > 1 ? item.quantity : 1);

                // API Update
                await api.updateCartItemQuantity(existingCartItem.id, newQuantity);

                // Sepeti yenile ve aç
                await fetchCart();
                setIsCartOpen(true);
                setLoading(false);
                return;
            }

            // 1. Donation Submission Oluştur

            // Dinamik form verilerini hazırla (form_data JSONField için)
            const formData = {};
            if (item.selectedOption) {
                // Hem selected_country hem genel selection olarak ekleyelim, esneklik olsun
                formData.selected_country = item.selectedOption;
                formData.selection = item.selectedOption;
            }
            // İleride başka dinamik alanlar gelirse buraya eklenebilir (örn: item.form_data varsa merge et)
            if (item.form_data) {
                Object.assign(formData, item.form_data);
            }

            let submissionData = {
                donation: item.id,
                amount: item.price,
                currency: (item.currency && typeof item.currency === 'object') ? item.currency.id : item.currency,
                donation_type: item.donation_type || item.type,
                selected_country: item.selectedOption,
                form_data: formData,
                payment_source: 'web_site',
                cf_turnstile_response: ''
            };

            // Eğer item içinde backend için hazırlanmış özel veri varsa onu kullan (Override)
            if (item._submissionData) {
                submissionData = { ...submissionData, ...item._submissionData };
                // Form data merge (varsa)
                if (item._submissionData.form_data) {
                    submissionData.form_data = { ...formData, ...item._submissionData.form_data };
                }
            }

            console.log('🔍 DEBUG - Item:', item);
            console.log('🔍 DEBUG - Submission Data:', submissionData);

            const submission = await api.createDonationSubmission(submissionData);

            // 2. Sepete Ekle
            const cartItem = await api.addToCart(submission.id);

            // 3. Eğer miktar > 1 ise güncelle
            if (item.quantity > 1) {
                if (cartItem.id) {
                    await api.updateCartItemQuantity(cartItem.id, item.quantity);
                }
            }

            // 4. Sepeti Güncelle
            await fetchCart();
            setIsCartOpen(true);

        } catch (error) {
            console.error('Add to cart failed:', error);
            showToast("Sepete eklenirken bir hata oluştu. Lütfen tekrar deneyiniz.", "error");
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setLoading(true);
            await api.removeFromCart(itemId);
            await fetchCart();
        } catch (error) {
            console.error('Remove from cart failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            // Optimistic update
            setCartItems(prev => prev.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ));

            await api.updateCartItemQuantity(itemId, newQuantity);
            await fetchCart();
        } catch (error) {
            console.error('Update quantity failed:', error);
            await fetchCart();
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            await api.clearCart();
            setCartItems([]);
            setCartTotal(0);
            setCartCount(0);
        } catch (error) {
            console.error('Clear cart failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            setIsCartOpen,
            toggleCart,
            loading
        }}>
            {children}
        </CartContext.Provider>
    );
}
