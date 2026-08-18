"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";

export function AfterSalesClient() {
  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Coming soon", {
      description: "This service will be available shortly.",
    });
  };

  return (
    <div data-hide-dots="true" className="min-h-screen bg-[#f3f5f8] pt-20 text-[#111]">
      <div>
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4 md:px-10">
          <nav className="flex items-center gap-2 font-lattera text-[11px] tracking-[0.16em] uppercase" style={{ color: "#2f5fb3" }}>
            <Link href="/support-centre" className="hover:underline">
              NOTHING
            </Link>
            <span className="text-black/30">/</span>
            <span className="text-black/50 tracking-[0.16em]">AFTER SALES SERVICE</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pt-6 pb-28 md:px-10">
        {/* ─── Header ─────────────────────────────────────────── */}
        <div>
          <h1 className="font-ntype text-[64px] font-bold leading-none text-black">After Sales Service</h1>
          <p className="font-ntype-mono mt-5 max-w-[680px] text-[13px] font-[300] leading-[20px] text-black">
            Get ongoing support after you&apos;ve purchased your Nothing product. Request and manage your returns. Get device repairs and
            replacements.
          </p>
        </div>
        <div className="faq-dot-line mt-8 mb-12 h-[4px] w-full" />
        <section className="mb-16">
          <h2 className="font-ntype text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal text-black">Request Types</h2>
          <div className="mt-6">
            <div>
              <div className="faq-dot-line my-4 h-[4px] w-full" />
              <div className="flex flex-col gap-3 py-3 md:flex-row md:items-start md:justify-between">
                <span className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black md:w-[36%] shrink-0">For users.</span>
                <span className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black md:w-[42%]">
                  Submit a request to return, repair or replace a device.
                </span>
                <div className="text-left md:w-[22%] md:text-right shrink-0">
                  <button onClick={handleComingSoon} className="font-ntype-mono text-[13px] font-[300] text-[#002f6c] hover:underline">
                    ( Submit Request )
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="faq-dot-line my-4 h-[4px] w-full" />
              <div className="flex flex-col gap-3 py-3 md:flex-row md:items-start md:justify-between">
                <span className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black md:w-[36%] shrink-0">
                  For distributors/ operators.
                </span>
                <div className="md:w-[42%]">
                  <button onClick={handleComingSoon} className="font-ntype-mono text-[13px] font-[300] text-[#002f6c] underline hover:opacity-80">
                    Is this your first time submitting a request?
                  </button>
                </div>
                <div className="text-left md:w-[22%] md:text-right shrink-0">
                  <button onClick={handleComingSoon} className="font-ntype-mono text-[13px] font-[300] text-[#002f6c] hover:underline">
                    ( Submit Request )
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="faq-dot-line my-4 h-[4px] w-full" />
              <div className="flex flex-col gap-3 py-3 md:flex-row md:items-start md:justify-between">
                <span className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black md:w-[36%] shrink-0">Track request status</span>
                <span className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black md:w-[42%]">Track your request progress.</span>
                <div className="flex flex-col items-start text-left md:w-[22%] md:items-end md:text-right shrink-0">
                  <button onClick={handleComingSoon} className="font-ntype-mono text-[13px] font-[300] text-[#002f6c] hover:underline">
                    ( Track Now )
                  </button>
                  <button
                    onClick={handleComingSoon}
                    className="font-ntype-mono mt-1 text-[10px] leading-[14px] uppercase tracking-wider text-black hover:underline"
                  >
                    OR SIGN IN TO PERSONAL SERVICE CENTRE
                  </button>
                </div>
              </div>
            </div>
            <div className="faq-dot-line my-4 h-[4px] w-full" />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-ntype text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal text-black">More Services</h2>

          <div className="mt-6">
            <div className="faq-dot-line my-4 h-[4px] w-full" />
            <div className="flex flex-col gap-3 py-3 md:flex-row md:items-start md:justify-between">
              <span className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black md:w-[36%] shrink-0">After-sales service policy</span>
              <span className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black md:w-[42%]">
                Quick access to service terms and conditions.
              </span>
              <div className="text-left md:w-[22%] md:text-right shrink-0">
                <Link href="/pages/terms-of-sale" className="font-ntype-mono text-[13px] font-[300] text-[#002f6c] hover:underline">
                  ( Read More )
                </Link>
              </div>
            </div>

            <div className="faq-dot-line my-4 h-[4px] w-full" />
          </div>
        </section>

        <section>
          <h2 className="font-ntype text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal text-black">Contact Us</h2>
          <div className="mt-6">
            <div className="faq-dot-line my-4 h-[4px] w-full" />
            <div className="flex flex-col gap-6 py-5 md:flex-row md:items-center md:justify-between">
              <p className="font-ntype-mono max-w-[500px] text-[13px] font-[300] leading-[20px] text-black">
                Feel free to send us an email for further support. Our experts are on-hand to help.
              </p>
              <a
                href="mailto:support@nothingcmf.pk"
                className="inline-flex h-[44px] shrink-0 items-center justify-center rounded-full bg-[#002e6c] px-8 font-lattera text-[12px] uppercase tracking-wider text-white transition-all duration-300 ease-out hover:scale-x-105"
              >
                SEND US AN EMAIL
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
