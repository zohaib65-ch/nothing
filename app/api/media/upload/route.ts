import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine file extension from mime type
    const ext = file.name?.split(".").pop() || "png";
    const uniqueName = `${randomUUID()}.${ext}`;

    // Write file to public/uploads directory on disk
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, uniqueName);
    await writeFile(filePath, buffer);

    // Return a short URL path (not base64)
    const url = `/uploads/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process image" }, { status: 500 });
  }
}
