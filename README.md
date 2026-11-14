# Tina Bakers

A customer-facing storefront and WhatsApp ordering experience for Tina Bakers in Meru, Kenya. Built with Next.js 14 App Router, React 18, TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Static checks:

```bash
npm run typecheck
npm run lint
npm run build
```

The current storefront does not require environment variables. A database, online payment processing and admin order management are not yet implemented.

## Customer journey

- Browse the catalogue or an occasion collection.
- Choose cake size and flavour, select a pack, or request a quote for a custom/tiered design.
- Add a selection to the browser cart. Cart contents are stored in localStorage on that device and migrated from the previous cart key where possible.
- Enter contact and delivery preferences in checkout.
- Send the prepared order details to Tina Bakers on WhatsApp. The order is not confirmed until Tina replies and agrees availability, final pricing and delivery.

The site does not charge customers or save submitted orders on a server. The WhatsApp handoff is the current order-submission path. Delivery fees are confirmed directly with the bakery.

## Routes

- `/` — Homepage
- `/shop` — Product catalogue
- `/shop/[slug]` — Product detail and options
- `/collections/[slug]` — Birthday, wedding, graduation, cupcakes, pastries and corporate collections
- `/custom-cakes` — Custom cake inquiry
- `/about` — Bakery story and process
- `/contact` — Contact information and WhatsApp handoff
- `/cart` — Browser cart
- `/checkout` — Customer details, delivery and WhatsApp handoff
- `/policies` — Delivery, lead time, cancellations and allergy guidance

## Catalogue data and presentation assets

- Product data and ordering options live in `src/data/products.ts`.
- Exact product prices are intentionally unset until Tina supplies or approves a current price list. The storefront therefore asks customers to confirm current prices on WhatsApp rather than displaying unverified figures.
- Current external food photographs are Unsplash styling references, not Tina Bakers product photography. They are labelled as references in the storefront and should be replaced with owner-approved images before a public marketing launch.
- `public/tina-bakers-mark.svg` is an interim monogram mark created for the presentation refresh. It is not an extracted official Tina Bakers logo.
- Current visual palette: terracotta `#A45140`, honey `#D8AB67`, warm cream `#FBF7F1`, dark charcoal `#2D2925`. Typography remains Playfair Display and Plus Jakarta Sans.

## Business contact details

- Tina Bakers · Meru, Kenya 60200
- WhatsApp / Phone: 0790 187 080 · International: +254 790 187 080
- Instagram: [@tina.bakers](https://www.instagram.com/tina.bakers)
- Facebook: [Angelo Tina Bakers](https://www.facebook.com/angelotinabakers)

Public directory listings show inconsistent opening hours, so the website asks customers to confirm current opening hours before visiting.

## Deployment notes

- Project: Vercel `tina-bakery`
- Current canonical host: `https://tina-bakery.vercel.app`
- `src/app/sitemap.ts` generates the product, collection and core-page sitemap.
- `src/app/robots.ts` publishes crawler rules.
- Root metadata includes Bakery structured data with business contact details and social links.

The default Vercel domains are protected by Vercel SSO in the current project settings. A public custom domain or explicit access-setting change is required before external customers can use the site without sign-in.
