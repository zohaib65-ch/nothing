import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary instead of storing base64 in MongoDB
    const cloudinaryUrl = await uploadToCloudinary(buffer, "nothing-store");

    return NextResponse.json({
      success: true,
      url: cloudinaryUrl,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to upload image to Cloudinary" }, { status: 500 });
  }
}
