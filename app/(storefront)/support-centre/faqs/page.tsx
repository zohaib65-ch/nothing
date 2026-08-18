import type { Metadata } from "next";
import { FaqsClient } from "./faqs-client";

export const metadata: Metadata = {
  title: "FAQs | Nothing Official Pakistan",
  description:
    "Frequently asked questions about Nothing accounts, orders, payments, technical support, shipping, returns, and warranty in Pakistan.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre/faqs",
  },
  openGraph: {
    title: "FAQs | Nothing Official Pakistan",
    description:
      "Frequently asked questions about Nothing accounts, orders, payments, technical support, shipping, returns, and warranty in Pakistan.",
    url: "https://www.nothingcmf.pk/support-centre/faqs",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan FAQs",
      },
    ],
  },
};

export default function FaqsPage() {
  return <FaqsClient />;
}
