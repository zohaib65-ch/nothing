"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "md",
  className,
}: ModalProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-transparent overflow-hidden border-none outline-none w-full h-full max-w-none max-h-none backdrop:bg-black/80 backdrop:backdrop-blur-md open:animate-in open:fade-in duration-200",
        className
      )}
    >
      <div
        className="fixed inset-0 cursor-default"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative w-full bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 z-10 space-y-6 text-neutral-900 max-h-[90vh] overflow-y-auto no-scrollbar rounded-xl dark:bg-[#0F0F10] dark:border-[#26262A] dark:text-white",
          maxWidthClasses[maxWidth]
        )}
      >
        <div className="flex items-start justify-between border-b border-neutral-200 dark:border-[#26262A] pb-4">
          <div>
            {title && (
              <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D71921]" />
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-1">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </dialog>
  );
}
