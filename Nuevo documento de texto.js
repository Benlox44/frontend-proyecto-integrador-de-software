import React, { useState, useMemo } from 'react';

const courses = [
  { id: 1, title: "Introducción a React", price: 99.99, category: "Programación", description: "Aprende los fundamentos de React, la biblioteca de JavaScript más popular para construir interfaces de usuario.", image: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "Diseño UX/UI Avanzado", price: 149.99, category: "Diseño", description: "Domina las técnicas avanzadas de diseño de experiencia de usuario e interfaz de usuario.", image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Marketing Digital", price: 79.99, category: "Marketing", description: "Descubre las estrategias más efectivas para promocionar tu negocio en línea.", image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "Fotografía Profesional", price: 129.99, category: "Fotografía", description: "Aprende a tomar fotos como un profesional con este curso completo de fotografía.", image: "/placeholder.svg?height=200&width=300" },
  { id: 5, title: "Cocina Gourmet", price: 89.99, category: "Gastronomía", description: "Prepara platos de alta cocina con las técnicas de los chefs más reconocidos.", image: "/placeholder.svg?height=200&width=300" },
  { id: 6, title: "Python para Data Science", price: 119.99, category: "Programación", description: "Utiliza Python para analizar datos y crear modelos de machine learning.", image: "/placeholder.svg?height=200&width=300" },
  { id: 7, title: "Ilustración Digital", price: 69.99, category: "Diseño", description: "Crea ilustraciones impresionantes utilizando las últimas herramientas digitales.", image: "/placeholder.svg?height=200&width=300" },
  { id: 8, title: "SEO Avanzado", price: 159.99, category: "Marketing", description: "Lleva tu sitio web a lo más alto de los resultados de búsqueda con técnicas avanzadas de SEO.", image: "/placeholder.svg?height=200&width=300" },
  { id: 9, title: "Desarrollo de Aplicaciones Móviles", price: 139.99, category: "Programación", description: "Aprende a crear aplicaciones móviles para iOS y Android desde cero.", image: "/placeholder.svg?height=200&width=300" },
  { id: 10, title: "Edición de Video Profesional", price: 109.99, category: "Diseño", description: "Domina las técnicas de edición de video utilizadas en la industria del cine y la televisión.", image: "/placeholder.svg?height=200&width=300" },
];

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    borderRadius: '8px',
  },
  nav: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  primaryButton: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
  },
  courseCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  select: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  courseImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '15px',
  },
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState({ category: 'all', sort: 'default' });
  const [selectedCourse, setSelectedCourse] = useState(null);

  const addToCart = (course) => {
    setCart([...cart, course]);
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
  };

  const login = (email, password) => {
    setUser({ email, name: "Usuario Ejemplo" });
    setCurrentPage('home');
  };

  const register = (name, email, password) => {
    setUser({ email, name });
    setCurrentPage('home');
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const filteredCourses = useMemo(() => {
    let result = courses;

    if (filter.category !== 'all') {
      result = result.filter(course => course.category === filter.category);
    }

    switch (filter.sort) {
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price);
      case 'alpha':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return result;
    }
  }, [filter]);

  const renderHome = () => (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Cursos Disponibles</h2>
      <div style={{ marginBottom: '20px' }}>
        <select 
          style={styles.select} 
          onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
        >
          <option value="all">Todas las categorías</option>
          <option value="Programación">Programación</option>
          <option value="Diseño">Diseño</option>
          <option value="Marketing">Marketing</option>
          <option value="Fotografía">Fotografía</option>
          <option value="Gastronomía">Gastronomía</option>
        </select>
        <select 
          style={styles.select}
          onChange={(e) => setFilter(prev => ({ ...prev, sort: e.target.value }))}
        >
          <option value="default">Por defecto</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="alpha">Alfabéticamente</option>
        </select>
      </div>
      {filteredCourses.map(course => (
        <div key={course.id} style={styles.courseCard}>
          <h3 style={{ color: '#2c3e50' }}>{course.title}</h3>
          <p>Categoría: {course.category}</p>
          <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>Precio: ${course.price}</p>
          <button 
            onClick={() => addToCart(course)} 
            style={{...styles.button, ...styles.primaryButton, marginRight: '10px'}}
          >
            Añadir al carrito
          </button>
          <button 
            onClick={() => { setSelectedCourse(course); setCurrentPage('details'); }}
            style={{...styles.button, ...styles.secondaryButton}}
          >
            Ver detalles
          </button>
        </div>
      ))}
    </div>
  );

  const renderCart = () => (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Carrito de Compras</h2>
      {cart.map(item => (
        <div key={item.id} style={styles.courseCard}>
          <h3 style={{ color: '#2c3e50' }}>{item.title}</h3>
          <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>Precio: ${item.price}</p>
          <button 
            onClick={() => removeFromCart(item.id)}
            style={{...styles.button, backgroundColor: '#e74c3c', color: 'white'}}
          >
            Eliminar
          </button>
        </div>
      ))}
      <p style={{ fontSize: '1.2em', fontWeight: 'bold', marginTop: '20px' }}>
        Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
      </p>
    </div>
  );

  const renderLogin = () => (
    <div style={styles.courseCard}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Iniciar Sesión</h2>
      <form onSubmit={(e) => { e.preventDefault(); login(e.target.email.value, e.target.password.value); }} style={styles.form}>
        <input type="email" name="email" placeholder="Email" required style={styles.input} />
        <input type="password" name="password" placeholder="Contraseña" required style={styles.input} />
        <button type="submit" style={{...styles.button, ...styles.primaryButton}}>Iniciar Sesión</button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        ¿No tienes una cuenta? 
        <button 
          onClick={() => setCurrentPage('register')} 
          style={{...styles.button, ...styles.secondaryButton, marginLeft: '10px'}}
        >
          Regístrate
        </button>
      </p>
    </div>
  );

  const renderRegister = () => (
    <div style={styles.courseCard}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Registrarse</h2>
      <form onSubmit={(e) => { e.preventDefault(); register(e.target.name.value, e.target.email.value, e.target.password.value); }} style={styles.form}>
        <input type="text" name="name" placeholder="Nombre" required style={styles.input} />
        <input type="email" name="email" placeholder="Email" required style={styles.input} />
        <input type="password" name="password" placeholder="Contraseña" required style={styles.input} />
        <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" required style={styles.input} />
        <button type="submit" style={{...styles.button, ...styles.primaryButton}}>Registrarse</button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        ¿Ya tienes una cuenta? 
        <button 
          onClick={() => setCurrentPage('login')} 
          style={{...styles.button, ...styles.secondaryButton, marginLeft: '10px'}}
        >
          Inicia Sesión
        </button>
      </p>
    </div>
  );

  const renderCourseDetails = () => (
    <div style={styles.courseCard}>
      <h2 style={{ color: '#2c3e50' }}>{selectedCourse.title}</h2>
      <img src={selectedCourse.image} alt={selectedCourse.title} style={styles.courseImage} />
      <p>Categoría: {selectedCourse.category}</p>
      <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>Precio: ${selectedCourse.price}</p>
      <p>{selectedCourse.description}</p>
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#2c3e50' }}>Video Introductorio</h3>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen 
            title="video"
          />
        </div>
      </div>
      <button 
        onClick={() => addToCart(selectedCourse)}
        style={{...styles.button, ...styles.primaryButton, marginRight: '10px', marginTop: '20px'}}
      >
        Añadir al carrito
      </button>
      <button 
        onClick={() => setCurrentPage('home')}
        style={{...styles.button, ...styles.secondaryButton, marginTop: '20px'}}
      >
        Volver a cursos
      </button>
    </div>
  );

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>CursosOnline</h1>
        <nav style={styles.nav}>
          <button onClick={() => setCurrentPage('home')} style={{...styles.button, ...styles.primaryButton}}>Cursos</button>
          <button onClick={() => setCurrentPage('cart')} style={{...styles.button, ...styles.secondaryButton}}>
            Carrito ({cart.length})
          </button>
          {user ? (
            <>
              <span style={{ marginRight: '10px' }}>{user.email}</span>
              <button onClick={logout} style={{...styles.button, backgroundColor: '#e74c3c', color: 'white'}}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <button onClick={() => setCurrentPage('login')} style={{...styles.button, ...styles.primaryButton}}>Iniciar Sesión</button>
              <button onClick={() => setCurrentPage('register')} style={{...styles.button, ...styles.secondaryButton}}>Registrarse</button>
            </>
          )}
        </nav>
      </header>
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'cart' && renderCart()}
        {currentPage === 'login' && renderLogin()}
        {currentPage === 'register' && renderRegister()}
        {currentPage === 'details' && renderCourseDetails()}
      </main>
    </div>
  );
}

export default App;