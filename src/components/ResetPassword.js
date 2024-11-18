import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography } from '@mui/material';


const ResetPassword = () => {
  const location = useLocation(); // Obtener URL actual
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener token de URl
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');  

  useEffect(() => {
    if (!token) {
      setErrorMessage('Token inválido o no proporcionado.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/users/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
  
      if (response.ok) {
        alert('Contraseña restablecida con éxito');
        navigate('/login'); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Hubo un error al restablecer la contraseña');
      }
    } catch (error) {
      setErrorMessage('Hubo un error al intentar restablecer la contraseña');
    }
  };

  return (
    <Card style={{ padding: '24px', maxWidth: '400px', margin: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginTop: '50px', borderRadius: '16px' }}>
      <CardContent>
      <Typography variant="h4" style={{ marginBottom: '24px' }}>Recuperar Contraseña</Typography>
        {errorMessage && <Typography color="success">{errorMessage}</Typography>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ padding: '10px', margin: '10px 0', width: '100%' }}
        />
        <Button variant="contained" style={{ backgroundColor: '#DBB186', color: '#fff' }} type="submit">
            Restablecer contraseña
        </Button>
      </form>
      </CardContent>
      </Card>
  );
};

export default ResetPassword;