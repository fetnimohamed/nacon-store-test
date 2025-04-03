import { Card, CardContent, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

// Définition des couleurs pour les icônes
const colorClasses: Record<string, string> = {
  blue: "#2196F3", // Bleu MUI
  green: "#4CAF50", // Vert MUI
  purple: "#9C27B0", // Violet MUI
  amber: "#FFC107", // Jaune MUI
};

// Composant Icon avec fond coloré
const Icon = ({ children, color }: { children: ReactNode; color: string }) => (
  <Box
    sx={{
      width: 60,
      height: 60,
      backgroundColor: color,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: 28,
    }}
  >
    {children}
  </Box>
);

// Liste des statistiques
const stats = [
  { title: "Ventes", value: "1.2K", color: "blue", icon: "🛒" },
  { title: "Utilisateurs", value: "8.5K", color: "green", icon: "👤" },
  { title: "Jeux Ajoutés", value: "350", color: "purple", icon: "🎮" },
  { title: "Avis", value: "2.1K", color: "amber", icon: "⭐" },
];

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #212121, #424242)",
        color: "#fff",
        padding: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
        Tableau de Bord
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {stats.map((stat, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: "#333",
              color: "white",
              padding: 2,
              textAlign: "center",
              borderRadius: "12px",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Icon color={colorClasses[stat.color]}>{stat.icon}</Icon>
              <Typography variant="h6" mt={2}>
                {stat.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
