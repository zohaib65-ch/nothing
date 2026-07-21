"use client";

import * as React from "react";
import Link from "next/link";
import { CATALOG_PRODUCTS, Product, createCartProductAndVariant } from "@/lib/catalog";
import { useCartStore } from "@/store/useCartStore";
import { Search, ShoppingBag, ShieldCheck } from "lucide-react";

export default function ShopAllPage() {
  const { addItem } = useCartStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const categories = [
    { id: "all", label: "ALL PRODUCTS" },
    { id: "phones", label: "PHONES" },
    { id: "chargers", label: "CHARGERS & CABLES" },
    { id: "audio", label: "AUDIO & EARBUDS" },
    { id: "protectors", label: "PROTECTORS" },
  ];

  const filteredProducts = CATALOG_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#111] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="site-dot-overlay" />

      <div className="mx-auto max-w-screen-2xl">
        {/* Header Title */}
        <div className="border-b border-black/10 pb-8 space-y-3">
          <p className="dot-heading text-[11px] tracking-[0.3em] text-black/45">OFFICIAL CATALOG</p>
          <h1 className="collection-product-name text-3xl sm:text-5xl font-bold text-black">
            Shop All Products
          </h1>
          <p className="font-sans text-xs sm:text-sm text-black/65 max-w-xl">
            Explore authentic Nothing and CMF phones, chargers, audio gear, and screen protectors with live PKR pricing across Pakistan.
          </p>

          {/* Search bar & filter pills */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-mono tracking-wider transition ${
                    selectedCategory === cat.id
                      ? "bg-black text-white font-bold"
                      : "bg-black/5 text-black/70 hover:bg-black/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-black/10 bg-black/[0.02] pl-9 pr-4 py-1.5 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 gap-y-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-black/20"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-black/[0.01]">
                {product.warranty && (
                  <span className="absolute top-2 right-2 z-20 rounded bg-[#D71921] px-2 py-0.5 text-[9px] font-mono text-white font-bold">
                    {product.warranty}
                  </span>
                )}
                <img
                  alt={product.name}
                  src={product.image}
                  className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex flex-col flex-1 justify-between text-center">
                <div>
                  <h2 className="product-card-name text-xs sm:text-sm font-bold text-black line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="mt-1 font-sans text-[11px] text-black/50 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-black/5">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm font-bold text-black">Rs {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-black/40 line-through">
                        {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      const { product: p, variant: v } = createCartProductAndVariant(product);
                      addItem(p, v, 1);
                    }}
                    className="mt-3 w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-black py-2 text-[10px] font-bold tracking-widest text-white uppercase transition hover:bg-[#D71921]"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>ADD TO CART</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <p className="dot-heading text-lg text-black/40">NO PRODUCTS FOUND</p>
            <p className="text-xs text-black/60">Try searching for a different product name or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
