import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

export default function Toast({ open, onClose, severity, title, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ 
          width: "100%",
          minWidth: 300,
          boxShadow: 3,
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
}