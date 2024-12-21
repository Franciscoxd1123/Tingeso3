import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import AssignmentIcon from '@mui/icons-material/Assignment'; 
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function Sidemenu({ open, toggleDrawer }) {
  const menuItems = [
    { text: "Inicio", link: "/home", icon: <HomeIcon />},
    { text: "Registrar Cliente", link: "/clients/create", icon: <PersonAddIcon />},
    { text: "Simulador de Préstamos", link: "/simulation", icon: <LinearScaleIcon />},
    { text: "Mis Solicitudes", link: "/myRequests", icon: <AssignmentIcon />},
    { text: "Solicitar Préstamo", link: "/loan", icon: <MonetizationOnIcon />},
    { text: "Revisar Solicitudes", link: "/allRequests", icon: <AssignmentTurnedInIcon />},
    { text: "Evaluación Crédito", link: "/evaluation", icon: <DoneAllIcon />},
    { text: "Costo Total", link: "/totalCost", icon: <CurrencyExchangeIcon />},
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#2c3e50',
          color: 'orange', 
        },
      }}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)} 
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{
                  '&:hover': {
                    backgroundColor: '#3e5871',
                    color: 'orange', 
                  },
                }}
              >
                {item.icon}
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: 'orange' }} />
      </Box>
    </Drawer>
  );
}