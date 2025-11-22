import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tag } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const ProductGrid = ({ products, onEdit, onDelete }) => {
    const getStockColor = (stock) => {
        if (stock > 20) return "success";
        if (stock > 0) return "warning";
        return "error";
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                },
                gap: 2.5,
                width: "100%",
            }}
        >
            {products.map((p) => (
                <Card
                    key={p.id}
                    elevation={2}
                    sx={{
                        height: 360,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 2,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 4,
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            flexGrow: 1,
                            p: 2.5,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1.5,
                                gap: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    lineHeight: 1.4,
                                    flex: 1,
                                    height: 56,
                                    fontSize: "1rem",
                                    wordBreak: "break-word",
                                }}
                            >
                                {p.name}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                                <IconButton
                                    onClick={() => onEdit(p)}
                                    size="small"
                                    color="primary"
                                    sx={{ p: 0.5 }}
                                >
                                    <EditIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                                <IconButton
                                    onClick={() => onDelete(p)}
                                    size="small"
                                    color="error"
                                    sx={{ p: 0.5 }}
                                >
                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography
                            variant="h5"
                            color="success.main"
                            fontWeight="bold"
                            sx={{ mb: 1.5, height: 36 }}
                        >
                            ₹{p.price.toLocaleString()}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 0.5,
                                mb: 1.5,
                                flexWrap: "wrap",
                            }}
                        >
                            <Chip
                                label={p.category}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                label={`${p.stock} units`}
                                size="small"
                                color={getStockColor(p.stock)}
                            />
                            <Chip
                                label={p.isActive ? "Active" : "Inactive"}
                                size="small"
                                color={p.isActive ? "success" : "default"}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                lineHeight: 1.5,
                                mb: 1.5,
                                height: 63,
                            }}
                        >
                            {p.description}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 0.5,
                                flexWrap: "wrap",
                                mt: "auto",
                            }}
                        >
                            {p.tags.slice(0, 2).map((t, i) => (
                                <Chip
                                    key={i}
                                    icon={<Tag size={14} />}
                                    size="small"
                                    label={t}
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
                        </Box>
                    </CardContent>
                    <Box
                        sx={{
                            px: 2.5,
                            py: 1.5,
                            borderTop: 1,
                            borderColor: "divider",
                            bgcolor: "grey.50",
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            Created: {formatDate(p.createdAt)}
                        </Typography>
                    </Box>
                </Card>
            ))}
        </Box>
    );
}
export default ProductGrid;