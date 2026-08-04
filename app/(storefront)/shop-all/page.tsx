"use client";

import * as React from "react";
import Link from "next/link";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { Loader } from "@/components/ui/loader";
import { getProductDisplayPrice, getVariantCardsForListing } from "@/lib/utils";

export default function ShopAllPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.fetchProductsFromApi("status=published");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const cardItems = React.useMemo(() => getVariantCardsForListing(products), [products]);

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-[#111] pt-24 pb-16 px-4 md:px-6 lg:px-8">
      <div aria-hidden="true" className="site-dot-overlay" />

      <div className="mx-auto max-w-[1680px]">
        {/* Header Title */}
        <div className="pb-4 md:pb-6">
          <div className="flex items-center justify-center py-2 sm:py-4">
            <div className="max-w-4xl text-center">
              <h1 className="font-ndot57 uppercase text-center text-[2.15rem] leading-[0.95] tracking-[0.2em] text-black sm:text-[2.9rem] lg:text-[3.45rem]">
                All products
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-black/62 md:text-base font-sans">
                Browse the full Nothing Pakistan catalog for chargers, earbuds, protectors, CMF devices, and other compatible accessories.
              </p>
            </div>
          </div>
        </div>

        {/* Loading Spinner or Product Cards Grid */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-2 mt-8 gap-x-4 gap-y-9 md:gap-x-6 md:gap-y-12 lg:grid-cols-5 lg:gap-x-7 lg:gap-y-14">
              {cardItems.map((item) => {
                const isOutOfStock = item.inStock === false;

                const CardContent = (
                  <article className={`flex h-full flex-col ${isOutOfStock ? "opacity-60 cursor-not-allowed select-none" : ""}`}>
                    {/* Image Wrap */}
                    <div className="relative overflow-hidden aspect-[4/5] rounded-xl flex items-center justify-center p-4">
                      {isOutOfStock && (
                        <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="bg-red-600 text-white font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                            OUT OF STOCK
                          </span>
                        </div>
                      )}
                      {item.product.warranty && !isOutOfStock && (
                        <span className="absolute z-20 right-2 top-2 h-10 w-10 sm:right-3 sm:top-3 sm:h-12 sm:w-12 rounded-full bg-[#D71921] border border-white/20 flex flex-col items-center justify-center text-center font-mono leading-[1.15] text-white uppercase shadow-sm select-none">
                          <span className="text-[8px] sm:text-[9px] font-bold tracking-tighter">{item.product.warranty.split(" ")[0]}</span>
                          <span className="text-[5px] sm:text-[6px] text-white/80 font-normal tracking-wider">
                            {item.product.warranty.split(" ")[1] || "WARRANTY"}
                          </span>
                        </span>
                      )}
                      {item.image ? (
                        <img
                          alt={item.name}
                          src={item.image}
                          className={`h-full w-full object-contain transition-transform duration-500 ease-out ${!isOutOfStock ? "group-hover:scale-[1.02]" : "grayscale-[30%]"}`}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-black/10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info Wrap */}
                    <div className="mt-3 text-center">
                      <h3 className="font-ntype82 text-sm sm:text-base leading-[1.12] text-black font-normal tracking-normal">{item.name}</h3>
                      <div className="mt-1 flex flex-col items-center">
                        {isOutOfStock ? (
                          <p className="text-xs text-red-600 font-mono font-bold mt-0.5 uppercase tracking-wider">OUT OF STOCK</p>
                        ) : item.isComingSoon ? (
                          <p className="text-xs text-[#D71921] font-mono font-bold mt-0.5 uppercase tracking-wider">COMING SOON</p>
                        ) : item.salePrice && item.salePrice > 0 && item.salePrice < item.price ? (
                          <>
                            <p className="text-[11px] text-black font-bold font-ntype82">Rs {item.salePrice.toLocaleString()}</p>
                            <p className="mt-0.5 text-[10px] text-black/50 line-through font-ntype82 font-normal">
                              Rs {item.price.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <p className="text-[11px] text-black/62 font-ntype82 font-normal">Rs {item.price.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </article>
                );

                if (isOutOfStock) {
                  return (
                    <div key={item.id} className="group block cursor-not-allowed">
                      {CardContent}
                    </div>
                  );
                }

                return (
                  <Link key={item.id} href={item.href} className="group block">
                    {CardContent}
                  </Link>
                );
              })}
            </div>

            {products.length === 0 && (
              <div className="py-20 text-center space-y-3">
                <p className="dot-heading text-lg text-black/40">NO PRODUCTS FOUND</p>
                <p className="text-xs text-black/60">Try searching for a different product name or category filter.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
