"use client";

import { useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { flavors, sizes } from "@/data/products";
import { useCart } from "@/components/cart-context";
import { Badge, Button, Input } from "@/components/ui";
import { getLeadTimeMessage } from "@/lib/dates";
import { whatsappUrl } from "@/lib/utils";

export function ProductOptions({ product }: { product: Product }) {
  const isCake = product.optionType === "cake";
  const isQuote = product.optionType === "quote";
  const flavorOptions = product.flavorOptions ?? (isCake ? [...flavors] : []);
  const [size, setSize] = useState(isCake ? "6-inch" : "standard");
  const [flavor, setFlavor] = useState(
    flavorOptions[0] ?? (isCake ? "Vanilla" : "House recipe"),
  );
  const [message, setMessage] = useState("");
  const [instructions, setInstructions] = useState("");
  const { addItem, setDrawerOpen } = useCart();
  const selectedSize = sizes.find((option) => option.id === size);

  function handleAdd() {
    const sizeLabel = isCake && selectedSize
      ? selectedSize.label + " (" + selectedSize.detail + ")"
      : product.packLabel ?? "Standard order";
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
      unitPrice: 0,
      totalPrice: 0,
    });
    setDrawerOpen(true);
  }

  if (isQuote) {
    return (
      <div className="mt-7 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{product.categoryLabel}</Badge>
          <Badge className="handmade-badge">Made to order</Badge>
        </div>
        <p className="text-sm leading-7 text-[#716a63]">
          Share your date, guest count, preferred colours and an inspiration photo. Tina will confirm what is possible and provide a quote before you commit.
        </p>
        <a
          className="button button-primary w-full"
          href={whatsappUrl("Hi Tina Bakers, I would like a quote for a " + product.name + ". Please guide me on the details you need.")}
          target="_blank"
          rel="noreferrer"
        >
          Request a WhatsApp quote <ArrowUpRight size={17} />
        </a>
      </div>
    );
  }

  return (
    <div className="mt-7 flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{product.categoryLabel}</Badge>
        <Badge className="handmade-badge">Made in Meru</Badge>
      </div>

      {isCake && (
        <div>
          <p id="size-choice-label" className="text-sm font-bold text-plum">
            Choose your cake size
          </p>
          <p className="mt-1 text-xs text-[#746b70]">Portion estimates help you choose. Tina confirms the final size and price.</p>
          <div className="option-group mt-3" role="group" aria-labelledby="size-choice-label">
            {sizes.map((option) => (
              <button
                type="button"
                key={option.id}
                className="option-chip"
                aria-pressed={size === option.id}
                onClick={() => setSize(option.id)}
              >
                <strong>{option.label}</strong>
                <small>{option.detail}</small>
              </button>
            ))}
          </div>
        </div>
      )}

      {flavorOptions.length > 1 && (
        <div>
          <p id="flavour-choice-label" className="text-sm font-bold text-plum">Choose a flavour</p>
          <div className="option-group mt-3" role="group" aria-labelledby="flavour-choice-label">
            {flavorOptions.map((item) => (
              <button
                type="button"
                key={item}
                className="option-chip"
                aria-pressed={flavor === item}
                onClick={() => setFlavor(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="field-wrap">
        <label htmlFor="cake-message">Message on the cake <span className="font-normal text-[#8a837c]">(optional)</span></label>
        <Input
          id="cake-message"
          maxLength={80}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="e.g. Happy 10th Birthday, Nia!"
        />
      </div>

      <div className="field-wrap">
        <label htmlFor="special-instructions">Design notes <span className="font-normal text-[#8a837c]">(optional)</span></label>
        <textarea
          id="special-instructions"
          className="field-textarea"
          maxLength={500}
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          placeholder="Colours, decorations, allergies or anything Tina should know."
        />
      </div>

      <div className="price-confirmation">
        <strong>Price confirmed before payment</strong>
        <span>We’ll confirm the current price, availability and delivery fee with you on WhatsApp.</span>
      </div>

      <Button type="button" className="w-full" onClick={handleAdd}>
        <ShoppingBag size={17} />
        Add to order
      </Button>

      <p className="text-center text-xs text-[#746b70]">
        {getLeadTimeMessage(Boolean(product.custom))}
      </p>
      <p className="text-center text-xs text-[#746b70]">
        Prefer to talk it through?{" "}
        <a
          className="font-bold text-plum underline underline-offset-4"
          href={whatsappUrl("Hi Tina Bakers, I have a question about the " + product.name + ".")}
          target="_blank"
          rel="noreferrer"
        >
          Message Tina
        </a>
      </p>
    </div>
  );
}
