"use client";

import * as React from "react";
import Link from "next/link";
import { useProductStore } from "@/store/useProductStore";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { Loader } from "@/components/ui/loader";
import { ProductCard } from "@/components/features/products/product-card";
import { getVariantCardsForListing } from "@/lib/utils";
import { toast } from "sonner";

export default function ShopAllClient() {
  const { products: storeProducts, isLoading: storeLoading, isFetched } = useProductStore();

  const [fallbackProducts, setFallbackProducts] = React.useState<Product[]>([]);
  const [fallbackLoading, setFallbackLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isFetched && !storeLoading) {
      setFallbackLoading(true);
      ProductService.fetchProductsFromApi("status=published")
        .then((data) => setFallbackProducts(data))
        .catch(() => toast.error("Failed to load catalog products."))
        .finally(() => setFallbackLoading(false));
    }
  }, [isFetched, storeLoading]);

  const products = isFetched ? storeProducts : fallbackProducts;
  const isLoading = storeLoading || fallbackLoading;

  const cardItems = React.useMemo(() => getVariantCardsForListing(products), [products]);

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-[#111] pt-24 pb-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1680px]">
        <div className="pb-4 md:pb-6">
          <div className="flex items-center justify-center py-2 sm:py-4">
            <div className="max-w-4xl text-center">
              <h1 className="font-ndot57 uppercase text-center text-[2.15rem] leading-[0.95] tracking-[0.2em] text-black sm:text-[2.9rem] lg:text-[3.45rem]">
                All products
              </h1>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-2 mt-8 gap-x-4 gap-y-9 md:gap-x-6 md:gap-y-12 lg:grid-cols-5 lg:gap-x-7 lg:gap-y-14">
              {cardItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="py-20 text-center space-y-3">
                <p className="dot-heading text-lg text-black/40">NO PRODUCTS AVAILABLE</p>
                <Link
                  href="/"
                  className="inline-block rounded-lg bg-black px-4 py-2 text-xs font-bold text-white uppercase"
                >
                  Back to Home
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
