"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

const quickLinks = [
  { label: "Product Guide", href: "/support-centre/product-guide" },
  { label: "Troubleshooting", href: "/support-centre/troubleshooting" },
  { label: "FAQs", href: "/support-centre/faqs" },
  { label: "After-Sales Service", href: "/support-centre/after-sales-service" },
  { label: "Software Download", href: "/support-centre/software-download" },
  { label: "Product Status", href: "/support-centre/product-status" },
  { label: "ASHA Accessibility", href: "/support-centre/asha" },
];

interface SupportClientProps {
  whatsappNumber: string;
  faqs: { question: string; answer: string }[];
}

export function SupportClient({ whatsappNumber, faqs }: SupportClientProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredFaqs = searchQuery.trim()
    ? faqs.filter((f) => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs;

  const whatsappClean = whatsappNumber.replace(/\+/g, "");

  return (
    <div data-hide-dots="true" className="min-h-screen overflow-x-hidden bg-[#f4f4f6] text-[#111]">
      <section className="relative flex items-center justify-center min-h-[520px] md:min-h-[650px] overflow-hidden px-6 pb-10 md:px-8 md:pb-14">
        <Image
          alt="Nothing Pakistan Support Centre hero with Nothing phone and audio products"
          src="https://cdn.nothingshop.pk/support-centre/support-centre-title-update-2160x1200.webp"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-10 w-full max-w-[900px] text-left">
          <h1 className="font-ntype text-[clamp(2.6rem,5vw,4.2rem)] font-medium leading-[0.92] text-black">Support Centre</h1>
          <p className="mt-4 max-w-[500px] text-[18px] text-black">
            Learn more about your Nothing Pakistan products, find answers, troubleshoot problems, request help and more.
          </p>
          <form
            role="search"
            className="mt-6 flex h-[40px] max-w-[520px] items-center gap-3 rounded-full bg-white/[0.97] px-4 transition-colors focus-within:border-black/16"
            onSubmit={(e) => e.preventDefault()}
          >
            <Search className="h-4 w-4 shrink-0 text-black/40" />
            <input
              type="search"
              placeholder="Search"
              aria-label="Search Nothing Pakistan support"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm font-ntype text-black outline-none placeholder:text-black/40"
            />
          </form>
        </div>
      </section>

      {/* ─── How Can We Help You? ─────────────────────────── */}
      <section className="px-6 py-14 md:px-8 md:py-16" aria-labelledby="support-help-title">
        <div className="mx-auto max-w-[990px]">
          <h2 id="support-help-title" className="font-ntype text-[clamp(1.35rem,2vw,1.85rem)] font-semibold text-black">
            How Can We Help You?
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex h-[56px] items-center justify-center font-[300] rounded-full border border-black bg-transparent px-6 text-center font-lattera text-sm md:text-[18px] text-black transition-all duration-300 ease-out hover:scale-x-105"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Questions ────────────────────────────── */}
      <section className="px-6 py-14 md:px-8 md:py-20" id="popular-questions" aria-labelledby="support-faq-title">
        <div className="mx-auto w-full max-w-[900px]">
          <h2 className="font-ntype text-[clamp(1.35rem,2vw,1.85rem)] font-semibold text-black">Popular Questions</h2>
          <div className="mt-4">
            <div className="faq-dot-line -mx-4 h-[4px]" />
            {filteredFaqs.map((faq, i) => (
              <article
                key={i}
                className="group relative cursor-pointer px-4 -mx-4 transition-colors hover:bg-[#dcdcdc]"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="py-4 md:py-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                    <h3 className="max-w-[900px] font-ntype font-medium text-[18px] text-black">{faq.question}</h3>
                    <button
                      type="button"
                      className="shrink-0 text-left font-ntype text-[clamp(0.78rem,1vw,0.95rem)] font-normal leading-none text-[#35548b] transition-opacity hover:opacity-70"
                      aria-expanded={expandedIndex === i}
                    >
                      ( {expandedIndex === i ? "Show Less" : "Read More"} )
                    </button>
                  </div>
                  {expandedIndex === i && (
                    <p className="mt-4 w-full md:w-1/2 font-ntype font-medium text-[18px] text-black whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
                <div className="faq-dot-line -mx-4 h-[4px]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Us ───────────────────────────────────── */}
      <section className="px-6 pb-20 md:px-8" id="contact-us" aria-labelledby="support-contact-title">
        <div className="mx-auto max-w-[900px]">
          <h2 id="support-contact-title" className="font-ntype text-[clamp(1.35rem,2vw,1.85rem)] font-semibold text-black">
            Contact Us
          </h2>

          {/* Dot separator */}
          <div className="faq-dot-line mt-5 h-3 w-full" />

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[560px] font-ntype text-sm md:text-[18px] text-black">
              Feel free to send us a message for further support. Our Nothing Pakistan team is on-hand to help.
            </p>
            <a
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] shrink-0 items-center justify-center rounded-full bg-[#002e6c] px-10 font-lattera text-[16px] uppercase text-white border-none transition-transform duration-300 ease-out hover:scale-x-105"
            >
              Send Us A Message
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
