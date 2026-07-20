"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { MessageSquare, ArrowRight, Play, Pause } from "lucide-react";

export interface HeroSpotlightProps {
  product?: Product;
}

export function HeroSpotlight({ product }: HeroSpotlightProps) {
  const { settings } = useSettingsStore();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const heroConfig = settings.homepageHero;

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const defaultVariant = product?.variants[0];
  const whatsappUrl = product && defaultVariant
    ? generateWhatsAppLink(settings.whatsappNumber, product, defaultVariant, 1)
    : `https://wa.me/${settings.whatsappNumber}`;

  return (
    <div className="relative min-h-[88vh] lg:min-h-[92vh] w-full bg-[#050505] flex items-center justify-center border-b border-[#26262A] overflow-hidden">
      {/* Background Media / Video Reel */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
        {heroConfig.videoUrl ? (
          <video
            ref={videoRef}
            src={heroConfig.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          />
        ) : (
          <Image
            src={heroConfig.bgImageUrl || "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1600&q=80"}
            alt="Nothing Hero Background"
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center space-x-2 bg-[#D71921]/10 border border-[#D71921]/30 px-3 py-1 font-lattera text-[11px] uppercase tracking-widest text-[#D71921]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D71921] animate-ping" />
          <span>{heroConfig.badge || "NEW RELEASE"}</span>
        </div>

        <div className="space-y-4 max-w-4xl">
          <h1 className="font-ndot text-4xl sm:text-6xl lg:text-8xl uppercase tracking-widest text-white leading-none">
            {heroConfig.title || "PHONE (2a) PLUS"}
          </h1>

          <p className="font-ntype text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {heroConfig.subtitle || "EXTRAORDINARY POWER. METALLIC CRAFT."}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          {product ? (
            <Link href={`/products/${product.slug}`}>
              <button className="h-12 px-8 bg-white text-black font-lattera text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors inline-flex items-center justify-center space-x-2">
                <span>DISCOVER {product.name}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </Link>
          ) : (
            <Link href="/products">
              <button className="h-12 px-8 bg-white text-black font-lattera text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors inline-flex items-center justify-center space-x-2">
                <span>EXPLORE STORE</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </Link>
          )}

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button className="h-12 px-8 bg-[#D71921] text-white font-lattera text-xs font-bold uppercase tracking-widest hover:bg-[#B51219] shadow-[0_0_25px_rgba(215,25,33,0.4)] transition-all inline-flex items-center justify-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>BUY ON WHATSAPP {product ? `(${formatPrice(product.price)})` : ''}</span>
            </button>
          </a>
        </div>

        {/* Video Reel Control */}
        {heroConfig.videoUrl && (
          <div className="pt-6">
            <button
              onClick={toggleVideo}
              className="inline-flex items-center space-x-2 font-lattera text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              <span>{isPlaying ? "PAUSE PREVIEW FILM" : "PLAY PREVIEW FILM"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
