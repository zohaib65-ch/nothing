"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, Check, Copy, Trash2, Image as ImageIcon } from "lucide-react";

interface MediaItem {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = React.useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [copiedUrl, setCopiedUrl] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const loadMedia = React.useCallback(async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch {
      // Fallback
    }
  }, []);

  React.useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        loadMedia();
      }
    } catch {
      // Error
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCopyUrl = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6 font-mono text-xs text-white">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26262A] pb-6">
        <div>
          <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-white">
            MEDIA LIBRARY
          </h2>
          <p className="text-xs text-neutral-400 font-sans">
            Upload and manage product photos, specs diagrams, and media assets.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            variant="red"
            size="md"
            isLoading={isUploading}
            onClick={() => fileInputRef.current?.click()}
            leftIcon={<Upload className="h-4 w-4" />}
          >
            UPLOAD MEDIA FILE
          </Button>
        </div>
      </div>

      {/* Media Grid */}
      {mediaList.length === 0 ? (
        <div className="bg-[#0F0F10] border border-[#26262A] p-12 text-center text-neutral-500 space-y-3 rounded-lg">
          <ImageIcon className="h-12 w-12 mx-auto text-neutral-600" />
          <p className="uppercase tracking-wider text-xs">NO MEDIA FILES UPLOADED YET</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            UPLOAD FIRST FILE
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaList.map((media) => (
            <div
              key={media.filename}
              className="bg-[#0F0F10] border border-[#26262A] rounded-lg overflow-hidden group hover:border-white transition-all space-y-2 p-2 relative"
            >
              <div className="relative aspect-square bg-[#141416] rounded overflow-hidden">
                <Image
                  src={media.url}
                  alt={media.filename}
                  fill
                  sizes="200px"
                  className="object-contain p-2"
                />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-neutral-400 truncate" title={media.filename}>
                  {media.filename}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleCopyUrl(media.url)}
                    className="p-1 text-neutral-400 hover:text-white flex items-center space-x-1"
                    title="Copy URL"
                  >
                    {copiedUrl === media.url ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span className="text-[9px] uppercase">{copiedUrl === media.url ? "COPIED" : "COPY"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
