"use client";

import * as React from "react";
import Link from "next/link";
import { X, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function Navbar() {
  const { openCart, getTotalItems } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const totalItems = getTotalItems();

  const navLinks = [
    { name: "SHOP ALL", href: "/shop-all" },
    { name: "PHONES", href: "/collections/phones" },
    { name: "CHARGERS", href: "/collections/chargers" },
    { name: "AUDIO & SOUND", href: "/collections/audio" },
    { name: "PROTECTORS", href: "/collections/protectors" },
    { name: "COMPANY VERIFICATION", href: "/company-verification" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-4 md:px-6 md:pt-5 select-none">
        <div className="w-full max-w-[500px] lg:max-w-[470px]">
          <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center rounded-[10px] border border-black/8 bg-white/[0.97] px-2 text-[#111] shadow-[0_16px_40px_rgba(17,17,17,0.12)] transition-opacity duration-200 md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3 opacity-100">
            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Open menu"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
            >
              {isMenuOpen ? (
                <X className="h-[18px] w-[18px] text-black opacity-80" />
              ) : (
                <img
                  alt="Menu"
                  src="/menu.svg"
                  className="h-[18px] w-[18px] object-contain opacity-70"
                />
              )}
            </button>

            {/* Brand Logo */}
            <Link
              className="header-brand-logo inline-flex h-full items-center justify-center px-1"
              href="/"
            >
              <img
                alt="Nothing"
                src="/nothing_logo.webp"
                className="h-auto w-[100px] max-w-none object-contain opacity-90 md:w-[100px]"
              />
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

      {/* Full Drawer Navigation Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[85] bg-white/95 backdrop-blur-md transition-all duration-300 animate-in fade-in">
          <div className="mx-auto flex h-full max-w-[500px] flex-col justify-between px-6 pb-10 pt-24">
            <nav className="flex flex-col space-y-4">
              <p className="dot-heading text-[11px] tracking-[0.3em] text-black/40">NAVIGATION</p>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-black/10 py-3.5 text-base font-medium tracking-widest text-black transition-colors hover:text-[#D71921]"
                >
                  <span className="dot-heading text-lg">{link.name}</span>
                  <ArrowRight className="h-4 w-4 text-black/40 transition-transform group-hover:translate-x-1 group-hover:text-[#D71921]" />
                </Link>
              ))}
            </nav>

            <div className="space-y-3 pt-6 border-t border-black/10">
              <a
                href="https://wa.me/923110066648"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Customer Support (+92 311 0066648)</span>
              </a>

              <div className="flex items-center justify-between text-xs text-black/60 pt-2">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-black/80" />
                  <span>SECP Registered: NOTHING OFFICIAL (SMC-PVT) LTD</span>
                </span>
                <span>CUIN: 0337422</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
