"use client";

import * as React from "react";
import { useProductStore } from "@/store/useProductStore";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { ProductCard } from "@/components/features/products/product-card";
import { Container } from "@/components/ui/container";
import { ChevronUp } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { getVariantCardsForListing } from "@/lib/utils";

export default function ProductsCatalogClient() {
  const { products: storeProducts, isLoading: storeLoading, isFetched } = useProductStore();

  // Local state for fallback (if store hasn't fetched yet on direct page load)
  const [fallbackProducts, setFallbackProducts] = React.useState<Product[]>([]);
  const [fallbackLoading, setFallbackLoading] = React.useState(false);

  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery] = React.useState("");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  // Fallback: if layout hasn't fetched yet (e.g. direct navigation), fetch ourselves
  React.useEffect(() => {
    if (!isFetched && !storeLoading) {
      setFallbackLoading(true);
      ProductService.fetchProductsFromApi("status=published")
        .then((data) => setFallbackProducts(data))
        .finally(() => setFallbackLoading(false));
    }
  }, [isFetched, storeLoading]);

  const products = isFetched ? storeProducts : fallbackProducts;
  const isLoading = storeLoading || fallbackLoading;

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F4F4F4] min-h-screen text-black py-12 bg-dot-plus-grid relative pb-32">
      <Container className="space-y-12">
        <div className="text-center pt-8 space-y-4">
          <h1 className="font-ndot text-4xl sm:text-6xl uppercase tracking-[0.2em] text-black">ALL PRODUCTS</h1>
        </div>
        {isFilterOpen && (
          <div className="max-w-xl mx-auto floating-pill rounded-2xl p-4 flex flex-wrap items-center justify-center gap-2 animate-in fade-in duration-200">
            {["all", "phones", "audio", "apparel", "accessories"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-lattera text-xs uppercase tracking-wider transition-all ${
                  selectedCategory === cat ? "bg-black text-white" : "bg-neutral-100 text-black hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="py-24 text-center font-lattera text-xs text-neutral-500 animate-pulse">LOADING CATALOG...</div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {getVariantCardsForListing(filteredProducts).map((item) => (
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
        )}
      </Container>

      <div className="fixed bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="pointer-events-auto floating-pill h-11 px-8 rounded-full flex items-center space-x-2 font-lattera text-xs font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all shadow-xl"
        >
          <span>REFINE</span>
          <ChevronUp className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}
