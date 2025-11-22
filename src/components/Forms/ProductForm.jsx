import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";
const ProductForm=({ open, onClose, onSubmit, data, setData, errors, editing })=> {
  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <TextField
            label="Name"
            required
            fullWidth
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Price"
            required
            fullWidth
            type="number"
            value={data.price}
            onChange={(e) => handleChange("price", e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
            InputProps={{ inputProps: { min: 0 } }}
          />

          <TextField
            label="Category"
            required
            fullWidth
            value={data.category}
            onChange={(e) => handleChange("category", e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
          />

          <TextField
            label="Stock"
            fullWidth
            type="number"
            value={data.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <TextField
            label="Tags (comma-separated)"
            fullWidth
            value={data.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            placeholder="e.g., electronics, wireless, portable"
          />

          <FormControlLabel
            control={
              <Switch
                checked={data.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
              />
            }
            label="Active"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">
          {editing ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductForm;