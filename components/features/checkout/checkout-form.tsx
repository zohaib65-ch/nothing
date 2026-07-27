import * as React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Check, Copy, Calendar, Landmark, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckoutFormValues {
  fullName: string;
  address: string;
  city: string;
  district: string;
  postalCode?: string;
  phoneNumber: string;
  phone2?: string;
}

interface SharedCheckoutFormProps {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  paymentMethod: "bank_transfer" | "cod";
  setPaymentMethod: (method: "bank_transfer" | "cod") => void;
  isHighValue: boolean;
  isSubmitPending: boolean;
  deliveryRangeString: string;
  onSubmit: (e: React.FormEvent) => void;
  copiedAccount: boolean;
  copiedIban: boolean;
  onCopyText: (text: string, type: "account" | "iban") => void;
}

export function SharedCheckoutForm({
  register,
  errors,
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
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* SECTION: Delivery details */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Delivery Details</h2>
          <p className="text-xs text-slate-500 mt-1 font-ntype">Where should we deliver your Nothing order?</p>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-xs font-semibold text-slate-700">Full Name *</label>
            <input
              type="text"
              id="fullName"
              placeholder="Your full name"
              {...register("fullName")}
              className={`w-full rounded-[16px] border ${errors.fullName ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
            />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label htmlFor="address" className="text-xs font-semibold text-slate-700">Address *</label>
            <textarea
              id="address"
              placeholder="House / street / area"
              rows={3}
              {...register("address")}
              className={`w-full rounded-[16px] border ${errors.address ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition resize-none`}
            />
            {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
          </div>

          {/* City & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="city" className="text-xs font-semibold text-slate-700">City *</label>
              <input
                type="text"
                id="city"
                placeholder="City"
                {...register("city")}
                className={`w-full rounded-[16px] border ${errors.city ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="district" className="text-xs font-semibold text-slate-700">District *</label>
              <input
                type="text"
                id="district"
                placeholder="District"
                {...register("district")}
                className={`w-full rounded-[16px] border ${errors.district ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.district && <p className="text-xs text-red-500">{errors.district.message}</p>}
            </div>
          </div>

          {/* Postal Code & Phone number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="postalCode" className="text-xs font-semibold text-slate-700 font-ntype flex items-center justify-between">
                <span>Postal Code</span>
                <span className="text-[10px] text-slate-400 font-normal">Optional</span>
              </label>
              <input
                type="text"
                id="postalCode"
                placeholder="Postal code"
                {...register("postalCode")}
                className="w-full rounded-[16px] border border-slate-200 px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-700">Phone Number *</label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="0300 - 0000000"
                {...register("phoneNumber")}
                className={`w-full rounded-[16px] border ${errors.phoneNumber ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
            </div>
          </div>

          {/* Secondary Phone Number (optional) */}
          <div className="space-y-1.5">
            <label htmlFor="phone2" className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Secondary Phone Number</span>
              <span className="text-[10px] text-slate-400 font-normal">Optional</span>
            </label>
            <input
              type="text"
              id="phone2"
              placeholder="0300 - 0000000"
              {...register("phone2")}
              className="w-full rounded-[16px] border border-slate-200 px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* SECTION: Payment method */}
      <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 font-ntype">Payment method</h2>
          <p className="text-xs text-slate-500 mt-1 font-ntype leading-relaxed">
            COD orders: Rs 400 shipping fee + 4% Govt Tax. Bank transfer: free shipping and 0% Govt Tax.
          </p>
        </div>

        {/* Warning Banner for High-value orders */}
        {isHighValue && (
          <div className="bg-amber-50/40 border border-amber-200/80 rounded-[20px] p-5 text-amber-900 text-xs font-ntype leading-relaxed">
            For the safety and accountability of high-value shipments, we highly recommend bank transfer pre-payment. Orders paid via Bank Transfer receive priority processing and express next-day delivery.
          </div>
        )}

        <div className="space-y-4">
          {/* Cash on Delivery option */}
          <div
            onClick={() => setPaymentMethod("cod")}
            className={cn(
              "p-5 rounded-[20px] border transition-all duration-200 flex items-center justify-between cursor-pointer select-none",
              paymentMethod === "cod"
                ? "border-emerald-500 bg-emerald-50/15"
                : "border-slate-200 hover:border-slate-300 bg-white"
            )}
          >
            <div className="space-y-1">
              <span className="font-ntype text-xs font-bold uppercase tracking-wider block text-slate-800">
                CASH ON DELIVERY
              </span>
              <span className="font-ntype text-xs text-slate-500 block leading-relaxed">
                COD orders = Rs 400 shipping fee + 4% Govt Tax.
              </span>
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
              paymentMethod === "bank_transfer"
                ? "border-emerald-500 bg-emerald-50/15"
                : "border-slate-200 hover:border-slate-300 bg-white"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="font-ntype text-xs font-bold uppercase tracking-wider block text-slate-800">
                  BANK TRANSFER
                </span>
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
              <div className="bg-emerald-50/20 border border-emerald-100/80 rounded-[20px] p-5 space-y-4 text-xs font-ntype text-slate-700 animate-in fade-in-20 duration-200" onClick={(e) => e.stopPropagation()}>
                {/* Bank Title & Logo */}
                <div className="flex items-center space-x-3 text-slate-800 pb-2 border-b border-emerald-100/60">
                  <div className="shrink-0 flex items-center justify-center w-28 h-10">
                    <img
                      src="/bank_alfalah.png"
                      alt="Bank Alfalah"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-ntype text-[10px] font-bold text-emerald-700 tracking-wider uppercase">BANK DETAILS</p>
                    <p className="font-bold text-slate-900 mt-0.5">Bank Alfalah</p>
                  </div>
                </div>

                {/* Account Title Field */}
                <div>
                  <p className="font-ntype text-[9px] text-slate-400 uppercase tracking-widest font-bold">ACCOUNT TITLE</p>
                  <p className="font-bold text-slate-800 mt-0.5 text-[13px]">NOTHING OFFICIAL</p>
                </div>

                {/* Account Number Copy Area */}
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

                {/* IBAN Copy Area */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200/80 rounded-xl p-3 gap-2.5 shadow-sm">
                  <div className="min-w-0">
                    <p className="font-ntype text-[9px] text-slate-400 uppercase tracking-widest font-bold">IBAN</p>
                    <p className="font-ntype text-xs sm:text-sm font-bold text-slate-800 mt-0.5 break-all tracking-wider">PK35ALFH5706005002935977</p>
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

        {/* Estimated Delivery Block */}
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
      </div>
    </form>
  );
}
