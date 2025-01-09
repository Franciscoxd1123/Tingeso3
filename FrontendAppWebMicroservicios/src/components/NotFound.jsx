import Navbar from './Navbar';

const NotFound = () => {
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2c3e50',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  const contentStyle = {
    flexGrow: 100, // El contenido ocupa el espacio restante debajo del Navbar
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const textStyle = {
    color: '#42b983',
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '2rem',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={contentStyle}>
        <p style={textStyle}>Página web aún no está disponible...</p>
      </div>
    </div>
  );
};

export default NotFound;
