import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStoreById } from "../api/storeApi";
import { Store } from "../types/Product";

// MUI Components
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// MUI Icons
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const StoreEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Sidebar width constant to maintain consistency
  const SIDEBAR_WIDTH = 250;

  useEffect(() => {
    const loadStore = async () => {
      if (id && id !== "new") {
        try {
          setLoading(true);
          const data = await fetchStoreById(id);
          setStore(data);
        } catch (err) {
          console.error("Erreur lors du chargement de la boutique:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setStore({
          id: "new",
          name: "",
          description: "",
          isActive: true,
          gameId: "",
          theme: "default",
        });
        setLoading(false);
      }
    };

    loadStore();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setStore((prev) => {
      if (!prev) return prev;

      if (type === "checkbox") {
        const checked = (e.target as HTMLInputElement).checked;
        return { ...prev, [name]: checked };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Boutique à sauvegarder:", store);
    navigate("/stores");
  };

  const handleCancel = () => {
    navigate("/stores");
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStore((prev) => {
      if (!prev) return prev;
      return { ...prev, isActive: event.target.checked };
    });
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setStore((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  if (loading)
    return (
      <Box
        sx={{
          py: 4,
          px: 3,
          position: "absolute",
          left: { sm: `${SIDEBAR_WIDTH}px`, xs: 0 },
          right: 0,
          boxSizing: "border-box",
          background: "linear-gradient(to right, #212121, #424242)",
          color: "#fff",
        }}
      >
        <Typography>Chargement...</Typography>
      </Box>
    );

  if (!store)
    return (
      <Box
        sx={{
          py: 4,
          px: 3,
          position: "absolute",
          left: { sm: `${SIDEBAR_WIDTH}px`, xs: 0 },
          right: 0,
          boxSizing: "border-box",
          background: "linear-gradient(to right, #212121, #424242)",
          color: "#fff",
        }}
      >
        <Typography>Boutique non trouvée</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #212121, #424242)",
        color: "#fff",
        position: "absolute",
        left: { sm: `${SIDEBAR_WIDTH}px`, xs: 0 },
        right: 0,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ py: 4, px: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id === "new"
            ? "Créer une nouvelle boutique"
            : `Modifier la boutique: ${store.name}`}
        </Typography>

        <Card elevation={2} sx={{ borderRadius: "8px", mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                fullWidth
                label="Nom de la boutique"
                name="name"
                value={store.name}
                onChange={handleChange}
                required
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={store.description || ""}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel>Thème</InputLabel>
                <Select
                  name="theme"
                  value={store.theme || "default"}
                  onChange={handleSelectChange}
                  label="Thème"
                >
                  <MenuItem value="default">Par défaut</MenuItem>
                  <MenuItem value="halloween">Halloween</MenuItem>
                  <MenuItem value="christmas">Noël</MenuItem>
                  <MenuItem value="summer">Été</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={store.isActive}
                    onChange={handleSwitchChange}
                    color="primary"
                    name="isActive"
                  />
                }
                label="Boutique active"
              />

              <TextField
                fullWidth
                label="ID du jeu"
                name="gameId"
                value={store.gameId || ""}
                onChange={handleChange}
                variant="outlined"
              />

              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                >
                  {isMobile ? "Sauver" : "Sauvegarder"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                >
                  {isMobile ? "Annuler" : "Annuler"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default StoreEdit;
