import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box, Tab, Tabs } from '@mui/material';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState(0); 
  const [courses, setCourses] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const userProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.name,
            email: data.email,
          });
        } else {
          setError('Error al cargar el perfil del usuario. Intenta nuevamente más tarde.');
        }
      } catch (error) {
        setError('Error al cargar el perfil del usuario. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    // Simulación de datos para "Mis Cursos" y "Mis Compras"
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3001/users/courses', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const coursesData = await response.json();
          setCourses(coursesData);
        }
      } catch (error) {
        console.error("Error al cargar los cursos", error);
      }
    };

    const fetchPurchases = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3001/users/purchases', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const purchasesData = await response.json();
          setPurchases(purchasesData);
        }
      } catch (error) {
        console.error("Error al cargar las compras", error);
      }
    };

    fetchCourses();
    fetchPurchases();

    userProfile();
  }, []);


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    return (
      <Card sx={{ padding: '32px', marginBottom: '32px', boxShadow: 3, borderRadius: '8px', textAlign: 'center' }}>
        <CardContent>
          <CircularProgress color="primary" size={50} />
          <Typography variant="h6" sx={{ marginTop: '16px', color: '#888' }}>Cargando perfil...</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ padding: '32px', maxWidth: 600, boxShadow: 3, borderRadius: '12px', textAlign: 'center', backgroundColor: '#fff' }}>
        <CardContent>
          <Typography variant="h4" sx={{ marginBottom: '24px', fontWeight: 'bold' }}>Perfil de Usuario</Typography>

          {error && <Typography color="error" sx={{ marginBottom: '16px' }}>{error}</Typography>}

          <Typography variant="h6" sx={{ marginBottom: '8px' }}>Nombre: <strong>{userData.name}</strong></Typography>
          <Typography variant="h6" sx={{ marginBottom: '24px' }}>Correo electrónico: <strong>{userData.email}</strong></Typography>

          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="tabs"
            centered
            sx={{ marginBottom: '16px' }}
          >
            <Tab label="Mis Cursos" />
            <Tab label="Mis Compras" />
          </Tabs>

          {selectedTab === 0 && (
            <Box sx={{ marginBottom: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Cursos:</Typography>
              {courses.length === 0 ? (
                <Typography>No tienes cursos disponibles.</Typography>
              ) : (
                <ul>
                  {courses.map((course, index) => (
                    <li key={index}>
                      <Typography>{course.title}</Typography>
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          )}

          {selectedTab === 1 && (
            <Box sx={{ marginBottom: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Compras:</Typography>
              {purchases.length === 0 ? (
                <Typography>No tienes compras disponibles.</Typography>
              ) : (
                <ul>
                  {purchases.map((purchase, index) => (
                    <li key={index}>
                      <Typography>{purchase.title} - {purchase.date}</Typography>
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          )}

        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;