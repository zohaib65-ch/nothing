"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product.schema";
import { MultiSectionEditor } from "./multi-section-editor";
import { HeroLeftSectionEditor } from "./hero-left-section-editor";

interface HeroShowcaseSectionProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, sectionKey: string, idx: number) => Promise<void>;
  uploadingIndex: { section: string; idx: number } | null;
}

export function HeroShowcaseSection({ onFileUpload, uploadingIndex }: HeroShowcaseSectionProps) {
  const { watch, setValue } = useFormContext<ProductFormValues>();
  const heroLeftSections = watch("heroLeftSections") || [];
  const heroRightSections = watch("heroRightSections") || [];

  const handleUpdateSectionItem = (sectionKey: "heroLeftSections" | "heroRightSections", idx: number, field: string, value: string) => {
    const currentSections = [...(watch(sectionKey) || [])];
    while (currentSections.length <= idx) {
      currentSections.push({ title: "", description: "", image: "" });
    }
    currentSections[idx] = { ...currentSections[idx], [field]: value };
    setValue(sectionKey, currentSections, { shouldDirty: true });
  };

  return (
    <div className="space-y-8">
      <HeroLeftSectionEditor
        items={heroLeftSections as any}
        onUpdateItem={(idx, field, value) => handleUpdateSectionItem("heroLeftSections", idx, field, value)}
        onFileUpload={onFileUpload}
        uploadingIndex={uploadingIndex}
      />

      <MultiSectionEditor
        sectionKey="heroRightSections"
        label="HERO SPEC SHOWCASE - RIGHT COLUMN"
        count={3}
        items={heroRightSections as any}
        onUpdateItem={(idx, field, value) => handleUpdateSectionItem("heroRightSections", idx, field, value)}
        onFileUpload={onFileUpload}
        uploadingIndex={uploadingIndex}
      />
    </div>
  );
}
