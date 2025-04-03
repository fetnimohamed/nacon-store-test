import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, createProduct } from "../api/mockApi";
import { fetchStores } from "../api/storeApi";
import { Product, Store } from "../types/Product";

const ProductEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const storeData = await fetchStores();
        setStores(storeData);
      } catch (err) {
        console.error("Erreur lors du chargement des boutiques:", err);
      }
    };
    loadStores();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (id && id !== "new") {
        try {
          setLoading(true);
          const data = await fetchProductById(id);
          setProduct(data);
        } catch (err) {
          console.error("Erreur lors du chargement du produit:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setProduct({
          id: "new",
          name: "",
          description: "",
          price: 0,
          currency: "gold",
          imageUrl: "",
          category: "",
          isActive: true,
          storeId: "",
        });
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setProduct((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              type === "checkbox"
                ? checked
                : name === "price"
                ? parseFloat(value)
                : value,
          }
        : prev
    );
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setProduct((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      createProduct(product);
      navigate("/products");
    }
  };

  if (loading) return <Typography>Chargement...</Typography>;
  if (!product) return <Typography>Produit non trouvé</Typography>;

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
      <Typography variant="h4" fontWeight="bold" mb={4}>
        {id === "new" ? "Ajouter un produit" : `Modifier : ${product.name}`}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Formulaire */}
        <Box sx={{ flex: 2 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "12px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nom du produit"
                name="name"
                fullWidth
                margin="normal"
                required
                value={product.name}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
              />

              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={product.description}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: "#ccc" }}>Catégorie</InputLabel>
                <Select
                  name="category"
                  value={product.category}
                  onChange={handleSelectChange}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="weapons">Armes</MenuItem>
                  <MenuItem value="armor">Armures</MenuItem>
                  <MenuItem value="potions">Potions</MenuItem>
                  <MenuItem value="misc">Divers</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Prix"
                type="number"
                name="price"
                fullWidth
                margin="normal"
                inputProps={{ min: 0, step: 0.01 }}
                value={product.price}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: "#ccc" }}>Monnaie</InputLabel>
                <Select
                  name="currency"
                  value={product.currency}
                  onChange={handleSelectChange}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="gold">Or</MenuItem>
                  <MenuItem value="gems">Gemmes</MenuItem>
                  <MenuItem value="coins">Pièces</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="URL de l'image"
                name="imageUrl"
                fullWidth
                margin="normal"
                value={product.imageUrl}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: "#ccc" }}>Boutique</InputLabel>
                <Select
                  name="storeId"
                  value={product.storeId}
                  onChange={handleSelectChange}
                  required
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="">Sélectionnez une boutique</MenuItem>
                  {stores.map((store) => (
                    <MenuItem key={store.id} value={store.id}>
                      {store.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormGroup sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isActive"
                      checked={product.isActive}
                      onChange={handleInputChange}
                      sx={{ color: "#fff" }}
                    />
                  }
                  label="Actif"
                />
              </FormGroup>

              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" color="success">
                  Sauvegarder
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/products")}
                >
                  Annuler
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>

        {/* Aperçu */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "12px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Aperçu
            </Typography>
            {product.imageUrl && (
              <Box sx={{ mb: 2 }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              </Box>
            )}
            <Typography variant="subtitle1" fontWeight="bold">
              {product.name || "Nom du produit"}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {product.price} {product.currency}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {product.description || "Description du produit"}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductEdit;
