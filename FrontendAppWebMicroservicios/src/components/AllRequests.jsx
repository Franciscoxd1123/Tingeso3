import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import { Button, Box, Typography, CircularProgress,} from "@mui/material";
import requestService from "../services/requestService";
import { Link } from "react-router-dom";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRequests = () => {
    setLoading(true);
    requestService.getAll() 
      .then((response) => {
        console.log("Solicitudes.", response.data);
        setRequests(response.data);
        setError(null);
      })
      .catch((error) => {
        console.log("Se ha producido un error al intentar mostrar las solicitudes.", error);
        setError("Error al obtener las solicitudes.");
      })
      .finally(() => {setLoading(false);});
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
      <Typography variant="h4" style={{ color: 'orange' }} gutterBottom>
        Solicitudes
      </Typography>

      {loading && <CircularProgress sx={{ marginTop: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      {requests.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 2, backgroundColor: 'black' }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow
                  key={request.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
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
export default AllRequests;