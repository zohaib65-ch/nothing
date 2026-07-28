import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, ProductVariant, CartItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `Rs ${new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatWhatsAppNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

export function generateWhatsAppLink(
  phone: string,
  product: Product,
  variant?: ProductVariant,
  quantity = 1,
  template?: string
): string {
  const cleanPhone = formatWhatsAppNumber(phone);
  const variantText = variant ? `${variant.color} / ${variant.storage || "Standard"}` : "Default";
  const totalPrice = formatPrice((variant?.salePrice || variant?.price || product.price) * quantity);

  let message =
    template ||
    "Hello Nothing Store, I want to buy:\n\nProduct: {product}\nVariant: {variant}\nQuantity: {quantity}\nTotal: {total}\n\nPlease confirm availability and payment details.";

  message = message
    .replace("{product}", product.name)
    .replace("{variant}", variantText)
    .replace("{quantity}", String(quantity))
    .replace("{total}", totalPrice);

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppCartLink(
  phone: string,
  items: CartItem[],
  totalPrice: number
): string {
  const cleanPhone = formatWhatsAppNumber(phone);
  let itemDetails = items
    .map(
      (item, index) =>
        `${index + 1}. *${item.product.name}* (${item.selectedVariant.color} / ${item.selectedVariant.storage || "Std"}) x${item.quantity} = ${formatPrice(
          (item.selectedVariant.salePrice || item.selectedVariant.price) * item.quantity
        )}`
    )
    .join("\n");

  const message = `Hello Nothing Store, I would like to place an order for the following items:\n\n${itemDetails}\n\n*TOTAL ORDER VALUE:* ${formatPrice(
    totalPrice
  )}\n\nPlease process my order.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getValidImageUrl(
  src?: string,
  fallback = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'><rect width='100%' height='100%' fill='%23121214'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2355555e' font-family='monospace' font-size='22' letter-spacing='2'>NO IMAGE UPLOADED</text></svg>"
): string {
  if (!src || typeof src !== "string") return fallback;
  const trimmed = src.trim();
  if (
    trimmed.startsWith("data:") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }
  return fallback;
}



