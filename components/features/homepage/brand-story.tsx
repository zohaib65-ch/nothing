import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ShieldCheck, Cpu, Eye, Radio } from "lucide-react";

export function BrandStory() {
  const pillars = [
    {
      title: "TRANSPARENT ENGINEERING",
      description: "We reveal what is usually hidden. Displaying raw circuitry, custom copper ribbons, and precision-milled aluminum components.",
      icon: <Eye className="h-6 w-6 text-[#D71921]" />,
    },
    {
      title: "CUSTOM SOUNDSEAL ACOUSTICS",
      description: "Custom titanium-coated stepped drivers deliver crisp acoustic separation and deep low-frequency punch without leakage.",
      icon: <Radio className="h-6 w-6 text-[#D71921]" />,
    },
    {
      title: "PURPOSEFUL NOTHING OS",
      description: "Designed for reduced screen fatigue. Iconic monochrome aesthetic, custom dot-matrix widgets, zero bloatware.",
      icon: <Cpu className="h-6 w-6 text-[#D71921]" />,
    },
    {
      title: "SUSTAINABLE HARDWARE",
      description: "Crafted with 100% recycled aluminum mid-frames and plastic components sourced from renewable bio-based materials.",
      icon: <ShieldCheck className="h-6 w-6 text-[#D71921]" />,
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0B] border-b border-[#26262A] relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid-dense opacity-20 pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Heading badgeText="OUR PHILOSOPHY" dotMatrix size="xl">
            PURE INSTINCT. ZERO DISTRACTIONS.
          </Heading>
          <p className="text-neutral-400 font-sans text-sm sm:text-base leading-relaxed">
            Technology should feel invisible, effortless, and joyful. Nothing is on a mission to strip away unnecessary noise and restore wonder to consumer electronics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#050505] border border-[#26262A] p-6 space-y-4 hover:border-[#D71921] transition-all group"
            >
              <div className="p-3 w-fit bg-[#141416] border border-[#26262A] group-hover:border-[#D71921] transition-colors">
                {pillar.icon}
              </div>
              <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                {pillar.title}
              </h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
