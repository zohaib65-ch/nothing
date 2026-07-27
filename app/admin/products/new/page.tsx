"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/ui/admin-page-header";
import { ProductForm } from "../_components/product-form";

const BREADCRUMBS = [{ label: "Admin", href: "/admin" }, { label: "Products", href: "/admin/products" }, { label: "Create Product" }];

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const initialProduct = React.useMemo<Partial<Product>>(() => {
    const timestamp = Date.now();
    return {
      id: `prod-${timestamp}`,
      name: "",
      slug: "",
      tagline: "",
      description: "",
      shortDescription: "",
      price: undefined as any,
      category: "",
      subcategory: "",
      images: [],
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
      heroLeftSections: Array.from({ length: 3 }, () => ({ title: "", description: "", image: "" })),
      heroRightSections: Array.from({ length: 3 }, () => ({ title: "", description: "", image: "" })),
      bentoSections: Array.from({ length: 7 }, () => ({ title: "", description: "", image: "" })),
      threeColumnSections: Array.from({ length: 3 }, () => ({ title: "", description: "", image: "" })),
      fourColumnSections: Array.from({ length: 4 }, () => ({ title: "", description: "", image: "" })),
      fiveColumnSections: Array.from({ length: 5 }, () => ({ title: "", description: "", image: "" })),
    };
  }, []);

  const handleSaveProduct = async (fullProduct: Product) => {
    setIsSubmitting(true);
    try {
      await ProductService.saveProductApi(fullProduct);
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader breadcrumbs={BREADCRUMBS} title="CREATE NEW PRODUCT" />
      <ProductForm initialProduct={initialProduct} isEditMode={false} onSave={handleSaveProduct} isSubmitting={isSubmitting} />
    </div>
  );
}
