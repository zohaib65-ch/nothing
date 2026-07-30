"use client";

import * as React from "react";
import { Receipt, MessageSquare, MapPin, User, CreditCard, ShoppingBag, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Order } from "@/hooks/useOrders";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus?: (orderId: string, status: string) => void;
}

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!order) return null;

  // Helper: Open data URL / receipt image in new tab
  const openImageInNewTab = (url: string) => {
    if (url.startsWith("data:")) {
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Receipt Snapshot</title>
              <style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#09090b;}</style>
            </head>
            <body><img src="${url}" style="max-width:90%;max-height:90vh;object-fit:contain;border-radius:12px;" /></body>
          </html>
        `);
        newWindow.document.close();
      }
    } else {
      window.open(url, "_blank");
    }
  };

  // Helper: Format price in PKR
  const formatPKR = (num: number) => {
    return `Rs ${new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)}`;
  };

  const displayId = order.customId || order.id;

  // Format WhatsApp Link
  const rawPhone = (order.phoneNumber || "").replace(/[^0-9]/g, "");
  const formattedPhone = rawPhone.startsWith("0") ? "92" + rawPhone.slice(1) : rawPhone;
  const itemsList = (order.items || [])
    .map((item) => `- ${item.productName}${item.variantName ? ` (${item.variantName})` : ""} x${item.quantity}`)
    .join("\n");
  const totalFormatted = formatPKR(order.total);
  const rawMsg = `Hello ${order.fullName}!\n\nYour Nothing order (${displayId}) has been confirmed.\nOrder Details:\n${itemsList}\nTotal Amount: ${totalFormatted}\nPayment Method: ${order.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Cash on Delivery"}\n\nThank you for shopping with Nothing Official!`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(rawMsg)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[88vh] font-sans">
        {/* Header */}
        <DialogHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D71921]" />
            <DialogTitle className="text-base font-bold uppercase tracking-wider text-slate-900 font-sans">Order Invoice Details</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500 font-sans mt-0.5">
            Reference: <span className="font-semibold text-slate-800">{displayId}</span> • {new Date(order.createdAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-5 font-sans">
          {/* Recipient & Address Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details Card */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-slate-400">
                <User className="h-4 w-4 text-slate-600" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans">Customer</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{order.fullName}</p>
                <p className="text-xs text-slate-600 mt-0.5">{order.phoneNumber}</p>
                {order.phone2 && <p className="text-[11px] text-slate-500 mt-0.5">Secondary: {order.phone2}</p>}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl transition duration-150 shadow-sm cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5 fill-white" />
                <span>Contact Customer</span>
              </a>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-slate-400">
                <MapPin className="h-4 w-4 text-slate-600" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans">Shipping Address</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                {order.address}, {order.city}, {order.district}
                {order.postalCode && <span className="text-slate-500 font-normal"> ({order.postalCode})</span>}
              </p>
            </div>
          </div>

          {/* Payment Details Card */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shrink-0 text-slate-700">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Payment Method</p>
                <p className="font-bold text-xs text-slate-900 uppercase mt-0.5">
                  {order.paymentMethod === "bank_transfer" ? (
                    <span className="text-emerald-600 font-bold">Direct Bank Transfer</span>
                  ) : (
                    <span>Cash on Delivery (COD)</span>
                  )}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Order Status</p>
              <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-200 text-slate-800">
                {order.status}
              </span>
            </div>
          </div>

          {/* Bank Transfer Receipt Screenshot (If exists) */}
          {order.paymentMethod === "bank_transfer" && (
            <div className="bg-emerald-50/40 border border-emerald-100 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Receipt className="h-4 w-4 text-emerald-600" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">Payment Receipt Proof</span>
                </div>
                {order.receiptImage && (
                  <button
                    type="button"
                    onClick={() => openImageInNewTab(order.receiptImage!)}
                    className="text-[11px] text-emerald-700 font-bold flex items-center space-x-1 hover:underline cursor-pointer"
                  >
                    <span>View Image</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>

              {order.receiptImage ? (
                <div className="flex items-center space-x-4 bg-white p-2.5 rounded-xl border border-emerald-100">
                  <img
                    src={order.receiptImage}
                    alt="Receipt Screenshot"
                    className="h-16 w-16 object-cover rounded-lg border border-slate-200 cursor-pointer"
                    onClick={() => openImageInNewTab(order.receiptImage!)}
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Submitted Transaction Snapshot</p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Verified Receipt Attached</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No receipt image uploaded by customer yet.</p>
              )}
            </div>
          )}

          {/* Purchased Items Table */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-400 mb-1">
              <ShoppingBag className="h-4 w-4 text-slate-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Order Items</span>
            </div>
            <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 bg-slate-50">
                    <TableHead className="text-slate-500 text-[10px] font-bold">ITEM & VARIANT</TableHead>
                    <TableHead className="text-slate-500 text-[10px] font-bold text-right">UNIT PRICE</TableHead>
                    <TableHead className="text-slate-500 text-[10px] font-bold text-center">QTY</TableHead>
                    <TableHead className="text-slate-500 text-[10px] font-bold text-right">TOTAL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, idx) => (
                    <TableRow key={idx} className="border-b border-slate-100 last:border-0 hover:bg-transparent">
                      <TableCell className="py-3">
                        <div className="flex items-center space-x-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="h-9 w-9 object-contain bg-white border border-slate-100 rounded-lg shrink-0 p-1"
                            />
                          )}
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{item.productName}</p>
                            <p className="text-[10px] text-slate-500 uppercase mt-0.5">{item.variantName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-right text-slate-600">{formatPKR(item.price)}</TableCell>
                      <TableCell className="text-xs text-center font-bold text-slate-800">{item.quantity}</TableCell>
                      <TableCell className="text-xs text-right font-bold text-slate-900">{formatPKR(item.price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">{formatPKR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping Fee</span>
              <span className="font-semibold text-slate-900">
                {order.shippingFee === 0 ? <span className="text-emerald-600 font-bold uppercase">Free</span> : formatPKR(order.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Govt Tax (4%)</span>
              <span className="font-semibold text-slate-900">{formatPKR(order.tax)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2.5 text-sm text-slate-900">
              <span className="font-bold">Grand Total</span>
              <span className="font-bold text-base text-slate-900">{formatPKR(order.total)}</span>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-wider h-10 cursor-pointer rounded-xl px-6 bg-slate-100 hover:bg-slate-200 text-slate-800"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
