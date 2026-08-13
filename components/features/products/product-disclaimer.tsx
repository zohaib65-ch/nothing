"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface ProductDisclaimerProps {
  disclaimers?: string[];
}

export function ProductDisclaimer({ disclaimers }: ProductDisclaimerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const validDisclaimers = (disclaimers || []).filter((d) => d && d.trim().length > 0);

  if (validDisclaimers.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-black py-10 px-4 flex flex-col items-center justify-center select-none">
      <div className="w-full max-w-[312px] bg-[#0d0d0d] rounded-xl overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full px-6 py-4 flex items-center justify-between transition-colors group cursor-pointer"
          style={{ fontFamily: "'LatteraMonoLL', 'letteraRegular', monospace" }}
        >
          <span className="font-mono text-[11px] font-normal tracking-widest text-white">DISCLAIMER</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z"
              fill="currentColor"
            ></path>
            <path
              d="M11 8C11 8.55228 10.5523 9 10 9C9.44772 9 9 8.55228 9 8C9 7.44772 9.44772 7 10 7C10.5523 7 11 7.44772 11 8Z"
              fill="currentColor"
            ></path>
            <path
              d="M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z"
              fill="currentColor"
            ></path>
            <path
              d="M7 8C7 8.55228 6.55228 9 6 9C5.44772 9 5 8.55228 5 8C5 7.44772 5.44772 7 6 7C6.55228 7 7 7.44772 7 8Z"
              fill="currentColor"
            ></path>
            <path
              d="M5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>

        {isOpen && (
          <div className="px-6 pb-5 font-ntype82 space-y-3 font-mono text-xs text-neutral-400 leading-relaxed overflow-hidden w-full normal-case">
            {validDisclaimers.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 min-w-0 w-full">
                <span className="text-white font-bold select-none shrink-0">{index + 1}.</span>
                <p className="flex-1 min-w-0 text-white text-base font-normal whitespace-pre-wrap break-words [overflow-wrap:anywhere] normal-case">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
