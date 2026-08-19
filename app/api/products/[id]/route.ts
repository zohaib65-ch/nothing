import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

function getProductQuery(id: string) {
  if (mongoose.isValidObjectId(id)) {
    return { _id: id };
  }
  return { $or: [{ id: id }, { slug: id }] };
}

// .lean() skips Mongoose toJSON transforms, so we replicate _id → id here
function normalizeLeanDoc(doc: any) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { id: _id?.toString?.() ?? _id, ...rest };
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const query = getProductQuery(id);
    const doc = await ProductModel.findOne(query).lean();

    if (!doc) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(normalizeLeanDoc(doc), {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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

    const query = getProductQuery(id);
    const product = await ProductModel.findOneAndUpdate(query, cleanBody, {
      returnDocument: "after",
      new: true,
      upsert: true,
    });

    function triggerProductRevalidation(prod: any) {
      try {
        if (prod?.slug) {
          revalidatePath(`/products/${prod.slug}`);
          revalidatePath(`/products/${prod.slug}`, "page");
        }
        if (prod?.category) {
          revalidatePath(`/categories/${prod.category}`);
          revalidatePath(`/collections/${prod.category}`);
        }
        revalidatePath("/products");
        revalidatePath("/collections/shop-all");
        revalidatePath("/");
      } catch {}
    }

    triggerProductRevalidation(product);

    return NextResponse.json(normalizeLeanDoc(product?.toObject ? product.toObject() : product));
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();

    const query = getProductQuery(id);
    const product = await ProductModel.findOneAndUpdate(query, { $set: body }, { returnDocument: "after" });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    try {
      if (product.slug) {
        revalidatePath(`/products/${product.slug}`);
        revalidatePath(`/products/${product.slug}`, "page");
      }
      if (product.category) {
        revalidatePath(`/categories/${product.category}`);
        revalidatePath(`/collections/${product.category}`);
      }
      revalidatePath("/products");
      revalidatePath("/collections/shop-all");
      revalidatePath("/");
    } catch {}

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const query = getProductQuery(id);
    const deleted = await ProductModel.findOneAndDelete(query);

    try {
      if (deleted?.slug) {
        revalidatePath(`/products/${deleted.slug}`);
        revalidatePath(`/products/${deleted.slug}`, "page");
      }
      if (deleted?.category) {
        revalidatePath(`/categories/${deleted.category}`);
        revalidatePath(`/collections/${deleted.category}`);
      }
      revalidatePath("/products");
      revalidatePath("/collections/shop-all");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
