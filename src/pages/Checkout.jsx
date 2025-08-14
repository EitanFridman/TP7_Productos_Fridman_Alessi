import { useCart } from '../context/CartContext.jsx';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, getTotal, buyCart } = useCart();

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
      <ul className="items">
        {cartItems.map(item => (
          <li key={item.id} className="checkout-item">
            <div className="item-info">
              <img src={item.thumbnail} alt={item.title} />
              <div className="details">
                <span className="name">{item.title}</span>
                <span className="unit-price">${item.price} c/u</span>
              </div>
            </div>
            <div className="item-summary">
              <span className="quantity">x{item.quantity}</span>
              <span className="price">{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="total">Total: ${getTotal()}</p>
      <button className="finalizar" onClick={buyCart}>Finalizar compra</button>
    </div>
  );
}