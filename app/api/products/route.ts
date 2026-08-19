import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

export const dynamic = "force-dynamic";

const LIST_FIELDS =
  "name slug price salePrice category images status inStock isFeatured isNewArrival sortOrder warranty variants disclaimers createdAt updatedAt";
function normalizeLeanDoc(doc: any) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
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
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const { _id, ...cleanBody } = body;

    if (cleanBody.variants && cleanBody.variants.length > 0) {
      if (!cleanBody.price && cleanBody.variants[0].price) {
        cleanBody.price = Number(cleanBody.variants[0].price);
      }
      if (cleanBody.salePrice === undefined && cleanBody.variants[0].salePrice !== undefined) {
        cleanBody.salePrice = Number(cleanBody.variants[0].salePrice);
      }
    }

    let product;
    if (cleanBody.slug) {
      product = await ProductModel.findOneAndUpdate({ slug: cleanBody.slug }, cleanBody, {
        returnDocument: "after",
        new: true,
        upsert: true,
      });
    } else {
      product = await ProductModel.create(cleanBody);
    }

    try {
      if (product?.slug) {
        revalidatePath(`/products/${product.slug}`);
        revalidatePath(`/products/${product.slug}`, "page");
      }
      if (product?.category) {
        revalidatePath(`/categories/${product.category}`);
        revalidatePath(`/collections/${product.category}`);
      }
      revalidatePath("/products");
      revalidatePath("/collections/shop-all");
      revalidatePath("/");
    } catch {}

    return NextResponse.json(normalizeLeanDoc(product?.toObject ? product.toObject() : product), { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}
