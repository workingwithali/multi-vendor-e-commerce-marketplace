import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TenantCart {
  productIds: string[];
}

interface CartStore {
  TenantCart: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantSlug: string) => string[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      TenantCart: {},

      addProduct: (tenantSlug, productId) =>
        set((state) => ({
          TenantCart: {
            ...state.TenantCart,
            [tenantSlug]: {
              productIds: [
                ...(state.TenantCart[tenantSlug]?.productIds || []),
                productId,
              ],
            },
          },
        })),

      removeProduct: (tenantSlug, productId) =>
        set((state) => ({
          TenantCart: {
            ...state.TenantCart,
            [tenantSlug]: {
              productIds: state.TenantCart[tenantSlug]?.productIds.filter(
                (id) => id !== productId
              ) || [],
            },
          },
        })),

      clearCart: (tenantSlug) =>
        set((state) => ({
          TenantCart: {
            ...state.TenantCart,
            [tenantSlug]: { productIds: [] },
          },
        })),

      clearAllCarts: () => set(() => ({ TenantCart: {} })),

      getCartByTenant: (tenantSlug) =>
        get().TenantCart[tenantSlug]?.productIds || [],
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
