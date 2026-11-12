import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { ProductGallery } from "@/components/product-gallery";
import { ProductOptions } from "@/components/product-options";
import { products, getProductBySlug } from "@/data/products";
import { PriceDisplay } from "@/components/price-display";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  return product
    ? { title: product.name, description: product.description }
    : { title: "Cake not found" };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.categories.some((category) =>
          product.categories.includes(category),
        ),
    )
    .slice(0, 4);
  return (
    <>
      <div className="section-wrap py-5 text-xs text-[#746b70]">
        <Link href="/shop" className="hover:text-plum">
          Shop
        </Link>
        <ChevronRight className="mx-1 inline" size={13} />
        {product.name}
      </div>
      <section className="section-wrap pb-16 pt-2">
        <div className="detail-grid">
          <ProductGallery product={product} />
          <div>
            <p className="eyebrow">Baked to order in Meru</p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-plum sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-[#746b70]">{product.description}</p>
            <PriceDisplay
              amount={product.basePrice}
              className="mt-4 text-2xl"
            />
            <ProductOptions product={product} />
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section-space bg-[#f1eadb]">
          <div className="section-wrap">
            <p className="eyebrow">You might also like</p>
            <h2 className="section-heading mt-2 mb-8">
              More to celebrate with.
            </h2>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
