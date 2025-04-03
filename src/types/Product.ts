export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  storeId: string;
  tags?: string[];
  discountPercentage?: number;
  stock?: number;
  startDate?: string;
  endDate?: string;
}

export interface ProductFilter {
  category?: string;
  status?: "active" | "inactive" | "all";
  search?: string;
  storeId?: string;
}

export interface Store {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  gameId?: string;
  theme?: string;
}
