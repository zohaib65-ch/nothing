import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import mongoose from "mongoose";

function getProductQuery(id: string) {
  if (mongoose.isValidObjectId(id)) {
    return { _id: id };
  }
  return { $or: [{ id: id }, { slug: id }] };
}

// .lean() skips Mongoose toJSON transforms, so we replicate _id → id here
function normalizeLeanDoc(doc: any) {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return { id: _id?.toString?.() ?? _id, ...rest };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const query = getProductQuery(id);
    let product = await ProductModel.findOneAndUpdate(query, body, {
      returnDocument: "after",
    });

    if (!product) {
      // If product doesn't exist yet, create it with upsert
      product = await ProductModel.create({ ...body, id: body.id || id });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();

    const query = getProductQuery(id);
    const product = await ProductModel.findOneAndUpdate(query, { $set: body }, { returnDocument: "after" });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const query = getProductQuery(id);
    await ProductModel.findOneAndDelete(query);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
