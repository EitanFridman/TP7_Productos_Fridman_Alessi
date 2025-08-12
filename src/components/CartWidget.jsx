import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import './CartWidget.css';

export default function CartWidget() {
  const { cartItems, removeFromCart, clearCart, getTotal } = useCart();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev);

  return (
    <div className="cart-widget">
      <button className="cart-button" onClick={toggle}>
        🛒 {cartItems.length}
      </button>
      <div className={`cart-dropdown ${open ? 'open' : ''}`}>
        {cartItems.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          <>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                  <button onClick={() => removeFromCart(item.id)}>x</button>
                </li>
              ))}
            </ul>
            <p className="total">Total: ${getTotal()}</p>
            <button className="vaciar" onClick={clearCart}>Vaciar carrito</button>
            <Link className="checkout" to="/checkout" onClick={() => setOpen(false)}>
              Finalizar compra
            </Link>
          </>
        )}
      </div>
    </div>
  );
}