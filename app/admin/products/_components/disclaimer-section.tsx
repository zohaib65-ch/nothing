"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";

export function DisclaimerSection() {
  const { watch, setValue, getValues } = useFormContext<ProductFormValues>();
  
  const watchedDisclaimers = watch("disclaimers");
  const disclaimer = React.useMemo(() => {
    if (Array.isArray(watchedDisclaimers) && watchedDisclaimers.length > 0) {
      return watchedDisclaimers[0] || "";
    }
    const initial = getValues("disclaimers");
    if (Array.isArray(initial) && initial.length > 0) {
      return initial[0] || "";
    }
    return "";
  }, [watchedDisclaimers, getValues]);

  const updateDisclaimer = (value: string) => {
    setValue("disclaimers", [value], { shouldDirty: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-900 font-mono">Disclaimer</h3>
      </div>

      <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-4">
        <textarea
          value={disclaimer}
          onChange={(e) => updateDisclaimer(e.target.value)}
          className="w-full bg-neutral-100 rounded-lg border-transparent focus:border-neutral-900 focus:ring-0 p-3 min-h-[100px] font-mono text-sm"
          placeholder="Enter disclaimer text..."
        />
      </div>
    </div>
  );
}
