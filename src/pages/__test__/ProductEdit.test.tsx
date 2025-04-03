import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductEdit from "../ProductEdit";
import "@testing-library/jest-dom";

// Mocks des API
jest.mock("../api/mockApi", () => ({
  fetchProductById: jest.fn((id) =>
    Promise.resolve({
      id,
      name: "Épée magique",
      description: "Une épée enchantée.",
      price: 99.99,
      currency: "gold",
      imageUrl: "https://image.url",
      category: "weapons",
      isActive: true,
      storeId: "store1",
    })
  ),
  createProduct: jest.fn(),
}));

jest.mock("../api/storeApi", () => ({
  fetchStores: jest.fn(() =>
    Promise.resolve([
      { id: "store1", name: "Magasin A" },
      { id: "store2", name: "Magasin B" },
    ])
  ),
}));

describe("ProductEdit component", () => {
  it("affiche le formulaire pour un nouveau produit", async () => {
    render(
      <MemoryRouter initialEntries={["/products/new"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductEdit />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/ajouter un produit/i);

    expect(screen.getByLabelText(/nom du produit/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sauvegarder/i })
    ).toBeInTheDocument();
  });

  it("charge un produit existant et affiche ses données", async () => {
    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductEdit />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByDisplayValue(/Épée magique/);

    expect(screen.getByDisplayValue("99.99")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Une épée enchantée.")).toBeInTheDocument();
  });

  it("modifie un champ et soumet le formulaire", async () => {
    const { createProduct } = require("../api/mockApi");

    render(
      <MemoryRouter initialEntries={["/products/new"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductEdit />} />
        </Routes>
      </MemoryRouter>
    );

    const nameInput = await screen.findByLabelText(/nom du produit/i);
    fireEvent.change(nameInput, { target: { value: "Potion rouge" } });

    fireEvent.click(screen.getByRole("button", { name: /sauvegarder/i }));

    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Potion rouge",
        })
      );
    });
  });
});
