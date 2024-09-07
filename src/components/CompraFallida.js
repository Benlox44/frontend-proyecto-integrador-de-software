import React from 'react';
import '../styles/CompraFallida.css'; // Asegúrate de crear este archivo CSS

const CompraFallida = () => {
  const volverACursos = () => {
    window.location.href = 'http://localhost:3000'; // Cambia la URL según tu configuración
  };

  return (
    <div className="compraFallidaContainer">
      <h1 className="compraFallidaText">Compra Fallida</h1>
      <p className="compraFallidaDetalle">Lo sentimos, ha ocurrido un error durante el proceso de compra. Por favor, inténtalo nuevamente más tarde.</p>
      <button onClick={volverACursos}>Volver a Cursos</button>
    </div>
  );
};

export default CompraFallida;