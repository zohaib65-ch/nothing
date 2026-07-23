import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | any }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    await connectToDatabase();

    const order = await OrderModel.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | any }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    const body = await request.json();

    await connectToDatabase();
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
