"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
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
      <div
        className={`relative overflow-hidden rounded-xl shadow-md border border-neutral-300/80 bg-neutral-900 transition-transform group-hover:scale-105 ${containerClassName}`}
      >
        <video src={getValidImageUrl(url)} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md border border-neutral-300/80 bg-white transition-transform group-hover:scale-105 ${containerClassName}`}
    >
      <Image src={getValidImageUrl(url)} alt={title || "Showcase Media"} fill className="object-cover" />
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

  const heroMainImage = getValidImageUrl((product as any).heroImage || selectedVariant?.image || product.images?.[0] || "");

  return (
    <div className="relative w-full bg-white text-neutral-900 py-8 px-4 sm:px-8 select-none flex flex-col justify-between overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 my-auto">
        <div className="lg:col-span-3 flex flex-col gap-8 items-center lg:items-start">
          {(item0Left?.image || item0Left?.title) && (
            <div className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
              {renderMediaContainer(item0Left.image, item0Left.title || "Showcase Media", "w-44 h-28")}
              {item0Left.title && <span className="font-serif italic text-xs text-neutral-800 tracking-wide">{item0Left.title}</span>}
            </div>
          )}

          <div onClick={onOpenSpecs} className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
            <div className="w-16 h-16 rounded-xl bg-white/90 backdrop-blur border border-neutral-300 shadow-sm flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-neutral-900">
              <FileText className="h-6 w-6 text-neutral-900" />
            </div>
            <span className="font-serif italic text-xs text-neutral-800 tracking-wide">{item1Left?.title || "Specs"}</span>
          </div>

          {(item2Left?.image || item2Left?.title) && (
            <div className="group flex flex-col items-center lg:items-start gap-2 cursor-pointer">
              {renderMediaContainer(item2Left.image, item2Left.title || "Showcase Media", "w-48 h-32")}
              {item2Left.title && <span className="font-serif italic text-xs text-neutral-800 tracking-wide">{item2Left.title}</span>}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-6">
          <div className="relative w-full max-w-[420px] h-[380px] sm:h-[460px] flex items-center justify-center transition-all duration-300">
            {heroMainImage ? (
              <Image
                src={heroMainImage}
                alt={product.name}
                fill
                priority
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

        <div className="lg:col-span-3 flex flex-col gap-8 items-center lg:items-end">
          {(item0Right?.image || item0Right?.title) && (
            <div className="group flex flex-col items-center lg:items-end gap-2 cursor-pointer">
              {renderMediaContainer(item0Right.image, item0Right.title || "Showcase Media", "w-28 h-28")}
              {item0Right.title && <span className="font-serif italic text-xs text-neutral-800 tracking-wide">{item0Right.title}</span>}
            </div>
          )}

          {(item1Right?.image || item1Right?.title) && (
            <div className="group flex flex-col items-center lg:items-end gap-2 cursor-pointer">
              {renderMediaContainer(item1Right.image, item1Right.title || "Showcase Media", "w-24 h-28")}
              {item1Right.title && <span className="font-serif italic text-xs text-neutral-800 tracking-wide">{item1Right.title}</span>}
            </div>
          )}

          {(item2Right?.image || item2Right?.title) && (
            <div className="group flex flex-col items-center lg:items-end gap-2 cursor-pointer">
              {renderMediaContainer(item2Right.image, item2Right.title || "Showcase Media", "w-48 h-32")}
              {item2Right.title && <span className="font-serif italic text-xs text-neutral-800 tracking-wide">{item2Right.title}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
