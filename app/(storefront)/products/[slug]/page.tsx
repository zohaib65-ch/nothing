"use client";

import * as React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useSpecsStore } from "@/store/useSpecsStore";
import { useProductStore } from "@/store/useProductStore";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { HeroSpecShowcase } from "@/components/features/products/hero-spec-showcase";
import { BentoFeatureGrid } from "@/components/features/products/bento-feature-grid";
import { ProductShowcaseImages } from "@/components/features/products/product-showcase-images";

export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const colorQuery = searchParams?.get("color");

  const { addItem } = useCartStore();
  const { openSpecs } = useSpecsStore();
  const { getProductBySlug, isLoading: storeLoading, isFetched } = useProductStore();

  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Derive product from store when it becomes available
  React.useEffect(() => {
    if (!slug) return;

    if (isFetched) {
      // Store is populated — read from memory
      const found = getProductBySlug(slug);
      if (found) {
        setProduct(found);
        let initialVariant: ProductVariant | null = found.variants?.[0] || null;
        if (colorQuery && found.variants?.length) {
          const matched = found.variants.find(
            (v) => v.color && v.color.trim().toLowerCase() === colorQuery.trim().toLowerCase()
          );
          if (matched) initialVariant = matched;
        }
        setSelectedVariant(initialVariant);
        setIsLoading(false);
      } else {
        // Product not found in store — try direct API call as fallback
        fetchDirect();
      }
    } else if (!storeLoading) {
      // Store not fetching yet — go direct (e.g. user opened this URL fresh)
      fetchDirect();
    }
    // If storeLoading === true, we wait for it to finish (see next effect)
  }, [slug, colorQuery, isFetched, storeLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchDirect() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${slug}`);
      if (res.ok) {
        const item: Product = await res.json();
        setProduct(item);
        let initialVariant: ProductVariant | null = item?.variants?.[0] || null;
        if (colorQuery && item?.variants?.length) {
          const matched = item.variants.find(
            (v) => v.color && v.color.trim().toLowerCase() === colorQuery.trim().toLowerCase()
          );
          if (matched) initialVariant = matched;
        }
        setSelectedVariant(initialVariant);
      } else {
        setProduct(null);
      }
    } catch {
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenSpecs = () => {
    if (product) {
      const activeSpecs = Array.isArray(selectedVariant?.specifications) ? selectedVariant.specifications : product.specifications;
      openSpecs(activeSpecs || [], product.name);
    }
  };

  React.useEffect(() => {
    if (product && selectedVariant) {
      const activeSpecs = Array.isArray(selectedVariant.specifications) ? selectedVariant.specifications : product.specifications;
      useSpecsStore.setState({
        specifications: activeSpecs || [],
        productName: product.name,
      });
    }
  }, [selectedVariant, product]);

  // While the global store is loading (layout triggered fetch), show loader
  if (isLoading || (storeLoading && !product)) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="py-24 text-center bg-[#050505] text-white space-y-4">
        <Heading dotMatrix size="lg">
          PRODUCT NOT FOUND
        </Heading>
        <p className="text-xs text-neutral-400">The product you are looking for does not exist.</p>
        <Button variant="outline" onClick={() => router.push("/products")}>
          BACK TO CATALOG
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f6] min-h-screen text-white space-y-0">
      <HeroSpecShowcase
        product={product}
        selectedVariant={selectedVariant}
        onSelectVariant={(v) => setSelectedVariant(v)}
        onAddToCart={() => addItem(product, selectedVariant, 1)}
        onOpenSpecs={handleOpenSpecs}
      />

      <BentoFeatureGrid product={product} />
      <ProductShowcaseImages product={product} />
    </div>
  );
}
