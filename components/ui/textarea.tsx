"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, error, hint, ...props }, ref) => {
  return (
    <div className="space-y-1.5 w-full font-mono text-xs">
      {label && <label className="block text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">{label}</label>}
      <textarea
        className={cn(
          "flex min-h-[60px] w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D71921] focus:ring-1 focus:ring-[#D71921] transition-all disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#141416] dark:border-[#26262A] dark:text-white dark:placeholder:text-neutral-600 resize-none rounded-md text-[11px]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
        ref={ref}
        {...props}
      />
      {hint && !error && <p className="text-[10px] text-neutral-500">{hint}</p>}
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
