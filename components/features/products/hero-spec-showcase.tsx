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
  const item1Left = product.heroLeftSections?.[1];
  const item2Left = product.heroLeftSections?.[2];
  const item0Right = product.heroRightSections?.[0];
  const item1Right = product.heroRightSections?.[1];
  const item2Right = product.heroRightSections?.[2];

  const heroMainImage = getValidImageUrl(selectedVariant?.image || (product as any).heroImage || product.images?.[0] || "");

  return (
    <div className="relative z-30 w-full bg-transparent text-neutral-900 px-4 sm:px-8 select-none flex flex-col justify-between">
      <div className=" w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 my-auto">
        <div className="lg:col-span-3 flex flex-col gap-8 items-center lg:items-start mt-8 lg:mt-24">
          {(item0Left?.image || item0Left?.title) && (
            <div className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
              {renderMediaContainer(item0Left.image, item0Left.title || "Showcase Media", "w-52 h-32")}
              {item0Left.title && <span className="font-ntype text-base text-neutral-800 tracking-wide">{item0Left.title}</span>}
            </div>
          )}

          <div className="flex gap-6">
            <div onClick={onOpenSpecs} className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
              <img src="/specs.svg" alt="" className="h-16 w-16" />
              <span className="font-ntype text-base text-neutral-800 tracking-wide">{item1Left?.title || "Specs"}</span>
            </div>

            {(item2Left?.image || item2Left?.title) && (
              <div className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
                {renderMediaContainer(item2Left.image, item2Left.title || "Showcase Media", "w-64 h-48")}
                {item2Left.title && <span className="font-ntype text-base text-neutral-800 tracking-wide">{item2Left.title}</span>}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col items-center justify-center relative pb-6">
          <div className="relative w-full max-w-[420px] h-[380px] sm:h-[460px] flex items-center justify-center transition-all duration-300">
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

        <div className="lg:col-span-3 flex flex-col gap-6 w-full items-center lg:items-end mt-8 lg:mt-24">
          {/* Top Row: item0 on top-left, item1 on top-right (offset down) */}
          <div className="grid grid-cols-2 gap-4 items-start w-full">
            {item0Right?.image || item0Right?.title ? (
              <div className="group flex flex-col items-center gap-2 cursor-pointer justify-self-start">
                {renderMediaContainer(item0Right.image, item0Right.title || "Showcase Media", "w-28 h-28 sm:w-32 sm:h-32")}
                {item0Right.title && <span className="font-ntype text-sm text-neutral-800 tracking-wide text-center">{item0Right.title}</span>}
              </div>
            ) : (
              <div />
            )}

            {item1Right?.image || item1Right?.title ? (
              <div className="group flex flex-col items-center gap-2 cursor-pointer justify-self-end mt-16">
                {renderMediaContainer(item1Right.image, item1Right.title || "Showcase Media", "w-28 h-28 sm:w-32 sm:h-32")}
                {item1Right.title && <span className="font-ntype text-sm text-neutral-800 tracking-wide text-center">{item1Right.title}</span>}
              </div>
            ) : (
              <div />
            )}
          </div>

          {/* Bottom Row: item2 large display at bottom */}
          {(item2Right?.image || item2Right?.title) && (
            <div className="group flex flex-col items-end gap-2 cursor-pointer w-full mt-2 justify-self-center lg:justify-self-end">
              {renderMediaContainer(item2Right.image, item2Right.title || "Showcase Media", "w-full max-w-[260px] h-52 sm:h-60")}
              {item2Right.title && <span className="font-ntype text-base text-neutral-800 tracking-wide text-center">{item2Right.title}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
