import React from 'react';

const Login = ({ login, setCurrentPage }) => (
  <div className="courseCard">
    <h2 className="title">Iniciar Sesión</h2>
    <form onSubmit={(e) => { e.preventDefault(); login(e.target.email.value, e.target.password.value); }} className="form">
      <input type="email" name="email" placeholder="Email" required className="input" />
      <input type="password" name="password" placeholder="Contraseña" required className="input" />
      <button type="submit" className="primaryButton">Iniciar Sesión</button>
    </form>
    <p className="registerLink">
      ¿No tienes una cuenta? 
      <button onClick={() => setCurrentPage('register')} className="secondaryButton">Regístrate</button>
    </p>
  </div>
);

export default Login;
