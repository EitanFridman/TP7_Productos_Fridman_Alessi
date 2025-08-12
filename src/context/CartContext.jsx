/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import '../components/Toast.css';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Agrupar productos repetidos y asegurar cantidad
      const agrupados = [];
      for (const item of parsed) {
        const existente = agrupados.find(p => p.id === item.id);
        if (existente) {
          existente.quantity += item.quantity || 1;
        } else {
          agrupados.push({ ...item, quantity: item.quantity || 1 });
        }
      }
      return agrupados;
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

  const addToCart = (producto, cantidad = 1) => {
    setCartItems(prev => {
      const index = prev.findIndex(p => p.id === producto.id);
      if (index !== -1) {
        const actualizado = [...prev];
        const item = { ...actualizado[index] };
        item.quantity += cantidad;
        actualizado[index] = item;
        return actualizado;
      }
      return [...prev, { ...producto, quantity: cantidad }];
    });
    showToast('Producto agregado');
  };

  const removeFromCart = (idProducto) => {
    setCartItems(prev => prev.filter(p => p.id !== idProducto));
    showToast('Producto eliminado');
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Carrito vaciado');
  };

  const getTotal = () => cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const getCount = () => cartItems
    .reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal, getCount }}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);