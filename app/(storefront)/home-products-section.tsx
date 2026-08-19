"use client";

import { ProductCard } from "@/components/features/products/product-card";
import { ListingCardItem } from "@/lib/utils";

interface HomeProductsSectionProps {
  selectedGems: ListingCardItem[];
  phoneModels: ListingCardItem[];
}

export function HomeProductsSection({ selectedGems, phoneModels }: HomeProductsSectionProps) {
  return (
    <>
      {/* ═══════ SELECTED GEMS ═══════ */}
      <section className="border-b border-black/10 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/42"> Best Product Sale </p>
              <h2 className="collection-product-name font-extralight mt-3 text-4xl leading-none text-black sm:text-5xl"> Selected Gems </h2>
            </div>
          </div>

          {/* Mobile: 2-col grid */}
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 lg:hidden">
            {selectedGems.slice(0, 6).map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                showWarranty={false}
                imageAlt={`${item.name} original product price in Pakistan from Nothing CMF Pakistan`}
              />
            ))}
          </div>

          {/* Desktop: 5-col grid */}
          <div className="mt-8 hidden grid-cols-5 gap-x-7 gap-y-14 lg:grid">
            {selectedGems.slice(0, 10).map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                showWarranty={false}
                imageAlt={`${item.name} original product price in Pakistan from Nothing CMF Pakistan`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CHOOSE YOUR MODEL ═══════ */}
      <section className="border-b border-black/10 bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className=" text-left">
            <p className="dot-heading text-[10px] tracking-[0.3em] text-black/42"> Phones </p>
            <h2 className="collection-product-name mt-4 text-4xl leading-none text-black sm:text-5xl lg:text-6xl"> Choose Your Model </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-5">
            {phoneModels.map((item) => (
              <ProductCard key={item.id} item={item} layout="phone" showWarranty={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
