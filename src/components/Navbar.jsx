import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
export default function Navbar() {
  return (
    <AppBar position="static" 
    sx={{ background: "#1976d2" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <InventoryIcon />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Product Management System
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
