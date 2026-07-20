import mongoose, { Schema, Document, Model } from "mongoose";
import { Product } from "@/types";

export interface IProductDocument extends Omit<Product, "id">, Document {}

const ProductVariantSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  storage: { type: String },
  color: { type: String, required: true },
  colorHex: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  sku: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  image: { type: String },
});

const ProductHighlightSchema = new Schema({
  title: { type: String, required: true },
  value: { type: String, required: true },
  subtitle: { type: String, required: true },
});

const ProductFeatureSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tagline: { type: String },
  icon: { type: String },
  image: { type: String },
});

const SpecificationItemSchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const SpecificationGroupSchema = new Schema({
  category: { type: String, required: true },
  items: [SpecificationItemSchema],
});

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    tagline: { type: String, default: "" },
    description: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, default: "General" },
    images: [{ type: String }],
    gallery: [{ type: String }],
    videos: [{ type: String }],
    variants: [ProductVariantSchema],
    storageOptions: [{ type: String }],
    colors: [{ name: String, hex: String }],
    specifications: [SpecificationGroupSchema],
    features: [ProductFeatureSchema],
    highlights: [ProductHighlightSchema],
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },
    isFeatured: { type: Boolean, default: false, index: true },
    isNewArrival: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "published", index: true },
  },
  { timestamps: true }
);

ProductSchema.set("toJSON", {
  transform: (doc, ret: Record<string, any>) => {
    ret.id = ret._id ? ret._id.toString() : ret.id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const ProductModel: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);
