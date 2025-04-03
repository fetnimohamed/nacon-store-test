import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  TextField,
  InputAdornment,
  Divider,
  Typography,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

// Mock function to fetch products - replace with actual API call
const fetchProducts = async (storeId: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock products
  return [
    { id: "product1", name: "Product 1", price: 19.99, category: "Category A" },
    { id: "product2", name: "Product 2", price: 29.99, category: "Category B" },
    { id: "product3", name: "Product 3", price: 39.99, category: "Category A" },
    { id: "product4", name: "Product 4", price: 49.99, category: "Category C" },
    { id: "product5", name: "Product 5", price: 59.99, category: "Category B" },
    {
      id: "product6",
      name: "Premium Item",
      price: 99.99,
      category: "Category A",
    },
    {
      id: "product7",
      name: "Budget Option",
      price: 9.99,
      category: "Category C",
    },
    {
      id: "product8",
      name: "Special Edition",
      price: 149.99,
      category: "Category B",
    },
  ];
};

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ProductSelectorProps {
  open: boolean;
  onClose: () => void;
  storeId: string;
  selectedProductIds: string[];
  onProductsSelected: (productIds: string[]) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  open,
  onClose,
  storeId,
  selectedProductIds,
  onProductsSelected,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Load products when dialog opens
  useEffect(() => {
    if (open && storeId) {
      loadProducts();
    }
  }, [open, storeId]);

  // Initialize selected products from props
  useEffect(() => {
    setSelectedIds([...selectedProductIds]);
  }, [selectedProductIds]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const productData = await fetchProducts(storeId);
      setProducts(productData);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(productData.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProduct = (productId: string) => {
    if (selectedIds.includes(productId)) {
      setSelectedIds(selectedIds.filter((id) => id !== productId));
    } else {
      setSelectedIds([...selectedIds, productId]);
    }
  };

  const handleSelectAll = () => {
    if (filteredProducts.length === selectedIds.length) {
      // If all are selected, deselect all
      setSelectedIds([]);
    } else {
      // Select all filtered products
      const allFilteredIds = filteredProducts.map((product) => product.id);
      setSelectedIds(allFilteredIds);
    }
  };

  const handleSave = () => {
    onProductsSelected(selectedIds);
    onClose();
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Sélectionner des produits</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            placeholder="Rechercher des produits"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
            size="small"
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Catégorie</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as string)}
              label="Catégorie"
            >
              <MenuItem value="">Toutes les catégories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button variant="outlined" size="small" onClick={handleSelectAll}>
            {filteredProducts.length === selectedIds.length
              ? "Désélectionner tout"
              : "Sélectionner tout"}
          </Button>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {selectedIds.length} produit(s) sélectionné(s)
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <List
                sx={{
                  maxHeight: "400px",
                  overflow: "auto",
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                }}
              >
                {filteredProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    <ListItemButton
                      onClick={() => handleToggleProduct(product.id)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={selectedIds.includes(product.id)}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={product.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {product.price.toFixed(2)} €
                            </Typography>
                            {` — ${product.category}`}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ p: 2, textAlign: "center" }}>
                Aucun produit ne correspond à vos critères de recherche.
              </Typography>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          startIcon={<AddIcon />}
        >
          Ajouter les produits sélectionnés
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductSelector;
