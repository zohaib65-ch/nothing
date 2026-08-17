"use client";

import Link from "next/link";
import { MessageSquare, ShoppingBag } from "lucide-react";
import { cn, generateWhatsAppLink, ListingCardItem } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { WHATSAPP_NUMBER } from "@/lib/config";

export interface ProductCardProps {
  item: ListingCardItem;
  layout?: "default" | "phone";
  showWarranty?: boolean;
  showActions?: boolean;
  className?: string;
  imageAlt?: string;
}

function PlaceholderImage() {
  return (
    <div className="flex h-full w-full items-center justify-center text-black/10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </div>
  );
}

function WarrantyBadge({ warranty }: { warranty: string }) {
  return (
    <span className="absolute z-20 right-2 top-2 flex h-10 w-10 flex-col items-center justify-center rounded-full border border-white/20 bg-[#D71921] text-center font-mono leading-[1.15] text-white uppercase shadow-sm select-none sm:right-3 sm:top-3 sm:h-12 sm:w-12">
      <span className="text-[8px] font-bold tracking-tighter sm:text-[9px]">{warranty.split(" ")[0]}</span>
      <span className="text-[5px] font-normal tracking-wider text-white/80 sm:text-[6px]">
        {warranty.split(" ")[1] || "WARRANTY"}
      </span>
    </span>
  );
}

function OutOfStockOverlay({ compact }: { compact?: boolean }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <span
        className={cn(
          "rounded-md bg-red-600 font-mono font-bold uppercase tracking-wider text-white shadow-md",
          compact ? "px-2 py-0.5 text-[9px] rounded shadow" : "px-2.5 py-1 text-[9px] sm:text-[10px]"
        )}
      >
        OUT OF STOCK
      </span>
    </div>
  );
}

function PriceBlock({ item, isOutOfStock }: { item: ListingCardItem; isOutOfStock: boolean }) {
  const monoStyle = { fontFamily: "'LatteraMonoLL', 'letteraRegular', monospace" };

  if (isOutOfStock) {
    return (
      <p className="mt-0.5 text-xs font-mono font-bold uppercase tracking-wider text-red-600">OUT OF STOCK</p>
    );
  }

  if (item.isComingSoon) {
    return (
      <p className="mt-0.5 text-xs font-ntype82 font-bold uppercase tracking-wider text-[#D71921]">COMING SOON</p>
    );
  }

  const hasSale = item.salePrice && item.salePrice > 0 && item.salePrice < item.price;

  if (hasSale) {
    return (
      <>
        <p className="text-[11px] font-bold text-black font-ntype82" style={monoStyle}>
          Rs {item.salePrice!.toLocaleString()}
        </p>
        <p
          className="mt-0.5 text-[10px] font-normal text-black/50 line-through font-ntype82"
          style={monoStyle}
        >
          Rs {item.price.toLocaleString()}
        </p>
      </>
    );
  }

  return (
    <p className="text-[11px] font-normal text-black/62 font-ntype82" style={monoStyle}>
      Rs {item.price.toLocaleString()}
    </p>
  );
}

export function ProductCard({
  item,
  layout = "default",
  showWarranty = true,
  showActions = false,
  className,
  imageAlt,
}: ProductCardProps) {
  const { addItem } = useCartStore();
  const isOutOfStock = item.inStock === false;
  const alt = imageAlt || item.name;
  const variant = item.variant;
  const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, item.product, variant, 1);

  const cardContent =
    layout === "phone" ? (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-start",
          isOutOfStock && "cursor-not-allowed select-none opacity-60"
        )}
      >
        <div className="w-full">
          <div className="relative mx-auto flex h-[195px] w-full max-w-[190px] items-center justify-center rounded-2xl sm:h-[240px] sm:max-w-[230px] lg:h-[330px] lg:max-w-[275px]">
            {isOutOfStock && <OutOfStockOverlay />}
            {item.image ? (
              <img
                alt={alt}
                loading="lazy"
                src={item.image}
                className={cn(
                  "absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 ease-out",
                  !isOutOfStock
                    ? "scale-[1.18] group-hover:scale-[1.22] lg:scale-[1.2] lg:group-hover:scale-[1.24]"
                    : "grayscale-[30%] scale-[1.12]"
                )}
              />
            ) : (
              <PlaceholderImage />
            )}
          </div>
        </div>
        <div className="mt-2.5 w-full text-center">
          <p className="mx-auto w-full text-center font-ntype82 text-[0.92rem] font-normal leading-[1.15] text-black/78 sm:text-[1rem] lg:text-[1.08rem]">
            {item.name}
          </p>
          <div className="mt-0.5 flex flex-col items-center">
            <PriceBlock item={item} isOutOfStock={isOutOfStock} />
          </div>
        </div>
      </div>
    ) : (
      <article
        className={cn("flex h-full flex-col", isOutOfStock && "cursor-not-allowed select-none opacity-60")}
      >
        <div className="relative flex aspect-[4/4.35] items-center justify-center overflow-hidden rounded-xl px-2 pt-2 pb-2">
          {isOutOfStock && <OutOfStockOverlay />}
          {showWarranty && item.product.warranty && !isOutOfStock && (
            <WarrantyBadge warranty={item.product.warranty} />
          )}
          {item.image ? (
            <img
              alt={alt}
              loading="lazy"
              src={item.image}
              className={cn(
                "h-full w-full object-contain transition-transform duration-500 ease-out",
                !isOutOfStock ? "scale-[1.14] group-hover:scale-[1.18]" : "grayscale-[30%] scale-[1.10]"
              )}
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>

        <div className="mt-2.5 text-center">
          <h3 className="font-ntype82 text-[0.98rem] font-normal leading-[1.1] tracking-normal text-black sm:text-[1.04rem]">
            {item.name}
          </h3>
          <div className="mt-0.5 flex flex-col items-center">
            <PriceBlock item={item} isOutOfStock={isOutOfStock} />
          </div>
        </div>

        {showActions && !isOutOfStock && !item.isComingSoon && (
          <div className="flex items-center justify-center space-x-2 pt-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(item.product, variant, 1);
              }}
              className="rounded-full border border-black/10 bg-white p-2 text-black shadow-md transition-colors hover:border-black"
              title="Add to Cart"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center space-x-1 rounded-full bg-[#D71921] px-3 py-1.5 font-ndot text-[10px] uppercase tracking-wider text-white shadow-md transition-colors hover:bg-[#B51219]"
            >
              <MessageSquare className="h-3 w-3" />
              <span>BUY</span>
            </a>
          </div>
        )}
      </article>
    );

  const wrapperClass = cn(
    "group block",
    layout === "phone" &&
      "flex flex-col items-start justify-start rounded-[28px] bg-transparent p-1 lg:p-2",
    layout === "phone" && !isOutOfStock && "transition duration-300 hover:-translate-y-1",
    isOutOfStock && "cursor-not-allowed",
    className
  );

  if (isOutOfStock) {
    return <div className={wrapperClass}>{cardContent}</div>;
  }

  return (
    <Link href={item.href} className={wrapperClass} aria-label={layout === "phone" ? `Open ${item.name}` : undefined}>
      {cardContent}
    </Link>
  );
}
