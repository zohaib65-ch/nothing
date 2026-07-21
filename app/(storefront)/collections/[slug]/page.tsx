"use client";

import * as React from "react";
import Link from "next/link";
import { CATALOG_PRODUCTS, Product, createCartProductAndVariant } from "@/lib/catalog";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function CollectionSlugPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "phones";
  const { addItem } = useCartStore();

  const titleMap: Record<string, string> = {
    phones: "Nothing & CMF Phones",
    chargers: "Power & Fast Chargers",
    audio: "Audio & Wireless Earbuds",
    protectors: "Screen & Glass Protectors",
    "shop-all": "Shop All Catalog",
  };

  const currentTitle = titleMap[slug] || `Collection: ${slug.toUpperCase()}`;

  const categoryProducts = slug === "shop-all"
    ? CATALOG_PRODUCTS
    : CATALOG_PRODUCTS.filter((p) => p.category === slug);

  return (
    <div className="min-h-screen bg-white text-[#111] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="site-dot-overlay" />

      <div className="mx-auto max-w-screen-2xl">
        <Link
          href="/shop-all"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-black/60 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Collections</span>
        </Link>

        {/* Collection Header */}
        <div className="border-b border-black/10 pb-8 space-y-2">
          <p className="dot-heading text-[11px] tracking-[0.3em] text-black/45">COLLECTION</p>
          <h1 className="collection-product-name text-3xl sm:text-5xl font-bold text-black">
            {currentTitle}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-black/65">
            Showing {categoryProducts.length} items available for nationwide delivery across Pakistan.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 gap-y-8">
          {categoryProducts.map((product) => (
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

        {categoryProducts.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <p className="dot-heading text-lg text-black/40">NO PRODUCTS IN THIS COLLECTION</p>
            <Link
              href="/shop-all"
              className="inline-block rounded-lg bg-black px-4 py-2 text-xs font-bold text-white uppercase"
            >
              Browse Shop All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
