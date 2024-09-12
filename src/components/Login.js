import React from 'react';

const Login = ({ setCurrentPage, setUser, fetchCart }) => {
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, id, email, name } = await response.json();
        // Guardamos tanto el token como el usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ id, email, name })); // Guardar el usuario completo
        
        // Actualizamos el estado con la información del usuario
        setUser({ id, email, name });
        setCurrentPage('home');
        await fetchCart(id, token); // Pasamos el token aquí también
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert('Error al intentar iniciar sesión. Intenta nuevamente más tarde.');
    }
  };

  return (
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
};

export default Login;
