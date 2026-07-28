"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, _hasHydrated } = useCartStore();
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const isCartReady = hasMounted && _hasHydrated;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const formatPKR = (amount: number) => {
    return `Rs ${new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)}`;
  };

  if (!isCartReady) {
    return (
      <div className="bg-slate-50 min-h-screen text-slate-900 py-24 flex items-center justify-center font-ntype">
        <div className="text-sm animate-pulse text-slate-500">LOADING YOUR BAG...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen text-slate-900 py-24 flex items-center justify-center">
        <Container size="sm" className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-slate-100 rounded-full p-6 text-slate-400">
              <ShoppingBag className="h-16 w-16" />
            </div>
          </div>
          <div className="space-y-2">
            <Heading size="md" className="font-lattera font-bold tracking-wider uppercase text-black">
              YOUR BAG IS EMPTY
            </Heading>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Looks like you haven't added anything to your cart yet. Explore our latest products and exclusive accessories.
            </p>
          </div>
          <Button variant="secondary" onClick={() => router.push("/shop-all")} leftIcon={<ArrowLeft className="h-4 w-4" />}>
            EXPLORE CATALOG
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 pt-20">
      <Container>
        <div className="space-y-8">
          {/* Headline */}
          <div className="border-b border-slate-200/80 pb-6">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Your Bag</h1>
            <p className="text-xs text-slate-500 mt-1 font-ntype">Review items in your bag before proceeding to checkout.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => {
                const itemPrice = item.selectedVariant.salePrice || item.selectedVariant.price;
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-100 rounded-[24px] p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition duration-200 hover:shadow-md"
                  >
                    {/* Product thumb & details */}
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-slate-50 rounded-2xl border border-slate-100 p-2 shrink-0 flex items-center justify-center">
                        <img
                          alt={item.product.name}
                          src={item.selectedVariant.image || item.product.images[0]}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <Link href={`/products/${item.product.slug}`} className="text-sm font-bold text-slate-900 hover:underline line-clamp-1">
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-slate-500 font-ntype">
                          Color: {item.selectedVariant.color}
                          {item.selectedVariant.storage && ` • Storage: ${item.selectedVariant.storage}`}
                        </p>
                        <p className="text-xs font-bold text-slate-800 sm:hidden mt-1">{formatPKR(itemPrice)}</p>
                      </div>
                    </div>

                    {/* Quantity controls & Remove & Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100/80">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 inline-flex items-center justify-center text-slate-500 hover:text-black transition cursor-pointer select-none rounded-lg"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 inline-flex items-center justify-center text-slate-500 hover:text-black transition cursor-pointer select-none rounded-lg"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Item Total (Desktop) */}
                      <div className="hidden sm:block text-right w-24">
                        <p className="text-xs text-slate-400 font-ntype">Item Total</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">{formatPKR(itemPrice * item.quantity)}</p>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="h-9 w-9 inline-flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Continue Shopping Link */}
              <div className="pt-2 text-left">
                <Link
                  href="/shop-all"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-black transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Continue Catalog Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right side: Summary Card */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-slate-900">Summary</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">Shipping costs are updated during checkout.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Items Total</span>
                    <span className="font-bold text-slate-800">{formatPKR(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-bold text-slate-800 text-emerald-600">Free (Bank Transfer)</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-4 text-sm">
                    <span className="font-bold text-slate-900">Estimated Subtotal</span>
                    <span className="font-black text-slate-900 text-lg">{formatPKR(totalPrice)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => router.push("/order")}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-[16px] transition duration-200 uppercase tracking-widest text-xs select-none cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* SECP registered badge info */}
              <div className="bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm space-y-3 text-xs">
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span className="font-bold text-slate-900">SECP Registered Company</span>
                </div>
                <div className="font-ntype text-[11px] text-slate-500 leading-relaxed pl-7">
                  <p className="font-bold text-slate-700">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED</p>
                  <p className="mt-0.5">Registration CUIN: 0337422</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
