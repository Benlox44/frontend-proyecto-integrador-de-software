import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

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
    <Card style={{ padding: '16px', marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <form onSubmit={(e) => { e.preventDefault(); login(e.target.email.value, e.target.password.value); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField label="Email" type="email" name="email" required />
          <TextField label="Contraseña" type="password" name="password" required />
          <Button variant="contained" color="primary" type="submit">
            Iniciar Sesión
          </Button>
        </form>
        <Typography style={{ marginTop: '16px' }}>
          ¿No tienes una cuenta?{' '}
          <Button color="primary" onClick={() => setCurrentPage('register')}>Regístrate</Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Login;
