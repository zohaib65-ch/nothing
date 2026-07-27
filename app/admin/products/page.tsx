"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getColumns } from "./_components/columns";
import { Plus, Search, Loader2 } from "lucide-react";

// Modular Delete Modal Component
import { DeleteProductModal } from "./_components/delete-product-modal";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  // Custom Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [mounted, setMounted] = React.useState(false);

  const loadProducts = React.useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const data = await ProductService.fetchProductsFromApi();
      setProducts(data);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);
    loadProducts(true);
  }, [loadProducts]);

  const handleEdit = (prod: Product) => {
    router.push(`/admin/products/${prod.id}/edit`);
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
    loadProducts(false);
  };

  const handleToggleFeatured = async (prod: Product) => {
    await ProductService.saveProductApi({ ...prod, isFeatured: !prod.isFeatured });
    loadProducts(false);
  };

  const handleToggleStatus = async (prod: Product) => {
    const newStatus = prod.status === "published" ? "draft" : "published";
    await ProductService.saveProductApi({ ...prod, status: newStatus });
    loadProducts(false);
  };

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => getColumns(handleToggleFeatured, handleToggleStatus, handleEdit, handlePromptDelete),
    [handleToggleFeatured, handleToggleStatus, handleEdit, handlePromptDelete],
  );

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 font-mono text-xs text-neutral-500 gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-[#D71921]" />
        <span>INITIALIZING...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-neutral-900">PRODUCT MANAGEMENT</h2>
          <p className="text-xs text-neutral-500 font-sans">Create, edit, delete, publish, or feature products in your MongoDB catalog.</p>
        </div>

        <Link href="/admin/products/new">
          <Button variant="red" size="md" leftIcon={<Plus className="h-4 w-4" />}>
            CREATE PRODUCT
          </Button>
        </Link>
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

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-neutral-200 rounded-lg shadow-sm font-mono text-xs text-neutral-500 space-y-3">
          <Loader2 className="h-6 w-6 animate-spin text-[#D71921]" />
          <p className="uppercase tracking-wider">LOADING PRODUCTS FROM DATABASE...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredProducts} showPagination={true} pageSize={8} />
      )}

      <DeleteProductModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} product={productToDelete} isDeleting={isDeleting} onConfirmDelete={handleConfirmDelete} />
    </div>
  );
}
