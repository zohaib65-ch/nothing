"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useOrders, Order } from "@/hooks/useOrders";
import { OrdersFilter } from "./_components/OrdersFilter";
import { OrdersTable } from "./_components/OrdersTable";
import { OrderDetailsModal } from "./_components/OrderDetailsModal";

export default function AdminOrdersPage() {
  const {
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

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#26262A] pb-5">
        <div>
          <Heading size="lg" className="font-ndot text-white uppercase tracking-widest">
            ORDERS REGISTRY
          </Heading>
          <p className="font-lattera text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
            Displaying placed client checkout transactions and invoice records.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={refetch}
            className="font-lattera text-xs font-bold uppercase tracking-wider h-10 shrink-0 cursor-pointer"
          >
            REFRESH
          </Button>
          <Button
            onClick={generateReportPDF}
            disabled={filteredOrders.length === 0}
            leftIcon={<Download className="h-4 w-4" />}
            className="bg-[#D71921] hover:bg-[#B51219] text-white font-lattera text-xs font-bold uppercase tracking-wider h-10 shadow-lg shadow-[#D71921]/15 cursor-pointer disabled:opacity-50"
          >
            DOWNLOAD REPORT (PDF)
          </Button>
        </div>
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
      <OrdersTable
        isLoading={isLoading}
        orders={filteredOrders}
        copiedOrderId={copiedOrderId}
        copyOrderId={copyOrderId}
        onViewDetails={handleViewDetails}
        onDownloadInvoice={generateInvoicePDF}
      />

      {/* Selected Order Detailed View */}
      <OrderDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
        onDownloadInvoice={generateInvoicePDF}
      />
    </div>
  );
}
