"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-lattera uppercase tracking-widest text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:border-white",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200 dark:bg-[#1C1C1E] dark:text-white dark:hover:bg-[#2C2C2E] dark:border-[#2C2C2E]",
        red: "bg-[#D71921] text-white hover:bg-[#B51219] shadow-[0_0_20px_rgba(215,25,33,0.35)]",
        outline: "bg-transparent text-neutral-900 border border-neutral-300 hover:bg-neutral-50 dark:text-white dark:border-[#3A3A40] dark:hover:border-white dark:hover:bg-white/5",
        ghost: "bg-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5",
        ndot: "bg-transparent text-[#D71921] border border-[#D71921] font-ndot hover:bg-[#D71921]/10 dark:text-red-500",
      },
      size: {
        sm: "h-9 px-4 text-[10px]",
        md: "h-11 px-6 text-xs",
        lg: "h-13 px-8 text-sm",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
