import { Link } from 'react-router-dom';
import './CardProducto.css';

export default function CardProducto({ producto }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
      <h3>{producto.title}</h3>
      <p>${producto.price}</p>
      <Link to={`/productos/${producto.id}`}>Ver detalle</Link>
    </div>
  );
}