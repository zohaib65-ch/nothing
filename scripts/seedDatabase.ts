/**
 * seedDatabase.ts
 * 
 * Seeds the MongoDB database with products scraped from Nothing.tech's
 * Shopify Storefront API. Reads from scripts/scraped-products.json.
 * 
 * Run: npm run seed
 * Re-run: Idempotent — uses upsert by slug, so re-running updates existing records.
 */

import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join } from "path";
import { connectToDatabase } from "../lib/mongodb";
import { UserModel } from "../models/User";
import { ProductModel } from "../models/Product";
import { CategoryModel } from "../models/Category";

// ── Types for scraped data ───────────────────────────────

interface ScrapedVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  image: { url: string; altText: string | null } | null;
  selectedOptions: { name: string; value: string }[];
}

interface ScrapedProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  variants: { nodes: ScrapedVariant[] };
  images: { nodes: { url: string; altText: string | null }[] };
  seo: { title: string | null; description: string | null };
  regions?: string[];
  createdAt: string;
  updatedAt: string;
}

// ── Helpers ──────────────────────────────────────────────

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Extract color name and hex from variant title or selectedOptions */
function extractColor(variant: ScrapedVariant): { name: string; hex: string } {
  // Try selectedOptions first
  const colorOpt = variant.selectedOptions.find(
    (o) => o.name.toLowerCase() === "colour" || o.name.toLowerCase() === "color"
  );
  const colorName = colorOpt?.value || variant.title.split(" / ")[0] || "Default";

  // Map known Nothing colors to hex
  const hexMap: Record<string, string> = {
    black: "#1C1C1E",
    white: "#F5F5F7",
    silver: "#C0C0C0",
    grey: "#6E6E73",
    "dark grey": "#3A3A3C",
    "light grey": "#D1D1D6",
    blue: "#0071E3",
    "deep blue": "#0A3D8F",
    pink: "#FF6B8A",
    green: "#34C759",
    orange: "#FF9500",
    yellow: "#FFD60A",
    red: "#FF3B30",
    clear: "#FFFFFF",
    "midnight black": "#0C0C0E",
  };

  const hex = hexMap[colorName.toLowerCase()] || "#000000";
  return { name: colorName, hex };
}

/** Extract storage/capacity from variant selectedOptions or title */
function extractStorage(variant: ScrapedVariant): string {
  const storageOpt = variant.selectedOptions.find(
    (o) => o.name.toLowerCase() === "capacity" || o.name.toLowerCase() === "storage"
  );
  if (storageOpt) return storageOpt.value;

  // Try parsing from title like "Black / 8+128GB"
  const match = variant.title.match(/(\d+\+?\d*GB)/i);
  return match ? match[1] : "";
}

/** Map Shopify productType to our category system */
function mapCategory(productType: string, handle: string): string {
  const type = productType.toLowerCase();
  if (type === "phones") return "phones";
  if (type === "audio") return "audio";
  if (type === "watches") return "watches";
  if (type === "accessories") return "accessories";
  if (type === "apparel") return "apparel";

  // Infer from handle if productType is empty
  if (handle.includes("phone") || handle.includes("cmf-phone")) return "phones";
  if (handle.includes("ear") || handle.includes("buds") || handle.includes("headphone") || handle.includes("neckband"))
    return "audio";
  if (handle.includes("watch")) return "watches";
  if (handle.includes("power") || handle.includes("cable") || handle.includes("case") || handle.includes("protector") || handle.includes("charger"))
    return "accessories";
  if (handle.includes("hoodie") || handle.includes("labcoat") || handle.includes("tracksuit") || handle.includes("t-shirt") || handle.includes("overall") || handle.includes("tote") || handle.includes("pouch"))
    return "apparel";

  return "accessories"; // fallback
}

/** Category display metadata */
function toCategoryMeta(category: string) {
  const map: Record<string, { name: string; description: string; badge?: string }> = {
    phones: { name: "PHONES", description: "Nothing and CMF smartphones with Glyph Interface.", badge: "FLAGSHIP" },
    audio: { name: "AUDIO", description: "Earbuds, headphones, and neckbands from Nothing and CMF.", badge: "SOUND" },
    watches: { name: "WATCHES", description: "CMF smartwatches with premium design.", badge: "WEARABLE" },
    accessories: { name: "ACCESSORIES", description: "Cases, chargers, cables, and screen protectors.", badge: "ESSENTIALS" },
    apparel: { name: "APPAREL", description: "Official Nothing merchandise and clothing.", badge: "MERCH" },
  };

  return (
    map[category] || {
      name: category.toUpperCase(),
      description: `Products in the ${category} category.`,
      badge: "CATALOG",
    }
  );
}

