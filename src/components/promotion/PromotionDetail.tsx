import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
  Chip,
  IconButton,
  InputAdornment,
  Alert,
  AlertTitle,
  Container,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";

// Icons
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PercentIcon from "@mui/icons-material/Percent";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Components
import ProductSelector from "./ProductSelector";

// Types and API
import { Promotion } from "../../types/Promotion";
import {
  fetchPromotionById,
  updatePromotion,
  deletePromotion,
  applyPromotionToProducts,
} from "../../api/promotionApi";

// Mock function to fetch product details - replace with actual API call
const fetchProductDetails = async (productIds: string[]) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return mock products
  const allProducts = [
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

  return allProducts.filter((product) => productIds.includes(product.id));
};

// Mock function to fetch usage statistics - replace with actual API call
const fetchUsageStats = async (promotionId: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock usage data
  return {
    usageByDate: [
      { date: "2025-03-01", count: 5, revenue: 245.75 },
      { date: "2025-03-02", count: 8, revenue: 389.5 },
      { date: "2025-03-03", count: 12, revenue: 578.25 },
      { date: "2025-03-04", count: 7, revenue: 342.8 },
      { date: "2025-03-05", count: 10, revenue: 495.6 },
    ],
    recentUsage: [
      {
        id: "order1",
        date: "2025-03-05T14:22:30Z",
        customer: "John Doe",
        amount: 59.99,
        discount: 12.0,
      },
      {
        id: "order2",
        date: "2025-03-05T12:45:18Z",
        customer: "Jane Smith",
        amount: 124.5,
        discount: 24.9,
      },
      {
        id: "order3",
        date: "2025-03-04T18:30:00Z",
        customer: "Mike Johnson",
        amount: 89.95,
        discount: 17.99,
      },
      {
        id: "order4",
        date: "2025-03-04T10:15:45Z",
        customer: "Sarah Brown",
        amount: 45.75,
        discount: 9.15,
      },
      {
        id: "order5",
        date: "2025-03-03T16:20:10Z",
        customer: "Tom Wilson",
        amount: 199.99,
        discount: 40.0,
      },
    ],
  };
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`promotion-tabpanel-${index}`}
      aria-labelledby={`promotion-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Sidebar width constant
const SIDEBAR_WIDTH = 250;

const PromotionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  const [productSelectorOpen, setProductSelectorOpen] =
    useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<string>("");
  const [usageStats, setUsageStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState<boolean>(false);

  // Load promotion data
  useEffect(() => {
    const loadPromotion = async () => {
      if (!id) return;

      setLoading(true);
      try {
        if (id === "new") {
          // Create a new promotion object
          const newPromotion: Promotion = {
            id: "new",
            storeId: "",
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
          setPromotion(newPromotion);
        } else {
          // Fetch existing promotion
          const promotionData = await fetchPromotionById(id);
          if (promotionData) {
            setPromotion(promotionData);

            // Load associated products if applicable
            if (
              promotionData.appliesTo === "specific" &&
              promotionData.productIds.length > 0
            ) {
              loadProducts(promotionData.productIds);
            }

            // Load usage statistics
            loadUsageStatistics(id);
          } else {
            navigate("/promotions", { replace: true });
          }
        }
      } catch (error) {
        console.error("Error loading promotion:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPromotion();
  }, [id, navigate]);

  const loadProducts = async (productIds: string[]) => {
    if (!productIds.length) return;

    setLoadingProducts(true);
    try {
      const productDetails = await fetchProductDetails(productIds);
      setProducts(productDetails);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadUsageStatistics = async (promotionId: string) => {
    setLoadingStats(true);
    try {
      const stats = await fetchUsageStats(promotionId);
      setUsageStats(stats);
    } catch (error) {
      console.error("Error loading usage statistics:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleChange = (field: keyof Promotion, value: any) => {
    if (!promotion) return;

    // Clear code error when code is changed
    if (field === "code") {
      setCodeError("");
    }

    setPromotion({
      ...promotion,
      [field]: value,
    });

    // If appliesTo changes to 'all', clear the product IDs
    if (field === "appliesTo" && value === "all") {
      setPromotion((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          productIds: [],
        };
      });
      setProducts([]);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenProductSelector = () => {
    setProductSelectorOpen(true);
  };

  const handleProductsSelected = async (selectedProductIds: string[]) => {
    if (!promotion) return;

    setPromotion({
      ...promotion,
      productIds: selectedProductIds,
    });

    // Load the details of selected products
    await loadProducts(selectedProductIds);
  };

  const validatePromotion = (): boolean => {
    if (!promotion) return false;

    // Basic validation
    if (!promotion.name.trim()) {
      alert("Veuillez saisir un nom pour la promotion");
      return false;
    }

    if (!promotion.code.trim()) {
      alert("Veuillez saisir un code pour la promotion");
      return false;
    }

    // Ensure dates are valid
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    if (endDate < startDate) {
      alert("La date de fin doit être postérieure à la date de début");
      return false;
    }

    // Additional validation as needed
    return true;
  };

  const handleSave = async () => {
    if (!promotion || !validatePromotion()) return;

    setSaving(true);
    try {
      const updatedPromotion = await updatePromotion(promotion);

      // If specific products are selected, update the product association
      if (
        promotion.appliesTo === "specific" &&
        promotion.productIds.length > 0
      ) {
        await applyPromotionToProducts(
          updatedPromotion.id,
          promotion.productIds
        );
      }

      // Redirect back to the promotions list
      navigate("/promotions");
    } catch (error) {
      console.error("Error saving promotion:", error);
      alert("Une erreur est survenue lors de la sauvegarde de la promotion");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!promotion || promotion.id === "new") return;

    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette promotion ?")
    ) {
      try {
        await deletePromotion(promotion.id);
        navigate("/promotions");
      } catch (error) {
        console.error("Error deleting promotion:", error);
        alert("Une erreur est survenue lors de la suppression de la promotion");
      }
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (!promotion) {
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
          <Typography variant="h4">Promotion non trouvée</Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/promotions")}
            sx={{ mt: 2 }}
          >
            Retour aux promotions
          </Button>
        </Container>
      </Box>
    );
  }

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
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton
            color="inherit"
            aria-label="back"
            onClick={() => navigate("/promotions")}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            {promotion.id === "new"
              ? "Nouvelle promotion"
              : "Modifier la promotion"}
          </Typography>
        </Box>

        <Card elevation={2} sx={{ borderRadius: "8px", mb: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              aria-label="promotion tabs"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                label="Détails"
                icon={<LocalOfferIcon />}
                iconPosition="start"
              />
              {promotion.id !== "new" && (
                <Tab
                  label="Statistiques"
                  icon={<HistoryIcon />}
                  iconPosition="start"
                />
              )}
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Nom de la promotion"
                      value={promotion.name}
                      onChange={(e) => handleChange("name", e.target.value)}
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
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        label="Code de promotion"
                        value={promotion.code}
                        onChange={(e) =>
                          handleChange("code", e.target.value.toUpperCase())
                        }
                        required
                        error={!!codeError}
                        helperText={
                          codeError || "Le code que les clients utiliseront"
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocalOfferIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <FormControl fullWidth>
                        <InputLabel>Type de remise</InputLabel>
                        <Select
                          value={promotion.discountType}
                          onChange={(e) =>
                            handleChange("discountType", e.target.value)
                          }
                          label="Type de remise"
                        >
                          <MenuItem value="percentage">
                            Pourcentage (%)
                          </MenuItem>
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
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        label="Valeur de la remise"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {promotion.discountType === "percentage" ? (
                                <PercentIcon />
                              ) : (
                                "€"
                              )}
                            </InputAdornment>
                          ),
                        }}
                        value={promotion.discountValue}
                        onChange={(e) =>
                          handleChange(
                            "discountValue",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        label="Achat minimum"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">€</InputAdornment>
                          ),
                        }}
                        value={promotion.minimumPurchase}
                        onChange={(e) =>
                          handleChange(
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
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        label="Date de début"
                        type="date"
                        value={promotion.startDate}
                        onChange={(e) =>
                          handleChange("startDate", e.target.value)
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        label="Date de fin"
                        type="date"
                        value={promotion.endDate}
                        onChange={(e) =>
                          handleChange("endDate", e.target.value)
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon />
                            </InputAdornment>
                          ),
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
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        label="Limite d'utilisation"
                        type="number"
                        value={promotion.usageLimit}
                        onChange={(e) =>
                          handleChange(
                            "usageLimit",
                            parseInt(e.target.value) || 0
                          )
                        }
                        helperText="0 = Pas de limite"
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <FormControl fullWidth>
                        <InputLabel>S'applique à</InputLabel>
                        <Select
                          value={promotion.appliesTo}
                          onChange={(e) =>
                            handleChange("appliesTo", e.target.value)
                          }
                          label="S'applique à"
                        >
                          <MenuItem value="all">Tous les produits</MenuItem>
                          <MenuItem value="specific">
                            Produits spécifiques
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {promotion.appliesTo === "specific" && (
                    <Box>
                      <Paper sx={{ p: 2, bgcolor: "background.default" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography variant="subtitle1">
                            Produits sélectionnés ({promotion.productIds.length}
                            )
                          </Typography>
                          <Button
                            variant="outlined"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={handleOpenProductSelector}
                          >
                            {promotion.productIds.length > 0
                              ? "Modifier la sélection"
                              : "Ajouter des produits"}
                          </Button>
                        </Box>

                        {loadingProducts ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              p: 2,
                            }}
                          >
                            <CircularProgress size={24} />
                          </Box>
                        ) : (
                          <>
                            {products.length > 0 ? (
                              <Box
                                sx={{ maxHeight: "200px", overflow: "auto" }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                  }}
                                >
                                  {products.map((product) => (
                                    <Box
                                      key={product.id}
                                      sx={{
                                        width: {
                                          xs: "100%",
                                          sm: "48%",
                                          md: "32%",
                                        },
                                      }}
                                    >
                                      <Chip
                                        label={`${
                                          product.name
                                        } - ${product.price.toFixed(2)} €`}
                                        sx={{
                                          width: "100%",
                                          justifyContent: "flex-start",
                                        }}
                                      />
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            ) : (
                              <Alert severity="info">
                                <AlertTitle>
                                  Aucun produit sélectionné
                                </AlertTitle>
                                Cliquez sur "Ajouter des produits" pour
                                sélectionner les produits auxquels cette
                                promotion s'appliquera.
                              </Alert>
                            )}
                          </>
                        )}
                      </Paper>
                    </Box>
                  )}

                  <Box>
                    <Divider sx={{ my: 1 }} />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={promotion.isActive}
                          onChange={(e) =>
                            handleChange("isActive", e.target.checked)
                          }
                        />
                      }
                      label="Promotion active"
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                    disabled={promotion.id === "new" || saving}
                  >
                    Supprimer
                  </Button>

                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                {loadingStats ? (
                  <Box sx={{ width: "100%", mt: 4 }}>
                    <LinearProgress />
                  </Box>
                ) : (
                  <>
                    {usageStats ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <Box>
                          <Paper
                            elevation={0}
                            sx={{ p: 2, mb: 3, bgcolor: "rgba(0, 0, 0, 0.05)" }}
                          >
                            <Typography variant="h6" gutterBottom>
                              Résumé d'utilisation
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 2,
                              }}
                            >
                              <Box sx={{ flex: 1, textAlign: "center" }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Total utilisations
                                </Typography>
                                <Typography variant="h4" sx={{ my: 1 }}>
                                  {promotion.usageCount}
                                </Typography>
                                {promotion.usageLimit > 0 && (
                                  <LinearProgress
                                    variant="determinate"
                                    value={
                                      (promotion.usageCount /
                                        promotion.usageLimit) *
                                      100
                                    }
                                    sx={{ height: 10, borderRadius: 5 }}
                                  />
                                )}
                              </Box>
                              <Box sx={{ flex: 1, textAlign: "center" }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Période d'activité
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                  {formatDate(promotion.startDate)} -{" "}
                                  {formatDate(promotion.endDate)}
                                </Typography>
                                <Chip
                                  label={
                                    new Date() < new Date(promotion.startDate)
                                      ? "Pas encore commencée"
                                      : new Date() > new Date(promotion.endDate)
                                      ? "Terminée"
                                      : "En cours"
                                  }
                                  color={
                                    new Date() < new Date(promotion.startDate)
                                      ? "default"
                                      : new Date() > new Date(promotion.endDate)
                                      ? "error"
                                      : "success"
                                  }
                                  size="small"
                                  sx={{ mt: 1 }}
                                />
                              </Box>
                              <Box sx={{ flex: 1, textAlign: "center" }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Statut
                                </Typography>
                                <Chip
                                  label={
                                    promotion.isActive ? "Active" : "Inactive"
                                  }
                                  color={
                                    promotion.isActive ? "success" : "default"
                                  }
                                  sx={{ mt: 1 }}
                                />
                              </Box>
                            </Box>
                          </Paper>
                        </Box>

                        <Box>
                          <Typography variant="h6" gutterBottom>
                            Utilisation récente
                          </Typography>
                          <TableContainer component={Paper}>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Date</TableCell>
                                  <TableCell>Client</TableCell>
                                  <TableCell align="right">Montant</TableCell>
                                  <TableCell align="right">
                                    Remise appliquée
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {usageStats.recentUsage.map((usage: any) => (
                                  <TableRow key={usage.id} hover>
                                    <TableCell>
                                      {formatDateTime(usage.date)}
                                    </TableCell>
                                    <TableCell>{usage.customer}</TableCell>
                                    <TableCell align="right">
                                      {usage.amount.toFixed(2)} €
                                    </TableCell>
                                    <TableCell align="right">
                                      {usage.discount.toFixed(2)} €
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2,
                          }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() =>
                              navigate(
                                `/orders?promotionCode=${promotion.code}`
                              )
                            }
                          >
                            Voir toutes les commandes avec cette promotion
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Alert severity="info">
                        <AlertTitle>Aucune statistique disponible</AlertTitle>
                        Cette promotion n'a pas encore été utilisée ou les
                        données ne sont pas disponibles.
                      </Alert>
                    )}
                  </>
                )}
              </Box>
            </TabPanel>
          </CardContent>
        </Card>
      </Container>

      {/* Product Selector Dialog */}
      <ProductSelector
        open={productSelectorOpen}
        onClose={() => setProductSelectorOpen(false)}
        storeId={promotion.storeId}
        selectedProductIds={promotion.productIds}
        onProductsSelected={handleProductsSelected}
      />
    </Box>
  );
};

export default PromotionDetail;
