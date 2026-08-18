import type { Metadata } from "next";
import { ProductStatusClient } from "./product-status-client";

export const metadata: Metadata = {
  title: "Product Status | Nothing Official Pakistan",
  description:
    "Check warranty status, activation date, and device authenticity using your Nothing or CMF IMEI / Serial Number.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre/product-status",
  },
  openGraph: {
    title: "Product Status | Nothing Official Pakistan",
    description:
      "Check warranty status, activation date, and device authenticity using your Nothing or CMF IMEI / Serial Number.",
    url: "https://www.nothingcmf.pk/support-centre/product-status",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Product Status",
      },
    ],
  },
};

export default function ProductStatusPage() {
  return <ProductStatusClient />;
}
