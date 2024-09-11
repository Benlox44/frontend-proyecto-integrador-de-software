import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import CourseDetails from './components/CourseDetails';
import Login from './components/Login';
import Register from './components/Register';
import EditProfile from './components/EditProfile';
import PurchaseSuccess from './components/PurchaseSuccess';
import PurchaseFailure from './components/PurchaseFailure';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState({ category: 'all', sort: 'default' });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3002/courses');
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  
    const localCart = localStorage.getItem('cart');
    if (!user && localCart) {
      setCart(JSON.parse(localCart));
    }
  
    fetchCourses();
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
    if (!user) {
      const localCart = [...cart, course];
      setCart(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart)); // Guardar carrito en localStorage
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Actualizar carrito en localStorage
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/remove-from-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, courseId }),
      });

      if (response.ok) {
        fetchCart(user.id);
      }
    } catch (error) {
      alert('Error al eliminar del carrito.');
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('cart');
    setCurrentPage('home');
  };
  
  const filteredCourses = useMemo(() => {
    let result = courses;
    if (filter.category !== 'all') {
      result = result.filter(course => course.category === filter.category);
    }
    switch (filter.sort) {
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price);
      case 'alpha':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return result;
    }
  }, [filter, courses]);

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
                  <Login 
                    setUser={setUser}  
                    setCurrentPage={setCurrentPage} 
                    fetchCart={fetchCart} // Llama a fetchCart después de iniciar sesión
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
