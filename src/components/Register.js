import React from 'react';

const Register = ({ register, setCurrentPage }) => (
  <div className="courseCard">
    <h2 className="title">Registrarse</h2>
    <form onSubmit={(e) => { e.preventDefault(); register(e.target.name.value, e.target.email.value, e.target.password.value); }} className="form">
      <input type="text" name="name" placeholder="Nombre" required className="input" />
      <input type="email" name="email" placeholder="Email" required className="input" />
      <input type="password" name="password" placeholder="Contraseña" required className="input" />
      <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" required className="input" />
      <button type="submit" className="primaryButton">Registrarse</button>
    </form>
    <p className="loginLink">
      ¿Ya tienes una cuenta? 
      <button onClick={() => setCurrentPage('login')} className="secondaryButton">Inicia Sesión</button>
    </p>
  </div>
);

export default Register;
