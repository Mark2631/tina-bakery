export type CategorySlug =
  | "birthday"
  | "wedding"
  | "graduation"
  | "cupcakes"
  | "pastries"
  | "corporate";

export type ProductOptionType = "cake" | "pack" | "quote";

export type Product = {
  id: string;
  slug: string;
  name: string;
  categories: CategorySlug[];
  categoryLabel: string;
  basePrice: number | null;
  description: string;
  servings: string;
  imageUrl: string;
  optionType: ProductOptionType;
  packLabel?: string;
  flavorOptions?: string[];
  featured?: boolean;
  custom?: boolean;
  accent: "rose" | "cocoa" | "honey" | "berry" | "sage" | "cream";
};

// DEMO-ONLY estimates, not Tina Bakers' verified menu prices. Confirm all figures with the owner before launch.
export const products: Product[] = [
  {
    id: "classic-birthday",
    slug: "classic-birthday-cake",
    name: "Classic Birthday Cake",
    categories: ["birthday"],
    categoryLabel: "Birthday",
    basePrice: 2400,
    description: "A soft celebration sponge with a smooth buttercream finish, personalised for the day you have in mind.",
    servings: "6–8",
    imageUrl: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=85",
    optionType: "cake",
    featured: true,
    accent: "honey",
  },
  {
    id: "chocolate-fudge",
    slug: "chocolate-fudge-cake",
    name: "Chocolate Fudge Cake",
    categories: ["birthday"],
    categoryLabel: "Birthday",
    basePrice: 2900,
    description: "Deep cocoa layers and a rich chocolate finish for the chocolate lover at your table.",
    servings: "6–8",
    imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=85",
    optionType: "cake",
    featured: true,
    accent: "cocoa",
  },
  {
    id: "black-forest",
    slug: "black-forest-cake",
    name: "Black Forest Cake",
    categories: ["birthday"],
    categoryLabel: "Birthday",
    basePrice: 2800,
    description: "Chocolate sponge, cream and cherry notes in a timeless celebration cake.",
    servings: "6–8",
    imageUrl: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?auto=format&fit=crop&w=1200&q=85",
    optionType: "cake",
    featured: true,
    accent: "berry",
  },
  {
    id: "red-velvet",
    slug: "red-velvet-cake",
    name: "Red Velvet Cake",
    categories: ["birthday", "wedding"],
    categoryLabel: "Birthday · Wedding",
    basePrice: 3000,
    description: "A gently cocoa-kissed crumb with a smooth, elegant finish for a special table.",
    servings: "6–8",
    imageUrl: "https://images.unsplash.com/photo-1568827999250-3f6afff96e66?auto=format&fit=crop&w=1200&q=85",
    optionType: "cake",
    featured: true,
    accent: "rose",
  },
  {
    id: "graduation",
    slug: "graduation-cake",
    name: "Graduation Cake",
    categories: ["graduation"],
    categoryLabel: "Graduation",
    basePrice: 3500,
    description: "A made-to-order centrepiece for the hard work, the big day and everyone who helped you get there.",
    servings: "10–12",
    imageUrl: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1200&q=85",
    optionType: "cake",
    accent: "sage",
  },
  {
    id: "tiered-wedding",
    slug: "tiered-wedding-cake",
    name: "Tiered Wedding Cake",
    categories: ["wedding"],
    categoryLabel: "Wedding",
    basePrice: null,
    description: "A statement centrepiece planned around your guest count, colours and celebration.",
    servings: "Custom",
    imageUrl: "https://images.unsplash.com/photo-1542007920-992d2c424d09?auto=format&fit=crop&w=1200&q=85",
    optionType: "quote",
    custom: true,
    accent: "cream",
  },
  {
    id: "carrot-walnut",
    slug: "carrot-walnut-cake",
    name: "Carrot & Walnut Cake",
    categories: ["pastries"],
    categoryLabel: "Pastries",
    basePrice: 2500,
    description: "A comforting, gently spiced bake with carrot and walnut, made for tea time and thoughtful gifting.",
    servings: "Whole cake",
    imageUrl: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?auto=format&fit=crop&w=1200&q=85",
    optionType: "pack",
    packLabel: "Whole cake",
    accent: "honey",
  },
  {
    id: "vanilla-cupcakes",
    slug: "vanilla-cupcakes-6-pack",
    name: "Vanilla Cupcakes",
    categories: ["cupcakes"],
    categoryLabel: "Cupcakes",
    basePrice: 1200,
    description: "A box of soft vanilla cupcakes finished with a smooth buttercream swirl.",
    servings: "6 cupcakes",
    imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=85",
    optionType: "pack",
    packLabel: "Box of 6",
    flavorOptions: ["Vanilla", "Chocolate"],
    accent: "cream",
  },
  {
    id: "chocolate-cupcakes",
    slug: "chocolate-cupcakes-6-pack",
    name: "Chocolate Cupcakes",
    categories: ["cupcakes"],
    categoryLabel: "Cupcakes",
    basePrice: 1400,
    description: "A box of rich chocolate cupcakes, baked for sharing at home or at the office.",
    servings: "6 cupcakes",
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=85",
    optionType: "pack",
    packLabel: "Box of 6",
    flavorOptions: ["Chocolate", "Vanilla"],
    accent: "cocoa",
  },
  {
    id: "assorted-cupcakes",
    slug: "assorted-cupcakes-12-pack",
    name: "Assorted Cupcakes",
    categories: ["cupcakes"],
    categoryLabel: "Cupcakes",
    basePrice: 2200,
    description: "A mixed box for celebrations, team treats and a little something for everyone.",
    servings: "12 cupcakes",
    imageUrl: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1200&q=85",
    optionType: "pack",
    packLabel: "Box of 12",
    flavorOptions: ["Assorted"],
    accent: "rose",
  },
  {
    id: "fruit-cake",
    slug: "fruit-cake",
    name: "Fruit Cake",
    categories: ["pastries"],
    categoryLabel: "Pastries",
    basePrice: 2600,
    description: "A generous, comforting fruit cake for visits, gifting and a good cup of tea.",
    servings: "Whole cake",
    imageUrl: "https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?auto=format&fit=crop&w=1200&q=85",
    optionType: "pack",
    packLabel: "Whole cake",
    accent: "sage",
  },
  {
    id: "corporate-logo",
    slug: "corporate-logo-cake",
    name: "Corporate & Branded Cake",
    categories: ["corporate"],
    categoryLabel: "Corporate",
    basePrice: null,
    description: "A cake for a team milestone, launch or client gathering, designed around your brand.",
    servings: "Custom",
    imageUrl: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1200&q=85",
    optionType: "quote",
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
  { slug: "birthday", label: "Birthday", description: "A cake made for candle wishes, shared laughter and that first slice.", headline: "Make a wish. We’ll bake the cake." },
  { slug: "wedding", label: "Wedding", description: "Thoughtful, handmade cakes for the day you’ll remember together.", headline: "A little sweetness for your forever." },
  { slug: "graduation", label: "Graduation", description: "Celebrate every late night, every step and the people who cheered you on.", headline: "For the milestone you worked for." },
  { slug: "cupcakes", label: "Cupcakes", description: "Small-batch cupcakes, baked fresh and ready to pass around.", headline: "Little cakes. Big reasons to celebrate." },
  { slug: "pastries", label: "Pastries", description: "Comforting bakes for tea time, thoughtful gifting and everyday moments.", headline: "Something lovely for the table." },
  { slug: "corporate", label: "Corporate", description: "Made-to-order cakes and cupcakes for teams, launches and client moments.", headline: "A thoughtful centrepiece for your team." },
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
  { id: "8-inch", label: '8"', detail: "Feeds 10–12", addition: 900 },
  { id: "10-inch", label: '10"', detail: "Feeds 16–20", addition: 1800 },
] as const;

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const formatPrice = (amount: number) =>
  `KSh ${amount.toLocaleString("en-KE")}`;
