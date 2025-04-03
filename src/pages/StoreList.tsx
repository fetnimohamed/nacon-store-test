import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { fetchStores } from "../api/storeApi";
import { Store } from "../types/Product";
import {
  Add,
  Preview,
  Edit,
  Settings,
  ShoppingCart,
} from "@mui/icons-material";

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStores = async () => {
      try {
        setLoading(true);
        const data = await fetchStores();
        setStores(data);
      } catch (err) {
        console.error("Erreur lors du chargement des boutiques:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1a1a2e, #16213e)",
        color: "#fff",
        padding: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 4,
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Gestion des Boutiques
        </Typography>
        <Button
          component={Link}
          to="/stores/new"
          variant="contained"
          color="success"
          startIcon={<Add />}
        >
          Ajouter une boutique
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", margin: -1.5 }}>
          {stores.length > 0 ? (
            stores.map((store) => (
              <Box
                key={store.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "50%",
                    md: "33.333%",
                  },
                  padding: 1.5,
                }}
              >
                <Card
                  sx={{
                    background: "#2c2c54",
                    color: "white",
                    boxShadow: 3,
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {store.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {store.description}
                    </Typography>
                    <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                      <Chip
                        label={`Thème: ${store.theme || "Default"}`}
                        sx={{ background: "#ff9f43", color: "#fff" }}
                      />
                      <Chip
                        label={store.isActive ? "Actif" : "Inactif"}
                        sx={{
                          background: store.isActive ? "#28a745" : "#e74c3c",
                          color: "#fff",
                        }}
                      />
                    </Box>
                    <Box mt={3} display="flex" gap={1} flexWrap="wrap">
                      <Button
                        component={Link}
                        to={`/preview/${store.id}`}
                        variant="contained"
                        color="primary"
                        startIcon={<Preview />}
                      >
                        Aperçu
                      </Button>
                      <Button
                        component={Link}
                        to={`/stores/edit/${store.id}`}
                        variant="contained"
                        color="warning"
                        startIcon={<Edit />}
                      >
                        Éditer
                      </Button>
                      <Button
                        component={Link}
                        to={`/stores/config/${store.id}`}
                        variant="contained"
                        color="secondary"
                        startIcon={<Settings />}
                      >
                        Configuration
                      </Button>
                      <Button
                        component={Link}
                        to={`/products?storeId=${store.id}`}
                        variant="contained"
                        color="success"
                        startIcon={<ShoppingCart />}
                      >
                        Produits
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Box sx={{ width: "100%", padding: 1.5 }}>
              <Typography textAlign="center">
                Aucune boutique disponible. Créez-en une nouvelle pour
                commencer.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default StoreList;
