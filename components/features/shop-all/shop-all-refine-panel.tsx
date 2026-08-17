"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  SHOP_ALL_REFINE_OPTIONS,
  ShopAllFilterState,
  ShopAllVendor,
} from "@/lib/shop-all-filters";

interface ShopAllRefinePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ShopAllFilterState;
  onApply: (next: ShopAllFilterState) => void;
}

export function ShopAllRefinePanel({ open, onOpenChange, filters, onApply }: ShopAllRefinePanelProps) {
  const [draftVendor, setDraftVendor] = React.useState<ShopAllVendor | null>(filters.vendor);
  const [draftCategory, setDraftCategory] = React.useState<string | null>(filters.category);

  React.useEffect(() => {
    if (!open) return;
    setDraftVendor(filters.vendor);
    setDraftCategory(filters.category);
  }, [open, filters.vendor, filters.category]);

  const selectedOption =
    SHOP_ALL_REFINE_OPTIONS.find((option) => option.category === draftCategory) ??
    SHOP_ALL_REFINE_OPTIONS[0];

  function handleApply() {
    onApply({
      vendor: draftVendor,
      type: selectedOption.type,
      category: draftCategory,
    });
    onOpenChange(false);
  }

  function handleReset() {
    setDraftVendor(null);
    setDraftCategory(null);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl border-neutral-200 px-4 pb-8 pt-6">
        <SheetHeader className="text-left">
          <SheetTitle className="type-callout text-black">Refine</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <p className="type-callout mb-3 text-black/45">Brand</p>
            <div className="grid grid-cols-2 gap-2">
              {(["Nothing", "CMF"] as const).map((vendor) => {
                const isActive = draftVendor === vendor;
                return (
                  <button
                    key={vendor}
                    type="button"
                    onClick={() => setDraftVendor(isActive ? null : vendor)}
                    className={cn(
                      "type-callout rounded-lg p-4 transition-colors hover:bg-black/[0.03]",
                      isActive ? "bg-black/[0.05] text-black" : "text-black/45"
                    )}
                  >
                    {vendor}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="type-callout mb-3 text-black/45">Category</p>
            <div className="grid grid-cols-2 gap-2">
              {SHOP_ALL_REFINE_OPTIONS.map((option) => {
                const isActive =
                  option.category === draftCategory || (!draftCategory && option.category === null);

                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setDraftCategory(option.category)}
                    className={cn(
                      "type-callout rounded-lg p-4 text-left transition-colors hover:bg-black/[0.03]",
                      isActive ? "bg-black/[0.05] text-black" : "text-black/45"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="type-callout h-12 rounded-lg border border-black/10 text-black/55 transition-colors hover:bg-black/[0.03]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="type-callout h-12 rounded-lg bg-black text-white transition-colors hover:bg-black/90"
            >
              Apply
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
