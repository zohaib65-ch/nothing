import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutClient } from "./about-client";

/* ── SEO metadata (server component) ───────────────────────── */
export const metadata: Metadata = {
  title: "About Nothing | Nothing Pakistan",
  description:
    "Nothing builds smartphones, audio products and AI tools that look good and make life easier. Operated in Pakistan by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered company.",
  keywords: [
    "Nothing About",
    "About Nothing Pakistan",
    "Nothing smartphones",
    "Nothing audio",
    "SECP registered Nothing Pakistan",
    "NOTHING OFFICIAL (SMC-PRIVATE) LIMITED",
  ],
  openGraph: {
    title: "About Nothing | Nothing Pakistan",
    description:
      "Nothing builds smartphones, audio products and AI tools that look good and make life easier.",
    url: "https://www.nothingcmf.pk/about-us",
    type: "website",
    images: [
      {
        url: "https://cdn.sanity.io/images/gtd4w1cq/production/9816397850f1d8f8602df709eb07c4109bf0dce8-2000x2000.webp",
        width: 1200,
        height: 630,
        alt: "About Nothing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nothing | Nothing Pakistan",
    description:
      "Nothing builds smartphones, audio products and AI tools that look good and make life easier.",
    images: ["https://cdn.sanity.io/images/gtd4w1cq/production/9816397850f1d8f8602df709eb07c4109bf0dce8-2000x2000.webp"],
  },
  alternates: { canonical: "https://www.nothingcmf.pk/about-us" },
};

export default function AboutUsPage() {
  return (
    <>
      <JsonLd
        type="organization"
        data={{
          name: "NOTHING OFFICIAL (SMC-PRIVATE) LIMITED",
          url: "https://www.nothingcmf.pk",
          logo: "https://www.nothingcmf.pk/nothing_logo.webp",
          telephone: WHATSAPP_NUMBER,
          sameAs: [
            "https://twitter.com/nothing",
            "https://www.instagram.com/nothing",
            "https://www.tiktok.com/@nothing",
            "https://youtube.com/c/NothingTechnology",
          ],
        }}
      />
      <AboutClient />
    </>
  );
}
