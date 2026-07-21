"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowLeft, Download, CheckCircle } from "lucide-react";

export default function CompanyVerificationPage() {
  return (
    <div className="min-h-screen bg-white text-[#111] pt-24 pb-16 px-4 sm:px-6 lg:px-8 select-none">
      <div aria-hidden="true" className="site-dot-overlay" />

      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-black/60 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Verification Header */}
        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 sm:p-10 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D71921] text-white">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="dot-heading text-[10px] tracking-[0.3em] text-[#D71921]">OFFICIAL REGISTRATION</p>
              <h1 className="dot-heading text-xl sm:text-3xl font-bold text-black">
                Company Verification
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-black/50">LEGAL COMPANY NAME:</span>
              <p className="font-bold text-black text-sm">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED</p>
            </div>
            <div className="space-y-1">
              <span className="text-black/50">CUIN NUMBER:</span>
              <p className="font-bold text-[#D71921] text-sm">0337422</p>
            </div>
            <div className="space-y-1">
              <span className="text-black/50">INCORPORATION DATE:</span>
              <p className="font-bold text-black">16 May 2024</p>
            </div>
            <div className="space-y-1">
              <span className="text-black/50">REGISTERED AUTHORITY:</span>
              <p className="font-bold text-black">Securities and Exchange Commission of Pakistan (SECP)</p>
            </div>
          </div>

          {/* Certificate PDF Link */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10">
            <div className="flex items-center space-x-2 text-xs text-black/70">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>SECP Certificate Verified & Authenticated</span>
            </div>
            <a
              href="https://cdn.nothingshop.pk/nothing-official-pakistan-secp-certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-xl bg-black px-5 py-3 text-xs font-bold text-white transition hover:bg-[#D71921]"
            >
              <FileText className="h-4 w-4" />
              <span>VIEW SECP CERTIFICATE (PDF)</span>
              <Download className="h-3.5 w-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
