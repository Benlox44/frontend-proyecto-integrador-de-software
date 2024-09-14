import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import CourseDetails from './components/CourseDetails';
import Login from './components/Login';
import Register from './components/Register';
import EditProfile from './components/EditProfile';
import PurchaseSuccess from './pages/PurchaseSuccess';
import PurchaseFailure from './pages/PurchaseFailure';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import useFilters from './hooks/useFilters';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  const [ownedCourses, setOwnedCourses] = useState([]);

  const { filter, setFilter, filteredCourses } = useFilters(courses, ownedCourses);

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
    const localUser = localStorage.getItem('user');
  
    if (token && localUser) {
      try {
        const parsedUser = JSON.parse(localUser);
        setUser(parsedUser);
        fetchCart(parsedUser.id, token);
      } catch (error) {
        console.error('Error al decodificar el usuario:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(localCart);
    }
    fetchCourses();
  }, []);
  

  const fetchCart = async (userId, token) => {
    setLoadingCart(true);
    try {
      console.log(`Fetching cart para el userId: ${userId} con el token: ${token}`);
      const cartResponse = await fetch(`http://localhost:3001/users/cart/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!cartResponse.ok) {
        console.error("Error al obtener el carrito del servidor:", cartResponse.statusText);
        throw new Error("Error fetching cart from server");
      }
  
      const cartData = await cartResponse.json();
      console.log('Carrito recibido del backend:', cartData);
  
      if (Array.isArray(cartData.cart)) {
        setCart(cartData.cart);
      } else {
        console.error('La respuesta del backend no contiene un array:', cartData.cart);
      }
  
      const ownedResponse = await fetch(`http://localhost:3001/users/owned/${userId}`, {
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
      console.log('Cursos en posesión recibidos del backend:', ownedData);
  
      if (Array.isArray(ownedData.owned)) {
        setOwnedCourses(ownedData.owned);
      } else {
        console.error('La respuesta del backend no contiene un array:', ownedData.owned);
      }
    } catch (error) {
      console.error("Error fetching cart or owned courses:", error);
      alert("Hubo un problema al cargar el carrito o los cursos en posesión. Intenta nuevamente más tarde.");
    } finally {
      setLoadingCart(false);
    }
  };  

  const addToCart = async (course) => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      
      const isCourseInLocalCart = localCart.some(item => item.id === course.id);
      
      if (isCourseInLocalCart) {
        alert('Este curso ya está en tu carrito.');
        return;
      }
  
      const updatedCart = [...localCart, course];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No se encontró el token de autenticación.');
        return;
      }
  
      console.log('Token usado para añadir al carrito:', token);
      const response = await fetch('http://localhost:3001/users/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, courseId: course.id }),
      });
  
      if (response.status === 409) { // Verifica si el error es un conflicto
        alert('Este curso ya está en tu carrito.');
      } else if (response.ok) {
        fetchCart(user.id, token);
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
      const token = localStorage.getItem('token');
      console.log('Token usado para eliminar del carrito:', token);
      const response = await fetch('http://localhost:3001/users/remove-from-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, courseId }),
      });

      if (response.ok) {
        fetchCart(user.id, token);
      }
    } catch (error) {
      alert('Error al eliminar del carrito.');
    }
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setUser(null);
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('token');
    setCurrentPage('home');
  };

  if (loading) {
    return <div>Cargando cursos...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          cart={cart}
          user={user}
          logout={logout}
        />
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
                    user={user}
                  />
                )}
                {currentPage === 'login' && (
                  <Login
                    setUser={setUser}
                    setCurrentPage={setCurrentPage}
                    fetchCart={fetchCart}
                  />
                )}
                {currentPage === 'register' && (
                  <Register
                    setUser={setUser}
                    setCurrentPage={setCurrentPage}
                  />
                )}
                {currentPage === 'editProfile' && user && (
                  <EditProfile
                    user={user}
                    setUser={setUser}
                    setCurrentPage={setCurrentPage}
                  />
                )}
                {currentPage === 'details' && selectedCourse && (
                  <CourseDetails
                    selectedCourse={selectedCourse}
                    addToCart={addToCart}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
