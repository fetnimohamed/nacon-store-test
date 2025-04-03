import {
  fetchStores,
  fetchStoreById,
  createStore,
  updateStore,
  deleteStore,
  resetToDefaultStores,
} from "./storeApi"; // adapte le chemin
import { Store } from "../types/Product";

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
  await resetToDefaultStores();
});

test("fetchStores returns all default stores", async () => {
  const stores = await fetchStores();
  expect(stores.length).toBe(3);
  expect(stores.map((s) => s.id)).toContain("store1");
});

test("fetchStoreById returns the correct store", async () => {
  const store = await fetchStoreById("store2");
  expect(store).not.toBeNull();
  expect(store?.theme).toBe("halloween");
});

test("fetchStoreById returns null if not found", async () => {
  const store = await fetchStoreById("invalid_id");
  expect(store).toBeNull();
});

test("createStore adds a new store with unique id", async () => {
  const newStore = {
    name: "Nouvelle Boutique",
    description: "Une nouvelle boutique test",
    isActive: true,
    gameId: "game1",
    theme: "fantasy",
  };

  const created = await createStore(newStore);
  expect(created.id).toMatch(/^store\d+$/);
  expect(created.name).toBe("Nouvelle Boutique");

  const stores = await fetchStores();
  expect(stores.length).toBe(4);
});

test("updateStore modifies an existing store", async () => {
  const store = await fetchStoreById("store1");
  if (!store) throw new Error("Store not found");

  const updated = { ...store, name: "Boutique Mise à Jour" };
  const result = await updateStore(updated);
  expect(result.name).toBe("Boutique Mise à Jour");
});

test("updateStore throws if store not found", async () => {
  const fakeStore: Store = {
    id: "unknown",
    name: "Fake Store",
    description: "",
    isActive: true,
    gameId: "gameX",
    theme: "ghost",
  };

  await expect(updateStore(fakeStore)).rejects.toThrow(
    "Store with ID unknown not found"
  );
});

test("deleteStore removes a store", async () => {
  const result = await deleteStore("store3");
  expect(result).toBe(true);

  const store = await fetchStoreById("store3");
  expect(store).toBeNull();

  const allStores = await fetchStores();
  expect(allStores.length).toBe(2);
});

test("deleteStore returns false if store not found", async () => {
  const result = await deleteStore("invalid_id");
  expect(result).toBe(false);
});

test("resetToDefaultStores resets the data", async () => {
  await deleteStore("store2");

  let stores = await fetchStores();
  expect(stores.length).toBe(2);

  await resetToDefaultStores();

  stores = await fetchStores();
  expect(stores.length).toBe(3);
});
