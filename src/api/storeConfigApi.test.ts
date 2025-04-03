import {
  fetchBanners,
  fetchBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  fetchStoreConfig,
  createStoreConfig,
  updateStoreConfig,
  deleteStoreConfig,
  resetToDefaultData,
} from "./storeConfigApi"; // adapte ce chemin
import { Banner, StoreConfig } from "../types/StoreConfig";

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
  await resetToDefaultData();
});

test("fetchBanners returns all banners", async () => {
  const banners = await fetchBanners();
  expect(banners.length).toBe(3);
});

test("fetchBannerById returns correct banner", async () => {
  const banner = await fetchBannerById("banner2");
  expect(banner).not.toBeNull();
  expect(banner?.title).toContain("Offre spéciale");
});

test("fetchBannerById returns null if not found", async () => {
  const banner = await fetchBannerById("invalid");
  expect(banner).toBeNull();
});

test("createBanner adds a new banner", async () => {
  const newBanner = {
    imageUrl: "https://image.com/banner.jpg",
    title: "New Banner",
    description: "Test desc",
    linkUrl: "/test",
    position: 4,
    isActive: true,
  };

  const created = await createBanner(newBanner);
  expect(created.id).toMatch(/^banner\d+$/);
  const banners = await fetchBanners();
  expect(banners.find((b) => b.id === created.id)).toBeTruthy();
});

test("updateBanner modifies an existing banner", async () => {
  const banner = await fetchBannerById("banner1");
  if (!banner) throw new Error("Banner not found");

  const updated = { ...banner, title: "Updated Title" };
  const result = await updateBanner(updated);
  expect(result.title).toBe("Updated Title");
});

test("updateBanner throws if banner not found", async () => {
  const fakeBanner: Banner = {
    id: "notfound",
    imageUrl: "",
    title: "Fake",
    description: "",
    linkUrl: "",
    position: 99,
    isActive: false,
  };

  await expect(updateBanner(fakeBanner)).rejects.toThrow(
    "Banner with ID notfound not found"
  );
});

test("deleteBanner removes banner", async () => {
  const success = await deleteBanner("banner3");
  expect(success).toBe(true);

  const banner = await fetchBannerById("banner3");
  expect(banner).toBeNull();
});

test("deleteBanner returns false if not found", async () => {
  const result = await deleteBanner("invalid");
  expect(result).toBe(false);
});

test("fetchStoreConfig returns correct config", async () => {
  const config = await fetchStoreConfig("store1");
  expect(config).not.toBeNull();
  expect(config?.id).toBe("config1");
});

test("fetchStoreConfig returns null if not found", async () => {
  const config = await fetchStoreConfig("invalid");
  expect(config).toBeNull();
});

test("createStoreConfig returns existing if already created", async () => {
  const config = await createStoreConfig("store1");
  expect(config.id).toBe("config1");
});

test("createStoreConfig creates a new config if not existing", async () => {
  const config = await createStoreConfig("storeX");
  expect(config.storeId).toBe("storeX");

  const refetch = await fetchStoreConfig("storeX");
  expect(refetch?.id).toBe(config.id);
});

test("updateStoreConfig updates existing config", async () => {
  const config = await fetchStoreConfig("store1");
  if (!config) throw new Error("Config not found");

  const updated = { ...config, sections: [] };
  const result = await updateStoreConfig(updated);
  expect(result.sections).toEqual([]);
});

test("updateStoreConfig creates new if not found", async () => {
  const newConfig: StoreConfig = {
    id: "configX",
    storeId: "storeZ",
    sections: [],
    lastModified: new Date().toISOString(),
  };

  const updated = await updateStoreConfig(newConfig);
  expect(updated.storeId).toBe("storeZ");
});

test("deleteStoreConfig removes config", async () => {
  const result = await deleteStoreConfig("config1");
  expect(result).toBe(true);

  const config = await fetchStoreConfig("store1");
  expect(config).toBeNull();
});

test("deleteStoreConfig returns false if config not found", async () => {
  const result = await deleteStoreConfig("invalid");
  expect(result).toBe(false);
});

test("resetToDefaultData restores banners and configs", async () => {
  await deleteBanner("banner1");
  await deleteStoreConfig("config1");

  let banners = await fetchBanners();
  let config = await fetchStoreConfig("store1");
  expect(banners.find((b) => b.id === "banner1")).toBeFalsy();
  expect(config).toBeNull();

  await resetToDefaultData();

  banners = await fetchBanners();
  config = await fetchStoreConfig("store1");
  expect(banners.find((b) => b.id === "banner1")).toBeTruthy();
  expect(config?.id).toBe("config1");
});
