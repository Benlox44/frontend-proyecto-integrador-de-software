import React, { useEffect } from 'react';
import '../styles/PurchaseFailure.css';

const PurchaseFailure = () => {
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
        <div className="purchaseFailureContainer">
            <h1 className="purchaseFailureText">Compra Fallida</h1>
            <p className="purchaseFailureDetail">Lo sentimos, ocurrió un error durante el proceso de compra. Por favor, inténtalo nuevamente más tarde.</p>
            <button className="goToCoursesButton" onClick={goToCourses}>Volver a Cursos</button>
        </div>
    );
};

export default PurchaseFailure;
