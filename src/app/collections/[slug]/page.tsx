import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/products";
import { CategoryFilters } from "@/components/category-filters";
import { categories, products, type CategorySlug } from "@/data/products";

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = categories.find((item) => item.slug === params.slug);
  return category
    ? { title: `${category.label} cakes`, description: category.description }
    : { title: "Collection not found" };
}

export default function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categories.find((item) => item.slug === params.slug);
  if (!category) notFound();
  const collection = products.filter((product) =>
    product.categories.includes(category.slug as CategorySlug),
  );
  return (
    <>
      <section className="page-hero page-hero--compact-mobile">
        <div className="section-wrap">
          <p className="eyebrow">Tina Bakers · {category.label}</p>
          <h1>{category.headline}</h1>
          <p className="section-copy">{category.description}</p>
        </div>
      </section>
      <section className="section-wrap py-10">
        <div className="mb-8">
          <CategoryFilters selected={category.slug} />
        </div>
        <ProductGrid products={collection} />
      </section>
    </>
  );
}
