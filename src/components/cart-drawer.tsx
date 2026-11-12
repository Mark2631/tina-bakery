"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { Sheet } from "@/components/ui";
import { CartLine } from "@/components/cart-line";
import { CakeSlice, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, hydrated } = useCart();
  return (
    <Sheet
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
      title={`Your cart${items.length ? ` (${items.length})` : ""}`}
    >
      {!hydrated ? (
        <div
          className="flex flex-1 items-center justify-center py-10 text-sm text-[#746b70]"
          aria-live="polite"
        >
          Loading your cart…
        </div>
      ) : items.length ? (
        <>
          <div className="flex-1 overflow-y-auto py-3">
            <div className="cart-lines">
              {items.map((item) => (
                <CartLine item={item} key={item.id} compact />
              ))}
            </div>
          </div>
          <div className="border-t border-plum/15 pt-4">
            <div className="summary-row text-sm">
              <span>Pricing</span>
              <strong className="text-plum">Confirmed on WhatsApp</strong>
            </div>
            <p className="text-xs text-[#746b70]">
              Tina confirms the current price, availability and delivery fee before you pay.
            </p>
            <Link
              className="button button-plum mt-4 w-full"
              href="/checkout"
              onClick={() => setDrawerOpen(false)}
            >
              Checkout <ShoppingBag size={17} />
            </Link>
            <Link
              className="mt-3 block text-center text-sm font-bold text-plum underline underline-offset-4"
              href="/cart"
              onClick={() => setDrawerOpen(false)}
            >
              View full cart
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <span className="mb-4 grid size-20 place-items-center rounded-full bg-[#f0e5d2] text-plum">
            <CakeSlice size={34} strokeWidth={1.2} />
          </span>
          <h3 className="font-display text-2xl text-plum">
            Your cart looks a little empty 🎂
          </h3>
          <p className="mt-2 max-w-xs text-sm text-[#746b70]">
            Choose a cake and tell us how you’d like it made.
          </p>
          <Link
            className="button button-plum mt-5"
            href="/shop"
            onClick={() => setDrawerOpen(false)}
          >
            Browse the cakes
          </Link>
        </div>
      )}
    </Sheet>
  );
}
