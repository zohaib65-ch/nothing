"use client";

import * as React from "react";
import Link from "next/link";
import { X, Check, Search } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLocationStore, SHIPPING_LOCATIONS, ShippingLocation } from "@/store/useLocationStore";

export function ShippingLocationOverlay() {
  const { openCart, getTotalItems } = useCartStore();
  const { isOpen, closeLocationModal, selectedLocation, setLocation } = useLocationStore();
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("nothing_shipping_location");
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = SHIPPING_LOCATIONS.find((l) => l.id === parsed.id);
        if (match) {
          setLocation(match);
        }
      }
    } catch {
      // ignore
    }
  }, [setLocation]);

  React.useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.classList.add("location-open");
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.classList.remove("location-open");
      setSearchQuery("");
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.classList.remove("location-open");
    };
  }, [isOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  if (!isOpen) return null;

  const filteredLocations = SHIPPING_LOCATIONS.filter((loc) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q) ||
      loc.language.toLowerCase().includes(q) ||
      loc.currency.toLowerCase().includes(q)
    );
  });

  const regionOrder = ["Europe", "Asia Pacific", "North America", "Middle East"];
  const groupedLocations = regionOrder.reduce<Record<string, ShippingLocation[]>>((acc, region) => {
    const items = filteredLocations.filter((l) => l.region === region);
    if (items.length > 0) {
      acc[region] = items;
    }
    return acc;
  }, {});

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center px-3 pt-4 md:px-6 md:pt-5 select-none backdrop-blur-lg animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLocationModal();
      }}
    >
      <div className="w-full max-w-[500px] lg:max-w-[470px] flex flex-col h-[calc(100vh-2.5rem)] sm:h-[calc(100vh-3rem)]">
        {/* Top Navbar Matching Header Bar */}
        <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center rounded-[10px] border-b border-black/8 bg-white px-2 text-[#111] shadow-[0_16px_40px_rgba(17,17,17,0.12)] md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3 shrink-0">
          <button
            type="button"
            onClick={closeLocationModal}
            aria-label="Close location selector"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8 cursor-pointer"
          >
            <X className="h-[18px] w-[18px] text-black opacity-80" />
          </button>

          <Link
            className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[18px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
            style={{ fontFamily: "var(--font-ndot-regular)" }}
            href="/"
            onClick={closeLocationModal}
          >
            SHIP TO
          </Link>

          <button
            type="button"
            onClick={() => {
              closeLocationModal();
              openCart();
            }}
            className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center justify-self-end rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8 cursor-pointer"
            aria-label="Open cart"
          >
            <img alt="Cart" src="/cart.svg" className="h-[19px] w-[19px] object-contain opacity-70" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D71921] px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Main Content Box */}
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-touch="true"
          data-lenis-prevent-wheel="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="mt-1 flex-1 min-h-0 flex flex-col rounded-[12px] bg-white text-black shadow-xl overflow-hidden"
        >
          {/* Headline */}
          <div className="px-6 pt-6 pb-3 text-center shrink-0">
            <h2 className="text-[24px] sm:text-[28px] text-[#585A5A] font-ntype82">
              Select Your Shipping Location
            </h2>
          </div>

          {/* Scrollable list of countries */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 space-y-5 scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent">
            {Object.keys(groupedLocations).length === 0 ? (
              <div className="py-12 text-center text-xs text-black/50 font-mono">
                NO SHIPPING LOCATIONS FOUND FOR &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              Object.entries(groupedLocations).map(([region, locations]) => (
                <div key={region} className="space-y-1">
                  <div
                    className="text-[11px] font-medium text-black/45 uppercase tracking-wider pb-1"
                    style={{ fontFamily: "var(--font-lettera-regular), sans-serif" }}
                  >
                    {region}
                  </div>

                  <div className="divide-y divide-black/5">
                    {locations.map((loc) => {
                      const isSelected = selectedLocation.id === loc.id;
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            setLocation(loc);
                            closeLocationModal();
                          }}
                          className={`w-full flex items-center justify-between py-2.5 px-2 rounded-[6px] text-left transition-colors cursor-pointer group ${isSelected ? "bg-black/[0.06] font-medium" : "hover:bg-black/[0.03]"
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            {isSelected && <Check className="h-3.5 w-3.5 text-black shrink-0" />}
                            <span className="text-[15px] sm:text-[16px] text-black tracking-normal font-ntype82 leading-snug">
                              {loc.name}
                            </span>
                          </div>

                          <span className="text-[13px] sm:text-[14px] font-ntype82 text-[#7c7e7e] group-hover:text-black/90 transition-colors shrink-0 ml-4 font-normal">
                            {loc.language} / ({loc.currency})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
