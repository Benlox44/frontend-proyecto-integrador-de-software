// components/CourseCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const CourseCard = ({ course, addToCart, setSelectedCourse, setCurrentPage, ownedCourses }) => {
  const isOwned = ownedCourses.includes(course.id);

  return (
    <Card
    sx={{
      marginBottom: '16px',
      boxShadow: 3,
      transition: 'transform 0.2s, box-shadow 0.3s',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 6, // Incrementa la sombra para darle un efecto de profundidad
      },
      maxWidth: '300px',
      margin: '0 auto',
      borderRadius: '12px',
    }}
    
    >
      <CardContent>
        <Typography variant="h5">{course.title}</Typography>
        <Typography variant="body1">Categoría: {course.category}</Typography>
        <Typography variant="h6" color="textSecondary">Precio: ${course.price}</Typography>

        {isOwned ? (
          <Button variant="contained" color="success" disabled>Curso en posesión</Button>
        ) : (
          <Button
  variant="contained"
  color="primary"
  onClick={() => addToCart(course)}
  sx={{
    marginTop: '8px',
    backgroundColor: '#00796b',
    '&:hover': {
      backgroundColor: '#004d40',
      transform: 'scale(1.05)',
    },
  }}
>
  Añadir al carrito
</Button>
        )}

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => { setSelectedCourse(course); setCurrentPage('details'); }}
          sx={{ marginTop: '8px', marginLeft: '8px', borderColor: '#ff4081', color: '#ff4081', '&:hover': { backgroundColor: '#ffebee' } }}
        >
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
