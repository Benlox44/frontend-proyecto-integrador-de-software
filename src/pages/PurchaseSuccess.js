import React, { useEffect } from 'react';
import '../styles/PurchaseSuccess.css';

const PurchaseSuccess = () => {
    useEffect(() => {
        document.querySelector('header').style.display = 'none';
        return () => {
            document.querySelector('header').style.display = 'block';
        };
    }, []);

    const goToCourses = () => {
        window.location.href = 'http://localhost:3000';
    };

    return (
        <div className="purchaseSuccessContainer">
            <h1 className="purchaseSuccessText">Compra Exitosa</h1>
            <p className="purchaseSuccessDetail">
                ¡Felicidades! Tu compra se ha realizado exitosamente. Los detalles de tu compra han sido enviados a tu correo electrónico.
            </p>
            <button className="goToCoursesButton" onClick={goToCourses}>Volver a Cursos</button>
        </div>
    );
};

export default PurchaseSuccess;
