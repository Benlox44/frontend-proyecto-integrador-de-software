import React from 'react';
import '../styles/CompraExitosa.css'; // Make sure to create this CSS file

const CompraExitosa = () => {
    const volverACursos = () => {
        window.location.href = 'http://localhost:3000'; // Change the URL according to your configuration
    };

    return (
        <div className="compraExitosaContainer">
            <h1 className="compraExitosaText">Compra Exitosa</h1>
            <p className="compraExitosaDetalle">¡Felicidades! Tu compra se ha realizado exitosamente.</p>
            <button onClick={volverACursos}>Volver a Cursos</button>
        </div>
    );
};

export default CompraExitosa;