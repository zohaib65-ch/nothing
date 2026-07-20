"use client";

import * as React from "react";
import Link from "next/link";
import { HelpCircle, Mail, MapPin, ChevronDown, Check } from "lucide-react";

export function Footer() {
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="w-full bg-[#000000] text-white relative py-20 px-6 overflow-hidden select-none bg-dot-grid-dark border-t border-neutral-900">
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-16">
        {/* Main Big Centered Ndot Links - Exact Reference Screenshot */}
        <nav className="space-y-6 font-ndot text-2xl sm:text-4xl uppercase tracking-[0.25em] text-white">
          <div>
            <Link href="/products" className="hover:text-[#D71921] transition-colors">
              ABOUT
            </Link>
          </div>
          <div>
            <Link href="/products" className="hover:text-[#D71921] transition-colors">
              COMMUNITY
            </Link>
          </div>
          <div>
            <Link href="/products" className="hover:text-[#D71921] transition-colors">
              CLUB NOTHING (R)
            </Link>
          </div>
          <div>
            <Link href="/products" className="hover:text-[#D71921] transition-colors">
              PLAYGROUND
            </Link>
          </div>
        </nav>

        {/* Centered Floating Accordion Stack Card - Exact Reference Screenshot */}
        <div className="w-full max-w-md bg-[#121214]/90 backdrop-blur-md rounded-2xl border border-neutral-800 divide-y divide-neutral-800/80 overflow-hidden font-lattera text-xs text-neutral-300 text-left shadow-2xl">
          {/* Support */}
          <button
            onClick={() => toggleSection("support")}
            className="w-full p-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors uppercase tracking-wider"
          >
            <span>SUPPORT</span>
            <HelpCircle className="h-4 w-4 text-neutral-400" />
          </button>

          {/* Newsletter */}
          <button
            onClick={() => toggleSection("newsletter")}
            className="w-full p-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors uppercase tracking-wider"
          >
            <span>NEWSLETTER</span>
            <Mail className="h-4 w-4 text-neutral-400" />
          </button>

          {/* Store Location */}
          <button
            onClick={() => toggleSection("store")}
            className="w-full p-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors uppercase tracking-wider"
          >
            <span>STORE: INTERNATIONAL</span>
            <MapPin className="h-4 w-4 text-neutral-400" />
          </button>

          {/* Language */}
          <button
            onClick={() => toggleSection("language")}
            className="w-full p-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors uppercase tracking-wider"
          >
            <span>LANGUAGE: EN</span>
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          </button>

          {/* Consent Preferences */}
          <button
            onClick={() => toggleSection("consent")}
            className="w-full p-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors uppercase tracking-wider"
          >
            <span>CONSENT PREFERENCES</span>
            <Check className="h-4 w-4 text-neutral-400" />
          </button>
        </div>

        {/* Bottom Bar Footer Links - Exact Reference Screenshot */}
        <div className="w-full pt-12 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between font-lattera text-[11px] text-neutral-400 uppercase tracking-widest gap-6">
          <div className="flex items-center space-x-6">
            <Link href="/admin/login" className="hover:text-white transition-colors">
              ACCOUNT
            </Link>
            <Link href="/products" className="hover:text-white transition-colors">
              CONTACT
            </Link>
            <Link href="/products" className="hover:text-white transition-colors">
              CAREERS
            </Link>
            <Link href="/products" className="hover:text-white transition-colors">
              LEGAL
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com/nothing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://youtube.com/@nothingtech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YOUTUBE
            </a>
            <a
              href="https://x.com/nothing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              X
            </a>
            <a
              href="https://tiktok.com/@nothing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TIKTOK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
