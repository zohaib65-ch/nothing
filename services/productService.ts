import { Product, CategoryInfo } from "@/types";

export class ProductService {
  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  public static async fetchProductsFromApi(queryString?: string): Promise<Product[]> {
    try {
      const url = queryString ? `/api/products?${queryString}` : "/api/products";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback
    }
    return [];
  }

  public static async fetchProductByIdFromApi(id: string): Promise<Product | null> {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return this.getProductsLocal().find((p) => p.id === id || p.slug === id) || null;
  }

  public static getProductsLocal(): Product[] {
    if (!this.isBrowser()) return [];
    try {
      const stored = localStorage.getItem("nothing_products_v1");
      if (!stored) return [];
      return JSON.parse(stored) as Product[];
    } catch {
      return [];
    }
  }

  public static getProducts(): Product[] {
    return this.getProductsLocal();
  }

  public static getPublishedProducts(): Product[] {
    return this.getProductsLocal().filter((p) => p.status === "published");
  }

  public static getProductBySlug(slug: string): Product | undefined {
    return this.getProductsLocal().find((p) => p.slug === slug);
  }

  public static async saveProductApi(product: Product): Promise<Product> {
    try {
      const res = await fetch(product.id ? `/api/products/${product.id}` : "/api/products", {
        method: product.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        const saved = await res.json();
        this.saveProductLocal(saved);
        return saved;
      }
      const errData = await res.json();
      throw new Error(errData.error || errData.message || "Failed to save product to server");
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch")) {
        throw err;
      }
    }
    return this.saveProductLocal(product);
  }

  public static saveProduct(product: Product): Product {
    this.saveProductApi(product);
    return this.saveProductLocal(product);
  }

  public static saveProductLocal(product: Product): Product {
    const products = this.getProductsLocal();
    const existingIndex = products.findIndex((p) => p.id === product.id || p.slug === product.slug);

    let updated: Product[];
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = { ...product, updatedAt: now };
    } else {
      updated = [{ ...product, createdAt: now, updatedAt: now }, ...products];
    }

    if (this.isBrowser()) {
      try {
        localStorage.setItem("nothing_products_v1", JSON.stringify(updated));
      } catch {
        // Quota exceeded in localStorage, safe to ignore as MongoDB handles primary storage
      }
    }
    return product;
  }

  public static async deleteProduct(id: string): Promise<boolean> {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
    } catch {
      // Fallback
    }

    const products = this.getProductsLocal();
    const filtered = products.filter((p) => p.id !== id);
    if (this.isBrowser()) {
      try {
        localStorage.setItem("nothing_products_v1", JSON.stringify(filtered));
      } catch {
        // Quota exceeded in localStorage
      }
    }
    return true;
  }

  public static getCategories(): CategoryInfo[] {
    if (!this.isBrowser()) return [];
    try {
      const stored = localStorage.getItem("nothing_categories_v1");
      if (!stored) return [];
      return JSON.parse(stored) as CategoryInfo[];
    } catch {
      return [];
    }
  }

  public static async fetchCategoriesFromApi(): Promise<CategoryInfo[]> {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback
    }
    return [];
  }

  public static saveCategory(category: CategoryInfo): CategoryInfo {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => (c as any)._id === (category as any)._id || c.id === category.id || c.slug === category.slug);
    let updated: CategoryInfo[];
    if (index >= 0) {
      updated = [...categories];
      updated[index] = category;
    } else {
      updated = [...categories, category];
    }
    if (this.isBrowser()) {
      localStorage.setItem("nothing_categories_v1", JSON.stringify(updated));
    }
    return category;
  }

  public static async deleteCategory(idOrSlug: string, slug?: string): Promise<boolean> {
    try {
      await fetch(`/api/categories/${idOrSlug}`, { method: "DELETE" });
    } catch {
      // Fallback
    }

    const categories = this.getCategories();
    const filtered = categories.filter((c) => (c as any)._id !== idOrSlug && c.id !== idOrSlug && c.slug !== idOrSlug && (!slug || c.slug !== slug));
    if (this.isBrowser()) {
      localStorage.setItem("nothing_categories_v1", JSON.stringify(filtered));
    }
    return true;
  }
}
