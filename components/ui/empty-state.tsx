import * as React from "react";
import { SearchX } from "lucide-react";
import { Button } from "./button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "NO PRODUCTS FOUND",
  description = "Try adjusting your search query or filters to find what you are looking for.",
  actionLabel,
  onAction,
  icon = <SearchX className="h-10 w-10 text-[#D71921]" />,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[#26262A] bg-[#0F0F10] space-y-4 my-8">
      <div className="p-4 rounded-full bg-[#D71921]/10 border border-[#D71921]/20">
        {icon}
      </div>
      <h3 className="font-mono text-base font-bold uppercase tracking-widest text-white">
        {title}
      </h3>
      <p className="text-xs text-neutral-400 font-sans max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
