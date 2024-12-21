import React, { useState } from 'react';
import simulationService from '../services/simulationService';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { Link } from "react-router-dom";
import { Box, Typography, FormControl, TextField, Button } from '@mui/material';

function Simulation() {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [time, setTime] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [titleClientForm] = useState("Simulación de crédito");

  const doSimulation = (e) => {
    e.preventDefault();

    const request = {rut :"10.000.000-0", type, amount, interest, time, state: 0, id: 0}

    simulationService
    .simulation(request)
    .then((response) => {
        console.log("La simulación del crédito ha sido realizada correctamente.", response.data);
        setMonthlyPayment(response.data);
    })
    .catch((error) => {
        console.log("Ha ocurrido un error al intentar simular el crédito.", error);
    });
  };

  const textFieldStyle = {
    input: { color: '#42b983' },
    label: { color: 'orange' },
    '& .MuiInput-underline:before': { borderBottomColor: '#42b983' },
    '& .MuiInput-underline:hover:before': { borderBottomColor: '#42b983 !important' },
    '& .MuiInput-underline:after': { borderBottomColor: '#42b983' },
    '& .MuiInputLabel-root': { color: 'orange' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'orange' },
    '& .MuiInputBase-root': { '&.Mui-focused': { borderColor: '#42b983' } },
    '& .MuiFormHelperText-root': { color: 'yellow' },
    '& .MuiFormHelperText-root.Mui-error': { color: 'red' },
  };

  return (
    <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    component="form"
    sx={{ backgroundColor: '#2c3e50', padding: 20, borderRadius: 2, boxShadow: 5, gap: 4,}}
    >
      <Typography variant="h5" style={{ color: 'orange' }}>
            {titleClientForm}
      </Typography>

      <FormControl fullWidth>
          <TextField
            id="type"
            label="Type of request"
            value={type}
            variant="standard"
            onChange={(e) => setType(e.target.value)}
            helperText="Tipo de préstamo. Ej: Primera Vivienda"
            sx={textFieldStyle}
          />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="amount"
          label="Amount of the request"
          type="number"
          value={amount}
          variant="standard"
          onChange={(e) => setAmount(e.target.value)}
          helperText="Monto del préstamo en Pesos Chilenos. Ej: 5000000"
          sx={{
            ...textFieldStyle,
            '& input[type=number]': {
                color: '#42b983', 
                '-moz-appearance': 'textfield', 
                '-webkit-appearance': 'none',
            },
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                display: 'none',
            },
          }}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
            id="interest"
            label="Interest of the request"
            type="number"
            value={interest}
            variant="standard"
            onChange={(e) => setInterest(e.target.value)}
            helperText="Ingresa el interés anual del préstamo en valor decimal. Ej: 3.5"
            sx={{
              ...textFieldStyle,
              '& input[type=number]': {
                  color: '#42b983', 
                  '-moz-appearance': 'textfield', 
                  '-webkit-appearance': 'none',
              },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  display: 'none',
              },
            }}
        />
        </FormControl>

      <FormControl fullWidth>
          <TextField
            id="time"
            label="Time to pay back the loan"
            type="number"
            value={time}
            variant="standard"
            onChange={(e) => setTime(e.target.value)}
            helperText="Plazo para devolver el préstamo en años. Ej: 10 (10 años)"
            sx={{
              ...textFieldStyle,
              '& input[type=number]': {
                  color: '#42b983', 
                  '-moz-appearance': 'textfield', 
                  '-webkit-appearance': 'none',
              },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  display: 'none',
              },
            }}
          />
      </FormControl>

    <FormControl>
        <br />
        <Button
          variant="contained"
          color="info"
          type="submit"
          onClick={(e) => doSimulation(e)}
          startIcon={<LinearScaleIcon />}
          sx={{
            backgroundColor: '#42b983',
            color: 'black',
            '&:hover': {
              backgroundColor: '#37a372',
            },
          }}
        >
          Simular 
        </Button>
    </FormControl>

    {monthlyPayment !== null && (
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" style={{ color: '#42b983' }}>
          Cuota mensual estimada: 
          <span style={{ color: 'orange' }}> ${monthlyPayment}</span>
        </Typography>
      </Box>
    )}

      <Box
          sx={{
              marginTop: 3,
              borderColor: "orange",
              color: "orange",
              "&:hover": {
                  borderColor: "red", 
                  color: "red",      
              },
          }}
      >
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
}
export default Simulation;