import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const DeleteConfirmDialog=({ open, onClose, onConfirm, productName }) =>{
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon color="error" sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight={600}>
            Confirm Delete
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" color="text.secondary">
          Are you sure you want to delete{" "}
          <strong style={{ color: "#000" }}>"{productName}"</strong>?
        </Typography>
       
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;