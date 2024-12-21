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
    <Box sx={{ flexGrow: 1 }}> 
      <AppBar position="static" sx={{ backgroundColor: "black", color: "orange" }}> 
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
          <MenuIcon />
        </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
            MicroPB: Sistema de Gestión de préstamos hipotecarios
          </Typography>
        </Toolbar>
      </AppBar>

      <SideMenu open={open} toggleDrawer={toggleDrawer}></SideMenu> 
    </Box>
  );
}