/** Convert a scraped Shopify product to our DB product shape */
function mapToDbProduct(item: ScrapedProduct) {
  const category = mapCategory(item.productType, item.handle);
  const images = item.images.nodes.map((img) => img.url);
  const minPrice = parseFloat(item.priceRange.minVariantPrice.amount) || 0;
  const salePrice = parseFloat(item.compareAtPriceRange?.maxVariantPrice?.amount || "0") || undefined;

  // Build variants
  const variants = item.variants.nodes
    .filter((v) => v.title !== "Default Title" || item.variants.nodes.length === 1)
    .map((v) => {
      const color = extractColor(v);
      const storage = extractStorage(v);
      const variantPrice = parseFloat(v.price.amount) || minPrice;
      const variantSalePrice = v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) || undefined : undefined;

      return {
        id: v.id.replace("gid://shopify/ProductVariant/", ""),
        name: v.title || item.title,
        storage,
        color: color.name,
        colorHex: color.hex,
        price: variantPrice,
        salePrice: variantSalePrice,
        sku: v.sku || v.id.replace("gid://shopify/ProductVariant/", ""),
        inStock: v.availableForSale,
        image: v.image?.url || images[0] || "",
      };
    });

  // If all variants were filtered out (single "Default Title"), create one
  if (variants.length === 0) {
    variants.push({
      id: `${item.handle}-default`,
      name: item.title,
      storage: "",
      color: "Default",
      colorHex: "#000000",
      price: minPrice,
      salePrice: undefined,
      sku: item.handle,
      inStock: item.availableForSale,
      image: images[0] || "",
    });
  }

  // Unique storage options
  const storageOptions = [...new Set(variants.map((v) => v.storage).filter(Boolean))];

  // Unique colors
  const colorSet = new Map<string, string>();
  for (const v of variants) {
    if (v.color && v.color !== "Default" && !colorSet.has(v.color)) {
      colorSet.set(v.color, v.colorHex);
    }
  }
  const colors = [...colorSet.entries()].map(([name, hex]) => ({ name, hex }));
  if (colors.length === 0) colors.push({ name: "Default", hex: "#000000" });

  // Clean description (strip HTML tags)
  const description = item.description ||
    item.descriptionHtml?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || "";

  return {
    name: item.title,
    slug: item.handle,
    tagline: description.substring(0, 120),
    description,
    shortDescription: description.substring(0, 200),
    price: minPrice,
    salePrice,
    category,
    subcategory: item.productType || category,
    images,
    gallery: images,
    variants,
    storageOptions,
    colors,
    specifications: [],
    features: [],
    highlights: [],
    seo: {
      metaTitle: item.seo?.title || item.title,
      metaDescription: item.seo?.description || description.substring(0, 160),
      keywords: item.tags || [],
    },
    isFeatured: item.availableForSale && ["phones", "audio"].includes(category),
    isNewArrival: isRecent(item.createdAt),
    sortOrder: getCategorySortOrder(category, item.availableForSale),
    status: "published" as const,
  };
}

function isRecent(dateStr: string): boolean {
  if (!dateStr) return false;
  const created = new Date(dateStr);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  return created > sixMonthsAgo;
}

function getCategorySortOrder(category: string, available: boolean): number {
  const base: Record<string, number> = { phones: 1, audio: 2, watches: 3, accessories: 4, apparel: 5 };
  return (base[category] || 6) + (available ? 0 : 100);
}

// ── Seed Function ────────────────────────────────────────

async function seed() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║  Nothing.tech Database Seeder                    ║");
  console.log("║  Scraped Products → MongoDB                      ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  // Load scraped data
  const dataPath = join(__dirname, "scraped-products.json");
  console.log(`Loading scraped data from: ${dataPath}`);
  let scrapedProducts: ScrapedProduct[];
  try {
    scrapedProducts = JSON.parse(readFileSync(dataPath, "utf-8"));
  } catch (err) {
    console.error("✗ Failed to load scraped-products.json. Run the scraper first:");
    console.error("  npx tsx scripts/scrapeNothing.ts");
    process.exit(1);
  }
  console.log(`  Loaded ${scrapedProducts.length} products\n`);

  // Connect to DB
  console.log("Connecting to MongoDB...");
  await connectToDatabase();
  console.log("  ✓ Connected\n");

  // Seed admin user
  console.log("═══ Seeding Admin User ═══");
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
  console.log("  ✓ Admin user (Username: admin, Password: admin123)\n");

  // Seed categories
  console.log("═══ Seeding Categories ═══");
  const seenCategories = new Set<string>();
  for (const item of scrapedProducts) {
    const category = mapCategory(item.productType, item.handle);
    if (seenCategories.has(category)) continue;
    seenCategories.add(category);

    const meta = toCategoryMeta(category);
    const heroImage = item.images.nodes[0]?.url || "";
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
    console.log(`  ✓ ${meta.name} (${slug})`);
  }
  console.log();

  // Seed products
  console.log("═══ Seeding Products ═══");
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const item of scrapedProducts) {
    try {
      const product = mapToDbProduct(item);

      // If scraped data has no images, preserve any existing images in the DB
      if (product.images.length === 0) {
        const existing = await ProductModel.findOne({ slug: product.slug }).lean();
        if (existing && (existing as any).images?.length > 0) {
          product.images = (existing as any).images;
          product.gallery = (existing as any).gallery || (existing as any).images;
          // Also fix variant images if they're empty
          for (const v of product.variants) {
            if (!v.image && product.images[0]) {
              v.image = product.images[0];
            }
          }
        }
      }

      const result = await ProductModel.findOneAndUpdate(
        { slug: product.slug },
        product,
        { upsert: true, returnDocument: "after" }
      );

      if (result?.isNew) {
        created++;
      } else {
        updated++;
      }

      const variantCount = product.variants.length;
      const imgCount = product.images.length;
      const priceStr = `£${product.price}`;
      console.log(
        `  ✓ ${product.name.padEnd(35)} | ${product.category.padEnd(12)} | ${priceStr.padEnd(10)} | ${variantCount} vars | ${imgCount} imgs | ${product.variants.some(v => v.inStock) ? "IN STOCK" : "OUT OF STOCK"}`
      );
    } catch (err: any) {
      console.error(`  ✗ ${item.handle}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`\n═══ SEED COMPLETE ═══`);
  console.log(`  Products seeded: ${created + updated}`);
  console.log(`  - New:     ${created}`);
  console.log(`  - Updated: ${updated}`);
  console.log(`  - Skipped: ${skipped}`);
  console.log(`  Categories: ${seenCategories.size}`);
  console.log(`\nDatabase Seed Finished Successfully!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err.message);
  process.exit(1);
});
