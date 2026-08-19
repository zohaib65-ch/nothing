import { Product, CategoryInfo } from "@/types";
import { toast } from "sonner";

export class ProductService {
  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  public static async fetchProductsFromApi(queryString?: string): Promise<Product[]> {
    try {
      const url = queryString ? `/api/products?${queryString}` : "/api/products";
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data.filter((p): p is Product => Boolean(p && typeof p === "object"));
      }
    } catch {
      // Fallback
    }
    return [];
  }

  public static async fetchProductByIdFromApi(id: string): Promise<Product | null> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        cache: "no-store",
        headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === "object" && !data.error) return data;
      }
    } catch {
      // Fallback
    }
    return this.getProductsLocal().find((p) => p && (p.id === id || p.slug === id)) || null;
  }

  public static getProductsLocal(): Product[] {
    if (!this.isBrowser()) return [];
    try {
      const stored = localStorage.getItem("nothing_products_v1");
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.filter((p): p is Product => Boolean(p && typeof p === "object" && (p.id || p.slug)));
      }
      return [];
    } catch {
      return [];
    }
  }

  public static getProducts(): Product[] {
    return this.getProductsLocal();
  }

  public static getPublishedProducts(): Product[] {
    return this.getProductsLocal().filter((p) => p && p.status === "published");
  }

  public static getProductBySlug(slug: string): Product | undefined {
    return this.getProductsLocal().find((p) => p && p.slug === slug);
  }

  public static async saveProductApi(product: Product): Promise<Product> {
    if (!product || typeof product !== "object") return product;
    try {
      const res = await fetch(product.id ? `/api/products/${product.id}` : "/api/products", {
        method: product.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        const saved = await res.json().catch(() => null);
        if (saved && typeof saved === "object" && !saved.error) {
          this.saveProductLocal(saved);
          return saved;
        }
        this.saveProductLocal(product);
        return product;
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || errData.message || "Failed to save product to server");
    } catch (err: any) {
      if (err.message && !err.message.includes("Failed to fetch")) {
        throw err;
      }
    }
    return this.saveProductLocal(product);
  }

  public static async updateProductFieldsApi(id: string, fields: Partial<Product>): Promise<Product | null> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        const updated = await res.json();
        if (updated && typeof updated === "object" && !updated.error) {
          this.saveProductLocal(updated);
          return updated;
        }
      }
    } catch (err) {
      toast.error("Failed to update product fields. Please try again.");
    }
    return null;
  }

  public static saveProduct(product: Product): Product {
    this.saveProductApi(product);
    return this.saveProductLocal(product);
  }

  public static saveProductLocal(product: Product): Product {
    if (!product || typeof product !== "object") return product;
    const products = this.getProductsLocal();
    const existingIndex = products.findIndex((p) => p && (p.id === product.id || (product.slug && p.slug === product.slug)));

    let updated: Product[];
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = { ...product, updatedAt: now };
    } else {
      updated = [{ ...product, createdAt: product.createdAt || now, updatedAt: now }, ...products];
    }

    if (this.isBrowser()) {
      try {
        localStorage.setItem("nothing_products_v1", JSON.stringify(updated.filter((p) => p && typeof p === "object")));
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
    const filtered = products.filter((p) => p && p.id !== id);
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
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.filter((c): c is CategoryInfo => Boolean(c && typeof c === "object"));
      }
      return [];
    } catch {
      return [];
    }
  }

  public static async fetchCategoriesFromApi(): Promise<CategoryInfo[]> {
    try {
      const res = await fetch("/api/categories", {
        cache: "no-store",
        headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data.filter((c): c is CategoryInfo => Boolean(c && typeof c === "object"));
      }
    } catch {
      // Fallback
    }
    return [];
  }

  public static saveCategory(category: CategoryInfo): CategoryInfo {
    if (!category || typeof category !== "object") return category;
    const categories = this.getCategories();
    const index = categories.findIndex(
      (c) => c && ((c as any)._id === (category as any)._id || c.id === category.id || c.slug === category.slug)
    );
    let updated: CategoryInfo[];
    if (index >= 0) {
      updated = [...categories];
      updated[index] = category;
    } else {
      updated = [...categories, category];
    }
    if (this.isBrowser()) {
      localStorage.setItem("nothing_categories_v1", JSON.stringify(updated.filter(Boolean)));
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
    const filtered = categories.filter(
      (c) => c && (c as any)._id !== idOrSlug && c.id !== idOrSlug && c.slug !== idOrSlug && (!slug || c.slug !== slug)
    );
    if (this.isBrowser()) {
      localStorage.setItem("nothing_categories_v1", JSON.stringify(filtered));
    }
    return true;
  }
}
