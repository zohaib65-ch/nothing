"use client";

import * as React from "react";
import { Product, ProductVariant } from "@/types";
import { cn } from "@/lib/utils";

export interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export function VariantSelector({
  product,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  // Extract unique colors & storage options from product variants
  const colors = product.colors || [];
  const storageOptions = product.storageOptions || [];

  const handleColorChange = (colorName: string) => {
    // Find variant with matching color (and matching storage if applicable)
    const match = product.variants.find(
      (v) =>
        v.color.toLowerCase() === colorName.toLowerCase() &&
        (!selectedVariant.storage || v.storage === selectedVariant.storage)
    ) || product.variants.find((v) => v.color.toLowerCase() === colorName.toLowerCase());

    if (match) onSelectVariant(match);
  };

  const handleStorageChange = (storage: string) => {
    const match = product.variants.find(
      (v) =>
        v.storage === storage &&
        v.color.toLowerCase() === selectedVariant.color.toLowerCase()
    ) || product.variants.find((v) => v.storage === storage);

    if (match) onSelectVariant(match);
  };

  return (
    <div className="space-y-6 bg-[#0F0F10] border border-[#26262A] p-5">
      {/* Storage Selector */}
      {storageOptions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-mono text-xs uppercase">
            <span className="text-neutral-400">SELECT STORAGE:</span>
            <span className="text-white font-bold">{selectedVariant.storage || "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {storageOptions.map((option) => {
              const isSelected = selectedVariant.storage === option;
              return (
                <button
                  key={option}
                  onClick={() => handleStorageChange(option)}
                  className={cn(
                    "py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider text-center border transition-all focus:outline-none",
                    isSelected
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "bg-[#141416] text-neutral-300 border-[#26262A] hover:border-neutral-500"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Swatches */}
      {colors.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-mono text-xs uppercase">
            <span className="text-neutral-400">FINISH & COLOR:</span>
            <span className="text-white font-bold">{selectedVariant.color}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => {
              const isSelected =
                selectedVariant.color.toLowerCase() === c.name.toLowerCase();
              return (
                <button
                  key={c.name}
                  onClick={() => handleColorChange(c.name)}
                  className={cn(
                    "group flex items-center space-x-2.5 px-3.5 py-2 border font-mono text-xs uppercase tracking-wider transition-all focus:outline-none",
                    isSelected
                      ? "border-[#D71921] bg-[#D71921]/10 text-white"
                      : "border-[#26262A] bg-[#141416] text-neutral-400 hover:border-neutral-500 hover:text-white"
                  )}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-neutral-700 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
