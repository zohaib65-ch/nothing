import { NextResponse } from "next/server";
import { listCloudinaryImages } from "@/lib/cloudinary";

export async function GET() {
  try {
    const mediaList = await listCloudinaryImages("nothing-store", 100);

    // Sort newest first
    mediaList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(mediaList);
  } catch (error: any) {
    console.error("Cloudinary list error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
