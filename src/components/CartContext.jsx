import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct && existingProduct.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, showCart, toggleCart, removeFromCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartProvider, CartContext };