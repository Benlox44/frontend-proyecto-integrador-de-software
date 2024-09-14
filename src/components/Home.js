import React from 'react';
import CourseCard from './CourseCard';
import '../styles/Home.css';

const Home = ({ courses, addToCart, setSelectedCourse, setCurrentPage, filter, setFilter, filteredCourses, ownedCourses }) => {
  const handleToggleShowOwned = () => {
    setFilter(prev => ({ ...prev, showOwned: !prev.showOwned }));
  };

  return (
    <div>
      <h2 className="title">Cursos Disponibles</h2>
      
      <div className="filters">
        <select 
          className="select" 
          onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
        >
          <option value="all">Todas las categorías</option>
          <option value="Programación">Programación</option>
          <option value="Diseño">Diseño</option>
          <option value="Marketing">Marketing</option>
          <option value="Fotografía">Fotografía</option>
          <option value="Gastronomía">Gastronomía</option>
        </select>

        <select 
          className="select"
          onChange={(e) => setFilter(prev => ({ ...prev, sort: e.target.value }))}
        >
          <option value="default">Por defecto</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="alpha">Alfabéticamente</option>
        </select>
      </div>

      {/* Toggle Switch moved here */}
      <div className="toggle-switch">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={filter.showOwned}
            onChange={handleToggleShowOwned}
          />
          <span className="slider"></span>
        </label>
        <span>Mostrar solo en posesión</span>
      </div>

      {filteredCourses.map(course => (
        <CourseCard 
          key={course.id} 
          course={course} 
          addToCart={addToCart} 
          setSelectedCourse={setSelectedCourse}
          setCurrentPage={setCurrentPage}
          ownedCourses={ownedCourses}
        />
      ))}
    </div>
  );
};

export default Home;
