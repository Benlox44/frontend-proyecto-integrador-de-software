import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button,Box} from '@mui/material';

const CourseCard = ({ course, addToCart, setSelectedCourse, setCurrentPage, ownedCourses }) => {
  const isOwned = ownedCourses.includes(course.id);

  return (
    <Card
      sx={{
        marginBottom: '16px',
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        maxWidth: '305px',
        margin: '0 auto',
      }}
    >
      <CardMedia
        component="img"
        height="162"
        image={course.imageUrl} // URL de la imagen
        alt={course.title} // Texto alternativo
      />
       <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '200px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="body1">Categoría: {course.category}</Typography>
          <Typography variant="h6" color="textSecondary">Precio: ${course.price}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
          {isOwned ? (
            <Button variant="contained" color="success" disabled>Curso en posesión</Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(course)}
              sx={{ marginRight: '8px' }} 
            >
              Añadir al carrito
            </Button>
          )}

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => { setSelectedCourse(course); setCurrentPage('details'); }}
          >
            Ver detalles
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
