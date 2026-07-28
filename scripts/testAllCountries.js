const { writeFileSync } = require('fs');
const { join } = require('path');

const STORE = 'avicii-dev.myshopify.com';
const TOKEN = '50421efc038884899e6d9f6c370a1061';
const API_URL = `https://${STORE}/api/2024-07/graphql.json`;

const COUNTRIES = [
  "GB", "US", "IN", "DE", "FR", "ES", "IT", "NL", "JP", "KR",
  "CA", "AU", "AE", "MX", "SG", "MY", "TW", "HK", "CH", "NO",
  "SE", "DK", "FI", "PL", "CZ", "RO", "HU", "BG", "HR", "SI",
  "SK", "GR", "PT", "IE", "AT", "BE", "BR", "CL", "CO", "ID",
  "IL", "NZ", "PH", "PK", "SA", "TH", "TR", "VN", "ZA"
];

const QUERY = `
  query AllProducts($country: CountryCode) @inContext(country: $country) {
    products(first: 250) {
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

async function main() {
  console.log("Testing GraphQL across", COUNTRIES.length, "countries...");
  const allMap = new Map();

  for (const c of COUNTRIES) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': TOKEN
        },
        body: JSON.stringify({ query: QUERY, variables: { country: c } })
      });
      const json = await res.json();
      const nodes = json.data?.products?.nodes || [];
      console.log(`  ${c}: ${nodes.length} products`);
      for (const n of nodes) {
        if (!allMap.has(n.handle)) {
          allMap.set(n.handle, { ...n, regions: [c] });
        } else {
          const existing = allMap.get(n.handle);
          if (!existing.regions.includes(c)) {
            existing.regions.push(c);
          }
        }
      }
    } catch (err) {
      console.log(`  ${c}: ERROR ${err.message}`);
    }
  }

  const products = [...allMap.values()];
  console.log(`\n===================================`);
  console.log(`Total UNIQUE products found across all ${COUNTRIES.length} countries:`, products.length);
  console.log(`===================================\n`);

  for (const p of products) {
    console.log(`- ${p.handle.padEnd(35)} | ${p.title.substring(0,30).padEnd(32)} | regions: ${p.regions.join(',')}`);
  }

  // Also check if scraped-products.json already had 86 products + spigen patches
  const jsonPath = join(__dirname, 'scraped-products.json');
  writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`\nUpdated scraped-products.json with all ${products.length} products!`);
}

main().catch(console.error);
