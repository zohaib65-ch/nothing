/**
 * Patch missing product images with REAL Spigen & Nothing Shopify/Sanity CDN URLs
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const IMAGE_MAP: Record<string, string[]> = {
  // ── Spigen Ultra Hybrid Zero One (Phone 3) ──
  "spigen-phone-case-phone-3-zero-one": [
    "https://cdn.shopify.com/s/files/1/0808/0067/files/title_sq_web_nothing_phone_3_uh_zeroone_02.jpg?v=1753220893",
    "https://cdn.shopify.com/s/files/1/0808/0067/files/title_sq_web_nothing_phone_3_uh_zeroone_01.jpg?v=1753221081",
    "https://cdn.shopify.com/s/files/1/0808/0067/files/detail_sq_web_nothing_phone_3_uh_zeroone_01.jpg?v=1753221081",
  ],

  // ── Spigen Ultra Hybrid Clear (Phone 3) ──
  "spigen-case-phone-3-clear": [
    "https://cdn.shopify.com/s/files/1/0808/0067/files/title_sq_web_nothing_phone_3_uh_cc_01.jpg?v=1753221769",
    "https://cdn.shopify.com/s/files/1/0808/0067/files/detail_sq_web_nothing_phone_3_uh_cc_01.jpg?v=1753221769",
    "https://cdn.shopify.com/s/files/1/0808/0067/files/detail_sq_web_nothing_phone_3_uh_cc_02.jpg?v=1753221769",
  ],

  // ── Spigen Ultra Hybrid Clear (Phone 3a) ──
  "spigen-case-phone-3a": [
    "https://cdn.shopify.com/s/files/1/0808/0067/files/title_web_nothing_3a_ultrahybrid_01.jpg?v=1741715260",
    "https://cdn.shopify.com/s/files/1/0808/0067/files/detail_web_nothing_3a_ultrahybrid_01.jpg?v=1741715260",
    "https://cdn.shopify.com/s/files/1/0808/0067/files/detail_web_nothing_3a_ultrahybrid_02.jpg?v=1741715260",
  ],

  // ── Spigen Ultra Hybrid Clear (Phone 4a) ──
  "spigen-case-phone-4a": [
    "https://cdn.shopify.com/s/files/1/0808/0067/files/title_web_nothing_phone_4a_pro_ultra_hybrid_01.jpg?v=1780437521",
    "https://cdn.shopify.com/s/files/1/0808/0067/files/detail_web_nothing_phone_4a_pro_ultra_hybrid_01.jpg?v=1780437521",
    "https://cdn.shopify.com/s/files/1/0808/0067/files/detail_web_nothing_phone_4a_pro_ultra_hybrid_02.jpg?v=1780437521",
  ],

  // ── Spigen EZ Fit Screen Protectors ──
  "spigen-screen-protector-ez-fit-phone-3-2-pack": [
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/products/screen-protector-main.png?v=1669000376",
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/products/Nothing_ScreenP2_407x120_138cde1b-b428-496d-9989-c1073843e937.jpg?v=1669000376",
  ],
  "spigen-screen-protector-ez-fit-phone-3-1-pack": [
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/products/screen-protector-main.png?v=1669000376",
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/products/Nothing_ScreenP2_407x120_138cde1b-b428-496d-9989-c1073843e937.jpg?v=1669000376",
  ],
  "spigen-screen-protector-ez-fit-phone-3a-3a-pro-1-pack": [
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/products/screen-protector-main.png?v=1669000376",
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/products/Nothing_ScreenP2_407x120_138cde1b-b428-496d-9989-c1073843e937.jpg?v=1669000376",
  ],

  // ── Spigen Slim Screen Protectors ──
  "spigen-screen-protector-slim-phone-3-2-pack": [
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/products/screen-protector-main.png?v=1669000376",
  ],
  "spigen-screen-protector-slim-fit-phone-3-1-pack": [
    "https://cdn.shopify.com/s/files/1/0376/5420/0459/products/screen-protector-main.png?v=1669000376",
  ],

  // ── Nothing Gift Cards ──
  "nothing-gift-card": [
    "https://cdn.sanity.io/images/gtd4w1cq/production/a05e25f26a142d70dab62bbe79872a6bea922415-4096x2305.jpg?auto=format&w=800",
  ],
  "nothing-gift-card-2": [
    "https://cdn.sanity.io/images/gtd4w1cq/production/a05e25f26a142d70dab62bbe79872a6bea922415-4096x2305.jpg?auto=format&w=800",
  ],
};

function main() {
  const jsonPath = join(__dirname, "scraped-products.json");
  try {
    const scrapedProducts = JSON.parse(readFileSync(jsonPath, "utf-8"));
    let jsonUpdated = 0;

    for (const item of scrapedProducts) {
      if (IMAGE_MAP[item.handle]) {
        item.images = {
          nodes: IMAGE_MAP[item.handle].map((url) => ({ url, altText: item.title })),
        };
        jsonUpdated++;
      }
    }

    writeFileSync(jsonPath, JSON.stringify(scrapedProducts, null, 2), "utf-8");
    console.log(`\n✓ Patched ${jsonUpdated} products in scraped-products.json`);
  } catch (err: any) {
    console.error("Error patching scraped-products.json:", err.message);
  }
}

main();
