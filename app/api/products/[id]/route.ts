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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const query = getProductQuery(id);
    const product = await ProductModel.findOne(query);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
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
