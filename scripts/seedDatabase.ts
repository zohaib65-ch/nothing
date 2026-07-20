import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../lib/mongodb";
import { UserModel } from "../models/User";
import { ProductModel } from "../models/Product";
import { CategoryModel } from "../models/Category";
import { SettingsModel } from "../models/Settings";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from "../constants/seedData";

async function seed() {
  console.log("Connecting to MongoDB...");
  await connectToDatabase();

  console.log("Seeding Admin User...");
  const existingAdmin = await UserModel.findOne({ username: "admin" });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("admin123", 10);
    try {
      await UserModel.create({
        username: "admin",
        email: "admin@nothing.tech",
        passwordHash,
        role: "admin",
      });
      console.log("✓ Admin user created (Username: admin, Password: admin123)");
    } catch {
      console.log("✓ Admin user already exists");
    }
  } else {
    console.log("✓ Admin user already exists");
  }

  console.log("Seeding Categories...");
  for (const cat of INITIAL_CATEGORIES) {
    await CategoryModel.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, returnDocument: "after" });
  }
  console.log("✓ Categories seeded");

  console.log("Seeding Products...");
  for (const prod of INITIAL_PRODUCTS) {
    await ProductModel.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true, returnDocument: "after" });
  }
  console.log("✓ Products seeded");

  console.log("Seeding Store Settings...");
  const existingSettings = await SettingsModel.findOne({});
  if (!existingSettings) {
    await SettingsModel.create(INITIAL_SETTINGS);
    console.log("✓ Store Settings created");
  } else {
    console.log("✓ Store Settings already exist");
  }

  console.log("Database Seed Finished Successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
