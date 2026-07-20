import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { CategoryModel } from "@/models/Category";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const isMongoId = mongoose.Types.ObjectId.isValid(id) && id.length === 24;

    const query = isMongoId
      ? { $or: [{ _id: new mongoose.Types.ObjectId(id) }, { id: id }, { slug: id }] }
      : { $or: [{ id: id }, { slug: id }] };

    const result = await CategoryModel.deleteMany(query);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete category" }, { status: 500 });
  }
}
