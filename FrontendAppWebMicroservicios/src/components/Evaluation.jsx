import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress } from "@mui/material";
import requestService from "../services/requestService";
import evaluationService from "../services/evaluationService";
import { Link } from "react-router-dom";

const Evaluation = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const doEvaluation = () => {
    setLoading(true);
    requestService.getAll()
      .then((response) => {
        const filteredRequests = response.data.filter(request => request.state === 3);
        setRequests(filteredRequests);
        setError(null);
      })
      .catch((error) => {
        console.log("Error al obtener las solicitudes:", error);
        setError("Error al obtener las solicitudes.");
      })
      .finally(() => setLoading(false));
  };

  const evaluateRequest = (id) => {
    setLoading(true);
    evaluationService.evaluateRequest(id)
        .then((response) => {
            console.log("Resultado de la evaluación:", response.data);
            setEvaluationResult(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
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
        return 'yellow'; //En Evaluación
      case 4:
        return 'green'; //Pre-Aprobada
      case 7:
        return 'red'; //Rechazada
      default:
        return '#42b983'; //Default
    }
  };

  return (
    <Box sx={{ backgroundColor: '#2c3e50', padding: 10 }}>
      <Typography variant="h4" style={{ color: 'orange' }} gutterBottom>Solicitudes en Evaluación</Typography>
      {loading && <CircularProgress sx={{ marginTop: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}
      {requests.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 2, backgroundColor: 'black' }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="requests table">
            <TableHead>
              <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>
                  Rut Solicitante
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>
                  Tipo Préstamo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>
                  Monto
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>
                  Interés Anual
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>
                  Plazo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>
                  Estado
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell align="center" sx={{color: '#42b983'}}>{request.rut}</TableCell>
                  <TableCell align="center" sx={{color: '#42b983'}}>{request.type}</TableCell>
                  <TableCell align="center" sx={{color: '#42b983'}}>{request.amount}</TableCell>
                  <TableCell align="center" sx={{color: '#42b983'}}>{request.interest}%</TableCell>
                  <TableCell align="center" sx={{color: '#42b983'}}>{request.time} Años</TableCell>
                  <TableCell align="center">
                  <span style={{ color: getStateColor(request.state) }}> 
                    {getStateLabel(request.state)}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" 
                    sx={{
                      backgroundColor: '#42b983',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#37a372',
                      },
                    }}  
                    onClick={() => evaluateRequest(request.id)}>
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
        <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6" color="yellow">Resultado de la Evaluación:</Typography>
            <Typography color="#42b983">Rut Solicitante: 
            <span style={{ color: 'orange' }}> {evaluationResult.rut}</span></Typography>
            <Typography color="#42b983">Tipo préstamo: 
            <span style={{ color: 'orange' }}> {evaluationResult.type}</span></Typography>
            <Typography color = '#42b983'>
                Estado: 
                <span style={{ color: getStateColor(evaluationResult.state) }}>{getStateLabel(evaluationResult.state)}</span>
            </Typography>
        </Box>
      )}
      <Box sx={{ marginTop: 3 }}>
      <Button
              component={Link}
              to="/home"
              variant="outlined"
              sx={{
                  borderColor: "orange", 
                  color: "orange",       
                  "&:hover": {
                      borderColor: "red", 
                      color: "red",       
                  },
              }}
          >
              Back to Home
          </Button>
      </Box>
    </Box>
  );
};

export default Evaluation;