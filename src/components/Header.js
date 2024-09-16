// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({ currentPage, setCurrentPage, cart, user, logout }) => (
  <AppBar position="static" sx={{ marginBottom: '20px', background: 'linear-gradient(90deg, #00796b, #80cbc4)', boxShadow: 4 }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        CursosOnline
      </Typography>
      <Button color="inherit" onClick={() => setCurrentPage('home')}>Cursos</Button>
      <IconButton color="inherit" onClick={() => setCurrentPage('cart')}>
        <Badge badgeContent={cart ? cart.length : 0} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      {user ? (
        <>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>{user.name}</Typography>
          <Button color="inherit" onClick={() => setCurrentPage('editProfile')}>Editar Perfil</Button>
          <Button color="inherit" onClick={logout}>Cerrar Sesión</Button>
        </>
      ) : (
        <>
          <Button color="inherit" onClick={() => setCurrentPage('login')}>Iniciar Sesión</Button>
          <Button color="inherit" onClick={() => setCurrentPage('register')}>Registrarse</Button>
        </>
      )}
    </Toolbar>
  </AppBar>
);

export default Header;
