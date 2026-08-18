import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Terms of Sales | Nothing Official Pakistan",
  description:
    "These Terms of Sale govern product purchases made through Nothing Pakistan, including pricing, delivery, returns, and warranty handling.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/terms-of-sales",
  },
  openGraph: {
    title: "Terms of Sales | Nothing Official Pakistan",
    description:
      "These Terms of Sale govern product purchases made through Nothing Pakistan.",
    url: "https://www.nothingcmf.pk/pages/terms-of-sales",
  },
};

export default function TermsOfSalesPluralPage() {
  return <TermsClient initialPolicy="terms-of-sales" />;
}
