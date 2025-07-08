import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductoDetalle.css';
import CardProducto from '../components/CardProducto';

export default function ProductoDetalle() {
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const { idProducto } = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${idProducto}`)
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [idProducto]);

  // Cargar productos relacionados (de la misma categoría)
  useEffect(() => {
    if (!producto?.category) return;

    fetch(`https://dummyjson.com/products/category/${producto.category}`)
      .then(res => res.json())
      .then(data => {
        const productos = data.products.filter(p => p.id !== producto.id); // evitar el mismo
        const seleccionados = [];
        const usados = new Set();

        while (seleccionados.length < 4 && usados.size < productos.length) {
          const idx = Math.floor(Math.random() * productos.length);
          if (!usados.has(idx)) {
            usados.add(idx);
            seleccionados.push(productos[idx]);
          }
        }

        setRelacionados(seleccionados);
      });
  }, [producto]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <>
      <div className="producto-detalle">
        <div className="detalle-contenido">
          <div className="detalle-imagen">
            <img src={producto.thumbnail} alt={producto.title} />
          </div>
          <div className="detalle-info">
            <h1>{producto.title}</h1>
            <p className="descripcion">{producto.description}</p>
            <p className="precio">${producto.price}</p>
            <p className="stock">Stock: {producto.stock}</p>
            <p className="rating">⭐ {producto.rating} / 5</p>
            <button className="btn-comprar">Añadir al carrito</button>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="relacionados">
          <h2>Productos que te pueden interesar</h2>
          <div className="grid">
            {relacionados.map(prod => (
              <CardProducto key={prod.id} producto={prod} />
            ))}
          </div>
        </section>
      )}
    
    </>
  );
}
