import * as React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Check, Copy, Calendar, Loader2, CreditCard, Landmark, Banknote, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FulfillmentTabs } from "./fulfillment-tabs";

export interface CheckoutFormValues {
  fullName: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode?: string;
  phoneNumber: string;
  phone2?: string;
}

interface SharedCheckoutFormProps {
  register: UseFormRegister<CheckoutFormValues>;
  setValue?: UseFormSetValue<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  fulfillmentMethod: "ship" | "pickup";
  setFulfillmentMethod: (method: "ship" | "pickup") => void;
  paymentMethod: "bank_transfer" | "cod" | "pay_at_store";
  setPaymentMethod: (method: "bank_transfer" | "cod" | "pay_at_store") => void;
  isHighValue: boolean;
  isSubmitPending: boolean;
  deliveryRangeString: string;
  onSubmit: (e: React.FormEvent) => void;
  copiedAccount: boolean;
  copiedIban: boolean;
  onCopyText: (text: string, type: "account" | "iban") => void;
}

export const formatPakistaniPhone = (value: string): string => {
  if (!value) return "";

  // Keep only digits and '+' at the start
  let cleaned = value.replace(/[^\d+]/g, "");

  // Handle +92 format
  if (cleaned.startsWith("+92")) {
    let digits = cleaned.slice(3).replace(/\D/g, ""); // digits after +92
    if (digits.length > 10) digits = digits.slice(0, 10);

    if (digits.length <= 3) {
      return `+92 ${digits}`;
    }
    return `+92 ${digits.slice(0, 3)} - ${digits.slice(3)}`;
  }

  // Handle standard 03XX format
  let digits = cleaned.replace(/\D/g, "");
  if (digits.startsWith("92")) {
    return formatPakistaniPhone("+" + digits);
  }

  if (digits.length > 11) digits = digits.slice(0, 11);

  if (digits.length <= 4) {
    return digits;
  }
  return `${digits.slice(0, 4)} - ${digits.slice(4)}`;
};

