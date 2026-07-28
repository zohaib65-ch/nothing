"use client";

import * as React from "react";
import Image from "next/image";
import { Info, DollarSign, Tag, Upload, Image as ImageIcon } from "lucide-react";
import { slugify, getValidImageUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";

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
      {/* Left Side: General Info & Product Attributes (2 Cols) */}
      <div className="xl:col-span-2 space-y-6">
        {/* General Information Card */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
            <Info className="h-4 w-4 text-neutral-400" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">GENERAL INFORMATION</h2>
          </div>

          <div className="space-y-4 font-mono text-xs">
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

            <Input label="TAGLINE" placeholder="e.g. Pure Instinct" error={errors.tagline?.message} {...register("tagline")} />

            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500">SHORT DESCRIPTION</label>
              <textarea
                rows={2}
                placeholder="A brief summary of the product (shown in listings)..."
                {...register("shortDescription")}
                className={`w-full bg-white border rounded-lg p-3 text-neutral-900 font-mono text-xs focus:outline-none focus:border-[#D71921] focus:ring-1 focus:ring-[#D71921] transition-all ${
                  errors.shortDescription ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-neutral-300"
                }`}
              />
              {errors.shortDescription && <p className="text-[10px] text-red-500 font-mono mt-1">{errors.shortDescription.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500">DESCRIPTION</label>
              <textarea
                rows={5}
                placeholder="Detailed specifications, review, or copy..."
                {...register("description")}
                className={`w-full bg-white border rounded-lg p-3 text-neutral-900 font-mono text-xs focus:outline-none focus:border-[#D71921] focus:ring-1 focus:ring-[#D71921] transition-all ${
                  errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-neutral-300"
                }`}
              />
              {errors.description && <p className="text-[10px] text-red-500 font-mono mt-1">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        {/* Pricing & Classification Card */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
            <DollarSign className="h-4 w-4 text-neutral-400" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">PRICING & CLASSIFICATION</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <Input label="PRICE (RS)" type="number" placeholder="199" error={errors.price?.message} {...register("price", { setValueAs: (v) => (v === "" || v === null || v === undefined || isNaN(v) ? 0 : Number(v)) })} />
            <Input label="SALE PRICE (RS) (OPTIONAL)" type="number" placeholder="e.g. 179" error={errors.salePrice?.message} {...register("salePrice", { setValueAs: (v) => (v === "" || v === null || v === undefined || isNaN(v) ? undefined : Number(v)) })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">CATEGORY</label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`h-11 font-mono text-xs font-bold uppercase border focus:border-[#D71921] focus:ring-[#D71921] ${errors.category ? "border-red-500" : "border-neutral-300"}`}
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

            <Input label="SUBCATEGORY" placeholder="e.g. Smartphones, Earbuds" error={errors.subcategory?.message} {...register("subcategory")} />
          </div>
        </div>
      </div>

      {/* Right Side: Media, Visibility (1 Col) */}
      <div className="space-y-6">
        {/* Product Image Card */}
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

              <Button type="button" variant="outline" size="sm" fullWidth isLoading={isUploading} onClick={() => fileInputRef.current?.click()} leftIcon={<Upload className="h-3.5 w-3.5" />}>
                UPLOAD IMAGE FILE
              </Button>

              <p className="text-[10px] text-neutral-500 font-mono mt-2 text-center">PNG, JPG, or WEBP. Max size 5MB.</p>

              {uploadError && <p className="text-[10px] text-red-500 text-center font-mono mt-2">{uploadError}</p>}
            </div>
          </div>
        </div>

        {/* Status & Options Card */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
            <Tag className="h-4 w-4 text-neutral-400" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">STATUS & VISIBILITY</h2>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase text-neutral-500 font-bold tracking-wider">PUBLICATION STATUS</label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 font-mono text-xs font-bold uppercase border-neutral-300 focus:border-[#D71921] focus:ring-[#D71921]">
                      <SelectValue placeholder="SELECT STATUS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">PUBLISHED (ACTIVE)</SelectItem>
                      <SelectItem value="draft">DRAFT (HIDDEN)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" {...register("isFeatured")} className="accent-[#D71921] h-4 w-4 rounded border-neutral-300" />
                <span className="font-bold tracking-wider select-none text-neutral-700 group-hover:text-neutral-950 transition-colors uppercase">Featured Product</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" {...register("isNewArrival")} className="accent-[#D71921] h-4 w-4 rounded border-neutral-300" />
                <span className="font-bold tracking-wider select-none text-neutral-700 group-hover:text-neutral-950 transition-colors uppercase">New Arrival</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
