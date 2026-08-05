"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";
import { ProductService } from "@/services/productService";
import { Product, CategoryInfo } from "@/types";
import { ProductGrid } from "@/components/features/products/product-grid";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const {
    products: storeProducts,
    categories: storeCategories,
    isLoading: storeLoading,
    isFetched,
  } = useProductStore();

  // Fallback state for direct navigation
  const [fallbackProducts, setFallbackProducts] = React.useState<Product[]>([]);
  const [fallbackCategories, setFallbackCategories] = React.useState<CategoryInfo[]>([]);
  const [fallbackLoading, setFallbackLoading] = React.useState(false);

  React.useEffect(() => {
    if (!slug) return;
    if (!isFetched && !storeLoading) {
      setFallbackLoading(true);
      Promise.all([
        ProductService.fetchCategoriesFromApi(),
        ProductService.fetchProductsFromApi(`status=published&category=${slug}`),
      ])
        .then(([cats, prods]) => {
          setFallbackCategories(cats);
          setFallbackProducts(prods);
        })
        .finally(() => setFallbackLoading(false));
    }
  }, [slug, isFetched, storeLoading]);

  const isLoading = storeLoading || fallbackLoading;

  const products = isFetched
    ? storeProducts.filter((p) => p.category === slug)
    : fallbackProducts;

  const categories = isFetched ? storeCategories : fallbackCategories;
  const category = categories.find((c) => c.slug === slug || c.id === slug) || null;

  if (isLoading) {
    return (
      <div className="py-24 text-center bg-[#050505] text-white">
        <div className="font-mono text-sm animate-pulse">LOADING CATEGORY...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-24 text-center bg-[#050505] text-white space-y-4">
        <Heading dotMatrix size="lg">
          CATEGORY NOT FOUND
        </Heading>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white space-y-16 pb-24">
      {/* Category Banner Hero */}
      <div className="relative min-h-[40vh] w-full bg-[#0F0F10] border-b border-[#26262A] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
        </div>

        <Container className="relative z-10 py-16 space-y-4">
          <Heading badgeText={category.badge || "CATEGORY"} dotMatrix size="xl">
            {category.name}
          </Heading>
          <p className="text-neutral-300 font-sans text-base max-w-xl leading-relaxed">
            {category.description}
          </p>
        </Container>
      </div>

      {/* Category Products */}
      <Container space-y-8>
        <div className="flex justify-between items-center font-mono text-xs text-neutral-500 uppercase border-b border-[#26262A] pb-4">
          <span>{products.length} PRODUCTS AVAILABLE</span>
          <span className="text-[#D71921]">CATEGORY: {category.name}</span>
        </div>

        <ProductGrid products={products} isLoading={isLoading} />
      </Container>
    </div>
  );
}
