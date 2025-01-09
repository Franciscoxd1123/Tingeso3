import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import requestService from "../services/requestService";
import evaluationService from "../services/evaluationService";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import Navbar from './Navbar';

const Evaluation = () => {
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

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

  const doEvaluation = async () => {
    setLoading(true);
    try {
      const response = await requestService.getAll();
      const filteredRequests = response.data.filter(request => request.state === 3);
      setRequests(filteredRequests);

      const clientPromises = filteredRequests.map(request =>
        clientService.getClientByRut(request.rut)
      );
      const clientResponses = await Promise.all(clientPromises);

      const clientMap = {};
      clientResponses.forEach((res, index) => {
        const clientData = res.data;
        clientMap[filteredRequests[index].rut] = `${clientData.name} ${clientData.lastName}`;
      });
      setClients(clientMap);

      setError(null);
    } catch (error) {
      console.log("Error al obtener las solicitudes:", error);
      setError("Error al obtener las solicitudes.");
    } finally {
      setLoading(false);
    }
  };

  const evaluateRequest = (id) => {
    setLoading(true);
    evaluationService.evaluateRequest(id)
      .then((response) => {
        console.log("Resultado de la evaluación:", response.data);
        setEvaluationResult(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log("Error al evaluar la solicitud:", error);
        setError("Error al evaluar la solicitud.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    doEvaluation();
  }, []);

  const getStateLabel = (state) => {
    switch (state) {
      case 3:
        return "En Evaluación";
      case 4:
        return "Pre-Aprobada";
      case 7:
        return "Rechazada";
      default:
        return "Desconocido";
    }
  };

  const getStateColor = (state) => {
    switch (state) {
      case 3:
        return 'yellow';
      case 4:
        return 'green';
      case 7:
        return 'red';
      default:
        return '#42b983';
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
          Solicitudes a Evaluar
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
                  <TableCell align="center" sx={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Acción
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
                    <TableCell align="center">
                      <Button 
                        variant="contained" 
                        onClick={() => evaluateRequest(request.id)}
                        sx={{
                          backgroundColor: '#42b983',
                          color: 'black',
                          fontSize: '1.2rem',
                          '&:hover': {
                            backgroundColor: '#37a372',
                          },
                        }}
                        startIcon={<DoneIcon />}
                      >
                        Evaluar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {evaluationResult && (
          <Box 
            sx={{ 
              marginTop: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: 3,
              borderRadius: 2,
              width: '100%',
            }}
          >
            <Typography variant="h6" sx={{ color: 'yellow', fontSize: '1.8rem', marginBottom: 2 }}>
              Resultado de la Evaluación:
            </Typography>
            <Typography sx={{ color: '#42b983', fontSize: '1.6rem' }}>
              Nombre Solicitante: <span style={{ color: 'orange' }}>{clients[evaluationResult.rut] || "Cargando..."}</span>
            </Typography>
            <Typography sx={{ color: '#42b983', fontSize: '1.6rem' }}>
              Rut Solicitante: <span style={{ color: 'orange' }}>{evaluationResult.rut}</span>
            </Typography>
            <Typography sx={{ color: '#42b983', fontSize: '1.6rem' }}>
              Tipo préstamo: <span style={{ color: 'orange' }}>{evaluationResult.type}</span>
            </Typography>
            <Typography sx={{ color: '#42b983', fontSize: '1.6rem' }}>
              Estado: <span style={{ color: getStateColor(evaluationResult.state) }}>
                {getStateLabel(evaluationResult.state)}
              </span>
            </Typography>
          </Box>
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

export default Evaluation;