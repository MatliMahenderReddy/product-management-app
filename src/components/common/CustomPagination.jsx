import React from "react";
import { Box, Pagination, Typography, Chip } from "@mui/material";

 const CustomPagination=({ 
  totalPages, 
  currentPage, 
  setCurrentPage, 
  filteredLength, 
  itemsPerPage 
})=> {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredLength);

  if (totalPages <= 1) return null;

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "center", sm: "space-between" }, 
        alignItems: "center",
        mt: 4,
        mb: 2,
        px: { xs: 1.5, sm: 2 },
        py: { xs: 2, sm: 2 },
        bgcolor: "grey.50",
        borderRadius: 2,
        gap: { xs: 2, sm: 2 },
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: { xs: 0.5, sm: 1 },
          flexWrap: "wrap",
          justifyContent: "center",
          order: { xs: 2, sm: 1 },
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          Showing
        </Typography>
        <Chip 
          label={`${startIndex}-${endIndex}`} 
          size="small" 
          color="primary"
          sx={{ fontWeight: 600, height: { xs: 22, sm: 24 } }}
        />
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          of
        </Typography>
        <Chip 
          label={filteredLength} 
          size="small" 
          color="default"
          sx={{ fontWeight: 600, height: { xs: 22, sm: 24 } }}
        />
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          products
        </Typography>
      </Box>
      <Box 
        sx={{ 
          order: { xs: 1, sm: 2 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
          size="medium"
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.95rem" },
              minWidth: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
            },
            "& .Mui-selected": {
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
export default CustomPagination;