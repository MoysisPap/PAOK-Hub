import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage on cart change
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Add product to cart or increase quantity if it exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart or decrease quantity if more than 1
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);
      if (existingProduct?.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  // Toggle cart visibility
  const toggleCart = () => setShowCart((prev) => !prev);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ cart, showCart, toggleCart, removeFromCart, addToCart }),
    [cart, showCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartProvider, CartContext };
