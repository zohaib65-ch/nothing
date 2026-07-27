"use client";

import * as React from "react";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { ProductCard } from "@/components/features/products/product-card";
import { Container } from "@/components/ui/container";
import { ChevronUp } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function ProductsCatalogPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  React.useEffect(() => {
    const loadProducts = async () => {
      const data = await ProductService.fetchProductsFromApi();
      setProducts(data);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F4F4F4] min-h-screen text-black py-12 bg-dot-plus-grid relative pb-32">
      <Container className="space-y-12">
        {/* Main Headline - Matches Reference Screenshot */}
        <div className="text-center pt-8 space-y-4">
          <h1 className="font-ndot text-4xl sm:text-6xl uppercase tracking-[0.2em] text-black">ALL PRODUCTS</h1>
        </div>

        {/* Filter Bar Modal / Quick Category Pills */}
        {isFilterOpen && (
          <div className="max-w-xl mx-auto floating-pill rounded-2xl p-4 flex flex-wrap items-center justify-center gap-2 animate-in fade-in duration-200">
            {["all", "phones", "audio", "cmf", "accessories"].map((cat) => (
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

        {/* Product Grid - Matches Reference Screenshot (4-5 columns) */}
        {isLoading ? (
          <div className="py-24 text-center font-lattera text-xs text-neutral-500 animate-pulse">LOADING CATALOG...</div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>

      {/* Floating Refine Pill Capsule at Bottom - Matches Reference Screenshot */}
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
