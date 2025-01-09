import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clientService from "../services/clientService";
import { Box, Grid, FormControl, TextField, Button, MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Navbar from './Navbar';

const CreateClient = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");
    const [saved, setSaved] = useState("");
    const [csaved, setcsaved] = useState("");
    const [latePayment, setLatePayment] = useState("");
    const [debt, setDebt] = useState("");
    const [freelance, setFreelance] = useState("");
    const [seniority, setSeniority] = useState("");
    const [stable, setStable] = useState("");
    const [retreats, setRetreats] = useState("");
    const [recentRetreats, setRecentRetreats] = useState("");
    const [deposits, setDeposits] = useState("");
    const { id } = useParams();
    const [titleClientForm] = useState("Nuevo Cliente");
    const navigate = useNavigate();
    const [hasDebt, setHasDebt] = useState(false);

    const capitalizeWords = (str) => {
        return str
            .split(' ') // Divide la cadena por espacios
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza la primera letra de cada palabra
            .join(' '); // Vuelve a unir las palabras en una sola cadena
    };    

    const formatRut = (value) => {
        const cleanValue = value.replace(/[^0-9kK]/g, '');
        const numberPart = cleanValue.slice(0, -1);
        const dv = cleanValue.slice(-1);
        const formattedNumberPart = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${formattedNumberPart}${dv ? `-${dv}` : ''}`;
    };

    // Formatea el número en formato de miles (por ejemplo: 3024191 => 3.024.191)
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('es-CL').format(amount);
    };

    const handleFormattedChange = (setterFunction) => (e) => {
        const rawValue = e.target.value.replace(/\./g, '').replace(/,/g, ''); // Elimina los puntos y comas
        if (!isNaN(rawValue) && rawValue !== '') {
          setterFunction(formatAmount(rawValue)); // Aplica el formato
        } else {
          setterFunction(''); // Si no es un número válido, resetea el valor
        }
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
        overflowX: 'hidden',
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

    const buttonStyle = {
        fontSize: '1.2rem',
        padding: '15px 40px',
        '& .MuiSvgIcon-root': {
            fontSize: '2rem',
            marginRight: '10px',
        },
    };

    const saveClient = (e) => {
        e.preventDefault();

        const client = {
            name,
            lastName,
            rut,
            age: Number(age), 
            salary: Number(salary.replace(/\./g, '')), // Elimina puntos y convierte salary a number
            saved: Number(saved.replace(/\./g, '')), 
            csaved: Number(csaved), 
            latePayment: latePayment, 
            debt: hasDebt ? Number(debt.replace(/\./g, '')) : 0, // Asigna 0 si no tiene deuda
            freelance: freelance,
            seniority: Number(seniority),
            stable: stable,
            retreats: Number(retreats.replace(/\./g, '')), 
            recentRetreats: Number(recentRetreats.replace(/\./g, '')), 
            deposits: Number(deposits.replace(/\./g, '')),
            id,
        };

        clientService
        .create(client)
        .then((response) => {
            console.log("El Nuevo Cliente ha sido registrado con éxito.", response.data);
            alert("Cliente registrado con éxito!");
            navigate("/home");
        })
        .catch((error) => {
            console.log("Ha ocurrido un error al intentar registrar el nuevo cliente.", error);
            alert("Ha ocurrido un error al registrar al cliente.");
        });
    };

    return (
        <Box component="div" sx={containerStyle}>
                <Navbar />
            <Box component="div" sx={contentStyle}>
                <Typography 
                    variant="h4" 
                    style={{ 
                        color: 'orange', 
                        marginBottom: '3rem',
                        fontSize: '3rem',
                        textAlign: 'center', // Añadido para centrar el título
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
                        width: '100%', // Asegura que el formulario ocupe todo el ancho disponible
                        mb: 4,
                        overflowX: 'hidden', // Previene scroll horizontal en el formulario
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        value={name}
                                        variant="standard"
                                        onChange={(e) => setName(capitalizeWords(e.target.value))}
                                        sx={textFieldStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="lastName"
                                        label="Last Name"
                                        value={lastName}
                                        variant="standard"
                                        onChange={(e) => setLastName(capitalizeWords(e.target.value))}
                                        sx={textFieldStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="rut"
                                        label="Rut"
                                        value={rut}
                                        variant="standard"
                                        onChange={(e) => setRut(formatRut(e.target.value))}
                                        helperText="Ej: 12.345.678-9"
                                        sx={textFieldStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="age"
                                        label="Age"
                                        type="number"
                                        value={age}
                                        variant="standard"
                                        onChange={(e) => setAge(e.target.value)}
                                        helperText="La edad mínima es 18 años. Ej: 20"
                                        sx={numberInputStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="salary"
                                        label="Salary"
                                        type="text"
                                        value={salary}
                                        variant="standard"
                                        onChange={handleFormattedChange(setSalary)}
                                        helperText="Salario mensual en Pesos Chilenos. Ej: 500.000"
                                        sx={numberInputStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="saved"
                                        label="Balance in savings account"
                                        type="text"
                                        value={saved}
                                        variant="standard"
                                        onChange={handleFormattedChange(setSaved)}
                                        helperText="Saldo cuenta de ahorros en Pesos Chilenos. Ej: 1.000.000"
                                        sx={numberInputStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="csaved"
                                        label="Seniority of savings account"
                                        type="number"
                                        value={csaved}
                                        variant="standard"
                                        onChange={(e) => setcsaved(e.target.value)}
                                        helperText="Antigüedad cuenta de ahorros en años. Ej: 3"
                                        sx={numberInputStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 6.3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="latePayment"
                                        label="Do you have any debts?"
                                        value={latePayment}
                                        select
                                        variant="standard"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setLatePayment(value);
                                            if (value === "false") {
                                                setDebt('0');  // Si no tiene deudas, se pone deuda a 0
                                            }
                                        }}
                                        sx={{
                                            ...textFieldStyle,
                                            '& .MuiInputBase-root': {
                                                color: '#42b983',
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#42b983',
                                                fontSize: '1.5rem'
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#42b983',
                                            },
                                            '& .MuiInputBase-root.Mui-disabled': {
                                                color: '#42b983',  // Mantener el color cuando está deshabilitado
                                            },
                                            '& .MuiInputBase-input.Mui-disabled': {
                                                color: '#42b983',  // Mantener el color del texto cuando está deshabilitado
                                            },
                                        }}
                                        SelectProps={{
                                            MenuProps: {
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
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="true" sx={{ fontSize: '1.5rem' }}>Yes</MenuItem>
                                        <MenuItem value="false" sx={{ fontSize: '1.5rem' }}>No</MenuItem>
                                    </TextField>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="debt"
                                        label="Total value of debts"
                                        type="text"
                                        value={debt}
                                        variant="standard"
                                        onChange={handleFormattedChange(setDebt)}
                                        helperText="Suma de deudas en Pesos Chilenos. Ej: 200.000"
                                        sx={{
                                            ...numberInputStyle,
                                            '& .MuiInputBase-root': {
                                                color: '#42b983', // Color cuando está habilitado
                                            },
                                            '& .MuiInputBase-input': {
                                                color: debt === '0' ? '#42b983' : '#42b983', // Combina estilos aquí
                                                fontSize: '1.5rem',
                                            },
                                            '& .MuiInputBase-root.Mui-disabled': {
                                                color: 'orange',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)', // Color de fondo cuando está deshabilitado
                                            },
                                        }}
                                        disabled={latePayment === "false"} // Deshabilita el campo si no hay deudas
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 6.3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="freelance"
                                        label="Are you freelance?"
                                        value={freelance}
                                        select
                                        variant="standard"
                                        onChange={(e) => setFreelance(e.target.value === 'true')}
                                        sx={{
                                            ...textFieldStyle,
                                            '& .MuiInputBase-root': {
                                                color: '#42b983', // Color del texto después de seleccionar
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#42b983', // Color del texto dentro del campo
                                                fontSize: '1.5rem'
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#42b983', // Color de la flecha
                                            },
                                        }}
                                        SelectProps={{
                                            MenuProps: {
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
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="true" sx={{ fontSize: '1.5rem' }}>Yes</MenuItem>
                                        <MenuItem value="false" sx={{ fontSize: '1.5rem' }}>No</MenuItem>
                                    </TextField>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                        <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="seniority"
                                        label="Seniority in work"
                                        type="number"
                                        value={seniority}
                                        variant="standard"
                                        onChange={(e) => setSeniority(e.target.value)}
                                        helperText="Antigüedad en el trabajo en años. Ej: 5"
                                        sx={numberInputStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 6.3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="stable"
                                        label="Are you stable?"
                                        value={stable}
                                        select
                                        variant="standard"
                                        onChange={(e) => setStable(e.target.value === 'true')}
                                        sx={{
                                            ...textFieldStyle,
                                            '& .MuiInputBase-root': {
                                                color: '#42b983', // Color del texto después de seleccionar
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#42b983', // Color del texto dentro del campo
                                                fontSize: '1.5rem'
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#42b983', // Color de la flecha
                                            },
                                        }}
                                        SelectProps={{
                                            MenuProps: {
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
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="true" sx={{ fontSize: '1.5rem' }}>Yes</MenuItem>
                                        <MenuItem value="false" sx={{ fontSize: '1.5rem' }}>No</MenuItem>
                                    </TextField>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="retreats"
                                        label="Total of retreats in the last twelve months"
                                        type="text"
                                        value={retreats}
                                        variant="standard"
                                        onChange={handleFormattedChange(setRetreats)}
                                        helperText="Suma de retiros en los últimos 12 meses en Pesos Chilenos. Ej: 50.000"
                                        sx={numberInputStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="recentRetreats"
                                        label="Total of retreats in the last six months"
                                        type="text"
                                        value={recentRetreats}
                                        variant="standard"
                                        onChange={handleFormattedChange(setRecentRetreats)}
                                        helperText="Suma de retiros en los últimos 6 meses en Pesos Chilenos. Ej: 25.000"
                                        sx={numberInputStyle}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 1 }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="deposits"
                                        label="Total of deposits in the last twelve months"
                                        type="text"
                                        value={deposits}
                                        variant="standard"
                                        onChange={handleFormattedChange(setDeposits)}
                                        helperText="Suma de depósitos en los últimos 12 meses en Pesos Chilenos. Ej: 100.000"
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
                            gap: { xs: 2, sm: 4, md: 25 }, // Gap responsivo
                            mt: 6,
                            flexWrap: 'wrap', // Permite que los botones se envuelvan en pantallas pequeñas
                            px: 2, // Padding horizontal para los botones
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={(e) => saveClient(e)}
                            startIcon={<SaveIcon />}
                            sx={{
                                ...buttonStyle,
                                backgroundColor: '#42b983',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#37a372',
                                },
                                mb: { xs: 2, sm: 0 }, // Margin bottom en pantallas pequeñas
                            }}
                        >
                            Registrar
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
            </Box>
        </Box>
    );
};

export default CreateClient;