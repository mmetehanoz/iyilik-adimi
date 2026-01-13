import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Check if item with same ID and same options exists
            const existingItemIndex = prevItems.findIndex(
                (i) => i.id === item.id &&
                    i.selectedOption === item.selectedOption &&
                    i.name === item.name // Ensure name match for safety
            );

            if (existingItemIndex > -1) {
                // Update quantity
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += item.quantity;
                // Optionally update price if needed, but usually price is per unit
                return newItems;
            } else {
                return [...prevItems, item];
            }
        });
        setIsCartOpen(true); // Open drawer when adding
    };

    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[index].quantity = newQuantity;
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

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
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
