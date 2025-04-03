import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import "@testing-library/jest-dom";

describe("Dashboard", () => {
  it("affiche le titre principal", () => {
    render(<Dashboard />);
    expect(screen.getByText(/tableau de bord/i)).toBeInTheDocument();
  });

  it("rend toutes les cartes de statistiques", () => {
    render(<Dashboard />);

    // Titre de chaque stat
    expect(screen.getByText(/Ventes/i)).toBeInTheDocument();
    expect(screen.getByText(/Utilisateurs/i)).toBeInTheDocument();
    expect(screen.getByText(/Jeux Ajoutés/i)).toBeInTheDocument();
    expect(screen.getByText(/Avis/i)).toBeInTheDocument();

    // Valeur de chaque stat
    expect(screen.getByText("1.2K")).toBeInTheDocument();
    expect(screen.getByText("8.5K")).toBeInTheDocument();
    expect(screen.getByText("350")).toBeInTheDocument();
    expect(screen.getByText("2.1K")).toBeInTheDocument();
  });

  it("affiche les icônes dans les cercles colorés", () => {
    render(<Dashboard />);
    expect(screen.getByText("🛒")).toBeInTheDocument();
    expect(screen.getByText("👤")).toBeInTheDocument();
    expect(screen.getByText("🎮")).toBeInTheDocument();
    expect(screen.getByText("⭐")).toBeInTheDocument();
  });
});
