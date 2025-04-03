import { Store } from "../types/Product";

// Default stores data
const defaultStores: Store[] = [
  {
    id: "store1",
    name: "Boutique principale",
    description: "La boutique principale du jeu",
    isActive: true,
    gameId: "game1",
    theme: "default",
  },
  {
    id: "store2",
    name: "Boutique événement Halloween",
    description: "Boutique spéciale pour Halloween",
    isActive: true,
    gameId: "game1",
    theme: "halloween",
  },
  {
    id: "store3",
    name: "Boutique Noël",
    description: "Offres spéciales pour les fêtes",
    isActive: false,
    gameId: "game1",
    theme: "christmas",
  },
];

const STORES_STORAGE_KEY = "store_shops";
const PRODUCTS_STORAGE_KEY = "store_products";

const getStores = (): Store[] => {
  try {
    if (!localStorage.getItem(STORES_STORAGE_KEY)) {
      localStorage.setItem(STORES_STORAGE_KEY, JSON.stringify(defaultStores));
    }

    const data = localStorage.getItem(STORES_STORAGE_KEY);
    const productDdata = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    console.log({
      data: JSON.parse(data ?? ""),
      productDdata: JSON.parse(productDdata ?? ""),
    });

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting stores from localStorage:", error);
    return [...defaultStores];
  }
};

const saveStores = (stores: Store[]): void => {
  try {
    localStorage.setItem(STORES_STORAGE_KEY, JSON.stringify(stores));
  } catch (error) {
    console.error("Error saving stores to localStorage:", error);
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchStores = async (): Promise<Store[]> => {
  await delay(800);
  return [...getStores()];
};

export const fetchStoreById = async (id: string): Promise<Store | null> => {
  await delay(500);
  const stores = getStores();
  const store = stores.find((s) => s.id === id);
  return store || null;
};

export const updateStore = async (updatedStore: Store): Promise<Store> => {
  await delay(600);
  const stores = getStores();
  const index = stores.findIndex((s) => s.id === updatedStore.id);

  if (index === -1) {
    throw new Error(`Store with ID ${updatedStore.id} not found`);
  }

  stores[index] = updatedStore;
  saveStores(stores);
  return updatedStore;
};

export const createStore = async (
  newStore: Omit<Store, "id">
): Promise<Store> => {
  await delay(600);
  const stores = getStores();

  const maxId = Math.max(
    ...stores.map((s) => {
      const match = s.id.match(/\d+$/);
      return match ? parseInt(match[0], 10) : 0;
    })
  );
  const nextId = `store${maxId + 1}`;

  const storeWithId = { ...newStore, id: nextId } as Store;

  stores.push(storeWithId);
  saveStores(stores);
  return storeWithId;
};

export const deleteStore = async (id: string): Promise<boolean> => {
  await delay(600);
  const stores = getStores();
  const initialLength = stores.length;

  const filteredStores = stores.filter((s) => s.id !== id);

  if (filteredStores.length === initialLength) {
    return false;
  }

  saveStores(filteredStores);
  return true;
};

export const resetToDefaultStores = async (): Promise<void> => {
  await delay(300);
  saveStores(defaultStores);
};
