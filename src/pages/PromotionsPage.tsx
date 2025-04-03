import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Alert,
  AlertTitle,
  Switch,
  FormControlLabel,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import StoreIcon from "@mui/icons-material/Store";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PercentIcon from "@mui/icons-material/Percent";

// Import the API and types
import {
  fetchPromotions,
  updatePromotion,
  deletePromotion,
} from "../api/promotionApi";
import { Promotion } from "../types/Promotion";

// Mock API functions - replace with actual API calls
const fetchStores = () => {
  return Promise.resolve([
    { id: "store1", name: "Store 1" },
    { id: "store2", name: "Store 2" },
    { id: "store3", name: "Store 3" },
  ]);
};

// Types
interface Store {
  id: string;
  name: string;
}

// Sidebar width constant
const SIDEBAR_WIDTH = 250;

const PromotionsPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  // Load stores on component mount
  useEffect(() => {
    const loadStores = async () => {
      try {
        const storeData = await fetchStores();
        setStores(storeData);
        if (storeData.length > 0 && !selectedStoreId) {
          setSelectedStoreId(storeData[0].id);
        }
      } catch (error) {
        console.error("Error loading stores:", error);
      }
    };

    loadStores();
  }, []);

  // Load promotions when selected store changes
  useEffect(() => {
    if (selectedStoreId) {
      loadPromotions();
    }
  }, [selectedStoreId]);

  const loadPromotions = async () => {
    try {
      const promotionData = await fetchPromotions(selectedStoreId);
      setPromotions(promotionData);
    } catch (error) {
      console.error("Error loading promotions:", error);
    }
  };

  const handleStoreChange = (event: SelectChangeEvent<string>) => {
    setSelectedStoreId(event.target.value);
  };

  const handleAddPromotion = () => {
    const newPromotion: Promotion = {
      id: `promo-${Date.now()}`,
      storeId: selectedStoreId,
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 10,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      isActive: true,
      appliesTo: "all",
      productIds: [],
      minimumPurchase: 0,
      usageLimit: 0,
      usageCount: 0,
    };

    setCurrentPromotion(newPromotion);
    setDialogOpen(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setCurrentPromotion({ ...promotion });
    setDialogOpen(true);
  };

  const handleDeletePromotion = (promotionId: string) => {
    // In a real app, you would call your API to delete
    setPromotions(promotions.filter((p) => p.id !== promotionId));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentPromotion(null);
  };

  const handleSavePromotion = () => {
    if (!currentPromotion) return;

    // Validation
    if (!currentPromotion.name || !currentPromotion.code) {
      // Show validation error
      return;
    }

    // In a real app, you would call your API to save
    if (promotions.find((p) => p.id === currentPromotion.id)) {
      // Update existing promotion
      setPromotions(
        promotions.map((p) =>
          p.id === currentPromotion.id ? currentPromotion : p
        )
      );
    } else {
      // Add new promotion
      setPromotions([...promotions, currentPromotion]);
    }

    setDialogOpen(false);
    setCurrentPromotion(null);
  };

  const handlePromotionChange = (field: keyof Promotion, value: any) => {
    if (!currentPromotion) return;

    setCurrentPromotion({
      ...currentPromotion,
      [field]: value,
    });
  };

  // Filter promotions based on search and active filter
  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      searchTerm === "" ||
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesActiveFilter =
      filterActive === null || promotion.isActive === filterActive;

    return matchesSearch && matchesActiveFilter;
  });

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
          Gestion des Promotions
        </Typography>

        <Card elevation={2} sx={{ mb: 3, borderRadius: "8px" }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { md: "center" },
                gap: 2,
              }}
            >
              <Box sx={{ flex: { md: 1 } }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Boutique</InputLabel>
                  <Select
                    value={selectedStoreId}
                    onChange={handleStoreChange}
                    label="Boutique"
                    startAdornment={
                      <InputAdornment position="start">
                        <StoreIcon fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    {stores.map((store) => (
                      <MenuItem key={store.id} value={store.id}>
                        {store.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: { md: 2 } }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Rechercher par nom ou code"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ flex: { md: 1 } }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={
                      filterActive === null
                        ? ""
                        : filterActive
                        ? "active"
                        : "inactive"
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setFilterActive(null);
                      } else {
                        setFilterActive(value === "active");
                      }
                    }}
                    label="Statut"
                  >
                    <MenuItem value="">Tous</MenuItem>
                    <MenuItem value="active">Actif</MenuItem>
                    <MenuItem value="inactive">Inactif</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                  flex: { md: 1 },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddPromotion}
                  fullWidth={isMobile}
                >
                  {isMobile ? "Ajouter" : "Nouvelle promotion"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {filteredPromotions.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: "8px", mb: 3 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell>Nom</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Remise</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    Date de début
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    Date de fin
                  </TableCell>
                  <TableCell align="center">Statut</TableCell>
                  <TableCell align="center">Utilisations</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPromotions.map((promotion) => (
                  <TableRow key={promotion.id} hover>
                    <TableCell>{promotion.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={promotion.code}
                        size="small"
                        icon={<LocalOfferIcon />}
                        sx={{ bgcolor: "#efefef" }}
                      />
                    </TableCell>
                    <TableCell>
                      {promotion.discountType === "percentage"
                        ? `${promotion.discountValue}%`
                        : `${promotion.discountValue} €`}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {new Date(promotion.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {new Date(promotion.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={promotion.isActive ? "Actif" : "Inactif"}
                        color={promotion.isActive ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {promotion.usageLimit > 0
                        ? `${promotion.usageCount}/${promotion.usageLimit}`
                        : promotion.usageCount}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Modifier">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditPromotion(promotion)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeletePromotion(promotion.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 3, textAlign: "center", borderRadius: "8px" }}>
            <Typography variant="body1" color="text.secondary">
              {selectedStoreId
                ? searchTerm || filterActive !== null
                  ? "Aucune promotion ne correspond à vos critères de recherche."
                  : "Aucune promotion n'a été configurée pour cette boutique. Cliquez sur 'Nouvelle promotion' pour en créer une."
                : "Veuillez sélectionner une boutique pour voir ses promotions."}
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Promotion Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentPromotion?.id?.includes("promo-")
            ? "Nouvelle promotion"
            : "Modifier la promotion"}
        </DialogTitle>

        <DialogContent dividers>
          {currentPromotion && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Nom de la promotion"
                  value={currentPromotion.name}
                  onChange={(e) =>
                    handlePromotionChange("name", e.target.value)
                  }
                  required
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    label="Code de promotion"
                    value={currentPromotion.code}
                    onChange={(e) =>
                      handlePromotionChange(
                        "code",
                        e.target.value.toUpperCase()
                      )
                    }
                    required
                    helperText="Le code que les clients utiliseront"
                  />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel>Type de remise</InputLabel>
                    <Select
                      value={currentPromotion.discountType}
                      onChange={(e) =>
                        handlePromotionChange("discountType", e.target.value)
                      }
                      label="Type de remise"
                    >
                      <MenuItem value="percentage">Pourcentage (%)</MenuItem>
                      <MenuItem value="fixed">Montant fixe (€)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    label="Valeur de la remise"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {currentPromotion.discountType === "percentage" ? (
                            <PercentIcon />
                          ) : (
                            "€"
                          )}
                        </InputAdornment>
                      ),
                    }}
                    value={currentPromotion.discountValue}
                    onChange={(e) =>
                      handlePromotionChange(
                        "discountValue",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    label="Achat minimum"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">€</InputAdornment>
                      ),
                    }}
                    value={currentPromotion.minimumPurchase}
                    onChange={(e) =>
                      handlePromotionChange(
                        "minimumPurchase",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    helperText="0 = Pas de minimum"
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    label="Date de début"
                    type="date"
                    value={currentPromotion.startDate}
                    onChange={(e) =>
                      handlePromotionChange("startDate", e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    label="Date de fin"
                    type="date"
                    value={currentPromotion.endDate}
                    onChange={(e) =>
                      handlePromotionChange("endDate", e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    label="Limite d'utilisation"
                    type="number"
                    value={currentPromotion.usageLimit}
                    onChange={(e) =>
                      handlePromotionChange(
                        "usageLimit",
                        parseInt(e.target.value) || 0
                      )
                    }
                    helperText="0 = Pas de limite"
                  />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel>S'applique à</InputLabel>
                    <Select
                      value={currentPromotion.appliesTo}
                      onChange={(e) =>
                        handlePromotionChange("appliesTo", e.target.value)
                      }
                      label="S'applique à"
                    >
                      <MenuItem value="all">Tous les produits</MenuItem>
                      <MenuItem value="specific">Produits spécifiques</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {currentPromotion.appliesTo === "specific" && (
                <Box>
                  <Alert severity="info">
                    <AlertTitle>Sélection de produits</AlertTitle>
                    Vous pourrez sélectionner des produits spécifiques après
                    avoir enregistré la promotion.
                  </Alert>
                </Box>
              )}

              <Box>
                <Divider sx={{ my: 1 }} />
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentPromotion.isActive}
                      onChange={(e) =>
                        handlePromotionChange("isActive", e.target.checked)
                      }
                    />
                  }
                  label="Promotion active"
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleDialogClose}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleSavePromotion}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PromotionsPage;
