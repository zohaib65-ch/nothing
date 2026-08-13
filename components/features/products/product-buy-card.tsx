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
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-xl !bg-white/70 backdrop-blur-2xl rounded-xl px-5 py-2.5 shadow-2xl space-y-2 transition-all duration-500 ease-in-out ${
        isNearFooter ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0"
      } ${className}`}
    >
      <div
        className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
          isScrolled ? "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none" : "grid-rows-[1fr] opacity-100 mb-1"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex items-center justify-between pt-1 pb-1">
            <h2 className="dot-heading text-base tracking-wider text-neutral-900 lowercase">{product.name}</h2>
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 flex-shrink-0">
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
                className={`group relative h-7 w-7 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center p-0.5 ${
                  isSelected ? "ring-2 ring-[#D71921] ring-offset-2 ring-offset-white scale-110" : "hover:scale-105 opacity-80 hover:opacity-100"
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
          className={`w-1/2 font-lattera-mono text-xs font-medium uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 h-auto border-none ${
            isCurrentCapacityComingSoon
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
