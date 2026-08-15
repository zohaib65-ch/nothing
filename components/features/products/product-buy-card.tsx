"use client";

import * as React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { formatPrice, getValidImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCartStore } from "@/store/useCartStore";

interface ProductBuyCardProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  onAddToCart: () => void;
  className?: string;
}

const HIGHLIGHT_ICONS = [
  // Icon 1 (e.g., Warranty/Shield)
  (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-grey-darker dark:text-pure-white"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 2C5.55228 2 6 1.55228 6 1C6 0.447715 5.55228 0 5 0C4.44772 0 4 0.447715 4 1C4 1.55228 4.44772 2 5 2ZM8 1C8 1.55228 7.55228 2 7 2C6.44772 2 6 1.55228 6 1C6 0.447715 6.44772 0 7 0C7.55228 0 8 0.447715 8 1ZM8 15C8 15.5523 7.55228 16 7 16C6.44772 16 6 15.5523 6 15C6 14.4477 6.44772 14 7 14C7.55228 14 8 14.4477 8 15ZM10 15C10 15.5523 9.55228 16 9 16C8.44772 16 8 15.5523 8 15C8 14.4477 8.44772 14 9 14C9.55228 14 10 14.4477 10 15ZM10 15C10 14.4477 10.4477 14 11 14C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15ZM6 15C6 15.5523 5.55228 16 5 16C4.44772 16 4 15.5523 4 15C4 14.4477 4.44772 14 5 14C5.55228 14 6 14.4477 6 15ZM9 2C9.55228 2 10 1.55228 10 1C10 0.447715 9.55228 0 9 0C8.44772 0 8 0.447715 8 1C8 1.55228 8.44772 2 9 2ZM8 5C8 5.55228 7.55228 6 7 6C6.44772 6 6 5.55228 6 5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5ZM8 5C8 4.44772 8.44772 4 9 4C9.55228 4 10 4.44772 10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5ZM12 1C12 1.55228 11.5523 2 11 2C10.4477 2 10 1.55228 10 1C10 0.447715 10.4477 0 11 0C11.5523 0 12 0.447715 12 1ZM13 14C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10C13.5523 10 14 9.55229 14 9C14 8.44772 13.5523 8 13 8C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6C13.5523 6 14 5.55228 14 5C14 4.44772 13.5523 4 13 4C13.5523 4 14 3.55228 14 3C14 2.44772 13.5523 2 13 2C12.4477 2 12 2.44772 12 3C12 3.55228 12.4477 4 13 4C12.4477 4 12 4.44772 12 5C12 5.55228 12.4477 6 13 6C12.4477 6 12 6.44772 12 7C12 7.55228 12.4477 8 13 8C12.4477 8 12 8.44771 12 9C12 9.55229 12.4477 10 13 10C12.4477 10 12 10.4477 12 11C12 11.5523 12.4477 12 13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14ZM3 14C3.55228 14 4 13.5523 4 13C4 12.4477 3.55228 12 3 12C2.44772 12 2 12.4477 2 13C2 13.5523 2.44772 14 3 14ZM4 11C4 11.5523 3.55228 12 3 12C2.44772 12 2 11.5523 2 11C2 10.4477 2.44772 10 3 10C3.55228 10 4 10.4477 4 11ZM3 10C3.55228 10 4 9.55229 4 9C4 8.44772 3.55228 8 3 8C2.44772 8 2 8.44771 2 9C2 9.55229 2.44772 10 3 10ZM4 7C4 7.55228 3.55228 8 3 8C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6C3.55228 6 4 6.44772 4 7ZM3 6C3.55228 6 4 5.55228 4 5C4 4.44772 3.55228 4 3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6ZM4 3C4 3.55228 3.55228 4 3 4C2.44772 4 2 3.55228 2 3C2 2.44772 2.44772 2 3 2C3.55228 2 4 2.44772 4 3Z" fill="currentColor"></path></svg>
  ),
  // Icon 2 (e.g., Lightning/Delivery)
  (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-grey-darker dark:text-pure-white"><path d="M13 14C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14Z" fill="currentColor"></path><path d="M11 2C11.5523 2 12 1.55228 12 1C12 0.447715 11.5523 2.41411e-08 11 0C10.4477 -2.41411e-08 10 0.447715 10 1C10 1.55228 10.4477 2 11 2Z" fill="currentColor"></path><path d="M13 4C13.5523 4 14 3.55228 14 3C14 2.44772 13.5523 2 13 2C12.4477 2 12 2.44772 12 3C12 3.55228 12.4477 4 13 4Z" fill="currentColor"></path><path d="M7 4C7.55228 4 8 3.55228 8 3C8 2.44772 7.55228 2 7 2C6.44772 2 6 2.44772 6 3C6 3.55228 6.44772 4 7 4Z" fill="currentColor"></path><path d="M13 6C13.5523 6 14 5.55228 14 5C14 4.44772 13.5523 4 13 4C12.4477 4 12 4.44772 12 5C12 5.55228 12.4477 6 13 6Z" fill="currentColor"></path><path d="M9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6Z" fill="currentColor"></path><path d="M3 6C3.55228 6 4 5.55228 4 5C4 4.44772 3.55228 4 3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6Z" fill="currentColor"></path><path d="M13 8C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6C12.4477 6 12 6.44772 12 7C12 7.55228 12.4477 8 13 8Z" fill="currentColor"></path><path d="M9 8C9.55228 8 10 7.55228 10 7C10 6.44772 9.55228 6 9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8Z" fill="currentColor"></path><path d="M5 8C5.55228 8 6 7.55228 6 7C6 6.44772 5.55228 6 5 6C4.44772 6 4 6.44772 4 7C4 7.55228 4.44772 8 5 8Z" fill="currentColor"></path><path d="M13 10C13.5523 10 14 9.55228 14 9C14 8.44772 13.5523 8 13 8C12.4477 8 12 8.44772 12 9C12 9.55228 12.4477 10 13 10Z" fill="currentColor"></path><path d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z" fill="currentColor"></path><path d="M5 10C5.55228 10 6 9.55228 6 9C6 8.44772 5.55228 8 5 8C4.44772 8 4 8.44772 4 9C4 9.55228 4.44772 10 5 10Z" fill="currentColor"></path><path d="M13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10C12.4477 10 12 10.4477 12 11C12 11.5523 12.4477 12 13 12Z" fill="currentColor"></path><path d="M9 12C9.55228 12 10 11.5523 10 11C10 10.4477 9.55228 10 9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12Z" fill="currentColor"></path><path d="M3 12C3.55228 12 4 11.5523 4 11C4 10.4477 3.55228 10 3 10C2.44772 10 2 10.4477 2 11C2 11.5523 2.44772 12 3 12Z" fill="currentColor"></path><path d="M11 16C11.5523 16 12 15.5523 12 15C12 14.4477 11.5523 14 11 14C10.4477 14 10 14.4477 10 15C10 15.5523 10.4477 16 11 16Z" fill="currentColor"></path><path d="M7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z" fill="currentColor"></path></svg>
  ),
  // Icon 3 (e.g., Package/Gift)
  (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-grey-darker dark:text-pure-white"><path d="M7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7C6.55228 7 7 6.55228 7 6Z" fill="currentColor"></path><path d="M9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8Z" fill="currentColor"></path><path d="M11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10Z" fill="currentColor"></path><path d="M11 2C11.5523 2 12 1.55228 12 1C12 0.447715 11.5523 2.41411e-08 11 0C10.4477 -2.41411e-08 10 0.447715 10 1C10 1.55228 10.4477 2 11 2Z" fill="currentColor"></path><path d="M5 2C4.44772 2 4 1.55228 4 1C4 0.447715 4.44772 2.41411e-08 5 0C5.55228 -2.41411e-08 6 0.447715 6 1C6 1.55228 5.55228 2 5 2Z" fill="currentColor"></path><path d="M13 2C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 2.41411e-08 13 0C12.4477 -2.41411e-08 12 0.447715 12 1C12 1.55228 12.4477 2 13 2Z" fill="currentColor"></path><path d="M3 2C2.44772 2 2 1.55228 2 1C2 0.447715 2.44772 2.41411e-08 3 0C3.55228 -2.41411e-08 4 0.447715 4 1C4 1.55228 3.55228 2 3 2Z" fill="currentColor"></path><path d="M15 4C15.5523 4 16 3.55228 16 3C16 2.44772 15.5523 2 15 2C14.4477 2 14 2.44772 14 3C14 3.55228 14.4477 4 15 4Z" fill="currentColor"></path><path d="M1 4C0.447715 4 2.41411e-08 3.55228 0 3C-2.41411e-08 2.44772 0.447715 2 1 2C1.55228 2 2 2.44772 2 3C2 3.55228 1.55228 4 1 4Z" fill="currentColor"></path><path d="M15 6C15.5523 6 16 5.55228 16 5C16 4.44772 15.5523 4 15 4C14.4477 4 14 4.44772 14 5C14 5.55228 14.4477 6 15 6Z" fill="currentColor"></path><path d="M1 6C0.447715 6 2.41411e-08 5.55228 0 5C-2.41411e-08 4.44772 0.447715 4 1 4C1.55228 4 2 4.44772 2 5C2 5.55228 1.55228 6 1 6Z" fill="currentColor"></path><path d="M15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6C14.4477 6 14 6.44772 14 7C14 7.55228 14.4477 8 15 8Z" fill="currentColor"></path><path d="M1 8C0.447715 8 2.41411e-08 7.55228 0 7C-2.41411e-08 6.44772 0.447715 6 1 6C1.55228 6 2 6.44772 2 7C2 7.55228 1.55228 8 1 8Z" fill="currentColor"></path><path d="M15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9C14 9.55228 14.4477 10 15 10Z" fill="currentColor"></path><path d="M1 10C0.447715 10 2.41411e-08 9.55228 0 9C-2.41411e-08 8.44772 0.447715 8 1 8C1.55228 8 2 8.44772 2 9C2 9.55228 1.55228 10 1 10Z" fill="currentColor"></path><path d="M15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13C14 13.5523 14.4477 14 15 14Z" fill="currentColor"></path><path d="M1 14C0.447715 14 2.41411e-08 13.5523 0 13C-2.41411e-08 12.4477 0.447715 12 1 12C1.55228 12 2 12.4477 2 13C2 13.5523 1.55228 14 1 14Z" fill="currentColor"></path><path d="M15 12C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10C14.4477 10 14 10.4477 14 11C14 11.5523 14.4477 12 15 12Z" fill="currentColor"></path><path d="M1 12C0.447715 12 2.41411e-08 11.5523 0 11C-2.41411e-08 10.4477 0.447715 10 1 10C1.55228 10 2 10.4477 2 11C2 11.5523 1.55228 12 1 12Z" fill="currentColor"></path><path d="M11 16C11.5523 16 12 15.5523 12 15C12 14.4477 11.5523 14 11 14C10.4477 14 10 14.4477 10 15C10 15.5523 10.4477 16 11 16Z" fill="currentColor"></path><path d="M5 16C4.44772 16 4 15.5523 4 15C4 14.4477 4.44772 14 5 14C5.55228 14 6 14.4477 6 15C6 15.5523 5.55228 16 5 16Z" fill="currentColor"></path><path d="M13 16C13.5523 16 14 15.5523 14 15C14 14.4477 13.5523 14 13 14C12.4477 14 12 14.4477 12 15C12 15.5523 12.4477 16 13 16Z" fill="currentColor"></path><path d="M3 16C2.44772 16 2 15.5523 2 15C2 14.4477 2.44772 14 3 14C3.55228 14 4 14.4477 4 15C4 15.5523 3.55228 16 3 16Z" fill="currentColor"></path><path d="M10 7C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6C9 6.55228 9.44772 7 10 7Z" fill="currentColor"></path><path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="currentColor"></path><path d="M6 11C6.55228 11 7 10.5523 7 10C7 9.44772 6.55228 9 6 9C5.44772 9 5 9.44772 5 10C5 10.5523 5.44772 11 6 11Z" fill="currentColor"></path></svg>
  )
];

