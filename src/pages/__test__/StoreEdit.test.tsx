import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import StoreEdit from "../StoreEdit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as storeApi from "../../api/storeApi";

// Mock de la boutique
const mockStore = {
  id: "store1",
  name: "Boutique Test",
  description: "Description de test",
  isActive: true,
  gameId: "game123",
  theme: "default",
};

jest.mock("../api/storeApi", () => ({
  fetchStoreById: jest.fn(),
}));

describe("StoreEdit", () => {
  beforeEach(() => {
    (storeApi.fetchStoreById as jest.Mock).mockResolvedValue(mockStore);
  });

  it("affiche le formulaire avec les données de la boutique", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/stores/edit/:id" element={<StoreEdit />} />
        </Routes>
      </BrowserRouter>
    );

    // Simule le chemin d'accès avec un ID
    window.history.pushState({}, "", "/stores/edit/store1");

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByDisplayValue("Boutique Test")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("Modifier la boutique: Boutique Test")
      ).toBeInTheDocument();
    });

    // Vérifie que le champ "Nom de la boutique" est présent
    const nameInput = screen.getByLabelText(/Nom de la boutique/i);
    fireEvent.change(nameInput, { target: { value: "Boutique Modifiée" } });
    expect(nameInput).toHaveValue("Boutique Modifiée");
  });

  it("redirige vers /stores après soumission", async () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/stores/edit/:id" element={<StoreEdit />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, "", "/stores/edit/store1");

    await screen.findByDisplayValue("Boutique Test");

    const saveButton = screen.getByRole("button", { name: /Sauvegarder/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/stores");
    });
  });
});
