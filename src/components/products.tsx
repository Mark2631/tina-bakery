import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { Badge } from "@/components/ui";
import { PriceDisplay } from "@/components/price-display";

export function ProductArtwork({
  product,
  className = "",
}: {
  product: Pick<Product, "name" | "accent" | "imageUrl">;
  className?: string;
}) {
  return (
    <div className={`product-art ${className}`} data-tone={product.accent}>
      <Image
        src={product.imageUrl}
        alt={product.name + " style reference"}
        fill
        unoptimized
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
        className="product-art-image"
      />
      <span className="product-art-note">Style reference</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card group">
      <Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
        <ProductArtwork product={product} />
        <div className="product-card-copy">
          <Badge>{product.categoryLabel}</Badge>
          <h3 className="product-card-name">{product.name}</h3>
          <PriceDisplay amount={product.basePrice} className="product-card-price" />
          <p className="product-card-detail">{product.servings}</p>
        </div>
      </Link>
      <div className="product-card-actions">
        <Link className="button button-outline w-full text-sm" href={`/shop/${product.slug}`}>
          Choose options <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  emptyMessage = "We’re preparing this collection. Please check back soon.",
}: {
  products: Product[];
  emptyMessage?: string;
}) {
  if (!products.length)
    return (
      <div className="border border-dashed border-plum/20 bg-white/60 p-10 text-center">
        <Sparkles className="mx-auto text-caramel" />
        <p className="mt-3 font-display text-xl text-plum">{emptyMessage}</p>
      </div>
    );
  return (
    <div className="product-grid">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}
