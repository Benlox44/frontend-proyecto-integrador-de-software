import React, { useState } from 'react';
import CourseCard from './CourseCard';
import { Typography, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Grid, Box, Button, Container } from '@mui/material';
import '../styles/Home.css';

const Home = ({ courses, addToCart, setSelectedCourse, setCurrentPage, filter, setFilter, filteredCourses, ownedCourses }) => {
  const [currentPage, setCurrentPageState] = useState(0);
  const coursesPerPage = 9;
  
  const handleToggleShowOwned = () => {
    setFilter(prev => ({ ...prev, showOwned: !prev.showOwned }));
  };

  const displayedCourses = filteredCourses.slice(currentPage * coursesPerPage, (currentPage + 1) * coursesPerPage);
  
  const nextPage = () => {
    if ((currentPage + 1) * coursesPerPage < filteredCourses.length) {
      setCurrentPageState(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPageState(prev => prev - 1);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/creativa.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '60px 0',
        marginBottom: '40px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Tu viaje educativo comienza aquí
        </Typography>
        <Typography variant="h6" gutterBottom>
          Descubre una amplia gama de cursos para impulsar tu carrera y creatividad
        </Typography>
      </Box>

      <Box sx={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">Cursos Disponibles</Typography>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <FormControl variant="outlined" size="small">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
              label="Categoría"
            >
              <MenuItem value="all">Todas las categorías</MenuItem>
              <MenuItem value="Programación">Programación</MenuItem>
              <MenuItem value="Diseño">Diseño</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Fotografía">Fotografía</MenuItem>
              <MenuItem value="Gastronomía">Gastronomía</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small">
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={filter.sort}
              onChange={(e) => setFilter(prev => ({ ...prev, sort: e.target.value }))}
              label="Ordenar por"
            >
              <MenuItem value="default">Por defecto</MenuItem>
              <MenuItem value="price-asc">Precio: Menor a Mayor</MenuItem>
              <MenuItem value="price-desc">Precio: Mayor a Menor</MenuItem>
              <MenuItem value="alpha">Alfabéticamente</MenuItem>
            </Select>
          </FormControl>

        </Box>
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={filter.showOwned}
            onChange={handleToggleShowOwned}
          />
        }
        label="Mostrar solo en posesión"
      />

      <Grid container spacing={3} sx={{ marginTop: '24px' }}>
        {displayedCourses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard 
              course={course} 
              addToCart={addToCart} 
              setSelectedCourse={setSelectedCourse}
              setCurrentPage={setCurrentPage}
              ownedCourses={ownedCourses}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
        <Button 
          onClick={prevPage} 
          disabled={currentPage === 0} 
          variant="outlined" 
          sx={{ marginRight: '8px' }}
        >
          Anterior
        </Button>
        <Button 
          onClick={nextPage} 
          disabled={(currentPage + 1) * coursesPerPage >= filteredCourses.length} 
          variant="contained"
        >
          Siguiente
        </Button>
      </Box>
    </Container>
  );
};

export default Home;