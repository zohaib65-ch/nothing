import { create } from "zustand";
import { SpecificationGroup } from "@/types";

interface SpecsState {
  isOpen: boolean;
  productName: string;
  specifications: SpecificationGroup[];
  openSpecs: (specifications: SpecificationGroup[], productName?: string) => void;
  closeSpecs: () => void;
  toggleSpecs: () => void;
}

export const useSpecsStore = create<SpecsState>((set) => ({
  isOpen: false,
  productName: "",
  specifications: [],
  openSpecs: (specifications, productName = "") =>
    set({ isOpen: true, specifications, productName }),
  closeSpecs: () => set({ isOpen: false }),
  toggleSpecs: () => set((state) => ({ isOpen: !state.isOpen })),
}));
