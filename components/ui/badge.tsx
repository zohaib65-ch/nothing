import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center tracking-widest uppercase text-[10px] font-mono font-semibold transition-colors px-2 py-0.5 border",
  {
    variants: {
      variant: {
        default: "bg-[#1C1C1E] text-neutral-300 border-[#2C2C2E]",
        red: "bg-[#D71921]/10 text-[#D71921] border-[#D71921]/30",
        white: "bg-white text-black border-white font-bold",
        outline: "bg-transparent text-neutral-400 border-[#3A3A40]",
        dot: "bg-transparent text-[#D71921] border-none p-0 tracking-normal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
}

export function Badge({ className, variant, showDot = true, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {showDot && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D71921] inline-block animate-pulse" />
      )}
      {children}
    </div>
  );
}
