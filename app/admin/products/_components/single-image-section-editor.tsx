"use client";

import * as React from "react";
import Image from "next/image";
import { Sparkles, Upload, Loader2, Trash2 } from "lucide-react";
import { getValidImageUrl } from "@/lib/utils";

interface SingleImageSectionEditorProps {
  sectionKey: string;
  label: string;
  image?: string;
  onUpdateImage: (url: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, sectionKey: string, idx: number) => Promise<void>;
  isUploading?: boolean;
}

export function SingleImageSectionEditor({
  sectionKey,
  label,
  image = "",
  onUpdateImage,
  onFileUpload,
  isUploading = false,
}: SingleImageSectionEditorProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4 font-mono text-xs">
      <div className="border-b border-neutral-100 pb-3 mb-2 flex sm:flex-row flex-col gap-2 items-center justify-between items-center">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#D71921]" />
          {label}
        </h2>
        {image ? (
          <span className="text-[10px] text-emerald-600 font-bold uppercase flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> IMAGE UPLOADED
          </span>
        ) : (
          <span className="text-[10px] text-neutral-400 uppercase">NO IMAGE UPLOADED</span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex sm:flex-row flex-col gap-2 items-center">
          <input
            type="text"
            placeholder="Upload image file or enter image URL..."
            value={image}
            onChange={(e) => onUpdateImage(e.target.value)}
            className="flex-1 sm:w-auto w-full bg-white border border-neutral-300 rounded p-2 text-neutral-900 font-mono text-[11px] focus:outline-none focus:border-[#D71921]"
          />

          <label
            htmlFor={`upload-single-${sectionKey}`}
            className="cursor-pointer sm:w-auto w-full bg-white border border-neutral-300 hover:border-neutral-400 p-2 text-[10px] rounded flex items-center justify-center flex-shrink-0 transition-colors select-none h-9 px-3 gap-1.5 font-bold font-mono"
            title="Upload Image"
          >
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#D71921]" />
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 text-neutral-600" />
                <span>UPLOAD IMAGE FILE</span>
              </>
            )}
          </label>
          <input
            id={`upload-single-${sectionKey}`}
            type="file"
            accept="image/*"
            onChange={(e) => onFileUpload(e, sectionKey, 0)}
            className="hidden "
          />
        </div>

        {image && (
          <div className="relative h-48 sm:h-64 w-full bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden flex items-center justify-center group">
            <Image src={getValidImageUrl(image)} alt={`${label} Preview`} fill sizes="800px" className="object-contain p-3" />
            <button
              type="button"
              onClick={() => onUpdateImage("")}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
              title="Remove image"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
