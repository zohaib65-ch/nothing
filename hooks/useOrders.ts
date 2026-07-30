import * as React from "react";
import { jsPDF } from "jspdf";

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  _id?: string;
  customId?: string;
  fullName: string;
  address: string;
  city: string;
  district: string;
  postalCode?: string;
  phoneNumber: string;
  phone2?: string;
  paymentMethod: "bank_transfer" | "cod";
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  receiptImage?: string;
  createdAt: string;
}

export function useOrders() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [paymentFilter, setPaymentFilter] = React.useState<string>("all");
  const [copiedOrderId, setCopiedOrderId] = React.useState<string | null>(null);

  // Fetch orders from API
  const fetchOrders = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Update order status
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        // Update local state (optimistic/API response match for both id and _id)
        setOrders((prev) => prev.map((o) => (o._id === orderId || o.id === orderId ? { ...o, status: updated.status || newStatus } : o)));
        return updated;
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
    return null;
  };

  // Helper: Copy Order ID to clipboard
  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedOrderId(id);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  // Filtered orders list (Safe against undefined)
  const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => {
      const orderId = (order?.id || order?._id || "").toLowerCase();
      const customer = (order?.fullName || "").toLowerCase();
      const phone = (order?.phoneNumber || "").toLowerCase();
      const term = searchTerm.toLowerCase();

      const matchesSearch = orderId.includes(term) || customer.includes(term) || phone.includes(term);
      const matchesStatus = statusFilter === "all" || order?.status === statusFilter;
      const matchesPayment = paymentFilter === "all" || order?.paymentMethod === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, searchTerm, statusFilter, paymentFilter]);

  // Generate Single Order PDF Invoice
  const generateInvoicePDF = (order: Order) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Branding header
    doc.setFillColor(245, 245, 247);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(17, 17, 17);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("NOTHING PAKISTAN", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Official SMC-Private Limited Incorporation Certificate CUIN: 0337422", 20, 27);
    doc.text("Bank Alfalah Payment Settlement Gateway", 20, 32);

    // Order Info block (right-aligned header)
    doc.setTextColor(17, 17, 17);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("ORDER INVOICE", 150, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text(`Reference ID: ${order.customId || order.id}`, 150, 20);
    doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 150, 25);
    doc.text(`Payment: ${order.paymentMethod === "bank_transfer" ? "Bank Transfer" : "Cash on Delivery (COD)"}`, 150, 30);

    // Section 1: Customer Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(17, 17, 17);
    doc.text("RECIPIENT DELIVERY DETAILS", 20, 52);

    // Draw horizontal separator
    doc.setDrawColor(230, 230, 235);
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);

    // Details Grid text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);

    doc.setFont("helvetica", "bold");
    doc.text("Name:", 20, 62);
    doc.setFont("helvetica", "normal");
    doc.text(order.fullName, 45, 62);

    doc.setFont("helvetica", "bold");
    doc.text("Contact:", 20, 68);
    doc.setFont("helvetica", "normal");
    doc.text(order.phoneNumber + (order.phone2 ? ` / ${order.phone2}` : ""), 45, 68);

    doc.setFont("helvetica", "bold");
    doc.text("Address:", 20, 74);
    doc.setFont("helvetica", "normal");

    // Multi-line address wrapping
    const splitAddress = doc.splitTextToSize(
      `${order.address}, ${order.city}, ${order.district}${order.postalCode ? ` (${order.postalCode})` : ""}`,
      140,
    );
    doc.text(splitAddress, 45, 74);

    // Section 2: Items Summary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(17, 17, 17);
    doc.text("ORDER SPECIFICATIONS", 20, 95);
    doc.line(20, 98, 190, 98);

    // Table Headers
    doc.setFillColor(245, 245, 247);
    doc.rect(20, 102, 170, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("ITEM NAME", 23, 107);
    doc.text("VARIANT", 95, 107);
    doc.text("PRICE", 140, 107);
    doc.text("QTY", 163, 107);
    doc.text("TOTAL", 175, 107);

    // Table rows
    let currentY = 115;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    order.items.forEach((item) => {
      // Product Name (wrapped if long)
      const nameLines = doc.splitTextToSize(item.productName, 70);
      doc.text(nameLines, 23, currentY);

      doc.text(item.variantName, 95, currentY);
      doc.text(`Rs ${item.price}`, 140, currentY);
      doc.text(String(item.quantity), 164, currentY);
      doc.text(`Rs ${item.price * item.quantity}`, 175, currentY);

      const lineHeights = nameLines.length * 4.5;
      currentY += Math.max(8, lineHeights);
    });

    // Separator line before totals
    doc.line(20, currentY, 190, currentY);
    currentY += 8;

    // Totals Block
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text("Subtotal:", 135, currentY);
    doc.text(`Rs ${order.subtotal}`, 168, currentY);

    currentY += 6;
    doc.text("Shipping charge:", 135, currentY);
    doc.text(order.shippingFee === 0 ? "Free" : `Rs ${order.shippingFee}`, 168, currentY);

    currentY += 6;
    doc.text("Govt Tax (4%):", 135, currentY);
    doc.text(order.tax === 0 ? "Rs 0" : `Rs ${order.tax}`, 168, currentY);

    currentY += 8;
    doc.line(130, currentY - 5, 190, currentY - 5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 17, 17);
    doc.setFontSize(10);
    doc.text("Grand Total:", 135, currentY);
    doc.text(`Rs ${order.total}`, 168, currentY);

    // Footer info
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for shopping at Nothing. For delivery tracking updates, connect on WhatsApp helpline.", 20, 275);

    // Save File
    doc.save(`Invoice_${order.customId || order.id}.pdf`);
  };

  // Generate All Filtered Orders PDF Report
  const generateReportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Branding header
    doc.setFillColor(20, 20, 22);
    doc.rect(0, 0, 297, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("NOTHING PAKISTAN - ORDERS REGISTRY REPORT", 15, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(180, 180, 180);
    doc.text(
      `Generated Date: ${new Date().toLocaleString()}  |  Active Filters: [Status: ${statusFilter.toUpperCase()}] [Payment: ${paymentFilter.toUpperCase()}]`,
      15,
      26,
    );

    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL MATCHING: ${filteredOrders.length} ORDERS`, 240, 18);

    // Table Headers
    doc.setFillColor(240, 240, 243);
    doc.rect(15, 45, 267, 8, "F");

    doc.setTextColor(17, 17, 17);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("REFERENCE ID", 18, 50);
    doc.text("CUSTOMER NAME", 68, 50);
    doc.text("CONTACT NUMBER", 112, 50);
    doc.text("CITY", 145, 50);
    doc.text("PAYMENT", 175, 50);
    doc.text("TOTAL PAID", 205, 50);
    doc.text("STATUS", 232, 50);
    doc.text("DATE", 254, 50);

    // Table Rows
    let currentY = 59;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);

    filteredOrders.forEach((o) => {
      // Manage page break
      if (currentY > 190) {
        doc.addPage();
        // Draw header again
        doc.setFillColor(20, 20, 22);
        doc.rect(0, 0, 297, 30, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("NOTHING PAKISTAN - ORDERS REPORT (Contd.)", 15, 18);

        doc.setFillColor(240, 240, 243);
        doc.rect(15, 38, 267, 8, "F");
        doc.setTextColor(17, 17, 17);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text("REFERENCE ID", 18, 43);
        doc.text("CUSTOMER NAME", 68, 43);
        doc.text("CONTACT NUMBER", 112, 43);
        doc.text("CITY", 145, 43);
        doc.text("PAYMENT", 175, 43);
        doc.text("TOTAL PAID", 205, 43);
        doc.text("STATUS", 232, 43);
        doc.text("DATE", 254, 43);

        currentY = 52;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
      }

      doc.text(o.id || o._id || "", 18, currentY);
      doc.text(o.fullName, 68, currentY);
      doc.text(o.phoneNumber, 112, currentY);
      doc.text(o.city, 145, currentY);
      doc.text(o.paymentMethod.toUpperCase(), 175, currentY);
      doc.text(`Rs ${o.total}`, 205, currentY);
      doc.text(o.status.toUpperCase(), 232, currentY);
      doc.text(new Date(o.createdAt).toLocaleDateString(), 254, currentY);

      // Light gray separator lines
      doc.setDrawColor(240, 240, 243);
      doc.setLineWidth(0.3);
      doc.line(15, currentY + 3, 282, currentY + 3);

      currentY += 7;
    });

    // Save File
    doc.save(`Orders_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return {
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
    refetch: fetchOrders,
    updateStatus,
    generateInvoicePDF,
    generateReportPDF,
  };
}
