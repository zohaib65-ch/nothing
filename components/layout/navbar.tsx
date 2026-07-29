"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSpecsStore } from "@/store/useSpecsStore";
import { SpecsDropdownOverlay } from "@/components/features/products/specs-dropdown-overlay";

export function Navbar() {
  const { openCart, getTotalItems } = useCartStore();
  const { isOpen: isSpecsOpen, closeSpecs } = useSpecsStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const totalItems = getTotalItems();

  const navLinks = [
    { name: "SHOP ALL", href: "/collections/shop-all" },
    { name: "PHONES", href: "/collections/phones" },
    { name: "CHARGERS", href: "/collections/chargers" },
    { name: "OFFERS", href: "/collections/offers" },
    { name: "AUDIO", href: "/collections/audio" },
    { name: "WATCHES", href: "/collections/watches" },
    { name: "ACCESSORIES", href: "/collections/accessories" },
    { name: "CMF", href: "/collections/cmf" },
  ];

  return (
    <>
      {/* ─── Standard Header Bar ──────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-4 md:px-6 md:pt-5 select-none">
        <div className="w-full max-w-[500px] lg:max-w-[470px]">
          <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center rounded-[10px] border border-black/8 bg-white/[0.97] px-2 text-[#111] shadow-[0_16px_40px_rgba(17,17,17,0.12)] transition-opacity duration-200 md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3 opacity-100">
            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                if (isSpecsOpen) closeSpecs();
                setIsMenuOpen(true);
              }}
              aria-expanded={false}
              aria-label="Open menu"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
            >
              <img
                alt="Menu"
                src="/menu.svg"
                className="h-[18px] w-[18px] object-contain opacity-70"
              />
            </button>

            {/* Brand Logo */}
            <Link
              className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[18px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
              style={{ fontFamily: "var(--font-ndot55-caps), sans-serif" }}
              href="/"
            >
              NOTHING (R)
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center justify-self-end rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
              aria-label="Open cart"
            >
              <img
                alt="Cart"
                src="/cart.svg"
                className="h-[19px] w-[19px] object-contain opacity-70"
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D71921] px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Specs Dropdown Overlay Component ──────────────────── */}
      <SpecsDropdownOverlay />

      {/* ─── Mobile Menu Modal Overlay ────────────────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/30 backdrop-blur-sm px-3 pt-4 md:pt-5 select-none animate-in fade-in duration-200">
          {/* Floating White Card */}
          <div className="w-full max-w-[500px] lg:max-w-[470px] bg-white rounded-[10px] border border-black/8 shadow-[0_24px_60px_rgba(17,17,17,0.18)] p-2">
            {/* Header Row inside Menu Card */}
            <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center px-2 text-[#111] md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
              >
                <X className="h-[18px] w-[18px] text-black opacity-80" />
              </button>

              {/* Brand Logo */}
              <Link
                className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[16px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
                style={{ fontFamily: "var(--font-ndot55-caps), sans-serif" }}
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                NOTHING (R)
              </Link>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  openCart();
                }}
                className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center justify-self-end rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
                aria-label="Open cart"
              >
                <img
                  alt="Cart"
                  src="/cart.svg"
                  className="h-[19px] w-[19px] object-contain opacity-70"
                />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D71921] px-1 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Centered Navigation Links List */}
            <nav className="flex flex-col mt-3 border-t border-black/[0.06] text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-4 border-b border-black/[0.06] last:border-b-0 hover:bg-black/[0.01] transition-colors"
                >
                  <span 
                    className="text-[42px] uppercase tracking-[0.02em] text-[#111] leading-none"
                    style={{ fontFamily: "var(--font-ndot57), sans-serif" }}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
