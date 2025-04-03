import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

// Layouts
import Sidebar from "./components/layout/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import StoreList from "./pages/StoreList";
import StoreEdit from "./pages/StoreEdit";
import StoreConfigEdit from "./pages/StoreConfigEdit";
import StorePreview from "./pages/StorePreview";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import PromotionsPage from "./pages/PromotionsPage";
import PromotionDetail from "./components/promotion/PromotionDetail";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#303030", paper: "#424242" },
  },
});

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex" }}>
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleSidebar}
              sx={{ display: { sm: "none" }, mb: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Stores */}
              <Route path="/stores" element={<StoreList />} />
              <Route path="/stores/new" element={<StoreEdit />} />
              <Route path="/stores/:id" element={<StoreEdit />} />
              <Route
                path="/stores/config/:storeId"
                element={<StoreConfigEdit />}
              />

              {/* Preview */}
              <Route path="/preview" element={<StorePreview />} />
              <Route path="/preview/:storeId" element={<StorePreview />} />

              {/* Products */}
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductEdit />} />
              <Route path="/products/:id" element={<ProductEdit />} />

              {/* Promotions - Nouvelles routes */}
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/promotions/new" element={<PromotionDetail />} />
              <Route path="/promotions/:id" element={<PromotionDetail />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
