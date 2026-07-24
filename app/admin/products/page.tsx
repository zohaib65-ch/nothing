"use client";

import * as React from "react";
import Image from "next/image";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { formatPrice, slugify, getValidImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getColumns } from "./_components/columns";
import { Plus, Search, Edit2, Trash2, Star, Upload, Image as ImageIcon, AlertTriangle } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Partial<Product> | null>(null);

  // Custom Delete Modal State (No browser alert/confirm)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [mounted, setMounted] = React.useState(false);

  // Image upload state
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const loadProducts = React.useCallback(async () => {
    const data = await ProductService.fetchProductsFromApi();
    setProducts(data);
  }, []);

  React.useEffect(() => {
    setMounted(true);
    loadProducts();
    window.addEventListener("products_updated", loadProducts);
    return () => window.removeEventListener("products_updated", loadProducts);
  }, [loadProducts]);


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

      setEditingProduct((prev) => ({
        ...prev,
        images: [data.url],
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
    setEditingProduct({
      id: `prod-${timestamp}`,
      name: "",
      slug: "",
      tagline: "",
      description: "",
      shortDescription: "",
      price: 199,
      category: "phones",
      subcategory: "Smartphones",
      images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"],
      gallery: [],
      storageOptions: ["256GB"],
      colors: [{ name: "Dark Grey", hex: "#1C1C1E" }],
      variants: [
        {
          id: `var-${timestamp}`,
          name: "Standard 256GB",
          storage: "256GB",
          color: "Dark Grey",
          colorHex: "#1C1C1E",
          price: 199,
          sku: `SKU-${timestamp}`,
          inStock: true,
        },
      ],
      specifications: [
        {
          category: "General Hardware",
          items: [{ name: "Processor", value: "High Performance SOC" }],
        },
      ],
      features: [],
      highlights: [{ title: "DISPLAY", value: "120Hz OLED", subtitle: "High brightness" }],
      isFeatured: false,
      isNewArrival: true,
      sortOrder: 1,
      status: "published",
      seo: { metaTitle: "", metaDescription: "", keywords: [] },
    });
    setIsModalOpen(true);
  };

  const handleEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handlePromptDelete = (prod: Product) => {
    setProductToDelete(prod);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    await ProductService.deleteProduct(productToDelete.id);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
    setIsDeleting(false);
    loadProducts();
  };

  const handleToggleFeatured = async (prod: Product) => {
    await ProductService.saveProductApi({ ...prod, isFeatured: !prod.isFeatured });
    loadProducts();
  };

  const handleToggleStatus = async (prod: Product) => {
    const newStatus = prod.status === "published" ? "draft" : "published";
    await ProductService.saveProductApi({ ...prod, status: newStatus });
    loadProducts();
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;

    const finalSlug = editingProduct.slug || slugify(editingProduct.name);
    const validImage = getValidImageUrl(editingProduct.images?.[0]);

    const fullProduct: Product = {
      ...editingProduct,
      slug: finalSlug,
      images: [validImage],
      createdAt: editingProduct.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Product;

    await ProductService.saveProductApi(fullProduct);
    setIsModalOpen(false);
    loadProducts();
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => getColumns(handleToggleFeatured, handleToggleStatus, handleEdit, handlePromptDelete),
    [handleToggleFeatured, handleToggleStatus, handleEdit, handlePromptDelete]
  );

  if (!mounted) {
    return <div className="p-8 text-xs font-mono text-neutral-500 animate-pulse">LOADING PRODUCTS CONTROL PANEL...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-neutral-900">
            PRODUCT MANAGEMENT
          </h2>
          <p className="text-xs text-neutral-500 font-sans">
            Create, edit, delete, publish, or feature products in your MongoDB catalog.
          </p>
        </div>

        <Button variant="red" size="md" onClick={handleOpenCreateModal} leftIcon={<Plus className="h-4 w-4" />}>
          CREATE PRODUCT
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <input
          type="text"
          placeholder="SEARCH PRODUCTS BY NAME OR CATEGORY..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-neutral-200 pl-10 pr-4 py-2.5 font-mono text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D71921] transition-all rounded-lg shadow-sm"
        />
      </div>

      {/* Products Table */}
      <DataTable columns={columns} data={filteredProducts} showPagination={true} pageSize={8} />

      {/* Direct Image File Upload Product Form Modal */}
      {isModalOpen && editingProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct.name ? `EDIT: ${editingProduct.name}` : "CREATE NEW PRODUCT"}
          maxWidth="xl"
        >
          <form onSubmit={handleSaveProduct} className="space-y-4 font-mono text-xs">
            <Input
              label="PRODUCT NAME"
              value={editingProduct.name || ""}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                  slug: slugify(e.target.value),
                })
              }
              required
            />

            {/* Direct Image File Upload Field */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase text-neutral-500 font-bold">
                PRODUCT IMAGE UPLOAD
              </label>

              <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 p-4 rounded-lg">
                <div className="relative h-20 w-20 bg-white border border-neutral-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {editingProduct.images?.[0] ? (
                    <Image
                      src={getValidImageUrl(editingProduct.images[0])}
                      alt="Product Preview"
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-neutral-400" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    isLoading={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    leftIcon={<Upload className="h-3.5 w-3.5" />}
                  >
                    UPLOAD IMAGE FILE
                  </Button>

                  <p className="text-[10px] text-neutral-500">
                    Click to upload a PNG, JPG, or WEBP photo directly from your device.
                  </p>

                  {uploadError && (
                    <p className="text-[10px] text-red-500">{uploadError}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="PRICE ($)"
                type="number"
                value={editingProduct.price || 0}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                }
                required
              />
              <Input
                label="SALE PRICE ($)"
                type="number"
                value={editingProduct.salePrice || 0}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, salePrice: Number(e.target.value) })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase text-neutral-500 font-mono font-bold">CATEGORY</label>
                <select
                  value={editingProduct.category || "phones"}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value as any })
                  }
                  className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-neutral-900 focus:outline-none focus:border-[#D71921] h-11 text-xs font-mono font-bold uppercase"
                >
                  <option value="phones">PHONES</option>
                  <option value="audio">AUDIO</option>
                  <option value="cmf">CMF BY NOTHING</option>
                  <option value="accessories">ACCESSORIES</option>
                </select>
              </div>

              <Input
                label="SUBCATEGORY"
                value={editingProduct.subcategory || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, subcategory: e.target.value })
                }
              />
            </div>

            <Input
              label="TAGLINE"
              value={editingProduct.tagline || ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, tagline: e.target.value })
              }
            />

            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase text-neutral-500 font-mono font-bold">DESCRIPTION</label>
              <textarea
                rows={3}
                value={editingProduct.description || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, description: e.target.value })
                }
                className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 font-mono text-xs focus:outline-none focus:border-[#D71921]"
              />
            </div>

            <div className="flex items-center space-x-6 pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProduct.isFeatured || false}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })
                  }
                  className="accent-[#D71921]"
                />
                <span>FEATURED PRODUCT</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProduct.isNewArrival || false}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })
                  }
                  className="accent-[#D71921]"
                />
                <span>NEW ARRIVAL</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-neutral-200">
              <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                CANCEL
              </Button>
              <Button variant="red" type="submit">
                SAVE PRODUCT
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Custom Delete Product Modal (No browser alert) */}
      {isDeleteModalOpen && productToDelete && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="CONFIRM PRODUCT DELETION"
          maxWidth="md"
        >
          <div className="space-y-4 font-mono text-xs text-neutral-900">
            <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-bold uppercase text-red-800">PERMANENT DELETE</p>
                <p className="text-[11px] text-neutral-600 font-sans">
                  Are you sure you want to delete product{" "}
                  <span className="text-neutral-900 font-bold font-mono font-lg">"{productToDelete.name}"</span>? This will permanently remove it from MongoDB.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-neutral-200">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                CANCEL
              </Button>
              <Button
                variant="red"
                type="button"
                isLoading={isDeleting}
                onClick={handleConfirmDelete}
                leftIcon={<Trash2 className="h-4 w-4" />}
              >
                DELETE PRODUCT
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
