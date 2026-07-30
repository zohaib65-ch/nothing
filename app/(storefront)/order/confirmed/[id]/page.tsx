"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Order } from "@/types";
import { Loader } from "@/components/ui/loader";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { CheckCircle2, MessageSquare, ShoppingBag, ShieldCheck, FileText, ArrowRight, Info, Copy, Check } from "lucide-react";

export default function OrderConfirmedPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [order, setOrder] = React.useState<Order | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [copiedOrderId, setCopiedOrderId] = React.useState(false);

  React.useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        }
      } catch (err) {
        console.error("Failed to fetch order details", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleCopyOrderId = async () => {
    if (!order) return;
    const copyText = order.customId || order.id;
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 py-24">
        <Container size="sm" className="text-center space-y-6">
          <Heading size="lg" className="font-mono font-bold tracking-wider">
            ORDER NOT FOUND
          </Heading>
          <p className="text-sm text-slate-500">We couldn't retrieve details for this order ID. It may still be processing.</p>
          <Button variant="secondary" onClick={() => router.push("/shop-all")} leftIcon={<ShoppingBag className="h-4 w-4" />}>
            CONTINUE SHOPPING
          </Button>
        </Container>
      </div>
    );
  }

  const formatPKR = (amount: number) => {
    return `Rs ${new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)}`;
  };

  // WhatsApp link generator
  const cleanPhone = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  const itemsText = order.items ? order.items.map((item) => `- ${item.productName} (${item.variantName}) x${item.quantity}`).join("\n") : "";
  const whatsappMsg = `Hello Nothing Pakistan! I have just placed an order.
Order ID: ${order.customId || order.id}
Items:
${itemsText}
Customer: ${order.fullName}
Address: ${order.address}, ${order.city}
Total Amount: ${formatPKR(order.total)}
Payment Method: ${order.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Cash on Delivery"}

Please confirm my order. Thank you!`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 pt-20">
      <Container size="md">
        <div className="space-y-8 max-w-2xl mx-auto">
          {/* Top success card */}
          <div className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-sm text-center space-y-5">
            <div className="flex justify-center">
              <div className="bg-emerald-50 text-emerald-600 rounded-full p-4 animate-bounce">
                <CheckCircle2 className="h-12 w-12" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Order Placed Successfully!</h1>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Thank you for your order. We have received your delivery details and will process your order shortly.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex sm:flex-row flex-col items-center justify-between max-w-sm mx-auto">
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Order Reference ID</p>
                <p className="font-lattera text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">{order.customId || order.id}</p>
              </div>
              <button
                onClick={handleCopyOrderId}
                className="inline-flex items-center space-x-1 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg text-slate-700 transition cursor-pointer"
              >
                {copiedOrderId ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action: Verify & Confirm Order via WhatsApp */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-[28px] p-6 shadow-sm space-y-4 text-center">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-800 flex items-center justify-center space-x-1.5">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <span>Instant Confirmation via WhatsApp</span>
              </h3>
              <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
                Send your order reference to our WhatsApp helpline to get instant delivery confirmations and live tracking updates.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-6 rounded-2xl transition-all shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-lg w-full sm:w-auto text-xs uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare className="h-4 w-4 fill-white" />
              <span>Confirm Order on WhatsApp</span>
            </a>
          </div>

          {/* Bank Transfer Warning Details */}
          {order.paymentMethod === "bank_transfer" && (
            <div className="bg-amber-50/50 border border-amber-100 rounded-[28px] p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-amber-800 flex items-center space-x-1.5">
                <Info className="h-4 w-4" />
                <span>Action Required: Complete Bank Transfer</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-ntype pl-5">
                Please transfer the total amount of <span className="font-bold text-slate-900">{formatPKR(order.total)}</span> to our bank account.
                Once completed, kindly share a screenshot of the receipt on WhatsApp along with your Order ID{" "}
                <span className="font-lattera font-bold text-slate-955">{order.customId || order.id}</span> so we can dispatch your parcel
                immediately.
              </p>
              <div className="pl-5 pt-1 space-y-1 text-[11px] text-slate-500">
                <p>
                  • Bank: <span className="font-semibold text-slate-700">Bank Alfalah</span>
                </p>
                <p>
                  • Account Title: <span className="font-semibold text-slate-700">NOTHING OFFICIAL</span>
                </p>
                <p>
                  • Account Number: <span className="font-semibold text-slate-700">57065002935977</span>
                </p>
                <p>
                  • IBAN: <span className="font-semibold text-slate-700">PK35ALFH5706005002935977</span>
                </p>
              </div>
            </div>
          )}

          {/* Order Details & Summary cards */}
          <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Delivery details summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Recipient Name</p>
                <p className="font-bold text-slate-800 mt-0.5">{order.fullName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Email Address</p>
                <p className="font-bold text-slate-800 mt-0.5">{order.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Phone Number</p>
                <p className="font-bold text-slate-800 mt-0.5">{order.phoneNumber}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Shipping Address</p>
                <p className="font-medium text-slate-800 mt-0.5">
                  {order.address}, {order.city}, {order.district} {order.postalCode && `(${order.postalCode})`}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Payment Method</p>
                <p className="font-bold text-slate-800 mt-0.5">{order.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Cash on Delivery"}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Delivery Status</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-full bg-blue-50 text-blue-600">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Calculations breakdown */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h4 className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Order breakdown</h4>
              {order.items &&
                order.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs pb-3 border-b border-slate-100">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-800">{item.productName}</p>
                      <p className="text-[10px] text-slate-500">
                        {item.variantName} x{item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-slate-800">{formatPKR(item.price * item.quantity)}</span>
                  </div>
                ))}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-800">{formatPKR(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-bold text-slate-800">
                    {order.shippingFee === 0 ? <span className="text-emerald-600">Free</span> : formatPKR(order.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Govt Tax</span>
                  <span className="font-bold text-slate-800">{formatPKR(order.tax)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3 text-sm">
                  <span className="font-bold text-slate-900">Total Charged</span>
                  <span className="font-black text-slate-900">{formatPKR(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECP Verification badge info */}
          <div className="bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm text-center">
            <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-800">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
              <span>SECP Registered Company</span>
            </div>
            <p className="text-[10px] text-slate-400 font-ntype mt-1">NOTHING OFFICIAL (SMC-PRIVATE) LIMITED • CUIN 0337422</p>
          </div>

          {/* Back button */}
          <div className="text-center">
            <Link
              href="/shop-all"
              className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-black transition-colors"
            >
              <span>Continue Catalog Shopping</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
