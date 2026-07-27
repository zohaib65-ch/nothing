/**
 * Fix missing images by fetching them from Nothing.tech product pages
 * and the Shopify Storefront API with media query
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const STORE = "avicii-dev.myshopify.com";
const TOKEN = "50421efc038884899e6d9f6c370a1061";
const API_URL = `https://${STORE}/api/2024-07/graphql.json`;

async function gql(query: string, variables: Record<string, any> = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

// Try getting images via media query (includes metafield images)
async function fetchProductMedia(handle: string) {
  const result = await gql(`
    query ProductMedia($handle: String!) {
      product(handle: $handle) {
        title
        handle
        featuredImage { url altText }
        media(first: 20) {
          nodes {
            ... on MediaImage {
              image { url altText }
            }
          }
        }
        images(first: 20) { nodes { url altText } }
        variants(first: 10) {
          nodes { 
            title
            image { url altText }
          }
        }
        metafield(namespace: "custom", key: "image") {
          value
          type
        }
      }
    }
  `, { handle });

  return result.data?.product;
}

// Fallback: scrape image from the HTML product page
function scrapeImageFromPage(handle: string): string[] {
  try {
    const html = execSync(
      `curl.exe -s -L -H "User-Agent: Mozilla/5.0" "https://nothing.tech/products/${handle}"`,
      { maxBuffer: 50 * 1024 * 1024, timeout: 15000 }
    ).toString("utf-8");

    const images = new Set<string>();

    // Get preload images
    const preloads = [...html.matchAll(/imageSrcSet="([^"]+)"/g)];
    for (const m of preloads) {
      const srcSet = m[1].replace(/&amp;/g, "&");
      const baseUrl = srcSet.split("?")[0];
      if (baseUrl && baseUrl.includes("cdn.shopify.com")) {
        images.add(baseUrl);
      }
    }

    // Get og:image
    const ogMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
    if (ogMatch) images.add(ogMatch[1].split("?")[0]);

    // Get Sanity images
    const sanityMatches = [...html.matchAll(/https:\/\/cdn\.sanity\.io\/images\/[^"'\s]+/g)];
    for (const m of sanityMatches) {
      images.add(m[0].split("?")[0]);
    }

    return [...images];
  } catch {
    return [];
  }
}

async function main() {
  const dataPath = join(__dirname, "scraped-products.json");
  const products = JSON.parse(readFileSync(dataPath, "utf-8"));

  const noImages = products.filter((p: any) => p.images.nodes.length === 0);
  console.log(`Found ${noImages.length} products with missing images\n`);

  let fixed = 0;

  for (const product of noImages) {
    console.log(`\nFixing: ${product.handle} (${product.title})`);

    // Method 1: Storefront API media query
    const apiData = await fetchProductMedia(product.handle);
    let foundImages: string[] = [];

    if (apiData) {
      // Check featuredImage
      if (apiData.featuredImage?.url) {
        foundImages.push(apiData.featuredImage.url);
        console.log(`  API featuredImage: ${apiData.featuredImage.url.substring(0, 80)}...`);
      }

      // Check media
      if (apiData.media?.nodes) {
        for (const node of apiData.media.nodes) {
          if (node.image?.url && !foundImages.includes(node.image.url)) {
            foundImages.push(node.image.url);
          }
        }
        console.log(`  API media: ${apiData.media.nodes.length} items`);
      }

      // Check images
      if (apiData.images?.nodes?.length > 0) {
        for (const img of apiData.images.nodes) {
          if (img.url && !foundImages.includes(img.url)) {
            foundImages.push(img.url);
          }
        }
      }

      // Check variant images
      if (apiData.variants?.nodes) {
        for (const v of apiData.variants.nodes) {
          if (v.image?.url && !foundImages.includes(v.image.url)) {
            foundImages.push(v.image.url);
          }
        }
      }
    }

    // Method 2: Scrape from HTML if API returned nothing
    if (foundImages.length === 0) {
      console.log(`  API returned no images, scraping HTML...`);
      foundImages = scrapeImageFromPage(product.handle);
      console.log(`  HTML scrape: ${foundImages.length} images`);
    }

    if (foundImages.length > 0) {
      product.images.nodes = foundImages.map((url: string) => ({ url, altText: null }));
      fixed++;
      console.log(`  ✓ Fixed with ${foundImages.length} images`);
    } else {
      console.log(`  ✗ No images found anywhere`);
    }
  }

  // Save updated data
  writeFileSync(dataPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`\n═══ DONE ═══`);
  console.log(`Fixed: ${fixed}/${noImages.length} products`);
  console.log(`Saved to ${dataPath}`);
  console.log(`\nNow re-run: npm run seed`);
}

main().catch(console.error);
