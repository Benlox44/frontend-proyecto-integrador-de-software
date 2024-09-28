import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const CourseDetails = ({ selectedCourse, addToCart, setCurrentPage }) => (
  <Card sx={{ padding: '16px', marginBottom: '16px', boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h4" gutterBottom>{selectedCourse.title}</Typography>
      <Typography variant="body1" gutterBottom><strong>Categoría:</strong> {selectedCourse.category}</Typography>
      <Typography variant="h6" color="textSecondary"><strong>Precio:</strong> ${selectedCourse.price}</Typography>
      <Box dangerouslySetInnerHTML={{ __html: selectedCourse.description }} sx={{ marginTop: '16px', marginBottom: '16px' }} />
    </CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
      <Button variant="contained" color="primary" onClick={() => addToCart(selectedCourse)}>
        Añadir al carrito
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => setCurrentPage('home')}>
        Volver a cursos
      </Button>
    </Box>
  </Card>
);

export default CourseDetails;
