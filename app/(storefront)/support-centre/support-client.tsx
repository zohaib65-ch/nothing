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
];

interface SupportClientProps {
  whatsappNumber: string;
  faqs: { question: string; answer: string }[];
}

export function SupportClient({ whatsappNumber, faqs }: SupportClientProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredFaqs = searchQuery.trim()
    ? faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const whatsappClean = whatsappNumber.replace(/\+/g, "");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f4f6] text-[#111]">
      <section className="relative flex items-end justify-center min-h-[520px] md:min-h-[650px] overflow-hidden px-6 pb-10 md:px-8 md:pb-14">
        <Image
          alt="Nothing Pakistan Support Centre hero with Nothing phone and audio products"
          src="https://cdn.nothingshop.pk/support-centre/support-centre-title-update-2160x1200.webp"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="relative z-10 w-full max-w-[760px] text-left">
          <h1 className="font-ntype text-[clamp(2.6rem,5vw,4.2rem)] font-medium leading-[0.92] tracking-[-0.04em] text-black">
            Support Centre
          </h1>
          <p className="mt-4 max-w-[500px] text-sm leading-[1.8] text-black/60">
            Learn more about your Nothing Pakistan products, find answers, troubleshoot problems, request help and more.
          </p>
          <form
            role="search"
            className="mt-6 flex h-[48px] max-w-[520px] items-center gap-3 rounded-[10px] border border-black/8 bg-white/[0.97] px-4 shadow-sm transition-colors focus-within:border-black/16"
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
        <div className="mx-auto max-w-[1180px]">
          <h2
            id="support-help-title"
            className="font-ntype text-[clamp(1.35rem,2vw,1.85rem)] font-normal leading-none tracking-normal text-black"
          >
            How Can We Help You?
          </h2>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex h-[56px] items-center justify-center rounded-full border border-black/12 bg-transparent px-6 text-center font-lattera text-[11px] tracking-[0.18em] text-black/70 transition-colors hover:bg-black hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Questions ────────────────────────────── */}
      <section className="px-6 py-14 md:px-8 md:py-20" id="popular-questions" aria-labelledby="support-faq-title">
        <div className="mx-auto w-full max-w-[1180px]">
          <h2 className="font-ntype text-[clamp(1.35rem,2vw,1.85rem)] font-normal leading-none tracking-normal text-black">
            Popular Questions
          </h2>
          <div className="mt-6">
            {/* Top dot separator */}
            <div className="faq-dot-line h-3 w-full" />

            {filteredFaqs.map((faq, i) => (
              <article key={i} className="py-4 md:py-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                  <h3 className="max-w-[900px] font-ntype text-[clamp(0.82rem,1.05vw,1rem)] font-normal leading-[1.35] text-black">
                    {faq.question}
                  </h3>
                  <button
                    type="button"
                    className="shrink-0 text-left font-ntype text-[clamp(0.78rem,1vw,0.95rem)] font-normal leading-none text-[#35548b] transition-opacity hover:opacity-70"
                    aria-expanded={expandedIndex === i}
                    onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  >
                    ( {expandedIndex === i ? "Show Less" : "Read More"} )
                  </button>
                </div>
                {expandedIndex === i && <p className="mt-4 max-w-[900px] text-sm leading-7 text-black/68">{faq.answer}</p>}
                {/* Dot separator */}
                <div className="faq-dot-line mt-4 h-3 w-full md:mt-5" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Us ───────────────────────────────────── */}
      <section className="px-6 pb-20 md:px-8" id="contact-us" aria-labelledby="support-contact-title">
        <div className="mx-auto max-w-[1180px]">
          <h2
            id="support-contact-title"
            className="font-ntype text-[clamp(1.35rem,2vw,1.85rem)] font-normal leading-none text-black"
          >
            Contact Us
          </h2>

          {/* Dot separator */}
          <div className="faq-dot-line mt-5 h-3 w-full" />

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[560px] font-ntype text-sm leading-[1.7] text-black/60">
              Feel free to send us a message for further support. Our Nothing Pakistan team is on-hand to help.
            </p>
            <a
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] shrink-0 items-center justify-center rounded-full bg-[#1a2b4a] px-10 font-lattera text-[11px] uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85"
            >
              Send Us A Message
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
