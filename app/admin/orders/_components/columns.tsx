import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/hooks/useOrders";
import { cn } from "@/lib/utils";
import { 
  Eye, 
  FileText, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle 
} from "lucide-react";

// Format price helper
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
      return "bg-neutral-100 text-neutral-700 border-neutral-200";
    case "processing":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "shipped":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "delivered":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    default:
      return "bg-neutral-100 text-neutral-700 border-neutral-200";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const getColumns = (
  copiedOrderId: string | null,
  copyOrderId: (id: string) => void,
  onViewDetails: (order: Order) => void,
  onDownloadInvoice: (order: Order) => void,
  onUpdateStatus?: (orderId: string, status: string) => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "ORDER ID",
    cell: ({ row }) => {
      const order = row.original;
      const displayId = order.customId || order.id;
      return (
        <div className="flex items-center space-x-1.5 min-w-[130px] font-lattera text-xs font-bold uppercase tracking-wider text-neutral-500">
          <span className="truncate">{displayId}</span>
          <button
            onClick={() => copyOrderId(displayId)}
            className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-900 transition cursor-pointer"
            title="Copy reference ID"
          >
            {copiedOrderId === displayId ? (
              <Check className="h-3 w-3 text-emerald-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: "CUSTOMER",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="font-ntype font-bold text-neutral-900">
          <p>{order.fullName}</p>
          {order.email && <p className="font-lattera text-[10px] text-neutral-500 mt-0.5 truncate max-w-[180px]">{order.email}</p>}
          <p className="font-lattera text-[10px] text-neutral-500 mt-0.5">{order.phoneNumber}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "DATE",
    cell: ({ row }) => (
      <span className="font-lattera text-[11px] text-neutral-500">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "PAYMENT",
    cell: ({ row }) => (
      <span className="font-lattera text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
        {row.original.paymentMethod === "bank_transfer" ? (
          <span className="text-emerald-600">BANK</span>
        ) : (
          <span>COD</span>
        )}
      </span>
    ),
  },
  {
    id: "itemsCount",
    header: "ITEMS",
    cell: ({ row }) => {
      const totalItemsQty = row.original.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      return (
        <span className="font-lattera text-xs font-bold text-neutral-600">
          {totalItemsQty} {totalItemsQty === 1 ? "item" : "items"}
        </span>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">TOTAL</div>,
    cell: ({ row }) => {
      const order = row.original;
      const discount = order.discount || 0;
      return (
        <div className="font-lattera font-bold text-right text-neutral-900">
          {discount > 0 ? (
            <div>
              <p className="text-xs text-neutral-900 font-bold">{formatPKR(order.total)}</p>
              <span className="inline-block text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded font-mono">
                -{formatPKR(discount)} OFF
              </span>
            </div>
          ) : (
            formatPKR(order.total)
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">STATUS</div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex justify-center">
          <Select
            value={order.status}
            onValueChange={(newStatus) => {
              if (onUpdateStatus) {
                onUpdateStatus(order._id || order.id, newStatus);
              }
            }}
          >
            <SelectTrigger
              className={cn(
                "h-7 text-[9px] font-lattera font-bold uppercase tracking-wider rounded-full border px-2.5 shadow-none focus:ring-0 cursor-pointer",
                getStatusBadge(order.status)
              )}
            >
              <div className="flex items-center space-x-1.5">
                {getStatusIcon(order.status)}
                <SelectValue placeholder={order.status} />
              </div>
            </SelectTrigger>
            <SelectContent className="text-[10px] font-lattera font-bold uppercase tracking-wider min-w-[130px]">
              <SelectItem value="pending">PENDING</SelectItem>
              <SelectItem value="processing">PROCESSING</SelectItem>
              <SelectItem value="shipped">SHIPPED</SelectItem>
              <SelectItem value="delivered">DELIVERED</SelectItem>
              <SelectItem value="cancelled">CANCELLED</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">ACTIONS</div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => onViewDetails(order)}
            className="p-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
            title="View specifications details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDownloadInvoice(order)}
            className="p-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
            title="Download PDF invoice"
          >
            <FileText className="h-4 w-4" />
          </button>
        </div>
      );
    },
  },
];
