import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import { ProductModel } from "@/models/Product";
import { CategoryModel } from "@/models/Category";
import { SettingsModel } from "@/models/Settings";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from "@/constants/seedData";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Seed Admin User safely
    let admin = await UserModel.findOne({ username: "admin" });
    if (!admin) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      try {
        admin = await UserModel.create({
          username: "admin",
          email: "admin@nothing.tech",
          passwordHash,
          role: "admin",
        });
      } catch {
        admin = await UserModel.findOne({ username: "admin" });
      }
    }

    // 2. Seed Categories
    for (const cat of INITIAL_CATEGORIES) {
      await CategoryModel.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, returnDocument: "after" });
    }

    // 3. Seed Products
    for (const prod of INITIAL_PRODUCTS) {
      await ProductModel.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true, returnDocument: "after" });
    }

    // 4. Seed Settings
    let settings = await SettingsModel.findOne({});
    if (!settings) {
      settings = await SettingsModel.create(INITIAL_SETTINGS);
    }

    return NextResponse.json({
      success: true,
      message: "MongoDB Seeded Successfully!",
      adminUser: { username: "admin", password: "admin123" },
      productsCount: INITIAL_PRODUCTS.length,
      categoriesCount: INITIAL_CATEGORIES.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
