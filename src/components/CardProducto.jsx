import { Link } from 'react-router-dom';
import './CardProducto.css';

export default function CardProducto({ producto }) {
  return (
    <div className="card">
      <h3>{producto.title}</h3>
      <p>{producto.price}</p>
      <img src={producto.thumbnail} alt={producto.title}/>
      <Link className="ver-detalle" to={`/productos/${producto.id}`}>Ver detalle</Link>
    </div>
  );
}