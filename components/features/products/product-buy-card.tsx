"use client";

import * as React from "react";
import Image from "next/image";
import { Sparkles, Camera, Zap, ShoppingBag } from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { formatPrice, getValidImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductBuyCardProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  onAddToCart: () => void;
  className?: string;
}

export function ProductBuyCard({ product, selectedVariant, onSelectVariant, onAddToCart, className = "" }: ProductBuyCardProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const colors = Array.from(new Set(product.variants?.map((v) => v.color).filter(Boolean))) as string[];
  const capacities = Array.from(new Set(product.variants?.map((v) => (v as any).capacity || v.storage || v.name).filter(Boolean))) as string[];

  const currentColor = selectedVariant?.color || colors[0] || "Standard";
  const currentCapacity = (selectedVariant as any)?.capacity || selectedVariant?.storage || selectedVariant?.name || capacities[0] || "Default";

  const handleColorChange = (newColor: string) => {
    const matched =
      product.variants?.find((v) => v.color === newColor && ((v as any).capacity || v.storage || v.name) === currentCapacity) ||
      product.variants?.find((v) => v.color === newColor) ||
      selectedVariant;

    if (matched) onSelectVariant(matched);
  };

  const handleCapacityChange = (newCap: string) => {
    const matched =
      product.variants?.find((v) => ((v as any).capacity || v.storage || v.name) === newCap && v.color === currentColor) ||
      product.variants?.find((v) => ((v as any).capacity || v.storage || v.name) === newCap) ||
      selectedVariant;

    if (matched) onSelectVariant(matched);
  };

  const highlightsList = product.highlights?.length ? product.highlights.map((h) => (typeof h === "string" ? h : `${h.title}: ${h.value}`)) : [];

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md bg-white/95 backdrop-blur-md border border-neutral-300/90 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 transition-all duration-500 ease-in-out dark:bg-[#0F0F10] dark:border-[#26262A] ${className}`}
    >
      <div
        className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
          isScrolled ? "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none" : "grid-rows-[1fr] opacity-100 mb-1"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex justify-between items-start pt-1 pb-1">
            <div className="space-y-3">
              <h2 className="font-ndot text-base sm:text-lg tracking-wider text-neutral-900 dark:text-white lowercase">{product.name}</h2>
              {highlightsList.length > 0 && (
                <ul className="space-y-1 font-mono text-[10px] sm:text-[11px] text-neutral-700 dark:text-neutral-300 font-medium">
                  {highlightsList.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 uppercase">
                      {idx === 0 && <Sparkles className="h-3 w-3 text-neutral-500 flex-shrink-0" />}
                      {idx === 1 && <Camera className="h-3 w-3 text-neutral-500 flex-shrink-0" />}
                      {idx === 2 && <Zap className="h-3 w-3 text-neutral-500 flex-shrink-0" />}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-20 h-24 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-1 border border-neutral-200 dark:border-neutral-800">
              <Image
                src={getValidImageUrl(selectedVariant?.image || product.images?.[0] || "")}
                alt={currentColor}
                fill
                unoptimized
                className="object-contain p-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select value={currentColor} onValueChange={handleColorChange}>
          <SelectTrigger className="w-full font-mono text-[11px] font-bold uppercase">
            <SelectValue placeholder="SELECT COLOR" />
          </SelectTrigger>
          <SelectContent>
            {colors.length > 0 ? (
              colors.map((c) => (
                <SelectItem key={c} value={c} className="font-mono text-xs uppercase">
                  {c}
                </SelectItem>
              ))
            ) : (
              <SelectItem value={currentColor} className="font-mono text-xs uppercase">
                {currentColor}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Select value={currentCapacity} onValueChange={handleCapacityChange}>
          <SelectTrigger className="w-full font-mono text-[11px] font-bold uppercase">
            <SelectValue placeholder="SELECT CAPACITY" />
          </SelectTrigger>
          <SelectContent>
            {capacities.length > 0 ? (
              capacities.map((cap) => (
                <SelectItem key={cap} value={cap} className="font-mono text-xs uppercase">
                  {cap}
                </SelectItem>
              ))
            ) : (
              <SelectItem value={currentCapacity} className="font-mono text-xs uppercase">
                {currentCapacity}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={onAddToCart}
        className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest py-3 rounded-lg shadow-md cursor-pointer flex items-center justify-center gap-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        leftIcon={<ShoppingBag className="h-4 w-4" />}
      >
        <span>ADD TO BAG - {formatPrice(selectedVariant?.salePrice || selectedVariant?.price || product.price)}</span>
      </Button>
    </div>
  );
}
