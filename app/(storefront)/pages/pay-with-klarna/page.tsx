import * as React from "react";
import type { Metadata } from "next";
import { TermsClient } from "@/app/(storefront)/pages/terms-of-sale/terms-client";

export const metadata: Metadata = {
  title: "Pay with Klarna | Nothing Official Pakistan",
  description:
    "Learn how to pay with Klarna, split purchases into flexible installment payments, and review terms.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/pay-with-klarna",
  },
  openGraph: {
    title: "Pay with Klarna | Nothing Official Pakistan",
    description: "Learn how to pay with Klarna on Nothing Official Pakistan.",
    url: "https://www.nothingcmf.pk/pages/pay-with-klarna",
  },
};

export default function PayWithKlarnaPage() {
  return <TermsClient initialPolicy="pay-with-klarna" />;
}
