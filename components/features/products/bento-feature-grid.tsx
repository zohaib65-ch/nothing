"use client";

import * as React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { getValidImageUrl } from "@/lib/utils";

interface BentoFeatureGridProps {
  product: Product;
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

export function BentoFeatureGrid({ product }: BentoFeatureGridProps) {
  const items = product.bentoSections || [];

  // Check if any item has populated data
  const hasContent = items.some((item) => Boolean(item?.title || item?.image));
  if (!hasContent) return null;

  const renderCard = (
    idx: number,
    aspectClasses: string,
    imageAspect: string = "object-cover"
  ) => {
    const item = items[idx];
    if (!item || (!item.title && !item.image)) return <div className="hidden lg:block" />;

    return (
      <div className="group flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
        <div
          className={`relative w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-neutral-300/70 bg-white transition-all ${aspectClasses}`}
        >
          {item.image ? (
            isVideoMedia(item.image) ? (
              <video
                src={getValidImageUrl(item.image)}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={getValidImageUrl(item.image)}
                alt={item.title || `Feature ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`${imageAspect} p-1`}
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-neutral-400">
              NO IMAGE
            </div>
          )}
        </div>
        {item.title && (
          <span className="font-serif italic text-xs sm:text-sm text-neutral-800 tracking-wide text-center">
            {item.title}
          </span>
        )}
      </div>
    );
  };

  return (
    <section className="relative w-full bg-white text-neutral-900 py-16 sm:py-24 px-4 sm:px-8 border-t border-neutral-200 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* 7-Card Dynamic Bento Layout matching Nothing design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-center justify-center">
          
          {/* Top Row / Column Left: Card 0 */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-full max-w-[200px]">
              {renderCard(0, "h-44 sm:h-48", "object-cover rounded-xl")}
            </div>
          </div>

          {/* Top Row / Column Middle-Left: Card 1 */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-full max-w-[200px]">
              {renderCard(1, "h-44 sm:h-48", "object-cover rounded-xl")}
            </div>
          </div>

          {/* Top Row / Column Right (Large Card): Card 2 */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[340px]">
              {renderCard(2, "h-56 sm:h-64", "object-cover")}
            </div>
          </div>

          {/* Bottom Row / Center Main Card (Large Phone display): Card 4 */}
          <div className="lg:col-span-4 lg:col-start-4 flex justify-center lg:-mt-8 z-20">
            <div className="w-full max-w-[280px]">
              {renderCard(4, "h-72 sm:h-80", "object-contain p-2")}
            </div>
          </div>

          {/* Bottom Row Left: Card 3 */}
          <div className="lg:col-span-3 lg:col-start-1 flex justify-center">
            <div className="w-full max-w-[200px]">
              {renderCard(3, "h-44 sm:h-48", "object-cover rounded-xl")}
            </div>
          </div>

          {/* Bottom Row Middle: Card 5 */}
          <div className="lg:col-span-3 lg:col-start-7 flex justify-center">
            <div className="w-full max-w-[200px]">
              {renderCard(5, "h-44 sm:h-48", "object-cover rounded-xl")}
            </div>
          </div>

          {/* Bottom Row Right: Card 6 */}
          <div className="lg:col-span-3 lg:col-start-10 flex justify-center">
            <div className="w-full max-w-[200px]">
              {renderCard(6, "h-44 sm:h-48", "object-cover rounded-xl")}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
