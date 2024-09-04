import React from 'react';
import '../styles/CourseCard.css';

const CourseDetails = ({ selectedCourse, addToCart, setCurrentPage }) => (
  <div className="courseCard">
      <div>
        <button onClick={() => addToCart(selectedCourse)} className="primaryButton">Añadir al carrito</button>
        <button onClick={() => setCurrentPage('home')} className="secondaryButton">Volver a cursos</button>
      </div>
      <h2>{selectedCourse.title}</h2>
      <img src={selectedCourse.image} alt={selectedCourse.title} className="courseImage" />
      <p>Categoría: {selectedCourse.category}</p>
      <p className="price">Precio: ${selectedCourse.price}</p>
      <p dangerouslySetInnerHTML={{ __html: selectedCourse.description }}></p>
      <div className="courseInfo">
        <div className="buyers">
          <img src="https://img.lovepik.com/png/20231009/Black-and-white-business-people-silhouettes-white-collar-the-boys_146582_wh860.png" alt="Compradores" className="personIcon" />
          <span>{selectedCourse.buyers} personas compraron este curso</span>
        </div>
        <div className="rating">
          {Array.from({ length: selectedCourse.rating }).map((_, index) => (
            <span key={index} className="star">★</span>
          ))}
          {Array.from({ length: 5 - selectedCourse.rating }).map((_, index) => (
            <span key={index} className="star empty">☆</span>
          ))}
        </div>
      </div>
      <div className="videoContainer">
        <h3>Video Introductorio</h3>
        <div className="iframeContainer">
          <iframe 
            src={selectedCourse.videoUrl} 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen 
            title="video"
          />
        </div>
      </div>
      <div>
        <button onClick={() => addToCart(selectedCourse)} className="primaryButton">Añadir al carrito</button>
        <button onClick={() => setCurrentPage('home')} className="secondaryButton">Volver a cursos</button>
      </div>
  </div>
);

export default CourseDetails;


