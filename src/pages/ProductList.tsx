import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { fetchProducts } from "../api/mockApi";
import { Product } from "../types/Product";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState({ category: "all", status: "all" });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name as string]: value }));
  };

  const filteredProducts = products.filter((product) => {
    if (filter.category !== "all" && product.category !== filter.category)
      return false;
    if (filter.status === "active" && !product.isActive) return false;
    if (filter.status === "inactive" && product.isActive) return false;
    return true;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #212121, #424242)",
        color: "#fff",
        px: { xs: 2, md: 6 },
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Gestion des Produits
        </Typography>
        <Button
          component={Link}
          to="/products/new"
          variant="contained"
          color="success"
        >
          + Ajouter un produit
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "#333",
          padding: 3,
          borderRadius: 2,
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#ccc" }}>Catégorie</InputLabel>
          <Select
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            sx={{ color: "#fff" }}
          >
            <MenuItem value="all">Toutes les catégories</MenuItem>
            <MenuItem value="weapons">Armes</MenuItem>
            <MenuItem value="armor">Armures</MenuItem>
            <MenuItem value="potions">Potions</MenuItem>
            <MenuItem value="misc">Divers</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel sx={{ color: "#ccc" }}>Statut</InputLabel>
          <Select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            sx={{ color: "#fff" }}
          >
            <MenuItem value="all">Tous les statuts</MenuItem>
            <MenuItem value="active">Actif</MenuItem>
            <MenuItem value="inactive">Inactif</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Typography>Chargement...</Typography>
      ) : (
        <Paper
          sx={{
            overflowX: "auto",
            backgroundColor: "#333",
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Image</TableCell>
                <TableCell sx={{ color: "#fff" }}>Nom</TableCell>
                <TableCell sx={{ color: "#fff" }}>Catégorie</TableCell>
                <TableCell sx={{ color: "#fff" }}>Prix</TableCell>
                <TableCell sx={{ color: "#fff" }}>Statut</TableCell>
                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.imageUrl || "/placeholder-image.png"}
                      alt={product.name}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {product.category}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {product.price} {product.currency}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 12,
                        backgroundColor: product.isActive
                          ? "#e6f7e6"
                          : "#f7e6e6",
                        color: product.isActive ? "#2ecc71" : "#e74c3c",
                      }}
                    >
                      {product.isActive ? "Actif" : "Inactif"}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Link
                        to={`/products/edit/${product.id}`}
                        style={{ color: "#3498db", textDecoration: "none" }}
                      >
                        Éditer
                      </Link>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#e74c3c",
                          cursor: "pointer",
                        }}
                      >
                        Supprimer
                      </button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ textAlign: "center", color: "#aaa" }}
                  >
                    Aucun produit ne correspond aux critères de filtrage.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default ProductList;
