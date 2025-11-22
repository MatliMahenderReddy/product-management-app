import React, { useState } from "react";
import {
  Box,
  Stack,
  ButtonGroup,
  Button,
  Alert,
  Container
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AddIcon from "@mui/icons-material/Add";
import { ProductGrid, ProductTable } from "../../components/ProductList";
import SearchBar from "../../components/SearchBar";
import CustomPagination from "../../components/common/CustomPagination";
import Toast from "../../components/common/Toast";
import DeleteConfirmDialog from "../../components/models/DeleteConfirmDialog";
import useProducts from "../../hooks/useProducts";
import ProductForm from "../../components/Forms/ProductForm";
const  ProductsPage=()=>{
  const {
    paginated,
    search,
    setSearch,
    saveProduct,
    deleteProduct,
    errors,
    editing,
    setEditing,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredLength,
    itemsPerPage,
    setErrors,
    products,
  } = useProducts();

  const [view, setView] = useState("list");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    tags: "",
    isActive: true,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    product: null,
  });

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    title: "",
    message: "",
  });

  const handleEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description,
      tags: product.tags.join(", "),
      isActive: product.isActive,
    });
    setOpen(true);
  };
  const handleDelete = (product) => {
    setDeleteDialog({
      open: true,
      product: product,
    });
  };
  const handleConfirmDelete = () => {
    const product = deleteDialog.product;
    deleteProduct(product.id);
    setToast({
      open: true,
      severity: "success",
      title: "Deleted!",
      message: `Product "${product.name}" has been deleted successfully.`,
    });
    
    setDeleteDialog({ open: false, product: null });
  };
  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, product: null });
  };

  const handleSubmit = () => {
    const success = saveProduct(form);
    if (success) {
      setOpen(false);
      setToast({
        open: true,
        severity: "success",
        title: editing ? "Updated!" : "Added!",
        message: editing 
          ? `Product "${form.name}" has been updated successfully.`
          : `Product "${form.name}" has been added successfully.`,
      });
      
      setEditing(null);
      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        tags: "",
        isActive: true,
      });
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      tags: "",
      isActive: true,
    });
    setOpen(true);
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3, width: "100%", alignItems: { xs: "stretch", md: "center" } }}
      >
        <Box sx={{ flex: 1 }}>
          <SearchBar value={search} onChange={setSearch} />
        </Box>

        <Stack 
  direction={{ xs: "column", sm: "row" }} 
  spacing={1} 
  sx={{ alignItems: "stretch" }}
>
  <ButtonGroup 
    variant="outlined" 
    sx={{ 
      width: { xs: "100%", sm: "auto" },
    }}
  >
    <Button
      variant={view === "list" ? "contained" : "outlined"}
      onClick={() => setView("list")}
      startIcon={<ViewListIcon />}
      sx={{ flex: 1 }}
    >
      List
    </Button>
    <Button
      variant={view === "grid" ? "contained" : "outlined"}
      onClick={() => setView("grid")}
      startIcon={<ViewModuleIcon />}
      sx={{ flex: 1 }}
    >
      Grid
    </Button>
  </ButtonGroup>

  <Button 
    variant="contained" 
    color="success" 
    startIcon={<AddIcon />} 
    onClick={handleAdd}
    sx={{ 
      width: { xs: "100%", sm: "auto" },
    }}
  >
    Add Product
  </Button>
</Stack>
      </Stack>

      {filteredLength === 0 ? (
        <Alert severity="info">No products found.</Alert>
      ) : (
        <>
          <Box sx={{ width: "100%", mb: 3 }}>
            {view === "list" ? (
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 1,
                }}
              >
                <ProductTable products={paginated} onEdit={handleEdit} onDelete={handleDelete} />
              </Box>
            ) : (
              <ProductGrid products={paginated} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </Box>

          {totalPages > 1 && (
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filteredLength={filteredLength}
              itemsPerPage={itemsPerPage}
            />
          )}
        </>
      )}

      <ProductForm 
        open={open} 
        onClose={() => {
            setOpen(false)
           setErrors("")}
        } 
        onSubmit={handleSubmit} 
        data={form} 
        setData={setForm} 
        errors={errors} 
        editing={editing} 
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        productName={deleteDialog.product?.name || ""}
      />
      <Toast
        open={toast.open}
        onClose={handleToastClose}
        severity={toast.severity}
        title={toast.title}
        message={toast.message}
      />
    </Container>
  );
}
export default ProductsPage;