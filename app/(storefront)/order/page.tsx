"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/useCartStore";
import { useCartItemPrices } from "@/hooks/useItemPrices";
import { Container } from "@/components/ui/container";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { SharedCheckoutForm } from "@/components/features/checkout/checkout-form";
import { TransactionProofModal } from "@/components/features/checkout/transaction-proof-modal";
import { toast } from "sonner";

// Form validation schema with Zod
const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email address is required").email("Enter a valid email address"),
  address: z.string().min(1, "Delivery address is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  postalCode: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => {
        const cleaned = val.replace(/[\s-]/g, "");
        return /^(03\d{9}|\+923\d{9})$/.test(cleaned);
      },
      {
        message: "Enter a valid Pakistani mobile number",
      },
    ),
  phone2: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const cleaned = val.replace(/[\s-]/g, "");
        return /^(03\d{9}|\+923\d{9})$/.test(cleaned);
      },
      {
        message: "Enter a valid Pakistani mobile number",
      },
    ),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CartCheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart, _hasHydrated } = useCartStore();
  const { itemsWithPrices, originalTotalSum } = useCartItemPrices(items);
  const [hasMounted, setHasMounted] = React.useState(false);

  const [isSubmitPending, setIsSubmitPending] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const isCartReady = hasMounted && _hasHydrated;
  const [fulfillmentMethod, setFulfillmentMethod] = React.useState<"ship" | "pickup">("ship");
  const [paymentMethod, setPaymentMethod] = React.useState<"bank_transfer" | "cod" | "pay_at_store">("bank_transfer");
  const [copiedAccount, setCopiedAccount] = React.useState(false);
  const [copiedIban, setCopiedIban] = React.useState(false);
  const [placedOrderId, setPlacedOrderId] = React.useState<string | null>(null);
  const [isProofModalOpen, setIsProofModalOpen] = React.useState<boolean>(false);
  const isHighValue = getTotalPrice() > 8000;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      district: "",
      postalCode: "",
      phoneNumber: "",
      phone2: "",
    },
  });

  React.useEffect(() => {
    if (isCartReady && items.length === 0 && !isSubmitPending && !isProofModalOpen && !placedOrderId) {
      router.push("/cart");
    }
  }, [isCartReady, items, router, isSubmitPending, isProofModalOpen, placedOrderId]);

  const handleCopyText = async (text: string, type: "account" | "iban") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "account") {
        setCopiedAccount(true);
        toast.success("Account number copied!");
        setTimeout(() => setCopiedAccount(false), 2000);
      } else {
        setCopiedIban(true);
        toast.success("IBAN copied!");
        setTimeout(() => setCopiedIban(false), 2000);
      }
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  if (!isCartReady) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24">
        <div className="font-ntype text-sm animate-pulse text-slate-500">LOADING CHECKOUT...</div>
      </div>
    );
  }

  if (items.length === 0 && !placedOrderId && !isProofModalOpen) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24">
        <div className="font-ntype text-sm animate-pulse text-slate-500">REDIRECTING TO BAG...</div>
      </div>
    );
  }

  // Calculations
  const subtotal = getTotalPrice();
  const shippingFee = fulfillmentMethod === "pickup" ? 0 : paymentMethod === "cod" ? 400 : 0;
  const tax = fulfillmentMethod === "pickup" ? 0 : paymentMethod === "cod" ? Math.round(0.04 * subtotal) : 0;
  const total = subtotal + shippingFee + tax;
  const today = new Date();
  const formatShortDate = (d: Date) => {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  const estStart = new Date(today);
  const estEnd = new Date(today);
  estEnd.setDate(today.getDate() + 2);
  const deliveryRangeString = `${formatShortDate(estStart)} - ${formatShortDate(estEnd)}`;
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitPending(true);
    try {
      const cleanPhone = (val?: string) => {
        if (!val) return "";
        return val.replace(/[\s-]/g, "");
      };

      const orderPayload = {
        ...data,
        fulfillmentMethod,
        pickupLocation: fulfillmentMethod === "pickup" ? "Nothing Official Office - Al Qadir Heights, Babar Block, Garden Town, Lahore" : undefined,
        phoneNumber: cleanPhone(data.phoneNumber),
        phone2: cleanPhone(data.phone2),
        paymentMethod,
        items: items.map((item) => ({
          productId: item.product.id || item.product.slug,
          productName: item.product.name,
          variantId: item.selectedVariant.id,
          variantName: `${item.selectedVariant.color}${item.selectedVariant.storage ? ` / ${item.selectedVariant.storage}` : ""}`,
          price: item.selectedVariant.salePrice || item.selectedVariant.price,
          quantity: item.quantity,
          image: item.selectedVariant.image || item.product.images[0],
        })),
        subtotal,
        shippingFee,
        tax,
        total,
        status: "pending",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        const savedOrder = await response.json();
        toast.success("Order registered successfully!");
        // Clear cart since order placed successfully
        clearCart();
        const ordId = savedOrder.id || savedOrder._id;
        if (paymentMethod === "bank_transfer") {
          setPlacedOrderId(ordId);
          setIsProofModalOpen(true);
        } else {
          router.push(`/order/confirmed/${ordId}`);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to place order. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please check your internet connection.");
    } finally {
      setIsSubmitPending(false);
    }
  };

  const formatPKR = (amount: number) => {
    return `Rs ${new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 pt-20 font-ntype">
      {/* Top Banner */}
      <div className="border-b border-slate-200/80 bg-white py-4 shadow-sm">
        <Container className="flex items-center justify-between font-ntype text-xs text-slate-500">
          <Link href="/cart" className="inline-flex items-center space-x-1.5 hover:text-black transition-colors font-medium">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Bag</span>
          </Link>
          <span className="font-ntype uppercase text-[10px] tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Checkout</span>
        </Container>
      </div>

      <Container className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Delivery Details & Payments */}
          <div className="lg:col-span-7 space-y-8">
            <SharedCheckoutForm
              register={register}
              setValue={setValue}
              errors={errors}
              fulfillmentMethod={fulfillmentMethod}
              setFulfillmentMethod={setFulfillmentMethod}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isHighValue={isHighValue}
              isSubmitPending={isSubmitPending}
              deliveryRangeString={deliveryRangeString}
              onSubmit={handleSubmit(onSubmit)}
              copiedAccount={copiedAccount}
              copiedIban={copiedIban}
              onCopyText={handleCopyText}
            />
          </div>

          {/* RIGHT COLUMN: Order Summary Card & SECP badge */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Summary Card */}
            <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900">Order Summary</h2>
                <p className="text-[11px] text-slate-500 mt-0.5">Please review your items before checking out.</p>
              </div>

              {/* Product preview list */}
              <div className="space-y-4 pr-1 border-b border-slate-100 pb-5">
                {itemsWithPrices.map((item) => {
                  const prices = item.prices;
                  return (
                    <div key={item.id} className="flex items-center justify-between gap-5 py-3 border-b border-slate-50 last:border-0">
                      <div className="h-32 w-32 bg-white rounded-2xl overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center p-1">
                        <img
                          alt={item.product.name}
                          src={item.selectedVariant.image || item.product.images[0]}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1 flex flex-col items-end text-right">
                        <h4 className="text-[13px] font-bold text-slate-900 line-clamp-2 leading-snug">{item.product.name}</h4>
                        <p className="text-[11px] text-slate-500 font-sans">
                          Color: <span className="font-semibold text-slate-700">{item.selectedVariant.color}</span>
                          {item.selectedVariant.storage && (
                            <>
                              {" "}
                              • Storage: <span className="font-semibold text-slate-700">{item.selectedVariant.storage}</span>
                            </>
                          )}
                        </p>
                        <div className="flex flex-col items-end pt-1 gap-1">
                          <span className="inline-flex items-center text-[10px] font-mono font-bold text-slate-500">
                            QTY: {item.quantity}
                          </span>
                          <div className="flex items-center justify-end gap-1.5 mt-0.5">
                            {prices.originalItemTotal ? (
                              <>
                                <span className="line-through text-slate-400 text-[11px] font-normal">{formatPKR(prices.originalItemTotal)}</span>
                                <span className="text-[15px] font-bold text-slate-900">{formatPKR(prices.itemTotal)}</span>
                              </>
                            ) : (
                              <span className="text-[15px] font-bold text-slate-900">{formatPKR(prices.itemTotal)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calculation list */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping fee</span>
                  <span className="font-bold text-slate-800">
                    {shippingFee === 0 ? <span className="text-emerald-600">Free</span> : formatPKR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Govt Tax (4%)</span>
                  <span className="font-bold text-slate-800">{tax === 0 ? "Rs 0" : formatPKR(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-4 text-sm">
                  <span className="font-bold text-slate-900">Total</span>
                  <div className="flex items-center gap-2">
                    {originalTotalSum ? (
                      <>
                        <span className="line-through text-slate-400 text-xs font-normal">{formatPKR(originalTotalSum + shippingFee + tax)}</span>
                        <span className="font-black text-slate-900 text-lg">{formatPKR(total)}</span>
                      </>
                    ) : (
                      <span className="font-black text-slate-900 text-lg">{formatPKR(total)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SECP Company Badge */}
            <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-900">SECP Registered Company</span>
              </div>
              <div className="font-ntype text-[11px] text-slate-500 leading-relaxed pl-7">
                <p className="font-bold text-slate-700">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED</p>
                <p className="mt-0.5">Registration CUIN: 0337422</p>
                <Link
                  href="/company-verification"
                  className="text-slate-600 underline font-semibold hover:text-black mt-2 inline-block transition-colors"
                >
                  View SECP Incorporation Certificate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {placedOrderId && (
        <TransactionProofModal
          isOpen={isProofModalOpen}
          onClose={() => {
            setIsProofModalOpen(false);
            router.push(`/order/confirmed/${placedOrderId}`);
          }}
          orderId={placedOrderId}
          onComplete={() => {
            setIsProofModalOpen(false);
            router.push(`/order/confirmed/${placedOrderId}`);
          }}
        />
      )}
    </div>
  );
}
