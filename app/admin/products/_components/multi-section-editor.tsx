"use client";

import * as React from "react";
import Image from "next/image";
import { Sparkles, Upload, Loader2, Trash2 } from "lucide-react";
import { CustomSectionItem } from "@/types";
import { getValidImageUrl } from "@/lib/utils";

interface MultiSectionEditorProps {
  sectionKey: string;
  label: string;
  count: number;
  items: CustomSectionItem[];
  onUpdateItem: (idx: number, field: string, value: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, sectionKey: string, idx: number) => Promise<void>;
  uploadingIndex: { section: string; idx: number } | null;
}

export function MultiSectionEditor({ sectionKey, label, count, items, onUpdateItem, onFileUpload, uploadingIndex }: MultiSectionEditorProps) {
  const normalizedItems = Array.from({ length: count }, (_, i) => {
    return items[i] || { title: "", description: "", image: "" };
  });

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-6 font-mono text-xs">
      <div className="border-b border-neutral-100 pb-3 mb-2 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#D71921]" />
          {label} ({count} SECTIONS)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {normalizedItems.map((item, idx) => (
          <div key={idx} className="border border-neutral-200 rounded-lg p-4 bg-neutral-50/50 space-y-4 relative">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase">SECTION {idx + 1}</span>
              {item.title || item.description || item.image ? (
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" title="Active Section Data" />
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" title="Empty" />
              )}
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">TITLE</label>
                <input
                  type="text"
                  placeholder="Enter section title..."
                  value={item.title || ""}
                  onChange={(e) => onUpdateItem(idx, "title", e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded p-2 text-neutral-900 font-mono text-[11px] focus:outline-none focus:border-[#D71921]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">IMAGE URL / UPLOAD</label>
                <div className="flex sm:flex-row flex-col sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. /uploads/image.png"
                    value={item.image || ""}
                    onChange={(e) => onUpdateItem(idx, "image", e.target.value)}
                    className="flex-1 bg-white border border-neutral-300 rounded p-2 text-neutral-900 font-mono text-[11px] focus:outline-none focus:border-[#D71921]"
                  />

                  <label
                    htmlFor={`upload-${sectionKey}-${idx}`}
                    className="cursor-pointer bg-white border sm:w-auto w-full  border-neutral-300 hover:border-neutral-400 p-2 text-[10px] rounded flex items-center justify-center flex-shrink-0 transition-colors select-none h-9 w-9"
                    title="Upload Image"
                  >
                    {uploadingIndex?.section === sectionKey && uploadingIndex?.idx === idx ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-[#D71921]" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 text-neutral-600" />
                    )}
                  </label>
                  <input
                    id={`upload-${sectionKey}-${idx}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileUpload(e, sectionKey, idx)}
                    className="hidden"
                  />
                </div>

                {item.image && (
                  <div className="relative h-24 w-full mt-2 bg-white border border-neutral-200 rounded overflow-hidden flex items-center justify-center group">
                    <Image
                      src={getValidImageUrl(item.image)}
                      alt={`Preview Section ${idx + 1}`}
                      fill
                      unoptimized
                      sizes="250px"
                      className="object-contain p-1.5"
                    />
                    <button
                      type="button"
                      onClick={() => onUpdateItem(idx, "image", "")}
                      className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
