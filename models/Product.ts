import mongoose, { Schema, Document, Model } from "mongoose";
import { Product } from "@/types";

export interface IProductDocument extends Omit<Product, "id">, Document {}

const SpecificationItemSchema = new Schema({
  name: { type: String, default: "" },
  value: { type: String, default: "" },
});

const SpecificationGroupSchema = new Schema({
  category: { type: String, default: "" },
  items: [SpecificationItemSchema],
});

const ProductVariantSchema = new Schema({
  id: { type: String, default: () => `var-${Date.now()}` },
  name: { type: String, default: "Standard Variant" },
  storage: { type: String, default: "" },
  capacity: { type: String, default: "" },
  ram: { type: String, default: "" },
  color: { type: String, default: "Standard" },
  colorHex: { type: String, default: "#000000" },
  price: { type: Number, default: 0 },
  salePrice: { type: Number },
  storagePrices: { type: Schema.Types.Mixed, default: {} },
  sku: { type: String, default: () => `SKU-${Date.now()}` },
  image: { type: String, default: "" },
  specifications: [SpecificationGroupSchema],
});

const ProductHighlightSchema = new Schema({
  title: { type: String, default: "" },
  value: { type: String, default: "" },
  subtitle: { type: String, default: "" },
});

const CustomSectionItemSchema = new Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
});

const ProductFeatureSchema = new Schema({
  id: { type: String, default: () => `feat-${Date.now()}` },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  tagline: { type: String, default: "" },
  icon: { type: String, default: "" },
  image: { type: String, default: "" },
});

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, index: true },
    price: { type: Number, default: 0 },
    salePrice: { type: Number },
    category: { type: String, default: "phones", index: true },
    images: [{ type: String }],
    gallery: [{ type: String }],
    videos: [{ type: String }],
    variants: [ProductVariantSchema],
    storageOptions: [{ type: String }],
    colors: [{ name: String, hex: String }],
    specifications: [SpecificationGroupSchema],
    features: [ProductFeatureSchema],
    highlights: [ProductHighlightSchema],
    heroLeftSections: { type: [CustomSectionItemSchema], default: [] },
    heroRightSections: { type: [CustomSectionItemSchema], default: [] },
    bentoSections: { type: [CustomSectionItemSchema], default: [] },
    threeColumnSections: { type: [CustomSectionItemSchema], default: [] },
    fourColumnSections: { type: [CustomSectionItemSchema], default: [] },
    fiveColumnSections: { type: [CustomSectionItemSchema], default: [] },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: [{ type: String }],
    },
    isFeatured: { type: Boolean, default: false, index: true },
    isNewArrival: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "published", index: true },
  },
  { timestamps: true },
);

ProductSchema.set("toJSON", {
  transform: (doc, ret: Record<string, any>) => {
    ret.id = ret._id ? ret._id.toString() : ret.id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

ProductSchema.index({ status: 1, category: 1, sortOrder: 1 });
ProductSchema.index({ slug: 1 }, { unique: true });

export const ProductModel: Model<IProductDocument> = mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);
