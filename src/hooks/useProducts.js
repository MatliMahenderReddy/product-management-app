import { useState } from "react";
import { initialProducts } from "../data/productData";
import useDebounce from "./useDebounce";
const  useProducts=()=> {
  const [products, setProducts] = useState(initialProducts || []);
  const [search, setSearch] = useState("");
 const debouncedSearch = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const itemsPerPage = 8; 
   const filtered = products.filter((p) =>
    p.name.toLowerCase().includes((debouncedSearch || "").toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);
  const saveProduct = (formData) => {
    const newErrors = {};
    if (!formData.name || !formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Valid price required";
    if (!formData.category || !formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return false;

    const productData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      category: formData.category.trim(),
      stock: Number(formData.stock) || 0,
      description: formData.description ? formData.description.trim() : "",
      tags: formData.tags ? formData.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      isActive: !!formData.isActive,
    };

    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id ? { ...p, ...productData } : p));
    } else {
        const lastId = products.length > 0 
        ? Math.max(...products.map(p => p.id)) 
        : 0;
      setProducts(prev => [
        ...prev,
        { id: lastId + 1, ...productData, createdAt: new Date().toISOString() }
      ]);
    }
    return true;
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return {
    products,
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
    filteredLength: filtered.length,
    itemsPerPage, 
 setErrors,
  };
}

export default useProducts;