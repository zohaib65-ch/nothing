"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product, ProductVariant } from "@/types";
import { Loader } from "@/components/ui/loader";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { SharedCheckoutForm } from "@/components/features/checkout/checkout-form";
import { TransactionProofModal } from "@/components/features/checkout/transaction-proof-modal";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isSubmitPending, setIsSubmitPending] = React.useState<boolean>(false);

  // Fulfillment & Payment method states
  const [fulfillmentMethod, setFulfillmentMethod] = React.useState<"ship" | "pickup">("ship");
  const [paymentMethod, setPaymentMethod] = React.useState<"bank_transfer" | "cod" | "pay_at_store">("bank_transfer");

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
    const loadProduct = async () => {
      if (!slug) return;
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const item = await res.json();
          setProduct(item);
          if (item && item.variants && item.variants.length > 0) {
            const variantParam = new URLSearchParams(window.location.search).get("variant");
            const found = item.variants.find((v: any) => v.id === variantParam);
            setSelectedVariant(found || item.variants[0]);
          }
        } else {
          setProduct(null);
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
    } catch {
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
          <Heading size="lg" className="font-ntype font-bold tracking-wider">
            PRODUCT NOT FOUND
          </Heading>
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
  const shippingFee = fulfillmentMethod === "pickup" ? 0 : paymentMethod === "cod" ? 400 : 0;
  const tax = fulfillmentMethod === "pickup" ? 0 : paymentMethod === "cod" ? Math.round(0.04 * itemPrice) : 0;
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
        items: [
          {
            productId: product.id || product.slug,
            productName: product.name,
            variantId: selectedVariant.id,
            variantName: `${selectedVariant.color}${selectedVariant.storage ? ` / ${selectedVariant.storage}` : ""}`,
            price: itemPrice,
            quantity: 1,
            image: selectedVariant.image || product.images[0],
          },
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
          <Link href={`/products/${product.slug}`} className="inline-flex items-center space-x-1.5 hover:text-black transition-colors font-medium">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {product.name}</span>
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
                <p className="text-[11px] text-slate-500 mt-0.5">Please review your item before checking out.</p>
              </div>

              {/* Product preview info */}
              <div className="flex items-start space-x-4 pb-6 border-b border-slate-100">
                <div className="h-16 w-16 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shrink-0 flex items-center justify-center p-2">
                  <img alt={product.name} src={selectedVariant.image || product.images[0]} className="h-full w-full object-contain" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{product.name}</h4>
                  <p className="text-[11px] text-slate-500 font-ntype">
                    Color: {selectedVariant.color}
                    {selectedVariant.storage && ` • Storage: ${selectedVariant.storage}`}
                  </p>
                  <p className="text-[10px] text-emerald-600 bg-emerald-50 inline-block px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Qty 1
                  </p>
                </div>
              </div>

              {/* Dynamic Variant Selector */}
              {product.variants.length > 1 && (
                <div className="space-y-2 border-b border-slate-100 pb-5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Selected Variant</label>
                  <Select
                    value={selectedVariant.id}
                    onValueChange={(val) => {
                      const match = product.variants.find((v) => v.id === val);
                      if (match) setSelectedVariant(match);
                    }}
                  >
                    <SelectTrigger className="w-full h-11 rounded-[16px] border border-slate-200 px-4 bg-white text-xs font-normal normal-case tracking-normal text-slate-900 focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition cursor-pointer font-ntype">
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[16px] border-slate-200 bg-white shadow-lg">
                      {product.variants.map((v) => (
                        <SelectItem
                          key={v.id}
                          value={v.id}
                          className="font-ntype normal-case tracking-normal text-xs text-slate-700 focus:bg-slate-50 focus:text-slate-900 cursor-pointer py-2.5 rounded-[12px] my-0.5 mx-1"
                        >
                          {v.color} {v.storage ? `(${v.storage})` : ""} - {formatPKR(v.salePrice || v.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Calculation list */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-800">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fulfillment</span>
                  <span className="font-bold text-slate-800">
                    {fulfillmentMethod === "pickup" ? <span className="text-emerald-600 font-bold">Store Pickup (Free)</span> : "Door Delivery"}
                  </span>
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
