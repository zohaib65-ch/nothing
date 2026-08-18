import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Nothing X Privacy Notice | Nothing Official Pakistan",
  description:
    "Learn how Nothing Technology Limited collects, uses, and protects your personal data when using the Nothing X application.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/nothing-x-privacy-notice",
  },
  openGraph: {
    title: "Nothing X Privacy Notice | Nothing Official Pakistan",
    description:
      "Learn how Nothing Technology Limited collects and protects your personal data.",
    url: "https://www.nothingcmf.pk/pages/nothing-x-privacy-notice",
  },
};

export default function NothingXPrivacyNoticePage() {
  return <TermsClient initialPolicy="nothing-x-privacy-notice" />;
}
