"use client";

import * as React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-white text-[#111111] px-6 text-center"
      style={{
        backgroundImage: "radial-gradient(rgba(0,0,0,0.1) 1.5px, transparent 1.5px)",
        backgroundSize: "60px 60px",
      }}
    >
      {/* 404 number */}
      <h1
        className="text-[clamp(6rem,20vw,16rem)] leading-none tracking-tighter text-[#111111] select-none"
        style={{ fontFamily: "var(--font-ntype82-headline)" }}
      >
        404
      </h1>

      {/* Red dot separator */}
      <div className="w-16 h-[2px] bg-[#D71921] my-6" />

      {/* Message */}
      <p className="text-[#111111]/60 text-sm uppercase tracking-[0.15em] mb-10" style={{ fontFamily: "var(--font-ndot55)" }}>
        Page not found
      </p>

      {/* Back home button */}
      <Link
        href="/"
        className="border border-[#111111] text-[#111111] px-8 py-3 text-xs uppercase tracking-[0.18em] hover:bg-[#111111] hover:text-white transition-colors duration-200"
        style={{ fontFamily: "var(--font-ndot55)" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
