"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, Shield } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { openCart, getTotalItems } = useCartStore();
  const { settings } = useSettingsStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const totalItems = getTotalItems();

  const navLinks = [
    { name: "SHOP ALL", href: "/products" },
    { name: "PHONES", href: "/categories/phones" },
    { name: "AUDIO", href: "/categories/audio" },
    { name: "CMF BY NOTHING", href: "/categories/cmf" },
    { name: "ACCESSORIES", href: "/categories/accessories" },
  ];

  return (
    <header className="sticky top-6 z-50 w-full flex justify-center px-4 select-none">
      {/* Floating Capsule Bar */}
      <div className="floating-pill h-12 px-6 rounded-full flex items-center justify-between w-full max-w-xl transition-all">
        {/* Left Hamburger / Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 text-black hover:opacity-70 transition-opacity"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Center Brand Title */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-ndot text-sm sm:text-base font-normal tracking-widest text-black uppercase">
            {settings.storeName || "NOTHING (R)"}
          </span>
        </Link>

        {/* Right Actions: Admin Shortcut, Search, Cart */}
        <div className="flex items-center space-x-3">
          <Link
            href="/admin"
            className="p-1.5 text-black hover:text-[#D71921] transition-colors"
            title="Admin Dashboard"
          >
            <Shield className="h-4 w-4" />
          </Link>

          <Link
            href="/products"
            className="p-1.5 text-black hover:opacity-70 transition-opacity"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>

          <button
            onClick={openCart}
            className="relative p-1.5 text-black hover:opacity-70 transition-opacity"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-[#D71921] text-white text-[9px] font-ndot flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Slide-Down Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 w-full max-w-xl bg-white border border-black/10 rounded-2xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200 text-black z-50">
          <nav className="flex flex-col space-y-3 font-ndot text-sm uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-[#D71921] transition-colors flex items-center justify-between border-b border-neutral-100 pb-2"
              >
                <span>{link.name}</span>
                <span className="font-lattera text-xs text-neutral-400">→</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
