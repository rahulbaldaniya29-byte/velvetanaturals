import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  qty: number;
  stock: number;
}

export interface WishlistItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

interface UIState {
  cartOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
}

interface CartStore {
  items: CartItem[];
  coupon: { code: string; discount: number } | null;
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  get total(): number;
  get itemCount(): number;
  get subtotal(): number;
  get discountAmount(): number;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  moveToCart: (id: string, addToCart: (item: any) => void) => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
}));

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      addItem: (item, qty = 1) => {
        const items = get().items;
        const existing = items.find((i) => i._id === item._id);
        if (existing) {
          set({ items: items.map((i) => i._id === item._id ? { ...i, qty: Math.min(i.qty + qty, item.stock) } : i) });
        } else {
          set({ items: [...items, { ...item, qty }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i._id !== id) }),
      updateQty: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return; }
        set({ items: get().items.map((i) => i._id === id ? { ...i, qty } : i) });
      },
      clearCart: () => set({ items: [], coupon: null }),
      applyCoupon: (code, discount) => set({ coupon: { code, discount } }),
      removeCoupon: () => set({ coupon: null }),
      get subtotal() { return get().items.reduce((s, i) => s + i.price * i.qty, 0); },
      get discountAmount() {
        const c = get().coupon;
        return c ? Math.round(get().subtotal * c.discount / 100) : 0;
      },
      get total() { return get().subtotal - get().discountAmount; },
      get itemCount() { return get().items.reduce((s, i) => s + i.qty, 0); },
    }),
    { name: 'velveta-cart', storage: createJSONStorage(() => localStorage) }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!get().hasItem(item._id)) set({ items: [...get().items, item] });
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i._id !== id) }),
      hasItem: (id) => get().items.some((i) => i._id === id),
      moveToCart: (id, addFn) => {
        const item = get().items.find((i) => i._id === id);
        if (item) { addFn(item); get().removeItem(id); }
      },
    }),
    { name: 'velveta-wishlist', storage: createJSONStorage(() => localStorage) }
  )
);