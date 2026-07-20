import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  gridLines?: boolean;
  dotGrid?: boolean;
}

export function Section({
  className,
  gridLines = false,
  dotGrid = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-16 md:py-24 border-b border-neutral-900/80 overflow-hidden",
        gridLines && "bg-grid-lines",
        dotGrid && "bg-dot-grid",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
