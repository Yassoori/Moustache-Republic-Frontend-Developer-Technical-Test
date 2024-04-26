import React, {createContext, useContext, useState} from 'react'

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(
            (item) => item.id === product.id && item.size === product.size
        );

        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems)
        } else {
            setCartItems([...cartItems, {...product, quantity: 1}]);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
          {children}
        </CartContext.Provider>
      );
}