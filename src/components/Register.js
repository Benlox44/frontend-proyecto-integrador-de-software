import React, { useState } from 'react';

const Register = ({ setCurrentPage, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        const { token, id, email, name } = await response.json();
        // Guardamos tanto el token como el usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ id, email, name })); // Guardar el usuario completo

        // Actualizamos el estado con la información del usuario
        setUser({ id, email, name });
        setCurrentPage('home');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('Error al registrar usuario. Intenta nuevamente más tarde.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    register(name, email, password);
  };

  return (
    <div className="courseCard">
      <h2 className="title">Registrarse</h2>
      {error && <p className="errorMessage">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="input"
        />
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
