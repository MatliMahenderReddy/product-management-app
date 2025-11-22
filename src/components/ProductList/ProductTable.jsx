import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../../utils/formatDate";

export default function ProductTable({ products, onEdit, onDelete }) {
  const getStockColor = (stock) => {
    if (stock > 20) return "success";
    if (stock > 0) return "warning";
    return "error";
  };

  return (
    <TableContainer component={Paper} elevation={2} sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.100" }}>
            <TableCell sx={{ width: 60, fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ minWidth: 250, fontWeight: 600 }}>Name & Description</TableCell>
            <TableCell sx={{ width: 120, fontWeight: 600 }}>Price</TableCell>
            <TableCell sx={{ width: 130, fontWeight: 600 }}>Category</TableCell>
            <TableCell sx={{ width: 120, fontWeight: 600 }}>Stock</TableCell>
            <TableCell sx={{ width: 110, fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ minWidth: 180, fontWeight: 600 }}>Tags</TableCell>
            <TableCell sx={{ width: 130, fontWeight: 600 }}>Created</TableCell>
            <TableCell align="center" sx={{ width: 120, fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p) => (
            <TableRow 
              key={p.id} 
              hover
              sx={{ 
                "&:hover": { bgcolor: "grey.50" },
                "& td": { py: 2 }
              }}
            >
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {p.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  fontWeight={600} 
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.4,
                    mb: 0.5,
                    wordBreak: "break-word",
                  }}
                >
                  {p.name}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.4,
                    wordBreak: "break-word",
                  }}
                >
                  {p.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="success.main" fontWeight="bold">
                  ₹{p.price.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip 
                  label={p.category} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={`${p.stock} units`} 
                  size="small" 
                  color={getStockColor(p.stock)} 
                />
              </TableCell>

              <TableCell>
                <Chip 
                  label={p.isActive ? "Active" : "Inactive"} 
                  size="small" 
                  color={p.isActive ? "success" : "default"} 
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ gap: 0.5 }}>
                  {p.tags.slice(0, 2).map((t, i) => (
                    <Chip 
                      key={i} 
                      label={t} 
                      size="small" 
                      variant="outlined" 
                    />
                  ))}
                  {p.tags.length > 2 && (
                    <Chip 
                      label={`+${p.tags.length - 2}`} 
                      size="small" 
                      variant="outlined"
                    />
                  )}
                </Stack>
              </TableCell>

              <TableCell>
                <Typography variant="body2">
                  {formatDate(p.createdAt)}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                  <IconButton 
                    onClick={() => onEdit(p)} 
                    color="primary" 
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    onClick={() => onDelete(p)} 
                    color="error" 
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}