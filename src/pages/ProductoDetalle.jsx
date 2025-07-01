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
    <div className='producto-detalle'>
      <h1>{producto.title}</h1>
      <img src={producto.thumbnail} alt={producto.title}/>
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>
    </div>
  );
}
