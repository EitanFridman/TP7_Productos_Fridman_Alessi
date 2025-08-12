import { Link } from 'react-router-dom';
import './CardProducto.css';
import { useCart } from '../context/CartContext.jsx';

export default function CardProducto({ producto }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <h3>{producto.title}</h3>
      <p>{producto.price}</p>
      <img src={producto.thumbnail} alt={producto.title}/>
      <Link className="ver-detalle" to={`/productos/${producto.id}`}>Ver detalle</Link>
      <button className="btn-add" onClick={() => addToCart(producto)}>Agregar al carrito</button>
    </div>
  );
}