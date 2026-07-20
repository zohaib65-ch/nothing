"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-[#26262A] py-4 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-2 group focus:outline-none"
      >
        <span className="font-mono text-sm sm:text-base font-semibold uppercase tracking-wider text-white group-hover:text-[#D71921] transition-colors">
          {title}
        </span>
        <div className={cn("p-1 rounded-full border border-[#3A3A40] transition-transform duration-300", isOpen && "rotate-180 border-[#D71921] text-[#D71921]")}>
          <ChevronDown className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" />
        </div>
      </button>
      {isOpen && (
        <div className="pt-4 pb-2 text-neutral-300 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("divide-y divide-[#26262A] border-t border-[#26262A]", className)}>{children}</div>;
}
