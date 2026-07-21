import bcrypt from "bcryptjs";
import { connectToDatabase } from "../lib/mongodb";
import { UserModel } from "../models/User";
import { ProductModel } from "../models/Product";
import { CategoryModel } from "../models/Category";
import { CATALOG_PRODUCTS } from "../lib/catalog";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCategoryMeta(category: string) {
  const labelMap: Record<string, { name: string; description: string; badge?: string }> = {
    phones: {
      name: "PHONES",
      description: "Official Nothing phones from the live catalog.",
      badge: "FLAGSHIP",
    },
    chargers: {
      name: "CHARGERS",
      description: "Fast charging accessories from the live catalog.",
      badge: "POWER",
    },
    audio: {
      name: "AUDIO",
      description: "Nothing audio gear and earbuds from the live catalog.",
      badge: "SOUND",
    },
    protectors: {
      name: "PROTECTORS",
      description: "Screen and glass protectors from the live catalog.",
      badge: "ACCESSORY",
    },
  };

  return (
    labelMap[category] || {
      name: category.toUpperCase(),
      description: `Products for ${category}.`,
      badge: "CATALOG",
    }
  );
}

function mapCatalogProductToDbProduct(item: (typeof CATALOG_PRODUCTS)[number]) {
  const now = new Date().toISOString();

  return {
    id: item.id,
    name: item.name,
    slug: item.id,
    tagline: item.description,
    description: item.description,
    shortDescription: item.description,
    price: item.price,
    salePrice: item.originalPrice,
    category: item.category,
    subcategory: item.category,
    images: [item.image],
    gallery: [item.image],
    variants: [
      {
        id: `${item.id}-default`,
        name: item.name,
        color: "Standard",
        colorHex: "#000000",
        price: item.price,
        salePrice: item.originalPrice,
        sku: item.id,
        inStock: true,
        image: item.image,
      },
    ],
    storageOptions: [],
    colors: [{ name: "Standard", hex: "#000000" }],
    specifications: [],
    features: [],
    highlights: [],
    seo: { metaTitle: item.name, metaDescription: item.description, keywords: [] },
    isFeatured: true,
    isNewArrival: true,
    sortOrder: 1,
    status: "published",
    createdAt: now,
    updatedAt: now,
  };
}

async function seed() {
  console.log("Connecting to MongoDB...");
  await connectToDatabase();

  console.log("Seeding Admin User...");
  const passwordHash = await bcrypt.hash("admin123", 10);
  await UserModel.findOneAndUpdate(
    { username: "admin" },
    {
      username: "admin",
      email: "admin@nothing.tech",
      passwordHash,
      role: "admin",
    },
    { upsert: true, new: true, runValidators: true }
  );
  console.log("✓ Admin user seeded (Username: admin, Password: admin123)");

  console.log("Seeding Categories...");
  const seenCategories = new Set<string>();
  for (const item of CATALOG_PRODUCTS) {
    const category = item.category;
    if (seenCategories.has(category)) continue;
    seenCategories.add(category);

    const meta = toCategoryMeta(category);
    const heroImage = item.image;
    const slug = toSlug(category);

    await CategoryModel.findOneAndUpdate(
      { slug },
      {
        id: category,
        name: meta.name,
        slug,
        description: meta.description,
        heroImage,
        badge: meta.badge,
      },
      { upsert: true, returnDocument: "after" }
    );
  }
  console.log("✓ Categories seeded");

  console.log("Seeding Products...");
  for (const item of CATALOG_PRODUCTS) {
    const product = mapCatalogProductToDbProduct(item);
    await ProductModel.findOneAndUpdate(
      { slug: product.slug },
      product,
      { upsert: true, returnDocument: "after" }
    );
  }
  console.log("✓ Products seeded");

  console.log("Database Seed Finished Successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
