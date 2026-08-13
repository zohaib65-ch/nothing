"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DisclaimerSection() {
  const { watch, setValue, getValues } = useFormContext<ProductFormValues>();
  
  const watchedDisclaimers = watch("disclaimers");
  const disclaimers = React.useMemo(() => {
    if (Array.isArray(watchedDisclaimers) && watchedDisclaimers.length > 0) {
      return watchedDisclaimers;
    }
    const initial = getValues("disclaimers");
    if (Array.isArray(initial) && initial.length > 0) {
      return initial;
    }
    return [""];
  }, [watchedDisclaimers, getValues]);

  const updateDisclaimer = (index: number, value: string) => {
    const newDisclaimers = [...disclaimers];
    newDisclaimers[index] = value;
    setValue("disclaimers", newDisclaimers, { shouldDirty: true });
  };

  const addDisclaimer = () => {
    setValue("disclaimers", [...disclaimers, ""], { shouldDirty: true });
  };

  const removeDisclaimer = (index: number) => {
    const newDisclaimers = [...disclaimers];
    newDisclaimers.splice(index, 1);
    setValue("disclaimers", newDisclaimers, { shouldDirty: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-900 font-mono">Disclaimers</h3>
        <Button
          type="button"
          onClick={addDisclaimer}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          ADD DISCLAIMER
        </Button>
      </div>

      <div className="space-y-4">
        {disclaimers.map((disclaimer, index) => (
          <div key={index} className="p-4 border border-neutral-200 rounded-xl bg-white space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-neutral-400">DISCLAIMER {index + 1}</span>
              {disclaimers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDisclaimer(index)}
                  className="text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <textarea
              value={disclaimer}
              onChange={(e) => updateDisclaimer(index, e.target.value)}
              className="w-full bg-neutral-100 rounded-lg border-transparent focus:border-neutral-900 focus:ring-0 p-3 min-h-[100px] font-mono text-sm"
              placeholder="Enter disclaimer text..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}
