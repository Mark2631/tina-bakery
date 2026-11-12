"use client";

import { useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { flavors, sizes } from "@/data/products";
import { useCart } from "@/components/cart-context";
import { Badge, Button, Input } from "@/components/ui";
import { PriceDisplay } from "@/components/price-display";
import { getLeadTimeMessage } from "@/lib/dates";
import { whatsappUrl } from "@/lib/utils";

export function ProductOptions({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [flavor, setFlavor] = useState("");
  const [message, setMessage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [attempted, setAttempted] = useState(false);
  const { addItem, setDrawerOpen } = useCart();
  const selectedSize = sizes.find((option) => option.id === size);
  const tiered = size === "tiered";
  const price = product.basePrice + (selectedSize?.addition ?? 0);
  const leadTime = product.custom || tiered;

  function handleAdd() {
    setAttempted(true);
    if (!size || !flavor || tiered) {
      if (!tiered)
        requestAnimationFrame(() =>
          document
            .querySelector<HTMLElement>(
              '[data-invalid="true"], [aria-invalid="true"]',
            )
            ?.scrollIntoView({ behavior: "smooth", block: "center" }),
        );
      return;
    }
    const sizeLabel = selectedSize
      ? `${selectedSize.label} (${selectedSize.detail})`
      : "";
    const id = [
      product.id,
      size,
      flavor,
      message.trim(),
      instructions.trim(),
    ].join("_");
    addItem({
      id,
      productId: product.id,
      name: product.name,
      size,
      sizeLabel,
      flavor,
      message: message.trim(),
      specialInstructions: instructions.trim(),
      quantity: 1,
      unitPrice: price,
      totalPrice: price,
    });
    setDrawerOpen(true);
    setAttempted(false);
  }

  return (
    <div className="mt-7 flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{product.categoryLabel}</Badge>
        <Badge className="handmade-badge">Handmade in Meru</Badge>
      </div>
      <div>
        <p id="size-choice-label" className="text-sm font-bold text-plum">
          Choose a size <span className="text-[#746b70]">(required)</span>
        </p>
        <p className="mt-1 text-xs text-[#746b70]">
          Select the size that suits your table.
        </p>
        <div
          className="option-group mt-3"
          role="group"
          aria-labelledby="size-choice-label"
        >
          {sizes.map((option) => (
            <button
              type="button"
              key={option.id}
              className="option-chip"
              data-invalid={attempted && !size}
              aria-pressed={size === option.id}
              onClick={() => setSize(option.id)}
            >
              <strong>{option.label}</strong>
              <small>{option.detail}</small>
            </button>
          ))}
        </div>
        {attempted && !size && (
          <p className="error-message mt-2" role="alert">
            Please choose a size.
          </p>
        )}
      </div>
      <div>
        <p id="flavour-choice-label" className="text-sm font-bold text-plum">
          Choose a flavor <span className="text-[#746b70]">(required)</span>
        </p>
        <div
          className="option-group mt-3"
          role="group"
          aria-labelledby="flavour-choice-label"
        >
          {flavors.map((item) => (
            <button
              type="button"
              key={item}
              className="option-chip"
              data-invalid={attempted && !flavor}
              aria-pressed={flavor === item}
              onClick={() => setFlavor(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {attempted && !flavor && (
          <p className="error-message mt-2" role="alert">
            Please choose a flavor.
          </p>
        )}
      </div>
      <div className="field-wrap">
        <label htmlFor="cake-message">What should we write on the cake?</label>
        <Input
          id="cake-message"
          maxLength={80}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="e.g. Happy 10th Birthday, Nia!"
        />
        <span className="text-xs text-[#746b70]">
          Optional · up to 80 characters
        </span>
      </div>
      <div className="field-wrap">
        <label htmlFor="special-instructions">Special instructions</label>
        <textarea
          id="special-instructions"
          className="field-textarea"
          maxLength={500}
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          placeholder="Tell us about colours, decorations, or anything we should know."
        />
      </div>
      <p className="border-l-2 border-gold bg-[#f1eadb] px-4 py-3 text-sm text-[#625660]">
        {getLeadTimeMessage(leadTime)}
      </p>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        {tiered ? (
          <p className="price-display text-base">Contact for a quote</p>
        ) : selectedSize ? (
          <PriceDisplay
            amount={price}
            prefix=""
            detail={`for ${selectedSize.label}`}
            className="!text-base"
          />
        ) : (
          <p className="text-sm text-[#746b70]">Choose a size to see the price.</p>
        )}
      </div>
      {tiered ? (
        <a
          className="button button-gold w-full"
          href={whatsappUrl("Hi, I'd like a tiered cake quote")}
          target="_blank"
          rel="noreferrer"
        >
          Get a WhatsApp quote <ArrowUpRight size={17} />
        </a>
      ) : (
        <Button type="button" className="w-full" onClick={handleAdd}>
          <ShoppingBag size={17} />
          Add to cart
        </Button>
      )}
      <p className="text-center text-xs text-[#746b70]">
        Prefer to talk it through?{" "}
        <a
          className="font-bold text-plum underline underline-offset-4"
          href={whatsappUrl(
            `Hi Tina Bakers, I have a question about the ${product.name}.`,
          )}
          target="_blank"
          rel="noreferrer"
        >
          Order directly via WhatsApp
        </a>
      </p>
    </div>
  );
}
