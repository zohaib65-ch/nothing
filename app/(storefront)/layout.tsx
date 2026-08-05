"use client";

import * as React from "react";
import { LenisProvider } from "@/providers/lenis-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/features/cart/cart-drawer";
import { useProductStore } from "@/store/useProductStore";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const fetchAll = useProductStore((s) => s.fetchAll);

  // Fetch all products + categories once on storefront mount.
  // Every child page reads from the store — no individual API calls needed.
  React.useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#111]">
        <div className="site-dot-overlay" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </div>
    </LenisProvider>
  );
}
