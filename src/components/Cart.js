import React from 'react';
import { Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';

const Cart = ({ cart, removeFromCart, loadingCart }) => {
  if (loadingCart) {
    return <CircularProgress />;
  }

  if (!cart || cart.length === 0) {
    return <Typography variant="h6" color="textSecondary">El carrito está vacío</Typography>;
  }

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión o registrarte para continuar con la compra.');
      return;
    }

    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

      const response = await fetch("http://localhost:3003/purchase/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          totalAmount,
          courses: cart,
        }),
      });

      const data = await response.json();
      if (data.url && data.token) {
        window.location.href = `${data.url}?token_ws=${data.token}`;
      }
    } catch (error) {
      console.error("Error iniciando transacción:", error);
    }
  };  

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Carrito de Compras</Typography>
      {cart.map(item => (
        <Card key={item.id} sx={{ marginBottom: '16px', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5">{item.title}</Typography>
            <Typography variant="body1" color="textSecondary">Precio: ${item.price}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => removeFromCart(item.id)}
              sx={{ marginTop: '8px' }}
            >
              Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
      <Typography variant="h6" sx={{ marginTop: '16px' }}>
        Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        sx={{ marginTop: '16px', transition: 'background-color 0.3s' }}
      >
        Continuar con la compra
      </Button>
    </Box>
  );
};

export default Cart;
