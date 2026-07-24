import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    // Generate customId: Initials of fullName + random 4 digit number
    const nameParts = (body.fullName || "").trim().split(/\s+/);
    let initials = "";
    if (nameParts.length === 1) {
      initials = nameParts[0].substring(0, 3).toUpperCase();
    } else {
      initials = nameParts.map((n: string) => n[0]).join("").toUpperCase();
      if (initials.length > 4) {
        initials = initials.substring(0, 4);
      }
    }
    const randomNum = Math.floor(1000 + Math.random() * 9000); // exactly 4 digit number
    const shortId = `${initials || "ORD"}-${randomNum}`;
    body._id = shortId;
    body.customId = shortId;

    const order = await OrderModel.create(body);
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to place order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
