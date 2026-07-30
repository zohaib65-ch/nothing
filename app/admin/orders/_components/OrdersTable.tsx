"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { Order } from "@/hooks/useOrders";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "./columns";

interface OrdersTableProps {
  isLoading: boolean;
  orders: Order[];
  copiedOrderId: string | null;
  copyOrderId: (id: string) => void;
  onViewDetails: (order: Order) => void;
  onDownloadInvoice: (order: Order) => void;
  onUpdateStatus?: (orderId: string, status: string) => void;
}

export function OrdersTable({
  isLoading,
  orders,
  copiedOrderId,
  copyOrderId,
  onViewDetails,
  onDownloadInvoice,
  onUpdateStatus,
}: OrdersTableProps) {
  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => getColumns(copiedOrderId, copyOrderId, onViewDetails, onDownloadInvoice, onUpdateStatus),
    [copiedOrderId, copyOrderId, onViewDetails, onDownloadInvoice, onUpdateStatus]
  );

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
      {isLoading ? (
        <div className="p-20 text-center text-neutral-500 font-lattera text-xs animate-pulse tracking-wider">
          FETCHING ORDER TRANSACTIONS...
        </div>
      ) : orders.length === 0 ? (
        <div className="p-20 text-center text-neutral-500 font-lattera text-xs tracking-wider space-y-2">
          <AlertCircle className="h-8 w-8 mx-auto stroke-[1.5] text-neutral-400 mb-2" />
          <p>NO ORDERS REGISTRY MATCHING THE CRITERIA FOUND.</p>
        </div>
      ) : (
        <DataTable columns={columns} data={orders} showPagination={true} pageSize={10} />
      )}
    </div>
  );
}
