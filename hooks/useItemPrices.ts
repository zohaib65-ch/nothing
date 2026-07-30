import { CartItem, Product, ProductVariant } from "@/types";

export interface ItemPriceInfo {
  effectivePrice: number;
  originalPrice: number | null;
  hasDiscount: boolean;
  itemTotal: number;
  originalItemTotal: number | null;
}

export function getItemPrices(
  product: Product | undefined | null,
  variant: ProductVariant | undefined | null,
  quantity: number = 1
): ItemPriceInfo {
  if (!product && !variant) {
    return {
      effectivePrice: 0,
      originalPrice: null,
      hasDiscount: false,
      itemTotal: 0,
      originalItemTotal: null,
    };
  }

  const effectivePrice =
    variant?.salePrice !== undefined &&
    variant?.salePrice !== null &&
    !isNaN(variant.salePrice) &&
    Number(variant.salePrice) > 0
      ? Number(variant.salePrice)
      : Number(variant?.price) || Number(product?.price) || 0;

  const rawOrigPrice =
    product?.originalPrice ||
    (variant?.price && variant.price > effectivePrice ? variant.price : null);

  const originalPrice = rawOrigPrice && rawOrigPrice > effectivePrice ? rawOrigPrice : null;
  const hasDiscount = Boolean(originalPrice);

  return {
    effectivePrice,
    originalPrice,
    hasDiscount,
    itemTotal: effectivePrice * quantity,
    originalItemTotal: originalPrice ? originalPrice * quantity : null,
  };
}

export function useCartItemPrices<T extends { product: Product; selectedVariant: ProductVariant; quantity: number }>(
  items: T[]
) {
  const itemsWithPrices = items.map((item) => {
    const prices = getItemPrices(item.product, item.selectedVariant, item.quantity);
    return {
      ...item,
      prices,
    };
  });

  const effectiveTotal = itemsWithPrices.reduce((acc, item) => acc + item.prices.itemTotal, 0);
  const originalTotalSum = itemsWithPrices.reduce(
    (acc, item) => acc + (item.prices.originalItemTotal || item.prices.itemTotal),
    0
  );
  const hasDiscount = originalTotalSum > effectiveTotal;

  return {
    itemsWithPrices,
    effectiveTotal,
    originalTotalSum: hasDiscount ? originalTotalSum : null,
    hasDiscount,
  };
}
