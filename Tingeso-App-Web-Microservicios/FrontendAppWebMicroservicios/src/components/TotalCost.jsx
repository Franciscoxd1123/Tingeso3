import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress } from "@mui/material";
import requestService from "../services/requestService";
import evaluationService from "../services/evaluationService";
import { Link } from "react-router-dom";

const TotalCost = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCostResult, setTotalCostResult] = useState(null);

    const doTotalCost = () => {
        setLoading(true);
        requestService.getAll()
            .then((response) => {
                const filteredRequests = response.data.filter(request => request.state === 4);
                setRequests(filteredRequests);
                setError(null);
            })
            .catch((error) => {
                console.log("Error al obtener solicitudes:", error);
                setError("Error al obtener solicitudes.");
            })
            .finally(() => setLoading(false));
    };

    const calculateTotalCost = (id) => {
        setLoading(true);
        evaluationService.totalCost(id)
            .then((response) => {
                setTotalCostResult(response.data);
            })
            .catch((error) => {
                console.log("Error al obtener el costo total:", error);
                setError("Error al obtener el costo total.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        doTotalCost();
    }, []);

    const getStateLabel = (state) => {
        switch (state) {
          case 4:
            return "Pre-Aprobada";
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
            <Typography variant="h4" style={{ color: 'orange' }} gutterBottom>Costo total</Typography>
            {loading && <CircularProgress sx={{ marginTop: 2 }} />}
            {error && <Typography color="error">{error}</Typography>}
            {requests.length > 0 && (
                <TableContainer component={Paper} sx={{ marginTop: 2, backgroundColor: 'black' }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de solicitudes">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>Rut Solicitante</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>Tipo Préstamo</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>Monto</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>Interés Anual</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>Plazo</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>Estado</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: 'orange' }}>Acciones</TableCell>
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
                                        onClick={() => calculateTotalCost(request.id)}>
                                            Calcular
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {totalCostResult !== null && (
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" style={{ color: '#42b983' }}>
                        Costo Total: 
                        <span style={{ color: 'orange' }}> ${totalCostResult}</span>
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
export default TotalCost;