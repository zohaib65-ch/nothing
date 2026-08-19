"use client";

import * as React from "react";
import { useSpecsStore } from "@/store/useSpecsStore";
import { SpecificationGroup } from "@/types";

const iconMap: Record<string, string> = {
  colour: "/icons/specs/colours.svg",
  dimension: "/icons/specs/dimension.svg",
  processor: "/icons/specs/processor.svg",
  camera: "/icons/specs/camera.svg",
  display: "/icons/specs/display.svg",
  battery: "/icons/specs/battery.svg",
  multimedia: "/icons/specs/multimedia.svg",
  audio: "/icons/specs/audio.svg",
  connect: "/icons/specs/connect.svg",
  design: "/icons/specs/design.svg",
  operating: "/icons/specs/operating.svg",
  sustain: "/icons/specs/sustain.svg",
  other: "/icons/specs/other.svg",
  default: "/icons/specs/default.svg",
};

function getIconPath(category: string): string {
  const lower = (category || "").toLowerCase();
  for (const [key, path] of Object.entries(iconMap)) {
    if (key !== "default" && lower.includes(key)) return path;
  }
  return iconMap["default"];
}

function SpecsAccordionRow({
  group,
  isOpen,
  onToggle,
}: {
  group: SpecificationGroup;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-black/[0.025] hover:bg-black/[0.045] rounded-[10px] overflow-hidden transition-colors shrink-0">
      <button
        type="button"
        onClick={onToggle}
        className="relative flex h-12 w-full items-center justify-between px-3.5 focus:outline-none cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <img src={getIconPath(group.category)} alt="" className="w-4 h-4 object-contain opacity-75 shrink-0" />
          <span className="text-[17px] sm:text-[18px] text-neutral-900 font-normal tracking-wide" style={{ fontFamily: "var(--font-ntype82), serif" }}>
            {group.category}
          </span>
        </div>
        <img
          src="/icons/specs/chevron.svg"
          alt=""
          className={`h-3.5 w-3.5 opacity-50 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3.5 pb-3.5 pt-1 space-y-2.5 border-t border-black/[0.04]">
            {group.items?.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[100px_minmax(0,1fr)] sm:grid-cols-[130px_minmax(0,1fr)] gap-x-4 items-start">
                <span className="font-lattera-mono text-[10px] sm:text-[11px] text-black/55 font-medium uppercase tracking-[0.12em] pt-0.5">
                  {item.name}
                </span>
                <div className="space-y-0.5 ml-2">
                  {String(item.value || "")
                    .split(/[,\n]/)
                    .map((v, vi) => (
                      <div key={vi} className="font-lattera-mono text-[12px] sm:text-[13px] font-medium uppercase text-neutral-900">
                        {v.trim()}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpecsDropdownContent() {
  const { specifications } = useSpecsStore();
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);

  const filteredSpecifications = React.useMemo(() => {
    if (!specifications || !Array.isArray(specifications)) return [];
    return specifications
      .map((group) => ({
        ...group,
        items: (group.items || []).filter(
          (item) => item && item.value != null && String(item.value).trim() !== ""
        ),
      }))
      .filter((group) => group.category && group.items.length > 0);
  }, [specifications]);

  return (
    <div
      data-lenis-prevent="true"
      data-lenis-prevent-touch="true"
      data-lenis-prevent-wheel="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="overflow-y-auto space-y-1.5 scrollbar-none flex-1 min-h-0 pb-3"
    >
      {filteredSpecifications && filteredSpecifications.length > 0 ? (
        filteredSpecifications.map((group, idx) => (
          <SpecsAccordionRow
            key={group.category || idx}
            group={group}
            isOpen={openCategory === group.category}
            onToggle={() =>
              setOpenCategory(openCategory === group.category ? null : group.category)
            }
          />
        ))
      ) : (
        <div className="py-8 text-center bg-black/[0.02] rounded-xl">
          <p className="text-xs text-neutral-400 font-mono">NO SPECIFICATIONS AVAILABLE.</p>
        </div>
      )}
    </div>
  );
}

export { SpecsDropdownContent as SpecsDropdownOverlay };
