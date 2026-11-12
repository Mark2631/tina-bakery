"use client";

import { useRef, useState } from "react";
import { CakeSlice } from "lucide-react";
import type { Product } from "@/data/products";

const views = [
  "Front finish",
  "A little detail",
  "Made to order",
  "Freshly baked",
];

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  function handleSwipe(endX: number) {
    if (touchStart.current === null) return;
    const distance = endX - touchStart.current;
    if (Math.abs(distance) > 48)
      setActive(
        (current) =>
          (current + (distance < 0 ? 1 : views.length - 1)) % views.length,
      );
    touchStart.current = null;
  }

  return (
    <div role="group" aria-label={`${product.name} product gallery`}>
      <div
        className="gallery-main"
        data-tone={product.accent}
        role="img"
        aria-label={`${product.name}, illustrative colour study; final decoration is discussed with Tina Bakers`}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) =>
          handleSwipe(event.changedTouches[0]?.clientX ?? 0)
        }
      >
        <div className="text-center">
          <span className="art-stamp mx-auto !size-24">
            <CakeSlice size={40} strokeWidth={1.15} />
          </span>
          <p
            className="mt-5 font-display text-2xl text-plum"
            aria-live="polite"
          >
            {views[active]}
          </p>
          <p className="mt-1 text-xs text-[#746b70]">
            Illustrative colour study · actual decoration may vary
          </p>
        </div>
      </div>
      <div
        className="gallery-thumbs"
        role="group"
        aria-label="Choose product gallery view"
      >
        {views.slice(0, 3).map((view, index) => (
          <button
            key={view}
            type="button"
            className="gallery-thumb"
            data-tone={product.accent}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            aria-label={`Show ${view}`}
          >
            <CakeSlice size={22} strokeWidth={1.3} />
            <span className="sr-only">{view}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
