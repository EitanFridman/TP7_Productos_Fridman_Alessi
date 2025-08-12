import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import CartWidget from './CartWidget.jsx';

function Navbar() {
  const [categorias, setCategorias] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  return (
    <header className="navbar">
      <Link to='/' className="logo">HumanOs</Link>
      <div className="navbar-container">
        <nav className="nav-links">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/quienes-somos'>Quiénes Somos</NavLink>

            <div className="dropdown"
              onMouseEnter={() => setMostrarMenu(true)}
              onMouseLeave={() => setMostrarMenu(false)}>

              <span>Productos ▼</span>
              {mostrarMenu && (
                <div className="dropdown-menu">
                  <NavLink to='/productos'>Ver todos</NavLink>
                  {categorias.map(cat => (
                      <li key={cat.slug}>
                      <Link to={`/productos/categoria/${cat.slug}`}>{cat.name}</Link>
                    </li>
                  ))}
                </div>
              )}
            </div>

          <NavLink to='/contacto'>Contacto</NavLink>
        </nav>
        <CartWidget />
      </div>
    </header>
  );
}

export default Navbar;