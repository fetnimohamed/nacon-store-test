import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  resetToDefaultProducts,
} from "./mockApi";
import { Product } from "../types/Product";

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    clear: () => (store = {}),
    removeItem: (key: string) => delete store[key],
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

beforeEach(async () => {
  localStorage.clear();
  await resetToDefaultProducts(); // Réinitialiser entre les tests
});

test("fetchProducts returns all products", async () => {
  const products = await fetchProducts();
  expect(products.length).toBeGreaterThan(0);
});

test("fetchProducts with storeId filters products", async () => {
  const products = await fetchProducts("store2");
  expect(products.every((p) => p.storeId === "store2")).toBe(true);
});

test("fetchProductById returns the correct product", async () => {
  const product = await fetchProductById("1");
  expect(product).not.toBeNull();
  expect(product?.id).toBe("1");
});

test("fetchProductById returns null for invalid ID", async () => {
  const product = await fetchProductById("999");
  expect(product).toBeNull();
});

test("createProduct adds a new product", async () => {
  const newProduct = {
    name: "Test Product",
    description: "Test",
    price: 999,
    currency: "gold",
    imageUrl: "https://test.com/image.jpg",
    category: "misc",
    isActive: true,
    storeId: "storeX",
  };

  const created = await createProduct(newProduct);
  expect(created).toMatchObject(newProduct);
  const allProducts = await fetchProducts();
  expect(allProducts.some((p) => p.id === created.id)).toBe(true);
});

test("updateProduct modifies an existing product", async () => {
  const product = await fetchProductById("1");
  if (!product) throw new Error("Product not found");

  const updatedProduct = { ...product, name: "Updated Name" };
  const result = await updateProduct(updatedProduct);
  expect(result.name).toBe("Updated Name");
});

test("updateProduct throws if product not found", async () => {
  const product: Product = {
    id: "999",
    name: "Invalid",
    description: "Invalid",
    price: 100,
    currency: "gold",
    imageUrl: "",
    category: "misc",
    isActive: true,
    storeId: "storeX",
  };

  await expect(updateProduct(product)).rejects.toThrow();
});

test("deleteProduct removes a product", async () => {
  const result = await deleteProduct("1");
  expect(result).toBe(true);

  const product = await fetchProductById("1");
  expect(product).toBeNull();
});

test("deleteProduct returns false if not found", async () => {
  const result = await deleteProduct("999");
  expect(result).toBe(false);
});
