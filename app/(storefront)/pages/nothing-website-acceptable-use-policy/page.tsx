import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Nothing Official Pakistan",
  description:
    "This acceptable use policy sets out the content standards that apply when you interact with the Nothing website and community.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/nothing-website-acceptable-use-policy",
  },
  openGraph: {
    title: "Acceptable Use Policy | Nothing Official Pakistan",
    description:
      "This acceptable use policy sets out the content standards that apply when you interact with the Nothing website and community.",
    url: "https://www.nothingcmf.pk/pages/nothing-website-acceptable-use-policy",
  },
};

export default function AcceptableUsePolicyPage() {
  return <TermsClient initialPolicy="acceptable-use-policy" />;
}
