import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductSelector from "./ProductSelector";
import "@testing-library/jest-dom";

describe("ProductSelector", () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    storeId: "store123",
    selectedProductIds: [],
    onProductsSelected: jest.fn(),
  };

  it("affiche la modale avec le titre", async () => {
    render(<ProductSelector {...defaultProps} />);

    expect(screen.getByText("Sélectionner des produits")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });
  });

  it("filtre les produits via la recherche", async () => {
    render(<ProductSelector {...defaultProps} />);

    await screen.findByText("Product 1");

    const searchInput = screen.getByPlaceholderText("Rechercher des produits");
    fireEvent.change(searchInput, { target: { value: "Premium" } });

    await waitFor(() => {
      expect(screen.getByText("Premium Item")).toBeInTheDocument();
    });
  });

  it("permet de sélectionner puis de sauvegarder un produit", async () => {
    render(<ProductSelector {...defaultProps} />);

    await screen.findByText("Product 1");

    const addButton = screen.getByRole("button", {
      name: /ajouter les produits sélectionnés/i,
    });
    fireEvent.click(addButton);

    expect(defaultProps.onProductsSelected).toHaveBeenCalledWith(["product1"]);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("affiche le message si aucun produit ne correspond", async () => {
    render(<ProductSelector {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Rechercher des produits");
    fireEvent.change(searchInput, { target: { value: "zzz" } });

    await waitFor(() => {
      expect(
        screen.getByText(/aucun produit ne correspond/i)
      ).toBeInTheDocument();
    });
  });
});
