import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({ currentPage, setCurrentPage, cart, isAuthenticated, logout }) => (
  <AppBar position="static" style={{ background: 'linear-gradient(to bottom,#1dd5c6, #4B768C)', boxShadow: 'none'}}>
    <Toolbar style={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" style={{ flexGrow: 1, marginLeft: '50px' }}>
        CursosOnline
      </Typography>
      <Button color="inherit" onClick={() => setCurrentPage('home')}>Cursos</Button>
      <IconButton color="inherit" onClick={() => setCurrentPage('cart')}>
        <Badge badgeContent={cart ? cart.length : 0} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      {isAuthenticated ? (
        <>
          <Button color="inherit" onClick={() => setCurrentPage('UpdateProfile')}>Editar Perfil</Button>
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
