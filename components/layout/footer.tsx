"use client";

import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/config";

const AboutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeDasharray="0 5"></circle>
    <line x1="12" y1="16" x2="12" y2="12" strokeDasharray="0 5"></line>
    <line x1="12" y1="8" x2="12.01" y2="8" strokeDasharray="0 5"></line>
  </svg>
);

const SupportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4C5 3.44772 4.55228 3 4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5C4.55228 5 5 4.55228 5 4Z" fill="currentColor"></path>
    <path d="M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7C4.55228 7 5 6.55228 5 6Z" fill="currentColor"></path>
    <path d="M7 2C7 1.44772 6.55228 1 6 1C5.44772 1 5 1.44772 5 2C5 2.55228 5.44772 3 6 3C6.55228 3 7 2.55228 7 2Z" fill="currentColor"></path>
    <path d="M9 2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2C7 2.55228 7.44772 3 8 3C8.55228 3 9 2.55228 9 2Z" fill="currentColor"></path>
    <path d="M11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2C9 2.55228 9.44772 3 10 3C10.5523 3 11 2.55228 11 2Z" fill="currentColor"></path>
    <path
      d="M13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5C12.5523 5 13 4.55228 13 4Z"
      fill="currentColor"
    ></path>
    <path
      d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7C12.5523 7 13 6.55228 13 6Z"
      fill="currentColor"
    ></path>
    <path d="M11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8C9 8.55228 9.44772 9 10 9C10.5523 9 11 8.55228 11 8Z" fill="currentColor"></path>
    <path d="M9 10C9 9.44772 8.55228 9 8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11C8.55228 11 9 10.5523 9 10Z" fill="currentColor"></path>
    <path
      d="M9 14C9 13.4477 8.55228 13 8 13C7.44772 13 7 13.4477 7 14C7 14.5523 7.44772 15 8 15C8.55228 15 9 14.5523 9 14Z"
      fill="currentColor"
    ></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M6 4C6.55228 4 7 3.55228 7 3C7 2.44772 6.55228 2 6 2C5.44772 2 5 2.44772 5 3C5 3.55228 5.44772 4 6 4Z" fill="currentColor"></path>
      <path
        d="M14 16C14.5523 16 15 15.5523 15 15C15 14.4477 14.5523 14 14 14C13.4477 14 13 14.4477 13 15C13 15.5523 13.4477 16 14 16Z"
        fill="currentColor"
      ></path>
      <path
        d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z"
        fill="currentColor"
      ></path>
      <path
        d="M14 14C14.5523 14 15 13.5523 15 13C15 12.4477 14.5523 12 14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14Z"
        fill="currentColor"
      ></path>
      <path
        d="M14 8C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8Z"
        fill="currentColor"
      ></path>
      <path
        d="M8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z"
        fill="currentColor"
      ></path>
      <path d="M6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10Z" fill="currentColor"></path>
      <path
        d="M10 10C10.5523 10 11 9.55228 11 9C11 8.44772 10.5523 8 10 8C9.44772 8 9 8.44772 9 9C9 9.55228 9.44772 10 10 10Z"
        fill="currentColor"
      ></path>
      <path
        d="M14 10C14.5523 10 15 9.55228 15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9C13 9.55228 13.4477 10 14 10Z"
        fill="currentColor"
      ></path>
      <path
        d="M2 16C2.55228 16 3 15.5523 3 15C3 14.4477 2.55228 14 2 14C1.44772 14 1 14.4477 1 15C1 15.5523 1.44772 16 2 16Z"
        fill="currentColor"
      ></path>
      <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" fill="currentColor"></path>
      <path
        d="M2 12C2.55228 12 3 11.5523 3 11C3 10.4477 2.55228 10 2 10C1.44772 10 1 10.4477 1 11C1 11.5523 1.44772 12 2 12Z"
        fill="currentColor"
      ></path>
      <path
        d="M2 14C2.55228 14 3 13.5523 3 13C3 12.4477 2.55228 12 2 12C1.44772 12 1 12.4477 1 13C1 13.5523 1.44772 14 2 14Z"
        fill="currentColor"
      ></path>
      <path d="M2 8C2.55228 8 3 7.55228 3 7C3 6.44772 2.55228 6 2 6C1.44772 6 1 6.44772 1 7C1 7.55228 1.44772 8 2 8Z" fill="currentColor"></path>
      <path d="M4 6C4.55228 6 5 5.55228 5 5C5 4.44772 4.55228 4 4 4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6Z" fill="currentColor"></path>
      <path
        d="M10 4C10.5523 4 11 3.55228 11 3C11 2.44772 10.5523 2 10 2C9.44772 2 9 2.44772 9 3C9 3.55228 9.44772 4 10 4Z"
        fill="currentColor"
      ></path>
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        fill="currentColor"
      ></path>
      <path
        d="M12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16Z"
        fill="currentColor"
      ></path>
      <path
        d="M10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16Z"
        fill="currentColor"
      ></path>
      <path
        d="M8 2C8.55228 2 9 1.55228 9 1C9 0.447715 8.55228 2.41411e-08 8 0C7.44772 -2.41411e-08 7 0.447715 7 1C7 1.55228 7.44772 2 8 2Z"
        fill="currentColor"
      ></path>
      <path
        d="M8 16C8.55228 16 9 15.5523 9 15C9 14.4477 8.55228 14 8 14C7.44772 14 7 14.4477 7 15C7 15.5523 7.44772 16 8 16Z"
        fill="currentColor"
      ></path>
      <path
        d="M6 16C6.55228 16 7 15.5523 7 15C7 14.4477 6.55228 14 6 14C5.44772 14 5 14.4477 5 15C5 15.5523 5.44772 16 6 16Z"
        fill="currentColor"
      ></path>
      <path
        d="M4 16C4.55228 16 5 15.5523 5 15C5 14.4477 4.55228 14 4 14C3.44772 14 3 14.4477 3 15C3 15.5523 3.44772 16 4 16Z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 4C13.5523 4 14 3.55228 14 3C14 2.44772 13.5523 2 13 2C12.4477 2 12 2.44772 12 3C12 3.55228 12.4477 4 13 4Z"
      fill="currentColor"
    ></path>
    <path
      d="M11 2C11.5523 2 12 1.55228 12 1C12 0.447715 11.5523 2.41411e-08 11 0C10.4477 -2.41411e-08 10 0.447715 10 1C10 1.55228 10.4477 2 11 2Z"
      fill="currentColor"
    ></path>
    <path
      d="M9 2C9.55228 2 10 1.55228 10 1C10 0.447715 9.55228 2.41411e-08 9 0C8.44772 -2.41411e-08 8 0.447715 8 1C8 1.55228 8.44772 2 9 2Z"
      fill="currentColor"
    ></path>
    <path
      d="M7 2C7.55228 2 8 1.55228 8 1C8 0.447715 7.55228 2.41411e-08 7 0C6.44772 -2.41411e-08 6 0.447715 6 1C6 1.55228 6.44772 2 7 2Z"
      fill="currentColor"
    ></path>
    <path
      d="M5 2C5.55228 2 6 1.55228 6 1C6 0.447715 5.55228 2.41411e-08 5 0C4.44772 -2.41411e-08 4 0.447715 4 1C4 1.55228 4.44772 2 5 2Z"
      fill="currentColor"
    ></path>
    <path d="M3 8C3.55228 8 4 7.55228 4 7C4 6.44772 3.55228 6 3 6C2.44772 6 2 6.44772 2 7C2 7.55228 2.44772 8 3 8Z" fill="currentColor"></path>
    <path
      d="M8 16C8.55228 16 9 15.5523 9 15C9 14.4477 8.55228 14 8 14C7.44772 14 7 14.4477 7 15C7 15.5523 7.44772 16 8 16Z"
      fill="currentColor"
    ></path>
    <path
      d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14Z"
      fill="currentColor"
    ></path>
    <path
      d="M11 12C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10C10.4477 10 10 10.4477 10 11C10 11.5523 10.4477 12 11 12Z"
      fill="currentColor"
    ></path>
    <path
      d="M5 12C5.55228 12 6 11.5523 6 11C6 10.4477 5.55228 10 5 10C4.44772 10 4 10.4477 4 11C4 11.5523 4.44772 12 5 12Z"
      fill="currentColor"
    ></path>
    <path d="M3 10C3.55228 10 4 9.55228 4 9C4 8.44772 3.55228 8 3 8C2.44772 8 2 8.44772 2 9C2 9.55228 2.44772 10 3 10Z" fill="currentColor"></path>
    <path
      d="M13 10C13.5523 10 14 9.55228 14 9C14 8.44772 13.5523 8 13 8C12.4477 8 12 8.44772 12 9C12 9.55228 12.4477 10 13 10Z"
      fill="currentColor"
    ></path>
    <path d="M7 6C7.55228 6 8 5.55228 8 5C8 4.44772 7.55228 4 7 4C6.44772 4 6 4.44772 6 5C6 5.55228 6.44772 6 7 6Z" fill="currentColor"></path>
    <path d="M9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6Z" fill="currentColor"></path>
    <path d="M9 8C9.55228 8 10 7.55228 10 7C10 6.44772 9.55228 6 9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8Z" fill="currentColor"></path>
    <path d="M7 8C7.55228 8 8 7.55228 8 7C8 6.44772 7.55228 6 7 6C6.44772 6 6 6.44772 6 7C6 7.55228 6.44772 8 7 8Z" fill="currentColor"></path>
    <path
      d="M7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z"
      fill="currentColor"
    ></path>
    <path d="M3 6C3.55228 6 4 5.55228 4 5C4 4.44772 3.55228 4 3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6Z" fill="currentColor"></path>
    <path d="M3 4C3.55228 4 4 3.55228 4 3C4 2.44772 3.55228 2 3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4Z" fill="currentColor"></path>
    <path
      d="M13 6C13.5523 6 14 5.55228 14 5C14 4.44772 13.5523 4 13 4C12.4477 4 12 4.44772 12 5C12 5.55228 12.4477 6 13 6Z"
      fill="currentColor"
    ></path>
    <path
      d="M13 8C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6C12.4477 6 12 6.44772 12 7C12 7.55228 12.4477 8 13 8Z"
      fill="currentColor"
    ></path>
  </svg>
);

