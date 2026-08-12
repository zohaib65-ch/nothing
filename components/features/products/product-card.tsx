"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, generateWhatsAppLink, getValidImageUrl, getProductDisplayPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { MessageSquare, ShoppingBag } from "lucide-react";

export interface ProductCardProps {
  product: Product;
  imageUrl?: string;
  href?: string;
  displayPrice?: number;
  variant?: any;
}

export function ProductCard({
  product,
  imageUrl: customImageUrl,
  href: customHref,
  displayPrice: customDisplayPrice,
  variant: customVariant,
}: ProductCardProps) {
  const { addItem } = useCartStore();

  const defaultVariant = customVariant ||
    product.variants?.[0] || {
      id: "default",
      name: "Standard",
      color: "Standard",
      colorHex: "#FFFFFF",
      price: product.price,
      salePrice: product.salePrice,
      sku: product.slug,
      inStock: true,
    };

  const currentPrice = customDisplayPrice ?? getProductDisplayPrice(product);
  const primaryImg = customImageUrl || product.images?.[0] || product.variants?.[0]?.image;
  const imageUrl = getValidImageUrl(primaryImg);
  const productHref = customHref || `/products/${product.slug}`;

  const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, product, defaultVariant, 1);

  const cardSalePrice = defaultVariant?.salePrice || product.salePrice;
  const cardRegularPrice = defaultVariant?.price || product.price || currentPrice;
  const showSale = Boolean(cardSalePrice && cardSalePrice > 0 && cardRegularPrice > cardSalePrice);

  const isComingSoonCard = Boolean(
    customVariant?.isComingSoon ||
    (customVariant?.storagePrices && Object.values(customVariant.storagePrices).some((sp: any) => sp?.isComingSoon)) ||
    product.isComingSoon ||
    defaultVariant?.isComingSoon ||
    (defaultVariant?.storagePrices && Object.values(defaultVariant.storagePrices).some((sp: any) => sp?.isComingSoon)) ||
    (product.variants || []).some((v) => v.isComingSoon || (v.storagePrices && Object.values(v.storagePrices).some((sp: any) => sp?.isComingSoon)))
  );

  return (
    <div className="group relative flex flex-col items-center text-center space-y-4 py-6 transition-all duration-300">
      {/* Product Image Stage (Transparent background) */}
      <Link
        href={productHref}
        className="relative aspect-[4/5] w-full flex items-center justify-center p-4 group-hover:-translate-y-2 transition-transform duration-300"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
          className="object-contain drop-shadow-xl p-2"
        />
      </Link>

      {/* Product Title below Image (Matches Reference Screenshot) */}
      <div className="space-y-1 text-center">
        <Link href={productHref}>
          <h3 className="font-ntype text-base font-medium text-black group-hover:text-[#D71921] transition-colors">{product.name}</h3>
        </Link>
        {isComingSoonCard ? (
          <div className="font-mono text-xs text-[#D71921] font-bold uppercase tracking-wider">COMING SOON</div>
        ) : (
          <div className="font-lattera text-xs text-neutral-500 font-bold flex items-center justify-center gap-1.5">
            {showSale ? (
              <>
                <span className="text-black font-bold">{formatPrice(cardSalePrice!)}</span>
                <span className="line-through text-neutral-400 font-normal">{formatPrice(cardRegularPrice)}</span>
              </>
            ) : (
              <span>{formatPrice(currentPrice)}</span>
            )}
          </div>
        )}
      </div>

      {/* Hover Order Actions */}
      {!isComingSoonCard && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2 pt-1">
          <button
            onClick={() => addItem(product, defaultVariant, 1)}
            className="p-2 bg-white text-black border border-black/10 hover:border-black transition-colors rounded-full shadow-md"
            title="Add to Cart"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 bg-[#D71921] text-white font-ndot text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md hover:bg-[#B51219] transition-colors"
          >
            <MessageSquare className="h-3 w-3" />
            <span>BUY</span>
          </a>
        </div>
      )}
    </div>
  );
}
