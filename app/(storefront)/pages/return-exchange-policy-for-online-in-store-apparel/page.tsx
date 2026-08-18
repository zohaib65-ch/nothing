import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Return/Exchange Policy for Apparel | Nothing Official Pakistan",
  description:
    "Review Nothing's return and exchange policy for online and in-store apparel and merchandise purchases.",
  alternates: {
    canonical:
      "https://www.nothingcmf.pk/pages/return-exchange-policy-for-online-in-store-apparel",
  },
  openGraph: {
    title: "Return/Exchange Policy for Apparel | Nothing Official Pakistan",
    description:
      "Review Nothing's return and exchange policy for apparel and merchandise.",
    url: "https://www.nothingcmf.pk/pages/return-exchange-policy-for-online-in-store-apparel",
  },
};

export default function ApparelReturnPolicyPage() {
  return <TermsClient initialPolicy="apparel-return-policy" />;
}
