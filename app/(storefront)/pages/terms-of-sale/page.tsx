import * as React from "react";
import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Sale | Nothing Official Pakistan",
  description:
    "These Terms of Sale govern product purchases made through the Nothing Pakistan, including pricing, delivery, returns, and warranty handling.",
  alternates: {
    canonical: "https://www.nothingcmf.pk/pages/terms-of-sale",
  },
  openGraph: {
    title: "Terms of Sale | Nothing Official Pakistan",
    description:
      "These Terms of Sale govern product purchases made through the Nothing Pakistan, including pricing, delivery, returns, and warranty handling.",
    url: "https://www.nothingcmf.pk/pages/terms-of-sale",
  },
};

export default function TermsOfSalePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f5f8] text-[#111] px-4 pb-16 pt-24 md:pb-24 font-sans">
      <section className="mx-auto grid w-full max-w-screen-2xl gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-black/10 bg-transparent p-5">
          <p className="font-mono text-xs uppercase tracking-[0.10em] text-black/55">Nothing Official Pakistan</p>
          <h1 className="mt-3 text-3xl font-normal leading-tight tracking-tight text-black">Terms of Sale</h1>
          <p className="mt-4 text-sm leading-7 text-black/70 font-normal">
            These Terms of Sale govern product purchases made through the Nothing Pakistan, including pricing, delivery, returns, and warranty
            handling.
          </p>
          <div className="mt-5 grid gap-2 text-xs leading-6 text-black/65 font-normal">
            <p>
              <span className="text-black/80">Legal:</span> NOTHING OFFICIAL (SMC-PRIVATE) LIMITED
            </p>
            <p>
              <span className="text-black/80">SECP:</span> CUIN 0337422
            </p>
            <p>
              <span className="text-black/80">Effective:</span> May 19, 2026
            </p>
            <p>
              <span className="text-black/80">Updated:</span> May 19, 2026
            </p>
          </div>
          {/* <nav className="mt-6 border-t border-black/15 pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/55">All Policies</p>
            <ul className="mt-3 space-y-2 text-sm">
              {policies.map((policy) => (
                <li key={policy.href}>
                  <Link
                    href={policy.href}
                    className={`block rounded-lg border px-3 py-2 transition text-sm ${
                      policy.active
                        ? "border-black bg-black text-white font-normal"
                        : "border-black/10 bg-transparent text-black/75 hover:border-black/25"
                    }`}
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}
        </aside>

        {/* Main Article */}
        <article className="rounded-2xl border border-black/10 bg-transparent p-5 md:p-8">
          <div className="mb-7 border-b border-black/15 pb-5">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-black/55">Nothing Official Pakistan</p>
            <h2 className="mt-3 text-3xl font-normal tracking-tight text-black md:text-4xl">Terms of Sale - NOTHING TECHNOLOGY</h2>
          </div>
          <div className="space-y-7">
            <section className="space-y-3">
              <h3 className="text-xl font-normal leading-tight text-black">1. Seller Identity</h3>
              <div className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px] font-normal">
                <p>All orders placed on this website are processed by the Nothing Pakistan.</p>
                <p>These terms apply to every product order confirmed through this storefront.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-normal leading-tight text-black">2. Order Placement and Acceptance</h3>
              <div className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px] font-normal">
                <p>When you place an order, you submit a purchase offer to the Nothing Pakistan.</p>
                <p>
                  Order acceptance occurs after confirmation and availability checks; we may cancel or limit quantities for stock, payment, or risk
                  reasons.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-normal leading-tight text-black">3. Pricing and Payments</h3>
              <div className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px] font-normal">
                <p>
                  Prices shown by the Nothing Pakistan are listed in the currency shown at checkout and may include or exclude taxes as indicated.
                </p>
                <p>
                  You agree to provide valid payment details and authorize charges related to your order, including delivery charges where applicable.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-normal leading-tight text-black">4. Shipping and Delivery</h3>
              <div className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px] font-normal">
                <p>The Nothing Pakistan arranges shipping through delivery partners and provides estimated timelines where available.</p>
                <p>
                  Delivery dates are estimates and may be affected by weather, public holidays, logistics constraints, or address verification issues.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-normal leading-tight text-black">5. Returns, Replacements, and Refunds</h3>
              <div className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px] font-normal">
                <p>
                  Return and replacement eligibility at the Nothing Pakistan depends on product condition, proof of purchase, and return window rules.
                </p>
                <p>Approved refunds are processed through the original payment method or another compliant method offered at the time of refund.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-normal leading-tight text-black">6. Warranty and Product Support</h3>
              <div className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px] font-normal">
                <p>
                  Products sold by the Nothing Pakistan may include manufacturer or seller warranty terms shown in product or support documentation.
                </p>
                <p>Warranty coverage can be refused for unauthorized repairs, accidental damage outside coverage, or policy violations.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-normal leading-tight text-black">7. Limitation of Liability</h3>
              <div className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px] font-normal">
                <p>To the maximum extent permitted by law, the Nothing Pakistan is not liable for indirect, incidental, or consequential damages.</p>
                <p>Nothing in these terms excludes rights that cannot be waived under applicable law.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-normal leading-tight text-black">8. Governing Rules</h3>
              <div className="space-y-3 text-sm leading-7 text-black/80 md:text-[15px] font-normal">
                <p>
                  These Terms of Sale are interpreted in line with applicable legal requirements in Pakistan unless mandatory law requires otherwise.
                </p>
                <p>Disputes should first be raised with the Nothing Pakistan support team for resolution.</p>
              </div>
            </section>
          </div>
          <div className="mt-10 rounded-xl border border-black/15 bg-transparent p-4 text-sm leading-7 text-black/75 font-normal">
            This policy is published by Nothing Official Pakistan, operated by NOTHING OFFICIAL (SMC-PRIVATE) LIMITED (CUIN 0337422). For legal,
            order, return, warranty, or account-specific help, contact support@nothingcmf.pk, call {WHATSAPP_NUMBER}, or open the support centre.
          </div>
        </article>
      </section>
    </div>
  );
}
