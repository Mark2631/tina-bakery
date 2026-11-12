"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemData } from "@/components/cart-context";
import { useCart } from "@/components/cart-context";
import { products } from "@/data/products";

export function QuantitySelector({
  name,
  quantity,
  onChange,
}: {
  name: string;
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="qty-control" role="group" aria-label={`Quantity for ${name}`}>
      <button type="button" aria-label={`Decrease quantity of ${name}`} disabled={quantity <= 1} onClick={() => onChange(quantity - 1)}>
        <Minus size={14} />
      </button>
      <output aria-live="polite" aria-label={`Quantity of ${name}`}>{quantity}</output>
      <button type="button" aria-label={`Increase quantity of ${name}`} disabled={quantity >= 99} onClick={() => onChange(quantity + 1)}>
        <Plus size={14} />
      </button>
    </div>
  );
}

export function CartItem({
  item,
  compact = false,
}: {
  item: CartItemData;
  compact?: boolean;
}) {
  const { updateQuantity, removeItem } = useCart();
  const product = products.find((entry) => entry.id === item.productId);
  const productHref = product ? `/shop/${product.slug}` : "/shop";

  return (
    <article className="cart-line">
      <Link href={productHref} className="cart-line-art" aria-label={`View ${item.name}`}>
        {product ? (
          <Image src={product.imageUrl} alt="" fill unoptimized sizes="96px" className="cart-line-photo" />
        ) : (
          <span className="font-display text-2xl" aria-hidden="true">T</span>
        )}
      </Link>
      <div className="min-w-0">
        <Link href={productHref} className="font-display text-lg leading-tight text-plum">
          {item.name}
        </Link>
        <p className="mt-1 text-xs text-[#746b70]">
          {item.sizeLabel}{item.flavor && item.flavor !== "House recipe" ? " · " + item.flavor : ""}
        </p>
        {item.message && <p className="mt-1 truncate text-xs text-[#746b70]">Cake message: {item.message}</p>}
        {item.specialInstructions && !compact && <p className="mt-1 text-xs text-[#746b70]">Note: {item.specialInstructions}</p>}
        <div className="mt-2">
          <QuantitySelector name={item.name} quantity={item.quantity} onChange={(quantity) => updateQuantity(item.id, quantity)} />
        </div>
      </div>
      <div className="flex max-w-[108px] flex-col items-end gap-2 text-right">
        <strong className="text-xs leading-5 text-plum">Price on WhatsApp</strong>
        <button type="button" className="text-[#8a6f73] hover:text-red-700" aria-label={`Remove ${item.name} from cart`} onClick={() => removeItem(item.id)}>
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}

export const CartLine = CartItem;
