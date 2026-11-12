export type CategorySlug =
  | "birthday"
  | "wedding"
  | "graduation"
  | "cupcakes"
  | "pastries"
  | "corporate";

export type Product = {
  id: string;
  slug: string;
  name: string;
  categories: CategorySlug[];
  categoryLabel: string;
  basePrice: number;
  description: string;
  servings: string;
  featured?: boolean;
  custom?: boolean;
  accent: "rose" | "cocoa" | "honey" | "berry" | "sage" | "cream";
};

export const products: Product[] = [
  {
    id: "classic-birthday",
    slug: "classic-birthday-cake",
    name: "Classic Birthday Cake",
    categories: ["birthday"],
    categoryLabel: "Birthday",
    basePrice: 2500,
    description:
      "A tender vanilla sponge, softly finished with buttercream and made for candles, wishes, and one more slice.",
    servings: "6–8",
    featured: true,
    accent: "honey",
  },
  {
    id: "chocolate-fudge",
    slug: "chocolate-fudge-cake",
    name: "Chocolate Fudge Cake",
    categories: ["birthday"],
    categoryLabel: "Birthday",
    basePrice: 3000,
    description:
      "Deep cocoa layers with a generous chocolate finish. A lovely centrepiece for any chocolate lover.",
    servings: "6–8",
    featured: true,
    accent: "cocoa",
  },
  {
    id: "black-forest",
    slug: "black-forest-cake",
    name: "Black Forest Cake",
    categories: ["birthday"],
    categoryLabel: "Birthday",
    basePrice: 3400,
    description:
      "Chocolate sponge, cream, and cherry notes come together in a timeless celebration cake.",
    servings: "6–8",
    featured: true,
    accent: "berry",
  },
  {
    id: "red-velvet",
    slug: "red-velvet-cake",
    name: "Red Velvet Cake",
    categories: ["birthday", "wedding"],
    categoryLabel: "Birthday · Wedding",
    basePrice: 3200,
    description:
      "A soft, gently cocoa-kissed crumb with a smooth cream cheese-style finish for a special table.",
    servings: "6–8",
    featured: true,
    accent: "rose",
  },
  {
    id: "graduation",
    slug: "graduation-cake",
    name: "Graduation Cake",
    categories: ["graduation"],
    categoryLabel: "Graduation",
    basePrice: 4000,
    description:
      "A made-to-order cake to celebrate the hard work, the big day, and everyone who helped you get there.",
    servings: "10–12",
    accent: "sage",
  },
  {
    id: "tiered-wedding",
    slug: "tiered-wedding-cake",
    name: "Tiered Wedding Cake",
    categories: ["wedding"],
    categoryLabel: "Wedding",
    basePrice: 15000,
    description:
      "A graceful centrepiece, planned with you and baked by hand for your wedding celebration.",
    servings: "Custom",
    custom: true,
    accent: "cream",
  },
  {
    id: "carrot-walnut",
    slug: "carrot-walnut-cake",
    name: "Carrot & Walnut Cake",
    categories: ["pastries"],
    categoryLabel: "Pastries",
    basePrice: 2800,
    description:
      "Warm spice, carrot, and walnut in a soft cake made for a slow afternoon and a cup of tea.",
    servings: "6–8",
    accent: "honey",
  },
  {
    id: "vanilla-cupcakes",
    slug: "vanilla-cupcakes-6-pack",
    name: "Vanilla Cupcakes (6 pack)",
    categories: ["cupcakes"],
    categoryLabel: "Cupcakes",
    basePrice: 1000,
    description:
      "Six tender vanilla cupcakes, finished with a swirl of smooth buttercream.",
    servings: "6 cupcakes",
    accent: "cream",
  },
  {
    id: "chocolate-cupcakes",
    slug: "chocolate-cupcakes-6-pack",
    name: "Chocolate Cupcakes (6 pack)",
    categories: ["cupcakes"],
    categoryLabel: "Cupcakes",
    basePrice: 1200,
    description:
      "Six rich chocolate cupcakes, baked in small batches and ready to share.",
    servings: "6 cupcakes",
    accent: "cocoa",
  },
  {
    id: "assorted-cupcakes",
    slug: "assorted-cupcakes-12-pack",
    name: "Assorted Cupcakes (12 pack)",
    categories: ["cupcakes"],
    categoryLabel: "Cupcakes",
    basePrice: 2200,
    description:
      "A dozen assorted cupcakes for sharing around the table, at the office, or on the road.",
    servings: "12 cupcakes",
    accent: "rose",
  },
  {
    id: "fruit-cake",
    slug: "fruit-cake",
    name: "Fruit Cake",
    categories: ["pastries"],
    categoryLabel: "Pastries",
    basePrice: 2600,
    description:
      "A comforting fruit cake with a generous crumb, made for visits, gifting, and tea time.",
    servings: "6–8",
    accent: "sage",
  },
  {
    id: "corporate-logo",
    slug: "corporate-logo-cake",
    name: "Corporate Logo Cake",
    categories: ["corporate"],
    categoryLabel: "Corporate",
    basePrice: 5500,
    description:
      "A polished cake for a team milestone or client gathering, with your preferred design discussed on WhatsApp.",
    servings: "10–12",
    custom: true,
    accent: "cream",
  },
];

export const categories: {
  slug: CategorySlug;
  label: string;
  description: string;
  headline: string;
}[] = [
  {
    slug: "birthday",
    label: "Birthday",
    description:
      "A cake made for candle wishes, shared laughter, and that first slice.",
    headline: "Make a wish. We’ll bake the cake.",
  },
  {
    slug: "wedding",
    label: "Wedding",
    description:
      "Thoughtful, handmade cakes for the day you’ll remember together.",
    headline: "A little sweetness for your forever.",
  },
  {
    slug: "graduation",
    label: "Graduation",
    description:
      "Celebrate every late night, every step, and the people who cheered you on.",
    headline: "For the milestone you worked for.",
  },
  {
    slug: "cupcakes",
    label: "Cupcakes",
    description: "Small-batch cupcakes, baked fresh and ready to pass around.",
    headline: "Little cakes. Big reasons to celebrate.",
  },
  {
    slug: "pastries",
    label: "Pastries",
    description:
      "Comforting bakes for tea time, thoughtful gifting, and everyday moments.",
    headline: "Something lovely for the table.",
  },
  {
    slug: "corporate",
    label: "Corporate",
    description:
      "Made-to-order cakes and cupcakes for teams, launches, and client moments.",
    headline: "A thoughtful centrepiece for your team.",
  },
];

export const flavors = [
  "Vanilla",
  "Chocolate",
  "Red Velvet",
  "Lemon",
  "Carrot & Walnut",
  "Black Forest",
] as const;
export const sizes = [
  { id: "6-inch", label: '6"', detail: "Feeds 6–8", addition: 0 },
  { id: "8-inch", label: '8"', detail: "Feeds 10–12", addition: 400 },
  { id: "10-inch", label: '10"', detail: "Feeds 16–20", addition: 1000 },
  { id: "tiered", label: "Tiered", detail: "Custom quote", addition: 0 },
] as const;

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
export const formatPrice = (amount: number) =>
  `KSh ${amount.toLocaleString("en-KE")}`;
