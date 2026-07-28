/**
 * seedDatabase.ts
 * 
 * Seeds the MongoDB database with products scraped from Nothing.tech's
 * Shopify Storefront API. Reads from scripts/scraped-products.json.
 * 
 * - Filters out junk products (insurance, gift cards, aftersale, bundles)
 * - Converts GBP prices to PKR
 * - If Cloudinary keys are set → uploads images to Cloudinary
 * - If Cloudinary keys are NOT set → uses original Shopify CDN URLs (still fast)
 * 
 * Run: npm run seed
 * Re-run: Deletes all products first, then re-seeds fresh.
 */

import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join } from "path";
import { connectToDatabase } from "../lib/mongodb";
import { UserModel } from "../models/User";
import { ProductModel } from "../models/Product";
import { CategoryModel } from "../models/Category";

// ── Cloudinary (optional) ────────────────────────────────

let useCloudinary = false;
let uploadToCloudinaryFn: ((source: string, folder?: string) => Promise<string>) | null = null;

async function initCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret || cloudName === "your_cloud_name_here") {
    console.log("  ⚠ Cloudinary keys not set — using Shopify CDN URLs directly");
    console.log("    (Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env to enable)\n");
    return;
  }

  try {
    const { uploadToCloudinary, configureCloudinary } = await import("../lib/cloudinary");
    configureCloudinary();
    uploadToCloudinaryFn = uploadToCloudinary;
    useCloudinary = true;
    console.log("  ✓ Cloudinary configured — images will be uploaded to Cloudinary CDN\n");
  } catch (err: any) {
    console.log("  ⚠ Cloudinary init failed:", err.message);
    console.log("    Using Shopify CDN URLs directly\n");
  }
}

// ── GBP to PKR conversion ────────────────────────────────
const GBP_TO_PKR = 355; // Approximate rate

function convertGbpToPkr(gbpAmount: number): number {
  return Math.round(gbpAmount * GBP_TO_PKR);
}

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

// ── Junk product filter ──────────────────────────────────

const JUNK_HANDLES = new Set([
  "aftersale-products",
  "accidental-damage-12-months",
  "accidental-damage-and-theft-12-months",
  "copy-of-accidental-damage-theft-12-months",
  "copy-of-accidental-damage-12-months",
  "nothing-gift-card",
  "nothing-gift-card-2",
  "phone-2-case-screen-protector",
  "power-45w-cable-180cm",
  "cmf-cover-and-wallet-and-lenses",
  "cmf-cover-and-lenses",
  "cmf-cover-and-wallet",
]);

const JUNK_KEYWORDS = [
  "accidental damage",
  "gift card",
  "aftersale",
];

