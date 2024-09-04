import React from 'react';
import '../styles/Header.css';

const Header = ({ currentPage, setCurrentPage, cart, user, logout }) => (
  <header className="header">
    <h1>CursosOnline</h1>
    <nav className="nav">
      <button onClick={() => setCurrentPage('home')} className="primaryButton">Cursos</button>
      <button onClick={() => setCurrentPage('cart')} className="secondaryButton">
        Carrito ({cart.length})
      </button>
      {user ? (
        <>
          <span>{user.email}</span>
          <button onClick={logout} className="logoutButton">Cerrar Sesión</button>
        </>
      ) : (
        <>
          <button onClick={() => setCurrentPage('login')} className="primaryButton">Iniciar Sesión</button>
          <button onClick={() => setCurrentPage('register')} className="secondaryButton">Registrarse</button>
        </>
      )}
    </nav>
  </header>
);

export default Header;
