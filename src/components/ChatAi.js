import React, { useState } from 'react';
import { useAi } from '../contexts/aiContext';
import '../styles/ChatComponent.css';

const ChatComponent = () => {
    const { respuesta, loading, error, consultarAI } = useAi();
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        consultarAI(input);
        setInput('');
    };

    return (
        <div className="container">
            <h2>Consulta IA</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu pregunta"
                    required
                    className="input"
                />
                <button type="submit" disabled={loading} className="button">
                    {loading ? 'Cargando...' : 'Enviar'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {respuesta && <p>Respuesta: {respuesta}</p>}
        </div>
    );
};

export default ChatComponent;