import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { CategoryModel } from "@/models/Category";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await CategoryModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const categorySlug = body.slug || body.name?.toLowerCase().replace(/\s+/g, "-");

    const category = await CategoryModel.findOneAndUpdate(
      { slug: categorySlug },
      { ...body, slug: categorySlug },
      { new: true, upsert: true, runValidators: false }
    );

    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save category" }, { status: 500 });
  }
}
