"use client";

import * as React from "react";
import { Product, ProductVariant } from "@/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { getValidImageUrl } from "@/lib/utils";
import Image from "next/image";

interface FeatureVariantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isSaving: boolean;
  onConfirm: (selectedVariantIds: string[]) => Promise<void>;
}

export function FeatureVariantsModal({
  isOpen,
  onClose,
  product,
  isSaving,
  onConfirm,
}: FeatureVariantsModalProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (product && isOpen) {
      // Initialize selected variant IDs from product.variants where isFeatured is true
      const initialSelected = (product.variants || [])
        .filter((v) => v.isFeatured)
        .map((v) => v.id);
      setSelectedIds(initialSelected);
    }
  }, [product, isOpen]);

  if (!product) return null;

  const handleToggleVariant = (variantId: string) => {
    setSelectedIds((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId]
    );
  };

  const handleSelectAll = () => {
    const allIds = (product.variants || []).map((v) => v.id);
    setSelectedIds(selectedIds.length === allIds.length ? [] : allIds);
  };

  const handleSubmit = async () => {
    await onConfirm(selectedIds);
  };

  const variants = product.variants || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SELECT FEATURED VARIANTS"
      maxWidth="md"
    >
      <div className="space-y-4 font-mono text-xs text-neutral-900">
        <p className="text-[11px] text-neutral-600 font-sans">
          Select which variants of <span className="font-bold text-neutral-900 font-mono">"{product.name}"</span> you want to showcase as featured.
        </p>

        {variants.length > 0 && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[10px] text-[#D71921] hover:underline font-bold"
            >
              {selectedIds.length === variants.length ? "DESELECT ALL" : "SELECT ALL"}
            </button>
          </div>
        )}

        <div className="border border-neutral-200 rounded-lg max-h-[300px] overflow-y-auto divide-y divide-neutral-200">
          {variants.length === 0 ? (
            <div className="p-4 text-center text-neutral-500 font-sans">
              No variants found for this product.
            </div>
          ) : (
            variants.map((v) => {
              const isChecked = selectedIds.includes(v.id);
              const displayName = `${v.color || "Standard"} ${v.storage ? `(${v.storage})` : ""}`;
              return (
                <div
                  key={v.id}
                  onClick={() => handleToggleVariant(v.id)}
                  className="flex items-center space-x-3 p-3 hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="h-4 w-4 rounded border-neutral-300 text-[#D71921] focus:ring-[#D71921] cursor-pointer"
                  />
                  <div className="relative h-10 w-10 bg-white border border-neutral-200 rounded flex-shrink-0">
                    <Image
                      src={getValidImageUrl(v.image || product.images?.[0])}
                      alt={displayName}
                      fill
                      sizes="40px"
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-neutral-900">{displayName}</p>
                    <p className="text-[10px] text-neutral-500 font-mono">SKU: {v.sku || "N/A"}</p>
                  </div>
                  {v.price && (
                    <span className="font-bold text-neutral-900">
                      ${v.price}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="pt-4 flex justify-end space-x-3 border-t border-neutral-200">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
          >
            CANCEL
          </Button>
          <Button
            variant="red"
            type="button"
            isLoading={isSaving}
            onClick={handleSubmit}
            leftIcon={<Star className="h-4 w-4" />}
          >
            CONFIRM FEATURED
          </Button>
        </div>
      </div>
    </Modal>
  );
}
