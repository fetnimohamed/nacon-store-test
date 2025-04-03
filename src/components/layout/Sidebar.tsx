import React from "react";
import { Link, useLocation } from "react-router-dom";

// MUI Components
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  styled,
} from "@mui/material";

// MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PreviewIcon from "@mui/icons-material/Preview";
import SettingsIcon from "@mui/icons-material/Settings";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Custom styled component for section headers
const SectionHeader = styled(Typography)(({ theme }) => ({
  padding: "10px 16px",
  fontSize: 14,
  fontWeight: 500,
  textTransform: "uppercase",
  color: theme.palette.grey[500],
}));

// Constant for sidebar width to maintain consistency
const SIDEBAR_WIDTH = 250;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  // Check if a path is active
  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  // Content of the sidebar that's shared between permanent and temporary drawer
  const sidebarContent = (
    <>
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
          bgcolor: "#1e2a38",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="white">
          Nacon Store Admin
        </Typography>
      </Box>

      <Box sx={{ overflow: "auto", height: "calc(100% - 64px)" }}>
        <List sx={{ p: 0 }}>
          <Box sx={{ mt: 1.5 }}>
            <SectionHeader variant="body2">Boutiques</SectionHeader>
          </Box>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/stores"
              onClick={() => isMobile && toggleSidebar()}
              selected={isActive("/stores")}
              sx={{
                py: 1.5,
                borderBottom: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <StoreIcon sx={{ mr: 2, fontSize: 20, color: "white" }} />
              <ListItemText
                primary="Liste des boutiques"
                sx={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/stores/new"
              onClick={() => isMobile && toggleSidebar()}
              selected={isActive("/stores/new")}
              sx={{
                py: 1.5,
                borderBottom: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <AddBusinessIcon sx={{ mr: 2, fontSize: 20, color: "white" }} />
              <ListItemText
                primary="Nouvelle boutique"
                sx={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>

          <Box sx={{ mt: 1.5 }}>
            <SectionHeader variant="body2">Produits</SectionHeader>
          </Box>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/products"
              onClick={() => isMobile && toggleSidebar()}
              selected={isActive("/products")}
              sx={{
                py: 1.5,
                borderBottom: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <InventoryIcon sx={{ mr: 2, fontSize: 20, color: "white" }} />
              <ListItemText
                primary="Tous les produits"
                sx={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/products/new"
              onClick={() => isMobile && toggleSidebar()}
              selected={isActive("/products/new")}
              sx={{
                py: 1.5,
                borderBottom: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <AddCircleOutlineIcon
                sx={{ mr: 2, fontSize: 20, color: "white" }}
              />
              <ListItemText primary="Nouveau produit" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          <Box sx={{ mt: 1.5 }}>
            <SectionHeader variant="body2">Marketing</SectionHeader>
          </Box>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/promotions"
              onClick={() => isMobile && toggleSidebar()}
              selected={isActive("/promotions")}
              sx={{
                py: 1.5,
                borderBottom: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <LocalOfferIcon sx={{ mr: 2, fontSize: 20, color: "white" }} />
              <ListItemText primary="Promotions" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          <Box sx={{ mt: 1.5 }}>
            <SectionHeader variant="body2">Configuration</SectionHeader>
          </Box>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/preview"
              onClick={() => isMobile && toggleSidebar()}
              selected={isActive("/preview")}
              sx={{
                py: 1.5,
                borderBottom: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <PreviewIcon sx={{ mr: 2, fontSize: 20, color: "white" }} />
              <ListItemText primary="Aperçu boutique" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Permanent sidebar for desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              boxSizing: "border-box",
              bgcolor: "#2c3e50",
              borderRight: "none",
            },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Temporary sidebar with backdrop for mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              boxSizing: "border-box",
              bgcolor: "#2c3e50",
              borderRight: "none",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
