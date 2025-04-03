import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import StorePreview from "../StorePreview";
import { BrowserRouter } from "react-router-dom";
import * as storeApi from "../../api/storeApi";
import * as storeConfigApi from "../../api/storeConfigApi";

// Mocks
jest.mock("../api/storeApi", () => ({
  fetchStores: jest.fn(),
}));

jest.mock("../api/storeConfigApi", () => ({
  fetchStoreConfig: jest.fn(),
}));

jest.mock("../components/store/GridView", () => () => (
  <div data-testid="GridView">GridView rendered</div>
));
jest.mock("../components/store/CarouselView", () => () => (
  <div data-testid="CarouselView">CarouselView rendered</div>
));

describe("StorePreview", () => {
  const mockStores = [
    {
      id: "store1",
      name: "Boutique 1",
      isActive: true,
      theme: "default",
      description: "",
      gameId: "",
    },
  ];

  const mockStoreConfig = {
    id: "cfg1",
    storeId: "store1",
    lastModified: new Date().toISOString(),
    sections: [
      {
        id: "sec1",
        type: "grid",
        title: "Section Grille",
        position: 1,
        isActive: true,
        itemIds: ["p1", "p2"],
        displayMode: "compact",
      },
      {
        id: "sec2",
        type: "carousel",
        title: "Section Carrousel",
        position: 2,
        isActive: true,
        itemIds: ["p3"],
        displayMode: "expanded",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le fallback GridView si aucune configuration", async () => {
    (storeApi.fetchStores as jest.Mock).mockResolvedValue(mockStores);
    (storeConfigApi.fetchStoreConfig as jest.Mock).mockResolvedValue(null);

    render(
      <BrowserRouter>
        <StorePreview />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Aperçu de la boutique")).toBeInTheDocument();
    });

    expect(await screen.findByTestId("GridView")).toBeInTheDocument();
  });

  it("affiche les sections configurées", async () => {
    (storeApi.fetchStores as jest.Mock).mockResolvedValue(mockStores);
    (storeConfigApi.fetchStoreConfig as jest.Mock).mockResolvedValue(
      mockStoreConfig
    );

    render(
      <BrowserRouter>
        <StorePreview />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Section Grille")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Section Carrousel")).toBeInTheDocument();
    });

    expect(await screen.findByTestId("GridView")).toBeInTheDocument();
    expect(await screen.findByTestId("CarouselView")).toBeInTheDocument();
  });

  it("permet de changer de vue (grid/carousel)", async () => {
    (storeApi.fetchStores as jest.Mock).mockResolvedValue(mockStores);
    (storeConfigApi.fetchStoreConfig as jest.Mock).mockResolvedValue(null);

    render(
      <BrowserRouter>
        <StorePreview />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Format d'affichage")).toBeInTheDocument();
    });

    const select = screen.getByLabelText(
      "Format d'affichage"
    ) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "carousel" } });

    expect(await screen.findByTestId("CarouselView")).toBeInTheDocument();
  });
});
