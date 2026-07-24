"use client";

import * as React from "react";
import { Download, ShoppingBag, Clock, CheckCircle2, CreditCard } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useOrders, Order } from "@/hooks/useOrders";
import { OrdersFilter } from "./_components/OrdersFilter";
import { OrdersTable } from "./_components/OrdersTable";
import { OrderDetailsModal } from "./_components/OrderDetailsModal";
import { cn } from "@/lib/utils";

export default function AdminOrdersPage() {
  const {
    orders,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    copiedOrderId,
    copyOrderId,
    filteredOrders,
    refetch,
    updateStatus,
    generateInvoicePDF,
    generateReportPDF,
  } = useOrders();

  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState<boolean>(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const updated = await updateStatus(orderId, status);
    if (updated && selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: updated.status } : null));
    }
  };

  // Helper: Format price in PKR
  const formatPKR = (num: number) => {
    return `Rs ${new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)}`;
  };

  // Dynamic Summary Metrics config
  const metrics = [
    {
      title: "TOTAL REGISTERED",
      value: orders.length,
      subtext: "ALL TIME TRANSACTIONS",
      icon: <ShoppingBag className="h-4.5 w-4.5 text-[#D71921]" />,
    },
    {
      title: "PENDING ORDERS",
      value: orders.filter((o) => o.status === "pending" || o.status === "processing").length,
      subtext: "AWAITING PROCESSING",
      icon: <Clock className="h-4.5 w-4.5 text-amber-500" />,
      subtextColor: "text-amber-600 font-bold",
    },
    {
      title: "DELIVERED STATUS",
      value: orders.filter((o) => o.status === "delivered").length,
      subtext: "SUCCESSFULLY DISPATCHED",
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />,
      subtextColor: "text-emerald-600 font-bold",
    },
    {
      title: "TOTAL REVENUE",
      value: formatPKR(orders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total, 0)),
      subtext: "SETTLED INVOICES VALUE",
      icon: <CreditCard className="h-4.5 w-4.5 text-blue-500" />,
      subtextColor: "text-blue-600 font-bold",
    },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-neutral-900">ORDERS REGISTRY</h2>
          <p className="font-lattera text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Displaying placed client checkout transactions and invoice records.</p>
        </div>
        <div className="flex sm:flex-row flex-col items-center gap-3">
          <Button variant="secondary" onClick={refetch} className="font-lattera text-xs sm:w-auto w-full font-bold uppercase tracking-wider h-10 shrink-0 cursor-pointer">
            REFRESH
          </Button>
          <Button
            onClick={generateReportPDF}
            disabled={filteredOrders.length === 0}
            leftIcon={<Download className="h-4 w-4" />}
            className="bg-[#D71921] hover:bg-[#B51219] text-white font-lattera sm:w-auto w-full text-xs font-bold uppercase tracking-wider h-10 shadow-lg shadow-[#D71921]/15 cursor-pointer disabled:opacity-50"
          >
            DOWNLOAD REPORT (PDF)
          </Button>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.title} className="bg-white border border-neutral-200/80 p-5 rounded-xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold">{m.title}</span>
              {m.icon}
            </div>
            <div className="font-mono text-2xl font-black text-neutral-900">{m.value}</div>
            <p className={cn("text-[10px] font-mono", m.subtextColor || "text-neutral-400")}>{m.subtext}</p>
          </div>
        ))}
      </div>

      {/* Filter controls */}
      <OrdersFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
      />

      {/* Database table listings */}
      <OrdersTable isLoading={isLoading} orders={filteredOrders} copiedOrderId={copiedOrderId} copyOrderId={copyOrderId} onViewDetails={handleViewDetails} onDownloadInvoice={generateInvoicePDF} />

      {/* Selected Order Detailed View */}
      <OrderDetailsModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} order={selectedOrder} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}
