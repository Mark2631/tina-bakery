"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui";

const categories = [
  { slug: "all", label: "All" },
  { slug: "birthday", label: "Birthday" },
  { slug: "wedding", label: "Wedding" },
  { slug: "graduation", label: "Graduation" },
  { slug: "cupcakes", label: "Cupcakes" },
  { slug: "pastries", label: "Pastries" },
  { slug: "snacks", label: "Gifts & snacks" },
  { slug: "corporate", label: "Corporate" },
];

export function CategoryFilters({ selected = "all" }: { selected?: string }) {
  const router = useRouter();
  const active = categories.some((category) => category.slug === selected)
    ? selected
    : "all";

  function navigate(slug: string) {
    router.push(slug === "all" ? "/shop" : `/collections/${slug}`);
  }

  return (
    <div className="mb-8" role="group" aria-label="Filter products by category">
      <nav
        className="filter-row category-filter-links"
        aria-label="Product categories"
      >
        {categories.map((category) => (
          <Link
            className="filter-link"
            key={category.slug}
            href={
              category.slug === "all"
                ? "/shop"
                : `/collections/${category.slug}`
            }
            aria-current={active === category.slug ? "page" : undefined}
          >
            {category.label}
          </Link>
        ))}
      </nav>
      <label className="category-filter-select">
        <span className="sr-only">Filter products by category</span>
        <Select
          value={active}
          onChange={(event) => navigate(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </Select>
      </label>
    </div>
  );
}
