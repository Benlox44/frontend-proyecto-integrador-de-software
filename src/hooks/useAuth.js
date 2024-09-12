import { useState, useEffect } from 'react';

const useAuth = (clearCart) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Limpiar el carrito solo si el usuario estaba autenticado
    clearCart();
  };

  return { user, login, logout };
};

export default useAuth;
