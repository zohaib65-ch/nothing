"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSpecsStore } from "@/store/useSpecsStore";
import { SpecsDropdownContent } from "@/components/features/products/specs-dropdown-overlay";
import { ShippingLocationOverlay } from "./shipping-location-overlay";
import { CartDrawer } from "@/components/features/cart/cart-drawer";

export function Navbar() {
  const { openCart, getTotalItems } = useCartStore();
  const { isOpen: isSpecsOpen, closeSpecs } = useSpecsStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMenuOpen || isSpecsOpen) {
      if (isMenuOpen) document.body.classList.add("menu-open");
      if (isSpecsOpen) document.body.classList.add("specs-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open", "specs-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("menu-open", "specs-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSpecsOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  const navLinks = [
    { name: "SHOP ALL", href: "/collections/shop-all" },
    { name: "PHONES", href: "/collections/phones" },
    { name: "CHARGERS", href: "/collections/chargers" },
    { name: "AUDIO", href: "/collections/audio" },
    { name: "WATCHES", href: "/collections/watches" },
    { name: "ACCESSORIES", href: "/collections/accessories" },
    { name: "APPAREL", href: "/collections/apparel" },
  ];

  const isExpanded = isSpecsOpen || isMenuOpen;

  return (
    <>
      {/* ─── Backdrop Blur Overlay ────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[85] bg-black/20 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "opacity-100 pointer-events-auto cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          if (isSpecsOpen) closeSpecs();
          if (isMenuOpen) setIsMenuOpen(false);
        }}
      />

      {/* ─── Single Expanding Header Container ────────────────── */}
      <header className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-4 md:px-6 md:pt-5 select-none pointer-events-none">
        <div
          className={`w-full max-w-[500px] lg:max-w-[470px] pointer-events-auto bg-white/95 backdrop-blur-2xl rounded-[10px]  flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSpecsOpen
              ? "h-[82vh] sm:h-[86vh]"
              : isMenuOpen
              ? "h-[90vh]"
              : "h-13 md:h-12"
          }`}
        >
          {/* Top Bar inside the expanding pill */}
          <div className="grid h-13 md:h-11 grid-cols-[44px_minmax(0,1fr)_44px] md:grid-cols-[40px_minmax(0,1fr)_40px] items-center px-2 md:px-3 text-[#111] shrink-0">
            {/* Left Button (Close X if open, Hamburger if closed) */}
            {isExpanded ? (
              <button
                type="button"
                onClick={() => {
                  if (isSpecsOpen) closeSpecs();
                  if (isMenuOpen) setIsMenuOpen(false);
                }}
                aria-label="Close"
                className="inline-flex h-11 w-11 cursor-pointer shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
              >
                <X className="h-[18px] w-[18px] text-black opacity-80" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-expanded={false}
                aria-label="Open menu"
                className="inline-flex h-11 w-11 cursor-pointer shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
              >
                <img alt="Menu" src="/menu.svg" className="h-[18px] w-[18px] object-contain opacity-70" />
              </button>
            )}

            {/* Brand Logo / Specs Label */}
            <Link
              className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[20px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
              style={{ fontFamily: "var(--font-ndot-regular)" }}
              href="/"
              onClick={() => {
                if (isSpecsOpen) closeSpecs();
                if (isMenuOpen) setIsMenuOpen(false);
              }}
            >
              {isSpecsOpen ? "SPECS" : "NOTHING (R)"}
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => {
                if (isSpecsOpen) closeSpecs();
                if (isMenuOpen) setIsMenuOpen(false);
                openCart();
              }}
              className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center justify-self-end rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8 cursor-pointer"
              aria-label="Open cart"
            >
              <img alt="Cart" src="/cart.svg" className="h-[19px] w-[19px] object-contain opacity-70" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D71921] px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Expanded Specs Content */}
          {isSpecsOpen && (
            <div className="flex-1 min-h-0 flex flex-col p-2 sm:p-2.5 overflow-hidden animate-in fade-in duration-300">
              <SpecsDropdownContent />
            </div>
          )}

          {/* Expanded Mobile Menu Content */}
          {isMenuOpen && (
            <div className="flex-1 min-h-0 flex flex-col justify-between p-2 pb-6 animate-in fade-in duration-300">
              {/* Centered Navigation Links List */}
              <nav className="flex flex-col mt-8 text-center overflow-y-auto scrollbar-none">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-3 last:border-b-0 hover:bg-black/[0.02] transition-colors"
                  >
                    <span
                      className="text-[36px] sm:text-[40px] uppercase tracking-[0.02em] text-[#111] leading-none"
                      style={{ fontFamily: "var(--font-ndot-regular)" }}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Bottom Links */}
              <div
                className="flex justify-center gap-5 text-[11px] uppercase tracking-[0.12em] text-[#111] opacity-75 font-medium pb-2 select-none shrink-0"
                style={{ fontFamily: "'LatteraMonoLL', 'letteraRegular', monospace" }}
              >
                <Link href="/support-centre" onClick={() => setIsMenuOpen(false)} className="hover:opacity-100 transition-opacity">
                  SUPPORT
                </Link>
                <Link href="/pages/terms-of-sale" onClick={() => setIsMenuOpen(false)} className="hover:opacity-100 transition-opacity">
                  Legal
                </Link>
                <Link href="/about-us" onClick={() => setIsMenuOpen(false)} className="hover:opacity-100 transition-opacity">
                  ABOUT
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ─── Shipping Location Overlay Component ───────────────── */}
      <ShippingLocationOverlay />

      {/* ─── Cart Drawer Overlay Component ─────────────────────── */}
      <CartDrawer />
    </>
  );
}