function isJunkProduct(item: ScrapedProduct): boolean {
  // Keep ALL products in database as requested by user
  return false;
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
  const colorOpt = variant.selectedOptions.find(
    (o) => o.name.toLowerCase() === "colour" || o.name.toLowerCase() === "color"
  );
  const colorName = colorOpt?.value || variant.title.split(" / ")[0] || "Default";

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
    "dark blue": "#0A3D8F",
    beige: "#C8B9A0",
    khaki: "#BDB76B",
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

  // Infer from handle
  if (handle.includes("phone") || handle.includes("cmf-phone")) return "phones";
  if (handle.includes("ear") || handle.includes("buds") || handle.includes("headphone") || handle.includes("neckband"))
    return "audio";
  if (handle.includes("watch")) return "watches";
  if (handle.includes("power") || handle.includes("cable") || handle.includes("case") || handle.includes("protector") || handle.includes("charger") || handle.includes("spigen") || handle.includes("lenses") || handle.includes("wallet") || handle.includes("cover") || handle.includes("cushion"))
    return "accessories";
  if (handle.includes("hoodie") || handle.includes("labcoat") || handle.includes("tracksuit") || handle.includes("t-shirt") || handle.includes("overall") || handle.includes("tote") || handle.includes("pouch") || handle.includes("sweatshirt") || handle.includes("long-sleeve") || handle.includes("caps") || handle.includes("stickers") || handle.includes("lunch"))
    return "apparel";

  return "accessories";
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

// ── Image Upload (Cloudinary or passthrough) ─────────────

const uploadCache = new Map<string, string>();
let uploadCount = 0;
let cacheHits = 0;

async function processImageUrl(url: string, folder = "nothing-store"): Promise<string> {
  if (!url || !url.startsWith("http")) return url;

  // If Cloudinary is not enabled, just pass through the original CDN URL
  if (!useCloudinary || !uploadToCloudinaryFn) {
    return url;
  }

  // Check cache
  if (uploadCache.has(url)) {
    cacheHits++;
    return uploadCache.get(url)!;
  }

  try {
    uploadCount++;
    const cloudinaryUrl = await uploadToCloudinaryFn(url, folder);
    uploadCache.set(url, cloudinaryUrl);

    if (uploadCount % 10 === 0) {
      console.log(`    📤 Uploaded ${uploadCount} images to Cloudinary (${cacheHits} cache hits)`);
    }

    // Rate limit pause
    if (uploadCount % 50 === 0) {
      console.log("    ⏳ Pausing 2s to respect Cloudinary rate limits...");
      await new Promise((r) => setTimeout(r, 2000));
    }

    return cloudinaryUrl;
  } catch (err: any) {
    console.warn(`    ⚠ Failed to upload ${url.substring(0, 60)}...: ${err.message}`);
    return url; // Fallback to original
  }
}

// ── Map Scraped Product to DB Shape ──────────────────────

async function mapToDbProduct(item: ScrapedProduct) {
  const category = mapCategory(item.productType, item.handle);
  const rawMinPrice = parseFloat(item.priceRange.minVariantPrice.amount) || 0;
  const rawSalePrice = parseFloat(item.compareAtPriceRange?.maxVariantPrice?.amount || "0") || undefined;
  
  // Convert to PKR
  const minPrice = convertGbpToPkr(rawMinPrice);
  const salePrice = rawSalePrice ? convertGbpToPkr(rawSalePrice) : undefined;

  // Process product images
  const rawImages = item.images.nodes.map((img) => img.url);
  const images: string[] = [];
  for (const imgUrl of rawImages) {
    const processedUrl = await processImageUrl(imgUrl, `nothing-store/${category}`);
    images.push(processedUrl);
  }

  // Build variants
  const variants = [];
  const rawVariants = item.variants.nodes
    .filter((v) => v.title !== "Default Title" || item.variants.nodes.length === 1);

  for (const v of rawVariants) {
    const color = extractColor(v);
    const storage = extractStorage(v);
    const rawVariantPrice = parseFloat(v.price.amount) || rawMinPrice;
    const rawVariantSalePrice = v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) || undefined : undefined;
    
    const variantPrice = convertGbpToPkr(rawVariantPrice);
    const variantSalePrice = rawVariantSalePrice ? convertGbpToPkr(rawVariantSalePrice) : undefined;

    const variantImageUrl = v.image?.url || images[0] || "";
    const processedVariantImage = variantImageUrl ? await processImageUrl(variantImageUrl, `nothing-store/${category}`) : "";

    variants.push({
      id: v.id.replace("gid://shopify/ProductVariant/", ""),
      name: v.title || item.title,
      storage,
      color: color.name,
      colorHex: color.hex,
      price: variantPrice,
      salePrice: variantSalePrice,
      sku: v.sku || v.id.replace("gid://shopify/ProductVariant/", ""),
      inStock: v.availableForSale,
      image: processedVariantImage,
    });
  }

  // If all variants were filtered out, create one default
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

  // Clean description
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

// ── Seed Function ────────────────────────────────────────

async function seed() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║  Nothing.tech Database Seeder v2                  ║");
  console.log("║  All Regions → Filter → PKR → MongoDB            ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  // Init Cloudinary (optional)
  console.log("Checking Cloudinary...");
  await initCloudinary();

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
  console.log(`  Loaded ${scrapedProducts.length} raw products`);

  // Filter out junk
  const filtered = scrapedProducts.filter((p) => !isJunkProduct(p));
  const junkCount = scrapedProducts.length - filtered.length;
  console.log(`  Filtered out ${junkCount} junk products (insurance, gift cards, bundles)`);
  console.log(`  ${filtered.length} real products to seed\n`);

  // Connect to DB
  console.log("Connecting to MongoDB...");
  await connectToDatabase();
  console.log("  ✓ Connected\n");

  // ── Clean existing data ──
  console.log("═══ Cleaning Existing Data ═══");
  const deletedProducts = await ProductModel.deleteMany({});
  console.log(`  ✓ Deleted ${deletedProducts.deletedCount} existing products`);
  const deletedCategories = await CategoryModel.deleteMany({});
  console.log(`  ✓ Deleted ${deletedCategories.deletedCount} existing categories\n`);

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
  for (const item of filtered) {
    const category = mapCategory(item.productType, item.handle);
    if (seenCategories.has(category)) continue;
    seenCategories.add(category);

    const meta = toCategoryMeta(category);
    const rawHeroImage = item.images.nodes[0]?.url || "";
    const heroImage = rawHeroImage
      ? await processImageUrl(rawHeroImage, "nothing-store/categories")
      : "";
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
  if (useCloudinary) {
    console.log("  ⚡ Uploading images to Cloudinary — this takes a few minutes...\n");
  } else {
    console.log("  ⚡ Using Shopify CDN URLs — seeding will be fast!\n");
  }

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < filtered.length; i++) {
    const item = filtered[i];
    try {
      const product = await mapToDbProduct(item);

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
      const priceStr = `Rs ${product.price.toLocaleString()}`;
      const regions = item.regions?.join(",") || "GB";
      console.log(
        `  [${i + 1}/${filtered.length}] ✓ ${product.name.substring(0, 32).padEnd(34)} | ${product.category.padEnd(12)} | ${priceStr.padEnd(14)} | ${variantCount} vars | ${imgCount} imgs | ${regions}`
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
  console.log(`  Prices: Converted from GBP → PKR (×${GBP_TO_PKR})`);
  if (useCloudinary) {
    console.log(`  📤 Cloudinary uploads: ${uploadCount} (${cacheHits} cache hits)`);
  } else {
    console.log(`  📷 Images: Using Shopify CDN URLs directly`);
  }
  console.log(`\nDatabase Seed Finished Successfully!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err.message);
  process.exit(1);
});
