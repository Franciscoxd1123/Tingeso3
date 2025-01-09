import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress } from "@mui/material";
import requestService from "../services/requestService";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import Navbar from './Navbar';

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState({});
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

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-CL').format(amount);
  };

  const getRequests = async () => {
    setLoading(true);
    try {
      const response = await requestService.getAll();
      console.log("Solicitudes.", response.data);
      setRequests(response.data);

      // Mapea todas las solicitudes a sus respectivos clientes
      const clientPromises = response.data.map(request =>
        clientService.getClientByRut(request.rut)
      );
      const clientResponses = await Promise.all(clientPromises);

      // Mapeo de clientes por su 'rut' (para mostrarlos después)
      const clientMap = {};
      clientResponses.forEach((res, index) => {
        const clientData = res.data;
        clientMap[response.data[index].rut] = `${clientData.name} ${clientData.lastName}`;
      });
      setClients(clientMap);  // Asigna el mapa de clientes

      setError(null);
    } catch (error) {
      console.log("Se ha producido un error al intentar mostrar las solicitudes.", error);
      setError("Error al obtener las solicitudes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  // Función para mapear el estado a un valor legible
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
          <Typography 
            variant="h4" 
            style={{ 
              color: 'orange', 
              marginBottom: '5rem',
              fontSize: '3rem',
            }}
          >
            Solicitudes
          </Typography>

          {loading && <CircularProgress sx={{ marginTop: 2, color: '#42b983' }} />}
          {error && <Typography color="error">{error}</Typography>}

          {requests.length > 0 && (
          <TableContainer 
            component={Paper} 
            sx={tableContainerStyle}
          >
            <Table sx={{ minWidth: 650 }} size="small" aria-label="requests table">
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
                      <span style={{ color: getStateColor(request.state) }}>{getStateLabel(request.state)}</span>
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

export default AllRequests;