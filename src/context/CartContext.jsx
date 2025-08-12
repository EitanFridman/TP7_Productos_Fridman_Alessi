/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import '../components/Toast.css';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (producto) => {
    setCartItems(prev => [...prev, producto]);
    showToast('Producto agregado');
  };

  const removeFromCart = (idProducto) => {
    setCartItems(prev => {
      const index = prev.findIndex(p => p.id === idProducto);
      if (index === -1) return prev;
      const nuevo = [...prev];
      nuevo.splice(index, 1);
      return nuevo;
    });
    showToast('Producto eliminado');
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Carrito vaciado');
  };

  const getTotal = () => cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal }}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);