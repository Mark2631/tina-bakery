# Tina Bakers

A customer-facing storefront for Tina Bakers, an artisan bakery in Meru, Kenya. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Getting started

- Install dependencies with `npm install`.
- Start the development server with `npm run dev`.
- Run static checks with `npm run lint` and `npm run typecheck`.

The storefront requires no environment variables. It does not use a database, authentication, or online payment processing in these phases.

## Customer journeys

- Browse the catalogue or occasion collections, then configure a cake size, flavour, message, and instructions.
- Add configured products to a persistent browser cart. Cart data is stored in `localStorage` on that device; clearing browser storage clears the cart.
- Review the cart, enter Kenyan contact details and delivery preferences, then send the order through WhatsApp. The order is only confirmed after Tina Bakers replies.
- Request a custom cake through the six-step inquiry form; its summary is sent to WhatsApp.
- Contact the bakery through WhatsApp, Instagram, Facebook, the contact form, or the Meru map/location sections.

No payment is collected on the site. Delivery fees and availability are confirmed directly with the bakery. The checkout does not send data to a server; it opens a prefilled WhatsApp message for the customer to review and send.

## Routes

- `/` — Homepage
- `/shop` — Product catalogue
- `/shop/[slug]` — Product details and required options
- `/collections/[slug]` — Birthday, wedding, graduation, cupcakes, pastries, and corporate collections
- `/custom-cakes` — Custom cake inquiry
- `/about` — Bakery story and process
- `/contact` — Contact information and WhatsApp handoff
- `/cart` — Persistent cart
- `/checkout` — Four-step order review and WhatsApp handoff
- `/policies` — Delivery, lead time, cancellations, and allergy guidance

## Brand and content

- Plum `#4B2058`, gold `#C69B45`, ivory `#F9F6E9`, caramel `#D4954A`, and deep plum `#2D1235`.
- Playfair Display headings and Plus Jakarta Sans body text.
- Business details and product prices live in `src/data/products.ts` and the shared site components.
- Product artwork is explicitly illustrative, not a photograph or claim about a finished Tina Bakers product. Replace it with approved bakery photography when supplied. The logo and founder portrait are also represented as text/editorial placeholders until real assets are available.

## Business details

- Tina Bakers · Meru, Kenya 60200
- Monday–Saturday, 8:00 AM–6:30 PM · Sunday closed
- WhatsApp / Phone: 0790 187 080 · International: +254 790 187 080
- Instagram: [@tina.bakers](https://www.instagram.com/tina.bakers)
- Facebook: [Angelo Tina Bakers](https://www.facebook.com/angelotinabakers)
