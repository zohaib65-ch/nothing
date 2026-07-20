"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function BentoGrid() {
  return (
    <section className="py-20 bg-[#050505] border-b border-[#26262A]">
      <Container className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D71921]" />
              <span className="font-lattera text-[11px] uppercase tracking-widest text-[#D71921]">
                HARDWARE SPOTLIGHT
              </span>
            </div>
            <h2 className="font-ndot text-3xl sm:text-5xl uppercase tracking-wider text-white">
              ENGINEERED IN LONDON
            </h2>
          </div>
          <Link
            href="/products"
            className="font-lattera text-xs uppercase tracking-widest text-[#D71921] hover:underline flex items-center gap-1"
          >
            <span>DISCOVER ALL HARDWARE</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Item 1: Phone (2a) Plus (Large 8 cols) */}
          <Link
            href="/products/nothing-phone-2a-plus"
            className="group md:col-span-8 relative min-h-[460px] bg-[#0F0F10] border border-[#26262A] hover:border-[#D71921] transition-all duration-300 overflow-hidden flex flex-col justify-between p-8"
          >
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80"
                alt="Nothing Phone (2a) Plus"
                fill
                sizes="(max-width: 1200px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-lattera text-[10px] uppercase font-bold tracking-widest bg-[#D71921] text-white px-2.5 py-1">
                FLAGSHIP RELEASE
              </span>
              <div className="p-2 rounded-full bg-black/70 border border-[#26262A] text-white group-hover:border-[#D71921] group-hover:text-[#D71921] transition-colors">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <div className="relative z-10 space-y-3 max-w-xl">
              <div className="font-lattera text-xs text-neutral-400 uppercase tracking-widest">
                SMARTPHONE • METALLIC FINISH
              </div>
              <h3 className="font-ndot text-3xl sm:text-4xl uppercase tracking-wider text-white group-hover:text-[#D71921] transition-colors">
                PHONE (2a) PLUS
              </h3>
              <p className="font-ntype text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Boosted Dimensity 7350 Pro 5G processor, dual 50MP cameras, and liquid metallic aesthetics with Glyph Interface.
              </p>
              <div className="pt-2 font-lattera text-lg font-bold text-white">
                {formatPrice(379)}
              </div>
            </div>
          </Link>

          {/* Bento Item 2: Ear (open) (4 cols) */}
          <Link
            href="/products/nothing-ear-open"
            className="group md:col-span-4 relative min-h-[460px] bg-[#0F0F10] border border-[#26262A] hover:border-[#D71921] transition-all duration-300 overflow-hidden flex flex-col justify-between p-8"
          >
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80"
                alt="Nothing Ear (open)"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-lattera text-[10px] uppercase font-bold tracking-widest bg-white text-black px-2.5 py-1">
                OPEN ACOUSTICS
              </span>
              <div className="p-2 rounded-full bg-black/70 border border-[#26262A] text-white group-hover:border-[#D71921] group-hover:text-[#D71921] transition-colors">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="font-lattera text-xs text-neutral-400 uppercase tracking-widest">
                AUDIO • SOUND SEAL SYSTEM
              </div>
              <h3 className="font-ndot text-2xl uppercase tracking-wider text-white group-hover:text-[#D71921] transition-colors">
                EAR (OPEN)
              </h3>
              <p className="font-ntype text-xs text-neutral-300 leading-relaxed">
                Directional open-ear listening, 14.2mm titanium driver, 30 hours battery.
              </p>
              <div className="pt-2 font-lattera text-base font-bold text-white">
                {formatPrice(149)}
              </div>
            </div>
          </Link>

          {/* Bento Item 3: CMF Watch Pro 2 (6 cols) */}
          <Link
            href="/products/cmf-watch-pro-2"
            className="group md:col-span-6 relative min-h-[380px] bg-[#0F0F10] border border-[#26262A] hover:border-[#D71921] transition-all duration-300 overflow-hidden flex flex-col justify-between p-8"
          >
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
                alt="CMF Watch Pro 2"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-lattera text-[10px] uppercase font-bold tracking-widest bg-[#D71921] text-white px-2.5 py-1">
                CMF BY NOTHING
              </span>
              <div className="p-2 rounded-full bg-black/70 border border-[#26262A] text-white group-hover:border-[#D71921] group-hover:text-[#D71921] transition-colors">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="font-ndot text-2xl uppercase tracking-wider text-white group-hover:text-[#D71921] transition-colors">
                CMF WATCH PRO 2
              </h3>
              <p className="font-ntype text-xs text-neutral-300">
                Interchangeable functional bezels, 1.32” AMOLED, multi-system GPS, 11 days battery.
              </p>
              <div className="pt-2 font-lattera text-base font-bold text-white">
                {formatPrice(69)}
              </div>
            </div>
          </Link>

          {/* Bento Item 4: Nothing Power (65W) GaN (6 cols) */}
          <Link
            href="/products/nothing-power-65w-gan"
            className="group md:col-span-6 relative min-h-[380px] bg-[#0F0F10] border border-[#26262A] hover:border-[#D71921] transition-all duration-300 overflow-hidden flex flex-col justify-between p-8"
          >
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80"
                alt="Nothing Power (65W) GaN"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-lattera text-[10px] uppercase font-bold tracking-widest bg-white/20 text-white border border-white/30 px-2.5 py-1">
                FAST CHARGE
              </span>
              <div className="p-2 rounded-full bg-black/70 border border-[#26262A] text-white group-hover:border-[#D71921] group-hover:text-[#D71921] transition-colors">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="font-ndot text-2xl uppercase tracking-wider text-white group-hover:text-[#D71921] transition-colors">
                POWER (65W) GaN
              </h3>
              <p className="font-ntype text-xs text-neutral-300">
                Triple-port Gallium Nitride fast charger for laptops, phones, and accessories.
              </p>
              <div className="pt-2 font-lattera text-base font-bold text-white">
                {formatPrice(45)}
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
