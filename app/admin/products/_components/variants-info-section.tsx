"use client";

import * as React from "react";
import Image from "next/image";
import { Layers, Plus, Trash2, Upload, FileText } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getValidImageUrl } from "@/lib/utils";
import { SpecsModal } from "./specs-modal";
import { useColorFetcher } from "@/hooks/useColorFetcher";

const QUICK_COLOR_PRESETS = [
  { name: "Dark Grey", hex: "#1C1C1E" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Milk White", hex: "#F5F5F0" },
  { name: "Light Grey", hex: "#E5E5E5" },
  { name: "Red", hex: "#D71921" },
  { name: "Blue", hex: "#0B5CFF" },
  { name: "Pink", hex: "#FFB6C1" },
];

const STORAGE_PRESET_OPTIONS = ["8 + 128", "12 + 256", "16 + 512", "8GB + 128GB", "12GB + 256GB", "16GB + 512GB"];

export function VariantsInfoSection() {
  const { register, watch, setValue, control } = useFormContext<ProductFormValues>();
  const {
    formatValidHexForPicker,
    handleColorNameChange,
    handleColorHexInputChange,
    handleColorPickerChange,
  } = useColorFetcher(setValue, watch);
  const basePrice = watch("price") || 0;
  const baseSalePrice = watch("salePrice");

  const [uploadingVariantIndex, setUploadingVariantIndex] = React.useState<number | null>(null);
  const [editingSpecsIndex, setEditingSpecsIndex] = React.useState<number | null>(null);

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  // Single variant upload to Cloudinary
  const handleVariantImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, variantIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVariantIndex(variantIndex);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setValue(`variants.${variantIndex}.image`, data.url, { shouldDirty: true });
      toast.success("Variant image uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload variant image");
    } finally {
      setUploadingVariantIndex(null);
    }
  };

  const handleAddPresetVariant = (preset: { name: string; hex: string }) => {
    appendVariant({
      id: `var-${Date.now()}`,
      name: preset.name,
      color: preset.name,
      colorHex: preset.hex,
      storage: "",
      capacity: "",
      price: basePrice || 0,
      salePrice: baseSalePrice,
      sku: `SKU-${Date.now()}`,
      inStock: true,
      image: "",
    } as any);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3 mb-2">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-neutral-400" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">PRODUCT VARIANTS ({variantFields.length})</h2>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() =>
              appendVariant({
                id: `var-${Date.now()}`,
                name: "",
                color: "",
                colorHex: "",
                storage: "",
                capacity: "",
                price: basePrice || 0,
                salePrice: baseSalePrice,
                sku: "",
                inStock: true,
                image: "",
                specifications: [],
              } as any)
            }
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            className="bg-neutral-900 text-white hover:bg-neutral-800"
          >
            ADD VARIANT
          </Button>
        </div>

        {/* Quick Add Color Variant Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-neutral-100">
          <span className="text-[10px] text-neutral-400 uppercase font-bold mr-1">QUICK PRESETS:</span>
          {QUICK_COLOR_PRESETS.map((preset) => (
            <Button
              key={preset.name}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddPresetVariant(preset)}
              className="h-7 px-2.5 text-[10px] font-bold tracking-wider hover:bg-neutral-100 flex items-center gap-1.5"
            >
              <span className="w-2.5 h-2.5 rounded-full border border-neutral-400" style={{ backgroundColor: preset.hex }} />
              <span>+ {preset.name}</span>
            </Button>
          ))}
        </div>

        {variantFields.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-neutral-300 rounded-lg bg-neutral-50/50 space-y-3">
            <Layers className="h-8 w-8 text-neutral-300 mx-auto" />
            <p className="text-xs text-neutral-600 font-bold uppercase">No Product Variants Added</p>
            <p className="text-[11px] text-neutral-400 max-w-sm mx-auto">
              Click &quot;ADD VARIANT&quot; above to create custom color and RAM + storage variants for this product.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {variantFields.map((field, index) => {
              const variantImage = watch(`variants.${index}.image`);
              const currentColorVal = watch(`variants.${index}.color`);
              const currentColorHex = watch(`variants.${index}.colorHex`) || "#000000";
              const currentStorageVal = watch(`variants.${index}.storage`) || watch(`variants.${index}.capacity`);
              const variantSpecs = watch(`variants.${index}.specifications` as const);
              const hasCustomSpecs =
                Array.isArray(variantSpecs) &&
                variantSpecs.length > 0 &&
                variantSpecs.some((g) => g.items?.some((i) => i.value && i.value.trim() !== ""));

              return (
                <div
                  key={field.id}
                  className="bg-neutral-50/80 border border-neutral-200 rounded-xl p-5 font-mono text-xs space-y-5 shadow-sm hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                        #{index + 1}
                      </span>
                      <span className="w-4 h-4 rounded-full border border-neutral-400 shadow-inner" style={{ backgroundColor: currentColorHex }} />
                      <span className="font-bold text-neutral-900 text-xs uppercase tracking-wider">{currentColorVal || "New Variant"}</span>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVariant(index)}
                      className="text-neutral-400 hover:text-red-600 border-none p-1 h-auto"
                      title="Remove Variant"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Section 1: Color Name & Color Hex */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="COLOR NAME"
                      placeholder="e.g. White, Pink, Dark Grey"
                      {...register(`variants.${index}.color`, {
                        onChange: (e) => handleColorNameChange(index, e.target.value),
                      })}
                    />

                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">COLOR HEX</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formatValidHexForPicker(currentColorHex)}
                          onChange={(e) => handleColorPickerChange(index, e.target.value)}
                          className="w-10 h-10 border border-neutral-300 rounded-lg cursor-pointer p-0.5 flex-shrink-0 bg-white"
                        />
                        <Input
                          placeholder="#FFFFFF"
                          {...register(`variants.${index}.colorHex`, {
                            onChange: (e) => handleColorHexInputChange(index, e.target.value),
                          })}
                          className="uppercase flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: RAM & Storage / Capacity Dropdown & Input + Stock Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">
                        RAM + STORAGE / CAPACITIES (MULTIPLE SELECTION SUPPORTED)
                      </label>
                      <p className="text-[10px] text-neutral-400 font-mono">
                        Select preset options or enter comma-separated values (e.g., &quot;8 + 128, 12 + 256, 16 + 512&quot;)
                      </p>

                      <div className="flex flex-wrap gap-1.5 my-2">
                        {STORAGE_PRESET_OPTIONS.map((opt) => {
                          const currentArr = (currentStorageVal || "")
                            .split(",")
                            .map((s: string) => s.trim())
                            .filter(Boolean);
                          const isSelected = currentArr.includes(opt);

                          const togglePreset = () => {
                            let updated: string[];
                            if (isSelected) {
                              updated = currentArr.filter((item: string) => item !== opt);
                            } else {
                              updated = [...currentArr, opt];
                            }
                            const finalStr = updated.join(", ");
                            setValue(`variants.${index}.storage`, finalStr, { shouldDirty: true });
                            setValue(`variants.${index}.capacity`, finalStr, { shouldDirty: true });
                            const cl = watch(`variants.${index}.color`) || "";
                            setValue(`variants.${index}.name`, `${cl} - ${finalStr}`, { shouldDirty: true });
                          };

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={togglePreset}
                              className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-colors ${
                                isSelected
                                  ? "bg-neutral-900 text-white border-neutral-900 font-bold"
                                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                              }`}
                            >
                              {isSelected ? `✓ ${opt}` : `+ ${opt}`}
                            </button>
                          );
                        })}
                      </div>

                      <input
                        type="text"
                        placeholder="e.g. 8 + 128, 12 + 256, 16 + 512"
                        value={currentStorageVal || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setValue(`variants.${index}.storage`, val, { shouldDirty: true });
                          setValue(`variants.${index}.capacity`, val, { shouldDirty: true });
                          const cl = watch(`variants.${index}.color`) || "";
                          setValue(`variants.${index}.name`, `${cl} - ${val}`, { shouldDirty: true });
                        }}
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 font-mono text-xs focus:outline-none focus:border-[#D71921]"
                      />
                    </div>
                  </div>

                  {/* Section 3: Storage Specific Pricing */}
                  <div className="space-y-4 pt-2 border-t border-neutral-200/80">
                    {(() => {
                      const selectedStorages = (currentStorageVal || "")
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean);

                      const storagesToRender = selectedStorages.length > 0 ? selectedStorages : ["Standard"];

                      return (
                        <div className="bg-white border border-neutral-200 rounded-lg p-3 space-y-3">
                          <label className="block text-[11px] uppercase font-bold text-neutral-800 tracking-wider">
                            STORAGE-SPECIFIC PRICING (SET PRICE PER RAM + STORAGE)
                          </label>
                          <div className="space-y-2">
                            {storagesToRender.map((st) => {
                              const currentPriceObj = watch(`variants.${index}.storagePrices.${st}`);

                              const handleDeleteStoragePrice = () => {
                                const currentPrices = watch(`variants.${index}.storagePrices`) || {};
                                const newPrices = { ...currentPrices };
                                delete newPrices[st];
                                setValue(`variants.${index}.storagePrices`, newPrices, { shouldDirty: true });

                                if (selectedStorages.includes(st)) {
                                  const updatedArr = selectedStorages.filter((item: string) => item !== st);
                                  const finalStr = updatedArr.join(", ");
                                  setValue(`variants.${index}.storage`, finalStr, { shouldDirty: true });
                                  setValue(`variants.${index}.capacity`, finalStr, { shouldDirty: true });
                                  const cl = watch(`variants.${index}.color`) || "";
                                  setValue(`variants.${index}.name`, `${cl} - ${finalStr}`, { shouldDirty: true });
                                }
                                toast.success(`Removed "${st}" price & option`);
                              };

                              const isComingSoon = watch(`variants.${index}.storagePrices.${st}.isComingSoon`) || false;

                              return (
                                <div
                                  key={st}
                                  className="flex flex-col gap-2 p-2.5 bg-neutral-50 rounded-md border border-neutral-200"
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <span className="font-bold text-xs uppercase text-neutral-800 min-w-[100px]">{st}:</span>
                                    <div className="grid grid-cols-2 gap-2 flex-1">
                                      <input
                                        type="number"
                                        placeholder={isComingSoon ? "Coming Soon" : "Regular Price (e.g. 149999)"}
                                        disabled={isComingSoon}
                                        value={currentPriceObj?.price ?? ""}
                                        onChange={(e) => {
                                          const v = e.target.value;
                                          const num = v === "" || v === null || v === undefined || isNaN(Number(v)) ? undefined : Number(v);
                                          setValue(`variants.${index}.storagePrices.${st}.price` as const, num, { shouldDirty: true });
                                        }}
                                        className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900 focus:outline-none focus:border-[#D71921] disabled:bg-neutral-200/60 disabled:text-neutral-400 disabled:cursor-not-allowed"
                                      />
                                      <input
                                        type="number"
                                        placeholder={isComingSoon ? "Coming Soon" : "Sale Price (Optional)"}
                                        disabled={isComingSoon}
                                        value={currentPriceObj?.salePrice ?? ""}
                                        onChange={(e) => {
                                          const v = e.target.value;
                                          const num = v === "" || v === null || v === undefined || isNaN(Number(v)) ? undefined : Number(v);
                                          setValue(`variants.${index}.storagePrices.${st}.salePrice` as const, num, { shouldDirty: true });
                                        }}
                                        className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900 focus:outline-none focus:border-[#D71921] disabled:bg-neutral-200/60 disabled:text-neutral-400 disabled:cursor-not-allowed"
                                      />
                                    </div>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={handleDeleteStoragePrice}
                                      className="text-neutral-400 hover:text-red-600 border-none p-1.5 h-auto self-end sm:self-center shrink-0"
                                      title={`Delete ${st} pricing and option`}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>

                                  {/* Coming Soon Checkbox Below Storage Inputs */}
                                  <div className="flex items-center gap-2 pt-1 border-t border-neutral-200/60">
                                    <label className="inline-flex items-center gap-1.5 cursor-pointer text-[10px] font-mono uppercase font-bold text-neutral-600 select-none hover:text-neutral-900">
                                      <input
                                        type="checkbox"
                                        checked={isComingSoon}
                                        onChange={(e) => {
                                          const checked = e.target.checked;
                                          setValue(`variants.${index}.storagePrices.${st}.isComingSoon` as const, checked, { shouldDirty: true });
                                        }}
                                        className="h-3.5 w-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                                      />
                                      <span className={isComingSoon ? "text-[#D71921] font-bold" : "text-neutral-500"}>
                                        {isComingSoon ? "✓ COMING SOON ENABLED" : "MARK AS COMING SOON"}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Section 4: Variant Image Upload */}
                  <div className="pt-3 border-t border-neutral-200/80 space-y-2">
                    <label className="block text-[11px] uppercase font-bold text-neutral-500 tracking-wider">VARIANT SPECIFIC IMAGE</label>
                    <div className="flex items-center gap-4 bg-white border border-neutral-200 rounded-lg p-3">
                      <div className="relative w-16 h-16 bg-neutral-50 border border-neutral-200 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {variantImage ? (
                          <Image src={getValidImageUrl(variantImage)} alt="Variant Preview" fill unoptimized className="object-contain p-1" />
                        ) : (
                          <span className="text-[9px] text-neutral-400 font-mono text-center px-1">NO IMAGE</span>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <Input placeholder="Image URL or upload file..." {...register(`variants.${index}.image`)} className="flex-1" />

                        <label className="inline-flex items-center justify-center px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-mono text-[11px] font-bold uppercase cursor-pointer transition-colors whitespace-nowrap gap-2">
                          <Upload className="h-3.5 w-3.5" />
                          <span>{uploadingVariantIndex === index ? "UPLOADING..." : "UPLOAD FILE"}</span>
                          <input type="file" accept="image/*" onChange={(e) => handleVariantImageUpload(e, index)} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Variant Specifications */}
                  <div className="pt-3 border-t border-neutral-200/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-neutral-200 rounded-lg p-3">
                      <div className="flex items-center gap-2.5 font-mono text-xs">
                        <FileText className="h-4 w-4 text-neutral-500 shrink-0" />
                        <div>
                          <span className="font-bold text-neutral-800 uppercase tracking-wider block text-[11px]">VARIANT SPECIFICATIONS</span>
                          <span className="text-[10px] text-neutral-400 block">
                            {hasCustomSpecs ? "Custom specifications configured for this variant" : "No custom specs set for this variant"}
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingSpecsIndex(index)}
                        className={`h-8 px-3 text-[11px] font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                          hasCustomSpecs
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                            : "border-neutral-300 hover:bg-neutral-900 hover:text-white"
                        }`}
                      >
                        {hasCustomSpecs ? "EDIT SPECS" : "+ CONFIGURE SPECS"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {editingSpecsIndex !== null && (
        <SpecsModal
          isOpen={editingSpecsIndex !== null}
          onClose={() => setEditingSpecsIndex(null)}
          specifications={watch(`variants.${editingSpecsIndex}.specifications` as const) || []}
          onSave={(updatedSpecs) => {
            setValue(`variants.${editingSpecsIndex}.specifications` as const, updatedSpecs, { shouldDirty: true });
            toast.success(`Specs saved for Variant #${editingSpecsIndex + 1}`);
            setEditingSpecsIndex(null);
          }}
        />
      )}
    </div>
  );
}
