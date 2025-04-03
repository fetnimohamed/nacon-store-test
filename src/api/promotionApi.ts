// api/promotionApi.ts
import { Promotion } from "../types/Promotion";

// Mock data - replace with actual API implementation
const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    storeId: "store1",
    name: "Summer Sale",
    code: "SUMMER2025",
    discountType: "percentage",
    discountValue: 20,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    isActive: true,
    appliesTo: "all",
    productIds: [],
    minimumPurchase: 0,
    usageLimit: 0,
    usageCount: 45,
  },
  {
    id: "promo2",
    storeId: "store1",
    name: "New User Discount",
    code: "WELCOME",
    discountType: "fixed",
    discountValue: 10,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isActive: true,
    appliesTo: "all",
    productIds: [],
    minimumPurchase: 50,
    usageLimit: 1,
    usageCount: 128,
  },
  {
    id: "promo3",
    storeId: "store2",
    name: "Limited Time Offer",
    code: "FLASH25",
    discountType: "percentage",
    discountValue: 25,
    startDate: "2025-04-01",
    endDate: "2025-04-15",
    isActive: false,
    appliesTo: "specific",
    productIds: ["product1", "product2"],
    minimumPurchase: 0,
    usageLimit: 100,
    usageCount: 42,
  },
];

// Get all promotions
export const fetchPromotions = async (
  storeId?: string | null
): Promise<Promotion[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (storeId) {
    return mockPromotions.filter((p) => p.storeId === storeId);
  }
  return [...mockPromotions];
};

// Get promotion by ID
export const fetchPromotionById = async (
  id: string
): Promise<Promotion | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const promotion = mockPromotions.find((p) => p.id === id);
  return promotion ? { ...promotion } : null;
};

// Create new promotion
export const createPromotion = async (
  promotion: Omit<Promotion, "id">
): Promise<Promotion> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newPromotion: Promotion = {
    ...promotion,
    id: `promo-${Date.now()}`,
    usageCount: 0,
  };

  mockPromotions.push(newPromotion);
  return { ...newPromotion };
};

// Update existing promotion
export const updatePromotion = async (
  promotion: Promotion
): Promise<Promotion> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = mockPromotions.findIndex((p) => p.id === promotion.id);

  if (index === -1) {
    throw new Error("Promotion not found");
  }

  mockPromotions[index] = { ...promotion };
  return { ...promotion };
};

// Delete promotion
export const deletePromotion = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = mockPromotions.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error("Promotion not found");
  }

  mockPromotions.splice(index, 1);
  return true;
};

// Apply promotion to products
export const applyPromotionToProducts = async (
  promotionId: string,
  productIds: string[]
): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = mockPromotions.findIndex((p) => p.id === promotionId);

  if (index === -1) {
    throw new Error("Promotion not found");
  }

  mockPromotions[index].productIds = [...productIds];
  return true;
};
