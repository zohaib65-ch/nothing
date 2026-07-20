"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { BellRing, Volume2, Timer, Sparkles } from "lucide-react";

export function GlyphExplorer() {
  const [activePreset, setActivePreset] = React.useState<"notifications" | "volume" | "timer" | "composer">("notifications");

  const presets = [
    {
      id: "notifications",
      label: "ESSENTIAL NOTIFICATIONS",
      icon: <BellRing className="h-4 w-4" />,
      description: "Assign light patterns to key contacts so you know who is reaching out without looking at your screen.",
      glowPattern: "glow-pulse",
    },
    {
      id: "volume",
      label: "VOLUME & BATTERY LEVEL",
      icon: <Volume2 className="h-4 w-4" />,
      description: "Visual progress bar on the back light matrix that shows charging status and volume adjustment in real-time.",
      glowPattern: "glow-[#D71921]",
    },
    {
      id: "timer",
      label: "GLYPH TIMER",
      icon: <Timer className="h-4 w-4" />,
      description: "Set a countdown timer and watch the light strip deplete as time ticks down.",
      glowPattern: "glow-strobe",
    },
    {
      id: "composer",
      label: "GLYPH COMPOSER",
      icon: <Sparkles className="h-4 w-4" />,
      description: "Create customized sound and light ringtones using custom sound packs engineered by Swedish House Mafia.",
      glowPattern: "glow-[#D71921]",
    },
  ];

  const currentPreset = presets.find((p) => p.id === activePreset)!;

  return (
    <Section gridLines className="bg-[#050505] text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Controls */}
          <div className="lg:col-span-6 space-y-8">
            <Heading
              badgeText="ENGINEERING HIGHLIGHT"
              dotMatrix
              size="lg"
              subtext="The Glyph Interface allows you to put your phone down and stay present with your life."
            >
              GLYPH MATRIX INTERFACE
            </Heading>

            <div className="space-y-3">
              {presets.map((p) => {
                const isActive = p.id === activePreset;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePreset(p.id as any)}
                    className={cn(
                      "w-full text-left p-4 border transition-all flex items-start space-x-4 focus:outline-none",
                      isActive
                        ? "bg-[#141416] border-[#D71921] shadow-[0_0_20px_rgba(215,25,33,0.15)]"
                        : "bg-[#0F0F10] border-[#26262A] hover:border-neutral-500"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-sm border transition-colors",
                        isActive
                          ? "bg-[#D71921] text-white border-[#D71921]"
                          : "bg-[#1C1C1E] text-neutral-400 border-[#26262A]"
                      )}
                    >
                      {p.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        {p.label}
                      </div>
                      {isActive && (
                        <p className="text-xs text-neutral-400 font-sans leading-relaxed animate-in fade-in duration-200">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Simulated Glyph Lighting Diagram */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-72 h-[520px] bg-[#0A0A0B] border-2 border-[#26262A] rounded-[48px] p-6 shadow-2xl overflow-hidden flex flex-col justify-between items-center">
              {/* Camera Module Frame */}
              <div className="w-full flex justify-center pt-2">
                <div className="h-16 w-32 rounded-full border border-neutral-800 bg-[#121214] flex items-center justify-around px-4">
                  <div className="h-8 w-8 rounded-full border border-[#3A3A40] bg-black" />
                  <div className="h-8 w-8 rounded-full border border-[#3A3A40] bg-black" />
                </div>
              </div>

              {/* Glowing Glyph Light Strips */}
              <div className="w-full space-y-6 py-6 flex flex-col items-center">
                {/* Upper Arc Strip */}
                <div
                  className={cn(
                    "w-48 h-3 rounded-full border transition-all duration-500",
                    activePreset === "notifications"
                      ? "bg-white border-white shadow-[0_0_25px_#FFFFFF] animate-pulse"
                      : "bg-[#1C1C1E] border-[#26262A]"
                  )}
                />

                {/* Central Ring Strip */}
                <div
                  className={cn(
                    "w-40 h-40 rounded-full border-4 transition-all duration-500 flex items-center justify-center",
                    activePreset === "volume" || activePreset === "composer"
                      ? "border-[#D71921] shadow-[0_0_35px_#D71921] bg-[#D71921]/10"
                      : "border-[#1C1C1E] bg-transparent"
                  )}
                >
                  <div className="h-12 w-12 rounded-full border border-neutral-700 bg-[#141416]" />
                </div>

                {/* Lower Linear Strip */}
                <div
                  className={cn(
                    "w-36 h-2 rounded-full border transition-all duration-500",
                    activePreset === "timer"
                      ? "bg-white border-white shadow-[0_0_25px_#FFFFFF]"
                      : "bg-[#1C1C1E] border-[#26262A]"
                  )}
                />
              </div>

              {/* Bottom Glyph Branding Indicator */}
              <div className="pb-2 font-mono text-[9px] text-neutral-600 tracking-widest uppercase">
                NOTHING (GLYPH ENGINE 2.0)
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
