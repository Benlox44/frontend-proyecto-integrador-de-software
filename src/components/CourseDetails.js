import React from 'react';
import '../styles/CourseCard.css';

const CourseDetails = ({ selectedCourse, addToCart, setCurrentPage }) => (
  <div className="courseDetails">
    <div className="courseDetails-content">
      <h2 className="courseDetails-title">{selectedCourse.title}</h2>
      <p className="courseDetails-category"><strong>Categoría:</strong> {selectedCourse.category}</p>
      <p className="courseDetails-price"><strong>Precio:</strong> ${selectedCourse.price}</p>
      <div 
        className="courseDetails-description" 
        dangerouslySetInnerHTML={{ __html: selectedCourse.description }} 
      />
    </div>

    <div className="courseDetails-footer">
      <button onClick={() => addToCart(selectedCourse)} className="primaryButton">Añadir al carrito</button>
      <button onClick={() => setCurrentPage('home')} className="secondaryButton">Volver a cursos</button>
    </div>
  </div>
);

export default CourseDetails;
