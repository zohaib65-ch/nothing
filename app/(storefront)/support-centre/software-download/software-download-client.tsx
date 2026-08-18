"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";

export function SoftwareDownloadClient() {
  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Coming soon", {
      description: "App download will be available shortly.",
    });
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
            <span className="text-black/50 tracking-[0.16em]">SOFTWARE DOWNLOAD</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pt-6 pb-28 md:px-10">
        {/* ─── Header ─────────────────────────────────────────── */}
        <div>
          <h1 className="font-ntype text-[64px] font-bold leading-none text-black">Software Download</h1>
          <p className="font-ntype-mono mt-5 max-w-[680px] text-[13px] font-[300] leading-[20px] text-black">Get the latest Nothing software here.</p>
        </div>

        {/* Separator */}
        <div className="faq-dot-line mt-8 mb-12 h-[4px] w-full" />

        {/* ─── Section 1: Nothing X app download ─────────────── */}
        <section className="mb-16">
          <h2 className="font-ntype text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal text-black">Nothing X app download.</h2>

          <div className="faq-dot-line my-5 h-[4px] w-full" />

          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleComingSoon}
                className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#002e6c] px-8 font-lattera text-[12px] uppercase tracking-wider text-white transition-all duration-300 ease-out hover:scale-x-105"
              >
                DOWNLOAD ON APP STORE
              </button>
              <div className="flex flex-col items-center">
                <button
                  onClick={handleComingSoon}
                  className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#002e6c] px-8 font-lattera text-[12px] uppercase tracking-wider text-white transition-all duration-300 ease-out hover:scale-x-105"
                >
                  GET IT ON GOOGLE PLAY
                </button>
              </div>
            </div>
            <div className="w-full pl-0 md:pl-[240px]">
              <button onClick={handleComingSoon} className="font-ntype-mono text-[11px] font-[300] uppercase tracking-wider text-black">
                OR CLICK <span className="underline">HERE</span> FOR ANDROID VERSION
              </button>
            </div>
          </div>
        </section>

        {/* ─── Section 2: CMF Watch app download ─────────────── */}
        <section className="mb-16">
          <h2 className="font-ntype text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal text-black">CMF Watch app download.</h2>

          <div className="faq-dot-line my-5 h-[4px] w-full" />

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleComingSoon}
              className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#002e6c] px-8 font-lattera text-[12px] uppercase tracking-wider text-white transition-all duration-300 ease-out hover:scale-x-105"
            >
              DOWNLOAD ON APP STORE
            </button>
            <button
              onClick={handleComingSoon}
              className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#002e6c] px-8 font-lattera text-[12px] uppercase tracking-wider text-white transition-all duration-300 ease-out hover:scale-x-105"
            >
              GET IT ON GOOGLE PLAY
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
