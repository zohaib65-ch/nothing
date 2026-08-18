import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Nothing Contest Terms and Conditions | Nothing Official Pakistan",
  description:
    "Review the official Nothing contest terms, eligibility criteria, prize distribution, and participation guidelines.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/nothing-contest-terms-conditions",
  },
  openGraph: {
    title: "Nothing Contest Terms and Conditions | Nothing Official Pakistan",
    description:
      "Review the official Nothing contest terms, eligibility criteria, and participation guidelines.",
    url: "https://www.nothingcmf.pk/pages/nothing-contest-terms-conditions",
  },
};

export default function ContestTermsPage() {
  return <TermsClient initialPolicy="contest-terms" />;
}
