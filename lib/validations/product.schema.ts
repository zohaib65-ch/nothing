import { z } from "zod";

// Helper for optional numeric inputs (handles empty strings, null, undefined gracefully without NaN errors)
const optionalNumber = z.preprocess(
  (val) => (val === "" || val === null || val === undefined || Number.isNaN(Number(val)) ? undefined : Number(val)),
  z.number().optional(),
);

export const CustomSectionItemSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
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

const hexColorPreprocess = z.preprocess((val) => {
  if (typeof val === "string" && val.trim() !== "") {
    const clean = val.trim();
    return clean.startsWith("#") ? clean.toUpperCase() : `#${clean.toUpperCase()}`;
  }
  return val;
}, z.string().optional());

export const ProductVariantSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  storage: z.string().optional(),
  capacity: z.string().optional(),
  ram: z.string().optional(),
  color: z.string().optional(),
  colorHex: hexColorPreprocess,
  price: z.coerce.number().optional().default(0),
  salePrice: optionalNumber,
  storagePrices: z.record(z.string(), z.object({ price: z.number().optional(), salePrice: z.number().optional(), isComingSoon: z.boolean().optional() })).optional(),
  sku: z.string().optional(),
  inStock: z.boolean().optional().default(true),
  isComingSoon: z.boolean().optional(),
  image: z.string().optional(),
  specifications: z.array(SpecificationGroupSchema).optional(),
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
  price: z.coerce.number().optional().default(0),
  salePrice: optionalNumber,
  originalPrice: optionalNumber,
  category: z.string().optional(),
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
  disclaimers: z.array(z.string()).optional(),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;
