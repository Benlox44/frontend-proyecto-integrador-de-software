import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

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
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const { token, id, email, name } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ id, email, name }));
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
    <Card style={{ padding: '16px', marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Registrarse</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Registrarse
          </Button>
        </form>
        <Typography style={{ marginTop: '16px' }}>
          ¿Ya tienes una cuenta?{' '}
          <Button color="primary" onClick={() => setCurrentPage('login')}>Inicia Sesión</Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Register;
