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

import { Product } from "@/types";

export function getProductDisplayPrice(prod: Partial<Product>): number {
  if (!prod) return 0;

  if (prod.variants && prod.variants.length > 0) {
    for (const variant of prod.variants) {
      if (variant.storagePrices && Object.keys(variant.storagePrices).length > 0) {
        const storageStr = variant.storage || variant.capacity || "";
        const storages = storageStr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        for (const st of storages) {
          const exactKey = Object.keys(variant.storagePrices).find(
            (k) => k.trim().toLowerCase() === st.toLowerCase()
          );
          if (exactKey && variant.storagePrices[exactKey]) {
            const sp = variant.storagePrices[exactKey];
            const val = sp.salePrice || sp.price;
            if (val !== undefined && val !== null && !isNaN(val) && val > 0) {
              return Number(val);
            }
          }
        }

        for (const key of Object.keys(variant.storagePrices)) {
          const sp = variant.storagePrices[key];
          if (sp) {
            const val = sp.salePrice || sp.price;
            if (val !== undefined && val !== null && !isNaN(val) && val > 0) {
              return Number(val);
            }
          }
        }
      }

      const varPrice = variant.salePrice || variant.price;
      if (varPrice !== undefined && varPrice !== null && !isNaN(varPrice) && varPrice > 0) {
        return Number(varPrice);
      }
    }
  }

  return Number(prod.salePrice || prod.price) || 0;
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

