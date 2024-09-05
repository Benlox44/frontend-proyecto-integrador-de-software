import React, { useState } from 'react';

const EditProfile = ({ user, setUser, setCurrentPage }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setCurrentPage('home');
        alert('Perfil actualizado');
      } else {
        const errorText = await response.text();
        console.error('Error al actualizar perfil:', errorText);
        alert('Error al actualizar perfil: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar perfil');
    }
  };

  return (
    <div className="courseCard">
      <h2 className="title">Editar Perfil</h2>
      <form onSubmit={updateProfile} className="form">
        <input 
          type="text" 
          name="name" 
          placeholder="Nombre" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="input" 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="input" 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Nueva Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="input" 
        />
        <button type="submit" className="primaryButton">Actualizar Perfil</button>
      </form>
    </div>
  );
};

export default EditProfile;
