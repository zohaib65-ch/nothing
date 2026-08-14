import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { CategoryModel } from "@/models/Category";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

    try {
      revalidatePath("/categories");
      revalidatePath("/collections/shop-all");
      revalidatePath("/");
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete category" }, { status: 500 });
  }
}
