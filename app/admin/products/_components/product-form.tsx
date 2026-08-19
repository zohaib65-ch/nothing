"use client";

import * as React from "react";
import Link from "next/link";
import { Product, ProductVariant } from "@/types";
import { slugify, getValidImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, ChevronRight, ChevronLeft } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, ProductFormValues } from "@/lib/validations/product.schema";

import { GeneralInfoSection } from "./general-info-section";
import { HeroShowcaseSection } from "./hero-showcase-section";
import { BentoGridSection } from "./bento-grid-section";
import { ColumnGridsSection } from "./column-grids-section";
import { DisclaimerSection } from "./disclaimer-section";

interface ProductFormProps {
  initialProduct: Partial<Product>;
  isEditMode?: boolean;
  onSave: (product: Product) => Promise<void>;
  isSubmitting: boolean;
}

const STEPS = [
  { id: 1, label: "GENERAL INFO" },
  { id: 2, label: "HERO SHOWCASE" },
  { id: 3, label: "BENTO GRID (7)" },
  { id: 4, label: "COLUMN GRIDS" },
  { id: 5, label: "DISCLAIMER" },
];

export function ProductForm({ initialProduct, isEditMode = false, onSave, isSubmitting }: ProductFormProps) {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [uploadingIndex, setUploadingIndex] = React.useState<{ section: string; idx: number } | null>(null);
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema) as any,
    defaultValues: initialProduct as any,
  });

  const { handleSubmit, trigger, setValue, getValues } = methods;

  // Upload image for dynamic custom sections → Cloudinary
  const handleSectionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: string, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex({ section, idx });
    try {
      // Upload to Cloudinary via server API
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      const currentSections = (getValues(section as keyof ProductFormValues) as any[]) || [];
      while (currentSections.length <= idx) {
        currentSections.push({ title: "", description: "", image: "" });
      }
      currentSections[idx] = { ...currentSections[idx], image: data.url };
      setValue(section as keyof ProductFormValues, currentSections);

      toast.success("Section image uploaded to Cloudinary successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleNext = async () => {
    let isValid = true;
    if (currentStep === 1) {
      isValid = await trigger(["name", "category"]);
    }
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onInvalidForm = (errors: any) => {
    const fieldNames = Object.keys(errors);
    const errorMsg = fieldNames.length > 0 ? `Validation error in: ${fieldNames.join(", ")}` : "Please fill out all required fields.";
    toast.error(errorMsg);
  };

  const onSubmitForm = async (data: ProductFormValues) => {
    const finalSlug = data.slug || slugify(data.name || "");

    // Ensure variants array is formatted properly and filtered
    let updatedVariants: ProductVariant[] = (data.variants || [])
      .filter((v): v is NonNullable<typeof v> => v != null && typeof v === "object")
      .map((v) => {
        const st = v.storage || (v as any).capacity || "Standard";
        let hex = (v.colorHex || "#000000").trim();
        if (hex && !hex.startsWith("#")) {
          hex = `#${hex}`;
        }
        return {
          ...v,
          id: v.id || `var-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: v.name || `${v.color || "Standard"} - ${st}`,
          sku: v.sku || `SKU-${Date.now()}`,
          specifications: v.specifications || [],
          storage: st,
          capacity: st,
          color: v.color || "Standard",
          colorHex: hex.toUpperCase(),
          price: v.price !== undefined && v.price !== null ? Number(v.price) : Number(data.price) || 0,
          salePrice: v.salePrice !== undefined && v.salePrice !== null ? Number(v.salePrice) : data.salePrice,
          storagePrices: v.storagePrices || {},
        } as ProductVariant;
      });

    let primaryRawImage = "";
    if (updatedVariants.length > 0) {
      primaryRawImage = updatedVariants.find((v) => v && v.image)?.image || updatedVariants[0]?.image || "";
    } else {
      primaryRawImage = data.images?.[0] || "";
    }
    const validImage = getValidImageUrl(primaryRawImage);

    if (updatedVariants.length === 0) {
      const st = data.storageOptions?.[0] || "Standard";
      const cl = data.colors?.[0]?.name || "Standard";
      let clHex = (data.colors?.[0]?.hex || "#000000").trim();
      if (clHex && !clHex.startsWith("#")) clHex = `#${clHex}`;
      updatedVariants = [
        {
          id: `var-${Date.now()}`,
          name: `${cl} - ${st}`,
          storage: st,
          capacity: st,
          color: cl,
          colorHex: clHex.toUpperCase(),
          price: Number(data.price) || 0,
          salePrice: data.salePrice,
          storagePrices: {},
          sku: `SKU-${Date.now()}`,
          inStock: true,
          image: validImage || "",
          specifications: [],
        },
      ];
    }

    // Always extract storageOptions and colors directly from variants
    const finalStorageOptions = Array.from(
      new Set(updatedVariants.map((v) => v && (v.storage || (v as any).capacity)).filter(Boolean))
    ) as string[];

    const finalColors = Array.from(new Set(updatedVariants.map((v) => v && v.color).filter(Boolean))).map((c) => {
      let rawHex = (updatedVariants.find((v) => v && v.color === c)?.colorHex || "#000000").trim();
      if (rawHex && !rawHex.startsWith("#")) rawHex = `#${rawHex}`;
      return {
        name: c,
        hex: rawHex.toUpperCase(),
      };
    });

    const now = new Date().toISOString();
    let rootPrice = updatedVariants[0]?.price || 0;
    let rootSalePrice = updatedVariants[0]?.salePrice;

    if (!rootPrice && updatedVariants[0]?.storagePrices) {
      const spEntries = Object.values(updatedVariants[0].storagePrices) as any[];
      const firstSp = spEntries.find((sp) => sp.price || sp.salePrice);
      if (firstSp) {
        rootPrice = firstSp.price || firstSp.salePrice || 0;
        if (firstSp.salePrice && firstSp.price && firstSp.salePrice < firstSp.price) {
          rootSalePrice = firstSp.salePrice;
        }
      }
    }

    const rawDisclaimers = getValues("disclaimers") || data.disclaimers || [];
    const cleanDisclaimers = rawDisclaimers.filter((d) => typeof d === "string" && d.trim().length > 0);

    const fullProduct = {
      ...data,
      slug: finalSlug,
      price: rootPrice,
      salePrice: rootSalePrice,
      images: [validImage],
      storageOptions: finalStorageOptions,
      colors: finalColors,
      variants: updatedVariants,
      disclaimers: cleanDisclaimers,
      createdAt: data.createdAt || now,
      updatedAt: now,
    } as Product;

    await onSave(fullProduct);
  };

  return (
    <div className="space-y-6">
      {/* Wizard Steps Navigation */}
      <div className="flex border-b border-neutral-200 font-mono text-xs overflow-x-auto whitespace-nowrap pb-4 scrollbar-thin">
        {STEPS.map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setCurrentStep(step.id)}
            className={`px-5 py-3 font-bold border-b-2 uppercase transition-colors -mb-px flex items-center gap-2 ${
              currentStep === step.id
                ? "border-[#D71921] text-[#D71921] bg-neutral-50/50"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center border ${currentStep === step.id ? "border-[#D71921] bg-[#D71921]/10 text-[#D71921]" : "border-neutral-300 text-neutral-400"}`}
            >
              {step.id}
            </span>
            {step.label}
          </button>
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm, onInvalidForm)} className="space-y-6">
          {currentStep === 1 && <GeneralInfoSection />}
          {currentStep === 2 && <HeroShowcaseSection onFileUpload={handleSectionImageUpload} uploadingIndex={uploadingIndex} />}
          {currentStep === 3 && <BentoGridSection onFileUpload={handleSectionImageUpload} uploadingIndex={uploadingIndex} />}
          {currentStep === 4 && <ColumnGridsSection onFileUpload={handleSectionImageUpload} uploadingIndex={uploadingIndex} />}
          {currentStep === 5 && <DisclaimerSection />}

          <div className="flex sm:flex-row flex-col w-full gap-3 justify-between items-center pt-6 px-6 border-t border-neutral-200 bg-white sticky bottom-0 py-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-b-lg px-2 z-10">
            <div className="w-full sm:w-auto">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="sm:w-auto w-full"
                  size="md"
                  onClick={handlePrev}
                  leftIcon={<ChevronLeft className="h-4 w-4" />}
                >
                  PREVIOUS
                </Button>
              ) : (
                <Link href="/admin/products">
                  <Button type="button" variant="outline" className="sm:w-auto w-full" size="md">
                    CANCEL
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex sm:flex-row flex-col items-center gap-3 w-full sm:w-auto sm:ml-auto">
              {currentStep < 5 && (
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  className="bg-neutral-900 sm:w-auto w-full text-white hover:bg-neutral-800 whitespace-nowrap"
                  rightIcon={<ChevronRight className="h-4 w-4" />}
                >
                  NEXT STEP
                </Button>
              )}

              <Button
                type="submit"
                className="sm:w-auto w-full"
                variant="red"
                size="md"
                isLoading={isSubmitting}
                leftIcon={<Save className="h-4 w-4" />}
              >
                {isEditMode ? "SAVE CHANGES" : "SAVE PRODUCT"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
