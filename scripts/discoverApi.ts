/**
 * Discover the Nothing.tech Shopify Storefront API
 * - Finds the public access token from page source
 * - Discovers all supported countries/regions
 * - Tests the Storefront API endpoint
 */

const REGIONS = [
  "gb", "us", "de", "fr", "es", "it", "nl", "at", "be", "se",
  "dk", "fi", "ie", "pt", "pl", "cz", "ro", "hu", "bg", "hr",
  "sk", "si", "lt", "lv", "ee", "gr", "cy", "mt", "lu",
  "in", "jp", "my", "sg", "hk", "tw", "kr", "au", "nz",
  "ae", "sa", "qa", "kw", "bh", "om", "ca", "mx", "br",
  "ch", "no", "il", "tr", "th", "ph", "id", "vn",
];

const COLLECTIONS = [
  "shop-all",
  "phones", "smartphones",
  "audio", "earbuds", "headphones",
  "watches", "smartwatches",
  "accessories", "cases", "chargers", "cables",
  "cmf", "cmf-by-nothing",
];

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) return "";
  return res.text();
}

async function discoverShopifyConfig() {
  console.log("=== STEP 1: Fetching main page to extract Shopify config ===\n");

  const html = await fetchPage("https://nothing.tech/collections/shop-all");
  if (!html) {
    console.log("Failed to fetch main page, trying /gb/");
    const gbHtml = await fetchPage("https://nothing.tech/gb/collections/shop-all");
    if (gbHtml) return extractConfig(gbHtml);
  }
  return extractConfig(html);
}

function extractConfig(html: string) {
  // Look for Shopify public access token
  const tokenMatch = html.match(/(?:publicAccessToken|Shopify\.StorefrontToken|storefront_access_token|public_token|accessToken)['":\s]+['"]([a-f0-9]{32})['"]/i);
  if (tokenMatch) {
    console.log("Found Shopify storefront token:", tokenMatch[1]);
  }

  // Look for Hydrogen/Remix data
  const scriptDataMatch = html.match(/<script[^>]*id="__remixContext"[^>]*>([\s\S]*?)<\/script>/);
  if (scriptDataMatch) {
    console.log("\nFound Remix context data (first 2000 chars):");
    console.log(scriptDataMatch[1].substring(0, 2000));
  }

  // Look for any inline JSON product data
  const jsonMatches = html.match(/\{"products":\[[\s\S]*?\]\}/g);
  if (jsonMatches) {
    console.log("\nFound inline product JSON data:", jsonMatches.length, "matches");
    for (const m of jsonMatches.slice(0, 2)) {
      try {
        const data = JSON.parse(m);
        console.log("Products count:", data.products?.length);
      } catch {}
    }
  }

  // Look for Shopify Storefront API URL
  const apiUrlMatch = html.match(/(https:\/\/[a-z0-9-]+\.myshopify\.com\/api\/\d{4}-\d{2}\/graphql\.json)/i);
  if (apiUrlMatch) {
    console.log("\nFound Storefront API URL:", apiUrlMatch[1]);
  }

  // Find store domain
  const domainMatch = html.match(/([a-z0-9-]+)\.myshopify\.com/i);
  if (domainMatch) {
    console.log("Shopify store domain:", domainMatch[0]);
  }

  // Look for any script tags with interesting data
  const scriptTags = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g) || [];
  for (const tag of scriptTags) {
    if (tag.includes("accessToken") || tag.includes("storefront") || tag.includes("publicAccessToken")) {
      console.log("\n--- Script with storefront data ---");
      console.log(tag.substring(0, 3000));
      console.log("---");
    }
  }

  // Extract country selector data
  const countryMatches = html.match(/href="\/([a-z]{2})(?:\/|")/gi);
  if (countryMatches) {
    const countries = [...new Set(countryMatches.map(m => m.match(/\/([a-z]{2})/i)?.[1]).filter(Boolean))];
    console.log("\nFound country paths:", countries);
  }

  return html;
}

async function testRegions() {
  console.log("\n=== STEP 2: Testing which region paths return products ===\n");

  const validRegions: string[] = [];

  for (const region of REGIONS.slice(0, 15)) { // test first 15
    try {
      const res = await fetch(`https://nothing.tech/${region}/collections/shop-all`, {
        method: "HEAD",
        headers: { "User-Agent": "Mozilla/5.0" },
        redirect: "follow",
      });
      const status = res.status;
      const finalUrl = res.url;
      if (status === 200) {
        validRegions.push(region);
        console.log(`✓ ${region}: ${status} -> ${finalUrl}`);
      } else {
        console.log(`✗ ${region}: ${status}`);
      }
    } catch (err: any) {
      console.log(`✗ ${region}: ERROR ${err.message}`);
    }
  }

  console.log("\nValid regions found:", validRegions);
  return validRegions;
}

