import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductoDetalle.css';

export default function ProductoDetalle() {
  const [producto, setProducto] = useState(null);
  const { idProducto } = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${idProducto}`)
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [idProducto]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{producto.title}</h1>
      <img src={producto.thumbnail || 'https://via.placeholder.com/150'} alt={producto.title} style={{ width: '300px' }} />
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>
      <p>Categoría: {producto.category}</p>
    </div>
  );
}
