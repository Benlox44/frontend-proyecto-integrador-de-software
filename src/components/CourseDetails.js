import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const CourseDetails = ({ selectedCourse, addToCart, setCurrentPage }) => (
  <Card style={{ padding: '16px', marginBottom: '16px' }}>
    <CardContent>
      <Typography variant="h4" gutterBottom>{selectedCourse.title}</Typography>
      <Typography variant="body1" gutterBottom><strong>Categoría:</strong> {selectedCourse.category}</Typography>
      <Typography variant="h6" color="textSecondary"><strong>Precio:</strong> ${selectedCourse.price}</Typography>
      <div 
        dangerouslySetInnerHTML={{ __html: selectedCourse.description }} 
        style={{ marginTop: '16px', marginBottom: '16px' }}
      />
    </CardContent>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
      <Button variant="contained" color="primary" onClick={() => addToCart(selectedCourse)}>
        Añadir al carrito
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => setCurrentPage('home')}>
        Volver a cursos
      </Button>
    </div>
  </Card>
);

export default CourseDetails;
