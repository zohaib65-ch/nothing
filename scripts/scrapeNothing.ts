/**
 * Nothing.tech Full Product Scraper
 * 
 * Uses the Shopify Storefront GraphQL API to fetch ALL products
 * with complete variant, image, and pricing data.
 * 
 * Store: avicii-dev.myshopify.com
 * Token: 50421efc038884899e6d9f6c370a1061
 * 
 * Outputs: scripts/scraped-products.json
 */

import { writeFileSync } from "fs";
import { join } from "path";

const STORE = "avicii-dev.myshopify.com";
const TOKEN = "50421efc038884899e6d9f6c370a1061";
const API_URL = `https://${STORE}/api/2024-07/graphql.json`;

// ── Types ────────────────────────────────────────────────

interface ShopifyVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  image: { url: string; altText: string | null } | null;
  selectedOptions: { name: string; value: string }[];
}

interface ShopifyProduct {
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
  variants: { nodes: ShopifyVariant[] };
  images: { nodes: { url: string; altText: string | null }[] };
  seo: { title: string | null; description: string | null };
  createdAt: string;
  updatedAt: string;
}

// ── GraphQL Client ───────────────────────────────────────

async function gql<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Storefront API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
  }
  return json;
}

// ── Product Query (with pagination) ──────────────────────

const PRODUCTS_QUERY = `
  query AllProducts($cursor: String, $country: CountryCode) @inContext(country: $country) {
    products(first: 50, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        handle
        title
        description
        descriptionHtml
        productType
        vendor
        tags
        availableForSale
        createdAt
        updatedAt
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        variants(first: 100) {
          nodes {
            id
            title
            sku
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            image { url altText }
            selectedOptions { name value }
          }
        }
        images(first: 20) {
          nodes { url altText }
        }
        seo { title description }
      }
    }
  }
`;

// ── Collections Query ────────────────────────────────────

const COLLECTIONS_QUERY = `
  query AllCollections {
    collections(first: 50) {
      nodes {
        id
        handle
        title
        description
        image { url altText }
      }
    }
  }
`;

// ── Fetch all products with pagination ───────────────────

async function fetchAllProducts(country: string = "GB"): Promise<ShopifyProduct[]> {
  const allProducts: ShopifyProduct[] = [];
  let cursor: string | null = null;
  let page = 1;

  while (true) {
    console.log(`  Page ${page}: Fetching products${cursor ? ` (after: ${cursor.substring(0, 20)}...)` : ""}...`);

    const result: any = await gql<any>(PRODUCTS_QUERY, {
      cursor,
      country,
    });

    const products = result.data?.products;
    if (!products?.nodes?.length) break;

    allProducts.push(...products.nodes);
    console.log(`  Page ${page}: Got ${products.nodes.length} products (total: ${allProducts.length})`);

    if (!products.pageInfo.hasNextPage) break;
    cursor = products.pageInfo.endCursor;
    page++;

    // Small delay for rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  return allProducts;
}

// ── Main ─────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║  Nothing.tech Storefront API Scraper             ║");
  console.log("║  GraphQL → scraped-products.json                 ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  // Step 1: Get available countries
  console.log("═══ Step 1: Checking available countries ═══");
  const locResult = await gql<any>(`{ localization { availableCountries { isoCode name currency { isoCode } } } }`);
  const countries = locResult.data?.localization?.availableCountries || [];
  console.log(`  Available countries: ${countries.map((c: any) => `${c.isoCode} (${c.currency.isoCode})`).join(", ")}\n`);
  
  // Step 2: Fetch collections
  console.log("═══ Step 2: Fetching collections ═══");
  const colResult = await gql<any>(COLLECTIONS_QUERY);
  const collections = colResult.data?.collections?.nodes || [];
  console.log(`  Found ${collections.length} collections:`);
  for (const col of collections) {
    console.log(`    - ${col.handle}: ${col.title}`);
  }

  // Step 3: Fetch ALL products for each country
  console.log("\n═══ Step 3: Fetching all products ═══\n");

  const allProductsMap = new Map<string, ShopifyProduct & { regions: string[] }>();

  // If only one country, just fetch from that
  const countryList = countries.length > 0
    ? countries.map((c: any) => c.isoCode)
    : ["GB"]; // Fallback

  for (const countryCode of countryList) {
    console.log(`\n  Country: ${countryCode}`);
    const products = await fetchAllProducts(countryCode);

    for (const product of products) {
      if (allProductsMap.has(product.handle)) {
        // Product already exists, add this region
        const existing = allProductsMap.get(product.handle)!;
        if (!existing.regions.includes(countryCode)) {
          existing.regions.push(countryCode);
        }
      } else {
        allProductsMap.set(product.handle, { ...product, regions: [countryCode] });
      }
    }

    console.log(`  ${countryCode}: ${products.length} products (merged total: ${allProductsMap.size})`);
  }

  // Step 4: Output results
  const allProducts = [...allProductsMap.values()];

  console.log("\n═══ RESULTS ═══\n");
  console.log(`Total unique products: ${allProducts.length}\n`);

  // Summary table
  const categories = new Map<string, number>();
  let totalVariants = 0;

  for (const p of allProducts) {
    const type = p.productType || "Uncategorized";
    categories.set(type, (categories.get(type) || 0) + 1);
    totalVariants += p.variants.nodes.length;
  }

  console.log("Category breakdown:");
  for (const [cat, count] of categories) {
    console.log(`  ${cat}: ${count} products`);
  }
  console.log(`  Total variants: ${totalVariants}\n`);

  console.log("Product List:");
  console.log("─".repeat(100));
  console.log("Handle".padEnd(35) + "Title".padEnd(30) + "Type".padEnd(15) + "Price".padEnd(15) + "Variants");
  console.log("─".repeat(100));

  for (const p of allProducts) {
    const price = `${p.priceRange.minVariantPrice.currencyCode} ${p.priceRange.minVariantPrice.amount}`;
    console.log(
      p.handle.padEnd(35) +
      p.title.substring(0, 28).padEnd(30) +
      (p.productType || "-").padEnd(15) +
      price.padEnd(15) +
      p.variants.nodes.length.toString()
    );
  }

  // Save to file
  const outputPath = join(__dirname, "scraped-products.json");
  writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), "utf-8");
  console.log(`\n✓ Saved ${allProducts.length} products to ${outputPath}`);

  // Also save collections
  const collectionsPath = join(__dirname, "scraped-collections.json");
  writeFileSync(collectionsPath, JSON.stringify(collections, null, 2), "utf-8");
  console.log(`✓ Saved ${collections.length} collections to ${collectionsPath}`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});

export {};
