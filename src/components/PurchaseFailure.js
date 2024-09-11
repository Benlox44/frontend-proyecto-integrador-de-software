import React from 'react';
import '../styles/PurchaseFailure.css';

const CompraFallida = () => {
  const volverACursos = () => {
    window.location.href = 'http://localhost:3000';
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