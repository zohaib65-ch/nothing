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
  const [searchQuery, setSearchQuery] = React.useState("");
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

  const filteredMedia = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return mediaList;
    const tokens = q.split(/\s+/).filter(Boolean);
    return mediaList.filter((m) => {
      const text = `${m.filename} ${m.url}`.toLowerCase();
      return tokens.every((tok) => text.includes(tok));
    });
  }, [mediaList, searchQuery]);

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
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6 font-mono text-xs text-neutral-900 select-none">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-neutral-900">
            MEDIA LIBRARY
          </h2>
          <p className="text-xs text-neutral-500 font-sans">
            Upload and manage product photos, specs diagrams, and media assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="SEARCH MEDIA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-neutral-200 px-3 py-1.5 font-mono text-xs rounded-lg shadow-sm focus:outline-none focus:border-[#D71921]"
          />
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
      {filteredMedia.length === 0 ? (
        <div className="bg-white border border-neutral-200 p-12 text-center text-neutral-500 space-y-3 rounded-xl shadow-sm">
          <ImageIcon className="h-12 w-12 mx-auto text-neutral-400" />
          <p className="uppercase tracking-wider text-xs">NO MEDIA FILES FOUND</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            UPLOAD FILE
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((media) => (
            <div
              key={media.filename}
              className="bg-white border border-neutral-200 rounded-lg overflow-hidden group hover:border-neutral-400 transition-all space-y-2 p-2 relative shadow-sm"
            >
              <div className="relative aspect-square bg-neutral-50 border border-neutral-100 rounded overflow-hidden">
                <Image
                  src={media.url}
                  alt={media.filename}
                  fill
                  unoptimized
                  sizes="200px"
                  className="object-contain p-2"
                />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-neutral-600 truncate" title={media.filename}>
                  {media.filename}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleCopyUrl(media.url)}
                    className="p-1 text-neutral-500 hover:text-neutral-900 flex items-center space-x-1 cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedUrl === media.url ? (
                      <Check className="h-3.5 w-3.5 text-green-600" />
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
