import { create } from "zustand";

export interface ShippingLocation {
  id: string;
  name: string;
  nativeName?: string;
  region: string;
  language: string;
  currency: string;
}

export const SHIPPING_LOCATIONS: ShippingLocation[] = [
  // Europe
  { id: "at", name: "Österreich", region: "Europe", language: "English", currency: "EUR" },
  { id: "be", name: "Belgique", region: "Europe", language: "English", currency: "EUR" },
  { id: "bg", name: "България", region: "Europe", language: "English", currency: "BGN" },
  { id: "hr", name: "Hrvatska", region: "Europe", language: "English", currency: "EUR" },
  { id: "cz", name: "Česko", region: "Europe", language: "English", currency: "CZK" },
  { id: "dk", name: "Danmark", region: "Europe", language: "English", currency: "DKK" },
  { id: "ee", name: "Eesti", region: "Europe", language: "English", currency: "EUR" },
  { id: "fi", name: "Finland", region: "Europe", language: "English", currency: "EUR" },
  { id: "fr", name: "France", region: "Europe", language: "Français", currency: "EUR" },
  { id: "de", name: "Deutschland", region: "Europe", language: "Deutsch", currency: "EUR" },
  { id: "gr", name: "Ελλάδα", region: "Europe", language: "English", currency: "EUR" },
  { id: "hu", name: "Magyarország", region: "Europe", language: "English", currency: "HUF" },
  { id: "ie", name: "Ireland", region: "Europe", language: "English", currency: "EUR" },
  { id: "it", name: "Italia", region: "Europe", language: "Italiano", currency: "EUR" },
  { id: "lv", name: "Latvija", region: "Europe", language: "English", currency: "EUR" },
  { id: "lt", name: "Lietuva", region: "Europe", language: "English", currency: "EUR" },
  { id: "lu", name: "Luxembourg", region: "Europe", language: "English", currency: "EUR" },
  { id: "nl", name: "Nederland", region: "Europe", language: "English", currency: "EUR" },
  { id: "no", name: "Norway", region: "Europe", language: "English", currency: "NOK" },
  { id: "pl", name: "Polska", region: "Europe", language: "Polski", currency: "PLN" },
  { id: "pt", name: "Portugal", region: "Europe", language: "English", currency: "EUR" },
  { id: "ro", name: "România", region: "Europe", language: "English", currency: "RON" },
  { id: "sk", name: "Slovensko", region: "Europe", language: "English", currency: "EUR" },
  { id: "si", name: "Slovenija", region: "Europe", language: "English", currency: "EUR" },
  { id: "es", name: "España", region: "Europe", language: "Español", currency: "EUR" },
  { id: "se", name: "Sverige", region: "Europe", language: "Svenska", currency: "SEK" },
  { id: "ch", name: "Schweiz", region: "Europe", language: "Deutsch", currency: "CHF" },
  { id: "gb", name: "United Kingdom", region: "Europe", language: "English", currency: "GBP" },

  // Asia Pacific
  { id: "pk", name: "Pakistan", region: "Asia Pacific", language: "English", currency: "PKR" },
  { id: "in", name: "India", region: "Asia Pacific", language: "English", currency: "INR" },
  { id: "jp", name: "Japan", region: "Asia Pacific", language: "日本語", currency: "JPY" },
  { id: "my", name: "Malaysia", region: "Asia Pacific", language: "English", currency: "MYR" },
  { id: "ph", name: "Philippines", region: "Asia Pacific", language: "English", currency: "PHP" },
  { id: "sg", name: "Singapore", region: "Asia Pacific", language: "English", currency: "SGD" },
  { id: "th", name: "Thailand", region: "Asia Pacific", language: "English", currency: "THB" },
  { id: "au", name: "Australia", region: "Asia Pacific", language: "English", currency: "AUD" },

  // North America
  { id: "us", name: "United States", region: "North America", language: "English", currency: "USD" },
  { id: "ca", name: "Canada", region: "North America", language: "English", currency: "CAD" },
  { id: "mx", name: "México", region: "North America", language: "Español", currency: "MXN" },

  // Middle East & Africa
  { id: "ae", name: "United Arab Emirates", region: "Middle East", language: "English", currency: "AED" },
  { id: "sa", name: "Saudi Arabia", region: "Middle East", language: "English", currency: "SAR" },
  { id: "kw", name: "Kuwait", region: "Middle East", language: "English", currency: "KWD" },
  { id: "qa", name: "Qatar", region: "Middle East", language: "English", currency: "QAR" },
];

const DEFAULT_LOCATION = SHIPPING_LOCATIONS.find((l) => l.id === "pk") || SHIPPING_LOCATIONS[0];

interface LocationState {
  isOpen: boolean;
  selectedLocation: ShippingLocation;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  toggleLocationModal: () => void;
  setLocation: (loc: ShippingLocation) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  isOpen: false,
  selectedLocation: DEFAULT_LOCATION,
  openLocationModal: () => set({ isOpen: true }),
  closeLocationModal: () => set({ isOpen: false }),
  toggleLocationModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setLocation: (loc) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("nothing_shipping_location", JSON.stringify(loc));
      }
    } catch {
      // ignore
    }
    set({ selectedLocation: loc });
  },
}));
