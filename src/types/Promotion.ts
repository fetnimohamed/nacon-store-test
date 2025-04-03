export interface Promotion {
  id: string;
  storeId: string;
  name: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  appliesTo: "all" | "specific";
  productIds: string[];
  minimumPurchase: number;
  usageLimit: number;
  usageCount: number;
}
