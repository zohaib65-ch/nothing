"use client";

import * as React from "react";
import { useProductStore } from "@/store/useProductStore";

/**
 * Tiny client boundary that hydrates the Zustand product store on mount.
 * 
 * This keeps the store warm for client pages (cart, product detail, order, etc.)
 * that still depend on useProductStore, while allowing the storefront layout
 * itself to remain a Server Component.
 * 
 * Renders nothing — it's a side-effect-only component.
 */
export function StorefrontHydrator() {
  const fetchAll = useProductStore((s) => s.fetchAll);

  React.useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return null;
}
