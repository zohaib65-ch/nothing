import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, ProductVariant, CartItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
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
    "Hello Nothing Store, I want to buy:\n\n*Product:* {product}\n*Variant:* {variant}\n*Quantity:* {quantity}\n*Total:* {total}\n\nPlease confirm availability and payment details.";

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
  fallback = "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
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
