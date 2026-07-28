import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Helper to clean process.env values (strip quotes, carriage returns, trailing spaces)
function cleanEnv(val?: string): string {
  if (!val) return "";
  return val.trim().replace(/^["']|["']$/g, "").trim();
}

// ── Configure Cloudinary ─────────────────────────────────

export function configureCloudinary() {
  // Check official CLOUDINARY_URL string if provided
  const cloudinaryUrl = cleanEnv(process.env.CLOUDINARY_URL);
  if (cloudinaryUrl && cloudinaryUrl.startsWith("cloudinary://")) {
    cloudinary.config({
      cloudinary_url: cloudinaryUrl,
      secure: true,
    });
    return;
  }

  // Check individual keys (support standard + NEXT_PUBLIC fallback)
  const cloudName = cleanEnv(process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  const apiKey = cleanEnv(process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  const apiSecret = cleanEnv(process.env.CLOUDINARY_API_SECRET || process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET);

  const missing: string[] = [];
  if (!cloudName || cloudName === "your_cloud_name_here") missing.push("CLOUDINARY_CLOUD_NAME");
  if (!apiKey || apiKey === "your_api_key_here") missing.push("CLOUDINARY_API_KEY");
  if (!apiSecret || apiSecret === "your_api_secret_here") missing.push("CLOUDINARY_API_SECRET");

  if (missing.length > 0) {
    throw new Error(
      `Missing Cloudinary credentials in Environment Variables: [ ${missing.join(", ")} ]. ` +
      `Please add these keys to your production environment settings (Vercel / hosting dashboard).`
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

// ── Upload to Cloudinary ─────────────────────────────────

/**
 * Upload an image to Cloudinary from a Buffer, base64 string, or remote URL.
 * Returns the secure Cloudinary URL.
 */
export async function uploadToCloudinary(
  source: Buffer | string,
  folder = "nothing-store"
): Promise<string> {
  configureCloudinary();

  // If source is a remote URL (http/https), use upload directly
  if (typeof source === "string" && (source.startsWith("http://") || source.startsWith("https://"))) {
    const result: UploadApiResponse = await cloudinary.uploader.upload(source, {
      folder,
      resource_type: "auto",
      quality: "auto",
      fetch_format: "auto",
    });
    return result.secure_url;
  }

  // If source is a base64 data URL string
  if (typeof source === "string" && source.startsWith("data:")) {
    const result: UploadApiResponse = await cloudinary.uploader.upload(source, {
      folder,
      resource_type: "auto",
      quality: "auto",
      fetch_format: "auto",
    });
    return result.secure_url;
  }

  // If source is a Buffer, convert to base64 data URL
  if (Buffer.isBuffer(source)) {
    const base64 = `data:image/png;base64,${source.toString("base64")}`;
    const result: UploadApiResponse = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: "auto",
      quality: "auto",
      fetch_format: "auto",
    });
    return result.secure_url;
  }

  throw new Error("Invalid image source. Provide a Buffer, base64 data URL, or remote URL.");
}

// ── Delete from Cloudinary ───────────────────────────────

/**
 * Delete an image from Cloudinary by its public ID.
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  configureCloudinary();
  await cloudinary.uploader.destroy(publicId);
}

// ── List images from Cloudinary ──────────────────────────

/**
 * List images from a Cloudinary folder.
 */
export async function listCloudinaryImages(
  folder = "nothing-store",
  maxResults = 100
): Promise<{ filename: string; url: string; size: number; createdAt: string }[]> {
  configureCloudinary();

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: maxResults,
      resource_type: "image",
    });

    return result.resources.map((r: any) => ({
      filename: r.public_id.split("/").pop() || r.public_id,
      url: r.secure_url,
      size: r.bytes || 0,
      createdAt: r.created_at || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

export { cloudinary };
