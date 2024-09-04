import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ course, addToCart, setSelectedCourse, setCurrentPage }) => (
  <div className="courseCard">
    <h3>{course.title}</h3>
    <p>Categoría: {course.category}</p>
    <p className="price">Precio: ${course.price}</p>
    <button onClick={() => addToCart(course)} className="primaryButton">Añadir al carrito</button>
    <button onClick={() => { setSelectedCourse(course); setCurrentPage('details'); }} className="secondaryButton">
      Ver detalles
    </button>
  </div>
);

export default CourseCard;
