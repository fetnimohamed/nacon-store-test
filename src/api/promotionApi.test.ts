import {
  fetchPromotions,
  fetchPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
  applyPromotionToProducts,
} from "./promotionApi";
import { Promotion } from "../types/Promotion";

describe("promotionApi", () => {
  let initialCount = 0;

  beforeEach(async () => {
    const promotions = await fetchPromotions();
    initialCount = promotions.length;
  });

  test("fetchPromotions returns all promotions", async () => {
    const promotions = await fetchPromotions();
    expect(promotions.length).toBeGreaterThan(0);
  });

  test("fetchPromotions filters by storeId", async () => {
    const store1Promos = await fetchPromotions("store1");
    expect(store1Promos.every((p) => p.storeId === "store1")).toBe(true);
  });

  test("fetchPromotionById returns correct promotion", async () => {
    const promo = await fetchPromotionById("promo1");
    expect(promo).not.toBeNull();
    expect(promo?.name).toBe("Summer Sale");
  });

  test("fetchPromotionById returns null for unknown ID", async () => {
    const promo = await fetchPromotionById("invalid_id");
    expect(promo).toBeNull();
  });

  test("createPromotion adds a new promotion", async () => {
    const newPromo = {
      storeId: "abc",
      name: "Test Promo",
      code: "TEST2025",
      discountType: "percentage" as "percentage",
      discountValue: 10,
      startDate: "2025-04-01",
      endDate: "2025-04-30",
      isActive: true,
      appliesTo: "specific" as "all" | "specific",
      productIds: ["p1", "p2"],
      minimumPurchase: 0,
      usageLimit: 100,
      usageCount: 0,
    };

    const created = await createPromotion(newPromo);
    expect(created.id).toContain("promo-");
    expect(created.name).toBe("Test Promo");

    const allPromos = await fetchPromotions();
    expect(allPromos.length).toBe(initialCount + 1);
  });

  test("updatePromotion modifies an existing promotion", async () => {
    const promo = await fetchPromotionById("promo2");
    if (!promo) throw new Error("Promotion not found");

    const updatedPromo = { ...promo, name: "Updated Promo" };
    const result = await updatePromotion(updatedPromo);
    expect(result.name).toBe("Updated Promo");
  });

  test("updatePromotion throws for unknown promotion", async () => {
    const promo: Promotion = {
      id: "invalid_id",
      storeId: "store1",
      name: "Fake Promo",
      code: "FAKE",
      discountType: "percentage",
      discountValue: 50,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      isActive: true,
      appliesTo: "all",
      productIds: [],
      minimumPurchase: 0,
      usageLimit: 0,
      usageCount: 0,
    };

    await expect(updatePromotion(promo)).rejects.toThrow("Promotion not found");
  });

  test("deletePromotion removes a promotion", async () => {
    const newPromo = await createPromotion({
      storeId: "store1",
      name: "ToDelete",
      code: "DEL",
      discountType: "fixed",
      discountValue: 5,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      isActive: true,
      appliesTo: "all",
      productIds: [],
      minimumPurchase: 0,
      usageLimit: 0,
      usageCount: 0,
    });

    const deleted = await deletePromotion(newPromo.id);
    expect(deleted).toBe(true);

    const promo = await fetchPromotionById(newPromo.id);
    expect(promo).toBeNull();
  });

  test("deletePromotion throws if not found", async () => {
    await expect(deletePromotion("invalid_id")).rejects.toThrow(
      "Promotion not found"
    );
  });

  test("applyPromotionToProducts updates productIds", async () => {
    const promo = await fetchPromotionById("promo1");
    if (!promo) throw new Error("Promo not found");

    const result = await applyPromotionToProducts(promo.id, ["prodA", "prodB"]);
    expect(result).toBe(true);

    const updated = await fetchPromotionById(promo.id);
    expect(updated?.productIds).toEqual(["prodA", "prodB"]);
  });

  test("applyPromotionToProducts throws if promotion not found", async () => {
    await expect(
      applyPromotionToProducts("invalid_id", ["id1"])
    ).rejects.toThrow("Promotion not found");
  });
});
