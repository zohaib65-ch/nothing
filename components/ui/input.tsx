"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, hint, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            type={inputType}
            className={cn(
              "flex h-11 w-full bg-white border border-neutral-300 px-4 py-2 font-mono text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D71921] focus:ring-1 focus:ring-[#D71921] transition-all disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#141416] dark:border-[#26262A] dark:text-white dark:placeholder:text-neutral-600",
              isPassword && "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors focus:outline-none p-1"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-[#D71921]" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {hint && !error && (
          <p className="text-[10px] text-neutral-500 font-mono">{hint}</p>
        )}
        {error && (
          <p className="text-[10px] text-red-500 font-mono">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
