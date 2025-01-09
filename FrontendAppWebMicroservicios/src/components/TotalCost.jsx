import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress } from "@mui/material";
import AssessmentIcon from '@mui/icons-material/Assessment';
import requestService from "../services/requestService";
import evaluationService from "../services/evaluationService";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import Navbar from './Navbar';

const TotalCost = () => {
    const [requests, setRequests] = useState([]);
    const [clients, setClients] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCostResult, setTotalCostResult] = useState(null);

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

    const doTotalCost = async () => {
        setLoading(true);
        try {
            const response = await requestService.getAll();
            const filteredRequests = response.data.filter(request => request.state === 4);
            setRequests(filteredRequests);
    
            // Obtener los nombres y apellidos de los clientes por RUT
            const clientPromises = filteredRequests.map(request =>
                clientService.getClientByRut(request.rut)
            );
            const clientResponses = await Promise.all(clientPromises);
    
            // Mapear los RUTs a los nombres completos
            const clientMap = {};
            clientResponses.forEach((res, index) => {
                const clientData = res.data; // Suponiendo que aquí tienes name y last_name
                clientMap[filteredRequests[index].rut] = `${clientData.name} ${clientData.lastName}`;
            });
            setClients(clientMap);
    
            setError(null);
        } catch (error) {
            console.log("Error al obtener datos:", error);
            setError("Error al obtener datos.");
        } finally {
            setLoading(false);
        }
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
            case 4:
                return 'green'; //Pre-Aprobada
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
              Costos totales
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
                                        onClick={() => calculateTotalCost(request.id)}
                                        sx={{
                                            backgroundColor: '#42b983',
                                            color: 'black',
                                            fontSize: '1.2rem',
                                            '&:hover': {
                                                backgroundColor: '#37a372',
                                            },
                                        }}
                                        startIcon={<AssessmentIcon />}
                                    >
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
                <Box 
                    sx={{ 
                        marginTop: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: 3,
                        borderRadius: 2,
                        width: '100%',
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#42b983', fontSize: '1.8rem', marginBottom: 2 }}>
                        Costo Total: <span style={{ color: 'orange' }}> ${formatAmount(totalCostResult)}</span>
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
            </div>
        </div>
    );
};

export default TotalCost;