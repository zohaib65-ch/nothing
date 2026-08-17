"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/features/products/product-card";
import { getVariantCardsForListing } from "@/lib/utils";

interface CollectionClientProps {
  slug: string;
  initialProducts: Product[];
}

export default function CollectionClient({ slug, initialProducts }: CollectionClientProps) {
  const titleMap: Record<string, string> = {
    phones: "Nothing & CMF Phones",
    chargers: "Power & Fast Chargers",
    audio: "Audio & Wireless Earbuds",
    protectors: "Screen & Glass Protectors",
    "shop-all": "Shop All Catalog",
    apparel: "Nothing Apparel",
  };

  const currentTitle = titleMap[slug] || `Collection: ${slug.toUpperCase()}`;
  const cardItems = React.useMemo(() => getVariantCardsForListing(initialProducts), [initialProducts]);

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-[#111] pt-32 pb-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1680px]">
        <div className="pb-4 md:pb-6">
          <div className="flex items-center justify-center py-2 sm:py-4">
            <div className="max-w-4xl text-center">
              <h1 className="font-ndot57 uppercase text-center text-[2.15rem] leading-[0.95] tracking-[0.2em] text-black sm:text-[2.9rem] lg:text-[3.45rem]">
                {currentTitle}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-8 gap-x-4 gap-y-9 md:gap-x-6 md:gap-y-12 lg:grid-cols-5 lg:gap-x-7 lg:gap-y-14">
          {cardItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {initialProducts.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <p className="dot-heading text-lg text-black/40">NO PRODUCTS IN THIS COLLECTION</p>
            <Link
              href="/collections/shop-all"
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
