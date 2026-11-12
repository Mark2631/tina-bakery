import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";

const siteUrl = "https://tina-bakery.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/custom-cakes",
    "/about",
    "/contact",
    "/policies",
  ];
  return [
    ...staticRoutes.map((route) => ({
      url: siteUrl + route,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/shop" ? 0.9 : 0.6,
    })),
    ...categories.map((category) => ({
      url: siteUrl + "/collections/" + category.slug,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: siteUrl + "/shop/" + product.slug,
      changeFrequency: "monthly" as const,
      priority: product.featured ? 0.8 : 0.6,
    })),
  ];
}
