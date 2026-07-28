import { writeFileSync } from "fs";
import { join } from "path";
import { connectToDatabase } from "../lib/mongodb";
import { ProductModel } from "../models/Product";

async function exportDbToJson() {
  console.log("Connecting to MongoDB...");
  await connectToDatabase();
  console.log("✓ Connected to MongoDB\n");

  console.log("Fetching all products from MongoDB...");
  const products = await ProductModel.find({}).lean();
  console.log(`Fetched ${products.length} products from database.\n`);

  // Format as clean json
  const outputPath = join(__dirname, "scraped-products-db.json");
  writeFileSync(outputPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`✓ Saved ${products.length} products with Cloudinary URLs and PKR prices to:`);
  console.log(`  ${outputPath}\n`);

  process.exit(0);
}

exportDbToJson().catch((err) => {
  console.error("Export error:", err);
  process.exit(1);
});
