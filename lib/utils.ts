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

export interface ListingCardItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  salePrice?: number;
  colorName?: string;
  colorHex?: string;
  inStock: boolean;
  isComingSoon?: boolean;
  href: string;
  product: Product;
  variant?: any;
}

export function getVariantCardsForListing(products: Product[]): ListingCardItem[] {
  const list: ListingCardItem[] = [];

  for (const p of products) {
    const displayP = getProductDisplayPrice(p);

    if (p.variants && p.variants.length > 0) {
      const colorMap = new Map<string, any>();
      for (const v of p.variants) {
        if (!v.color || v.color.trim().toLowerCase() === "standard" || v.color.trim().toLowerCase() === "default") continue;
        const lowerColor = v.color.trim().toLowerCase();
        if (!colorMap.has(lowerColor)) {
          colorMap.set(lowerColor, v);
        }
      }

      if (colorMap.size > 1) {
        for (const [cKey, v] of colorMap.entries()) {
          const cardImg = v.image || p.images?.[0] || "";

          let regPrice = v.price || p.price || displayP;
          let salePrice = v.salePrice || p.salePrice;
          let isComingSoon = !!v.isComingSoon;

          if (v.storagePrices && Object.keys(v.storagePrices).length > 0) {
            const spEntries = Object.values(v.storagePrices) as any[];
            const firstSp = spEntries.find((sp) => sp.price || sp.salePrice) || spEntries[0];
            if (firstSp) {
              if (firstSp.price) regPrice = firstSp.price;
              if (firstSp.salePrice) salePrice = firstSp.salePrice;
              if (!firstSp.price && firstSp.salePrice) regPrice = firstSp.salePrice;
            }
            if (spEntries.every((sp) => sp.isComingSoon)) {
              isComingSoon = true;
            }
          }

          if (!regPrice) regPrice = displayP;

          list.push({
            id: `${p.id}-${cKey}`,
            productId: p.id,
            name: p.name,
            slug: p.slug,
            image: cardImg,
            price: regPrice,
            salePrice: salePrice && salePrice < regPrice ? salePrice : undefined,
            colorName: v.color,
            colorHex: v.colorHex,
            inStock: p.inStock !== false,
            isComingSoon,
            href: `/products/${p.slug}?color=${encodeURIComponent(v.color)}`,
            product: p,
            variant: v,
          });
        }
        continue;
      }
    }

    let regPrice = p.price || displayP;
    let salePrice = p.salePrice;
    let isComingSoon = p.variants?.length > 0 && p.variants.every((v) => v.isComingSoon);

    if (p.variants?.[0]?.storagePrices && Object.keys(p.variants[0].storagePrices).length > 0) {
      const spEntries = Object.values(p.variants[0].storagePrices) as any[];
      const firstSp = spEntries.find((sp) => sp.price || sp.salePrice);
      if (firstSp) {
        if (firstSp.price) regPrice = firstSp.price;
        if (firstSp.salePrice && firstSp.price && firstSp.salePrice < firstSp.price) {
          salePrice = firstSp.salePrice;
        } else if (!firstSp.price && firstSp.salePrice) {
          regPrice = firstSp.salePrice;
        }
      }
    }

    if (!regPrice) regPrice = displayP;

    list.push({
      id: p.id,
      productId: p.id,
      name: p.name,
      slug: p.slug,
      image: p.images?.[0] || p.variants?.[0]?.image || "",
      price: regPrice,
      salePrice: salePrice && salePrice < regPrice ? salePrice : undefined,
      inStock: p.inStock !== false,
      isComingSoon,
      href: `/products/${p.slug}`,
      product: p,
    });
  }

  return list;
}


