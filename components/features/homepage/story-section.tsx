"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";

export interface StorySectionProps {
  badge: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonHref: string;
  bgType: "yellow" | "light" | "white" | "dark" | "cinema";
  bgImageUrl: string;
  thumbnailUrl?: string;
  whatsappNumber?: string;
}

export function StorySection({
  badge,
  title,
  subtitle,
  buttonText = "LEARN MORE",
  buttonHref,
  bgType,
  bgImageUrl,
  thumbnailUrl,
  whatsappNumber = WHATSAPP_NUMBER,
}: StorySectionProps) {
  const bgStyles = {
    yellow: "bg-[#FFE500] text-black",
    light: "bg-[#F4F4F4] text-black",
    white: "bg-white text-black",
    dark: "bg-[#0F0F10] text-white",
    cinema: "bg-black text-white",
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to inquire about ${badge} - ${title}.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`;

  return (
    <section
      className={`relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-end items-center overflow-hidden py-16 px-4 ${bgStyles[bgType]}`}
    >
      {/* Background Image / Render */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Signature Floating White Card Box - Exact Reference Match */}
      <div className="relative z-10 w-full max-w-lg mb-8 sm:mb-12 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-black/5 text-black transition-all hover:scale-[1.01] duration-300">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <span className="font-ndot text-xs tracking-widest uppercase text-neutral-500 block font-normal">
              {badge}
            </span>
            <h2 className="font-ntype text-lg sm:text-xl font-medium tracking-tight text-black leading-snug">
              {title}
            </h2>
            <p className="font-ntype text-xs text-neutral-600 line-clamp-2">
              {subtitle}
            </p>
          </div>

          {/* Right Product Thumbnail inside Floating Card Box */}
          {thumbnailUrl && (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-neutral-100 rounded-xl p-2 border border-black/5 flex items-center justify-center">
              <Image
                src={thumbnailUrl}
                alt={badge}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </div>
          )}
        </div>

        {/* Action Buttons inside Floating Card Box */}
        <div className="mt-6 flex items-center space-x-3 pt-2">
          <Link
            href={buttonHref}
            className="flex-1 bg-black text-white hover:bg-neutral-800 font-lattera text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-full flex items-center justify-center space-x-2 transition-colors shadow-md"
          >
            <span>{buttonText}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D71921] text-white hover:bg-[#B51219] p-3 rounded-full transition-colors shadow-md flex items-center justify-center"
            title="Order on WhatsApp"
          >
            <MessageSquare className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
