// import './Home.css';

// import { Link } from 'react-router-dom';

// export default function Home() {
//   return (
//     <div className="home">
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Bienvenido a nuestro sitio</h1>
//           <p>Explorá nuestras categorías y descubrí los mejores productos tecnológicos.</p>
//           <Link className="btn" to="/productos">Ver productos</Link>
//         </div>
//       </section>
//     </div>
//   );
// }


import './Home.css';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CardProducto from '../components/CardProducto';

export default function Home() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=4')
      .then(res => res.json())
      .then(data => setDestacados(data.products || []));
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

      <section className="destacados">
        <h2>Productos destacados</h2>
        <div className="grid">
          {destacados.map(prod => (
            <CardProducto key={prod.id} producto={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}