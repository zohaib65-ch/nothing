"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProductService } from "@/services/productService";
import { Product, ProductVariant } from "@/types";
import { Loader } from "@/components/ui/loader";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Check, Copy, ShieldCheck, ArrowLeft, Info, HelpCircle } from "lucide-react";
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

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isSubmitPending, setIsSubmitPending] = React.useState<boolean>(false);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = React.useState<"bank_transfer" | "cod">("bank_transfer");

  // Clipboard copy states
  const [copiedAccount, setCopiedAccount] = React.useState(false);
  const [copiedIban, setCopiedIban] = React.useState(false);
  const [placedOrderId, setPlacedOrderId] = React.useState<string | null>(null);
  const [isProofModalOpen, setIsProofModalOpen] = React.useState<boolean>(false);

  // High-value check (> 8000)
  const isHighValue = selectedVariant ? (selectedVariant.salePrice || selectedVariant.price) > 8000 : false;

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

  React.useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;
      try {
        const all = await ProductService.fetchProductsFromApi();
        const item = all.find((p) => p.slug === slug) || null;
        setProduct(item);
        if (item && item.variants && item.variants.length > 0) {
          const variantParam = new URLSearchParams(window.location.search).get("variant");
          const found = item.variants.find((v) => v.id === variantParam);
          setSelectedVariant(found || item.variants[0]);
        }
      } catch {
        toast.error("Failed to load product details.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 py-24">
        <Container size="sm" className="text-center space-y-6">
          <Heading size="lg" className="font-lattera font-bold tracking-wider">PRODUCT NOT FOUND</Heading>
          <p className="text-sm text-slate-500">The product you wish to purchase does not exist or has been removed.</p>
          <Button variant="secondary" onClick={() => router.push("/shop-all")} leftIcon={<ArrowLeft className="h-4 w-4" />}>
            BACK TO CATALOG
          </Button>
        </Container>
      </div>
    );
  }

  // Calculations
  const itemPrice = selectedVariant.salePrice || selectedVariant.price;
  const subtotal = itemPrice;
  const shippingFee = paymentMethod === "cod" ? 400 : 0;
  const tax = paymentMethod === "cod" ? Math.round(0.04 * itemPrice) : 0;
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
        items: [
          {
            productId: product.id || product.slug,
            productName: product.name,
            variantId: selectedVariant.id,
            variantName: `${selectedVariant.color}${selectedVariant.storage ? ` / ${selectedVariant.storage}` : ""}`,
            price: itemPrice,
            quantity: 1,
            image: selectedVariant.image || product.images[0],
          }
        ],
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
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 pt-20">
      {/* Top Banner */}
      <div className="border-b border-slate-200/80 bg-white py-4 shadow-sm">
        <Container className="flex items-center justify-between font-ntype text-xs text-slate-500">
          <Link href={`/products/${product.slug}`} className="inline-flex items-center space-x-1.5 hover:text-black transition-colors font-medium">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {product.name}</span>
          </Link>
          <span className="font-lattera uppercase text-[10px] tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Checkout</span>
        </Container>
      </div>

      <Container className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Delivery Details & Payments */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* SECTION: Delivery details */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-slate-900">Delivery Details</h2>
                  <p className="text-xs text-slate-500 mt-1 font-ntype">Where should we deliver your Nothing order?</p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-xs font-semibold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Your full name"
                      {...register("fullName")}
                      className={`w-full rounded-[16px] border ${errors.fullName ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="address" className="text-xs font-semibold text-slate-700">Address *</label>
                    <textarea
                      id="address"
                      placeholder="House / street / area"
                      rows={3}
                      {...register("address")}
                      className={`w-full rounded-[16px] border ${errors.address ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition resize-none`}
                    />
                    {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                  </div>

                  {/* City & District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="city" className="text-xs font-semibold text-slate-700">City *</label>
                      <input
                        type="text"
                        id="city"
                        placeholder="City"
                        {...register("city")}
                        className={`w-full rounded-[16px] border ${errors.city ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
                      />
                      {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="district" className="text-xs font-semibold text-slate-700">District *</label>
                      <input
                        type="text"
                        id="district"
                        placeholder="District"
                        {...register("district")}
                        className={`w-full rounded-[16px] border ${errors.district ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
                      />
                      {errors.district && <p className="text-xs text-red-500">{errors.district.message}</p>}
                    </div>
                  </div>

                  {/* Postal Code & Phone number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="postalCode" className="text-xs font-semibold text-slate-700 font-ntype flex items-center justify-between">
                        <span>Postal Code</span>
                        <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        placeholder="Postal code"
                        {...register("postalCode")}
                        className="w-full rounded-[16px] border border-slate-200 px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-700">Phone Number *</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        placeholder="0300 - 0000000"
                        {...register("phoneNumber")}
                        className={`w-full rounded-[16px] border ${errors.phoneNumber ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
                      />
                      {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
                    </div>
                  </div>

                  {/* Secondary Phone Number (optional) */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone2" className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>Secondary Phone Number</span>
                      <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                    </label>
                    <input
                      type="text"
                      id="phone2"
                      placeholder="0300 - 0000000"
                      {...register("phone2")}
                      className="w-full rounded-[16px] border border-slate-200 px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Payment method */}
              <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 font-ntype">Payment method</h2>
                  <p className="text-xs text-slate-500 mt-1 font-ntype leading-relaxed">
                    COD orders: Rs 400 shipping fee + 4% Govt Tax. Bank transfer: free shipping and 0% Govt Tax.
                  </p>
                </div>

                {/* Warning Banner for High-value orders */}
                {isHighValue && (
                  <div className="bg-amber-50/40 border border-amber-200/80 rounded-[20px] p-5 text-amber-900 text-xs font-ntype leading-relaxed">
                    For the safety and accountability of high-value shipments, we highly recommend bank transfer pre-payment. Orders paid via Bank Transfer receive priority processing and express next-day delivery.
                  </div>
                )}

                <div className="space-y-4">
                  {/* Cash on Delivery option */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={cn(
                      "p-5 rounded-[20px] border transition-all duration-200 flex items-center justify-between cursor-pointer select-none",
                      paymentMethod === "cod"
                        ? "border-emerald-500 bg-emerald-50/15"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    )}
                  >
                    <div className="space-y-1">
                      <span className="font-lattera text-xs font-bold uppercase tracking-wider block text-slate-800">
                        CASH ON DELIVERY
                      </span>
                      <span className="font-ntype text-xs text-slate-500 block leading-relaxed">
                        COD orders = Rs 400 shipping fee + 4% Govt Tax.
                      </span>
                    </div>
                    <div className="shrink-0 ml-4">
                      {paymentMethod === "cod" ? (
                        <span className="font-lattera text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-600/10">
                          SELECTED
                        </span>
                      ) : (
                        <span className="font-lattera text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 bg-slate-50">
                          TAP
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bank Transfer option */}
                  <div
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={cn(
                      "p-5 rounded-[20px] border transition-all duration-200 space-y-5 cursor-pointer select-none",
                      paymentMethod === "bank_transfer"
                        ? "border-emerald-500 bg-emerald-50/15"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="font-lattera text-xs font-bold uppercase tracking-wider block text-slate-800">
                          BANK TRANSFER
                        </span>
                        <span className="font-ntype text-xs text-slate-500 block leading-relaxed">
                          Free shipping and 0% Govt Tax. For advance transfers, the 4% government tax is paid by us. Plus, get express next-day delivery.
                        </span>
                      </div>
                      <div className="shrink-0 ml-4 mt-0.5">
                        {paymentMethod === "bank_transfer" ? (
                          <span className="font-lattera text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-600/10">
                            SELECTED
                          </span>
                        ) : (
                          <span className="font-lattera text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 bg-slate-50">
                            TAP
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Nested Bank Details Subcard */}
                    {paymentMethod === "bank_transfer" && (
                      <div className="bg-emerald-50/20 border border-emerald-100/80 rounded-[20px] p-5 space-y-4 text-xs font-ntype text-slate-700 animate-in fade-in-20 duration-200" onClick={(e) => e.stopPropagation()}>
                        {/* Bank Title & Logo */}
                        <div className="flex items-center space-x-3 text-slate-800 pb-2 border-b border-emerald-100/60">
                          <div className="bg-emerald-100 text-emerald-800 rounded-lg p-2 shrink-0">
                            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-lattera text-[10px] font-bold text-emerald-700 tracking-wider uppercase">BANK DETAILS</p>
                            <p className="font-bold text-slate-900 mt-0.5">Bank Alfalah</p>
                          </div>
                        </div>

                        {/* Account Title Field */}
                        <div>
                          <p className="font-lattera text-[9px] text-slate-400 uppercase tracking-widest font-bold">ACCOUNT TITLE</p>
                          <p className="font-bold text-slate-800 mt-0.5 text-[13px]">NOTHING OFFICIAL</p>
                        </div>

                        {/* Account Number Copy Area */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-xl p-3 gap-2.5 shadow-sm">
                          <div className="min-w-0">
                            <p className="font-lattera text-[9px] text-slate-400 uppercase tracking-widest font-bold">ACCOUNT NUMBER</p>
                            <p className="font-lattera text-sm font-bold text-slate-800 mt-0.5 break-all">57065002935977</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText("57065002935977", "account");
                            }}
                            className="inline-flex items-center space-x-1.5 border border-slate-200 hover:border-black bg-slate-50 hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg text-slate-700 cursor-pointer self-end sm:self-center"
                          >
                            {copiedAccount ? (
                              <>
                                <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span className="text-emerald-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* IBAN Copy Area */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-xl p-3 gap-2.5 shadow-sm">
                          <div className="min-w-0">
                            <p className="font-lattera text-[9px] text-slate-400 uppercase tracking-widest font-bold">IBAN</p>
                            <p className="font-lattera text-xs sm:text-sm font-bold text-slate-800 mt-0.5 break-all">PK35ALFH5706005002935977</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText("PK35ALFH5706005002935977", "iban");
                            }}
                            className="inline-flex items-center space-x-1.5 border border-slate-200 hover:border-black bg-slate-50 hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg text-slate-700 cursor-pointer self-end sm:self-center"
                          >
                            {copiedIban ? (
                              <>
                                <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span className="text-emerald-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button & Estimates */}
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitPending}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-13 w-full rounded-[16px] transition duration-200 uppercase tracking-widest text-xs flex items-center justify-center cursor-pointer select-none active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitPending ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <span>Place Order</span>
                  )}
                </button>

                {/* Estimated Delivery Block */}
                <div className="bg-slate-100 rounded-[20px] p-5 flex items-start space-x-4 border border-slate-200/60">
                  <div className="bg-slate-200 rounded-full p-2 mt-0.5 text-slate-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Estimated delivery: {deliveryRangeString}</p>
                    <p className="text-[11px] text-slate-500 mt-1 font-ntype leading-relaxed">
                      Courier policy: 1–3 working days. Our practice: Same-day processing, next-day delivery.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary Card & SECP badge */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Summary Card */}
            <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900">Order Summary</h2>
                <p className="text-[11px] text-slate-500 mt-0.5">Please review your item before checking out.</p>
              </div>

              {/* Product preview info */}
              <div className="flex items-start space-x-4 pb-6 border-b border-slate-100">
                <div className="h-16 w-16 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shrink-0 flex items-center justify-center p-2">
                  <img
                    alt={product.name}
                    src={selectedVariant.image || product.images[0]}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{product.name}</h4>
                  <p className="text-[11px] text-slate-500 font-ntype">
                    Color: {selectedVariant.color}
                    {selectedVariant.storage && ` • Storage: ${selectedVariant.storage}`}
                  </p>
                  <p className="text-[10px] text-emerald-600 bg-emerald-50 inline-block px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Qty 1</p>
                </div>
              </div>

              {/* Dynamic Variant Selector */}
              {product.variants.length > 1 && (
                <div className="space-y-2 border-b border-slate-100 pb-5">
                  <label htmlFor="variant-selector" className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Selected Variant</label>
                  <select
                    id="variant-selector"
                    value={selectedVariant.id}
                    onChange={(e) => {
                      const match = product.variants.find((v) => v.id === e.target.value);
                      if (match) setSelectedVariant(match);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 bg-white text-xs text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200 transition cursor-pointer"
                  >
                    {product.variants.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.color} {v.storage ? `(${v.storage})` : ""} - {formatPKR(v.salePrice || v.price)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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
