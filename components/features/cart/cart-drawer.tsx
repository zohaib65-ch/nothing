"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
import { useCartItemPrices } from "@/hooks/useItemPrices";
import { formatPrice, getValidImageUrl } from "@/lib/utils";
import { Product, ProductVariant } from "@/types";
import { toast } from "sonner";

const DottedCloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4C5 3.44772 4.55228 3 4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5C4.55228 5 5 4.55228 5 4Z" fill="currentColor" />
    <path d="M7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7C6.55228 7 7 6.55228 7 6Z" fill="currentColor" />
    <path d="M9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8Z" fill="currentColor" />
    <path d="M11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10Z" fill="currentColor" />
    <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" fill="currentColor" />
    <path d="M12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5Z" fill="currentColor" />
    <path d="M10 7C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6C9 6.55228 9.44772 7 10 7Z" fill="currentColor" />
    <path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="currentColor" />
    <path d="M6 11C6.55228 11 7 10.5523 7 10C7 9.44772 6.55228 9 6 9C5.44772 9 5 9.44772 5 10C5 10.5523 5.44772 11 6 11Z" fill="currentColor" />
    <path d="M4 13C4.55228 13 5 12.5523 5 12C5 11.4477 4.55228 11 4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13Z" fill="currentColor" />
  </svg>
);

const DottedChevron = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/60 shrink-0">
    <path d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z" fill="currentColor" />
    <path d="M11 8C11 8.55228 10.5523 9 10 9C9.44772 9 9 9.44772 9 8C9 7.44772 9.44772 7 10 7C10.5523 7 11 7.44772 11 8Z" fill="currentColor" />
    <path d="M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z" fill="currentColor" />
    <path d="M7 8C7 8.55228 6.55228 9 6 9C5.44772 9 5 8.55228 5 8C5 7.44772 5 7 6 7C6.55228 7 7 7.44772 7 8Z" fill="currentColor" />
    <path d="M5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6Z" fill="currentColor" />
  </svg>
);

