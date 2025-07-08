import './Home.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CardProducto from '../components/CardProducto';

export default function Home() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        const productos = data.products || [];
        const seleccionados = [];
        const usados = new Set();
        while (seleccionados.length < 4 && usados.size < productos.length) {
          const idx = Math.floor(Math.random() * productos.length);
          if (!usados.has(idx)) {
            usados.add(idx);
            seleccionados.push(productos[idx]);
          }
        }
        setDestacados(seleccionados);
      });
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a nuestro sitio</h1>
          <p>Explorá nuestras categorías y descubrí los mejores productos tecnológicos.</p>
          <Link className="btn" to="/productos">Ver productos</Link>
        </div>
      </section>

      {destacados.length > 0 && (
        <section className="destacados">
          <h2>Productos Destacados</h2>
          <div className="grid">
            {destacados.map(prod => (
              <CardProducto key={prod.id} producto={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}