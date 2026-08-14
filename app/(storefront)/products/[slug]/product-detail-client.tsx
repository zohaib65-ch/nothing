"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useSpecsStore } from "@/store/useSpecsStore";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { HeroSpecShowcase } from "@/components/features/products/hero-spec-showcase";
import { BentoFeatureGrid } from "@/components/features/products/bento-feature-grid";
import { ProductShowcaseImages } from "@/components/features/products/product-showcase-images";

interface ProductDetailClientProps {
  initialProduct: Product;
}

export default function ProductDetailClient({ initialProduct }: ProductDetailClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const colorQuery = searchParams?.get("color");

  const { addItem } = useCartStore();
  const { openSpecs } = useSpecsStore();

  const [product, setProduct] = React.useState<Product>(initialProduct);
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | null>(null);

  React.useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  React.useEffect(() => {
    if (product) {
      let initialVariant: ProductVariant | null = product.variants?.[0] || null;
      if (colorQuery && product.variants?.length) {
        const matched = product.variants.find(
          (v) => v.color && v.color.trim().toLowerCase() === colorQuery.trim().toLowerCase()
        );
        if (matched) initialVariant = matched;
      }
      setSelectedVariant(initialVariant);
    }
  }, [product, colorQuery]);

  const getActiveSpecs = React.useCallback(
    (variant: ProductVariant | null, prod: Product) => {
      if (Array.isArray(variant?.specifications) && variant.specifications.length > 0) {
        return variant.specifications;
      }
      if (Array.isArray(prod?.specifications) && prod.specifications.length > 0) {
        return prod.specifications;
      }
      return [];
    },
    []
  );

  const handleOpenSpecs = () => {
    if (product) {
      const activeSpecs = getActiveSpecs(selectedVariant, product);
      openSpecs(activeSpecs, product.name);
    }
  };

  React.useEffect(() => {
    if (product && selectedVariant) {
      const activeSpecs = getActiveSpecs(selectedVariant, product);
      useSpecsStore.setState({
        specifications: activeSpecs,
        productName: product.name,
      });
    }
  }, [selectedVariant, product, getActiveSpecs]);

  if (!product || !selectedVariant) {
    return (
      <div className="py-24 text-center bg-[#050505] text-white space-y-4">
        <Heading dotMatrix size="lg">
          PRODUCT NOT FOUND
        </Heading>
        <p className="text-xs text-neutral-400">The product variant you are looking for does not exist.</p>
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