export function SharedCheckoutForm({
  register,
  setValue,
  errors,
  fulfillmentMethod,
  setFulfillmentMethod,
  paymentMethod,
  setPaymentMethod,
  isHighValue,
  isSubmitPending,
  deliveryRangeString,
  onSubmit,
  copiedAccount,
  copiedIban,
  onCopyText,
}: SharedCheckoutFormProps) {
  // Reset payment method when switching fulfillment
  const handleFulfillmentMethodChange = (method: "ship" | "pickup") => {
    setFulfillmentMethod(method);
    if (method === "pickup" && paymentMethod === "cod") {
      setPaymentMethod("pay_at_store");
    } else if (method === "ship" && paymentMethod === "pay_at_store") {
      setPaymentMethod("cod");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Modular Fulfillment Method Component */}
      <FulfillmentTabs
        register={register}
        setValue={setValue}
        errors={errors}
        fulfillmentMethod={fulfillmentMethod}
        onFulfillmentChange={handleFulfillmentMethodChange}
      />

      {/* SECTION: Payment method (SHIP MODE) */}
      {fulfillmentMethod === "ship" && (
        <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 font-ntype">Payment method</h2>
            <p className="text-xs text-slate-500 mt-1 font-ntype leading-relaxed">
              COD orders: Rs 400 shipping fee + 4% Govt Tax. Bank transfer: free shipping and 0% Govt Tax.
            </p>
          </div>

          {/* Warning Banner for High-value orders */}
          {isHighValue && (
            <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-[20px] p-5 text-slate-800 text-xs font-ntype leading-relaxed space-y-2.5 shadow-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                <span>★ CUSTOMER BENEFIT</span>
              </span>
              <p className="text-slate-700 font-sans leading-relaxed">
                For the safety and accountability of high-value shipments, we highly recommend bank transfer pre-payment. Orders paid via Bank Transfer
                receive priority processing and express next-day delivery.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {/* Cash on Delivery option */}
            <div
              onClick={() => setPaymentMethod("cod")}
              className={cn(
                "p-5 rounded-[20px] border transition-all duration-200 flex items-center justify-between cursor-pointer select-none",
                paymentMethod === "cod" ? "border-emerald-500 bg-emerald-50/15" : "border-slate-200 hover:border-slate-300 bg-white",
              )}
            >
              <div className="space-y-1">
                <span className="font-ntype text-xs font-bold uppercase tracking-wider block text-slate-800">CASH ON DELIVERY</span>
                <span className="font-ntype text-xs text-slate-500 block leading-relaxed">COD orders = Rs 400 shipping fee + 4% Govt Tax.</span>
              </div>
              <div className="shrink-0 ml-4">
                {paymentMethod === "cod" ? (
                  <span className="font-ntype text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-600/10">
                    SELECTED
                  </span>
                ) : (
                  <span className="font-ntype text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 bg-slate-50">
                    TAP
                  </span>
                )}
              </div>
            </div>

            {/* Bank Transfer option */}
            <div
              onClick={() => setPaymentMethod("bank_transfer")}
              className={cn(
                "p-5 rounded-[20px] border transition-all duration-200 space-y-5 cursor-pointer select-none",
                paymentMethod === "bank_transfer" ? "border-emerald-500 bg-emerald-50/15" : "border-slate-200 hover:border-slate-300 bg-white",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-ntype text-xs font-bold uppercase tracking-wider block text-slate-800">BANK TRANSFER</span>
                  <span className="font-ntype text-xs text-slate-500 block leading-relaxed">
                    Free shipping and 0% Govt Tax. For advance transfers, the 4% government tax is paid by us. Plus, get express next-day delivery.
                  </span>
                </div>
                <div className="shrink-0 ml-4 mt-0.5">
                  {paymentMethod === "bank_transfer" ? (
                    <span className="font-ntype text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-600/10">
                      SELECTED
                    </span>
                  ) : (
                    <span className="font-ntype text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 bg-slate-50">
                      TAP
                    </span>
                  )}
                </div>
              </div>

              {/* Nested Bank Details Subcard */}
              {paymentMethod === "bank_transfer" && (
                <div
                  className="bg-emerald-50/20 border border-emerald-100/80 rounded-[20px] p-5 space-y-4 text-xs font-ntype text-slate-700 animate-in fade-in-20 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="items-center space-x-3 text-slate-800 pb-2 border-b border-emerald-100/60">
                    <p className="font-ntype text-[10px] font-bold text-emerald-700 tracking-wider uppercase">BANK DETAILS</p>
                    <div className="shrink-0 flex items-center justify-center w-28 h-10">
                      <img src="/bank_alfalah.png" alt="Bank Alfalah" className="h-full w-full object-contain" />
                    </div>
                  </div>
                  <div>
                    <p className="font-ntype text-[9px] text-slate-400 uppercase tracking-widest font-bold">ACCOUNT TITLE</p>
                    <p className="font-bold text-slate-800 mt-0.5 text-[13px]">NOTHING OFFICIAL</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-xl p-3 gap-2.5 shadow-sm">
                    <div className="min-w-0">
                      <p className="font-ntype text-[9px] text-slate-400 uppercase tracking-widest font-bold">ACCOUNT NUMBER</p>
                      <p className="font-ntype text-sm font-bold text-slate-800 mt-0.5 break-all tracking-wider">57065002935977</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyText("57065002935977", "account");
                      }}
                      className="inline-flex items-center space-x-1.5 border border-slate-200 hover:border-black bg-slate-50 hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg text-slate-700 cursor-pointer self-end sm:self-center"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600 stroke-[2.5]" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-xl p-3 gap-2.5 shadow-sm">
                    <div className="min-w-0">
                      <p className="font-ntype text-[9px] text-slate-400 uppercase tracking-widest font-bold">IBAN</p>
                      <p className="font-ntype text-xs sm:text-sm font-bold text-slate-800 mt-0.5 break-all tracking-wider">
                        PK35ALFH5706005002935977
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyText("PK35ALFH5706005002935977", "iban");
                      }}
                      className="inline-flex items-center space-x-1.5 border border-slate-200 hover:border-black bg-slate-50 hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg text-slate-700 cursor-pointer self-end sm:self-center"
                    >
                      {copiedIban ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600 stroke-[2.5]" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Payment method (PICKUP MODE) */}
      {fulfillmentMethod === "pickup" && (
        <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 font-ntype">Pickup Payment Options</h2>
            <p className="text-xs text-slate-500 mt-1 font-ntype leading-relaxed">
              Select how you would like to pay when picking up your order at our office.
            </p>
          </div>

          <div className="space-y-4">
            {/* Option 1: Pay at Office Counter (Cash / POS Card Machine / Online Transfer) */}
            <div
              onClick={() => setPaymentMethod("pay_at_store")}
              className={cn(
                "p-5 rounded-[20px] border transition-all duration-200 space-y-4 cursor-pointer select-none",
                paymentMethod === "pay_at_store" ? "border-emerald-500 bg-emerald-50/15" : "border-slate-200 hover:border-slate-300 bg-white",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-ntype text-xs font-bold uppercase tracking-wider block text-slate-800">
                    PAY AT OFFICE COUNTER (CASH / POS CARD / ONLINE)
                  </span>
                  <span className="font-ntype text-xs text-slate-500 block leading-relaxed">
                    Pay in person upon inspecting your unit. Cash, POS Debit & Credit Card Machine, and Instant Online Bank Transfer are accepted at the office counter.
                  </span>
                </div>
                <div className="shrink-0 ml-4">
                  {paymentMethod === "pay_at_store" ? (
                    <span className="font-ntype text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-600/10">
                      SELECTED
                    </span>
                  ) : (
                    <span className="font-ntype text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 bg-slate-50">
                      TAP
                    </span>
                  )}
                </div>
              </div>

              {/* Logos & Badges Bar for Store Pickup Options */}
              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-100 font-ntype">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] font-bold text-slate-700">
                  <Banknote className="h-3.5 w-3.5 text-emerald-600" />
                  <span>CASH</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] font-bold text-slate-700">
                  <CreditCard className="h-3.5 w-3.5 text-blue-600" />
                  <span>DEBIT / CREDIT CARD (POS)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] font-bold text-slate-700">
                  <Landmark className="h-3.5 w-3.5 text-purple-600" />
                  <span>ONLINE BANK TRANSFER</span>
                </span>
              </div>
            </div>

            {/* Option 2: Pre-pay via Bank Transfer */}
            <div
              onClick={() => setPaymentMethod("bank_transfer")}
              className={cn(
                "p-5 rounded-[20px] border transition-all duration-200 space-y-5 cursor-pointer select-none",
                paymentMethod === "bank_transfer" ? "border-emerald-500 bg-emerald-50/15" : "border-slate-200 hover:border-slate-300 bg-white",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-ntype text-xs font-bold uppercase tracking-wider block text-slate-800">ADVANCE BANK PRE-PAYMENT</span>
                  <span className="font-ntype text-xs text-slate-500 block leading-relaxed">
                    Pre-pay via Bank Transfer to reserve your unit and fast-track counter pickup processing.
                  </span>
                </div>
                <div className="shrink-0 ml-4 mt-0.5">
                  {paymentMethod === "bank_transfer" ? (
                    <span className="font-ntype text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-600/10">
                      SELECTED
                    </span>
                  ) : (
                    <span className="font-ntype text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 bg-slate-50">
                      TAP
                    </span>
                  )}
                </div>
              </div>

              {/* Nested Bank Details Subcard */}
              {paymentMethod === "bank_transfer" && (
                <div
                  className="bg-emerald-50/20 border border-emerald-100/80 rounded-[20px] p-5 space-y-4 text-xs font-ntype text-slate-700 animate-in fade-in-20 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="items-center space-x-3 text-slate-800 pb-2 border-b border-emerald-100/60">
                    <p className="font-ntype text-[10px] font-bold text-emerald-700 tracking-wider uppercase">BANK DETAILS</p>
                    <div className="shrink-0 flex items-center justify-center w-28 h-10">
                      <img src="/bank_alfalah.png" alt="Bank Alfalah" className="h-full w-full object-contain" />
                    </div>
                  </div>
                  <div>
                    <p className="font-ntype text-[9px] text-slate-400 uppercase tracking-widest font-bold">ACCOUNT TITLE</p>
                    <p className="font-bold text-slate-800 mt-0.5 text-[13px]">NOTHING OFFICIAL</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-xl p-3 gap-2.5 shadow-sm">
                    <div className="min-w-0">
                      <p className="font-ntype text-[9px] text-slate-400 uppercase tracking-widest font-bold">ACCOUNT NUMBER</p>
                      <p className="font-ntype text-sm font-bold text-slate-800 mt-0.5 break-all tracking-wider">57065002935977</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyText("57065002935977", "account");
                      }}
                      className="inline-flex items-center space-x-1.5 border border-slate-200 hover:border-black bg-slate-50 hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg text-slate-700 cursor-pointer self-end sm:self-center"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600 stroke-[2.5]" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-xl p-3 gap-2.5 shadow-sm">
                    <div className="min-w-0">
                      <p className="font-ntype text-[9px] text-slate-400 uppercase tracking-widest font-bold">IBAN</p>
                      <p className="font-ntype text-xs sm:text-sm font-bold text-slate-800 mt-0.5 break-all tracking-wider">
                        PK35ALFH5706005002935977
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyText("PK35ALFH5706005002935977", "iban");
                      }}
                      className="inline-flex items-center space-x-1.5 border border-slate-200 hover:border-black bg-slate-50 hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg text-slate-700 cursor-pointer self-end sm:self-center"
                    >
                      {copiedIban ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600 stroke-[2.5]" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Button & Estimates */}
      <div className="space-y-4">
        <button
          type="submit"
          disabled={isSubmitPending}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-13 w-full rounded-[16px] transition duration-200 uppercase tracking-widest text-xs flex items-center justify-center cursor-pointer select-none active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitPending ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              <span>Processing Order...</span>
            </div>
          ) : (
            <span>Place Order</span>
          )}
        </button>

        {/* Estimated Delivery Block (Only for Ship) */}
        {fulfillmentMethod === "ship" && (
          <div className="bg-slate-100 rounded-[20px] p-5 flex items-start space-x-4 border border-slate-200/60">
            <div className="bg-slate-200 rounded-full p-2 mt-0.5 text-slate-600">
              <Calendar className="h-[18px] w-[18px]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Estimated delivery: {deliveryRangeString}</p>
              <p className="text-[11px] text-slate-500 mt-1 font-ntype leading-relaxed">
                Courier policy: 1–3 working days. Our practice: Same-day processing, next-day delivery.
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
