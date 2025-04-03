# 🎮 NACON Frontend Technical Test – Store Configuration Interface

## 🧭 Overview

This project is part of a frontend technical test to design and implement reusable components for an in-game store configuration interface using **React (TypeScript)**.

The application showcases how store products can be displayed using two different UI formats and includes a mock API for data handling. The solution is designed with modularity, accessibility, and maintainability in mind.

## 🛠️ Tech Stack

- React (TypeScript)
- Material UI (MUI)
- Styled-components (initial version)
- Mock API (static JSON)
- React Router (if routing is used)
- Jest & Testing Library (if tests are included)

---

## 📦 Features Implemented

### ✅ Selected Display Formats

- **Carousel View** – Horizontal slider to browse products one at a time.
- **Grid View** – Structured layout showing multiple products.

### ✅ Components

- `ProductCard` – Displays individual product details.
- `Carousel` – Navigable component using MUI's carousel logic.
- `ProductGrid` – Responsive grid using MUI's `Box` and `Grid`.
- `PromotionDetail` – Interface for editing and validating product promotions.
- `StoreConfigEdit` – Admin-style interface for store layout editing.

### ✅ Mock API

- Simulates fetching product data from a static endpoint.
- Provides mock store configuration for UI rendering.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 16)
- Yarn or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/nacon-store-test.git
cd nacon-store-test

# Install dependencies
npm install

# Start the development server
npm start
```
