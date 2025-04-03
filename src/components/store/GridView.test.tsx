import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import GridView from "./GridView";
import "@testing-library/jest-dom";

// Mock ProductCard pour éviter le rendu réel
jest.mock("../products/ProductCard", () => (props: any) => (
  <div data-testid="mock-card">{props.product.name}</div>
));

// Mock API
jest.mock("../../api/mockApi", () => ({
  fetchProducts: jest.fn(() =>
    Promise.resolve([
      {
        id: "product1",
        name: "Produit A",
        price: 20,
        currency: "€",
        category: "Cat A",
        imageUrl: "a.jpg",
      },
      {
        id: "product2",
        name: "Produit B",
        price: 40,
        currency: "€",
        category: "Cat B",
        imageUrl: "b.jpg",
      },
    ])
  ),
}));

describe("GridView", () => {
  it("affiche le message de chargement et les produits", async () => {
    render(<GridView storeId="store1" />);

    expect(screen.getByText(/chargement/i)).toBeInTheDocument();

    await waitFor(() => {
      const cards = screen.getAllByTestId("mock-card");
      expect(cards.length).toBe(2);
      expect(cards[0]).toHaveTextContent("Produit A");
    });
  });

  it("filtre les produits si productIds est spécifié", async () => {
    render(<GridView storeId="store1" productIds={["product2"]} />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("mock-card");
      expect(cards.length).toBe(1);
      expect(cards[0]).toHaveTextContent("Produit B");
    });
  });

  it("affiche une erreur si l’API échoue", async () => {
    const { fetchProducts } = require("../../api/mockApi");
    fetchProducts.mockRejectedValueOnce(new Error("fail"));

    render(<GridView storeId="fail-store" />);

    await waitFor(() => {
      expect(screen.getByText(/erreur/i)).toBeInTheDocument();
    });
  });
});
