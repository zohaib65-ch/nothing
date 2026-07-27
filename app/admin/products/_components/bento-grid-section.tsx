"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";
import { MultiSectionEditor } from "./multi-section-editor";

interface BentoGridSectionProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, sectionKey: string, idx: number) => Promise<void>;
  uploadingIndex: { section: string; idx: number } | null;
}

export function BentoGridSection({ onFileUpload, uploadingIndex }: BentoGridSectionProps) {
  const { watch, setValue } = useFormContext<ProductFormValues>();

  const bentoSections = watch("bentoSections") || [];

  const handleUpdateSectionItem = (sectionKey: "bentoSections", idx: number, field: string, value: string) => {
    const currentSections = [...(watch(sectionKey) || [])];
    while (currentSections.length <= idx) {
      currentSections.push({ title: "", description: "", image: "" });
    }
    currentSections[idx] = { ...currentSections[idx], [field]: value };
    setValue(sectionKey, currentSections, { shouldDirty: true });
  };

  return (
    <div className="space-y-8">
      <MultiSectionEditor
        sectionKey="bentoSections"
        label="BENTO FEATURE GRID"
        count={7}
        items={bentoSections as any}
        onUpdateItem={(idx, field, value) => handleUpdateSectionItem("bentoSections", idx, field, value)}
        onFileUpload={onFileUpload}
        uploadingIndex={uploadingIndex}
      />
    </div>
  );
}
