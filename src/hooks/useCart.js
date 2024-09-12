import { useState, useEffect } from 'react';

const useCart = (user) => {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    // Solo intentar cargar el carrito si el usuario está autenticado
    if (user) {
      fetchCart(user.id);
    } else {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        setCart([]); // Limpiar el carrito si no hay usuario ni carrito local
      }
    }
  }, [user]);

  const fetchCart = async (userId) => {
    setLoadingCart(true);
    try {
      const cartResponse = await fetch(`http://localhost:3001/cart/${userId}`);
      if (!cartResponse.ok) {
        throw new Error("Error fetching cart from server");
      }
      const cartData = await cartResponse.json();
      setCart(cartData.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Hubo un problema al cargar el carrito. Intenta nuevamente más tarde.");
    } finally {
      setLoadingCart(false);
    }
  };

  const addToCart = async (course) => {
    const isCourseInCart = cart.some(item => item.id === course.id);
    if (isCourseInCart) {
      alert('Este curso ya está en tu carrito.');
      return;
    }

    if (!user) {
      const localCart = [...cart, course];
      setCart(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart));
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId: course.id }),
      });
      if (response.ok) {
        fetchCart(user.id);
      } else {
        console.error("Error al añadir al carrito:", response.statusText);
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  };

  const removeFromCart = async (courseId) => {
    if (!user) {
      const updatedCart = cart.filter(course => course.id !== courseId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/remove-from-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId }),
      });

      if (response.ok) {
        fetchCart(user.id);
      }
    } catch (error) {
      alert('Error al eliminar del carrito.');
    }
  };

  const clearCart = () => {
    setCart([]); // Limpiar el carrito en el estado
    localStorage.removeItem('cart'); // Eliminar el carrito de localStorage
  };

  return { cart, loadingCart, addToCart, removeFromCart, clearCart };
};

export default useCart;
