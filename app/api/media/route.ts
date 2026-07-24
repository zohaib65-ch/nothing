import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    try {
      const files = await readdir(uploadsDir);
      const mediaList = (
        await Promise.all(
          files.map(async (filename) => {
            const filePath = path.join(uploadsDir, filename);
            const fileStat = await stat(filePath);
            if (fileStat.isDirectory()) return null;
            return {
              filename,
              url: `/uploads/${filename}`,
              size: fileStat.size,
              createdAt: fileStat.birthtime.toISOString(),
            };
          })
        )
      ).filter(Boolean) as { filename: string; url: string; size: number; createdAt: string }[];

      // Sort newest first
      mediaList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return NextResponse.json(mediaList);
    } catch {
      return NextResponse.json([]);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
