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
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode?: string;
  phoneNumber: string;
  phone2?: string;
  fulfillmentMethod?: "ship" | "pickup";
  pickupLocation?: string;
  paymentMethod: "bank_transfer" | "cod" | "pay_at_store";
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount?: number;
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
  const [fulfillmentFilter, setFulfillmentFilter] = React.useState<string>("all");
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
        setOrders((prev) => prev.map((o) => (o._id === orderId || o.id === orderId ? { ...o, status: updated.status || newStatus } : o)));
        return updated;
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
    return null;
  };

  // Update order discount
  const updateDiscount = async (orderId: string, discount: number, newTotal: number) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discount, total: newTotal }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((o) => (o._id === orderId || o.id === orderId ? { ...o, discount, total: newTotal } : o)));
        return updated;
      }
    } catch (error) {
      console.error("Failed to update discount:", error);
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
      const email = (order?.email || "").toLowerCase();
      const phone = (order?.phoneNumber || "").toLowerCase();
      const term = searchTerm.toLowerCase();

      const matchesSearch = orderId.includes(term) || customer.includes(term) || email.includes(term) || phone.includes(term);
      const matchesStatus = statusFilter === "all" || order?.status === statusFilter;
      const matchesPayment = paymentFilter === "all" || order?.paymentMethod === paymentFilter;
      const matchesFulfillment = fulfillmentFilter === "all" || (order?.fulfillmentMethod || "ship") === fulfillmentFilter;

      return matchesSearch && matchesStatus && matchesPayment && matchesFulfillment;
    });
  }, [orders, searchTerm, statusFilter, paymentFilter, fulfillmentFilter]);

  // Generate Single Order PDF Invoice matching exact reference design
  const generateInvoicePDF = (order: Order) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const formatPDFNum = (num: number) => {
      return new Intl.NumberFormat("en-PK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    };

    const formatDateStr = (dateStr: string) => {
      try {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      } catch {
        return dateStr;
      }
    };

    const marginX = 15;
    const rightMarginX = 195;
    const contentWidth = rightMarginX - marginX; // 180mm

    // --- 1. HEADER SECTION ---
    // Left: Brand title & subtitle
    doc.setTextColor(20, 20, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("NOTHING", marginX, 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("NOTHING", marginX, 23);

    // Right: Invoice Title, Number, Date
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SALES INVOICE", rightMarginX, 15, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);
    const invoiceNo = order.customId || order.id || "NT-2026-8942-v14";
    doc.text(`Invoice No: ${invoiceNo}`, rightMarginX, 21, { align: "right" });
    doc.text(`Date: ${formatDateStr(order.createdAt)}`, rightMarginX, 26, { align: "right" });

    // Header Divider Line (Solid Black)
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(marginX, 31, rightMarginX, 31);

    // --- 2. SELLER & CUSTOMER DETAILS SECTION ---
    const detailsTopY = 40;

    // Left Column: Seller Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text("SELLER DETAILS", marginX, detailsTopY);
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(marginX, detailsTopY + 2, 95, detailsTopY + 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("Nothing Pakistan", marginX, detailsTopY + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(70, 70, 70);
    doc.text("Al-Qadir Heights, Executive Floor,", marginX, detailsTopY + 13);
    doc.text("Babar Block, Garden Town,", marginX, detailsTopY + 17);
    doc.text("Lahore, Pakistan", marginX, detailsTopY + 21);

    // Right Column: Customer Details
    const custColX = 108;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text("CUSTOMER DETAILS", custColX, detailsTopY);
    doc.line(custColX, detailsTopY + 2, rightMarginX, detailsTopY + 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(order.fullName, custColX, detailsTopY + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(70, 70, 70);
    doc.text(`Phone: ${order.phoneNumber}`, custColX, detailsTopY + 13);

    const deliveryModeStr = order.fulfillmentMethod === "pickup" ? "Office Pickup" : "Door Delivery";
    doc.text(`Delivery Mode: ${deliveryModeStr}`, custColX, detailsTopY + 17);

    if (order.fulfillmentMethod !== "pickup" && order.address) {
      const splitAddr = doc.splitTextToSize(`Address: ${order.address}, ${order.city}`, 85);
      doc.text(splitAddr, custColX, detailsTopY + 21);
    }

    // --- 3. ITEMS TABLE ---
    const tableTopY = 72;
    const tableHeaderHeight = 7;

    // Solid Black Header Bar
    doc.setFillColor(0, 0, 0);
    doc.rect(marginX, tableTopY, contentWidth, tableHeaderHeight, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("ITEM DESCRIPTION", marginX + 3, tableTopY + 4.8);
    doc.text("WARRANTY", 115, tableTopY + 4.8);
    doc.text("QTY", 145, tableTopY + 4.8);
    doc.text("UNIT PRICE (PKR)", rightMarginX - 3, tableTopY + 4.8, { align: "right" });

    // Table Content Rows
    let rowY = tableTopY + tableHeaderHeight + 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);

    order.items.forEach((item) => {
      // Item Name (Bold)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(10, 10, 10);
      doc.text(item.productName, marginX + 3, rowY);

      // Item Variant / Specifications on second line
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(110, 110, 110);
      const variantDetailStr = item.variantName ? `Variant: ${item.variantName}` : "Official Brand Unit";
      doc.text(variantDetailStr, marginX + 3, rowY + 4.5);

      // Warranty column
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      doc.text("1 Year Brand", 115, rowY);

      // Qty column
      doc.setFont("helvetica", "normal");
      doc.text(String(item.quantity), 145, rowY);

      // Price column (Bold)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(10, 10, 10);
      doc.text(formatPDFNum(item.price), rightMarginX - 3, rowY, { align: "right" });

      rowY += 12;

      // Row separator line
      doc.setDrawColor(240, 240, 240);
      doc.setLineWidth(0.2);
      doc.line(marginX, rowY - 4, rightMarginX, rowY - 4);
    });

    // --- 4. TOTALS SECTION (Right Aligned) ---
    let totalsY = Math.max(130, rowY + 5);
    const totalsLeftX = 110;

    // Subtotal
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    doc.text("Retail Price Subtotal", totalsLeftX, totalsY);
    doc.text(formatPDFNum(order.subtotal), rightMarginX - 3, totalsY, { align: "right" });

    totalsY += 6;
    if (order.shippingFee > 0) {
      doc.text("Shipping Fee", totalsLeftX, totalsY);
      doc.text(formatPDFNum(order.shippingFee), rightMarginX - 3, totalsY, { align: "right" });
      totalsY += 6;
    }

    if (order.tax > 0) {
      doc.text("Govt Tax (4%)", totalsLeftX, totalsY);
      doc.text(formatPDFNum(order.tax), rightMarginX - 3, totalsY, { align: "right" });
      totalsY += 6;
    }

    // Light line above Total Invoice Amount
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(totalsLeftX, totalsY, rightMarginX, totalsY);
    totalsY += 5;

    // Total Invoice Amount
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(10, 10, 10);
    doc.text("Total Invoice Amount", totalsLeftX, totalsY);
    doc.text(formatPDFNum(order.total), rightMarginX - 3, totalsY, { align: "right" });

    // Optional Discount / Advance Paid
    const discountVal = order.discount || 0;
    if (discountVal > 0) {
      totalsY += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      doc.text("Advance Paid / Discount", totalsLeftX, totalsY);
      doc.text(`-${formatPDFNum(discountVal)}`, rightMarginX - 3, totalsY, { align: "right" });
    }

    // Solid Black Line above Balance Due
    totalsY += 5;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(totalsLeftX, totalsY, rightMarginX, totalsY);

    // Balance Due
    totalsY += 6;
    const finalPayable = Math.max(0, order.total - discountVal);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(0, 0, 0);
    const balanceLabel = order.fulfillmentMethod === "pickup" ? "Balance Due (at Pickup)" : "Balance Due";
    doc.text(balanceLabel, totalsLeftX, totalsY);
    doc.text(formatPDFNum(finalPayable), rightMarginX - 3, totalsY, { align: "right" });

    // Double line below Balance Due
    totalsY += 3;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(totalsLeftX, totalsY, rightMarginX, totalsY);
    doc.setLineWidth(0.3);
    doc.line(totalsLeftX, totalsY + 1, rightMarginX, totalsY + 1);

    // --- 5. TERMS & CONDITIONS SECTION ---
    const termsY = 210;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 20);
    doc.text("TERMS & CONDITIONS", marginX, termsY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(90, 90, 90);
    doc.text("1. Device warranty is directly fulfilled by the official brand service center.", marginX, termsY + 5);
    doc.text("2. Items picked up from the office must be verified by the customer at the time of hand-over.", marginX, termsY + 9);
    doc.text(
      "3. Advance payments processed for handling are non-refundable once the unit has been reserved at the local office.",
      marginX,
      termsY + 13,
    );

    // --- 6. SIGNATURES SECTION ---
    const sigY = 260;
    // Left Signature
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.6);
    doc.line(marginX, sigY, marginX + 65, sigY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(40, 40, 40);
    doc.text("AUTHORIZED SIGNATURE", marginX + 12, sigY + 4);

    // Right Signature
    doc.line(125, sigY, rightMarginX, sigY);
    doc.text("CUSTOMER SIGNATURE", 140, sigY + 4);

    // --- 7. FOOTER PAGE NUMBER ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    doc.text("Page 1 of 1", rightMarginX, 282, { align: "right" });

    // Save File
    doc.save(`Sales_Invoice_${invoiceNo}.pdf`);
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
      `Generated Date: ${new Date().toLocaleString()}  |  Active Filters: [Status: ${statusFilter.toUpperCase()}] [Fulfillment: ${fulfillmentFilter.toUpperCase()}]`,
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
    doc.text("FULFILLMENT", 112, 50);
    doc.text("CITY", 150, 50);
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
      if (currentY > 190) {
        doc.addPage();
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
        doc.text("FULFILLMENT", 112, 43);
        doc.text("CITY", 150, 43);
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
      doc.text(o.fulfillmentMethod === "pickup" ? "STORE PICKUP" : "DELIVERY", 112, currentY);
      doc.text(o.city, 150, currentY);
      doc.text(o.paymentMethod.toUpperCase(), 175, currentY);
      doc.text(`Rs ${o.total}`, 205, currentY);
      doc.text(o.status.toUpperCase(), 232, currentY);
      doc.text(new Date(o.createdAt).toLocaleDateString(), 254, currentY);

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
    fulfillmentFilter,
    setFulfillmentFilter,
    copiedOrderId,
    copyOrderId,
    filteredOrders,
    refetch: fetchOrders,
    updateStatus,
    updateDiscount,
    generateInvoicePDF,
    generateReportPDF,
  };
}
