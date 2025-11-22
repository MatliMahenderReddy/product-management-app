import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange }) {
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        placeholder="Search products by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          maxWidth: { md: "520px" },
          bgcolor: "background.paper",
        }}
      />
    </Box>
  );
}
