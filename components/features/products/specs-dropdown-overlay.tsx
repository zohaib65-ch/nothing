"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSpecsStore } from "@/store/useSpecsStore";
import { SpecificationGroup } from "@/types";

const iconMap: Record<string, string> = {
  colour: "/icons/specs/colours.svg",
  dimension: "/icons/specs/dimension.svg",
  processor: "/icons/specs/processor.svg",
  camera: "/icons/specs/camera.svg",
  display: "/icons/specs/display.svg",
  battery: "/icons/specs/battery.svg",
  multimedia: "/icons/specs/multimedia.svg",
  audio: "/icons/specs/audio.svg",
  connect: "/icons/specs/connect.svg",
  design: "/icons/specs/design.svg",
  operating: "/icons/specs/operating.svg",
  sustain: "/icons/specs/sustain.svg",
  other: "/icons/specs/other.svg",
  default: "/icons/specs/default.svg",
};

function getIconPath(category: string): string {
  const lower = (category || "").toLowerCase();
  for (const [key, path] of Object.entries(iconMap)) {
    if (key !== "default" && lower.includes(key)) return path;
  }
  return iconMap["default"];
}

function SpecsAccordionRow({ group, isOpen, onToggle }: { group: SpecificationGroup; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-[#EDEBED] rounded-xl overflow-hidden shrink-0">
      <button
        type="button"
        onClick={onToggle}
        className="relative flex h-12 w-full items-center justify-between px-4 focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <img src={getIconPath(group.category)} alt="" className="w-4 h-4 object-contain shrink-0" />
          <span className="text-[17px] sm:text-[19px] text-neutral-900" style={{ fontFamily: "var(--font-ntype82), serif" }}>
            {group.category}
          </span>
        </div>
        <img
          src="/icons/specs/chevron.svg"
          alt="Arrow"
          className={`h-4 w-4 text-neutral-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-3">
          {group.items?.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[140px_minmax(0,1fr)] gap-x-6 items-start">
              <span className="font-lattera-mono text-[10px] sm:text-[11px] text-black font-medium uppercase tracking-[0.12em] pt-0.5">
                {item.name}
              </span>
              <div className="space-y-0.5 ml-5">
                {item.value.split(/[,\n]/).map((v, vi) => (
                  <div key={vi} className="font-lattera-mono text-[12px] sm:text-[13px] font-medium uppercase text-neutral-900">
                    {v.trim()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SpecsDropdownOverlay() {
  const { openCart, getTotalItems } = useCartStore();
  const { isOpen, specifications, closeSpecs } = useSpecsStore();
  const [mounted, setMounted] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  React.useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  const filteredSpecifications = React.useMemo(() => {
    if (!specifications || !Array.isArray(specifications)) return [];
    return specifications
      .map((group) => ({
        ...group,
        items: (group.items || []).filter((item) => item.value && item.value.trim() !== ""),
      }))
      .filter((group) => group.category && group.items.length > 0);
  }, [specifications]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center px-3 pt-4 md:px-6 md:pt-5 select-none bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSpecs();
      }}
    >
      <div className="w-full max-w-[500px] lg:max-w-[470px] flex flex-col h-[calc(100vh-2.5rem)] sm:h-[calc(100vh-3rem)]">
        <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center rounded-[10px] border-b border-black/8 bg-white px-2 text-[#111] shadow-[0_16px_40px_rgba(17,17,17,0.12)] md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3 shrink-0">
          <button
            type="button"
            onClick={closeSpecs}
            aria-label="Close specs"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
          >
            <X className="h-[18px] w-[18px] text-black opacity-80" />
          </button>

          <Link
            className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[18px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
            style={{ fontFamily: "var(--font-ndot55-caps), sans-serif" }}
            href="/"
            onClick={closeSpecs}
          >
            Specs
          </Link>
          <button
            type="button"
            onClick={() => {
              closeSpecs();
              openCart();
            }}
            className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center justify-self-end rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
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

        <div
          data-lenis-prevent="true"
          data-lenis-prevent-touch="true"
          data-lenis-prevent-wheel="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="overflow-y-auto space-y-0.5 mt-1 scrollbar-none flex-1 min-h-0"
        >
          {filteredSpecifications && filteredSpecifications.length > 0 ? (
            filteredSpecifications.map((group, idx) => (
              <SpecsAccordionRow
                key={group.category || idx}
                group={group}
                isOpen={openCategory === group.category}
                onToggle={() => setOpenCategory(openCategory === group.category ? null : group.category)}
              />
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-xs text-neutral-400 font-mono">NO SPECIFICATIONS AVAILABLE.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
