import * as React from "react";
import { LenisProvider } from "@/providers/lenis-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/features/cart/cart-drawer";
import { StorefrontHydrator } from "./storefront-hydrator";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#111]">
        <div className="site-dot-overlay" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      {/* Hydrate the Zustand product store for client pages that still depend on it
          (cart, product detail, order, etc.) without blocking server rendering. */}
      <StorefrontHydrator />
    </LenisProvider>
  );
}
