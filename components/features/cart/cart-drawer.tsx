"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, getValidImageUrl } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const totalPrice = getTotalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col bg-white border-l border-slate-200 p-0 text-slate-900 font-ntype select-none">
        {/* Header */}
        <SheetHeader className="p-6 border-b border-slate-200/80 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-[#D71921]" />
            <SheetTitle className="font-ndot text-sm uppercase tracking-widest text-slate-900 mt-0.5">
              BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
              <ShoppingBag className="h-12 w-12 stroke-[1.5]" />
              <p className="font-lattera text-xs uppercase tracking-wider">YOUR BAG IS EMPTY</p>
              <button
                onClick={closeCart}
                className="font-lattera text-xs border border-slate-200 hover:bg-slate-50 text-slate-900 py-2 px-4 rounded-full transition-colors cursor-pointer"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            items.map((item) => {
              const imageUrl = getValidImageUrl(item.product.images?.[0]);
              const itemPrice = item.selectedVariant.salePrice || item.selectedVariant.price;

              return (
                <div
                  key={item.id}
                  className="flex space-x-4 p-4 bg-slate-50 border border-slate-200/60 rounded-xl relative group animate-in fade-in-30 duration-200"
                >
                  <div className="relative h-20 w-20 bg-white border border-slate-200/60 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={imageUrl}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-medium text-sm text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="font-lattera text-[11px] text-slate-500 uppercase">
                      {item.selectedVariant.color} / {item.selectedVariant.storage || "Standard"}
                    </p>
                    <div className="font-lattera text-xs font-bold text-slate-900 pt-1">
                      {formatPrice(itemPrice)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 pt-2">
                      <div className="flex items-center border border-slate-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-black text-slate-400 cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 font-lattera text-xs text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-black text-slate-400 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between font-lattera text-xs uppercase text-slate-500 pb-2">
              <span>TOTAL ESTIMATE</span>
              <span className="text-slate-900 text-base font-bold">{formatPrice(totalPrice)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-lattera text-[11px] uppercase font-bold tracking-widest py-3 px-4 rounded-full flex items-center justify-center transition-colors"
              >
                VIEW BAG
              </Link>
              <Link
                href="/order"
                onClick={closeCart}
                className="w-full bg-[#D71921] hover:bg-[#B51219] text-white font-lattera text-[11px] uppercase font-bold tracking-widest py-3 px-4 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-[#D71921]/20"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