const footerNavLinks = [
  { label: "Shop all", href: "/collections/shop-all" },
  { label: "Phones", href: "/collections/phones" },
  { label: "Chargers", href: "/collections/chargers" },
  { label: "Audio", href: "/collections/audio" },
  { label: "Watches", href: "/collections/watches" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Apparel", href: "/collections/apparel" },
];

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}`;

  const actionLinks = [
    { label: "About", href: "/about-us", external: false, icon: <AboutIcon /> },
    { label: "Support", href: "/support-centre", external: false, icon: <SupportIcon /> },
    { label: "Contact on WhatsApp", href: whatsappUrl, external: true, icon: <WhatsAppIcon /> },
  ];

  const bottomLinks = [
    { label: "Playground", href: "https://playground.nothing.tech", external: true },
    { label: "Contact", href: whatsappUrl, external: true },
    { label: "Careers", href: "https://careers.nothing.tech", external: true },
    { label: "Legal", href: "/pages/terms-of-sale", external: false },
  ];

  return (
    <footer className="bg-black text-white uppercase" style={{ fontFamily: "var(--font-ndot57), sans-serif" }}>
      {/* ═══ DESKTOP FOOTER ═══ */}
      <div className="hidden lg:block">
        <div className="relative overflow-hidden rounded-t-[28px] border-t border-white/10 bg-[#020202]">
          <div className="relative min-h-[920px] px-10 pb-8 pt-10  xl:px-12">
            <div className="mx-auto flex w-full max-w-[1220px] flex-col items-center text-center">
              <div className="flex w-full max-w-[560px] flex-col items-center">
                {/* Big Nav Links */}
                <nav className="flex flex-col items-center gap-7">
                  {footerNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      className="dot-heading text-[clamp(2.55rem,3.25vw,1.3rem)] uppercase leading-[0.88] tracking-[0.02em] text-white transition-opacity hover:opacity-72"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Action Button Cards */}
                <div className="mt-18 grid w-full max-w-[312px] gap-0.5 text-left">
                  {actionLinks.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        className="flex h-[44px] items-center justify-between rounded-[8px] bg-white/[0.06] px-5 transition-colors hover:bg-white/[0.09]"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-[10px] uppercase tracking-[0.08em] text-white" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                          {link.label}
                        </span>
                        {link.icon}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        className="flex h-[44px] items-center justify-between rounded-[8px] bg-white/[0.06] px-5 transition-colors hover:bg-white/[0.09]"
                        href={link.href}
                      >
                        <span className="text-[10px] uppercase tracking-[0.08em] text-white" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                          {link.label}
                        </span>
                        {link.icon}
                      </Link>
                    ),
                  )}
                  <button
                    type="button"
                    className="flex h-[44px] items-center justify-between rounded-[8px] bg-white/[0.06] px-5 text-[10px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/[0.09]"
                    style={{ fontFamily: "var(--font-lettera-regular)" }}
                  >
                    <span>Store: Pakistan</span>
                    <GlobeIcon />
                  </button>
                </div>
              </div>

              {/* SECP Company Card */}
              <div className="mt-8 w-full max-w-[312px] rounded-[8px] bg-white/[0.06] p-4 text-left text-white">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/58">SECP Registered Company</p>
                <p className="mt-2 text-sm leading-6 text-white/88">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED</p>
                <p className="mt-1 text-xs text-white/58">CUIN: 0337422</p>
                <Link
                  className="mt-3 inline-block text-[10px] uppercase tracking-[0.2em] underline-offset-4 hover:underline text-white"
                  href="/company-verification"
                >
                  View Certificate
                </Link>
              </div>

              {/* Bottom Links Row */}
              <div className="mt-10 flex w-full max-w-[1220px] items-start justify-between gap-10">
                <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-left">
                  {bottomLinks.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] tracking-[0.14em] text-white/72 transition-colors hover:text-white"
                        style={{ fontFamily: "var(--font-lettera-regular)" }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        className="text-[11px] tracking-[0.14em] text-white/72 transition-colors hover:text-white"
                        style={{ fontFamily: "var(--font-lettera-regular)" }}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-end gap-x-10 gap-y-3 text-right">
                  <span className="cursor-default text-[11px] tracking-[0.14em] text-white/72" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                    Facebook
                  </span>
                  <span className="cursor-default text-[11px] tracking-[0.14em] text-white/72" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                    TikTok
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE FOOTER ═══ */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden rounded-t-[24px] border-t border-white/10 bg-[#020202] px-6 pb-7 pt-14 text-center">
          {/* Mobile Nav Links */}
          <nav className="flex flex-col items-center gap-3">
            {footerNavLinks.map((link) => (
              <Link
                key={link.label}
                className="dot-heading text-[28px] uppercase leading-[0.92] tracking-[0.02em] text-white transition-opacity hover:opacity-72"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Action Cards */}
          <div className="mx-auto mt-10 grid max-w-[320px] gap-2 text-left">
            {actionLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  className="flex h-[52px] items-center justify-between rounded-[10px] bg-white/[0.06] px-4 transition-colors hover:bg-white/[0.09]"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-[10px] uppercase tracking-[0.08em] text-white" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                    {link.label}
                  </span>
                  {link.icon}
                </a>
              ) : (
                <Link
                  key={link.label}
                  className="flex h-[52px] items-center justify-between rounded-[10px] bg-white/[0.06] px-4 transition-colors hover:bg-white/[0.09]"
                  href={link.href}
                >
                  <span className="text-[10px] uppercase tracking-[0.08em] text-white" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                    {link.label}
                  </span>
                  {link.icon}
                </Link>
              ),
            )}
            <button
              type="button"
              className="flex h-[52px] items-center justify-between rounded-[10px] bg-white/[0.06] px-4 text-[10px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/[0.09]"
              style={{ fontFamily: "var(--font-lettera-regular)" }}
            >
              <span>Store: Pakistan</span>
              <GlobeIcon />
            </button>
          </div>

          {/* Mobile SECP Card */}
          <div className="mx-auto mt-7 max-w-[320px] rounded-[8px] border border-white/12 bg-white/[0.06] p-4 text-left text-white">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/58">SECP Registered Company</p>
            <p className="mt-2 text-sm leading-6 text-white/88">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED</p>
            <p className="mt-1 text-xs text-white/58">CUIN: 0337422</p>
            <Link
              className="mt-3 inline-block text-[10px] uppercase tracking-[0.2em] underline-offset-4 hover:underline text-white"
              href="/company-verification"
            >
              View Certificate
            </Link>
          </div>

          {/* Mobile Bottom Links */}
          <div className="mx-auto mt-8 grid w-full max-w-[320px] grid-cols-2 gap-x-6 gap-y-3">
            <div className="flex flex-col items-start gap-3 text-left">
              {bottomLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] tracking-[0.14em] text-white/72 transition-colors hover:text-white"
                    style={{ fontFamily: "var(--font-lettera-regular)" }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    className="text-[10px] tracking-[0.14em] text-white/72 transition-colors hover:text-white"
                    style={{ fontFamily: "var(--font-lettera-regular)" }}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
            <div className="flex flex-col items-end gap-3 text-right">
              <span className="cursor-default text-[10px] tracking-[0.14em] text-white/72" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                Facebook
              </span>
              <span className="cursor-default text-[10px] tracking-[0.14em] text-white/72" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                TikTok
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
