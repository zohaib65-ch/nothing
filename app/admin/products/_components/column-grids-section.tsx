"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";
import { SingleImageSectionEditor } from "./single-image-section-editor";

interface ColumnGridsSectionProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, sectionKey: string, idx: number) => Promise<void>;
  uploadingIndex: { section: string; idx: number } | null;
}

export function ColumnGridsSection({
  onFileUpload,
  uploadingIndex,
}: ColumnGridsSectionProps) {
  const { watch, setValue } = useFormContext<ProductFormValues>();
  
  const threeImage = watch("threeColumnSections")?.[0]?.image || "";
  const fourImage = watch("fourColumnSections")?.[0]?.image || "";
  const fiveImage = watch("fiveColumnSections")?.[0]?.image || "";

  const handleUpdateImage = (sectionKey: "threeColumnSections" | "fourColumnSections" | "fiveColumnSections", url: string) => {
    const currentSections = [...(watch(sectionKey) || [])];
    if (currentSections.length === 0) {
      currentSections.push({ title: "", description: "", image: url });
    } else {
      currentSections[0] = { ...currentSections[0], image: url };
    }
    setValue(sectionKey, currentSections, { shouldDirty: true });
  };

  return (
    <div className="space-y-8">
      <SingleImageSectionEditor
        sectionKey="threeColumnSections"
        label="3-COLUMN DETAIL SECTION IMAGE"
        image={threeImage}
        onUpdateImage={(url) => handleUpdateImage("threeColumnSections", url)}
        onFileUpload={onFileUpload}
        isUploading={uploadingIndex?.section === "threeColumnSections" && uploadingIndex?.idx === 0}
      />

      <SingleImageSectionEditor
        sectionKey="fourColumnSections"
        label="4-COLUMN DETAIL SECTION IMAGE"
        image={fourImage}
        onUpdateImage={(url) => handleUpdateImage("fourColumnSections", url)}
        onFileUpload={onFileUpload}
        isUploading={uploadingIndex?.section === "fourColumnSections" && uploadingIndex?.idx === 0}
      />

      <SingleImageSectionEditor
        sectionKey="fiveColumnSections"
        label="5-COLUMN DETAIL SECTION IMAGE"
        image={fiveImage}
        onUpdateImage={(url) => handleUpdateImage("fiveColumnSections", url)}
        onFileUpload={onFileUpload}
        isUploading={uploadingIndex?.section === "fiveColumnSections" && uploadingIndex?.idx === 0}
      />
    </div>
  );
}
