import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Privacy Policy | Nothing Official Pakistan",
  description:
    "Review Nothing Technology's Privacy Policy to understand how your Personal Data is collected, processed, protected, and your statutory data rights.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Nothing Official Pakistan",
    description:
      "Review Nothing Technology's Privacy Policy to understand how your Personal Data is handled.",
    url: "https://www.nothingcmf.pk/pages/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <TermsClient initialPolicy="privacy-policy" />;
}
