import React from 'react';
import CourseCard from './CourseCard';

const Home = ({ courses, addToCart, setSelectedCourse, setCurrentPage, filter, setFilter, filteredCourses }) => (
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
    {filteredCourses.map(course => (
      <CourseCard 
        key={course.id} 
        course={course} 
        addToCart={addToCart} 
        setSelectedCourse={setSelectedCourse}
        setCurrentPage={setCurrentPage}
      />
    ))}
  </div>
);

export default Home;
