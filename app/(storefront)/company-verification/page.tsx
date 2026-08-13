import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { VerificationClient } from "./verification-client";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Company Verification | Nothing CMF Official Pakistan",
  description:
    "Verify the legal registration details of Nothing CMF Pakistan (www.nothingcmf.pk), operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED. View SECP CUIN registration and certification details.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/company-verification",
  },
  openGraph: {
    title: "Company Verification | Nothing CMF Official Pakistan",
    description:
      "Verify the legal registration details of Nothing CMF Pakistan (www.nothingcmf.pk), operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED. View SECP CUIN registration and certification details.",
    url: "https://www.nothingcmf.pk/company-verification",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "Nothing CMF Pakistan Company Verification",
      },
    ],
  },
};

const faqs = [
  {
    question: "Is Nothing CMF Pakistan a registered company?",
    answer:
      "Yes. Nothing CMF Pakistan (www.nothingcmf.pk) is operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company with CUIN 0337422. This verification page is published so customers can confidently confirm the registered business identity behind the website before placing an order.",
  },
  {
    question: "What is the legal company name behind Nothing CMF Pakistan?",
    answer:
      "The official registered company name is NOTHING OFFICIAL (SMC-PRIVATE) LIMITED. Nothing CMF Pakistan is the customer-facing storefront for the company, used for Nothing phones, CMF accessories, online shopping, customer support, delivery updates, and after-sales communication in Pakistan.",
  },
  {
    question: "Is Nothing CMF Pakistan the official registered Nothing & CMF business in Pakistan?",
    answer:
      "Nothing CMF Pakistan is operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, whose registered company name includes Nothing Official and whose SECP registration is published openly on this website. Customers can use this page to verify the company name, CUIN, certificate, and business information.",
  },
  {
    question: "Who brought Nothing & CMF to Pakistan?",
    answer:
      "Nothing and CMF were brought to Pakistan by Software Suite as its official distributor, establishing official distribution, local warranty, and customer support for Nothing phones and CMF products across Pakistan.",
  },
  {
    question: "Is Software Suite the distributor of Nothing & CMF in Pakistan?",
    answer:
      "Yes. Software Suite is the distributor that brought Nothing & CMF to Pakistan, operating Nothing CMF Pakistan (www.nothingcmf.pk) and NOTHING OFFICIAL (SMC-PRIVATE) LIMITED to provide authentic Nothing phones, CMF accessories, and after-sales support.",
  },
  {
    question: "How can customers verify the company registration?",
    answer:
      "Customers can verify the company by checking the legal name NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, CUIN 0337422, incorporation date, and SECP certificate linked on this page. The same verification link is also available from the website footer for quick access.",
  },
  {
    question: "Why should customers buy from Nothing CMF Pakistan?",
    answer:
      "Customers choose Nothing CMF Pakistan because the store shows a clear Pakistani business identity, official Nothing and CMF product listings, support channels, delivery expectations, and company verification. The goal is to make Nothing and CMF shopping in Pakistan transparent and trustworthy.",
  },
  {
    question: "Who is the CEO of Nothing Pakistan?",
    answer:
      "Shehroz Khan is the CEO of Nothing Pakistan. He leads the company focus on verified business identity, clear customer support, transparent product listings, and a reliable shopping experience for customers across Pakistan.",
  },
  {
    question: "Does Nothing CMF Pakistan provide support after purchase?",
    answer:
      "Yes. Nothing CMF Pakistan provides customer support through the website, WhatsApp, phone, and email channels listed on the contact page. Customers can contact the team for order updates, product questions, delivery details, and return or replacement guidance.",
  },
  {
    question: "Can customers view the SECP certificate?",
    answer:
      "Yes. The SECP certificate is available from this Company Verification page through the View SECP Certificate button. Publishing the certificate helps customers confirm the registered company information without needing to search across multiple pages.",
  },
  {
    question: "Does Nothing CMF Pakistan deliver across Pakistan?",
    answer:
      "Yes. Nothing CMF Pakistan serves customers across Pakistan, subject to product availability, delivery coverage, and order confirmation. Delivery details are shared during checkout or support communication so customers know what to expect before payment and dispatch.",
  },
  {
    question: "How does company verification help customers shop safely?",
    answer:
      "Company verification helps customers know the registered Pakistani business behind www.nothingcmf.pk, the legal company name, and the support channels before ordering. It adds accountability and makes the buying process clearer from product selection to delivery and support.",
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
