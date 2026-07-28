"use client";

import Image from "next/image";
import { Product } from "@/types";
import { getValidImageUrl } from "@/lib/utils";

interface ProductShowcaseImagesProps {
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

export function ProductShowcaseImages({ product }: ProductShowcaseImagesProps) {
  const sections = [product.threeColumnSections?.[0], product.fourColumnSections?.[0], product.fiveColumnSections?.[0]].filter((sec) =>
    Boolean(sec?.image || sec?.title),
  );

  if (sections.length === 0) return null;

  return (
    <div className="w-full space-y-16 py-12 bg-white text-neutral-900 select-none">
      {sections.map((item, idx) => {
        if (!item?.image) return null;
        const imageUrl = getValidImageUrl(item.image);
        const isVid = isVideoMedia(item.image);

        return (
          <section key={idx} className="w-full max-w-7xl mx-auto px-4 sm:px-8">
            <div className="relative w-full h-[400px] sm:h-[600px] md:h-[700px] overflow-hidden shadow-2xl border border-neutral-200/90 bg-neutral-900 group">
              {isVid ? (
                <video src={imageUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <Image
                  src={imageUrl}
                  alt={item.title || `Showcase Detail Section ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  unoptimized
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              )}

              {item.title && (
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 bg-white/90 backdrop-blur-md border border-neutral-200/80 p-4 sm:p-6 rounded-2xl max-w-lg shadow-xl">
                  <h3 className="font-serif italic text-base sm:text-xl text-neutral-900 tracking-wide">{item.title}</h3>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
