"use client";

import * as React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Store, MapPin, Clock, Truck } from "lucide-react";
import { CheckoutFormValues, formatPakistaniPhone } from "./checkout-form";

interface FulfillmentTabsProps {
  register: UseFormRegister<CheckoutFormValues>;
  setValue?: UseFormSetValue<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  fulfillmentMethod: "ship" | "pickup";
  onFulfillmentChange: (method: "ship" | "pickup") => void;
}

export function FulfillmentTabs({
  register,
  setValue,
  errors,
  fulfillmentMethod,
  onFulfillmentChange,
}: FulfillmentTabsProps) {
  const handleTabChange = (value: string) => {
    const method = value as "ship" | "pickup";
    onFulfillmentChange(method);

    if (method === "pickup" && setValue) {
      setValue("address", "Nothing Official Office - Al Qadir Heights, Babar Block, Garden Town, Lahore", { shouldValidate: true });
      setValue("city", "Lahore", { shouldValidate: true });
      setValue("district", "Lahore", { shouldValidate: true });
    } else if (method === "ship" && setValue) {
      setValue("address", "", { shouldValidate: false });
      setValue("city", "", { shouldValidate: false });
      setValue("district", "", { shouldValidate: false });
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900 font-ntype">Fulfillment Method</h2>
        <p className="text-xs text-slate-500 mt-1 font-ntype">
          Choose whether you would like express door delivery or free office pickup.
        </p>
      </div>

      <Tabs value={fulfillmentMethod} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="ship" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>Ship to Address</span>
          </TabsTrigger>
          <TabsTrigger value="pickup" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span>Office Pickup</span>
          </TabsTrigger>
        </TabsList>

        {/* SHIP TAB CONTENT */}
        <TabsContent value="ship" className="space-y-4 pt-2">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="text-xs font-semibold text-slate-700">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Your full name"
                {...register("fullName")}
                className={`w-full rounded-[16px] border ${errors.fullName ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                {...register("email")}
                className={`w-full rounded-[16px] border ${errors.email ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label htmlFor="address" className="text-xs font-semibold text-slate-700">
              Address *
            </label>
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
              <label htmlFor="city" className="text-xs font-semibold text-slate-700">
                City *
              </label>
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
              <label htmlFor="district" className="text-xs font-semibold text-slate-700">
                District *
              </label>
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
              <label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-700">
                Phone Number *
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="0300 - 0000000"
                {...register("phoneNumber", {
                  onChange: (e) => {
                    e.target.value = formatPakistaniPhone(e.target.value);
                  },
                })}
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
              {...register("phone2", {
                onChange: (e) => {
                  e.target.value = formatPakistaniPhone(e.target.value);
                },
              })}
              className={`w-full rounded-[16px] border ${errors.phone2 ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
            />
            {errors.phone2 && <p className="text-xs text-red-500">{errors.phone2.message}</p>}
          </div>
        </TabsContent>

        {/* PICKUP TAB CONTENT */}
        <TabsContent value="pickup" className="space-y-5 pt-2">
          {/* Official Experience Office Pickup Card */}
          <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-[20px] p-5 space-y-3.5 animate-in fade-in-20 duration-200">
            <div className="flex items-center space-x-2 text-emerald-800">
              <Store className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-ntype text-xs font-bold uppercase tracking-wider">Official Experience Office Pickup</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-ntype text-slate-700">
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-emerald-600" /> Pickup Location
                </p>
                <p className="font-bold text-slate-900">Nothing Official Office</p>
                <p className="text-[11px] text-slate-600 leading-snug">Al Qadir Heights, Babar Block, Garden Town, Lahore</p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="h-3 w-3 text-emerald-600" /> Operating Hours
                </p>
                <p className="font-bold text-slate-900">Mon – Sat (11 AM – 9 PM)</p>
                <p className="text-[11px] text-emerald-700 font-semibold">Appointment Pickup Available</p>
              </div>
            </div>
            <p className="text-[11px] text-emerald-800 font-bold font-ntype leading-relaxed bg-emerald-100/60 p-3 rounded-xl border border-emerald-200/80">
              * For product pick-ups, please reserve your product and book an appointment before visiting our office.
            </p>
          </div>

          {/* Contact Details for Pickup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="fullNamePickup" className="text-xs font-semibold text-slate-700">
                Full Name *
              </label>
              <input
                type="text"
                id="fullNamePickup"
                placeholder="Your full name"
                {...register("fullName")}
                className={`w-full rounded-[16px] border ${errors.fullName ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="emailPickup" className="text-xs font-semibold text-slate-700">
                Email Address *
              </label>
              <input
                type="email"
                id="emailPickup"
                placeholder="your.email@example.com"
                {...register("email")}
                className={`w-full rounded-[16px] border ${errors.email ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="phoneNumberPickup" className="text-xs font-semibold text-slate-700">
                Phone Number *
              </label>
              <input
                type="text"
                id="phoneNumberPickup"
                placeholder="0300 - 0000000"
                {...register("phoneNumber", {
                  onChange: (e) => {
                    e.target.value = formatPakistaniPhone(e.target.value);
                  },
                })}
                className={`w-full rounded-[16px] border ${errors.phoneNumber ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone2Pickup" className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Secondary Phone Number</span>
                <span className="text-[10px] text-slate-400 font-normal">Optional</span>
              </label>
              <input
                type="text"
                id="phone2Pickup"
                placeholder="0300 - 0000000"
                {...register("phone2", {
                  onChange: (e) => {
                    e.target.value = formatPakistaniPhone(e.target.value);
                  },
                })}
                className={`w-full rounded-[16px] border ${errors.phone2 ? "border-red-500 ring-1 ring-red-100" : "border-slate-200"} px-4 py-3 bg-white text-slate-900 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:outline-none transition`}
              />
              {errors.phone2 && <p className="text-xs text-red-500">{errors.phone2.message}</p>}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
