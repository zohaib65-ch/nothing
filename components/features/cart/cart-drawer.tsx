"use client";

import * as React from "react";
import Image from "next/image";
import { X, Trash2, ShoppingBag, MessageSquare, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, generateWhatsAppCartLink, getValidImageUrl } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (!isOpen) return null;

  const totalPrice = getTotalPrice();

  const whatsappUrl = generateWhatsAppCartLink(
    WHATSAPP_NUMBER,
    items,
    totalPrice
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-ntype text-white select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F10] border-l border-[#26262A] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#26262A] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-[#D71921]" />
              <h2 className="font-ndot text-sm uppercase tracking-widest text-white">
                BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-500">
                <ShoppingBag className="h-12 w-12 stroke-[1.5]" />
                <p className="font-lattera text-xs uppercase tracking-wider">YOUR BAG IS EMPTY</p>
                <Button variant="outline" size="sm" onClick={closeCart}>
                  START SHOPPING
                </Button>
              </div>
            ) : (
              items.map((item) => {
                const imageUrl = getValidImageUrl(item.product.images?.[0]);
                const itemPrice = item.selectedVariant.salePrice || item.selectedVariant.price;

                return (
                  <div
                    key={item.id}
                    className="flex space-x-4 p-4 bg-[#141416] border border-[#26262A] rounded-xl relative group"
                  >
                    <div className="relative h-20 w-20 bg-[#0A0A0B] border border-[#26262A] rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={imageUrl}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-medium text-sm text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="font-lattera text-[11px] text-neutral-400 uppercase">
                        {item.selectedVariant.color} / {item.selectedVariant.storage || "Standard"}
                      </p>
                      <div className="font-lattera text-xs font-bold text-white pt-1">
                        {formatPrice(itemPrice)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 pt-2">
                        <div className="flex items-center border border-[#26262A] rounded-md bg-[#0A0A0B]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-white text-neutral-400"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 font-lattera text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-white text-neutral-400"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-500 transition-colors p-1"
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
            <div className="p-6 border-t border-[#26262A] bg-[#141416] space-y-4">
              <div className="flex items-center justify-between font-lattera text-xs uppercase text-neutral-400">
                <span>TOTAL ESTIMATE</span>
                <span className="text-white text-base font-bold">{formatPrice(totalPrice)}</span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D71921] hover:bg-[#B51219] text-white font-lattera text-xs uppercase font-bold tracking-widest py-3 px-6 rounded-full flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-[#D71921]/20"
              >
                <MessageSquare className="h-4 w-4" />
                <span>CHECKOUT ON WHATSAPP</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
