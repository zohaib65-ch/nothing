"use client";

import * as React from "react";
import Link from "next/link";
import { ProductService } from "@/services/productService";
import { Product, CategoryInfo } from "@/types";
import { Package, FolderTree, MessageSquare, Eye, Plus, Settings, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<CategoryInfo[]>([]);
  const [orders, setOrders] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData, ordersRes] = await Promise.all([
          ProductService.fetchProductsFromApi(),
          ProductService.fetchCategoriesFromApi(),
          fetch("/api/orders").then((res) => (res.ok ? res.json() : [])),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setOrders(ordersRes);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };
    loadData();
    window.addEventListener("products_updated", loadData);
    window.addEventListener("categories_updated", loadData);
    return () => {
      window.removeEventListener("products_updated", loadData);
      window.removeEventListener("categories_updated", loadData);
    };
  }, []);

  const totalPublished = products.filter((p) => p.status === "published").length;
  const totalFeatured = products.filter((p) => p.isFeatured).length;
  const pendingOrdersCount = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
  const deliveredOrdersCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="space-y-8 select-none">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h2 className="font-mono text-lg sm:text-xl font-bold uppercase tracking-wider text-neutral-900"> OVERVIEW & ANALYTICS </h2>
          <p className="text-xs text-neutral-500 font-sans"> Real - time management of product catalog, categories, and WhatsApp storefront settings.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/admin/products">
            <Button variant="red" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              ADD PRODUCT
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="outline" size="sm" leftIcon={<Settings className="h-4 w-4" />}>
              SETTINGS
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200/80 p-6 space-y-3 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold"> TOTAL PRODUCTS </span>
            <Package className="h-4 w-4 text-[#D71921]" />
          </div>
          <div className="font-mono text-3xl font-black text-neutral-900"> {products.length} </div>
          <div className="font-mono text-[10px] text-emerald-600 uppercase font-bold">
            {totalPublished} PUBLISHED • {totalFeatured} FEATURED
          </div>
        </div>

        <div className="bg-white border border-neutral-200/80 p-6 space-y-3 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold"> CATEGORIES </span>
            <FolderTree className="h-4 w-4 text-[#D71921]" />
          </div>
          <div className="font-mono text-3xl font-black text-neutral-900"> {categories.length} </div>
          <div className="font-mono text-[10px] text-neutral-500 uppercase font-bold"> ACTIVE CATALOG SECTIONS </div>
        </div>
      </div>
    </div>
  );
}
