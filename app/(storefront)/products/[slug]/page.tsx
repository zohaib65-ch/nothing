"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductService } from "@/services/productService";
import { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { SpecsTable } from "@/components/features/products/specs-table";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { HeroSpecShowcase } from "@/components/features/products/hero-spec-showcase";
import { BentoFeatureGrid } from "@/components/features/products/bento-feature-grid";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { addItem } = useCartStore();
  const specsRef = React.useRef<HTMLDivElement>(null);

  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;

      const all = await ProductService.fetchProductsFromApi();
      const item = all.find((product) => product.slug === slug) || null;

      setProduct(item);
      setSelectedVariant(item?.variants[0] || null);

      if (item) {
        setRelatedProducts(all.filter((p) => p.id !== item.id && p.category === item.category && p.status === "published").slice(0, 3));
      } else {
        setRelatedProducts([]);
      }

      setIsLoading(false);
    };

    loadProduct();
  }, [slug]);

  const handleOpenSpecs = () => {
    setIsSpecsModalOpen(true);
    if (specsRef.current) {
      specsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center bg-[#050505] text-white">
        <div className="font-mono text-sm animate-pulse">LOADING PRODUCT DETAILS...</div>
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
    <div className="bg-white min-h-screen text-white space-y-0">
      <HeroSpecShowcase
        product={product}
        selectedVariant={selectedVariant}
        onSelectVariant={(v) => setSelectedVariant(v)}
        onAddToCart={() => addItem(product, selectedVariant, 1)}
        onOpenSpecs={handleOpenSpecs}
      />

      {/* Bento 7-Feature Grid Section */}
      <BentoFeatureGrid product={product} />
      <Modal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
        title={`${product.name} Technical Specifications`}
        subtitle="Detailed hardware features & performance specifications"
        maxWidth="2xl"
      >
        <div className="py-2 font-mono">
          {product.specifications && product.specifications.length > 0 ? (
            <SpecsTable specifications={product.specifications} />
          ) : (
            <p className="text-xs text-neutral-400 font-mono text-center py-6">NO TECHNICAL SPECIFICATIONS SPECIFIED FOR THIS PRODUCT.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
