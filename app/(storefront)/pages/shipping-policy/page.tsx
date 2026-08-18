import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Shipping Policy | Nothing Official Pakistan",
  description:
    "Review shipping methods, dispatch timelines, delivery regions, and tracking policies for orders placed on Nothing Official Pakistan.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/shipping-policy",
  },
  openGraph: {
    title: "Shipping Policy | Nothing Official Pakistan",
    description:
      "Review shipping methods, dispatch timelines, and delivery policies.",
    url: "https://www.nothingcmf.pk/pages/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  return <TermsClient initialPolicy="shipping-policy" />;
}
