import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import "@testing-library/jest-dom";
import { Product } from "../../types/Product";

const mockProduct: Product = {
  id: "1",
  name: "Epée Légendaire",
  price: 500,
  currency: "Coins",
  category: "Armes",
  imageUrl: "https://example.com/epee.jpg",
  description: "A legendary sword with immense power.",
  isActive: true,
  storeId: "store123",
};

describe("ProductCard component", () => {
  it("renders product details in default mode", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/Epée Légendaire/i)).toBeInTheDocument();
    expect(screen.getByText(/500 Coins/i)).toBeInTheDocument();
    expect(screen.getByText(/Armes/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Acheter/i })
    ).toBeInTheDocument();
  });

  it("renders compact mode with hidden category and button", () => {
    render(<ProductCard product={mockProduct} displayMode="compact" />);

    expect(screen.queryByText(/Armes/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Acheter/i })
    ).not.toBeInTheDocument();
  });

  it("renders expanded mode with all details", () => {
    render(<ProductCard product={mockProduct} displayMode="expanded" />);

    expect(screen.getByText(/Epée Légendaire/i)).toBeInTheDocument();
    expect(screen.getByText(/500 Coins/i)).toBeInTheDocument();
    expect(screen.getByText(/Armes/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Acheter/i })
    ).toBeInTheDocument();
  });

  it("displays placeholder image when imageUrl is missing", () => {
    const productWithoutImage = { ...mockProduct, imageUrl: "" };
    render(<ProductCard product={productWithoutImage} />);

    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image.src).toContain("/placeholder-image.png");
  });
});
