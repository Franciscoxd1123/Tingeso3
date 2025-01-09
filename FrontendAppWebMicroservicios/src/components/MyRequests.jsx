import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress, TextField } from "@mui/material";
import myRequestsService from '../services/myRequestsService';
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Navbar from './Navbar';

const RequestsRut = () => {
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState({});
  const [rut, setRut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    width: '85vw',
    margin: '0 auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 100px)',
  };

  const tableContainerStyle = {
    backgroundColor: '#1e2a47',
    borderRadius: 8,
    boxShadow: 5,
    margin: '20px 0',
    '& .MuiTableCell-root': {
      borderBottom: '1px solid rgba(66, 185, 131, 0.2)',
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: 'rgba(66, 185, 131, 0.1)',
    },
  };

  const buttonStyle = {
    fontSize: '1.2rem',
    padding: '15px 40px',
    '& .MuiSvgIcon-root': {
      fontSize: '2rem',
      marginRight: '10px',
    },
  };

  const formatRut = (value) => {
    const cleanValue = value.replace(/[^0-9kK]/g, '');
    const numberPart = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);
    const formattedNumberPart = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedNumberPart}${dv ? `-${dv}` : ''}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-CL').format(amount);
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Obtiene las solicitudes asociadas al RUT ingresado
      const response = await myRequestsService.getRequestsByRut(rut);
      console.log("Mostrando tus solicitudes.", response.data);
      setRequests(response.data);
  
      // Mapea las solicitudes para obtener los datos de los clientes relacionados
      const clientPromises = response.data.map((request) =>
        clientService.getClientByRut(request.rut)
      );
      const clientResponses = await Promise.all(clientPromises);
  
      // Construye un mapa de clientes basado en el 'rut'
      const clientMap = {};
      clientResponses.forEach((res, index) => {
        const clientData = res.data;
        clientMap[response.data[index].rut] = `${clientData.name} ${clientData.lastName}`;
      });
      setClients(clientMap);
  
      setError(null);
    } catch (error) {
      console.log("Se ha producido un error al intentar mostrar tus solicitudes.", error);
      setError("Error al obtener las solicitudes. Verifica el RUT ingresado.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rut) {
      fetchRequests();
    }
  };

  const getStateLabel = (state) => {
    switch (state) {
      case 1:
        return "En Revisión Inicial";
      case 2:
        return "Pendiente de Documentación";
      case 3:
        return "En Evaluación";
      case 4:
        return "Pre-Aprobada";
      case 5:
        return "En Aprobación Final";
      case 6:
        return "Aprobada";
      case 7:
        return "Rechazada";
      case 8:
        return "Cancelada por el Cliente";
      case 9:
        return "En Desembolso";
      default:
        return "Desconocido";
    }
  };

  const getStateColor = (state) => {
    switch (state) {
      case 1:
        return '#8e24aa'; //En Revisión Inicial
      case 2:
        return '#f57c00'; //Pendiente de Documentación
      case 3:
        return 'yellow'; //En Evaluación
      case 4:
        return 'green'; //Pre-Aprobada
      case 5:
        return '#42a5f5'; //En Aprobación Final
      case 6:
        return '#4caf50'; //Aprobada
      case 7:
        return 'red'; //Rechazada
      case 8:
        return '#9e9e9e'; //Cancelada por el Cliente
      case 9:
        return '#00bcd4'; //En Desembolso
      default:
        return '#42b983'; //Default
    }
  };

  return (
    <div style={containerStyle}>
        <Navbar />
      <div style={contentStyle}>
        <Typography variant="h4" style={{ color: 'orange', marginBottom: '5rem', fontSize: '3rem' }}>
          Mis Solicitudes
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Ingrese su RUT"
            value={rut}
            onChange={(e) => setRut(formatRut(e.target.value))}
            required
            sx={{
              width: '300px', // Ancho del TextField
              height: '100px', // Altura
              marginBottom: 2, // Margen inferior
              '& .MuiInputLabel-root': {
                color: 'orange', // Color del label
                fontSize: '1.5rem', // Tamaño del label cuando está dentro del input
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'orange',
                fontSize: '1rem', // Tamaño del texto al estar enfocado
              },
              '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
                fontSize: '1.5rem', // Tamaño cuando está dentro del recuadro y no enfocado
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                fontSize: '1rem', // Tamaño del label cuando el campo tiene valor
              },
              '& .MuiInputBase-root': {
                height: '75px', // Altura del contenedor (asegura que no se rompa el diseño)
                '& fieldset': {
                  borderColor: 'orange', // Color del borde por defecto
                },
                '&:hover fieldset': {
                  borderColor: 'yellow', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'green', // Color del borde cuando está enfocado
                },
              },
              '& .MuiInputBase-input': {
                color: '#42b983', // Color del texto dentro del campo
                fontSize: '1.5rem', // Tamaño del texto dentro del campo
                padding: '15px', // Espaciado interno
              },
            }}
          />
          <Button type="submit" variant="contained"
            startIcon={<AutoStoriesIcon />}
            sx={{
              fontSize: '1.2rem',
              padding: '20px 40px',
              backgroundColor: '#42b983',
              color: 'black',
              '&:hover': {
                backgroundColor: '#37a372',
              },
            }}
          >
            Obtener Solicitudes
          </Button>
        </form>

        {loading && <CircularProgress sx={{ marginTop: 2, color: '#42b983' }} />}
        {error && <Typography color="error">{error}</Typography>}

        {requests.length > 0 && (
          <TableContainer component={Paper} sx={tableContainerStyle}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                <TableCell align="center" sx={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Nombre Solicitante
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Rut Solicitante
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Tipo Préstamo
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Monto
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Interés Anual
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Plazo
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Estado
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow
                    key={request.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(66, 185, 131, 0.1)',
                      },
                    }}
                  >
                    <TableCell align="center" sx={{ color: '#42b983', fontSize: '1.4rem' }}>{clients[request.rut] || "Cargando..."}</TableCell>
                    <TableCell align="center" sx={{ color: '#42b983', fontSize: '1.4rem' }}>{request.rut}</TableCell>
                    <TableCell align="center" sx={{ color: '#42b983', fontSize: '1.4rem' }}>{request.type}</TableCell>
                    <TableCell align="center" sx={{ color: '#42b983', fontSize: '1.4rem' }}>{formatAmount(request.amount)}</TableCell>
                    <TableCell align="center" sx={{ color: '#42b983', fontSize: '1.4rem' }}>{request.interest}%</TableCell>
                    <TableCell align="center" sx={{ color: '#42b983', fontSize: '1.4rem' }}>{request.time} Años</TableCell>
                    <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                      <span style={{ color: getStateColor(request.state) }}>
                        {getStateLabel(request.state)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ marginTop: 3 }}>
          <Button
            component={Link}
            to="/home"
            variant="outlined"
            sx={{
              ...buttonStyle,
              borderColor: "orange",
              color: "orange",
              borderWidth: "2px",
              "&:hover": {
                borderColor: "red",
                color: "red",
                borderWidth: "2px",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default RequestsRut;