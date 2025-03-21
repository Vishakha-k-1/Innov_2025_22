import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../images/icon.png";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#202020" }}>
      <Toolbar>
        
        <img
          src={logo}
          alt="Logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
            AyurFlora
            </Typography>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/tracker">
          Plant Growth Tracker
        </Button>
        <Button color="inherit" component={Link} to="/remedies">
          Herbal Remedies
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
