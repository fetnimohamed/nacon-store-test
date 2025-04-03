export interface Banner {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  linkUrl?: string;
  position: number;
  isActive: boolean;
}

export interface Section {
  id: string;
  type: "banner" | "carousel" | "grid" | "featured";
  title?: string;
  displayMode?: "default" | "compact" | "expanded";
  position: number;
  itemIds?: string[];
  isActive: boolean;
  banners?: Banner[];
}

export interface StoreConfig {
  id: string;
  storeId: string;
  sections: Section[];
  lastModified: string;
}
