import React, { useState } from 'react';

const Login = ({ setCurrentPage, setUser, fetchCart }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, id, email, name } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ id, email, name }));
        setUser({ id, email, name });
        setCurrentPage('home');
        await fetchCart(id, token);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setErrorMessage('Error al intentar iniciar sesión. Intenta nuevamente más tarde.');
    }
  };

  return (
    <div className="courseCard">
      <h2 className="title">Iniciar Sesión</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Mostrar mensaje de error */}
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
};

export default Login;
