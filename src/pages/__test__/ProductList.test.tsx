import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "../ProductList";
import "@testing-library/jest-dom";

jest.mock("../api/mockApi", () => ({
  fetchProducts: jest.fn(() =>
    Promise.resolve([
      {
        id: "p1",
        name: "Épée de feu",
        category: "weapons",
        price: 100,
        currency: "gold",
        isActive: true,
        imageUrl: "",
      },
      {
        id: "p2",
        name: "Potion de soin",
        category: "potions",
        price: 50,
        currency: "coins",
        isActive: false,
        imageUrl: "",
      },
    ])
  ),
}));

describe("ProductList", () => {
  it("affiche les produits après chargement", async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getByText(/chargement/i)).toBeInTheDocument();

    expect(await screen.findByText(/épée de feu/i)).toBeInTheDocument();
    expect(screen.getByText(/potion de soin/i)).toBeInTheDocument();
  });

  it("filtre par catégorie", async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await screen.findByText(/épée de feu/i);

    fireEvent.change(screen.getByLabelText(/catégorie/i), {
      target: { value: "weapons" },
    });

    expect(screen.queryByText(/potion de soin/i)).not.toBeInTheDocument();
    expect(screen.getByText(/épée de feu/i)).toBeInTheDocument();
  });

  it("filtre par statut actif", async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await screen.findByText(/épée de feu/i);

    fireEvent.change(screen.getByLabelText(/statut/i), {
      target: { value: "active" },
    });

    expect(screen.queryByText(/potion de soin/i)).not.toBeInTheDocument();
    expect(screen.getByText(/épée de feu/i)).toBeInTheDocument();
  });

  it("affiche un message si aucun produit ne correspond", async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await screen.findByText(/épée de feu/i);

    // Appliquer un filtre qui ne correspond à rien
    fireEvent.change(screen.getByLabelText(/catégorie/i), {
      target: { value: "armor" },
    });

    expect(
      screen.getByText(/aucun produit ne correspond/i)
    ).toBeInTheDocument();
  });
});
