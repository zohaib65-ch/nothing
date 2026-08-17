"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  buildShopAllQuery,
  getActiveNavType,
  SHOP_ALL_NAV_TYPES,
  SHOP_ALL_VENDORS,
  ShopAllFilterState,
  ShopAllType,
  ShopAllVendor,
} from "@/lib/shop-all-filters";
import { RefineIcon } from "./refine-icon";

interface ShopAllFilterBarProps {
  filters: ShopAllFilterState;
}

export function ShopAllFilterBar({ filters }: ShopAllFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filtersExpanded, setFiltersExpanded] = React.useState(true);

  const activeType = getActiveNavType(filters);

  function navigate(next: ShopAllFilterState) {
    router.push(`${pathname}${buildShopAllQuery(next)}`, { scroll: false });
  }

  function handleTypeSelect(type: ShopAllType | null) {
    navigate({
      vendor: filters.vendor,
      type,
      category: null,
    });
  }

  function handleVendorSelect(vendor: ShopAllVendor) {
    navigate({
      vendor,
      type: filters.type,
      category: filters.category,
    });
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center p-4">
        <div className="pointer-events-auto flex w-full max-w-lg flex-col gap-0.5">
          {filtersExpanded && (
            <div className="frost-white-intense flex flex-col gap-2 overflow-y-hidden rounded-lg p-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <nav className="type-callout flex h-12 items-center justify-center gap-8 overflow-x-auto overflow-y-hidden p-2 scrollbar-none">
                {SHOP_ALL_NAV_TYPES.map((item) => {
                  const isActive = item.value === null ? activeType === null : activeType === item.value;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleTypeSelect(item.value)}
                      className={cn(
                        "cursor-pointer uppercase transition-colors whitespace-nowrap",
                        isActive ? "text-black" : "text-black/45 hover:text-black/70"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="grid grid-cols-2 gap-2">
                {SHOP_ALL_VENDORS.map((vendor) => {
                  const isActive = filters.vendor === vendor;

                  return (
                    <button
                      key={vendor}
                      type="button"
                      onClick={() => handleVendorSelect(vendor)}
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
          )}

          <button
            type="button"
            onClick={() => setFiltersExpanded((expanded) => !expanded)}
            aria-expanded={filtersExpanded}
            className="frost-white-intense flex h-12 w-full items-center justify-center gap-2 rounded-lg p-4 transition-colors hover:bg-white/90"
          >
            <span className="type-callout text-black">Refine</span>
            <RefineIcon
              className={cn(
                "text-black/55 transition-transform duration-300",
                filtersExpanded ? "rotate-0" : "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
    </>
  );
}
