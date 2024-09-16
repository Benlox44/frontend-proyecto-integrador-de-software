// components/Home.js
import React from 'react';
import CourseCard from './CourseCard';
import { Typography, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Grid, Box } from '@mui/material';

const Home = ({ courses, addToCart, setSelectedCourse, setCurrentPage, filter, setFilter, filteredCourses, ownedCourses }) => {
  const handleToggleShowOwned = () => {
    setFilter(prev => ({ ...prev, showOwned: !prev.showOwned }));
  };

  return (
    <Box sx={{ padding: '16px' }}>
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
        {filteredCourses.map(course => (
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
    </Box>
  );
};

export default Home;
