import React, { createContext, useContext, useState } from 'react';

const AiContext = createContext();

export const AiProvider = ({ children }) => {
    const [respuesta, setRespuesta] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const consultarAI = async (input) => {
        setLoading(true);
        setError(''); 
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo', 
                    messages: [{ role: 'user', content: input }],
                    max_tokens: 50,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.error.message);
            }

            const data = await response.json();
            setRespuesta(data.choices[0].message.content); 
        } catch (error) {
            console.error('Error al consultar la IA:', error); 
            setError(`Hubo un problema al consultar la IA: ${error.message}`); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <AiContext.Provider value={{ respuesta, loading, error, consultarAI }}>
            {children}
        </AiContext.Provider>
    );
};

export const useAi = () => {
    return useContext(AiContext);
};