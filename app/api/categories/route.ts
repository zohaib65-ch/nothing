import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { CategoryModel } from "@/models/Category";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// .lean() skips Mongoose toJSON transforms, so we replicate _id → id here
function normalizeLeanDoc(doc: any) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { id: _id?.toString?.() ?? _id, ...rest };
}

export async function GET() {
  try {
    await connectToDatabase();
    const docs = await CategoryModel.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(docs.map(normalizeLeanDoc), {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
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
      { new: true, upsert: true, runValidators: false },
    );

    try {
      revalidatePath("/categories");
      revalidatePath("/collections/shop-all");
      revalidatePath("/");
    } catch {}

    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save category" }, { status: 500 });
  }
}
