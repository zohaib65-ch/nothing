"use client";

import * as React from "react";
import Image from "next/image";
import { Info, Tag, Upload, Image as ImageIcon } from "lucide-react";
import { slugify, getValidImageUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";
import { VariantsInfoSection } from "./variants-info-section";

interface GeneralInfoSectionProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isUploading: boolean;
  uploadError: string | null;
}

export function GeneralInfoSection({ fileInputRef, handleFileUpload, isUploading, uploadError }: GeneralInfoSectionProps) {
  const { register, control, watch, setValue, formState } = useFormContext<ProductFormValues>();
  const errors = formState?.errors || {};

  const images = watch("images");
  const firstImage = images?.[0];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-6">
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
                      <SelectItem value="phones">PHONES</SelectItem>
                      <SelectItem value="audio">AUDIO</SelectItem>
                      <SelectItem value="cmf">CMF BY NOTHING</SelectItem>
                      <SelectItem value="accessories">ACCESSORIES</SelectItem>
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

      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
            <ImageIcon className="h-4 w-4 text-neutral-400" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">PRODUCT IMAGE</h2>
          </div>

          <div className="space-y-4">
            <div className="relative h-48 bg-neutral-50 border border-dashed border-neutral-300 rounded-lg overflow-hidden flex flex-col items-center justify-center p-4">
              {firstImage ? (
                <div className="relative w-full h-full">
                  <Image src={getValidImageUrl(firstImage)} alt="Product Preview" fill unoptimized className="object-contain" />
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <ImageIcon className="h-10 w-10 text-neutral-300 mx-auto" />
                  <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">No photo uploaded</p>
                </div>
              )}
            </div>

            <div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

              <Button
                type="button"
                variant="outline"
                size="sm"
                fullWidth
                isLoading={isUploading}
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<Upload className="h-3.5 w-3.5" />}
              >
                UPLOAD IMAGE FILE
              </Button>

              <p className="text-[10px] text-neutral-500 font-mono mt-2 text-center">PNG, JPG, or WEBP. Max size 5MB.</p>

              {uploadError && <p className="text-[10px] text-red-500 text-center font-mono mt-2">{uploadError}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
            <Tag className="h-4 w-4 text-neutral-400" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">STATUS & VISIBILITY</h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" {...register("isFeatured")} className="accent-[#D71921] h-4 w-4 rounded border-neutral-300" />
              <span className="font-bold tracking-wider select-none text-neutral-700 group-hover:text-neutral-950 transition-colors uppercase">
                Featured Product
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" {...register("isNewArrival")} className="accent-[#D71921] h-4 w-4 rounded border-neutral-300" />
              <span className="font-bold tracking-wider select-none text-neutral-700 group-hover:text-neutral-950 transition-colors uppercase">
                New Arrival
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
