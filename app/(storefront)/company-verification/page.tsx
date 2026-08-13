import * as React from "react";
import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { VerificationClient } from "./verification-client";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Company Verification | Nothing Official Pakistan",
  description:
    "Verify the legal registration details of Nothing Pakistan, operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED. View SECP CUIN registration and certification details.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/company-verification",
  },
  openGraph: {
    title: "Company Verification | Nothing Official Pakistan",
    description:
      "Verify the legal registration details of Nothing Pakistan, operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED. View SECP CUIN registration and certification details.",
    url: "https://www.nothingcmf.pk/company-verification",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing Pakistan Company Verification",
      },
    ],
  },
};

const faqs = [
  {
    question: "Is Nothing Pakistan a registered company?",
    answer:
      "Yes. Nothing Pakistan is operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company with CUIN 0337422. This verification page is published so customers can confidently confirm the registered business identity behind the website before placing an order.",
  },
  {
    question: "What is the legal company name behind Nothing Pakistan?",
    answer:
      "The official registered company name is NOTHING OFFICIAL (SMC-PRIVATE) LIMITED. Nothing Pakistan is the customer-facing storefront for the company, used for product discovery, online shopping, customer support, delivery updates, and after-sales communication in Pakistan.",
  },
  {
    question: "Is Nothing Pakistan the official registered Nothing business in Pakistan?",
    answer:
      "Nothing Pakistan is operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, whose registered company name includes Nothing Official and whose SECP registration is published openly on this website. Customers can use this page to verify the company name, CUIN, certificate, and business information.",
  },
  {
    question: "How can customers verify the company registration?",
    answer:
      "Customers can verify the company by checking the legal name NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, CUIN 0337422, incorporation date, and SECP certificate linked on this page. The same verification link is also available from the website footer for quick access.",
  },
  {
    question: "Why should customers buy from Nothing Pakistan?",
    answer:
      "Customers choose Nothing Pakistan because the store shows a clear Pakistani business identity, product information, support channels, delivery expectations, and company verification. The goal is to make Nothing and CMF shopping in Pakistan more transparent and easier to trust.",
  },
  {
    question: "Who is the CEO of Nothing Pakistan?",
    answer:
      "Usman Afzal is the CEO of Nothing Pakistan. He leads the company focus on verified business identity, clear customer support, transparent product listings, and a reliable shopping experience for customers across Pakistan.",
  },
  {
    question: "Does Nothing Pakistan provide support after purchase?",
    answer:
      "Yes. Nothing Pakistan provides customer support through the website, WhatsApp, phone, and email channels listed on the contact page. Customers can contact the team for order updates, product questions, delivery details, and return or replacement guidance.",
  },
  {
    question: "Can customers view the SECP certificate?",
    answer:
      "Yes. The SECP certificate is available from this Company Verification page through the View SECP Certificate button. Publishing the certificate helps customers confirm the registered company information without needing to search across multiple pages.",
  },
  {
    question: "Does Nothing Pakistan deliver across Pakistan?",
    answer:
      "Yes. Nothing Pakistan serves customers across Pakistan, subject to product availability, delivery coverage, and order confirmation. Delivery details are shared during checkout or support communication so customers know what to expect before payment and dispatch.",
  },
  {
    question: "How does company verification help customers shop safely?",
    answer:
      "Company verification helps customers know the registered Pakistani business behind the website, the legal company name, and the support channels before ordering. It adds accountability and makes the buying process clearer from product selection to delivery and support.",
  },
];

export default function CompanyVerificationPage() {
  return (
    <>
      <JsonLd type="faq" data={{ faqs }} />
      <VerificationClient whatsappNumber={WHATSAPP_NUMBER} faqs={faqs} />
    </>
  );
}
