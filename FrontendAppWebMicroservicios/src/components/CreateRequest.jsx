import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import requestService from "../services/requestService";
import { Box, Grid, FormControl, TextField, Button, InputLabel, MenuItem, Select} from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';
import Typography from "@mui/material/Typography";
import Navbar from './Navbar';

const CreateRequest = () => {
    const [rut, setRut] = useState("");
    const [type, setType] = useState("");
    const [formattedAmount, setFormattedAmount] = useState('');
    const [interest, setInterest] = useState("");
    const [time, setTime] = useState("");
    const { id } = useParams();
    const [titleClientForm] = useState("Crear Solicitud");
    const navigate = useNavigate();

    // Opciones para el combo box
    const loanTypes = [
      'Primera Vivienda',
      'Segunda Vivienda',
      'Propiedades Comerciales',
      'Remodelación'
    ];

    const formatRut = (value) => {
      // Elimina cualquier caracter no numérico (excepto K o k para el dígito verificador)
      const cleanValue = value.replace(/[^0-9kK]/g, '');
      
      // Divide el valor en número base y dígito verificador
      const numberPart = cleanValue.slice(0, -1);
      const dv = cleanValue.slice(-1);
  
      // Añade puntos cada tres dígitos al número base
      const formattedNumberPart = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
      // Combina con el dígito verificador
      return `${formattedNumberPart}${dv ? `-${dv}` : ''}`;
    };

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
  
    const textFieldStyle = {
      input: { 
        color: '#42b983',
        fontSize: '1.8rem',
      },
      label: { 
        color: 'orange',
        fontSize: '2rem',
      },
      '& .MuiInput-underline:before': { borderBottomColor: '#42b983' },
      '& .MuiInput-underline:hover:before': { borderBottomColor: '#42b983 !important' },
      '& .MuiInput-underline:after': { borderBottomColor: '#42b983' },
      '& .MuiInputLabel-root': { 
        color: 'orange',
        fontSize: '1.5rem',
      },
      '& .MuiInputLabel-root.Mui-focused': { 
        color: 'orange',
        fontSize: '1.5rem',
      },
      '& .MuiInputBase-root': { '&.Mui-focused': { borderColor: '#42b983' } },
      '& .MuiFormHelperText-root': { 
        color: 'yellow',
        fontSize: '1.2rem',
        marginTop: '15px',
      },
      '& .MuiFormHelperText-root.Mui-error': { color: 'red' },
    };
  
    const numberInputStyle = {
      ...textFieldStyle,
      '& input[type=number]': {
        color: '#42b983',
        fontSize: '1.8rem',
        '-moz-appearance': 'textfield',
        '-webkit-appearance': 'none',
      },
      '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
        display: 'none',
      },
    };
  
    const selectStyle = {
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        '& fieldset': {
          borderColor: '#42b983',
        },
        '&:hover fieldset': {
          borderColor: '#42b983',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#42b983',
        },
      },
      '& .MuiSelect-select': {
        color: '#42b983',
        fontSize: '1.8rem',
        padding: '20px',
      },
      '& .MuiInputLabel-root': {
        color: 'orange',
        fontSize: '1.5rem',
        '&.Mui-focused': {
          color: 'orange',
        },
      },
      '& .MuiSelect-icon': {
        color: '#42b983',
        fontSize: '2rem',
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

    // Formatea el monto ingresado
    const handleAmountChange = (e) => {
      const input = e.target.value.replace(/\./g, '').replace(/,/g, ''); // Elimina puntos y comas previas
      if (!isNaN(input) && input !== '') {
        const formatted = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formatea como 70.000.000
        setFormattedAmount(formatted);
      } else {
        setFormattedAmount('');
      }
    }; 
  
    // Formatea el interés ingresado
    const handleInterestChange = (e) => {
      let input = e.target.value.replace(',', '.'); // Reemplaza comas con puntos
      const numericValue = parseFloat(input);

      if (!isNaN(numericValue)) {
        if (numericValue >= 10) {
          input = (numericValue / 10).toFixed(1); // Divide por 10 y redondea
        }
        setInterest(input);
      } else {
        setInterest('');
      }
    };

    const saveRequest = (e) => {
        e.preventDefault();
        const amount = formattedAmount.replace(/\./g, ''); // Elimina puntos para el backend

        const request = {rut, type, amount: Number(amount), interest: Number(interest), time: Number(time), state: 1, id};
        
          requestService
          .create(request)
          .then((response) => {
              console.log("La Solicitud ha sido registrada con éxito.", response.data);
              alert("Solicitud creada con éxito!");
              navigate("/home");
          })
          .catch((error) => {
              console.log("Ha ocurrido un error al intentar registrar la nueva solicitud.", error);
              alert("Ha ocurrido un error al crear la solicitud.");
          });
    }

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
            {titleClientForm}
          </Typography>
  
          <Box
            component="form"
            sx={{
              backgroundColor: '#1e2a47',
              borderRadius: 2,
              boxShadow: 5,
              p: 4,
              width: '100%',
            }}
          >

            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1, marginBottom: '25px'}}>
                <FormControl fullWidth>
                  <TextField
                    id="rut"
                    label="Rut"
                    type="text"
                    value={rut}
                    variant="standard"
                    onChange={(e) => setRut(formatRut(e.target.value))}
                    helperText="Ej: 12.587.698-8"
                    sx={textFieldStyle}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="type-label" sx={{ 
                    color: 'orange', 
                    fontSize: '1.5rem',
                    '&.Mui-focused': {
                      color: 'orange',
                    },
                  }}>
                    Type of request
                  </InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    sx={{
                      ...selectStyle,
                      '& .MuiSelect-select': {
                        color: '#42b983',
                        fontSize: '1.8rem',
                        borderBottom: '1px solid #42b983',
                      },
                      '&:before': {
                        borderBottom: '1px solid #42b983',
                      },
                      '&:after': {
                        borderBottom: '2px solid #42b983',
                      },
                      '&:hover:not(.Mui-disabled):before': {
                        borderBottom: '2px solid #42b983',
                      },
                    }}
                    variant="standard"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#1e2a47',
                          border: '1px solid #42b983',
                          '& .MuiMenuItem-root': {
                            color: '#42b983',
                            fontSize: '1.5rem',
                            '&:hover': {
                              backgroundColor: 'rgba(66, 185, 131, 0.1)',
                            },
                            '&.Mui-selected': {
                              backgroundColor: 'rgba(66, 185, 131, 0.2)',
                              '&:hover': {
                                backgroundColor: 'rgba(66, 185, 131, 0.3)',
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    {loanTypes.map((loanType) => (
                      <MenuItem 
                        key={loanType} 
                        value={loanType}
                        sx={{ 
                          fontSize: '1.5rem',
                          color: '#42b983',
                          '&:hover': {
                            backgroundColor: 'rgba(66, 185, 131, 0.1)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(66, 185, 131, 0.2)',
                            '&:hover': {
                              backgroundColor: 'rgba(66, 185, 131, 0.3)',
                            },
                          },
                        }}
                      >
                        {loanType}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'yellow', 
                      fontSize: '1.2rem',
                      mt: 1,
                      display: 'block',
                    }}
                  >
                    Tipo de préstamo. Seleccione una opción
                  </Typography>
                </FormControl>
                </Box>
              </Grid>
  
              <Grid item xs={12} md={6}>
                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                  <FormControl fullWidth>
                    <TextField
                      id="amount"
                      label="Amount of the request"
                      type="text"
                      value={formattedAmount}
                      variant="standard"
                      onChange={handleAmountChange}
                      helperText="Monto del préstamo en Pesos Chilenos. Ej: 5.000.000"
                      sx={numberInputStyle}
                    />
                  </FormControl>
                </Box>
              </Grid>
  
              <Grid item xs={12} md={6}>
                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                  <FormControl fullWidth>
                    <TextField
                      id="interest"
                      label="Interest of the request"
                      type="text"
                      value={interest}
                      variant="standard"
                      onChange={handleInterestChange}
                      helperText="Ingresa el interés anual del préstamo en valor decimal. Ej: 3.5"
                      sx={numberInputStyle}
                    />
                  </FormControl>
                </Box>
              </Grid>
  
              <Grid item xs={12} md={6}>
                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                  <FormControl fullWidth>
                    <TextField
                      id="time"
                      label="Time to pay back the loan"
                      type="number"
                      value={time}
                      variant="standard"
                      onChange={(e) => setTime(e.target.value)}
                      helperText="Plazo para devolver el préstamo en años. Ej: 10 (10 años)"
                      sx={numberInputStyle}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 25,
              mt: 6,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              onClick={(e) => saveRequest(e)}
              startIcon={<NearMeIcon />}
              sx={{
                ...buttonStyle,
                backgroundColor: '#42b983',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#37a372',
                },
              }}
            >
              Solicitar
            </Button>

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
        </Box>
      </div>
    </div>
  );
}

export default CreateRequest;