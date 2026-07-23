"use client";

import * as React from "react";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      {/* Nothing brand style loading ring */}
      <div className="relative w-11 h-11 flex items-center justify-center">
        {/* Outer dotted ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-black/10 animate-[spin_8s_linear_infinite]" />
        
        {/* Inner rotating solid bar */}
        <div className="w-6 h-6 rounded-full border-[1.5px] border-transparent border-t-black/80 animate-spin" />
        
        {/* Small center red dot (Nothing brand signature color) */}
        <div className="absolute w-[3px] h-[3px] rounded-full bg-[#D71921]" />
      </div>

      <span 
        className="text-[11px] tracking-[0.25em] text-black/45 animate-pulse uppercase"
        style={{ fontFamily: "var(--font-ndot55), sans-serif" }}
      >
        Loading...
      </span>
    </div>
  );
}
