import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProducto from '../components/CardProducto';
import './Productos.css';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { idCategoria } = useParams();

  useEffect(() => {
    setPage(1);
  }, [idCategoria]);

  useEffect(() => {
    const skip = (page - 1) * 20;
    const base = idCategoria
      ? `https://dummyjson.com/products/category/${idCategoria}`
      : 'https://dummyjson.com/products';
    const url = `${base}?limit=20&skip=${skip}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductos(data.products || []);
        setTotal(data.total || (data.products ? data.products.length : 0));
      });
  }, [idCategoria, page]);

  const totalPages = Math.ceil(total / 20) || 1;

  return (
    <div className="productos">
      <h2>Productos</h2>
      
      <div className="grid">
        {productos.map(prod => (
          <CardProducto key={prod.id} producto={prod} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="paginacion">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              className={num === page ? 'activo' : ''}
              onClick={() => setPage(num)}>
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}