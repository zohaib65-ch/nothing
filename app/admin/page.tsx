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

  React.useEffect(() => {
    const loadData = async () => {
      const [productsData, categoriesData] = await Promise.all([ProductService.fetchProductsFromApi(), ProductService.fetchCategoriesFromApi()]);
      setProducts(productsData);
      setCategories(categoriesData);
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
  return (
    <div className="space-y-8">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26262A] pb-6">
        <div>
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-white">OVERVIEW & ANALYTICS</h2>
          <p className="text-xs text-neutral-400 font-sans">Real-time management of product catalog, categories, and WhatsApp storefront settings.</p>
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
        <div className="bg-[#0F0F10] border border-[#26262A] p-6 space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="font-mono text-[10px] uppercase tracking-widest">TOTAL PRODUCTS</span>
            <Package className="h-4 w-4 text-[#D71921]" />
          </div>
          <div className="font-mono text-3xl font-black text-white">{products.length}</div>
          <div className="font-mono text-[10px] text-emerald-500 uppercase">
            {totalPublished} PUBLISHED • {totalFeatured} FEATURED
          </div>
        </div>

        <div className="bg-[#0F0F10] border border-[#26262A] p-6 space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="font-mono text-[10px] uppercase tracking-widest">CATEGORIES</span>
            <FolderTree className="h-4 w-4 text-[#D71921]" />
          </div>
          <div className="font-mono text-3xl font-black text-white">{categories.length}</div>
          <div className="font-mono text-[10px] text-neutral-500 uppercase">ACTIVE CATALOG SECTIONS</div>
        </div>

        <div className="bg-[#0F0F10] border border-[#26262A] p-6 space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="font-mono text-[10px] uppercase tracking-widest">WHATSAPP ORDERS</span>
            <MessageSquare className="h-4 w-4 text-[#D71921]" />
          </div>
          <div className="font-mono text-3xl font-black text-white">48</div>
          <div className="font-mono text-[10px] text-emerald-500 uppercase">+12% THIS WEEK</div>
        </div>

        <div className="bg-[#0F0F10] border border-[#26262A] p-6 space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="font-mono text-[10px] uppercase tracking-widest">STORE VISITORS</span>
            <Eye className="h-4 w-4 text-[#D71921]" />
          </div>
          <div className="font-mono text-3xl font-black text-white">1,280</div>
          <div className="font-mono text-[10px] text-emerald-500 uppercase">LIVE TRAFFIC ACTIVE</div>
        </div>
      </div>
    </div>
  );
}
