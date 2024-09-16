import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

const EditProfile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentEmail: user.email,
          name: formData.name,
          newEmail: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert('Perfil actualizado con éxito');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('Error al actualizar perfil. Intenta nuevamente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    updateProfile();
  };

  return (
    <Card sx={{ padding: '16px', marginBottom: '16px', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Editar Perfil</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField label="Nombre" type="text" name="name" value={formData.name} onChange={handleChange} required />
          <TextField label="Correo electrónico" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <TextField label="Nueva Contraseña (opcional)" type="password" name="password" value={formData.password} onChange={handleChange} />
          <TextField label="Confirmar Contraseña" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          <Button variant="contained" color="primary" type="submit">Actualizar Perfil</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;