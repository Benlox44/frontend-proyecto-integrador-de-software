import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import CourseDetails from './components/CourseDetails';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProfile from './components/UpdateProfile';
import PurchaseSuccess from './pages/PurchaseSuccess';
import PurchaseFailure from './pages/PurchaseFailure';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import useFilters from './hooks/useFilters';
import ChatComponent from './components/ChatAi'; 

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  const [ownedCourses, setOwnedCourses] = useState([]);

  const { filter, setFilter, filteredCourses } = useFilters(courses, ownedCourses);

  const fetchCart = useCallback(async (token) => {
    setLoadingCart(true);
    try {
      const cartResponse = await fetch(`http://localhost:3001/users/cart`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (cartResponse.status === 401) {
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        logout();
        return;
      }

      if (!cartResponse.ok) {
        console.error("Error al obtener el carrito del servidor:", cartResponse.statusText);
        throw new Error("Error fetching cart from server");
      }

      const cartData = await cartResponse.json();
      setCart(cartData.cart || []);

      const ownedResponse = await fetch(`http://localhost:3001/users/owned`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!ownedResponse.ok) {
        console.error("Error al obtener los cursos comprados del servidor:", ownedResponse.statusText);
        throw new Error("Error fetching owned courses from server");
      }

      const ownedData = await ownedResponse.json();
      setOwnedCourses(ownedData.owned || []);
    } catch (error) {
      console.error("Error fetching cart or owned courses:", error);
      alert("Hubo un problema al cargar el carrito o los cursos en posesión. Intenta nuevamente más tarde.");
    } finally {
      setLoadingCart(false);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3002/courses');
        if (!response.ok) {
          throw new Error('Error al obtener los cursos');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
        alert('Hubo un problema al cargar los cursos. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');

    if (token) {
      fetchCart(token);
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(localCart);
    }

    fetchCourses();
  }, [fetchCart]); 

  const addToCart = async (course) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      if (localCart.some(item => item.id === course.id)) {
        alert('Este curso ya está en tu carrito.');
        return;
      }
      const updatedCart = [...localCart, course];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course.id }),
      });

      if (response.status === 409) {
        alert('Este curso ya está en tu carrito.');
      } else if (response.ok) {
        fetchCart(token);
      } else {
        console.error("Error al añadir al carrito:", response.statusText);
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  };

  const removeFromCart = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const updatedCart = cart.filter(course => course.id !== courseId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users/remove-from-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        fetchCart(token);
      }
    } catch (error) {
      alert('Error al eliminar del carrito.');
    }
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setCart([]);
    setOwnedCourses([]);
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setCurrentPage('home');
  };

  if (loading) {
    return <div>Cargando cursos...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} cart={cart} isAuthenticated={!!localStorage.getItem('token')} logout={logout} />
          <ChatComponent /> {}
          <main>
            <Routes>
              <Route path="/purchase-failure" element={<PurchaseFailure />} />
              <Route path="/purchase-success" element={<PurchaseSuccess />} />
              <Route path="/" element={
                <>
                  {currentPage === 'home' && (
                    <Home
                      courses={courses}
                      addToCart={addToCart}
                      setSelectedCourse={setSelectedCourse}
                      setCurrentPage={setCurrentPage}
                      filter={filter}
                      setFilter={setFilter}
                      filteredCourses={filteredCourses}
                      ownedCourses={ownedCourses}
                    />
                  )}
                  {currentPage === 'cart' && (
                    <Cart
                      cart={cart}
                      removeFromCart={removeFromCart}
                      loadingCart={loadingCart}
                    />
                  )}
                  {currentPage === 'login' && (
                    <Login setCurrentPage={setCurrentPage} fetchCart={fetchCart} />
                  )}
                  {currentPage === 'register' && (
                    <Register setCurrentPage={setCurrentPage} />
                  )}
                  {currentPage === 'UpdateProfile' && !!localStorage.getItem('token') && (
                    <UpdateProfile setCurrentPage={setCurrentPage} />
                  )}
                  {currentPage === 'details' && selectedCourse && (
                    <CourseDetails selectedCourse={selectedCourse} addToCart={addToCart} ownedCourses={ownedCourses} setCurrentPage={setCurrentPage} />
                  )}
                </>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;