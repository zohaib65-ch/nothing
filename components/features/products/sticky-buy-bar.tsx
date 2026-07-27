"use client";

import * as React from "react";
import { Product, ProductVariant } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export interface StickyBuyBarProps {
  product: Product;
  selectedVariant: ProductVariant;
}

export function StickyBuyBar({ product, selectedVariant }: StickyBuyBarProps) {
  const { addItem } = useCartStore();
  const [isVisible, setIsVisible] = React.useState(false);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.boundingClientRect.top < 0);
      },
      {
        threshold: 0,
      },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, []);

  const currentPrice = selectedVariant.salePrice || selectedVariant.price;

  return (
    <>
      <div ref={sentinelRef} className="absolute top-[400px] left-0 h-px w-px pointer-events-none" />
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F10]/95 backdrop-blur-md border-t border-[#D71921]/40 shadow-2xl py-3 px-4 transition-all duration-300 animate-in slide-in-from-bottom-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left Product & Variant Details */}
            <div className="flex items-center space-x-4">
              <div className="h-3 w-3 rounded-full bg-[#D71921] animate-ping hidden sm:block" />
              <div>
                <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">{product.name}</h4>
                <div className="flex items-center space-x-2 font-mono text-[10px] text-neutral-400 uppercase">
                  <span>{selectedVariant.color}</span>
                  {selectedVariant.storage && <span>• {selectedVariant.storage}</span>}
                </div>
              </div>
            </div>

            {/* Right Price & Order CTAs */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="font-mono text-sm sm:text-base font-black text-white">{formatPrice(currentPrice)}</div>

              <button onClick={() => addItem(product, selectedVariant, 1)} className="p-2.5 bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] border border-[#3A3A40] transition-colors" title="Add to Cart">
                <ShoppingBag className="h-4 w-4" />
              </button>

              <Link
                href={`/order/${product.slug}?variant=${selectedVariant.id}`}
                className="inline-flex items-center space-x-2 bg-[#D71921] hover:bg-[#B51219] text-white font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 shadow-[0_0_15px_rgba(215,25,33,0.4)] transition-all"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">BUY NOW</span>
                <span className="sm:hidden">BUY</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
