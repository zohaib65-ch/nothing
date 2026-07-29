import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

const LIST_FIELDS = "name slug price salePrice category images status isFeatured isNewArrival sortOrder warranty variants createdAt updatedAt";
function normalizeLeanDoc(doc: any) {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return { id: _id?.toString?.() ?? _id, ...rest };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    await connectToDatabase();

    const query: Record<string, string> = {};
    if (category && category !== "all") query.category = category;
    if (status) query.status = status;

    let products: any[] = [];
    try {
      const docs = await ProductModel.find(query).select(LIST_FIELDS).sort({ sortOrder: 1, createdAt: -1 }).lean();
      products = docs.map(normalizeLeanDoc);
    } catch {
      products = [];
    }

    return NextResponse.json(products, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    if (body.variants && body.variants.length > 0) {
      if (!body.price && body.variants[0].price) {
        body.price = Number(body.variants[0].price);
      }
      if (body.salePrice === undefined && body.variants[0].salePrice !== undefined) {
        body.salePrice = Number(body.variants[0].salePrice);
      }
    }

    const product = await ProductModel.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
