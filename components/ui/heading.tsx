import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  dotMatrix?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "hero";
  subtext?: string;
  badgeText?: string;
}

export function Heading({
  as: Component = "h2",
  dotMatrix = false,
  size = "md",
  subtext,
  badgeText,
  className,
  children,
  ...props
}: HeadingProps) {
  const sizeClasses = {
    xs: "text-base sm:text-lg font-semibold tracking-wider",
    sm: "text-lg sm:text-xl font-bold tracking-wider",
    md: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
    lg: "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight",
    xl: "text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight",
    "2xl": "text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter",
    hero: "text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-none",
  };

  return (
    <div className="space-y-2">
      {badgeText && (
        <div className="inline-flex items-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D71921] animate-ping" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#D71921]">
            {badgeText}
          </span>
        </div>
      )}
      <Component
        className={cn(
          "uppercase text-white",
          dotMatrix ? "font-mono tracking-widest font-normal" : "font-sans",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
      {subtext && (
        <p className="text-neutral-400 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
}
