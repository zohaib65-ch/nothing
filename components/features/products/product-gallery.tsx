"use client";

import * as React from "react";
import Image from "next/image";
import { Play, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export interface ProductGalleryProps {
  images: string[];
  videos?: string[];
  productName: string;
}

export function ProductGallery({ images, videos, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  const activeImage = images[selectedIndex] || images[0] || "/placeholder.jpg";

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div className="relative aspect-square w-full bg-[#0F0F10] border border-[#26262A] overflow-hidden group flex items-center justify-center p-8">
        <Image
          src={activeImage}
          alt={`${productName} image ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
        />
        <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" />

        {/* Zoom & Lightbox Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 bg-[#141416]/80 text-neutral-400 hover:text-white border border-[#26262A] opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Enlarge Image"
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        {/* Video Trigger Tag */}
        {videos && videos.length > 0 && (
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="absolute bottom-4 left-4 inline-flex items-center space-x-2 bg-[#D71921] text-white px-3 py-1.5 font-mono text-[10px] uppercase font-bold tracking-wider shadow-lg hover:bg-[#B51219] transition-colors"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>WATCH FILM</span>
          </button>
        )}

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 text-white border border-[#26262A] hover:bg-black transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 text-white border border-[#26262A] hover:bg-black transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 bg-[#0F0F10] border transition-all p-2 focus:outline-none",
                selectedIndex === idx
                  ? "border-[#D71921] shadow-[0_0_10px_rgba(215,25,33,0.3)]"
                  : "border-[#26262A] opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Modal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={`${productName} - View ${selectedIndex + 1}`}
        maxWidth="2xl"
      >
        <div className="relative aspect-square w-full bg-[#050505] flex items-center justify-center p-4">
          <Image
            src={activeImage}
            alt={productName}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </Modal>

      {/* Video Showcase Modal */}
      {videos && videos[0] && (
        <Modal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          title={`${productName} - Craftsmanship Film`}
          maxWidth="2xl"
        >
          <div className="aspect-video w-full bg-black">
            <video
              src={videos[0]}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
