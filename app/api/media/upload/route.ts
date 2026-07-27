import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert file directly to Base64 Data URL string to store directly in MongoDB (no local disk files created)
    const mimeType = file.type || "image/png";
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process image" }, { status: 500 });
  }
}
