import type { Metadata } from "next";
import { ProductGrid } from "@/components/products";
import { CategoryFilters } from "@/components/category-filters";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop cakes & bakes",
  description:
    "Browse handmade celebration cakes, cupcakes, and pastries from Tina Bakers in Meru.",
};

export default function ShopPage() {
  return (
    <>
      <section className="page-hero page-hero--compact-mobile">
        <div className="section-wrap">
          <p className="eyebrow">The Tina Bakers menu</p>
          <h1>Something lovely for the table.</h1>
          <p className="section-copy">
            Small-batch cakes and bakes, made by our team in Meru. Choose a
            favourite, then tell us how you&apos;d like it.
          </p>
        </div>
      </section>
      <section className="section-wrap py-10">
        <div className="mb-8">
          <CategoryFilters selected="all" />
        </div>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
