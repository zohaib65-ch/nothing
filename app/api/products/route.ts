import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import { INITIAL_PRODUCTS } from "@/constants/seedData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    await connectToDatabase();

    let query: any = {};
    if (category && category !== "all") query.category = category;
    if (status) query.status = status;

    let products: any[] = [];
    try {
      products = await ProductModel.find(query).sort({ sortOrder: 1, createdAt: -1 });
    } catch {
      products = [];
    }

    if (products.length === 0) {
      try {
        await ProductModel.insertMany(INITIAL_PRODUCTS);
        products = await ProductModel.find({}).sort({ sortOrder: 1, createdAt: -1 });
      } catch {
        products = INITIAL_PRODUCTS;
      }
    }

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(INITIAL_PRODUCTS);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const product = await ProductModel.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
