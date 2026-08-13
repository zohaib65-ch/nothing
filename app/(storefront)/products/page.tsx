import * as React from "react";
import type { Metadata } from "next";
import ProductsCatalogClient from "./products-client";

export const metadata: Metadata = {
  title: "Products Catalog | Nothing Official Pakistan",
  description:
    "Explore and shop the full range of Nothing & CMF devices in Pakistan. Filter and find smartphones, wireless audio earbuds, fast charging blocks, and compatible cases.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/products",
  },
  openGraph: {
    title: "Products Catalog | Nothing Official Pakistan",
    description:
      "Explore and shop the full range of Nothing & CMF devices in Pakistan. Filter and find smartphones, wireless audio earbuds, fast charging blocks, and compatible cases.",
    url: "https://www.nothingcmf.pk/products",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Catalog",
      },
    ],
  },
};

export default function ProductsCatalogPage() {
  return <ProductsCatalogClient />;
}
