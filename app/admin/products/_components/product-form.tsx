"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/types";
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
];

export function ProductForm({ initialProduct, isEditMode = false, onSave, isSubmitting }: ProductFormProps) {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [uploadingIndex, setUploadingIndex] = React.useState<{ section: string; idx: number } | null>(null);
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema) as any,
    defaultValues: initialProduct as any,
  });

  const {
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  // Handle direct product image file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
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

      const currentImages = getValues("images") || [];
      setValue("images", [data.url, ...currentImages.slice(1)]);
      toast.success("Image uploaded successfully.");
    } catch (err: any) {
      const errorMsg = err.message || "Failed to upload image";
      setUploadError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Upload image for dynamic custom sections
  const handleSectionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: string, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex({ section, idx });
    try {
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

      toast.success("Section image uploaded successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleNext = async () => {
    let isValid = true;
    if (currentStep === 1) {
      isValid = await trigger(["name", "tagline", "shortDescription", "description", "price", "category", "subcategory"]);
    }
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onInvalidForm = (errors: any) => {
    console.error("Validation Errors:", errors);
    const fieldNames = Object.keys(errors);
    const errorMsg = fieldNames.length > 0 
      ? `Validation error in: ${fieldNames.join(", ")}`
      : "Please fill out all required fields.";
    toast.error(errorMsg);
  };

  const onSubmitForm = async (data: ProductFormValues) => {
    const finalSlug = data.slug || slugify(data.name || "");
    const validImage = getValidImageUrl(data.images?.[0]);

    // Sync primary price to standard variant
    const updatedVariants =
      data.variants?.map((v, i) => {
        if (i === 0) {
          return {
            ...v,
            price: data.price || 199,
            salePrice: data.salePrice,
          };
        }
        return v;
      }) || [];

    const now = new Date().toISOString();
    const fullProduct = {
      ...data,
      slug: finalSlug,
      images: [validImage],
      variants: updatedVariants,
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
          {currentStep === 1 && (
            <GeneralInfoSection fileInputRef={fileInputRef} handleFileUpload={handleFileUpload} isUploading={isUploading} uploadError={uploadError} />
          )}
          {currentStep === 2 && <HeroShowcaseSection onFileUpload={handleSectionImageUpload} uploadingIndex={uploadingIndex} />}
          {currentStep === 3 && <BentoGridSection onFileUpload={handleSectionImageUpload} uploadingIndex={uploadingIndex} />}
          {currentStep === 4 && <ColumnGridsSection onFileUpload={handleSectionImageUpload} uploadingIndex={uploadingIndex} />}

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
              {currentStep < 4 && (
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
