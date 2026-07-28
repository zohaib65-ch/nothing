"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/useCartStore";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { SharedCheckoutForm } from "@/components/features/checkout/checkout-form";
import { cn } from "@/lib/utils";
import { TransactionProofModal } from "@/components/features/checkout/transaction-proof-modal";
import { toast } from "sonner";

// Form validation schema with Zod
const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Delivery address is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  postalCode: z.string().optional(),
  phoneNumber: z.string()
    .min(1, "Phone number is required")
    .refine((val) => /^(03\d{9}|\+923\d{9})$/.test(val.replace(/\s+/g, "")), {
      message: "Enter a valid Pakistani mobile number (e.g., 03001234567)"
    }),
  phone2: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CartCheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart, _hasHydrated } = useCartStore();
  const [hasMounted, setHasMounted] = React.useState(false);

  const [isSubmitPending, setIsSubmitPending] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const isCartReady = hasMounted && _hasHydrated;

  // Payment method state
  const [paymentMethod, setPaymentMethod] = React.useState<"bank_transfer" | "cod">("bank_transfer");

  // Clipboard copy states
  const [copiedAccount, setCopiedAccount] = React.useState(false);
  const [copiedIban, setCopiedIban] = React.useState(false);
  const [placedOrderId, setPlacedOrderId] = React.useState<string | null>(null);
  const [isProofModalOpen, setIsProofModalOpen] = React.useState<boolean>(false);

  // High-value check (> 8000)
  const isHighValue = getTotalPrice() > 8000;

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      district: "",
      postalCode: "",
      phoneNumber: "",
      phone2: "",
    },
  });

  // Redirect if cart is empty ONLY AFTER hydration is ready!
  React.useEffect(() => {
    if (isCartReady && items.length === 0 && !isSubmitPending) {
      router.push("/cart");
    }
  }, [isCartReady, items, router, isSubmitPending]);

  // Copy helpers
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
    } catch (err) {
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24">
        <div className="font-ntype text-sm animate-pulse text-slate-500">REDIRECTING TO BAG...</div>
      </div>
    );
  }

  // Calculations
  const subtotal = getTotalPrice();
  const shippingFee = paymentMethod === "cod" ? 400 : 0;
  const tax = paymentMethod === "cod" ? Math.round(0.04 * subtotal) : 0;
  const total = subtotal + shippingFee + tax;

  // Estimated delivery dates
  const today = new Date();
  const formatShortDate = (d: Date) => {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  const estStart = new Date(today);
  const estEnd = new Date(today);
  estEnd.setDate(today.getDate() + 2);
  const deliveryRangeString = `${formatShortDate(estStart)} - ${formatShortDate(estEnd)}`;

  // Form submission handler
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitPending(true);
    try {
      const orderPayload = {
        ...data,
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
    } catch (err) {
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
              errors={errors}
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
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1 border-b border-slate-100 pb-5">
                {items.map((item) => {
                  const itemPrice = item.selectedVariant.salePrice || item.selectedVariant.price;
                  return (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="h-14 w-14 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shrink-0 flex items-center justify-center p-2">
                        <img
                          alt={item.product.name}
                          src={item.selectedVariant.image || item.product.images[0]}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-slate-400 font-ntype">
                          Color: {item.selectedVariant.color}
                          {item.selectedVariant.storage && ` • Storage: ${item.selectedVariant.storage}`}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">Qty {item.quantity}</span>
                          <span className="text-xs font-bold text-slate-700">{formatPKR(itemPrice * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calculation list */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-800">{formatPKR(subtotal)}</span>
                </div>
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
                  <span className="font-black text-slate-900 text-lg">{formatPKR(total)}</span>
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
                <Link href="/company-verification" className="text-slate-600 underline font-semibold hover:text-black mt-2 inline-block transition-colors">
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
