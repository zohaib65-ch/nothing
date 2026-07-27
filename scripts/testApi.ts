// Quick test of the Shopify Storefront GraphQL API
const STORE = "avicii-dev.myshopify.com";
const TOKEN = "50421efc038884899e6d9f6c370a1061";
const API = `https://${STORE}/api/2024-07/graphql.json`;

async function gql(query: string, variables: Record<string, any> = {}) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

async function main() {
  // Test 1: Shop info
  console.log("=== Shop Info ===");
  const shop = await gql(`{ shop { name primaryDomain { url } } }`);
  console.log(JSON.stringify(shop, null, 2));

  // Test 2: Get products with GB country context
  console.log("\n=== Products (GB) ===");
  const productsGB = await gql(`
    query Products($country: CountryCode) @inContext(country: $country) {
      products(first: 5) {
        nodes {
          id handle title productType vendor availableForSale
          priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
          variants(first: 3) { nodes { id title sku availableForSale price { amount currencyCode } } }
          images(first: 2) { nodes { url altText } }
        }
      }
    }
  `, { country: "GB" });
  console.log(JSON.stringify(productsGB, null, 2));

  // Test 3: Get available countries (localization)
  console.log("\n=== Localization ===");
  const loc = await gql(`{ localization { availableCountries { isoCode name currency { isoCode } } } }`);
  console.log(JSON.stringify(loc, null, 2));
}

main().catch(console.error);
