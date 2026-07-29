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

  const getVariantCapacityStr = (v: any) => {
    if (!v) return "";
    if (v.ram && v.storage) return `${v.ram} + ${v.storage}`;
    return v.capacity || v.storage || (v.name !== "Default Title" ? v.name : "");
  };

  const getUniqueCaseInsensitive = (arr: string[]) => {
    const map = new Map<string, string>();
    for (const item of arr) {
      if (!item || item === "Default Title") continue;
      const subItems = item.includes(",") ? item.split(",") : [item];
      for (const subItem of subItems) {
        const trimmed = subItem.trim();
        if (!trimmed) continue;
        const lower = trimmed.toLowerCase();
        if (!map.has(lower)) {
          map.set(lower, trimmed);
        }
      }
    }
    return Array.from(map.values());
  };

  const rawColors = (product.colors?.map((c) => c.name) || []).concat(product.variants?.map((v) => v.color).filter(Boolean) || []);
  const colors = getUniqueCaseInsensitive(rawColors);
  const displayColors = colors.length > 0 ? colors : ["Standard"];
  const rawVariantColor = selectedVariant?.color || "";
  const matchedColorInDisplay = displayColors.find((c) => c.toLowerCase() === rawVariantColor.toLowerCase());
  const currentColor = matchedColorInDisplay || displayColors[0] || "Standard";
  const colorVariants = product.variants?.filter((v) => v.color && v.color.toLowerCase() === currentColor.toLowerCase()) || [];
  const rawCapacitiesForColor = colorVariants.map((v) => getVariantCapacityStr(v)).filter(Boolean);
  const availableCapacitiesForColor = getUniqueCaseInsensitive(rawCapacitiesForColor);
  const allCapacitiesRaw = (product.storageOptions || []).concat(product.variants?.map((v) => getVariantCapacityStr(v)).filter(Boolean) || []);
  const capacities = getUniqueCaseInsensitive(allCapacitiesRaw);
  const displayCapacities = availableCapacitiesForColor.length > 0 ? availableCapacitiesForColor : capacities.length > 0 ? capacities : ["Standard"];
  const rawCapStr = selectedVariant?.capacity || selectedVariant?.storage || getVariantCapacityStr(selectedVariant);
  const matchedCapInDisplay = displayCapacities.find((cap) => cap.toLowerCase() === rawCapStr.toLowerCase());
  const currentCapacity = matchedCapInDisplay || displayCapacities[0] || "Standard";

  const handleColorChange = (newColor: string) => {
    const matchedColorObj = product.colors?.find((c) => c.name.toLowerCase() === newColor.toLowerCase());
    const variantsForColor = product.variants?.filter((v) => v.color && v.color.toLowerCase() === newColor.toLowerCase()) || [];
    const matchedSameStorage = variantsForColor.find((v) => getVariantCapacityStr(v).toLowerCase() === currentCapacity.toLowerCase());
    const matchedInVariants =
      matchedSameStorage || variantsForColor[0] || product.variants?.find((v) => v.color.toLowerCase() === newColor.toLowerCase());

    if (matchedInVariants) {
      onSelectVariant(matchedInVariants);
    } else {
      const fallbackVariant: ProductVariant = {
        id: `var-${Date.now()}`,
        name: `${newColor} - ${currentCapacity}`,
        color: newColor,
        colorHex: matchedColorObj?.hex || "#000000",
        storage: currentCapacity !== "Standard" ? currentCapacity : "",
        capacity: currentCapacity !== "Standard" ? currentCapacity : "",
        price: selectedVariant?.price || product.price || 0,
        salePrice: selectedVariant?.salePrice || product.salePrice,
        sku: selectedVariant?.sku || `SKU-${Date.now()}`,
        inStock: true,
        image: selectedVariant?.image || product.images?.[0] || "",
      };
      onSelectVariant(fallbackVariant);
    }
  };

  const getEffectiveVariantPrices = (v: ProductVariant | undefined, capStr: string) => {
    if (!v) {
      return {
        price: product.price || 0,
        salePrice: product.salePrice,
      };
    }

    if (v.storagePrices && capStr) {
      // Direct exact match or trim match from storagePrices object
      const trimmedCap = capStr.trim();
      const exactKey = Object.keys(v.storagePrices).find((k) => k.trim().toLowerCase() === trimmedCap.toLowerCase());
      if (exactKey && v.storagePrices[exactKey]) {
        const sp = v.storagePrices[exactKey];
        return {
          price: sp.price ?? 0,
          salePrice: sp.salePrice,
        };
      }
    }

    return {
      price: v.price ?? product.price ?? 0,
      salePrice: v.salePrice ?? product.salePrice,
    };
  };

  const handleCapacityChange = (newCap: string) => {
    const matchedInVariants =
      product.variants?.find(
        (v) => getVariantCapacityStr(v).toLowerCase().includes(newCap.toLowerCase()) && v.color.toLowerCase() === currentColor.toLowerCase(),
      ) || product.variants?.find((v) => getVariantCapacityStr(v).toLowerCase().includes(newCap.toLowerCase()));

    if (matchedInVariants) {
      const prices = getEffectiveVariantPrices(matchedInVariants, newCap);
      onSelectVariant({
        ...matchedInVariants,
        capacity: newCap,
        price: prices.price,
        salePrice: prices.salePrice,
      });
    } else if (selectedVariant) {
      const prices = getEffectiveVariantPrices(selectedVariant, newCap);
      onSelectVariant({
        ...selectedVariant,
        capacity: newCap,
        price: prices.price,
        salePrice: prices.salePrice,
      });
    }
  };

  const activePrices = getEffectiveVariantPrices(selectedVariant, currentCapacity);
  const activeDisplayPrice =
    activePrices.salePrice !== undefined && activePrices.salePrice !== null && !isNaN(activePrices.salePrice) && Number(activePrices.salePrice) > 0
      ? Number(activePrices.salePrice)
      : Number(activePrices.price) || Number(product.price) || 0;

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
            <h2 className="dot-heading text-base sm:text-lg tracking-wider text-neutral-900 dark:text-white lowercase">{product.name}</h2>
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
            {displayColors.map((c) => (
              <SelectItem key={c} value={c} className="font-mono text-xs uppercase">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentCapacity} onValueChange={handleCapacityChange}>
          <SelectTrigger className="w-full font-mono text-[11px] font-bold uppercase">
            <SelectValue placeholder="SELECT CAPACITY" />
          </SelectTrigger>
          <SelectContent>
            {displayCapacities.map((cap) => (
              <SelectItem key={cap} value={cap} className="font-mono text-xs uppercase">
                {cap}
              </SelectItem>
            ))}
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
        <span>ADD TO BAG — {formatPrice(activeDisplayPrice)}</span>
      </Button>
    </div>
  );
}
