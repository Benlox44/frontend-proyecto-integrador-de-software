import React from 'react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

const Cart = ({ cart, removeFromCart, loadingCart, user }) => {
  console.log('Renderizando el carrito con:', cart);

  if (!cart || cart.length === 0) {
    return <Typography variant="h6" color="textSecondary">El carrito está vacío</Typography>;
  }
  if (loadingCart) {
    return <CircularProgress />;
  }

  const handleCheckout = async () => {
    if (!user) {
      alert('Debes iniciar sesión o registrarte para continuar con la compra.');
      return;
    }

    const token = localStorage.getItem('token');
  
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
    <div>
      <Typography variant="h4" gutterBottom>Carrito de Compras</Typography>
      {cart.map(item => (
        <Card key={item.id} style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h5">{item.title}</Typography>
            <Typography variant="body1" color="textSecondary">Precio: ${item.price}</Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => removeFromCart(item.id)}
              style={{ marginTop: '8px' }}
            >
              Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
      <Typography variant="h6" style={{ marginTop: '16px' }}>
        Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCheckout} 
        style={{ marginTop: '16px' }}
      >
        Continuar con la compra
      </Button>
    </div>
  );
};

export default Cart;
