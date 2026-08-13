import * as React from "react";
import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { SupportClient } from "./support-client";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Support Centre | Nothing Official Pakistan",
  description:
    "Get help with your Nothing & CMF devices. View FAQs, OTA updates instructions, troubleshooting steps, and contact official customer support in Pakistan.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/support-centre",
  },
  openGraph: {
    title: "Support Centre | Nothing Official Pakistan",
    description:
      "Get help with your Nothing & CMF devices. View FAQs, OTA updates instructions, troubleshooting steps, and contact official customer support in Pakistan.",
    url: "https://www.nothingcmf.pk/support-centre",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Support Centre",
      },
    ],
  },
};

const faqs = [
  {
    question: "How to install the latest Phone OS via OTA?",
    answer:
      "Connect to stable Wi-Fi, keep battery above 50%, then open Settings > System > System updates. Download and install the update when it appears.",
  },
  {
    question: "How to turn on Android Auto on my Nothing phone?",
    answer:
      "Check your car supports Android Auto, then open Settings > Connected devices > Connection preferences > Android Auto. Use a quality data cable and allow the required permissions.",
  },
  {
    question: "How to pair my Nothing Ear or Ear (a) with my phone?",
    answer:
      "Open the charging case, hold the case button for 3 seconds, then connect from your phone Bluetooth settings. If Fast Pair appears, follow the popup prompt.",
  },
  {
    question: "How to activate the ChatGPT feature on my Nothing Headphone?",
    answer:
      "Update your Nothing phone and Nothing X app, install and sign in to ChatGPT, then assign ChatGPT in Nothing X > Controls > Voice AI.",
  },
  {
    question: "How to add lock screen widgets on my Nothing phone?",
    answer: "Open Settings > Lock screen > Lockscreen widgets, then add and arrange widgets as needed.",
  },
];

export default function SupportCentrePage() {
  return (
    <>
      <JsonLd type="faq" data={{ faqs }} />
      <SupportClient whatsappNumber={WHATSAPP_NUMBER} faqs={faqs} />
    </>
  );
}
