"use client";

import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { getValidImageUrl } from "@/lib/utils";
import { ProductBuyCard } from "@/components/features/products/product-buy-card";

interface HeroSpecShowcaseProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  onAddToCart: () => void;
  onOpenSpecs?: () => void;
}

const isVideoMedia = (url?: string) => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".ogg") ||
    lower.endsWith(".mov") ||
    lower.includes("video") ||
    lower.startsWith("data:video/")
  );
};

const renderMediaContainer = (url: string | undefined, title: string, containerClassName: string) => {
  if (!url) return null;

  if (isVideoMedia(url)) {
    return (
      <div className={`relative overflow-hidden rounded-lg transition-transform group-hover:scale-105 ${containerClassName}`}>
        <video src={getValidImageUrl(url)} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg transition-transform group-hover:scale-105 ${containerClassName}`}>
      <Image src={getValidImageUrl(url)} alt={title || "Showcase Media"} fill unoptimized className="object-cover" />
    </div>
  );
};

export function HeroSpecShowcase({ product, selectedVariant, onSelectVariant, onAddToCart, onOpenSpecs }: HeroSpecShowcaseProps) {
  const item0Left = product.heroLeftSections?.[0];
  const item2Left = product.heroLeftSections?.[1] || product.heroLeftSections?.[2];
  const item0Right = product.heroRightSections?.[0];
  const item1Right = product.heroRightSections?.[1];
  const item2Right = product.heroRightSections?.[2];

  const heroMainImage = getValidImageUrl(selectedVariant?.image || (product as any).heroImage || product.images?.[0] || "");

  return (
    <div className="relative z-30 w-full bg-transparent text-neutral-900 px-3 sm:px-8 select-none flex flex-col justify-between">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 my-auto">
        {/* Left Column */}
        <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-6 sm:gap-8 items-center lg:items-start mt-4 sm:mt-8 lg:mt-24">
          {(item0Left?.image || item0Left?.title) && (
            <div className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
              {renderMediaContainer(item0Left.image, item0Left.title || "Showcase Media", "w-44 h-28 sm:w-52 sm:h-32 lg:w-52 lg:h-32")}
              {item0Left.title && (
                <span className="font-ntype text-sm sm:text-base text-neutral-800 tracking-wide text-center lg:text-left">{item0Left.title}</span>
              )}
            </div>
          )}

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
            <div onClick={onOpenSpecs} className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
              <img src="/specs.svg" alt="" className="h-12 w-12 sm:h-16 sm:w-16" />
              <span className="font-ntype text-sm sm:text-base text-neutral-800 tracking-wide">Specs</span>
            </div>

            {(item2Left?.image || item2Left?.title) && (
              <div className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
                {renderMediaContainer(item2Left.image, item2Left.title || "Showcase Media", "w-44 h-32 sm:w-64 sm:h-48 lg:w-64 lg:h-48")}
                {item2Left.title && (
                  <span className="font-ntype text-sm sm:text-base text-neutral-800 tracking-wide text-center lg:text-left">{item2Left.title}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center Column (Main Hero Product Image) */}
        <div className="lg:col-span-6 order-1 lg:order-2 lg:pt-0 pt-12 flex flex-col items-center justify-center relative pb-6">
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[420px] h-[320px] sm:h-[460px] lg:h-[460px] flex items-center justify-center transition-all duration-300">
            {heroMainImage ? (
              <Image
                src={heroMainImage}
                alt={product.name}
                fill
                priority
                unoptimized
                className="object-contain hover:scale-102 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-neutral-400 uppercase">NO MAIN HERO IMAGE</div>
            )}
          </div>

          <ProductBuyCard
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={onSelectVariant}
            onAddToCart={onAddToCart}
            className="mt-[-40px]"
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 order-3 lg:order-3 flex flex-col gap-6 w-full items-center lg:items-end mt-4 sm:mt-8 lg:mt-24">
          <div className="grid grid-cols-2 gap-4 items-start w-full">
            {item0Right?.image || item0Right?.title ? (
              <div className="group flex flex-col items-center gap-2 cursor-pointer justify-self-center sm:justify-self-start">
                {renderMediaContainer(item0Right.image, item0Right.title || "Showcase Media", "w-24 h-24 sm:w-32 sm:h-32 lg:w-32 lg:h-32")}
                {item0Right.title && (
                  <span className="font-ntype text-xs sm:text-sm text-neutral-800 tracking-wide text-center">{item0Right.title}</span>
                )}
              </div>
            ) : (
              <div />
            )}

            {item1Right?.image || item1Right?.title ? (
              <div className="group flex flex-col items-center gap-2 cursor-pointer justify-self-center sm:justify-self-end mt-8 lg:mt-16">
                {renderMediaContainer(item1Right.image, item1Right.title || "Showcase Media", "w-24 h-24 sm:w-32 sm:h-32 lg:w-32 lg:h-32")}
                {item1Right.title && (
                  <span className="font-ntype text-xs sm:text-sm text-neutral-800 tracking-wide text-center">{item1Right.title}</span>
                )}
              </div>
            ) : (
              <div />
            )}
          </div>

          {(item2Right?.image || item2Right?.title) && (
            <div className="group flex flex-col items-center lg:items-end gap-2 cursor-pointer w-full mt-2 justify-self-center lg:justify-self-end">
              {renderMediaContainer(
                item2Right.image,
                item2Right.title || "Showcase Media",
                "w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[260px] h-44 sm:h-60 lg:h-60",
              )}
              {item2Right.title && (
                <span className="font-ntype text-sm sm:text-base text-neutral-800 tracking-wide text-center">{item2Right.title}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
