"use client";

import * as React from "react";
import Image from "next/image";
import { ProductService } from "@/services/productService";
import { CategoryInfo } from "@/types";
import { slugify, getValidImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Edit2, Plus, Trash2, Upload, Image as ImageIcon, AlertTriangle } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = React.useState<CategoryInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<Partial<CategoryInfo> | null>(null);

  // Custom Delete Modal state (replaces browser confirm/alert)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = React.useState<CategoryInfo | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const loadCategories = React.useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
          return;
        }
      }
    } catch {
      // Error
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);
    loadCategories();
  }, [loadCategories]);

  if (!mounted) {
    return <div className="p-8 text-xs font-mono text-neutral-500 animate-pulse">LOADING CATEGORY CONTROL PANEL...</div>;
  }

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

      setEditingCategory((prev) => ({
        ...prev,
        heroImage: data.url,
      }));
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleOpenCreateModal = () => {
    const timestamp = Date.now();
    setEditingCategory({
      id: `cat-${timestamp}`,
      name: "",
      slug: "",
      description: "",
      heroImage: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      badge: "NEW CATEGORY",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (cat: CategoryInfo) => {
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  const handlePromptDelete = (cat: CategoryInfo) => {
    setCategoryToDelete(cat);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);

    const targetId = (categoryToDelete as any)._id || categoryToDelete.id || categoryToDelete.slug;

    try {
      await fetch(`/api/categories/${targetId}`, { method: "DELETE" });
    } catch {
      // Fallback
    }

    await ProductService.deleteCategory(targetId, categoryToDelete.slug);
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
    setIsDeleting(false);
    await loadCategories();
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) return;

    const finalSlug = editingCategory.slug || slugify(editingCategory.name);
    const updatedCat: CategoryInfo = {
      ...editingCategory,
      slug: finalSlug,
      heroImage: getValidImageUrl(editingCategory.heroImage),
    } as CategoryInfo;

    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCat),
      });
    } catch {
      // Fallback
    }

    ProductService.saveCategory(updatedCat);
    setIsModalOpen(false);
    await loadCategories();
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-neutral-900">CATEGORY MANAGEMENT</h2>
          <p className="text-xs text-neutral-500 font-sans">Create and manage storefront category banners, descriptions, and badges.</p>
        </div>

        <Button variant="red" size="md" onClick={handleOpenCreateModal} leftIcon={<Plus className="h-4 w-4" />}>
          ADD CATEGORY
        </Button>
      </div>

      {/* Category Grid - Modern Compact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const imageUrl = getValidImageUrl(cat.heroImage);
          const keyId = (cat as any)._id || cat.id || cat.slug;
          return (
            <div
              key={keyId}
              className="bg-white border border-neutral-200/80 rounded-2xl p-4 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200 font-sans"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] w-full bg-neutral-100 rounded-xl overflow-hidden border border-neutral-100">
                  <Image
                    src={imageUrl}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                  {cat.badge && (
                    <span className="absolute top-2 right-2 font-mono text-[9px] bg-[#D71921] text-white px-2 py-0.5 uppercase tracking-wider font-bold rounded-md shadow-sm">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-neutral-900 line-clamp-1">{cat.name}</h3>
                  <p className="text-[11px] text-neutral-500 font-normal line-clamp-2 leading-relaxed">
                    {cat.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-neutral-100">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  leftIcon={<Edit2 className="h-3.5 w-3.5" />}
                  onClick={() => handleEdit(cat)}
                  className="h-8 text-xs font-semibold rounded-lg"
                >
                  EDIT
                </Button>
                <button
                  onClick={() => handlePromptDelete(cat)}
                  className="p-1.5 bg-neutral-50 text-neutral-400 hover:text-red-600 hover:bg-red-50 border border-neutral-200/60 rounded-lg transition-colors cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Create/Edit Modal */}
      {isModalOpen && editingCategory && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingCategory.name ? `EDIT CATEGORY: ${editingCategory.name}` : "CREATE NEW CATEGORY"}
        >
          <form onSubmit={handleSaveCategory} className="space-y-4 font-mono text-xs text-neutral-900">
            <Input
              label="CATEGORY NAME"
              value={editingCategory.name || ""}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  name: e.target.value,
                  slug: slugify(e.target.value),
                })
              }
              required
            />

            <Input
              label="BADGE TAG (OPTIONAL)"
              placeholder="e.g. FLAGSHIP, NEW RELEASE"
              value={editingCategory.badge || ""}
              onChange={(e) => setEditingCategory({ ...editingCategory, badge: e.target.value })}
            />

            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase text-neutral-500 font-bold">DESCRIPTION</label>
              <textarea
                rows={3}
                value={editingCategory.description || ""}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 font-mono text-xs focus:outline-none focus:border-[#D71921]"
              />
            </div>

            {/* Direct Image File Uploader */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase text-neutral-500 font-bold">CATEGORY HERO BANNER IMAGE (FILE UPLOAD)</label>

              <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 p-4 rounded-lg">
                <div className="relative h-20 w-32 bg-white border border-neutral-200 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {editingCategory.heroImage ? (
                    <Image src={getValidImageUrl(editingCategory.heroImage)} alt="Banner Preview" fill sizes="128px" className="object-cover" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-neutral-400" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    isLoading={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    leftIcon={<Upload className="h-3.5 w-3.5" />}
                  >
                    UPLOAD BANNER IMAGE
                  </Button>

                  {uploadError && <p className="text-[10px] text-red-500">{uploadError}</p>}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-neutral-200">
              <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                CANCEL
              </Button>
              <Button variant="red" type="submit">
                SAVE CATEGORY
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Styled Custom Delete Category Confirmation Modal (No browser alert) */}
      {isDeleteModalOpen && categoryToDelete && (
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="CONFIRM CATEGORY DELETION" maxWidth="md">
          <div className="space-y-4 font-mono text-xs text-neutral-900">
            <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-bold uppercase text-red-800">PERMANENT DELETE</p>
                <p className="text-[11px] text-neutral-600 font-sans">
                  Are you sure you want to delete category{" "}
                  <span className="text-neutral-900 font-bold font-mono font-lg">"{categoryToDelete.name}"</span>? This will permanently remove it
                  from MongoDB.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-neutral-200">
              <Button variant="outline" type="button" onClick={() => setIsDeleteModalOpen(false)}>
                CANCEL
              </Button>
              <Button variant="red" type="button" isLoading={isDeleting} onClick={handleConfirmDelete} leftIcon={<Trash2 className="h-4 w-4" />}>
                DELETE CATEGORY
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
