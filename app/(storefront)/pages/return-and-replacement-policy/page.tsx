import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Return and Replacement Policy | Nothing Official Pakistan",
  description:
    "Review Nothing's official return and replacement policy for defective products, inspection guidelines, and statutory rights.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/return-and-replacement-policy",
  },
  openGraph: {
    title: "Return and Replacement Policy | Nothing Official Pakistan",
    description:
      "Review Nothing's official return and replacement policy for defective products.",
    url: "https://www.nothingcmf.pk/pages/return-and-replacement-policy",
  },
};

export default function ReturnAndReplacementPolicyPage() {
  return <TermsClient initialPolicy="return-and-replacement-policy" />;
}
