import React from 'react';
import '../styles/CourseCard.css';

const CourseDetails = ({ selectedCourse, addToCart, setCurrentPage }) => (
  <div className="courseCard">
    <div>
      <button onClick={() => addToCart(selectedCourse)} className="primaryButton">Añadir al carrito</button>
      <button onClick={() => setCurrentPage('home')} className="secondaryButton">Volver a cursos</button>
    </div>
    <h2>{selectedCourse.title}</h2>
    <p>Categoría: {selectedCourse.category}</p>
    <p className="price">Precio: ${selectedCourse.price}</p>
    <p>{selectedCourse.description}</p>
    <div>
      <button onClick={() => addToCart(selectedCourse)} className="primaryButton">Añadir al carrito</button>
      <button onClick={() => setCurrentPage('home')} className="secondaryButton">Volver a cursos</button>
    </div>
  </div>
);

export default CourseDetails;
