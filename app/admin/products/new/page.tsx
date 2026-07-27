"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductService } from "@/services/productService";
import { Product } from "@/types";
import { slugify, getValidImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Save,
  Loader2,
  Sparkles,
  Info,
  DollarSign,
  Tag
} from "lucide-react";

export default function CreateProductPage() {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  // Initialize product state with the standard defaults matching the catalog model
  const [product, setProduct] = React.useState<Partial<Product>>(() => {
    const timestamp = Date.now();
    return {
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
    };
  });

  // Handle direct image file upload
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

      setProduct((prev) => ({
        ...prev,
        images: [data.url],
      }));
      toast.success("Image uploaded successfully.");
    } catch (err: any) {
      const errorMsg = err.message || "Failed to upload image";
      setUploadError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Submit product data
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.name) {
      toast.error("Product name is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalSlug = product.slug || slugify(product.name);
      const validImage = getValidImageUrl(product.images?.[0]);

      // Sync primary price to standard variant
      const updatedVariants = product.variants?.map((v, i) => {
        if (i === 0) {
          return {
            ...v,
            price: product.price || 199,
            salePrice: product.salePrice,
          };
        }
        return v;
      }) || [];

      const fullProduct: Product = {
        ...product,
        slug: finalSlug,
        images: [validImage],
        variants: updatedVariants,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Product;

      await ProductService.saveProductApi(fullProduct);
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch (err) {
      toast.error("Failed to save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="space-y-1.5">
          <Breadcrumb>
            <BreadcrumbList className="font-mono text-xs text-neutral-500">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin" className="hover:text-neutral-900 transition-colors uppercase">
                    Admin
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/products" className="hover:text-neutral-900 transition-colors uppercase">
                    Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-neutral-900 font-bold uppercase">
                  Create Product
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-mono text-xl font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            CREATE NEW PRODUCT
          </h1>
        </div>

        <Link href="/admin/products">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            BACK TO LIST
          </Button>
        </Link>
      </div>

      {/* Main Creation Form */}
      <form onSubmit={handleSaveProduct} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Side: General Info & Product Attributes (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information Card */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
              <Info className="h-4 w-4 text-neutral-400" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">
                GENERAL INFORMATION
              </h2>
            </div>

            <div className="space-y-4">
              <Input
                label="PRODUCT NAME"
                placeholder="e.g. NOTHING PHONE (2a)"
                value={product.name || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name: e.target.value,
                    slug: slugify(e.target.value),
                  })
                }
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="SLUG (AUTO-GENERATED)"
                  placeholder="e.g. nothing-phone-2a"
                  value={product.slug || ""}
                  onChange={(e) => setProduct({ ...product, slug: slugify(e.target.value) })}
                  required
                />
                <Input
                  label="TAGLINE"
                  placeholder="e.g. A new icon is born"
                  value={product.tagline || ""}
                  onChange={(e) => setProduct({ ...product, tagline: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  SHORT DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  placeholder="A brief summary of the product (shown in listings)..."
                  value={product.shortDescription || ""}
                  onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 font-mono text-xs focus:outline-none focus:border-[#D71921] focus:ring-1 focus:ring-[#D71921] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  DESCRIPTION
                </label>
                <textarea
                  rows={5}
                  placeholder="Detailed specifications, review, or copy..."
                  value={product.description || ""}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 font-mono text-xs focus:outline-none focus:border-[#D71921] focus:ring-1 focus:ring-[#D71921] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Category Card */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
              <DollarSign className="h-4 w-4 text-neutral-400" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">
                PRICING & CLASSIFICATION
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="PRICE (RS)"
                type="number"
                placeholder="199"
                value={product.price || 0}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                required
              />
              <Input
                label="SALE PRICE (RS) (OPTIONAL)"
                type="number"
                placeholder="e.g. 179"
                value={product.salePrice || ""}
                onChange={(e) => setProduct({ ...product, salePrice: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">
                  CATEGORY
                </label>
                <select
                  value={product.category || "phones"}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:border-[#D71921] focus:ring-1 focus:ring-[#D71921] h-11 text-xs font-mono font-bold uppercase transition-all"
                >
                  <option value="phones">PHONES</option>
                  <option value="audio">AUDIO</option>
                  <option value="cmf">CMF BY NOTHING</option>
                  <option value="accessories">ACCESSORIES</option>
                </select>
              </div>

              <Input
                label="SUBCATEGORY"
                placeholder="e.g. Smartphones, Earbuds"
                value={product.subcategory || ""}
                onChange={(e) => setProduct({ ...product, subcategory: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Media, Visibility, & Save (1 Col) */}
        <div className="space-y-6">
          
          {/* Image Upload Card */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
              <ImageIcon className="h-4 w-4 text-neutral-400" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">
                PRODUCT IMAGE
              </h2>
            </div>

            <div className="space-y-4">
              <div className="relative h-48 bg-neutral-50 border border-dashed border-neutral-300 rounded-lg overflow-hidden flex flex-col items-center justify-center p-4">
                {product.images?.[0] ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={getValidImageUrl(product.images[0])}
                      alt="Product Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <ImageIcon className="h-10 w-10 text-neutral-300 mx-auto" />
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                      No photo uploaded
                    </p>
                  </div>
                )}
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
                  type="button"
                  variant="outline"
                  size="sm"
                  fullWidth
                  isLoading={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<Upload className="h-3.5 w-3.5" />}
                >
                  UPLOAD IMAGE FILE
                </Button>

                <p className="text-[10px] text-neutral-500 font-mono mt-2 text-center">
                  PNG, JPG, or WEBP. Max size 5MB.
                </p>

                {uploadError && (
                  <p className="text-[10px] text-red-500 text-center font-mono mt-2">{uploadError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Status & Options Card */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-2">
              <Tag className="h-4 w-4 text-neutral-400" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">
                STATUS & VISIBILITY
              </h2>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase text-neutral-500 font-bold tracking-wider">
                  PUBLICATION STATUS
                </label>
                <select
                  value={product.status || "published"}
                  onChange={(e) => setProduct({ ...product, status: e.target.value as any })}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:border-[#D71921] focus:ring-1 focus:ring-[#D71921] h-11 text-xs font-bold uppercase transition-all"
                >
                  <option value="published">PUBLISHED (ACTIVE)</option>
                  <option value="draft">DRAFT (HIDDEN)</option>
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={product.isFeatured || false}
                    onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })}
                    className="accent-[#D71921] h-4 w-4 rounded border-neutral-300"
                  />
                  <span className="font-bold tracking-wider select-none text-neutral-700 group-hover:text-neutral-950 transition-colors uppercase">
                    Featured Product
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={product.isNewArrival || false}
                    onChange={(e) => setProduct({ ...product, isNewArrival: e.target.checked })}
                    className="accent-[#D71921] h-4 w-4 rounded border-neutral-300"
                  />
                  <span className="font-bold tracking-wider select-none text-neutral-700 group-hover:text-neutral-950 transition-colors uppercase">
                    New Arrival
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="space-y-3">
            <Button
              type="submit"
              variant="red"
              size="md"
              fullWidth
              isLoading={isSubmitting}
              leftIcon={<Save className="h-4 w-4" />}
            >
              SAVE PRODUCT
            </Button>
            
            <Link href="/admin/products" className="block w-full">
              <Button
                type="button"
                variant="outline"
                size="md"
                fullWidth
              >
                CANCEL
              </Button>
            </Link>
          </div>

        </div>

      </form>
    </div>
  );
}
