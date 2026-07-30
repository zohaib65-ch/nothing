import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(num: number): string {
  return `Rs ${new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)}`;
}

export function getValidImageUrl(url?: string): string {
  if (!url || typeof url !== "string") return "/placeholder.png";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  return `/${url}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function generateWhatsAppLink(
  whatsappNumber: string,
  product: any,
  variant?: any,
  quantity: number = 1
): string {
  const num = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, "") : "923000000000";
  const productName = product?.name || product || "Product";
  const variantText = variant ? ` (${variant.color}${variant.storage ? ` / ${variant.storage}` : ""})` : "";
  const price = variant?.salePrice || variant?.price || product?.price || 0;
  const message = `Hi, I am interested in purchasing ${productName}${variantText} (Qty: ${quantity}) for Rs ${price}. Please confirm availability.`;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
