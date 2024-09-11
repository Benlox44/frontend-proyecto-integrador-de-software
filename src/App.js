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
import useCart from './hooks/useCart';
import useFilters from './hooks/useFilters';
import useAuth from './hooks/useAuth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, login, logout } = useAuth();
  const { cart, addToCart, removeFromCart, fetchCart, loadingCart } = useCart(user);
  const { filter, setFilter, filteredCourses } = useFilters(courses);

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

    fetchCourses();
  }, [user]);

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
                    setUser={login}  
                    setCurrentPage={setCurrentPage} 
                    fetchCart={fetchCart}
                  />
                )}
                {currentPage === 'register' && (
                  <Register 
                    setUser={login}  
                    setCurrentPage={setCurrentPage} 
                  />
                )}
                {currentPage === 'editProfile' && user && (
                  <EditProfile 
                    user={user} 
                    setUser={login} 
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
