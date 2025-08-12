import { useCart } from '../context/CartContext.jsx';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, getTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="checkout">
        <h2>No hay productos en el carrito.</h2>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Resumen de compra</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <span>{item.title}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>
      <p className="total">Total: ${getTotal()}</p>
      <button className="finalizar" onClick={clearCart}>Finalizar compra</button>
    </div>
  );
}