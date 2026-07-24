"use client";

import * as React from "react";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrdersFilterProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  paymentFilter: string;
  setPaymentFilter: (val: string) => void;
}

export function OrdersFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  paymentFilter,
  setPaymentFilter,
}: OrdersFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-neutral-200 p-4 rounded-xl items-center shadow-sm">
      {/* Search Input */}
      <div className="md:col-span-6 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Search by Order ID, Recipient name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-neutral-200 rounded-lg pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition shadow-sm"
        />
      </div>

      {/* Status Filter */}
      <div className="md:col-span-3 relative">
        <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500 z-10 pointer-events-none" />
        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
          <SelectTrigger className="w-full pl-10 text-xs h-10">
            <SelectValue placeholder="ALL STATUSES" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="all">ALL STATUSES</SelectItem>
            <SelectItem value="pending">PENDING</SelectItem>
            <SelectItem value="processing">PROCESSING</SelectItem>
            <SelectItem value="shipped">SHIPPED</SelectItem>
            <SelectItem value="delivered">DELIVERED</SelectItem>
            <SelectItem value="cancelled">CANCELLED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payment Filter */}
      <div className="md:col-span-3 relative">
        <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500 z-10 pointer-events-none" />
        <Select value={paymentFilter} onValueChange={(val) => setPaymentFilter(val)}>
          <SelectTrigger className="w-full pl-10 text-xs h-10">
            <SelectValue placeholder="ALL PAYMENTS" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="all">ALL PAYMENTS</SelectItem>
            <SelectItem value="bank_transfer">BANK TRANSFER</SelectItem>
            <SelectItem value="cod">CASH ON DELIVERY</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
