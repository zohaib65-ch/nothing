import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import { Product } from "@/types";

/**
 * Shared fields for listing queries — mirrors the API route selection.
 */
const LIST_FIELDS =
  "name slug price salePrice category images status inStock isFeatured isNewArrival isComingSoon sortOrder warranty variants disclaimers createdAt updatedAt";

/**
 * Convert a Mongoose lean doc (with ObjectIds, Dates, etc.) into a
 * plain serializable object safe for React Server Component → Client
 * Component prop transfer.
 */
function serializeDocs<T>(docs: any[]): T[] {
  return JSON.parse(JSON.stringify(docs)).map((doc: any) => {
    const { _id, __v, ...rest } = doc;
    return { id: _id?.toString?.() ?? _id ?? doc.id, ...rest } as T;
  });
}

/**
 * Fetch all published products, sorted by sortOrder then createdAt (desc).
 */
export async function getPublishedProducts(): Promise<Product[]> {
  await connectToDatabase();

  const docs = await ProductModel.find({ status: "published" })
    .select(LIST_FIELDS)
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();

  return serializeDocs<Product>(docs);
}

/**
 * Fetch featured products, sorted by createdAt ascending (oldest first,
 * matching the homepage "Selected Gems" ordering).
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  await connectToDatabase();

  const docs = await ProductModel.find({ status: "published", isFeatured: true })
    .select(LIST_FIELDS)
    .sort({ createdAt: 1 })
    .lean();

  return serializeDocs<Product>(docs);
}

/**
 * Fetch published products filtered by category.
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  await connectToDatabase();

  const docs = await ProductModel.find({ status: "published", category })
    .select(LIST_FIELDS)
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();

  return serializeDocs<Product>(docs);
}
