"use client";

import * as React from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSpecsStore } from "@/store/useSpecsStore";
import { SpecificationGroup } from "@/types";

/* ── Dot-matrix style SVG icons matching Nothing Tech ── */
const iconMap: Record<string, React.ReactNode> = {
  colour: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="3" height="3" fill="currentColor" />
      <rect x="8" y="2" width="3" height="3" fill="currentColor" />
      <rect x="14" y="2" width="3" height="3" fill="currentColor" />
      <rect x="2" y="8" width="3" height="3" fill="currentColor" />
      <rect x="8" y="8" width="3" height="3" fill="currentColor" />
      <rect x="14" y="8" width="3" height="3" fill="currentColor" />
      <rect x="2" y="14" width="3" height="3" fill="currentColor" />
      <rect x="8" y="14" width="3" height="3" fill="currentColor" />
    </svg>
  ),
  dimension: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M2 7h16M7 2v16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  processor: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="5" y="5" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="7" width="6" height="6" rx="0.5" fill="currentColor" opacity="0.3" />
      <line x1="3" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="3" x2="8" y2="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="3" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="15" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="15" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  camera: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 5l1-2h4l1 2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  display: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="15" r="1" fill="currentColor" />
    </svg>
  ),
  battery: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="4" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="2" width="6" height="2" rx="0.5" fill="currentColor" />
      <rect x="6" y="9" width="8" height="6" rx="0.5" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  multimedia: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="8,6 15,10 8,14" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  audio: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M3 8v4h3l4 4V4L6 8H3z" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1" />
      <path d="M14 7c1 1.2 1 3.8 0 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 5c2 2.2 2 7.8 0 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  connect: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="1.5" fill="currentColor" />
      <line x1="10" y1="5.5" x2="10" y2="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" />
      <line x1="10" y1="11" x2="10" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  design: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M4 16l3-10L17 3 7 13z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="5" cy="15" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  operating: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M5 7l2-2h6l2 2v8l-2 2H7l-2-2z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="11" r="2" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  sustain: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5c3 0 5 3 5 6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 8c-2 0-4 2-4 5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  other: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" />
      <circle cx="6" cy="14" r="1.5" fill="currentColor" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  ),
  default: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
      <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.2" />
      <line x1="7" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
};

function getIcon(category: string) {
  const lower = (category || "").toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (key !== "default" && lower.includes(key)) return icon;
  }
  return iconMap["default"];
}

function SpecsAccordionRow({ group }: { group: SpecificationGroup }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-[#EDEBED] rounded-xl overflow-hidden shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-12 w-full items-center justify-between px-4 focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-neutral-700 shrink-0">{getIcon(group.category)}</span>
          <span className="text-[17px] sm:text-[19px] text-neutral-900" style={{ fontFamily: "var(--font-ntype82), serif" }}>
            {group.category}
          </span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-neutral-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-neutral-400 shrink-0" />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-3">
          {group.items?.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[140px_minmax(0,1fr)] gap-x-6 items-start">
              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500 font-bold uppercase tracking-[0.12em] pt-0.5">{item.name}</span>
              <div className="space-y-0.5">
                {item.value.split(/[,\n]/).map((v, vi) => (
                  <div key={vi} className="font-sans text-[12px] sm:text-[13px] font-semibold uppercase text-neutral-900 tracking-wider">
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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when specs overlay is open so the background page doesn't scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center px-3 pt-4 md:px-6 md:pt-5 select-none bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSpecs();
      }}
    >
      <div className="w-full max-w-[500px] lg:max-w-[470px] flex flex-col h-[calc(100vh-2.5rem)] sm:h-[calc(100vh-3rem)]">
        {/* Floating Pill Header Bar */}
        <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center rounded-t-[10px] border-b border-black/8 bg-white px-2 text-[#111] shadow-[0_16px_40px_rgba(17,17,17,0.12)] md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3 shrink-0">
          {/* Close Button */}
          <button
            type="button"
            onClick={closeSpecs}
            aria-label="Close specs"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
          >
            <X className="h-[18px] w-[18px] text-black opacity-80" />
          </button>

          {/* Brand Logo */}
          <Link
            className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[16px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
            style={{ fontFamily: "var(--font-ndot55-caps), sans-serif" }}
            href="/"
            onClick={closeSpecs}
          >
            NOTHING (R)
          </Link>

          {/* Cart Button */}
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

        {/* Accent Line */}
        <div
          className="h-[3px] w-full shrink-0"
          style={{ background: "linear-gradient(90deg, #EDEBED 0%, #D4A574 30%, #C4956A 50%, #B8B0A8 70%, #EDEBED 100%)" }}
        />

        {/* Scrollable Specs List Container */}
        <div className="overflow-y-auto bg-white/95 backdrop-blur-md rounded-b-[14px] p-3 space-y-2 border-x border-b border-black/8 shadow-2xl scrollbar-none flex-1 min-h-0">
          {specifications && specifications.length > 0 ? (
            specifications.map((group, idx) => <SpecsAccordionRow key={group.category || idx} group={group} />)
          ) : (
            <div className="bg-[#EDEBED] rounded-xl px-4 py-8 text-center">
              <p className="text-xs text-neutral-400 font-mono">NO SPECIFICATIONS AVAILABLE.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
