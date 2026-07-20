"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex space-x-1 border-b border-[#26262A] overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-5 py-3 font-mono text-xs uppercase tracking-widest transition-all relative whitespace-nowrap focus:outline-none",
              isActive
                ? "text-white font-bold"
                : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            <span className="flex items-center space-x-2">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 border",
                    isActive
                      ? "border-[#D71921] text-[#D71921] bg-[#D71921]/10"
                      : "border-[#26262A] text-neutral-500"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D71921] shadow-[0_0_10px_#D71921]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
