import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PromotionDetail from "./PromotionDetail";
import "@testing-library/jest-dom";

// Mock des fonctions API
jest.mock("../../api/promotionApi", () => ({
  fetchPromotionById: jest.fn((id) =>
    Promise.resolve({
      id,
      storeId: "store1",
      name: "Promo Test",
      code: "PROMO2025",
      discountType: "percentage",
      discountValue: 10,
      startDate: "2025-04-01",
      endDate: "2025-04-30",
      isActive: true,
      appliesTo: "all",
      productIds: [],
      minimumPurchase: 0,
      usageLimit: 0,
      usageCount: 5,
    })
  ),
  updatePromotion: jest.fn((p) => Promise.resolve(p)),
  deletePromotion: jest.fn(() => Promise.resolve()),
  applyPromotionToProducts: jest.fn(() => Promise.resolve()),
}));

jest.mock("./ProductSelector", () => () => (
  <div data-testid="product-selector" />
));

describe("PromotionDetail", () => {
  it("charge et affiche la promotion existante", async () => {
    render(
      <MemoryRouter initialEntries={["/promotions/123"]}>
        <Routes>
          <Route path="/promotions/:id" element={<PromotionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByDisplayValue("Promo Test")).toBeInTheDocument()
    );

    expect(screen.getByLabelText(/Code de promotion/i)).toHaveValue(
      "PROMO2025"
    );
  });

  it("modifie un champ et sauvegarde", async () => {
    render(
      <MemoryRouter initialEntries={["/promotions/123"]}>
        <Routes>
          <Route path="/promotions/:id" element={<PromotionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Promo Test");

    const nameInput = screen.getByLabelText(/Nom de la promotion/i);
    fireEvent.change(nameInput, { target: { value: "Promo Modifiée" } });

    const saveButton = screen.getByRole("button", { name: /enregistrer/i });
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: /enregistrement/i })
      ).toBeNull()
    );
  });
});
