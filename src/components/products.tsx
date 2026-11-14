import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { PriceDisplay } from "@/components/price-display";

export function ProductArtwork({
  product,
  className = "",
}: {
  product: Pick<Product, "name" | "accent" | "imageUrl">;
  className?: string;
}) {
  return (
    <div className={"product-art " + className} data-tone={product.accent}>
      <Image
        src={product.imageUrl}
        alt={product.name + " styling reference"}
        fill
        unoptimized
        sizes="(max-width: 640px) 48vw, (max-width: 1024px) 45vw, 25vw"
        className="product-art-image"
      />
      <span className="product-art-note">Style inspiration</span>
      <span className="product-art-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={"/shop/" + product.slug} className="product-card-main" aria-label={"View " + product.name}>
        <ProductArtwork product={product} />
        <div className="product-card-copy">
          <div className="product-card-topline">
            <span className="product-card-category">{product.categoryLabel}</span>
            {product.custom ? <span className="product-card-custom">Made to order</span> : null}
          </div>
          <h3 className="product-card-name">{product.name}</h3>
          <PriceDisplay amount={product.basePrice} className="product-card-price" />
        </div>
      </Link>
      <Link className="product-card-action" href={"/shop/" + product.slug}>
        {product.basePrice === null ? "Ask for a quote" : "Choose this cake"}
        <ArrowUpRight size={16} />
      </Link>
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
  if (!products.length) {
    return (
      <div className="empty-collection">
        <p>{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div className="product-grid">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}
