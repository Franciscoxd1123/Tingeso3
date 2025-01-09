import Navbar from './Navbar';

const Home = () => {
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  const contentStyle = {
    position: 'fixed',
    width: '85vw',
    padding: '20px',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '2.5em',
    color: 'orange',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.5em',
    lineHeight: '1.6',
    color: '#42b983',
    marginBottom: '20px',
    textAlign: 'center', 
  };

  const linkStyle = {
    color: 'yellow',
    textDecoration: 'none',
    '&:hover': {
      color: 'orange',
    },
  };    

  return (
    <div style={containerStyle}>
        <Navbar />
      <div style={contentStyle}>
        <h1 style={headingStyle}>MicroPB: Sistema de Gestión de préstamos hipotecarios</h1>
        <p style={paragraphStyle}>
          Bienvenido a la plataforma de gestión de préstamos hipotecarios. Aquí podrás registrarte como cliente, simular tus préstamos y 
          poder ver todo lo relacionado a estos. 
          Esta aplicación ha sido desarrollada utilizando tecnologías como{" "}
          <a href="https://spring.io/projects/spring-boot" style={linkStyle}>Spring Boot</a> para el backend,{" "}
          <a href="https://reactjs.org/" style={linkStyle}>React</a> para el frontend y{" "}
          <a href="https://www.postgresql.org/" style={linkStyle}>PostgreSQL</a> para la base de datos.
        </p>
      </div>
    </div>
  );
};

export default Home;