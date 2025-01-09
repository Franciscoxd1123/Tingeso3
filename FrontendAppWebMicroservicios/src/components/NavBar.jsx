import * as React from "react"; 
import AppBar from "@mui/material/AppBar"; 
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar"; 
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton"; 
import MenuIcon from "@mui/icons-material/Menu";
import SideMenu from "./SideMenu"; 
import { useState } from "react"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setOpen(open); 
  };

  return (
    <Box sx={{ flexGrow: 1,  width: '100%',}}> 
      <AppBar position="static" sx={{ backgroundColor: "#1e2a47", color: "orange" }}> 
        <Toolbar> 
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
            '&:focus': {
              outline: 'none',
            },
          }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon sx={{ fontSize: 35 }}/>
        </IconButton>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}> 
            MicroPB: Sistema de Gestión de préstamos hipotecarios
          </Typography>
        </Toolbar>
      </AppBar>

      <SideMenu open={open} toggleDrawer={toggleDrawer}></SideMenu> 
    </Box>
  );
}