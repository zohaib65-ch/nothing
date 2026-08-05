import { create } from "zustand";
import { Product, CategoryInfo } from "@/types";
import { ProductService } from "@/services/productService";

interface ProductStoreState {
  products: Product[];
  categories: CategoryInfo[];
  isLoading: boolean;
  isFetched: boolean;
  fetchAll: () => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getPublishedProducts: () => Product[];
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,
  isFetched: false,

  fetchAll: async () => {
    // Guard: skip if already fetched or currently loading
    if (get().isFetched || get().isLoading) return;

    set({ isLoading: true });

    try {
      const [products, categories] = await Promise.all([
        ProductService.fetchProductsFromApi("status=published"),
        ProductService.fetchCategoriesFromApi(),
      ]);
      set({ products, categories, isFetched: true });
    } catch (err) {
      console.error("[useProductStore] Failed to fetch products:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  getProductBySlug: (slug: string) => {
    return get().products.find((p) => p.slug === slug || p.id === slug);
  },

  getProductsByCategory: (category: string) => {
    if (category === "shop-all" || category === "all") {
      return get().products;
    }
    return get().products.filter((p) => p.category === category);
  },

  getPublishedProducts: () => {
    // All products in the store are already published (fetched with status=published)
    return get().products;
  },
}));
