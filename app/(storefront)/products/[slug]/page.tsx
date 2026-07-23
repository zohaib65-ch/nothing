"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ProductService } from "@/services/productService";
import { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { ProductGallery } from "@/components/features/products/product-gallery";
import { VariantSelector } from "@/components/features/products/variant-selector";
import { SpecsTable } from "@/components/features/products/specs-table";
import { StickyBuyBar } from "@/components/features/products/sticky-buy-bar";
import { ProductGrid } from "@/components/features/products/product-grid";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { addItem } = useCartStore();

  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;

      const all = await ProductService.fetchProductsFromApi();
      const item = all.find((product) => product.slug === slug) || null;

      setProduct(item);
      setSelectedVariant(item?.variants[0] || null);

      if (item) {
        setRelatedProducts(
          all
            .filter((p) => p.id !== item.id && p.category === item.category && p.status === "published")
            .slice(0, 3)
        );
      } else {
        setRelatedProducts([]);
      }

      setIsLoading(false);
    };

    loadProduct();
  }, [slug]);

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

  const currentPrice = selectedVariant.salePrice || selectedVariant.price;
  const originalPrice = selectedVariant.salePrice ? selectedVariant.price : null;

  const whatsappUrl = generateWhatsAppLink(
    WHATSAPP_NUMBER,
    product,
    selectedVariant,
    1
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24 space-y-20">
      {/* Breadcrumb & Navigation */}
      <div className="border-b border-[#26262A] py-4">
        <Container className="flex items-center justify-between font-mono text-xs text-neutral-400">
          <Link
            href="/products"
            className="inline-flex items-center space-x-1 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>BACK TO PRODUCTS</span>
          </Link>
          <div className="hidden sm:flex items-center space-x-2">
            <span className="uppercase">{product.category}</span>
            <span>/</span>
            <span className="text-white uppercase">{product.name}</span>
          </div>
        </Container>
      </div>

      {/* Main Hero Product Display */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Stage */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              videos={product.videos}
              productName={product.name}
            />
          </div>

          {/* Product Purchasing Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                {product.isNewArrival && <Badge variant="red">NEW RELEASE</Badge>}
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                  {product.subcategory}
                </span>
              </div>

              <Heading as="h1" size="xl" dotMatrix>
                {product.name}
              </Heading>

              <p className="text-neutral-300 font-sans text-sm leading-relaxed">
                {product.tagline || product.shortDescription}
              </p>
            </div>

            {/* Price Display */}
            <div className="p-4 bg-[#0F0F10] border border-[#26262A] flex items-baseline space-x-4">
              <span className="font-mono text-3xl font-black text-white">
                {formatPrice(currentPrice)}
              </span>
              {originalPrice && (
                <span className="font-mono text-sm text-neutral-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              <span className="font-mono text-[10px] text-emerald-500 uppercase font-bold ml-auto">
                FREE SHIPPING AVAILABLE
              </span>
            </div>

            {/* Interactive Variant Selection */}
            <VariantSelector
              product={product}
              selectedVariant={selectedVariant}
              onSelectVariant={(v) => setSelectedVariant(v)}
            />

            {/* Order Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/order/${product.slug}?variant=${selectedVariant.id}`}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#D71921] hover:bg-[#B51219] text-white font-mono text-sm font-bold uppercase tracking-wider py-4 shadow-[0_0_25px_rgba(215,25,33,0.35)] transition-all"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>BUY NOW</span>
              </Link>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                leftIcon={<ShoppingBag className="h-4 w-4" />}
                onClick={() => addItem(product, selectedVariant, 1)}
              >
                ADD TO BAG
              </Button>
            </div>

            {/* Guarantee / Value Props */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#26262A] text-center">
              <div className="space-y-1 p-2">
                <ShieldCheck className="h-5 w-5 mx-auto text-[#D71921]" />
                <span className="block font-mono text-[9px] uppercase text-neutral-400">
                  OFFICIAL WARRANTY
                </span>
              </div>
              <div className="space-y-1 p-2">
                <Truck className="h-5 w-5 mx-auto text-[#D71921]" />
                <span className="block font-mono text-[9px] uppercase text-neutral-400">
                  EXPRESS SHIPPING
                </span>
              </div>
              <div className="space-y-1 p-2">
                <RefreshCw className="h-5 w-5 mx-auto text-[#D71921]" />
                <span className="block font-mono text-[9px] uppercase text-neutral-400">
                  7-DAY REPLACEMENT
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Product Highlights Section */}
      {product.highlights && product.highlights.length > 0 && (
        <section className="py-16 bg-[#0A0A0B] border-y border-[#26262A]">
          <Container className="space-y-8">
            <Heading badgeText="KEY SPECS" dotMatrix size="md">
              PERFORMANCE HIGHLIGHTS
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="bg-[#050505] border border-[#26262A] p-6 space-y-2 hover:border-[#D71921] transition-colors"
                >
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">
                    {h.title}
                  </span>
                  <div className="font-mono text-xl font-extrabold text-white">
                    {h.value}
                  </div>
                  <p className="text-xs text-neutral-400 font-sans">{h.subtitle}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Engineering Features Showcase */}
      {product.features && product.features.length > 0 && (
        <Container className="space-y-8">
          <Heading badgeText="INNOVATION" dotMatrix size="md">
            ENGINEERED WITH PURPOSE
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.features.map((feat) => (
              <div
                key={feat.id}
                className="bg-[#0F0F10] border border-[#26262A] p-8 space-y-4 relative overflow-hidden group hover:border-[#D71921] transition-colors"
              >
                <span className="font-mono text-[10px] text-[#D71921] uppercase tracking-widest block">
                  {feat.tagline || "FEATURE"}
                </span>
                <h4 className="font-mono text-lg font-bold uppercase text-white">
                  {feat.title}
                </h4>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Categorized Technical Specifications */}
      {product.specifications && (
        <Container>
          <SpecsTable specifications={product.specifications} />
        </Container>
      )}

      {/* Recommended Related Products */}
      {relatedProducts.length > 0 && (
        <Container className="space-y-8 pt-8 border-t border-[#26262A]">
          <Heading badgeText="RECOMMENDED" dotMatrix size="md">
            YOU MIGHT ALSO LIKE
          </Heading>
          <ProductGrid products={relatedProducts} />
        </Container>
      )}

      {/* Sticky Buy Bar on Scroll */}
      <StickyBuyBar product={product} selectedVariant={selectedVariant} />
    </div>
  );
}
