import * as React from "react";
import type { Metadata } from "next";
import ShopAllClient from "./shop-all-client";

export const metadata: Metadata = {
  title: "Shop All Catalog | Nothing Official Pakistan",
  description:
    "Explore our complete catalog of Nothing & CMF products in Pakistan. Shop smartphones, chargers, protectors, covers, earbuds, and premium compatible accessories.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/shop-all",
  },
  openGraph: {
    title: "Shop All Catalog | Nothing Official Pakistan",
    description:
      "Explore our complete catalog of Nothing & CMF products in Pakistan. Shop smartphones, chargers, protectors, covers, earbuds, and premium compatible accessories.",
    url: "https://www.nothingcmf.pk/shop-all",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Shop All Nothing Pakistan Catalog",
      },
    ],
  },
};

export default function ShopAllPage() {
  return <ShopAllClient />;
}
