"use client";

import * as React from "react";
import { Product, ProductVariant } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useCartStore } from "@/store/useCartStore";
import { MessageSquare, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StickyBuyBarProps {
  product: Product;
  selectedVariant: ProductVariant;
}

export function StickyBuyBar({ product, selectedVariant }: StickyBuyBarProps) {
  const { settings } = useSettingsStore();
  const { addItem } = useCartStore();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const currentPrice = selectedVariant.salePrice || selectedVariant.price;
  const whatsappUrl = generateWhatsAppLink(
    settings.whatsappNumber,
    product,
    selectedVariant,
    1
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F10]/95 backdrop-blur-md border-t border-[#D71921]/40 shadow-2xl py-3 px-4 transition-all duration-300 animate-in slide-in-from-bottom-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Product & Variant Details */}
        <div className="flex items-center space-x-4">
          <div className="h-3 w-3 rounded-full bg-[#D71921] animate-ping hidden sm:block" />
          <div>
            <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {product.name}
            </h4>
            <div className="flex items-center space-x-2 font-mono text-[10px] text-neutral-400 uppercase">
              <span>{selectedVariant.color}</span>
              {selectedVariant.storage && <span>• {selectedVariant.storage}</span>}
            </div>
          </div>
        </div>

        {/* Right Price & Order CTAs */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="font-mono text-sm sm:text-base font-black text-white">
            {formatPrice(currentPrice)}
          </div>

          <button
            onClick={() => addItem(product, selectedVariant, 1)}
            className="p-2.5 bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] border border-[#3A3A40] transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#D71921] hover:bg-[#B51219] text-white font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 shadow-[0_0_15px_rgba(215,25,33,0.4)] transition-all"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">ORDER ON WHATSAPP</span>
            <span className="sm:hidden">ORDER</span>
          </a>
        </div>
      </div>
    </div>
  );
}
