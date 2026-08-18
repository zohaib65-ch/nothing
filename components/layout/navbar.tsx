"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSpecsStore } from "@/store/useSpecsStore";
import { SpecsDropdownOverlay } from "@/components/features/products/specs-dropdown-overlay";
import { ShippingLocationOverlay } from "./shipping-location-overlay";
import { CartDrawer } from "@/components/features/cart/cart-drawer";

export function Navbar() {
  const { openCart, getTotalItems } = useCartStore();
  const { isOpen: isSpecsOpen, closeSpecs } = useSpecsStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const totalItems = getTotalItems();

  const navLinks = [
    { name: "SHOP ALL", href: "/collections/shop-all" },
    { name: "PHONES", href: "/collections/phones" },
    { name: "CHARGERS", href: "/collections/chargers" },
    { name: "AUDIO", href: "/collections/audio" },
    { name: "WATCHES", href: "/collections/watches" },
    { name: "ACCESSORIES", href: "/collections/accessories" },
    { name: "APPAREL", href: "/collections/apparel" },
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
              className="inline-flex h-11 w-11 cursor-pointer shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
            >
              <img alt="Menu" src="/menu.svg" className="h-[18px] w-[18px] object-contain opacity-70" />
            </button>

            {/* Brand Logo */}
            <Link
              className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[20px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
              style={{ fontFamily: "var(--font-ndot-regular)" }}
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
              <img alt="Cart" src="/cart.svg" className="h-[19px] w-[19px] object-contain opacity-70" />
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

      {/* ─── Shipping Location Overlay Component ───────────────── */}
      <ShippingLocationOverlay />

      {/* ─── Cart Drawer Overlay Component ─────────────────────── */}
      <CartDrawer />

      {/* ─── Mobile Menu Modal Overlay ────────────────────────── */}
      {isMenuOpen && (
        <div
          data-navbar-menu
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/10 backdrop-blur-sm px-3 pt-4 md:pt-5 select-none animate-in fade-in duration-200"
        >
          <div className="w-full h-[95vh] max-w-[500px] lg:max-w-[470px] bg-white/90 backdrop-blur-2xl rounded-[10px] border border-white/60 shadow-[0_24px_60px_rgba(17,17,17,0.18)] p-2 flex flex-col justify-between pb-6">
            <div>
              <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center px-2 text-[#111] md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-11 cursor-pointer w-11 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
                >
                  <X className="h-[18px] w-[18px] text-black opacity-80" />
                </button>
                <Link
                  className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[20px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
                  style={{ fontFamily: "var(--font-ndot-regular)" }}
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
                  <img alt="Cart" src="/cart.svg" className="h-[19px] w-[19px] object-contain opacity-70" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D71921] px-1 text-[10px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>

              {/* Centered Navigation Links List */}
              <nav className="flex flex-col mt-10 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-3 last:border-b-0 hover:bg-black/[0.01] transition-colors"
                  >
                    <span
                      className="text-[40px] uppercase tracking-[0.02em] text-[#111] leading-none"
                      style={{ fontFamily: "var(--font-ndot-regular)" }}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Links */}
            <div
              className="flex justify-center gap-5 text-[11px] uppercase tracking-[0.12em] text-[#111] opacity-75 font-medium pb-2 select-none"
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
        </div>
      )}
    </>
  );
}
