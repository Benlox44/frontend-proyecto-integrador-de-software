import React from 'react';

const CourseDetails = ({ selectedCourse, addToCart, setCurrentPage }) => (
  <div className="courseCard">
    <h2>{selectedCourse.title}</h2>
    <img src={selectedCourse.image} alt={selectedCourse.title} className="courseImage" />
    <p>Categoría: {selectedCourse.category}</p>
    <p className="price">Precio: ${selectedCourse.price}</p>
    <p>{selectedCourse.description}</p>
    <div className="videoContainer">
      <h3>Video Introductorio</h3>
      <div className="iframeContainer">
        <iframe 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          frameBorder="0" 
          allow="autoplay; encrypted-media" 
          allowFullScreen 
          title="video"
        />
      </div>
    </div>
    <button onClick={() => addToCart(selectedCourse)} className="primaryButton">Añadir al carrito</button>
    <button onClick={() => setCurrentPage('home')} className="secondaryButton">Volver a cursos</button>
  </div>
);

export default CourseDetails;
