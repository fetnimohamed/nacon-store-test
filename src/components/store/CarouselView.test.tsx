import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CarouselView from "./CarouselView";
import "@testing-library/jest-dom";

// Mock API
jest.mock("../../api/mockApi", () => ({
  fetchProducts: jest.fn(() =>
    Promise.resolve([
      {
        id: "product1",
        name: "Produit 1",
        price: 10,
        currency: "€",
        description: "Description 1",
        imageUrl: "https://example.com/image1.jpg",
      },
      {
        id: "product2",
        name: "Produit 2",
        price: 20,
        currency: "€",
        description: "Description 2",
        imageUrl: "https://example.com/image2.jpg",
      },
    ])
  ),
}));

describe("CarouselView", () => {
  it("affiche le message de chargement puis le produit", async () => {
    render(<CarouselView storeId="store1" />);

    expect(screen.getByText(/chargement/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Produit 1")).toBeInTheDocument()
    );
    expect(screen.getByText(/10 €/)).toBeInTheDocument();
  });

  it("navigue vers le produit suivant et précédent", async () => {
    render(<CarouselView storeId="store1" />);

    await screen.findByText("Produit 1");

    fireEvent.click(screen.getByRole("button", { name: /›/i }));
    expect(screen.getByText("Produit 2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /‹/i }));
    expect(screen.getByText("Produit 1")).toBeInTheDocument();
  });

  it("affiche un message si aucun produit n’est trouvé", async () => {
    const { fetchProducts } = require("../../api/mockApi");
    fetchProducts.mockResolvedValueOnce([]);

    render(<CarouselView storeId="empty-store" />);

    await waitFor(() =>
      expect(screen.getByText(/aucun produit/i)).toBeInTheDocument()
    );
  });

  it("affiche un message en cas d’erreur API", async () => {
    const { fetchProducts } = require("../../api/mockApi");
    fetchProducts.mockRejectedValueOnce(new Error("API failed"));

    render(<CarouselView storeId="error-store" />);

    await waitFor(() =>
      expect(screen.getByText(/erreur/i)).toBeInTheDocument()
    );
  });
});
