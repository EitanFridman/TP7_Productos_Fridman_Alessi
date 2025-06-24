import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProducto from '../components/CardProducto';
import './Productos.css';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const { idCategoria } = useParams();

  useEffect(() => {
    const url = idCategoria
      ? `https://dummyjson.com/products/category/${idCategoria}`
      : 'https://dummyjson.com/products?limit=20';
    fetch(url)
      .then(res => res.json())
      .then(data => setProductos(data.products || data));
  }, [idCategoria]);

  return (
    <div>
      <h2>Productos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {productos.map(prod => (
          <CardProducto key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}
