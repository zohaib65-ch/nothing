import * as React from "react";
import type { Metadata } from "next";
import TermsOfSalePage from "@/app/(storefront)/pages/terms-of-sale/page";

export const metadata: Metadata = {
  title: "ASHA Accessibility & Terms of Sale | Nothing Official Pakistan",
  description:
    "These Terms of Sale govern product purchases made through Nothing Pakistan, including pricing, delivery, returns, and warranty handling.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre/asha",
  },
  openGraph: {
    title: "ASHA Accessibility & Terms of Sale | Nothing Official Pakistan",
    description:
      "These Terms of Sale govern product purchases made through Nothing Pakistan, including pricing, delivery, returns, and warranty handling.",
    url: "https://www.nothingcmf.pk/support-centre/asha",
  },
};

export default function AshaPage() {
  return <TermsOfSalePage />;
}
