import mongoose, { Schema, Document, Model } from "mongoose";
import { CategoryInfo } from "@/types";

export interface ICategoryDocument extends CategoryInfo, Document {}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    id: { type: String },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    heroImage: { type: String, required: true },
    badge: { type: String },
  },
  { timestamps: true, strict: false }
);

CategorySchema.set("toJSON", {
  transform: (doc, ret: Record<string, any>) => {
    ret.id = ret.id || (ret._id ? ret._id.toString() : ret.id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const CategoryModel: Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategoryDocument>("Category", CategorySchema);
