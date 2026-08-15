import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { JsonLd } from "@/components/seo/json-ld";

/* ── SEO metadata (server component) ───────────────────────── */
export const metadata: Metadata = {
  title: "About Nothing Official Pakistan | SECP Registered Storefront",
  description:
    "Learn about Nothing Pakistan, the storefront operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company.",
  keywords: [
    "Nothing Pakistan",
    "Nothing products Pakistan",
    "SECP registered Nothing Pakistan",
    "Nothing Shop Pakistan",
    "Nothing store Pakistan",
    "About Nothing Pakistan",
    "NOTHING OFFICIAL (SMC-PRIVATE) LIMITED",
    "SECP registered Pakistani company",
  ],
  openGraph: {
    title: "About Nothing Official Pakistan | SECP Registered Storefront",
    description:
      "Learn about Nothing Pakistan, the storefront operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company.",
    url: "https://www.nothingcmf.pk/about-us",
    type: "website",
    images: [
      {
        url: "/nothing_pakistan.avif",
        width: 1200,
        height: 630,
        alt: "About Nothing Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nothing Official Pakistan | SECP Registered Storefront",
    description:
      "Learn about Nothing Pakistan, the storefront operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company.",
    images: ["/nothing_pakistan.avif"],
  },
  alternates: { canonical: "https://www.nothingcmf.pk/about-us" },
};

const sections = [
  {
    title: "Who We Are",
    body: "Nothing Pakistan is an online storefront created for customers in Pakistan who want a clearer way to discover Nothing and CMF phones, earbuds, chargers, cables, screen protectors, covers, and accessories. The storefront is operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company with CUIN 0337422. We publish this legal identity because customers deserve to know the business behind the website before they place an order, request support, or rely on product information.",
  },
  {
    title: "Why Nothing Pakistan Exists",
    body: "Nothing and CMF products have a distinctive design language, strong demand, and an active community of buyers who care about compatibility, packaging, charging standards, audio features, and model-specific accessories. In Pakistan, shoppers often need help checking which charger suits a phone, which protector fits a device, or whether an earbud model matches their usage. Nothing Pakistan exists to make that buying journey easier, more organized, and more transparent.",
  },
  {
    title: "Our Product Authenticity Approach",
    body: "Our authenticity approach starts with careful product selection, clear product pages, original-style packaging checks, invoices where applicable, and support that helps buyers confirm what they are ordering. We avoid exaggerated language and do not claim direct authorization from Nothing Technology Limited unless separate authorization proof is published. Instead, we focus on visible business identity, product detail quality, customer support, and practical buying guidance.",
  },
  {
    title: "Pakistan-Based Support",
    body: "Customers in Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and other cities need support that understands local delivery expectations and payment preferences. Nothing Pakistan provides WhatsApp-first communication, order confirmation, product compatibility help, and delivery guidance for Pakistani customers. Our goal is to reduce confusion before dispatch so customers receive the right product for the right device.",
  },
  {
    title: "Customer-First Policy",
    body: "A customer-first store makes important information easy to find before payment. That includes pricing in PKR, delivery expectations, return and refund rules, warranty guidance, support routes, and company verification. We encourage customers to ask questions before ordering and to review policy pages carefully, especially when ordering accessories for a specific phone model or buying higher-value products.",
  },
];

const operatingPrinciples = [
  "Publish the legal company name and SECP registration details openly.",
  "Use product pages to explain compatibility, delivery, returns, and support.",
  "Keep customer safety guidance professional and factual.",
  "Help buyers verify seller authenticity before placing an order.",
  "Avoid making authorization claims unless proof is published.",
];

const helpfulLinks = [
  { label: "Shop All", href: "/collections/shop-all" },
  { label: "Phones", href: "/collections/phones" },
  { label: "Audio", href: "/collections/audio" },
  { label: "Support Centre", href: "/support-centre" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Authenticity", href: "/authenticity" },
];

/* ── Page Component ────────────────────────────────────────── */
export default function AboutUsPage() {
  return (
    <div className="font-ntype82">
      <JsonLd
        type="organization"
        data={{
          name: "NOTHING OFFICIAL (SMC-PRIVATE) LIMITED",
          url: "https://www.nothingcmf.pk",
          logo: "https://www.nothingcmf.pk/nothing_logo.webp",
          telephone: WHATSAPP_NUMBER,
          sameAs: [],
        }}
      />
      <div className="min-h-screen overflow-x-hidden text-[#111] pt-20">
        <section className="border-b border-black/10 px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-screen-2xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            {/* Left — heading + subtitle */}
            <div className="max-w-4xl">
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/45">About Nothing Pakistan</p>
              <h1 className="mt-4 text-5xl font-semibold leading-[0.94] tracking-[-0.04em] text-black sm:text-6xl">
                A verified storefront for Nothing and CMF shoppers in Pakistan.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-black/68">
                Nothing Pakistan brings product discovery, support, delivery guidance, and company verification into one place. We serve customers who
                want to shop with clearer business identity, practical product information, and support rooted in Pakistan.
              </p>
            </div>

            {/* Right — SECP card */}
            <div className="rounded-[8px] border border-black/10 bg-white p-4 text-black">
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/46">SECP Registered Company</p>
              <p className="mt-2 text-sm leading-6 text-black/78">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED</p>
              <p className="mt-1 text-xs text-black/50">CUIN: 0337422</p>
              <Link
                href="/company-verification"
                className="mt-4 inline-flex h-9 items-center justify-center rounded-[8px] bg-black px-4 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-black/82"
              >
                View Certificate
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Content Grid ─────────────────────────────────── */}
        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-screen-2xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Main article */}
            <article className="space-y-8">
              {/* Direct Answer card */}
              <section className="rounded-[8px] border border-black/10 bg-white p-5">
                <p className="text-[10px] uppercase tracking-[0.26em] text-black/42">Direct Answer</p>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-black">Who operates Nothing Pakistan?</h2>
                <p className="mt-3 text-sm leading-7 text-black/68">
                  Nothing Pakistan is operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED, an SECP registered Pakistani company with CUIN 0337422. The
                  storefront publishes company verification, contact information, support routes, and policy pages so buyers can review business
                  identity before ordering.
                </p>
              </section>

              {/* Repeating content sections */}
              {sections.map((s) => (
                <section key={s.title} className="border-t border-black/10 pt-8">
                  <h2 className="text-3xl font-semibold tracking-[-0.03em] text-black">{s.title}</h2>
                  <p className="mt-5 text-sm leading-8 text-black/70">{s.body}</p>
                </section>
              ))}

              {/* What Customers Can Expect (multi-paragraph) */}
              <section className="border-t border-black/10 pt-8">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-black">What Customers Can Expect</h2>
                <div className="mt-5 space-y-5 text-sm leading-8 text-black/70">
                  <p>
                    Customers can expect product pages that explain pricing, key features, compatibility, delivery notes, WhatsApp ordering, and
                    return expectations. Collections are organized around phones, audio, chargers, protectors, accessories, CMF products, and the full
                    catalog so shoppers can move from a broad category to a specific product with fewer dead ends.
                  </p>
                  <p>
                    We also maintain a company verification page because brand trust is not just visual design. It is built through consistent
                    identity, support details, policy clarity, and responsible wording. Customers should verify seller authenticity before buying from
                    any online technology store, and we make that easier by linking our SECP certificate and company details from key pages.
                  </p>
                </div>
              </section>

              {/* Operating Principles */}
              <section className="border-t border-black/10 pt-8">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-black">Operating Principles</h2>
                <ul className="mt-6 grid gap-3">
                  {operatingPrinciples.map((p) => (
                    <li key={p} className="rounded-[8px] border border-black/10 bg-white p-4 text-sm leading-7 text-black/68">
                      {p}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Verification and Certificate */}
              <section className="border-t border-black/10 pt-8">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-black">Verification and Certificate</h2>
                <p className="mt-5 text-sm leading-8 text-black/70">
                  The company verification page lists the legal company name, CUIN, registered authority, incorporation date, company type, country,
                  website, CEO details, and certificate access. Customers can open the certificate directly from the verification page.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/company-verification"
                    className="inline-flex h-11 items-center justify-center rounded-[8px] bg-black px-5 text-[10px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
                  >
                    Company Verification
                  </Link>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-[8px] border border-black/12 px-5 text-[10px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
                    href="https://cdn.nothingshop.pk/nothing-official-pakistan-secp-certificate.pdf"
                  >
                    View Certificate PDF
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-[8px] border border-black/12 px-5 text-[10px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
                    href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}`}
                  >
                    WhatsApp Support
                  </a>
                </div>
              </section>
            </article>

            {/* ─── Sidebar ────────────────────────────────────── */}
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              {/* Legal Identity */}
              <section className="rounded-[8px] border border-black/10 bg-white p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-black/42">Legal Identity</p>
                <p className="mt-3 text-sm leading-7 text-black/74">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED</p>
                <p className="mt-2 text-sm text-black/58">CUIN 0337422</p>
              </section>

              {/* Helpful Links */}
              <section className="rounded-[8px] border border-black/10 bg-white p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-black/42">Helpful Links</p>
                <div className="mt-4 grid gap-2">
                  {helpfulLinks.map((link) => (
                    <Link
                      key={link.href}
                      className="rounded-[8px] border border-black/10 px-4 py-3 text-sm text-black/68 transition-colors hover:bg-black hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
