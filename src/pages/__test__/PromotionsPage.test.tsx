import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PromotionsPage from "../PromotionsPage";
import { MemoryRouter } from "react-router-dom";

// Mocker les fonctions API utilisées dans PromotionsPage
jest.mock("../api/promotionApi", () => ({
  fetchPromotions: jest.fn((storeId) =>
    Promise.resolve([
      {
        id: "promo1",
        storeId,
        name: "Promo Test",
        code: "TEST10",
        discountType: "percentage",
        discountValue: 10,
        startDate: "2025-04-01",
        endDate: "2025-04-30",
        isActive: true,
        appliesTo: "all",
        productIds: [],
        minimumPurchase: 0,
        usageLimit: 0,
        usageCount: 3,
      },
    ])
  ),
  updatePromotion: jest.fn(),
  deletePromotion: jest.fn(),
}));

jest.mock("../api/storeApi", () => ({
  fetchStores: jest.fn(() =>
    Promise.resolve([
      { id: "store1", name: "Boutique 1" },
      { id: "store2", name: "Boutique 2" },
    ])
  ),
}));

describe("PromotionsPage", () => {
  it("affiche les promotions après chargement", async () => {
    render(
      <MemoryRouter>
        <PromotionsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText("Promo Test")).toBeInTheDocument();
    expect(screen.getByText("TEST10")).toBeInTheDocument();
  });

  it("filtre les promotions par recherche", async () => {
    render(
      <MemoryRouter>
        <PromotionsPage />
      </MemoryRouter>
    );

    await screen.findByText("Promo Test");

    fireEvent.change(screen.getByPlaceholderText(/rechercher/i), {
      target: { value: "invalide" },
    });

    expect(
      screen.getByText(/aucune promotion ne correspond/i)
    ).toBeInTheDocument();
  });

  it("ouvre la boîte de dialogue pour ajouter une promotion", async () => {
    render(
      <MemoryRouter>
        <PromotionsPage />
      </MemoryRouter>
    );

    await screen.findByText("Promo Test");

    fireEvent.click(screen.getByText(/nouvelle promotion/i));
    expect(await screen.findByText(/nom de la promotion/i)).toBeInTheDocument();
  });

  it("modifie une promotion existante", async () => {
    render(
      <MemoryRouter>
        <PromotionsPage />
      </MemoryRouter>
    );

    await screen.findByText("Promo Test");

    const editButtons = screen.getAllByRole("button", { name: /modifier/i });
    fireEvent.click(editButtons[0]);

    expect(await screen.findByDisplayValue("Promo Test")).toBeInTheDocument();
  });

  it("supprime une promotion de la liste", async () => {
    render(
      <MemoryRouter>
        <PromotionsPage />
      </MemoryRouter>
    );

    await screen.findByText("Promo Test");

    const deleteButtons = screen.getAllByRole("button", { name: /supprimer/i });
    fireEvent.click(deleteButtons[0]);

    expect(
      await screen.findByText(/aucune promotion.*critères/i)
    ).toBeInTheDocument();
  });
});
