import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import StoreList from "../StoreList";
import { BrowserRouter } from "react-router-dom";
import * as storeApi from "../../api/storeApi";

const mockStores = [
  {
    id: "store1",
    name: "Boutique Alpha",
    description: "Une boutique test",
    isActive: true,
    gameId: "game-1",
    theme: "default",
  },
  {
    id: "store2",
    name: "Boutique Beta",
    description: "Une autre boutique",
    isActive: false,
    gameId: "game-2",
    theme: "halloween",
  },
];

// Mock de l'API
jest.mock("../api/storeApi", () => ({
  fetchStores: jest.fn(),
}));

describe("StoreList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("affiche la liste des boutiques après chargement", async () => {
    (storeApi.fetchStores as jest.Mock).mockResolvedValue(mockStores);

    render(
      <BrowserRouter>
        <StoreList />
      </BrowserRouter>
    );

    // Vérifie que le spinner de chargement s'affiche
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Attendre l'affichage des boutiques
    await waitFor(() => {
      expect(screen.getByText("Boutique Alpha")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Boutique Beta")).toBeInTheDocument();
    });

    // Vérifie les boutons d'action
    expect(screen.getAllByText("Aperçu").length).toBe(2);
    expect(screen.getAllByText("Éditer").length).toBe(2);
    expect(screen.getAllByText("Configuration").length).toBe(2);
    expect(screen.getAllByText("Produits").length).toBe(2);
  });

  it("affiche un message si aucune boutique n'est disponible", async () => {
    (storeApi.fetchStores as jest.Mock).mockResolvedValue([]);

    render(
      <BrowserRouter>
        <StoreList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Aucune boutique disponible/i)
      ).toBeInTheDocument();
    });
  });

  it("gère une erreur de chargement sans planter", async () => {
    (storeApi.fetchStores as jest.Mock).mockRejectedValue(
      new Error("Erreur réseau")
    );

    render(
      <BrowserRouter>
        <StoreList />
      </BrowserRouter>
    );

    await waitFor(() => {
      // Même si ça échoue, aucun message d'erreur à l'écran, juste aucune boutique affichée
      expect(screen.queryByText(/Boutique/)).not.toBeInTheDocument();
    });
  });
});
