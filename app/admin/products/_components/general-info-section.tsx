"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";
import { CategoryInfo } from "@/types";
import { VariantsInfoSection } from "./variants-info-section";

export function GeneralInfoSection() {
  const { register, control, setValue, formState } = useFormContext<ProductFormValues>();
  const errors = formState?.errors || {};
  const [categories, setCategories] = React.useState<CategoryInfo[]>([]);

  React.useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setCategories(data);
          }
        }
      } catch (err) {
        console.error("Failed to load categories in product form", err);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
          <Info className="h-4 w-4 text-neutral-400" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">GENERAL INFORMATION & CLASSIFICATION</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <Input
            label="PRODUCT NAME"
            placeholder="e.g. NOTHING PHONE (4a)"
            error={errors.name?.message}
            {...register("name", {
              onChange: (e) => {
                setValue("slug", slugify(e.target.value), { shouldValidate: true });
              },
            })}
          />

          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">CATEGORY</label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={`h-11 font-mono text-xs font-bold rounded-none shadow-none uppercase border focus:border-[#D71921] focus:ring-[#D71921] ${errors.category ? "border-red-500" : "border-neutral-300"}`}
                  >
                    <SelectValue placeholder="SELECT CATEGORY" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => {
                      const val = cat.slug || cat.name?.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <SelectItem key={cat.id || val} value={val}>
                          {cat.name.toUpperCase()}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-[10px] text-red-500 font-mono mt-1">{errors.category.message}</p>}
          </div>
        </div>
      </div>

      <VariantsInfoSection />
    </div>
  );
}
