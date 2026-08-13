"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
import { Loader2 } from "lucide-react";
import { ProductForm } from "../../_components/product-form";
const BREADCRUMBS = [{ label: "Admin", href: "/admin" }, { label: "Products", href: "/admin/products" }, { label: "Edit Product" }];
export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [product, setProduct] = React.useState<Partial<Product> | null>(null);

  React.useEffect(() => {
    async function loadProduct() {
      if (!productId) return;
      setIsLoading(true);
      try {
        const prod = await ProductService.fetchProductByIdFromApi(productId);
        if (prod) {
          // Normalize section arrays to proper lengths
          const heroLeftSections = Array.from({ length: 3 }, (_, idx) => prod.heroLeftSections?.[idx] || { title: "", description: "", image: "" });
          const heroRightSections = Array.from({ length: 3 }, (_, idx) => prod.heroRightSections?.[idx] || { title: "", description: "", image: "" });
          const bentoSections = Array.from({ length: 7 }, (_, idx) => prod.bentoSections?.[idx] || { title: "", description: "", image: "" });
          const threeColumnSections = Array.from(
            { length: 3 },
            (_, idx) => prod.threeColumnSections?.[idx] || { title: "", description: "", image: "" },
          );
          const fourColumnSections = Array.from(
            { length: 4 },
            (_, idx) => prod.fourColumnSections?.[idx] || { title: "", description: "", image: "" },
          );
          const fiveColumnSections = Array.from(
            { length: 5 },
            (_, idx) => prod.fiveColumnSections?.[idx] || { title: "", description: "", image: "" },
          );

          setProduct({
            ...prod,
            heroLeftSections,
            heroRightSections,
            bentoSections,
            threeColumnSections,
            fourColumnSections,
            fiveColumnSections,
            disclaimers: prod.disclaimers && prod.disclaimers.length > 0 ? prod.disclaimers : [""],
          });
        } else {
          toast.error("Product not found");
          router.push("/admin/products");
        }
      } catch {
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [productId, router]);

  const handleSaveProduct = async (fullProduct: Product) => {
    setIsSubmitting(true);
    try {
      await ProductService.saveProductApi(fullProduct);
      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] font-mono text-xs text-neutral-500 space-y-3">
        <Loader2 className="h-6 w-6 animate-spin text-[#D71921]" />
        <p className="uppercase tracking-wider">LOADING PRODUCT DETAILS...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader breadcrumbs={BREADCRUMBS} title={`EDIT: ${product.name}`} />
      <ProductForm initialProduct={product} isEditMode={true} onSave={handleSaveProduct} isSubmitting={isSubmitting} />
    </div>
  );
}
