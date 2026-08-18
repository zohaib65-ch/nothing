import type { Metadata } from "next";
import { AfterSalesClient } from "./after-sales-client";

export const metadata: Metadata = {
  title: "After Sales Service | Nothing Official Pakistan",
  description:
    "Get ongoing support after you have purchased your Nothing product. Request and manage your returns, get device repairs, and track replacements.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre/after-sales-service",
  },
  openGraph: {
    title: "After Sales Service | Nothing Official Pakistan",
    description:
      "Get ongoing support after you have purchased your Nothing product. Request and manage your returns, get device repairs, and track replacements.",
    url: "https://www.nothingcmf.pk/support-centre/after-sales-service",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan After Sales Service",
      },
    ],
  },
};

export default function AfterSalesServicePage() {
  return <AfterSalesClient />;
}
