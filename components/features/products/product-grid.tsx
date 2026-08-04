"use client";

import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { getVariantCardsForListing } from "@/lib/utils";

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  const cardItems = getVariantCardsForListing(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardItems.map((item) => (
        <ProductCard
          key={item.id}
          product={item.product}
          imageUrl={item.image}
          href={item.href}
          displayPrice={item.price}
          variant={item.variant}
        />
      ))}
    </div>
  );
}