async function testCollections() {
  console.log("\n=== STEP 3: Testing collection paths ===\n");

  for (const col of COLLECTIONS) {
    try {
      const res = await fetch(`https://nothing.tech/gb/collections/${col}`, {
        method: "HEAD",
        headers: { "User-Agent": "Mozilla/5.0" },
        redirect: "follow",
      });
      console.log(`${col}: ${res.status} -> ${res.url}`);
    } catch (err: any) {
      console.log(`${col}: ERROR ${err.message}`);
    }
  }
}

async function tryStorefrontApi() {
  console.log("\n=== STEP 4: Testing Shopify Storefront GraphQL API ===\n");

  // Common Nothing.tech Shopify store identifiers
  const possibleDomains = [
    "nothing-technology.myshopify.com",
    "nothing-tech.myshopify.com",
    "nothing-gb.myshopify.com",
    "intl-nothing.myshopify.com",
    "nothing-2.myshopify.com",
  ];

  // Try to find the actual domain from page source
  const html = await fetchPage("https://nothing.tech/");
  const domainMatch = html.match(/([a-z0-9-]+)\.myshopify\.com/i);
  if (domainMatch) {
    possibleDomains.unshift(domainMatch[0]);
    console.log("Discovered domain from source:", domainMatch[0]);
  }

  // Also search for the Storefront API token in all script content
  const allScripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
  for (const script of allScripts) {
    // Check for publicStorefrontToken or similar
    const tokenPatterns = [
      /["']?(?:public)?(?:Storefront)?(?:Access)?Token["']?\s*[:=]\s*["']([a-f0-9]{32,})["']/gi,
      /["']([a-f0-9]{32})["']/g,
    ];
    for (const pattern of tokenPatterns) {
      const matches = script.matchAll(pattern);
      for (const match of matches) {
        if (match[1] && match[1].length === 32) {
          console.log("Potential token found:", match[1], "(context:", script.substring(Math.max(0, script.indexOf(match[1]) - 50), script.indexOf(match[1]) + 50), ")");
        }
      }
    }
  }
}

async function extractProductsFromHtml() {
  console.log("\n=== STEP 5: Extracting products directly from HTML ===\n");

  const regions = ["gb", "in", "us", "de", "jp"];
  const allProducts = new Map<string, any>();

  for (const region of regions) {
    const html = await fetchPage(`https://nothing.tech/${region}/collections/shop-all`);
    if (!html) {
      console.log(`${region}: Failed to fetch`);
      continue;
    }

    // Extract product links and data from HTML
    const productLinks = [...html.matchAll(/href="\/[a-z]{2}\/products\/([^"]+)"/gi)];
    const slugs = [...new Set(productLinks.map(m => m[1]))];
    console.log(`${region}: Found ${slugs.length} product slugs:`, slugs);

    for (const slug of slugs) {
      if (!allProducts.has(slug)) {
        allProducts.set(slug, { slug, regions: [region] });
      } else {
        allProducts.get(slug)!.regions.push(region);
      }
    }

    // Also try to extract product data from script tags
    const remixData = html.match(/<script[^>]*id="__remixContext"[^>]*>([\s\S]*?)<\/script>/);
    if (remixData) {
      console.log(`${region}: Has Remix context (${remixData[1].length} chars)`);
      // Try parsing
      try {
        // The remix context often has the loader data with products
        const contextStr = remixData[1];
        // Look for product handles/IDs
        const handles = [...contextStr.matchAll(/"handle"\s*:\s*"([^"]+)"/g)];
        if (handles.length) {
          console.log(`  Remix handles:`, handles.map(h => h[1]));
        }
      } catch {}
    }
  }

  console.log("\n=== ALL UNIQUE PRODUCTS ===");
  for (const [slug, data] of allProducts) {
    console.log(`  ${slug}: available in ${data.regions.join(", ")}`);
  }
  console.log(`\nTotal unique products: ${allProducts.size}`);
}

async function main() {
  await discoverShopifyConfig();
  await testRegions();
  await testCollections();
  await extractProductsFromHtml();
}

main().catch(console.error);

export {};
