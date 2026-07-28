import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductVariant } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (product, variant, quantity = 1) => {
        const currentItems = get().items;
        const itemId = `${product.id}-${variant.id}`;
        const existingIndex = currentItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += quantity;
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...currentItems, { id: itemId, product, selectedVariant: variant, quantity }],
            isOpen: true,
          });
        }
      },
      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.selectedVariant.salePrice || item.selectedVariant.price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: "nothing_cart_v1",
      partialize: (state) => ({
        items: state.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          selectedVariant: {
            id: item.selectedVariant.id,
            color: item.selectedVariant.color,
            colorHex: item.selectedVariant.colorHex || "",
            storage: item.selectedVariant.storage,
            price: item.selectedVariant.price,
            salePrice: item.selectedVariant.salePrice,
            image: item.selectedVariant.image || "",
          },
          product: {
            id: item.product.id || item.product.slug,
            name: item.product.name,
            slug: item.product.slug,
            price: item.product.price,
            salePrice: item.product.salePrice,
            category: item.product.category,
            images: [item.product.images?.[0] || ""].filter(Boolean),
          } as Product,
        })),
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
