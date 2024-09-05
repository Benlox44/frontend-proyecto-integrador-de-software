import React from 'react';

const Register = ({ setCurrentPage }) => {
  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('Usuario registrado');
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
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
};

export default Register;