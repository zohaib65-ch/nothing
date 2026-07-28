import { z } from "zod";

export const CustomSectionItemSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const ProductVariantSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  storage: z.string().optional(),
  color: z.string().optional(),
  colorHex: z.string().optional(),
  price: z.coerce.number().optional().default(0),
  salePrice: z.coerce.number().optional().nullable(),
  sku: z.string().optional(),
  inStock: z.boolean().optional().default(true),
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
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  tagline: z.string().optional(),
});

export const ProductHighlightSchema = z.object({
  title: z.string().optional(),
  value: z.string().optional(),
  subtitle: z.string().optional(),
});

export const ProductSEOSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Product name is required"),
  slug: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.coerce.number().optional().default(0),
  salePrice: z.coerce.number().optional().nullable(),
  originalPrice: z.coerce.number().optional().nullable(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  images: z.array(z.string()).optional().default([]),
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
