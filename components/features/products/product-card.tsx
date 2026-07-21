"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, generateWhatsAppLink, getValidImageUrl } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { MessageSquare, ShoppingBag } from "lucide-react";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const defaultVariant = product.variants[0] || {
    id: "default",
    name: "Standard",
    color: "Standard",
    colorHex: "#FFFFFF",
    price: product.price,
    salePrice: product.salePrice,
    sku: product.slug,
    inStock: true,
  };

  const currentPrice = defaultVariant.salePrice || defaultVariant.price;
  const imageUrl = getValidImageUrl(product.images?.[0]);

  const whatsappUrl = generateWhatsAppLink(
    WHATSAPP_NUMBER,
    product,
    defaultVariant,
    1
  );

  return (
    <div className="group relative flex flex-col items-center text-center space-y-4 py-6 transition-all duration-300">
      {/* Product Image Stage (Transparent background) */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] w-full flex items-center justify-center p-4 group-hover:-translate-y-2 transition-transform duration-300">
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
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-ntype text-base font-medium text-black group-hover:text-[#D71921] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="font-lattera text-xs text-neutral-500 font-bold">
          {formatPrice(currentPrice)}
        </div>
      </div>

      {/* Hover Order Actions */}
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
    </div>
  );
}
