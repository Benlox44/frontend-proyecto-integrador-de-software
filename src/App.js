import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import CourseDetails from './components/CourseDetails';
import Login from './components/Login';
import Register from './components/Register';
import EditProfile from './components/EditProfile';
import coursesData from './data/courses';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompraFallida from './components/CompraFallida';  // Importa el componente de Compra Fallida
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState({ category: 'all', sort: 'default' });
  const [selectedCourse, setSelectedCourse] = useState(null);

  const addToCart = (course) => {
    setCart([...cart, course]);
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const filteredCourses = useMemo(() => {
    let result = coursesData;

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
  }, [filter]);

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
            {/* Rutas usando React Router */}
            <Route path="/compra-fallida" element={<CompraFallida />} />
            <Route path="/compra-exitosa" element={
              <div>
                <h1>Compra Exitosa</h1>
                <p>¡Gracias por tu compra!</p>
              </div>
            } />

            {/* Vistas controladas por el estado */}
            <Route path="/" element={
              <>
                {currentPage === 'home' && (
                  <Home 
                    courses={coursesData} 
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
                  />
                )}
                {currentPage === 'login' && (
                  <Login 
                    setUser={setUser}  
                    setCurrentPage={setCurrentPage} 
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
