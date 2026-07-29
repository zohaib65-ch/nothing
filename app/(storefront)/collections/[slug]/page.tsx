"use client";

import * as React from "react";
import Link from "next/link";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import { Loader } from "@/components/ui/loader";

export default function CollectionSlugPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "phones";
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({ status: "published" });
        if (slug !== "shop-all") params.set("category", slug);
        const data = await ProductService.fetchProductsFromApi(params.toString());
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [slug]);

  const titleMap: Record<string, string> = {
    phones: "Nothing & CMF Phones",
    chargers: "Power & Fast Chargers",
    audio: "Audio & Wireless Earbuds",
    protectors: "Screen & Glass Protectors",
    "shop-all": "Shop All Catalog",
  };

  const currentTitle = titleMap[slug] || `Collection: ${slug.toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-[#111] pt-24 pb-16 px-4 md:px-6 lg:px-8">
      <div aria-hidden="true" className="site-dot-overlay" />

      <div className="mx-auto max-w-[1680px]">
        <div className="pb-4 md:pb-6">
          <div className="flex items-center justify-center py-2 sm:py-4">
            <div className="max-w-4xl text-center">
              <h1 className="font-ndot57 uppercase text-center text-[2.15rem] leading-[0.95] tracking-[0.2em] text-black sm:text-[2.9rem] lg:text-[3.45rem]">
                {currentTitle}
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-black/62 md:text-base font-sans">
                Showing {products.length} items available for nationwide delivery across Pakistan.
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
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                  <article className="flex h-full flex-col">
                    {/* Image Wrap */}
                    <div className="relative overflow-hidden aspect-[4/5] rounded-xl flex items-center justify-center p-4">
                      {product.warranty && (
                        <span className="absolute z-20 right-2 top-2 h-10 w-10 sm:right-3 sm:top-3 sm:h-12 sm:w-12 rounded-full bg-[#D71921] border border-white/20 flex flex-col items-center justify-center text-center font-mono leading-[1.15] text-white uppercase shadow-sm select-none">
                          <span className="text-[8px] sm:text-[9px] font-bold tracking-tighter">{product.warranty.split(" ")[0]}</span>
                          <span className="text-[5px] sm:text-[6px] text-white/80 font-normal tracking-wider">
                            {product.warranty.split(" ")[1] || "WARRANTY"}
                          </span>
                        </span>
                      )}
                      <img
                        alt={product.name}
                        src={product.images[0]}
                        className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Info Wrap */}
                    <div className="mt-3 text-center">
                      <h3 className="font-sans text-[0.98rem] sm:text-[1.04rem] leading-[1.12] text-black font-normal tracking-normal">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex flex-col items-center">
                        <p className="text-[11px] text-black/62 font-[system-ui] font-normal">Rs {product.price.toLocaleString()}</p>
                        {product.originalPrice && (
                          <p className="mt-0.5 text-[10px] text-black/65 line-through decoration-black/65 font-[system-ui] font-normal">
                            {product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {products.length === 0 && (
              <div className="py-20 text-center space-y-3">
                <p className="dot-heading text-lg text-black/40">NO PRODUCTS IN THIS COLLECTION</p>
                <Link href="/collections/shop-all" className="inline-block rounded-lg bg-black px-4 py-2 text-xs font-bold text-white uppercase">
                  Browse Shop All
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
