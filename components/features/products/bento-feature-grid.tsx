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

  const renderCard = (idx: number, cardSizeClasses: string, imageFit: string = "object-cover") => {
    const item = items[idx];
    if (!item || (!item.title && !item.image)) return null;

    return (
      <div className="group flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 hover:scale-[1.03]">
        <div
          className={`relative w-full rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-2xl bg-white transition-all duration-300 ${cardSizeClasses}`}
        >
          {item.image ? (
            isVideoMedia(item.image) ? (
              <video src={getValidImageUrl(item.image)} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <Image
                src={getValidImageUrl(item.image)}
                alt={item.title || `Feature ${idx + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`${imageFit} ${imageFit === "object-contain" ? "p-3" : "p-0.5"}`}
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-neutral-400 uppercase">NO IMAGE</div>
          )}
        </div>
        {item.title && (
          <span className="font-ntype text-sm sm:text-base text-black tracking-wide text-center font-medium select-none">{item.title}</span>
        )}
      </div>
    );
  };

  return (
    <section className="relative z-10 w-full bg-[#F8F8F8] text-neutral-900 py-16 sm:py-24 px-4 sm:px-8 overflow-hidden select-none">
      <style>{`
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-slow {
          animation: floatEffect 5.5s ease-in-out infinite;
        }
      `}</style>

      {/* Scattered Tiny Black Dots Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.10] pointer-events-none -z-10" />

      {/* Large Blurred Center Gradient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-slate-400/20 via-blue-200/30 via-zinc-200/40 to-pink-200/25 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* DESKTOP VIEW: Free-Floating Canvas Layout matching exact screenshot positions */}
        <div className="hidden lg:block relative w-full min-h-[640px]">
          {/* 1. Top Left: Item 0 */}
          <div className="absolute top-2 left-[12%] animate-float-slow" style={{ animationDelay: "0s" }}>
            <div className="w-36">{renderCard(0, "h-36")}</div>
          </div>

          {/* 2. Top Center: Item 1 */}
          <div className="absolute top-2 left-[39%] animate-float-slow" style={{ animationDelay: "0.8s" }}>
            <div className="w-36">{renderCard(1, "h-36")}</div>
          </div>

          {/* 3. Top Right: Item 2 (Large Landscape Card) */}
          <div className="absolute top-0 right-[4%] animate-float-slow" style={{ animationDelay: "1.4s" }}>
            <div className="w-72">{renderCard(2, "h-64 rounded-[24px]")}</div>
          </div>

          {/* 4. Center: Item 4 (Largest Portrait Card) */}
          <div className="absolute top-[210px] left-[26%] z-20 animate-float-slow" style={{ animationDelay: "0.4s" }}>
            <div className="w-60">{renderCard(4, "h-80 rounded-[24px]", "object-contain")}</div>
          </div>

          {/* 5. Bottom Left: Item 3 */}
          <div className="absolute top-[350px] left-[2%] animate-float-slow" style={{ animationDelay: "1.8s" }}>
            <div className="w-36">{renderCard(3, "h-36")}</div>
          </div>

          {/* 6. Bottom Center: Item 5 */}
          <div className="absolute top-[390px] right-[24%] animate-float-slow" style={{ animationDelay: "1.1s" }}>
            <div className="w-36">{renderCard(5, "h-36")}</div>
          </div>

          {/* 7. Bottom Right: Item 6 */}
          <div className="absolute top-[340px] right-[2%] animate-float-slow" style={{ animationDelay: "0.2s" }}>
            <div className="w-36">{renderCard(6, "h-38")}</div>
          </div>
        </div>

        {/* TABLET & MOBILE VIEW: Responsive grid fallback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-center lg:hidden">
          {/* Center Main Card (Item 4) */}
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-[230px]">{renderCard(4, "h-76 rounded-[28px]", "object-contain")}</div>
          </div>

          {/* Top Cards */}
          <div className="flex justify-center">
            <div className="w-[160px]">{renderCard(0, "h-40")}</div>
          </div>
          <div className="flex justify-center">
            <div className="w-[160px]">{renderCard(1, "h-40")}</div>
          </div>

          {/* Item 2 Card */}
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-[280px]">{renderCard(2, "h-56 rounded-[24px]")}</div>
          </div>

          {/* Bottom Cards */}
          <div className="flex justify-center">
            <div className="w-[160px]">{renderCard(3, "h-40")}</div>
          </div>
          <div className="flex justify-center">
            <div className="w-[160px]">{renderCard(5, "h-40")}</div>
          </div>
          <div className="sm:col-span-2 flex justify-center">
            <div className="w-[160px]">{renderCard(6, "h-40")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
