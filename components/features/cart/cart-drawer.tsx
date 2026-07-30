"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useCartItemPrices } from "@/hooks/useItemPrices";
import { formatPrice, getValidImageUrl } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotalItems } = useCartStore();
  const [mounted, setMounted] = React.useState(false);
  const { itemsWithPrices, effectiveTotal, originalTotalSum } = useCartItemPrices(items);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center px-3 pt-4 md:px-6 md:pt-5 select-none bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
    >
      <div className="w-full max-w-[500px] lg:max-w-[470px] flex flex-col h-[calc(100vh-2.5rem)] sm:h-[calc(100vh-3rem)]">
        {/* Floating Top Header Bar */}
        <div className="grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center rounded-[10px] border-b border-black/8 bg-white px-2 text-[#111] shadow-[0_16px_40px_rgba(17,17,17,0.12)] md:h-11 md:grid-cols-[40px_minmax(0,1fr)_40px] md:px-3 shrink-0">
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-65 md:h-8 md:w-8 cursor-pointer"
          >
            <X className="h-[18px] w-[18px] text-black opacity-80" />
          </button>

          <Link
            className="header-brand-logo inline-flex h-full items-center justify-center px-1 text-[16px] font-normal leading-[19px] uppercase tracking-normal text-black mt-[2px]"
            style={{ fontFamily: "var(--font-ndot55-caps), sans-serif" }}
            href="/"
            onClick={closeCart}
          >
            NOTHING (R)
          </Link>

          <div className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center justify-self-end rounded-[8px] md:h-8 md:w-8">
            <ShoppingBag className="h-[18px] w-[18px] text-black opacity-80" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D71921] px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </div>
        </div>

        {/* Cart Overlay Content */}
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-touch="true"
          data-lenis-prevent-wheel="true"
          className="flex-1 min-h-0 overflow-y-auto space-y-2 mt-1 scrollbar-none flex flex-col justify-between"
        >
          {/* Cart Item List */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-auto py-12 text-center space-y-4 font-lattera-mono">
              <ShoppingBag className="h-12 w-12 text-neutral-300 stroke-[1.5]" />
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider text-neutral-800">YOUR BAG IS EMPTY</p>
                <p className="text-xs text-neutral-500 font-sans">Explore our store and add items to your shopping bag.</p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-lattera-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            <div className="space-y-1.5 flex-1 overflow-y-auto pr-0.5 my-4">
              {itemsWithPrices.map((item) => {
                const prices = item.prices;
                const imageUrl = getValidImageUrl(item.selectedVariant?.image || item.product?.images?.[0]);
                const capacityStr = item.selectedVariant.capacity || item.selectedVariant.storage || "";

                return (
                  <div key={item.id} className="bg-[#EDEBED] rounded-xl p-3 flex items-center gap-3 shrink-0">
                    <div className="relative h-20 w-20 bg-white rounded-lg border border-black/5 overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-xs">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={item.product.name} fill sizes="80px" className="object-contain p-1" />
                      ) : (
                        <span className="font-lattera-mono text-[9px] text-neutral-400">NO IMAGE</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className="text-[15px] sm:text-[16px] text-neutral-900 leading-tight truncate"
                          style={{ fontFamily: "var(--font-ntype82), serif" }}
                        >
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="font-lattera-mono text-[10px] sm:text-[11px] text-neutral-600 font-medium uppercase tracking-wider">
                        {item.selectedVariant.color} {capacityStr ? `/ ${capacityStr}` : ""}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 font-lattera-mono text-[13px]">
                          {prices.originalItemTotal ? (
                            <>
                              <span className="line-through text-neutral-400 text-xs font-normal">
                                {formatPrice(prices.originalItemTotal)}
                              </span>
                              <span className="font-bold text-neutral-900">{formatPrice(prices.itemTotal)}</span>
                            </>
                          ) : (
                            <span className="font-bold text-neutral-900">{formatPrice(prices.itemTotal)}</span>
                          )}
                        </div>

                        <div className="flex items-center bg-white rounded-lg border border-black/8 px-1.5 py-0.5 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 font-lattera-mono text-xs font-bold text-neutral-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Sticky Bottom Summary & Checkout Card */}
          {items.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-[0_16px_40px_rgba(17,17,17,0.12)] border border-black/8 space-y-3 shrink-0 mt-2">
              <div className="flex items-center justify-between font-lattera-mono text-xs uppercase border-b border-neutral-100 pb-2">
                <span className="text-neutral-500 font-medium tracking-wider">TOTAL ESTIMATE</span>
                <div className="flex items-center gap-2">
                  {originalTotalSum ? (
                    <>
                      <span className="line-through text-neutral-400 text-xs font-normal">{formatPrice(originalTotalSum)}</span>
                      <span className="text-neutral-900 text-sm sm:text-base font-bold">{formatPrice(effectiveTotal)}</span>
                    </>
                  ) : (
                    <span className="text-neutral-900 text-sm sm:text-base font-bold">{formatPrice(effectiveTotal)}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-lattera-mono text-[11px] uppercase font-bold tracking-wider py-3 rounded-xl flex items-center justify-center transition-colors text-center"
                >
                  VIEW BAG
                </Link>
                <Link
                  href="/order"
                  onClick={closeCart}
                  className="w-full bg-[#D71921] hover:bg-[#B51219] text-white font-lattera-mono text-[11px] uppercase font-bold tracking-wider py-3 rounded-xl flex items-center justify-center transition-colors shadow-md shadow-[#D71921]/20 text-center"
                >
                  CHECKOUT
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
