"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flavors, products, sizes } from "@/data/products";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  size: string;
  sizeLabel: string;
  flavor: string;
  message: string;
  specialInstructions: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type CartState = { items: CartItem[] };
type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR_CART" };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const addition = Math.max(
        1,
        Math.min(99, Math.floor(action.item.quantity)),
      );
      const existing = state.items.find((item) => item.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.item.id
              ? {
                  ...item,
                  quantity: Math.min(99, item.quantity + addition),
                  totalPrice:
                    Math.min(99, item.quantity + addition) * item.unitPrice,
                }
              : item,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            ...action.item,
            quantity: addition,
            totalPrice: action.item.unitPrice * addition,
          },
        ],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.id) };
    case "UPDATE_QUANTITY": {
      const quantity = Number.isFinite(action.quantity)
        ? Math.max(1, Math.min(99, Math.floor(action.quantity)))
        : 1;
      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
            : item,
        ),
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const STORAGE_KEY = "tina-bakers-cart-v1";

function restoreCartItem(value: unknown): CartItem | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<CartItem>;
  const product = products.find((entry) => entry.id === item.productId);
  const size = sizes.find(
    (entry) => entry.id === item.size && entry.id !== "tiered",
  );
  const validFlavor = flavors.includes(item.flavor as (typeof flavors)[number]);
  if (
    !product ||
    !size ||
    !validFlavor ||
    typeof item.id !== "string" ||
    !Number.isFinite(item.quantity) ||
    !Number.isFinite(item.unitPrice)
  )
    return null;
  const quantity = Math.max(
    1,
    Math.min(99, Math.floor(item.quantity as number)),
  );
  const unitPrice = product.basePrice + size.addition;
  const message =
    typeof item.message === "string" ? item.message.slice(0, 80) : "";
  const specialInstructions =
    typeof item.specialInstructions === "string"
      ? item.specialInstructions.slice(0, 500)
      : "";
  return {
    id: [product.id, size.id, item.flavor, message, specialInstructions].join(
      "_",
    ),
    productId: product.id,
    name: product.name,
    size: size.id,
    sizeLabel: `${size.label} (${size.detail})`,
    flavor: item.flavor as string,
    message,
    specialInstructions,
    quantity,
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const restoredRef = useRef(false);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (
          parsed &&
          typeof parsed === "object" &&
          "items" in parsed &&
          Array.isArray(parsed.items)
        ) {
          parsed.items
            .map(restoreCartItem)
            .filter((item): item is CartItem => item !== null)
            .forEach((item) => dispatch({ type: "ADD_ITEM", item }));
        }
      }
    } catch {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* Storage may be unavailable in private browsing. */
      }
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* The cart remains usable for this session when storage is unavailable. */
    }
  }, [hydrated, state]);

  const addItem = useCallback(
    (item: CartItem) => dispatch({ type: "ADD_ITEM", item }),
    [],
  );
  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE_ITEM", id }),
    [],
  );
  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", id, quantity }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const value = useMemo(
    () => ({
      items: state.items,
      count: state.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: state.items.reduce((sum, item) => sum + item.totalPrice, 0),
      hydrated,
      drawerOpen,
      setDrawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      state.items,
      hydrated,
      drawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
