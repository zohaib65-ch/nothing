"use client";

import Link from "next/link";

const footerNavLinks = [
  { label: "Shop all", href: "/collections/shop-all" },
  { label: "Phones", href: "/collections/phones" },
  { label: "Chargers", href: "/collections/chargers" },
  { label: "Offers", href: "/collections/offers" },
  { label: "Audio", href: "/collections/audio" },
  { label: "Watches", href: "/collections/watches" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "CMF", href: "/collections/cmf" },
];

const actionLinks = [
  { label: "About", href: "/about-us" },
  { label: "Support", href: "/support-centre" },
  { label: "Contact on WhatsApp", href: "/contact" },
];

const bottomLinks = [
  { label: "Playground", href: "https://playground.nothing.tech", external: true },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "https://careers.nothing.tech", external: true },
  { label: "Legal", href: "/pages/terms-of-sale" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white uppercase" style={{ fontFamily: "var(--font-ndot57), sans-serif" }}>

      {/* ═══ DESKTOP FOOTER ═══ */}
      <div className="hidden lg:block">
        <div className="relative overflow-hidden rounded-t-[28px] border-t border-white/10 bg-[#020202]">
          <div className="relative min-h-[920px] px-10 pb-8 pt-10 xl:min-h-[980px] xl:px-12">
            <div className="mx-auto flex w-full max-w-[1220px] flex-col items-center text-center">
              <div className="flex w-full max-w-[560px] flex-col items-center">

                {/* Big Nav Links */}
                <nav className="flex flex-col items-center gap-7">
                  {footerNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      className="dot-heading text-[clamp(2.55rem,3.25vw,4.3rem)] uppercase leading-[0.88] tracking-[0.02em] text-white transition-opacity hover:opacity-72"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Action Button Cards */}
                <div className="mt-24 grid w-full max-w-[512px] gap-2.5 text-left">
                  {actionLinks.map((link) => (
                    <Link
                      key={link.label}
                      className="flex h-[54px] items-center justify-between rounded-[10px] bg-white/[0.06] px-5 transition-colors hover:bg-white/[0.09]"
                      href={link.href}
                    >
                      <span className="text-[11px] uppercase tracking-[0.08em] text-white" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                        {link.label}
                      </span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    className="flex h-[54px] items-center justify-between rounded-[10px] bg-white/[0.06] px-5 text-[11px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/[0.09]"
                    style={{ fontFamily: "var(--font-lettera-regular)" }}
                  >
                    <span>Pakistan</span>
                  </button>
                </div>
              </div>

              {/* SECP Company Card */}
              <div className="mt-8 w-full max-w-[512px] rounded-[8px] border border-white/12 bg-white/[0.06] p-4 text-left text-white">
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
                    )
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-end gap-x-10 gap-y-3 text-right">
                  <span className="cursor-default text-[11px] tracking-[0.14em] text-white/72" style={{ fontFamily: "var(--font-lettera-regular)" }}>Facebook</span>
                  <span className="cursor-default text-[11px] tracking-[0.14em] text-white/72" style={{ fontFamily: "var(--font-lettera-regular)" }}>TikTok</span>
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
            {actionLinks.map((link) => (
              <Link
                key={link.label}
                className="flex h-[52px] items-center justify-between rounded-[10px] bg-white/[0.06] px-4 transition-colors hover:bg-white/[0.09]"
                href={link.href}
              >
                <span className="text-[10px] uppercase tracking-[0.08em] text-white" style={{ fontFamily: "var(--font-lettera-regular)" }}>
                  {link.label}
                </span>
              </Link>
            ))}
            <button
              type="button"
              className="flex h-[52px] items-center justify-between rounded-[10px] bg-white/[0.06] px-4 text-[10px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/[0.09]"
              style={{ fontFamily: "var(--font-lettera-regular)" }}
            >
              <span>Pakistan</span>
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
                )
              )}
            </div>
            <div className="flex flex-col items-end gap-3 text-right">
              <span className="cursor-default text-[10px] tracking-[0.14em] text-white/72" style={{ fontFamily: "var(--font-lettera-regular)" }}>Facebook</span>
              <span className="cursor-default text-[10px] tracking-[0.14em] text-white/72" style={{ fontFamily: "var(--font-lettera-regular)" }}>TikTok</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
