"use client";

import * as React from "react";
import { StorySection } from "@/components/features/homepage/story-section";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function HomePage() {
  const { settings } = useSettingsStore();

  const sections = [
    {
      badge: "EAR (A)",
      title: "AUDIOPHILE SOUND. ALL DAY COMFORT.",
      subtitle: "Custom 11mm ceramic driver with active noise cancellation and vibrant ear acoustics.",
      buttonHref: "/products/nothing-headphone-a",
      bgType: "yellow" as const,
      bgImageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80",
    },
    {
      badge: "PHONE (3a)",
      title: "BUILT FOR THE EXTRAORDINARY.",
      subtitle: "MediaTek Dimensity 7200 Pro processor with dual 50MP camera array and Glyph Interface.",
      buttonHref: "/products/nothing-phone-4a-white",
      bgType: "light" as const,
      bgImageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1600&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80",
    },
    {
      badge: "PHONE (3)",
      title: "THE NEXT EVOLUTION OF INSTINCT.",
      subtitle: "Flagship Qualcomm Snapdragon 8s Gen 3 with custom Glyph lighting and titanium frame.",
      buttonHref: "/products/nothing-phone-4a-pink",
      bgType: "white" as const,
      bgImageUrl: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1600&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=300&q=80",
    },
    {
      badge: "HEADPHONE (1)",
      title: "PURE ACOUSTICS. UNMATCHED ANC.",
      subtitle: "Studio grade wireless headphones with 45dB Active Noise Cancellation and 60hr battery life.",
      buttonHref: "/products/nothing-headphone-a",
      bgType: "dark" as const,
      bgImageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80",
    },
    {
      badge: "PHONE (4a)",
      title: "TRANSPARENT DESIGN. COLOR UNLEASHED.",
      subtitle: "Available now in White, Black, Special Edition Pink, and Deep Blue.",
      buttonHref: "/products/nothing-phone-4a-blue",
      bgType: "light" as const,
      bgImageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1600&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=300&q=80",
    },
    {
      badge: "HEADPHONE (a)",
      title: "STUDIO GRADE CLARITY.",
      subtitle: "Ergonomic over-ear acoustic fit with ultra-low latency game mode.",
      buttonHref: "/products/nothing-headphone-a",
      bgType: "white" as const,
      bgImageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1600&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80",
    },
    {
      badge: "EAR (OPEN)",
      title: "OPEN ACOUSTICS FOR PURE INSTINCT.",
      subtitle: "Open-ear design with directional sound technology and custom titanium driver.",
      buttonHref: "/products",
      bgType: "cinema" as const,
      bgImageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
    },
    {
      badge: "PHONE (2a)",
      title: "POWERFULLY DISTINCT.",
      subtitle: "Iconic dual camera glyph phone with 120Hz flexible AMOLED display.",
      buttonHref: "/products/nothing-phone-4a-black",
      bgType: "dark" as const,
      bgImageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <div className="w-full space-y-0 bg-black">
      {sections.map((section, index) => (
        <StorySection
          key={index}
          badge={section.badge}
          title={section.title}
          subtitle={section.subtitle}
          buttonHref={section.buttonHref}
          bgType={section.bgType}
          bgImageUrl={section.bgImageUrl}
          thumbnailUrl={section.thumbnailUrl}
          whatsappNumber={settings.whatsappNumber}
        />
      ))}
    </div>
  );
}
