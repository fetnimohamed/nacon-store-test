import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

// Mock MUI hook
jest.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(() => false), // simulate desktop
}));

jest.mock("@mui/material/styles", () => {
  const actual = jest.requireActual("@mui/material/styles");
  return {
    ...actual,
    useTheme: () => ({
      breakpoints: {
        down: () => "(max-width:600px)",
      },
      palette: {
        grey: { 500: "#ccc" },
      },
    }),
  };
});

// Fake location.pathname mock
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({ pathname: "/dashboard" }),
  };
});

describe("Sidebar component", () => {
  it("should render Sidebar with Dashboard link", () => {
    const toggleSidebarMock = jest.fn();

    render(
      <MemoryRouter>
        <Sidebar isOpen={true} toggleSidebar={toggleSidebarMock} />
      </MemoryRouter>
    );

    // Check if "Store Admin" header exists
    expect(screen.getByText("Store Admin")).toBeInTheDocument();

    // Check if Dashboard item is rendered
    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    // Check other section headers
    expect(screen.getByText("Boutiques")).toBeInTheDocument();
    expect(screen.getByText("Produits")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
    expect(screen.getByText("Configuration")).toBeInTheDocument();
  });
});
