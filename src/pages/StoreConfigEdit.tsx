// src/pages/StoreConfigEdit.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStoreById } from "../api/storeApi";
import { fetchStoreConfig, updateStoreConfig } from "../api/storeConfigApi";
import { Store } from "../types/Product";
import { StoreConfig, Section, Banner } from "../types/StoreConfig";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// MUI Components
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Switch,
  Divider,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// We're using Box instead of Grid to simplify the structure

// Sortable Section Component
const SortableSection = ({
  section,
  onDeleteSection,
  onSectionChange,
  onBannerChange,
  onAddBanner,
  onDeleteBanner,
}: {
  section: Section;
  onDeleteSection: (id: string) => void;
  onSectionChange: (id: string, field: string, value: any) => void;
  onBannerChange: (
    sectionId: string,
    bannerId: string,
    field: string,
    value: any
  ) => void;
  onAddBanner: (sectionId: string) => void;
  onDeleteBanner: (sectionId: string, bannerId: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      elevation={2}
      sx={{ mb: 3, borderRadius: "8px" }}
    >
      <CardHeader
        avatar={
          <IconButton
            {...attributes}
            {...listeners}
            size="small"
            sx={{ cursor: "grab" }}
          >
            <DragIndicatorIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6">
            {section.title || `Section ${section.position}`}
          </Typography>
        }
        action={
          <>
            <Chip
              label={section.type}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <IconButton
              size="small"
              color="error"
              onClick={() => onDeleteSection(section.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
        sx={{ borderBottom: 1, borderColor: "divider" }}
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={section.isActive}
                  onChange={(e) =>
                    onSectionChange(section.id, "isActive", e.target.checked)
                  }
                  color="primary"
                />
              }
              label="Actif"
            />
          </Box>

          {section.type !== "banner" && (
            <>
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
                    label="Titre"
                    variant="outlined"
                    value={section.title || ""}
                    onChange={(e) =>
                      onSectionChange(section.id, "title", e.target.value)
                    }
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel>Mode d'affichage</InputLabel>
                    <Select
                      value={section.displayMode || "default"}
                      label="Mode d'affichage"
                      onChange={(e) =>
                        onSectionChange(
                          section.id,
                          "displayMode",
                          e.target.value
                        )
                      }
                    >
                      <MenuItem value="default">Par défaut</MenuItem>
                      <MenuItem value="compact">Compact</MenuItem>
                      <MenuItem value="expanded">Étendu</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Produits ({section.itemIds?.length || 0})
                  </Typography>
                  {/* Interface pour sélectionner des produits à ajouter */}
                  <Box sx={{ py: 1 }}>
                    <Typography color="text.secondary" variant="body2">
                      Interface de sélection des produits ici
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </>
          )}

          {section.type === "banner" && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Bannières
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => onAddBanner(section.id)}
                  sx={{ mb: 2 }}
                >
                  Ajouter une bannière
                </Button>
              </Box>

              {section.banners?.map((banner) => (
                <Paper
                  key={banner.id}
                  variant="outlined"
                  sx={{ p: 2, mb: 2, borderRadius: "8px" }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <TextField
                        fullWidth
                        label="Image URL"
                        variant="outlined"
                        value={banner.imageUrl}
                        onChange={(e) =>
                          onBannerChange(
                            section.id,
                            banner.id,
                            "imageUrl",
                            e.target.value
                          )
                        }
                      />
                    </Box>

                    {banner.imageUrl && (
                      <Box>
                        <Box
                          component="img"
                          src={banner.imageUrl}
                          alt="Banner preview"
                          sx={{
                            width: "100%",
                            maxHeight: 200,
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    )}

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
                          label="Titre"
                          variant="outlined"
                          value={banner.title || ""}
                          onChange={(e) =>
                            onBannerChange(
                              section.id,
                              banner.id,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <TextField
                          fullWidth
                          label="Description"
                          variant="outlined"
                          value={banner.description || ""}
                          onChange={(e) =>
                            onBannerChange(
                              section.id,
                              banner.id,
                              "description",
                              e.target.value
                            )
                          }
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
                          label="URL du lien"
                          variant="outlined"
                          value={banner.linkUrl || ""}
                          onChange={(e) =>
                            onBannerChange(
                              section.id,
                              banner.id,
                              "linkUrl",
                              e.target.value
                            )
                          }
                        />
                      </Box>

                      <Box
                        sx={{ flex: 1, display: "flex", alignItems: "center" }}
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={banner.isActive}
                              onChange={(e) =>
                                onBannerChange(
                                  section.id,
                                  banner.id,
                                  "isActive",
                                  e.target.checked
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Actif"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDeleteBanner(section.id, banner.id)}
                    >
                      Supprimer
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

// Modal for adding new sections
const AddSectionModal = ({
  open,
  onClose,
  onAddSection,
}: {
  open: boolean;
  onClose: () => void;
  onAddSection: (type: "banner" | "carousel" | "grid" | "featured") => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Choisir un type de section</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 1,
          }}
        >
          <Box
            sx={{ width: { xs: "calc(50% - 8px)", sm: "calc(25% - 12px)" } }}
          >
            <Card
              onClick={() => onAddSection("banner")}
              sx={{
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                  bgcolor: "action.hover",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1">Bannière</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{ width: { xs: "calc(50% - 8px)", sm: "calc(25% - 12px)" } }}
          >
            <Card
              onClick={() => onAddSection("carousel")}
              sx={{
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                  bgcolor: "action.hover",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1">Carrousel</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{ width: { xs: "calc(50% - 8px)", sm: "calc(25% - 12px)" } }}
          >
            <Card
              onClick={() => onAddSection("grid")}
              sx={{
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                  bgcolor: "action.hover",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1">Grille</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{ width: { xs: "calc(50% - 8px)", sm: "calc(25% - 12px)" } }}
          >
            <Card
              onClick={() => onAddSection("featured")}
              sx={{
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                  bgcolor: "action.hover",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1">Produits en vedette</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

// Main Component
const StoreConfigEdit: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);
  const [config, setConfig] = useState<StoreConfig | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Sidebar width (assuming it's 250px as in your original styling)
  const SIDEBAR_WIDTH = 250;

  // Configurer les capteurs pour dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadData = async () => {
      if (storeId) {
        setLoading(true);
        try {
          const storeData = await fetchStoreById(storeId);
          setStore(storeData);

          const configData = await fetchStoreConfig(storeId);

          if (configData) {
            setConfig(configData);
          } else {
            // Créer une nouvelle configuration
            setConfig({
              id: "new",
              storeId: storeId,
              sections: [],
              lastModified: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.error("Erreur lors du chargement des données:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [storeId]);

  const handleAddSection = (
    type: "banner" | "carousel" | "grid" | "featured"
  ) => {
    if (!config) return;

    const newSection: Section = {
      id: `section-${Date.now()}`,
      type,
      position: config.sections.length + 1,
      isActive: true,
      ...(type === "banner" ? { banners: [] } : { itemIds: [] }),
      ...(type !== "banner" ? { title: `Nouvelle section ${type}` } : {}),
    };

    setConfig({
      ...config,
      sections: [...config.sections, newSection],
    });

    setShowAddModal(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!config || !over || active.id === over.id) return;

    const oldIndex = config.sections.findIndex(
      (section) => section.id === active.id
    );
    const newIndex = config.sections.findIndex(
      (section) => section.id === over.id
    );

    if (oldIndex !== -1 && newIndex !== -1) {
      const newSections = arrayMove(config.sections, oldIndex, newIndex);

      // Mettre à jour les positions
      const updatedSections = newSections.map((section, index) => ({
        ...section,
        position: index + 1,
      }));

      setConfig({
        ...config,
        sections: updatedSections,
      });
    }
  };

  const handleSectionChange = (
    sectionId: string,
    field: string,
    value: any
  ) => {
    if (!config) return;

    setConfig({
      ...config,
      sections: config.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      ),
    });
  };

  const handleBannerChange = (
    sectionId: string,
    bannerId: string,
    field: string,
    value: any
  ) => {
    if (!config) return;

    setConfig({
      ...config,
      sections: config.sections.map((section) => {
        if (section.id === sectionId && section.banners) {
          return {
            ...section,
            banners: section.banners.map((banner) =>
              banner.id === bannerId ? { ...banner, [field]: value } : banner
            ),
          };
        }
        return section;
      }),
    });
  };

  const handleAddBanner = (sectionId: string) => {
    if (!config) return;

    setConfig({
      ...config,
      sections: config.sections.map((section) => {
        if (section.id === sectionId && section.type === "banner") {
          const newBanner: Banner = {
            id: `banner-${Date.now()}`,
            imageUrl: "",
            position: (section.banners?.length || 0) + 1,
            isActive: true,
          };

          return {
            ...section,
            banners: [...(section.banners || []), newBanner],
          };
        }
        return section;
      }),
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!config) return;

    setConfig({
      ...config,
      sections: config.sections.filter((section) => section.id !== sectionId),
    });
  };

  const handleDeleteBanner = (sectionId: string, bannerId: string) => {
    if (!config) return;

    setConfig({
      ...config,
      sections: config.sections.map((section) => {
        if (section.id === sectionId && section.banners) {
          return {
            ...section,
            banners: section.banners.filter((banner) => banner.id !== bannerId),
          };
        }
        return section;
      }),
    });
  };

  const handleSave = async () => {
    if (!config) return;

    try {
      await updateStoreConfig(config);
      navigate(`/preview/${storeId}`);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de la configuration:", err);
      alert("Erreur lors de la sauvegarde");
    }
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

  if (!store || !config)
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
        <Typography>Boutique ou configuration non trouvée</Typography>
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
          Configuration de la boutique: {store.name}
        </Typography>

        <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setShowAddModal(true)}
            sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}
          >
            {isMobile ? "Ajouter" : "Ajouter une section"}
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}
          >
            {isMobile ? "Sauver" : "Sauvegarder"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate(`/preview/${storeId}`)}
            sx={{ mb: { xs: 1, sm: 0 } }}
          >
            {isMobile ? "Annuler" : "Annuler"}
          </Button>
        </Box>

        <AddSectionModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddSection={handleAddSection}
        />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={config.sections.map((section) => section.id)}
            strategy={verticalListSortingStrategy}
          >
            {config.sections.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                onDeleteSection={handleDeleteSection}
                onSectionChange={handleSectionChange}
                onBannerChange={handleBannerChange}
                onAddBanner={handleAddBanner}
                onDeleteBanner={handleDeleteBanner}
              />
            ))}
          </SortableContext>
        </DndContext>

        {config.sections.length === 0 && (
          <Paper
            sx={{ p: 3, textAlign: "center", bgcolor: "background.default" }}
          >
            <Typography variant="body1" color="text.secondary">
              Aucune section n'a été ajoutée. Utilisez le bouton "Ajouter une
              section" pour commencer.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default StoreConfigEdit;
