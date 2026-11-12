"use client";

import Link from "next/link";
import { CakeSlice } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { CartLine } from "@/components/cart-line";

export default function CartPage() {
  const { items, hydrated } = useCart();
  if (!hydrated)
    return (
      <section className="section-wrap py-16" aria-live="polite">
        <p className="text-center text-sm text-[#746b70]">Loading your cart…</p>
      </section>
    );
  if (!items.length)
    return (
      <section className="section-wrap py-16">
        <div className="form-card mx-auto max-w-xl text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#f0e5d2] text-plum">
            <CakeSlice size={35} strokeWidth={1.2} />
          </span>
          <h1 className="mt-5 font-display text-3xl text-plum">
            Your cart looks a little empty 🎂
          </h1>
          <p className="mt-2 text-[#746b70]">
            There&apos;s room for something lovely, baked just for you.
          </p>
          <Link className="button button-plum mt-5" href="/shop">
            Shop cakes
          </Link>
        </div>
      </section>
    );
  return (
    <section className="section-wrap py-10 sm:py-14">
      <p className="eyebrow">Tina Bakers · Your order</p>
      <h1 className="mt-2 font-display text-4xl text-plum sm:text-5xl">
        Your cart.
      </h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_330px]">
        <div className="form-card">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-2xl text-plum">
              A good choice. Let’s confirm the details.
            </h2>
            <Link
              className="text-sm font-bold text-plum underline underline-offset-4"
              href="/shop"
            >
              Continue shopping
            </Link>
          </div>
          <div className="mt-3">
            {items.map((item) => (
              <CartLine item={item} key={item.id} />
            ))}
          </div>
        </div>
        <aside className="h-fit bg-[#f1eadb] p-5 lg:sticky lg:top-36">
          <h2 className="font-display text-2xl text-plum">Order summary</h2>
          <div className="summary-row mt-4">
            <span>Pricing</span>
            <strong className="text-plum">Confirmed on WhatsApp</strong>
          </div>
          <p className="mt-2 text-xs text-[#746b70]">
            Tina confirms the product price and delivery fee with you on WhatsApp before payment.
          </p>
          <Link className="button button-plum mt-5 w-full" href="/checkout">
            Proceed to checkout
          </Link>
          <p className="mt-3 text-center text-xs text-[#746b70]">
            No payment is collected on this website.
          </p>
        </aside>
      </div>
    </section>
  );
}
