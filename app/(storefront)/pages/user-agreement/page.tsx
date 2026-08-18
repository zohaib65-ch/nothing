import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "User Agreement | Nothing Official Pakistan",
  description:
    "This User Agreement regulates the rights and obligations between you and Nothing when using the website, products, and services.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/user-agreement",
  },
  openGraph: {
    title: "User Agreement | Nothing Official Pakistan",
    description:
      "This User Agreement regulates the rights and obligations between you and Nothing when using the website, products, and services.",
    url: "https://www.nothingcmf.pk/pages/user-agreement",
  },
};

export default function UserAgreementPage() {
  return <TermsClient initialPolicy="user-agreement" />;
}
