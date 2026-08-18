"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";

export function ProductStatusClient() {
  const [imei, setImei] = React.useState("");
  const [showGuide, setShowGuide] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imei.trim()) {
      toast.error("Please enter a valid IMEI or Serial Number");
      return;
    }
    toast.info("Coming soon", {
      description: "IMEI/SN product verification will be available shortly.",
    });
  };

  const handleGuideClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowGuide((prev) => !prev);
  };

  return (
    <div data-hide-dots="true" className="min-h-screen bg-[#f3f5f8] pt-20 text-[#111]">
      {/* ─── Breadcrumb ─────────────────────────────────────── */}
      <div>
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4 md:px-10">
          <nav className="flex items-center gap-2 font-lattera text-[11px] tracking-[0.16em] uppercase" style={{ color: "#2f5fb3" }}>
            <Link href="/support-centre" className="hover:underline">
              NOTHING
            </Link>
            <span className="text-black/30">/</span>
            <span className="text-black/50 tracking-[0.16em]">PRODUCT STATUS</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pt-6 pb-28 md:px-10">
        {/* ─── Header ─────────────────────────────────────────── */}
        <div>
          <h1 className="font-ntype text-[64px] font-bold leading-none text-black">Product Status</h1>
          <p className="font-ntype-mono mt-5 max-w-[680px] text-[13px] font-[300] leading-[20px] text-black">Check information about your product.</p>
        </div>

        {/* Separator */}
        <div className="faq-dot-line mt-8 mb-12 h-[4px] w-full" />

        {/* ─── Section 1: Input your IMEI/SN number ──────────── */}
        <section className="">
          <h2 className="font-ntype text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal text-black">Input your IMEI/SN number</h2>

          <div className="faq-dot-line my-5 h-[4px] w-full" />

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col max-w-[880px] mx-auto items-start gap-3">
            {/* Input pill */}
            <input
              type="text"
              placeholder="IMEI/SN number"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              className="font-ntype-mono h-[46px] w-full rounded-full bg-white px-6 text-[13px] font-[300] text-black outline-none placeholder:text-black/35 shadow-none"
            />

            {/* Helper link */}
            <button
              type="button"
              onClick={handleGuideClick}
              className="font-ntype-mono text-[13px] font-[300] text-[#002f6c] underline hover:opacity-80 mt-1 cursor-pointer"
            >
              How to find your IMEI/SN Number?
            </button>

            {/* Guide Instructions Accordion */}
            {showGuide && (
              <div className="font-ntype-mono my-2 rounded-xl bg-black/5 p-5 text-[12px] font-[300] leading-[18px] text-black space-y-2.5 w-full">
                <p className="font-medium text-black">How to find your IMEI / SN:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Nothing Phones:</strong> Go to Settings → About Phone → Status → IMEI info, or dial <code>*#06#</code> on your dialer.
                  </li>
                  <li>
                    <strong>Nothing Ear & Earbuds:</strong> The serial number is printed on the bottom/inside of your charging case lid, or check the
                    Nothing X app under Device Settings.
                  </li>
                  <li>
                    <strong>Original Packaging:</strong> Check the barcode sticker on the back of your product retail box.
                  </li>
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 inline-flex h-[46px] w-full items-center justify-center rounded-full bg-[#002e6c] font-lattera text-[13px] uppercase tracking-wider text-white transition-all duration-300 ease-out hover:scale-x-102"
            >
              SUBMIT
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
