import { StoreConfig, Section, Banner } from "../types/StoreConfig";

const defaultBanners: Banner[] = [
  {
    id: "banner1",
    imageUrl:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
    title: "Nouvelles armes disponibles!",
    description: "Découvrez notre nouvelle collection d'armes légendaires",
    linkUrl: "/products?category=weapons",
    position: 1,
    isActive: true,
  },
  {
    id: "banner2",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
    title: "Offre spéciale",
    description: "-20% sur toutes les potions",
    linkUrl: "/products?category=potions",
    position: 2,
    isActive: true,
  },
  {
    id: "banner3",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
    title: "Événement Spécial",
    description: "Participez à notre tournoi mensuel",
    linkUrl: "/events",
    position: 3,
    isActive: true,
  },
];

const defaultSections: Section[] = [
  {
    id: "section1",
    type: "banner",
    position: 1,
    isActive: true,
    banners: [defaultBanners[0]],
  },
  {
    id: "section2",
    type: "carousel",
    title: "Produits populaires",
    displayMode: "default",
    position: 2,
    itemIds: ["1", "2", "3"],
    isActive: true,
  },
  {
    id: "section3",
    type: "grid",
    title: "toutes les produits",
    displayMode: "compact",
    position: 3,
    itemIds: ["4", "5", "6", "7"],
    isActive: true,
  },
  {
    id: "section4",
    type: "banner",
    position: 4,
    isActive: true,
    banners: [defaultBanners[1], defaultBanners[2]],
  },
];

const defaultConfigs: StoreConfig[] = [
  {
    id: "config1",
    storeId: "store1",
    sections: defaultSections,
    lastModified: new Date().toISOString(),
  },
];

const STORE_CONFIGS_STORAGE_KEY = "store_configs";
const BANNERS_STORAGE_KEY = "store_banners";

const getStoreConfigs = (): StoreConfig[] => {
  try {
    if (!localStorage.getItem(STORE_CONFIGS_STORAGE_KEY)) {
      localStorage.setItem(
        STORE_CONFIGS_STORAGE_KEY,
        JSON.stringify(defaultConfigs)
      );
    }

    const data = localStorage.getItem(STORE_CONFIGS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting store configs from localStorage:", error);
    return [...defaultConfigs];
  }
};

const getBanners = (): Banner[] => {
  try {
    if (!localStorage.getItem(BANNERS_STORAGE_KEY)) {
      localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(defaultBanners));
    }

    const data = localStorage.getItem(BANNERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting banners from localStorage:", error);
    return [...defaultBanners];
  }
};

const saveStoreConfigs = (configs: StoreConfig[]): void => {
  try {
    localStorage.setItem(STORE_CONFIGS_STORAGE_KEY, JSON.stringify(configs));
  } catch (error) {
    console.error("Error saving store configs to localStorage:", error);
  }
};

const saveBanners = (banners: Banner[]): void => {
  try {
    localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(banners));
  } catch (error) {
    console.error("Error saving banners to localStorage:", error);
  }
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API functions
export const fetchBanners = async (): Promise<Banner[]> => {
  await delay(500);
  return [...getBanners()];
};

export const fetchBannerById = async (id: string): Promise<Banner | null> => {
  await delay(300);
  const banners = getBanners();
  const banner = banners.find((b) => b.id === id);
  return banner || null;
};

export const updateBanner = async (updatedBanner: Banner): Promise<Banner> => {
  await delay(600);
  const banners = getBanners();
  const index = banners.findIndex((b) => b.id === updatedBanner.id);

  if (index === -1) {
    throw new Error(`Banner with ID ${updatedBanner.id} not found`);
  }

  banners[index] = updatedBanner;
  saveBanners(banners);
  return updatedBanner;
};

export const createBanner = async (
  newBanner: Omit<Banner, "id">
): Promise<Banner> => {
  await delay(600);
  const banners = getBanners();

  const maxId = Math.max(
    ...banners.map((b) => {
      const match = b.id.match(/\d+$/);
      return match ? parseInt(match[0], 10) : 0;
    })
  );
  const nextId = `banner${maxId + 1}`;

  const bannerWithId = { ...newBanner, id: nextId } as Banner;

  banners.push(bannerWithId);
  saveBanners(banners);
  return bannerWithId;
};

export const deleteBanner = async (id: string): Promise<boolean> => {
  await delay(500);
  const banners = getBanners();
  const initialLength = banners.length;

  const filteredBanners = banners.filter((b) => b.id !== id);

  if (filteredBanners.length === initialLength) {
    return false;
  }

  saveBanners(filteredBanners);
  return true;
};

export const fetchStoreConfig = async (
  storeId: string
): Promise<StoreConfig | null> => {
  await delay(800);
  const configs = getStoreConfigs();
  const config = configs.find((c) => c.storeId === storeId);
  return config || null;
};

export const updateStoreConfig = async (
  config: StoreConfig
): Promise<StoreConfig> => {
  await delay(1000);
  const configs = getStoreConfigs();
  const index = configs.findIndex((c) => c.id === config.id);

  // Update existing config
  if (index >= 0) {
    configs[index] = {
      ...config,
      lastModified: new Date().toISOString(),
    };
    saveStoreConfigs(configs);
    return configs[index];
  }

  // Create new config
  const newConfig = {
    ...config,
    id: `config${configs.length + 1}`,
    lastModified: new Date().toISOString(),
  };

  configs.push(newConfig);
  saveStoreConfigs(configs);
  return newConfig;
};

export const createStoreConfig = async (
  storeId: string
): Promise<StoreConfig> => {
  await delay(800);
  const configs = getStoreConfigs();

  const existingConfig = configs.find((c) => c.storeId === storeId);
  if (existingConfig) {
    return existingConfig;
  }

  const newConfig: StoreConfig = {
    id: `config${configs.length + 1}`,
    storeId,
    sections: [],
    lastModified: new Date().toISOString(),
  };

  configs.push(newConfig);
  saveStoreConfigs(configs);
  return newConfig;
};

export const deleteStoreConfig = async (id: string): Promise<boolean> => {
  await delay(600);
  const configs = getStoreConfigs();
  const initialLength = configs.length;

  const filteredConfigs = configs.filter((c) => c.id !== id);

  if (filteredConfigs.length === initialLength) {
    return false;
  }

  saveStoreConfigs(filteredConfigs);
  return true;
};

export const resetToDefaultData = async (): Promise<void> => {
  await delay(500);
  saveStoreConfigs(defaultConfigs);
  saveBanners(defaultBanners);
};
