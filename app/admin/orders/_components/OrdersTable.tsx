"use client";

import * as React from "react";
import { 
  Eye, 
  FileText, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Order } from "@/hooks/useOrders";

interface OrdersTableProps {
  isLoading: boolean;
  orders: Order[];
  copiedOrderId: string | null;
  copyOrderId: (id: string) => void;
  onViewDetails: (order: Order) => void;
  onDownloadInvoice: (order: Order) => void;
}

export function OrdersTable({
  isLoading,
  orders,
  copiedOrderId,
  copyOrderId,
  onViewDetails,
  onDownloadInvoice,
}: OrdersTableProps) {
  // Helper: Format price in PKR
  const formatPKR = (num: number) => {
    return `Rs ${new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)}`;
  };

  // Get status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
      case "processing":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "shipped":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "delivered":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
      case "processing":
        return <Clock className="h-3 w-3 shrink-0" />;
      case "shipped":
        return <Truck className="h-3 w-3 shrink-0" />;
      case "delivered":
        return <CheckCircle className="h-3 w-3 shrink-0" />;
      case "cancelled":
        return <XCircle className="h-3 w-3 shrink-0" />;
      default:
        return <Clock className="h-3 w-3 shrink-0" />;
    }
  };

  return (
    <div className="bg-[#0A0A0B] border border-[#26262A] rounded-xl overflow-hidden shadow-2xl">
      {isLoading ? (
        <div className="p-20 text-center text-neutral-500 font-lattera text-xs animate-pulse tracking-wider">
          FETCHING ORDER TRANSACTIONS...
        </div>
      ) : orders.length === 0 ? (
        <div className="p-20 text-center text-neutral-500 font-lattera text-xs tracking-wider space-y-2">
          <AlertCircle className="h-8 w-8 mx-auto stroke-[1.5] text-neutral-600 mb-2" />
          <p>NO ORDERS REGISTRY MATCHING THE CRITERIA FOUND.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#26262A] bg-[#111]/30">
              <TableHead className="w-[200px] text-xs">ORDER ID</TableHead>
              <TableHead className="text-xs">CUSTOMER</TableHead>
              <TableHead className="text-xs">DATE</TableHead>
              <TableHead className="text-xs">PAYMENT</TableHead>
              <TableHead className="text-xs">ITEMS</TableHead>
              <TableHead className="text-xs text-right">TOTAL</TableHead>
              <TableHead className="text-xs text-center">STATUS</TableHead>
              <TableHead className="text-xs text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const totalItemsQty = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
              return (
                <TableRow key={order.id} className="hover:bg-white/2 cursor-default border-b border-[#26262A]">
                  {/* Order Reference ID */}
                  <TableCell className="font-lattera text-xs font-bold uppercase tracking-wider text-neutral-400">
                    <div className="flex items-center space-x-1.5 min-w-[130px]">
                      <span className="truncate">{order.id}</span>
                      <button
                        onClick={() => copyOrderId(order.id)}
                        className="p-1 hover:bg-white/10 rounded text-neutral-500 hover:text-white transition cursor-pointer"
                        title="Copy reference ID"
                      >
                        {copiedOrderId === order.id ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </TableCell>

                  {/* Customer Info */}
                  <TableCell className="font-ntype font-bold text-white">
                    <div>
                      <p>{order.fullName}</p>
                      <p className="font-lattera text-[10px] text-neutral-500 mt-0.5">{order.phoneNumber}</p>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="font-lattera text-[11px] text-neutral-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Payment Method */}
                  <TableCell className="font-lattera text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                    {order.paymentMethod === "bank_transfer" ? (
                      <span className="text-emerald-500">BANK</span>
                    ) : (
                      <span>COD</span>
                    )}
                  </TableCell>

                  {/* Items quantity */}
                  <TableCell className="font-lattera text-xs font-bold text-neutral-300">
                    {totalItemsQty} {totalItemsQty === 1 ? "item" : "items"}
                  </TableCell>

                  {/* Order Total */}
                  <TableCell className="font-lattera font-bold text-right text-white">
                    {formatPKR(order.total)}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="text-center">
                    <span className={cn(
                      "inline-flex items-center space-x-1.5 border px-2.5 py-1 rounded-full text-[9px] font-lattera font-bold uppercase tracking-wider",
                      getStatusBadge(order.status)
                    )}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </span>
                  </TableCell>

                  {/* Actions buttons */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onViewDetails(order)}
                        className="p-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#2E2E33] rounded-lg text-neutral-300 hover:text-white transition cursor-pointer"
                        title="View specifications details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDownloadInvoice(order)}
                        className="p-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#2E2E33] rounded-lg text-neutral-300 hover:text-white transition cursor-pointer"
                        title="Download PDF invoice"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
