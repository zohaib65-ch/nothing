import { z } from "zod";

export const CustomSectionItemSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const ProductVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  storage: z.string().optional(),
  color: z.string(),
  colorHex: z.string(),
  price: z.number().min(0),
  salePrice: z.number().optional(),
  sku: z.string(),
  inStock: z.boolean(),
  image: z.string().optional(),
});

export const SpecificationItemSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const SpecificationGroupSchema = z.object({
  category: z.string(),
  items: z.array(SpecificationItemSchema),
});

export const ProductFeatureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  image: z.string().optional(),
  tagline: z.string().optional(),
});

export const ProductHighlightSchema = z.object({
  title: z.string(),
  value: z.string(),
  subtitle: z.string(),
});

export const ProductSEOSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  keywords: z.array(z.string()),
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  slug: z.string().optional(),
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  price: z.number({
    message: "Price is required",
  }).min(1, "Price is required"),
  salePrice: z.number().optional(),
  originalPrice: z.number().optional(),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  images: z.array(z.string()),
  gallery: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  variants: z.array(ProductVariantSchema).optional(),
  storageOptions: z.array(z.string()).optional(),
  colors: z.array(z.object({ name: z.string(), hex: z.string() })).optional(),
  specifications: z.array(SpecificationGroupSchema).optional(),
  features: z.array(ProductFeatureSchema).optional(),
  highlights: z.array(ProductHighlightSchema).optional(),
  seo: ProductSEOSchema.optional(),
  isFeatured: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  sortOrder: z.number().default(1),
  status: z.enum(["draft", "published"]).default("published"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  heroLeftSections: z.array(CustomSectionItemSchema).optional(),
  heroRightSections: z.array(CustomSectionItemSchema).optional(),
  bentoSections: z.array(CustomSectionItemSchema).optional(),
  threeColumnSections: z.array(CustomSectionItemSchema).optional(),
  fourColumnSections: z.array(CustomSectionItemSchema).optional(),
  fiveColumnSections: z.array(CustomSectionItemSchema).optional(),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;
