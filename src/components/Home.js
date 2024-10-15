import React, { useState } from 'react';
import CourseCard from './CourseCard';
import { Typography, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Grid, Box, Button } from '@mui/material';
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
    <Box sx={{ padding: '80px' }}>
      <Box
        sx={{
          marginBottom: '32px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: 3,
          
        }}
      >
        <img src="/logo3.png" alt="Logo" style={{ width: '300px', height: 'auto',margin: '0 auto', display: 'block', marginBottom: '16px' }} />
        <Typography variant="h4" gutterBottom>
          Tu viaje educativo comienza aquí...
        </Typography>
        <Typography variant="body1" mt={1}>
          La innovadora plataforma de NetDesign que te ofrece un mundo de oportunidades educativas. Con un catálogo extenso de cursos en diversas áreas, estamos aquí para ayudarte a desarrollar nuevas habilidades y avanzar en tu carrera.
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom>Cursos Disponibles</Typography>

      <Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <FormControl variant="outlined" sx={{ minWidth: '150px' }}>
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

        <FormControl variant="outlined" sx={{ minWidth: '150px' }}>
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

      <FormControlLabel
        control={
          <Switch
            checked={filter.showOwned}
            onChange={handleToggleShowOwned}
          />
        }
        label="Mostrar solo en posesión"
      />

      <Grid container spacing={3} justifyContent="center">
        {displayedCourses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', margin: '8px' }}>
              <CourseCard 
                course={course} 
                addToCart={addToCart} 
                setSelectedCourse={setSelectedCourse}
                setCurrentPage={setCurrentPage}
                ownedCourses={ownedCourses}
                sx={{ width: '100%', height: '100%' }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}>
        <Button 
          onClick={prevPage} 
          disabled={currentPage === 0} 
          variant="contained" 
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
    </Box>
  );
};

export default Home;