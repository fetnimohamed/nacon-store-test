import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchStores } from "../api/storeApi";
import { fetchStoreConfig } from "../api/storeConfigApi";
import { Store } from "../types/Product";
import { StoreConfig, Section, Banner } from "../types/StoreConfig";
import GridView from "../components/store/GridView";
import CarouselView from "../components/store/CarouselView";

// MUI Components
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  FormLabel,
  FormGroup,
} from "@mui/material";

// MUI Icons
import PublishIcon from "@mui/icons-material/Publish";

type ViewType = "grid" | "carousel";
type DeviceType = "mobile" | "tablet" | "desktop";

const StorePreview: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [searchParams] = useSearchParams();
  const defaultStoreId = searchParams.get("storeId") || "";
  const [selectedStoreId, setSelectedStoreId] =
    useState<string>(defaultStoreId);
  const [stores, setStores] = useState<Store[]>([]);
  const [storeConfig, setStoreConfig] = useState<StoreConfig | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Sidebar width constant to maintain consistency
  const SIDEBAR_WIDTH = 250;

  const handleViewTypeChange = (event: any) => {
    setViewType(event.target.value as ViewType);
  };

  const handleDeviceTypeChange = (event: any) => {
    setDeviceType(event.target.value as DeviceType);
  };

  const handleStoreChange = (event: any) => {
    setSelectedStoreId(event.target.value);
  };

  useEffect(() => {
    const loadStores = async () => {
      try {
        const storeData = await fetchStores();
        setStores(storeData);

        if (!selectedStoreId && storeData.length > 0) {
          setSelectedStoreId(storeData[0].id);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des boutiques:", err);
      }
    };

    loadStores();
  }, [selectedStoreId]);

  useEffect(() => {
    const loadConfig = async () => {
      if (selectedStoreId) {
        try {
          const configData = await fetchStoreConfig(selectedStoreId);
          setStoreConfig(configData);
        } catch (err) {
          console.error("Erreur lors du chargement de la configuration:", err);
        }
      }
    };

    loadConfig();
  }, [selectedStoreId]);

  // Get max width based on device type
  const getMaxWidth = () => {
    switch (deviceType) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

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
          Aperçu de la boutique
        </Typography>

        <Card elevation={2} sx={{ mb: 3, borderRadius: "8px" }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", md: "center" },
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                <FormControl
                  size="small"
                  sx={{ minWidth: { xs: "100%", sm: 150 } }}
                >
                  <InputLabel>Appareil</InputLabel>
                  <Select
                    value={deviceType}
                    onChange={handleDeviceTypeChange}
                    label="Appareil"
                  >
                    <MenuItem value="desktop">Desktop</MenuItem>
                    <MenuItem value="tablet">Tablette</MenuItem>
                    <MenuItem value="mobile">Mobile</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  size="small"
                  sx={{ minWidth: { xs: "100%", sm: 150 } }}
                >
                  <InputLabel>Boutique</InputLabel>
                  <Select
                    value={selectedStoreId}
                    onChange={handleStoreChange}
                    label="Boutique"
                  >
                    {stores.map((store: Store) => (
                      <MenuItem key={store.id} value={store.id}>
                        {store.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: "8px",
            bgcolor: "background.paper",
            maxWidth: getMaxWidth(),
            mx: "auto",
          }}
        >
          {storeConfig ? (
            <Box>
              {storeConfig.sections
                .filter((section: Section) => section.isActive)
                .sort((a: Section, b: Section) => a.position - b.position)
                .map((section: Section) => (
                  <Box key={section.id} sx={{ mb: { xs: 3, sm: 4 } }}>
                    {section.title && (
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          pb: 1,
                          borderBottom: 1,
                          borderColor: "divider",
                          color: "text.primary",
                        }}
                      >
                        {section.title}
                      </Typography>
                    )}

                    {section.type === "banner" && (
                      <Box sx={{ mb: 2 }}>
                        {section.banners
                          ?.filter((b: Banner) => b.isActive)
                          .map((banner: Banner) => (
                            <Box
                              key={banner.id}
                              sx={{
                                position: "relative",
                                borderRadius: 1,
                                overflow: "hidden",
                                mb: 1,
                              }}
                            >
                              <Box
                                component="img"
                                src={banner.imageUrl}
                                alt={banner.title || "Banner"}
                                sx={{
                                  width: "100%",
                                  display: "block",
                                  maxHeight: { xs: 150, sm: 200, md: 300 },
                                  objectFit: "cover",
                                }}
                              />
                              {(banner.title || banner.description) && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: { xs: 1, sm: 2, md: 3 },
                                    bgcolor: "rgba(0, 0, 0, 0.6)",
                                    color: "white",
                                  }}
                                >
                                  {banner.title && (
                                    <Typography
                                      variant={isMobile ? "subtitle1" : "h6"}
                                      sx={{
                                        mb: banner.description ? 1 : 0,
                                        fontSize: {
                                          xs: "16px",
                                          sm: "18px",
                                          md: "22px",
                                        },
                                      }}
                                    >
                                      {banner.title}
                                    </Typography>
                                  )}
                                  {banner.description && (
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: {
                                          xs: "12px",
                                          sm: "14px",
                                          md: "16px",
                                        },
                                      }}
                                    >
                                      {banner.description}
                                    </Typography>
                                  )}
                                </Box>
                              )}
                            </Box>
                          ))}
                      </Box>
                    )}

                    {section.type === "carousel" && (
                      <CarouselView
                        storeId={selectedStoreId}
                        productIds={section.itemIds}
                        displayMode={section.displayMode}
                      />
                    )}

                    {section.type === "grid" && (
                      <GridView
                        storeId={selectedStoreId}
                        productIds={section.itemIds}
                        displayMode={section.displayMode}
                      />
                    )}

                    {section.type === "featured" && (
                      <Box>
                        <GridView
                          storeId={selectedStoreId}
                          productIds={section.itemIds}
                          displayMode="compact"
                        />
                      </Box>
                    )}
                  </Box>
                ))}
            </Box>
          ) : viewType === "grid" ? (
            <GridView storeId={selectedStoreId} />
          ) : (
            <CarouselView storeId={selectedStoreId} />
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default StorePreview;
