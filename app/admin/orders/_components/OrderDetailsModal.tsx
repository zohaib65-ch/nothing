"use client";

import * as React from "react";
import { FileText, Receipt } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/hooks/useOrders";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (orderId: string, status: string) => void;
  onDownloadInvoice: (order: Order) => void;
}

export function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  onDownloadInvoice,
}: OrderDetailsModalProps) {
  if (!order) return null;

  // Helper: Format price in PKR
  const formatPKR = (num: number) => {
    return `Rs ${new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#0A0A0B] border-[#26262A] text-white rounded-[28px] p-6 shadow-2xl overflow-y-auto no-scrollbar max-h-[90vh]">
        <DialogHeader className="border-b border-[#26262A] pb-4">
          <DialogTitle className="font-mono text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D71921]" />
            ORDER INVOICE ANALYSIS
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-400 font-sans mt-0.5">
            Reference: {order.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Delivery address & specs grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#141416]/50 p-5 rounded-2xl border border-[#26262A]">
            <div>
              <p className="font-lattera text-[9px] text-neutral-500 uppercase tracking-widest font-bold">RECIPIENT CLIENT</p>
              <p className="font-bold text-white text-sm mt-1">{order.fullName}</p>
              <p className="font-lattera text-[11px] text-neutral-400 mt-0.5">{order.phoneNumber}</p>
              {order.phone2 && (
                <p className="font-lattera text-[11px] text-neutral-500">Secondary: {order.phone2}</p>
              )}
            </div>
            <div>
              <p className="font-lattera text-[9px] text-neutral-500 uppercase tracking-widest font-bold">SHIPPING ADDRESS</p>
              <p className="font-bold text-neutral-200 mt-1 leading-relaxed">
                {order.address}, {order.city}, {order.district}
                {order.postalCode && ` (${order.postalCode})`}
              </p>
            </div>
            <div>
              <p className="font-lattera text-[9px] text-neutral-500 uppercase tracking-widest font-bold">PAYMENT SETTLEMENT</p>
              <p className="font-bold mt-1 text-white uppercase font-lattera text-[11px] tracking-wider">
                {order.paymentMethod === "bank_transfer" ? (
                  <span className="text-emerald-500">BANK TRANSFER</span>
                ) : (
                  <span>CASH ON DELIVERY (COD)</span>
                )}
              </p>
            </div>
            <div>
              <p className="font-lattera text-[9px] text-neutral-500 uppercase tracking-widest font-bold">ORDER STATUS CONFIG</p>
              <div className="mt-1 flex items-center space-x-2">
                <Select
                  value={order.status}
                  onValueChange={(val) => onUpdateStatus(order.id, val)}
                >
                  <SelectTrigger className="w-[160px] h-8 text-[10px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="w-[160px]">
                    <SelectItem value="pending">PENDING</SelectItem>
                    <SelectItem value="processing">PROCESSING</SelectItem>
                    <SelectItem value="shipped">SHIPPED</SelectItem>
                    <SelectItem value="delivered">DELIVERED</SelectItem>
                    <SelectItem value="cancelled">CANCELLED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Transaction Proof Section (Only for Bank Transfer) */}
          {order.paymentMethod === "bank_transfer" && (
            <div className="bg-[#141416]/50 p-5 rounded-2xl border border-[#26262A] space-y-3">
              <p className="font-lattera text-[9px] text-neutral-500 uppercase tracking-widest font-bold">TRANSACTION PROOF</p>
              <div>
                {order.receiptImage ? (
                  <div className="space-y-2">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Submitted Receipt screenshot</p>
                    <div className="flex items-start space-x-4">
                      <a
                        href={order.receiptImage}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block relative group overflow-hidden border border-[#26262A] rounded-xl bg-[#111] p-1.5 cursor-pointer"
                        title="Click to view full screen receipt snapshot"
                      >
                        <img
                          src={order.receiptImage}
                          alt="Uploaded Bank Receipt screenshot"
                          className="h-28 w-20 object-contain rounded-lg group-hover:scale-105 transition duration-200"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                          <span className="text-[9px] font-bold text-white uppercase tracking-wider">View Full</span>
                        </div>
                      </a>
                      <div className="space-y-1 mt-1 font-ntype">
                        <p className="text-xs text-neutral-300 font-bold">Bank Transfer Invoice Receipt</p>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Submitted
                        </p>
                        <a
                          href={order.receiptImage}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 text-[10px] text-neutral-400 hover:text-white underline mt-2"
                        >
                          <Receipt className="h-3.5 w-3.5" />
                          <span>Open in New Tab</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Receipt screenshot</p>
                    <p className="text-xs text-neutral-500 italic mt-1">No payment receipt snapshot uploaded yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Placed Items details table */}
          <div className="space-y-3">
            <p className="font-lattera text-[9px] text-neutral-500 uppercase tracking-widest font-bold">PURCHASE SPECIFICATIONS</p>
            <div className="border border-[#26262A] rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#26262A] bg-[#111]/30">
                    <TableHead className="text-neutral-500 text-[10px]">PRODUCT SPEC</TableHead>
                    <TableHead className="text-neutral-500 text-[10px] text-right">UNIT PRICE</TableHead>
                    <TableHead className="text-neutral-500 text-[10px] text-center">QTY</TableHead>
                    <TableHead className="text-neutral-500 text-[10px] text-right">TOTAL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, idx) => (
                    <TableRow key={idx} className="border-b border-[#26262A]/50 last:border-0 hover:bg-transparent">
                      <TableCell>
                        <div>
                          <p className="font-bold text-white text-[12px]">{item.productName}</p>
                          <p className="font-lattera text-[9px] text-neutral-500 uppercase mt-0.5">{item.variantName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-lattera text-[11px] text-right">{formatPKR(item.price)}</TableCell>
                      <TableCell className="font-lattera text-[11px] text-center">{item.quantity}</TableCell>
                      <TableCell className="font-lattera text-[11px] text-right font-bold text-white">{formatPKR(item.price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Calculations summaries breakdown */}
          <div className="border-t border-[#26262A] pt-4 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs leading-relaxed text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-white">{formatPKR(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping charge:</span>
                <span className="font-bold text-white">
                  {order.shippingFee === 0 ? <span className="text-emerald-500 font-bold uppercase">Free</span> : formatPKR(order.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Govt Tax (4%):</span>
                <span className="font-bold text-white">{formatPKR(order.tax)}</span>
              </div>
              <div className="flex justify-between border-t border-[#26262A] pt-2.5 text-sm">
                <span className="font-bold text-white">Grand Total:</span>
                <span className="font-black text-white text-base">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Modal actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-[#26262A]">
            <Button
              variant="secondary"
              onClick={onClose}
              className="font-lattera text-xs font-bold uppercase tracking-wider h-10 cursor-pointer"
            >
              CLOSE
            </Button>
            <Button
              onClick={() => onDownloadInvoice(order)}
              leftIcon={<FileText className="h-4 w-4" />}
              className="bg-[#D71921] hover:bg-[#B51219] text-white font-lattera text-xs font-bold uppercase tracking-wider h-10 shadow-lg shadow-[#D71921]/15 cursor-pointer"
            >
              DOWNLOAD INVOICE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
