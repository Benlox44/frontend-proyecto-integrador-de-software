import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const CourseCard = ({ course, addToCart, setSelectedCourse, setCurrentPage, ownedCourses }) => {
  const isOwned = ownedCourses.includes(course.id);

  return (
    <Card style={{ marginBottom: '16px' }}>
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
            style={{ marginTop: '8px' }}
          >
            Añadir al carrito
          </Button>
        )}

        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => { setSelectedCourse(course); setCurrentPage('details'); }}
          style={{ marginTop: '8px', marginLeft: '8px' }}
        >
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