export function CartDrawer() {
  const { isOpen, closeCart, items, addItem, getTotalItems } = useCartStore();
  const { products: storeProducts, fetchAll } = useProductStore();
  const { itemsWithPrices } = useCartItemPrices(items);

  const [mounted, setMounted] = React.useState(false);
  const [selectedVariants, setSelectedVariants] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    setMounted(true);
    if (!storeProducts || storeProducts.length === 0) {
      fetchAll();
    }
  }, [fetchAll, storeProducts]);

  // Lock body scroll when cart is open
  React.useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.classList.add("cart-open");
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.classList.remove("cart-open");
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.classList.remove("cart-open");
    };
  }, [isOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  // Derive recommendations dynamically from live store products
  const recommendedList = React.useMemo(() => {
    if (!storeProducts || storeProducts.length === 0) return [];

    const cartProductIds = new Set(
      items.map((it) => (it.product?.id || it.product?.slug || "").toLowerCase())
    );

    // Filter out products already in cart
    const candidates = storeProducts.filter((p) => {
      const id = (p.id || "").toLowerCase();
      const slug = (p.slug || "").toLowerCase();
      return !cartProductIds.has(id) && !cartProductIds.has(slug);
    });

    // Priority to accessories, audio, wearables, then any other products
    const priorityList = [...candidates].sort((a, b) => {
      const catA = (a.category || "").toLowerCase();
      const catB = (b.category || "").toLowerCase();
      const scoreA =
        catA.includes("audio") || catA.includes("ear") || catA.includes("watch") || catA.includes("accessor")
          ? 2
          : 1;
      const scoreB =
        catB.includes("audio") || catB.includes("ear") || catB.includes("watch") || catB.includes("accessor")
          ? 2
          : 1;
      return scoreB - scoreA;
    });

    return priorityList.slice(0, 3);
  }, [storeProducts, items]);

  if (!isOpen) return null;

  const handleAddRecommended = (prod: any) => {
    const selectedVariantId = selectedVariants[prod.id];
    const variant: ProductVariant =
      prod.variants?.find((v: any) => v.id === selectedVariantId) ||
      prod.variants?.[0] || {
        id: `var-${prod.id}`,
        name: "Standard",
        color: "Standard",
        price: prod.price || 0,
        image: prod.images?.[0] || "",
      };

    const fullProduct = {
      ...prod,
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      price: prod.price || variant.price || 0,
      category: prod.category || "accessories",
      images: prod.images || [variant.image],
      variants: prod.variants || [variant],
      inStock: prod.inStock ?? true,
      status: prod.status || "published",
    } as Product;

    addItem(fullProduct, variant, 1);
    toast.success(`${prod.name} (${variant.color || variant.name}) added to bag`);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center px-3 pt-4 md:px-6 md:pt-5 select-none backdrop-blur-lg bg-black/40 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
    >
      <div className="w-full max-w-[500px] lg:max-w-[470px] flex flex-col h-[calc(100vh-2.5rem)] sm:h-[calc(100vh-3rem)]">
        {/* Top Navbar Header Bar identical to main navbar */}
        <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center rounded-[10px] border-b border-black/8 bg-white px-2 text-[#111] shadow-[0_16px_40px_rgba(17,17,17,0.12)] md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3 shrink-0">
          <button
            type="button"
            onClick={closeCart}
            aria-label="Menu"
            className="inline-flex h-11 w-11 cursor-pointer shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8"
          >
            <img alt="Menu" src="/menu.svg" className="h-[18px] w-[18px] object-contain opacity-70" />
          </button>

          <Link
            className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[20px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
            style={{ fontFamily: "var(--font-ndot-regular)" }}
            href="/"
            onClick={closeCart}
          >
            NOTHING (R)
          </Link>

          <div className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center justify-self-end rounded-[8px] md:h-8 md:w-8">
            {totalItems > 0 && (
              <span
                className="type-logo -translate-y-px whitespace-nowrap text-[#6a6b6b] text-[20px] font-normal leading-none"
                style={{ fontFamily: "var(--font-ndot-regular)" }}
              >
                ({totalItems})
              </span>
            )}
          </div>
        </div>

        {/* Cart Overlay Content Scroll Area */}
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-touch="true"
          data-lenis-prevent-wheel="true"
          className="flex-1 min-h-0 overflow-y-auto space-y-3.5 mt-2 scrollbar-none pb-4"
        >
          {/* ─── Card 1: "Item added" ─────────────────────────────── */}
          <div className="bg-[#f2f2f2]/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-[0_16px_40px_rgba(17,17,17,0.1)] border border-black/5 flex flex-col justify-between">
            {/* Header: Centered "Item added" title + Top Right Dotted Cross */}
            <div className="relative flex items-center justify-center pb-6">
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close"
                className="absolute right-0 top-0 p-0 text-black hover:opacity-60 transition-opacity cursor-pointer"
              >
                <DottedCloseIcon />
              </button>
              <h2 className="font-ntype82 text-3xl sm:text-[34px] font-normal text-black text-center tracking-tight">
                {items.length === 0 ? "Your bag is empty" : "Item added"}
              </h2>
            </div>

            {items.length === 0 ? (
              <div className="py-8 text-center space-y-4">
                <p className="text-sm text-black/60 font-serif">
                  Explore our store and add items to your shopping bag.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-black text-white text-xs uppercase font-mono tracking-widest rounded-lg hover:bg-black/85 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-7">
                {/* All Cart Items with fixed height and scroll */}
                <div className="max-h-[180px] overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin scrollbar-thumb-black/15">
                  {itemsWithPrices.map((item) => {
                    const imageUrl = getValidImageUrl(
                      item.selectedVariant?.image || item.product?.images?.[0]
                    );
                    const colorStr = item.selectedVariant?.color || "";
                    const capStr =
                      item.selectedVariant?.capacity || item.selectedVariant?.storage || "";

                    return (
                      <div key={item.id} className="flex items-center gap-5 py-1">
                        {/* Phone / Product Image on Left */}
                        <div className="relative w-16 h-20 sm:w-20 sm:h-24 shrink-0 flex items-center justify-center">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={item.product.name}
                              fill
                              sizes="100px"
                              className="object-contain"
                              unoptimized
                            />
                          ) : (
                            <span className="text-[9px] text-black/40 font-mono">NO IMAGE</span>
                          )}
                        </div>

                        {/* Details on Right */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center space-y-1">
                          <h3 className="font-ntype82 text-base font-normal text-black leading-snug">
                            {item.product.name}
                            {colorStr ? `, ${colorStr}` : ""}
                            {capStr ? `, ${capStr}` : ""}
                          </h3>
                          <div
                            className="text-[11px] text-black"
                            style={{ fontFamily: "'LatteraMonoLL', 'letteraRegular', monospace" }}
                          >
                            {formatPrice(item.prices.itemTotal)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Est Delivery Time Note */}
                <div className="font-ntype82 text-[13px] sm:text-base text-black leading-relaxed">
                  Est Delivery Time: For Express delivery: 1-3 working days. For Standard delivery: 3-5 working days.
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex cursor-pointer items-center justify-center rounded-lg transition-colors h-12 w-full bg-white hover:bg-[#DADADA] text-black font-mono text-[11px] uppercase tracking-widest text-center"
                  >
                    VIEW BAG
                  </Link>

                  <Link
                    href="/order"
                    onClick={closeCart}
                    className="flex cursor-pointer items-center justify-center rounded-lg transition-colors h-12 w-full bg-black hover:bg-black/85 text-white font-mono text-[11px] uppercase tracking-widest text-center shadow-sm"
                  >
                    CHECKOUT
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ─── Card 2: "YOU MIGHT LIKE" ─────────────────────────── */}
          <div className="bg-[#f2f2f2]/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-[0_16px_40px_rgba(17,17,17,0.1)] border border-black/5 flex flex-col">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/80 text-center mb-6">
              YOU MIGHT LIKE
            </h3>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 items-start">
              {recommendedList.map((prod: any) => {
                const currentVarId = selectedVariants[prod.id] || prod.variants?.[0]?.id;
                const currentVar =
                  prod.variants?.find((v: any) => v.id === currentVarId) || prod.variants?.[0];
                const displayImg = currentVar?.image || prod.images?.[0] || "";
                const displayPrice = currentVar?.price || prod.price || 0;
                const hasMultipleVariants = prod.variants && prod.variants.length > 1;

                return (
                  <div key={prod.id} className="flex flex-col justify-between items-center text-center h-full">
                    {/* Top: Image, Title, Price */}
                    <div className="w-full flex flex-col items-center">
                      <div className="relative size-20 sm:size-24 mb-3 flex items-center justify-center">
                        {displayImg ? (
                          <Image
                            src={displayImg}
                            alt={prod.name}
                            fill
                            sizes="96px"
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <span className="text-[9px] text-black/40 font-mono">NO IMAGE</span>
                        )}
                      </div>

                      <h4 className="font-serif text-xs sm:text-[13px] font-normal text-black line-clamp-2 leading-tight min-h-[32px] flex items-center justify-center">
                        {prod.name}
                        {currentVar?.color ? `, ${currentVar.color}` : ""}
                      </h4>

                      <div className="mt-1 font-serif text-xs sm:text-[13px] text-black">
                        {formatPrice(displayPrice)}
                      </div>
                    </div>

                    {/* Bottom: Variant Selector Button + ADD TO BAG */}
                    <div className="w-full flex flex-col gap-2 mt-4">
                      {hasMultipleVariants ? (
                        <div className="relative w-full">
                          <div className="h-11 w-full rounded-md bg-white hover:bg-[#E2E2E2] flex items-center justify-center gap-1.5 px-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-black transition-colors cursor-pointer">
                            <span className="truncate">{currentVar?.color || currentVar?.name}</span>
                            <DottedChevron />
                          </div>
                          <select
                            value={currentVarId}
                            onChange={(e) =>
                              setSelectedVariants((prev) => ({
                                ...prev,
                                [prod.id]: e.target.value,
                              }))
                            }
                            className="absolute inset-0 size-full opacity-0 cursor-pointer appearance-none"
                            aria-label={`Select variant for ${prod.name}`}
                          >
                            {prod.variants.map((v: any) => (
                              <option key={v.id} value={v.id}>
                                {v.color || v.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="h-11 w-full" />
                      )}

                      <button
                        type="button"
                        onClick={() => handleAddRecommended(prod)}
                        className="h-11 w-full rounded-md bg-black text-white hover:bg-black/85 text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center justify-center cursor-pointer"
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
