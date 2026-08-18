import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Nothing X Terms of Service | Nothing Official Pakistan",
  description:
    "Terms of service governing the use of the Nothing X mobile companion application for audio, hearable, and wearable device control.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/nothing-x-terms-of-service",
  },
  openGraph: {
    title: "Nothing X Terms of Service | Nothing Official Pakistan",
    description:
      "Terms of service governing the use of the Nothing X application.",
    url: "https://www.nothingcmf.pk/pages/nothing-x-terms-of-service",
  },
};

export default function NothingXTermsPage() {
  return <TermsClient initialPolicy="nothing-x-terms-of-service" />;
}