export function ProductBuyCard({ product, selectedVariant, onSelectVariant, className = "" }: ProductBuyCardProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isNearFooter, setIsNearFooter] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 250);

      const footerEl = document.querySelector("footer");
      if (footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        // Vanishes 200px BEFORE the top of footer enters the viewport
        if (scrollY > 300 && footerTop <= viewportHeight + 200) {
          setIsNearFooter(true);
        } else {
          setIsNearFooter(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  const isCurrentCapacityComingSoon = React.useMemo(() => {
    if (product?.isComingSoon) return true;
    if (!selectedVariant) return false;
    if (selectedVariant.storagePrices && currentCapacity) {
      const trimmedCap = currentCapacity.trim();
      const exactKey = Object.keys(selectedVariant.storagePrices).find((k) => k.trim().toLowerCase() === trimmedCap.toLowerCase());
      if (exactKey && selectedVariant.storagePrices[exactKey]) {
        return !!selectedVariant.storagePrices[exactKey].isComingSoon;
      }
    }
    return !!selectedVariant.isComingSoon;
  }, [product, selectedVariant, currentCapacity]);

  const activePrices = getEffectiveVariantPrices(selectedVariant, currentCapacity);
  const activeDisplayPrice =
    activePrices.salePrice !== undefined && activePrices.salePrice !== null && !isNaN(activePrices.salePrice) && Number(activePrices.salePrice) > 0
      ? Number(activePrices.salePrice)
      : Number(activePrices.price) || Number(product.price) || 0;

  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (isCurrentCapacityComingSoon) return;

    const rawOrigPrice = Number(activePrices.price) || Number(product.price) || 0;
    const hasSale =
      activePrices.salePrice !== undefined &&
      activePrices.salePrice !== null &&
      !isNaN(activePrices.salePrice) &&
      Number(activePrices.salePrice) > 0 &&
      rawOrigPrice > Number(activePrices.salePrice);

    const activeVariantToCart: ProductVariant = {
      ...selectedVariant,
      id: selectedVariant?.id ? `${selectedVariant.id}-${currentColor}-${currentCapacity}` : `var-${Date.now()}`,
      color: currentColor,
      storage: currentCapacity !== "Standard" ? currentCapacity : "",
      capacity: currentCapacity !== "Standard" ? currentCapacity : "",
      price: rawOrigPrice,
      salePrice: hasSale ? Number(activePrices.salePrice) : undefined,
      image: getValidImageUrl(selectedVariant?.image || product.images?.[0] || ""),
    };

    addItem(product, activeVariantToCart, 1);
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-xl !bg-white/70 backdrop-blur-2xl rounded-xl px-5 py-2.5 shadow-2xl space-y-2 transition-all duration-500 ease-in-out ${isNearFooter ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0"
        } ${className}`}
    >
      <div
        className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none" : "grid-rows-[1fr] opacity-100 mb-1"
          }`}
      >
        <div className="overflow-hidden">
          <div className="flex items-center justify-between pt-1 pb-1">
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <h2 className="dot-heading text-base tracking-wider text-neutral-900 lowercase truncate">{product.name}</h2>
              {selectedVariant?.highlights && selectedVariant.highlights.filter(Boolean).length > 0 && (
                <ul className="space-y-0.5 mt-0.5 min-w-0">
                  {selectedVariant.highlights.filter(Boolean).map((hl, i) => (
                    <li key={i} className="flex items-center gap-3 mb-2 text-[10px] sm:text-xs text-black uppercase tracking-wide min-w-0">
                      {HIGHLIGHT_ICONS[i] || null}
                      <span className="truncate pb-0.5" title={hl} style={{ fontFamily: "'LatteraMonoLL', 'letteraRegular', monospace" }}>{hl}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-28 h-28 sm:w-38 sm:h-38 flex-shrink-0">
                <Image
                  src={getValidImageUrl(selectedVariant?.image || product.images?.[0] || "")}
                  alt={currentColor}
                  fill
                  unoptimized
                  className="object-contain p-1"
                />
              </div>
              {/* Price next to image */}
              <div className="text-right">
                {activePrices.salePrice !== undefined &&
                  activePrices.salePrice !== null &&
                  !isNaN(activePrices.salePrice) &&
                  Number(activePrices.salePrice) > 0 &&
                  Number(activePrices.price) > Number(activePrices.salePrice) ? (
                  <div className="flex flex-col items-end">
                    <span className="line-through text-neutral-400 text-xs font-mono">{formatPrice(activePrices.price)}</span>
                    <span className="font-bold text-neutral-900 text-base font-mono">{formatPrice(activePrices.salePrice)}</span>
                  </div>
                ) : (
                  <span className="font-bold text-neutral-900 text-base font-mono">{formatPrice(activeDisplayPrice)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Circles & Capacity Dropdown — same line */}
      <div className="flex items-center gap-3">
        {/* Color Circles */}
        <div className="w-1/2 flex items-center gap-2 flex-wrap">
          {displayColors.map((colorName) => {
            const matchedColorObj = product.colors?.find((c) => c.name.toLowerCase() === colorName.toLowerCase());
            const matchedVariantObj = product.variants?.find((v) => v.color && v.color.toLowerCase() === colorName.toLowerCase());
            const hexColor =
              matchedColorObj?.hex ||
              matchedVariantObj?.colorHex ||
              (colorName.toLowerCase().includes("white")
                ? "#FFFFFF"
                : colorName.toLowerCase().includes("grey") || colorName.toLowerCase().includes("gray")
                  ? "#6B7280"
                  : "#111111");
            const isSelected = currentColor.toLowerCase() === colorName.toLowerCase();

            return (
              <button
                key={colorName}
                type="button"
                onClick={() => handleColorChange(colorName)}
                title={colorName}
                className={`group relative h-7 w-7 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center p-0.5 ${isSelected ? "ring-2 ring-[#D71921] ring-offset-2 ring-offset-white scale-110" : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
              >
                <span className="h-full w-full rounded-full border border-neutral-300 shadow-inner" style={{ backgroundColor: hexColor }} />
              </button>
            );
          })}
        </div>

        {/* Capacity Select */}
        <div className="w-1/2">
          <Select value={currentCapacity} onValueChange={handleCapacityChange}>
            <SelectTrigger
              className="w-full text-[12px] shadow-none !bg-white !text-neutral-900 font-medium uppercase border-neutral-200"
              style={{ fontFamily: "var(--font-ntype82), serif" }}
            >
              <SelectValue placeholder="SELECT CAPACITY" />
            </SelectTrigger>
            <SelectContent>
              {displayCapacities.map((cap) => {
                const exactKey = selectedVariant?.storagePrices
                  ? Object.keys(selectedVariant.storagePrices).find((k) => k.trim().toLowerCase() === cap.trim().toLowerCase())
                  : undefined;
                const isCapComingSoon =
                  exactKey && selectedVariant?.storagePrices
                    ? !!selectedVariant.storagePrices[exactKey]?.isComingSoon
                    : !!selectedVariant?.isComingSoon;
                return (
                  <SelectItem key={cap} value={cap} className="text-xs uppercase flex items-center justify-between">
                    <span>{cap}</span>
                    {isCapComingSoon && <span className="ml-2 text-[10px] text-[#D71921] font-bold font-mono">(COMING SOON)</span>}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ADD TO BAG & WhatsApp — side by side */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={isCurrentCapacityComingSoon ? "outline" : "primary"}
          disabled={isCurrentCapacityComingSoon}
          onClick={handleAddToCart}
          style={{ fontFamily: "'LatteraMonoLL', 'letteraRegular', monospace" }}
          className={`w-1/2 font-lattera-mono text-xs font-medium uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 h-auto border-none ${isCurrentCapacityComingSoon
            ? "bg-[#D71921] text-white cursor-not-allowed border-none opacity-90"
            : "!bg-neutral-950 hover:!bg-neutral-800 !text-white cursor-pointer"
            }`}
          leftIcon={isCurrentCapacityComingSoon ? undefined : <ShoppingBag className="h-4 w-4" />}
        >
          <span style={{ fontFamily: "'LatteraMonoLL', 'letteraRegular', monospace" }} className="flex items-center gap-1">
            {isCurrentCapacityComingSoon ? <span className="font-bold text-white tracking-widest">COMING SOON</span> : <span>ADD TO BAG</span>}
          </span>
        </Button>

        <a
          href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
            isCurrentCapacityComingSoon
              ? `Hi, when will ${product.name} (${currentColor}, ${currentCapacity}) be available?`
              : `Hi, I'm interested in ${product.name} (${currentColor}, ${currentCapacity}) — ${formatPrice(activeDisplayPrice)}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "'LatteraMonoLL', 'letteraRegular', monospace" }}
          className="w-1/2 inline-flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-medium uppercase tracking-widest border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
