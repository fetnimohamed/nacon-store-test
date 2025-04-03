// __tests__/StoreConfigEdit.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StoreConfigEdit from "../StoreConfigEdit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as storeApi from "../../api/storeApi";
import * as configApi from "../../api/storeConfigApi";

// Mock les données
const mockStore = { id: "store123", name: "Boutique Test", isActive: true };
const mockConfig = {
  id: "config123",
  storeId: "store123",
  lastModified: new Date().toISOString(),
  sections: [],
};

jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: any) => <div>{children}</div>,
  useSensor: jest.fn(),
  useSensors: jest.fn(() => []),
  closestCenter: jest.fn(),
}));

jest.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: any) => <div>{children}</div>,
  verticalListSortingStrategy: jest.fn(),
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
  }),
}));

describe("StoreConfigEdit", () => {
  beforeEach(() => {
    jest.spyOn(storeApi, "fetchStoreById").mockResolvedValue(mockStore);
    jest.spyOn(configApi, "fetchStoreConfig").mockResolvedValue(mockConfig);
  });

  it("charge les données et affiche le nom de la boutique", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/store/:storeId" element={<StoreConfigEdit />} />
        </Routes>
      </BrowserRouter>,
      { wrapper: ({ children }) => <Routes>{children}</Routes> }
    );

    window.history.pushState({}, "", "/store/store123");

    expect(
      await screen.findByText(/Configuration de la boutique/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Boutique Test")).toBeInTheDocument();
  });

  it("ouvre le modal pour ajouter une section", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/store/:storeId" element={<StoreConfigEdit />} />
        </Routes>
      </BrowserRouter>
    );

    window.history.pushState({}, "", "/store/store123");

    await screen.findByText("Boutique Test");
    const addButton = screen.getByRole("button", {
      name: /Ajouter une section/i,
    });
    fireEvent.click(addButton);

    expect(
      await screen.findByText(/Choisir un type de section/i)
    ).toBeInTheDocument();
  });
});
