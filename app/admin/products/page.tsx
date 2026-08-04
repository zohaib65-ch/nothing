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
import { DeleteProductModal } from "./_components/delete-product-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice, getProductDisplayPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [stockFilter, setStockFilter] = React.useState<"all" | "in_stock" | "out_of_stock">("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [categoriesList, setCategoriesList] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const loadProducts = React.useCallback(async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const data = await ProductService.fetchProductsFromApi();
      setProducts(data);
      
      // Extract unique categories for filter
      const cats = Array.from(new Set(data.map((p) => p.category).filter(Boolean)));
      setCategoriesList(cats);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);
    loadProducts(true);
  }, [loadProducts]);

  const handleEdit = React.useCallback(
    (prod: Product) => {
      router.push(`/admin/products/${prod.id}/edit`);
    },
    [router],
  );

  const handlePromptDelete = React.useCallback((prod: Product) => {
    setProductToDelete(prod);
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    await ProductService.deleteProduct(productToDelete.id);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
    setIsDeleting(false);
    loadProducts(false);
  };

  const handleToggleFeatured = React.useCallback(async (prod: Product) => {
    const nextVal = !prod.isFeatured;
    setProducts((prev) => prev.map((p) => (p.id === prod.id ? { ...p, isFeatured: nextVal } : p)));
    await ProductService.updateProductFieldsApi(prod.id, { isFeatured: nextVal });
  }, []);

  const handleToggleStock = React.useCallback(async (prod: Product) => {
    const currentStock = prod.inStock !== false;
    const nextVal = !currentStock;
    setProducts((prev) => prev.map((p) => (p.id === prod.id ? { ...p, inStock: nextVal } : p)));
    await ProductService.updateProductFieldsApi(prod.id, { inStock: nextVal });
  }, []);

  const handleToggleStatus = React.useCallback(async (prod: Product) => {
    const newStatus: "published" | "draft" = prod.status === "published" ? "draft" : "published";
    setProducts((prev) => prev.map((p) => (p.id === prod.id ? { ...p, status: newStatus } : p)));
    await ProductService.updateProductFieldsApi(prod.id, { status: newStatus });
  }, []);

  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    const nameMatch = p.name.toLowerCase().includes(query);
    const categoryMatch = p.category.toLowerCase().includes(query);

    const displayPrice = getProductDisplayPrice(p);
    const formattedPrice = formatPrice(displayPrice).toLowerCase();

    const pricesToTest = [
      p.price,
      p.salePrice,
      p.originalPrice,
      displayPrice,
      ...(p.variants || []).flatMap((v) => [v.price, v.salePrice]),
    ].filter((val): val is number => val !== undefined && val !== null && !isNaN(val));

    const priceMatch =
      formattedPrice.includes(query) ||
      pricesToTest.some((priceVal) => priceVal.toString().includes(query));

    const matchesSearch = nameMatch || categoryMatch || priceMatch;

    const isInStock = p.inStock !== false;
    const matchesStock = stockFilter === "all" ? true : stockFilter === "in_stock" ? isInStock : !isInStock;
    const matchesCategory = categoryFilter === "all" ? true : p.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStock && matchesCategory;
  });

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => getColumns(handleToggleFeatured, handleToggleStatus, handleToggleStock, handleEdit, handlePromptDelete),
    [handleToggleFeatured, handleToggleStatus, handleToggleStock, handleEdit, handlePromptDelete],
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

      {/* Controls Bar: Search, Category Filter & Stock Filter Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="SEARCH PRODUCTS BY NAME, CATEGORY, OR PRICE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-200 pl-10 pr-4 py-2 font-mono text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D71921] transition-all rounded-lg shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val)}>
            <SelectTrigger className="w-[200px] h-9 text-xs font-mono font-bold bg-white border border-neutral-200 uppercase">
              <SelectValue placeholder="ALL CATEGORIES" />
            </SelectTrigger>
            <SelectContent className="font-mono text-xs uppercase">
              <SelectItem value="all">ALL CATEGORIES</SelectItem>
              {categoriesList.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Stock Filter */}
          <Select value={stockFilter} onValueChange={(val) => setStockFilter(val as any)}>
            <SelectTrigger className="w-[200px] h-9 text-xs font-mono font-bold bg-white border border-neutral-200 uppercase">
              <SelectValue placeholder="ALL STOCK STATUS" />
            </SelectTrigger>
            <SelectContent className="font-mono text-xs uppercase">
              <SelectItem value="all">ALL STOCK STATUS</SelectItem>
              <SelectItem value="in_stock">IN STOCK ONLY</SelectItem>
              <SelectItem value="out_of_stock">OUT OF STOCK ONLY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-neutral-200 rounded-lg shadow-sm font-mono text-xs text-neutral-500 space-y-3">
          <Loader2 className="h-6 w-6 animate-spin text-[#D71921]" />
          <p className="uppercase tracking-wider">LOADING PRODUCTS FROM DATABASE...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredProducts} showPagination={true} pageSize={8} />
      )}

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        product={productToDelete}
        isDeleting={isDeleting}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
