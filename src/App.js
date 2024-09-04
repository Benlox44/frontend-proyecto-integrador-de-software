import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import CourseDetails from './components/CourseDetails';
import Login from './components/Login';
import Register from './components/Register';
import coursesData from './data/courses';
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

  const login = (email, password) => {
    setUser({ email, name: "Usuario Ejemplo" });
    setCurrentPage('home');
  };

  const register = (name, email, password) => {
    setUser({ email, name });
    setCurrentPage('home');
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
    <div className="app">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cart={cart} 
        user={user} 
        logout={logout} 
      />
      <main>
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
            login={login} 
            setCurrentPage={setCurrentPage} 
          />
        )}
        {currentPage === 'register' && (
          <Register 
            register={register} 
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
      </main>
    </div>
  );
}

export default App;
