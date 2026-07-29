"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  compact?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false, compact = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("border-b border-neutral-200 dark:border-[#26262A] transition-colors", compact ? "py-2" : "py-4")}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-1 group focus:outline-none cursor-pointer"
      >
        <span className={cn(
          "font-mono uppercase tracking-wider text-neutral-900 dark:text-white group-hover:text-[#D71921] transition-colors",
          compact ? "text-xs font-bold" : "text-sm sm:text-base font-semibold"
        )}>
          {title}
        </span>
        <div
          className={cn(
            "p-1 rounded-full border border-neutral-300 dark:border-[#3A3A40] transition-transform duration-300",
            isOpen && "rotate-180 border-[#D71921] text-[#D71921]"
          )}
        >
          <ChevronDown className={cn("text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
        </div>
      </button>
      {isOpen && (
        <div className={cn(
          "text-neutral-700 dark:text-neutral-300 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200",
          compact ? "pt-2 pb-1 text-xs" : "pt-4 pb-2 text-sm"
        )}>
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("divide-y divide-neutral-200 dark:divide-[#26262A] border-t border-neutral-200 dark:border-[#26262A]", className)}>
      {children}
    </div>
  );
}
