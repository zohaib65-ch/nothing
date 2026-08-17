import { Product } from "@/types";

export type ShopAllVendor = "Nothing" | "CMF";
export type ShopAllType = "Phones" | "Audio" | "Accessories";

export interface ShopAllFilterState {
  vendor: ShopAllVendor | null;
  type: ShopAllType | null;
  category: string | null;
}

export const SHOP_ALL_NAV_TYPES = [
  { label: "All", value: null },
  { label: "Phones", value: "Phones" as const },
  { label: "Audio", value: "Audio" as const },
  { label: "Accessories", value: "Accessories" as const },
] as const;

export const SHOP_ALL_VENDORS: ShopAllVendor[] = ["Nothing", "CMF"];

const TYPE_CATEGORY_MAP: Record<ShopAllType, string[]> = {
  Phones: ["phones"],
  Audio: ["audio"],
  Accessories: ["accessories", "chargers", "protectors", "apparel", "watches"],
};

export const SHOP_ALL_REFINE_OPTIONS = [
  { label: "All Products", type: null, category: null },
  { label: "Phones", type: "Phones" as const, category: "phones" },
  { label: "Audio", type: "Audio" as const, category: "audio" },
  { label: "Accessories", type: "Accessories" as const, category: "accessories" },
  { label: "Chargers", type: "Accessories" as const, category: "chargers" },
  { label: "Watches", type: "Accessories" as const, category: "watches" },
  { label: "Protectors", type: "Accessories" as const, category: "protectors" },
  { label: "Apparel", type: "Accessories" as const, category: "apparel" },
] as const;

export function getProductVendor(product: Product): ShopAllVendor {
  const haystack = `${product.name} ${product.slug} ${product.subcategory || ""}`.toLowerCase();
  if (haystack.includes("cmf") || product.category === "watches") {
    return "CMF";
  }
  return "Nothing";
}

export function parseShopAllParams(searchParams: URLSearchParams): ShopAllFilterState {
  const vendorParam = searchParams.get("vendor");
  const vendor: ShopAllVendor | null =
    vendorParam === "Nothing" || vendorParam === "CMF" ? vendorParam : null;

  const typeParam = searchParams.get("type");
  const type: ShopAllType | null =
    typeParam === "Phones" || typeParam === "Audio" || typeParam === "Accessories" ? typeParam : null;

  const category = searchParams.get("category");

  return { vendor, type, category };
}

export function buildShopAllQuery(filters: ShopAllFilterState): string {
  const params = new URLSearchParams();

  if (filters.vendor) params.set("vendor", filters.vendor);
  if (filters.type) params.set("type", filters.type);
  if (filters.category) params.set("category", filters.category);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getActiveNavType(filters: ShopAllFilterState): ShopAllType | null {
  if (filters.category) {
    const option = SHOP_ALL_REFINE_OPTIONS.find((item) => item.category === filters.category);
    return option?.type ?? null;
  }
  return filters.type;
}

export function sortShopAllProducts(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const aIsPhone = a.category === "phones" ? 0 : 1;
    const bIsPhone = b.category === "phones" ? 0 : 1;
    return aIsPhone - bIsPhone;
  });
}

export function filterShopAllProducts(products: Product[], filters: ShopAllFilterState): Product[] {
  return products.filter((product) => {
    if (filters.vendor && getProductVendor(product) !== filters.vendor) {
      return false;
    }

    if (filters.category) {
      return product.category === filters.category;
    }

    if (filters.type) {
      return TYPE_CATEGORY_MAP[filters.type].includes(product.category);
    }

    return true;
  });
}
