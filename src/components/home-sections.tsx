import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CakeSlice,
  ChevronRight,
  Clock3,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  PartyPopper,
  Sparkles,
  Wheat,
} from "lucide-react";
import { ProductGrid } from "@/components/products";
import { LocationBlock } from "@/components/location-block";
import { InstagramStrip } from "@/components/instagram-strip";
import { products } from "@/data/products";

const occasions = [
  { title: "Birthdays", href: "/collections/birthday", Icon: CakeSlice },
  { title: "Weddings", href: "/collections/wedding", Icon: Heart },
  { title: "Graduations", href: "/collections/graduation", Icon: GraduationCap },
  { title: "Cupcakes", href: "/collections/cupcakes", Icon: PartyPopper },
  { title: "Corporate", href: "/collections/corporate", Icon: BriefcaseBusiness },
];

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">The Meru cake & bake studio</p>
          <h1>Make the moment. <em>We’ll bake the memory.</em></h1>
          <p className="hero-intro">
            Celebration cakes, cupcakes and thoughtful bakes for the people and moments that matter.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/shop">
              Explore the menu <ChevronRight size={17} />
            </Link>
            <Link className="button button-secondary" href="/custom-cakes">
              Plan a custom cake
            </Link>
          </div>
          <div className="hero-local">
            <MapPin size={15} />
            <span>Made to order in Meru, Kenya</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <Image
              src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1600&q=90"
              alt="Elegant celebration cake with delicate frosting, used as a style reference"
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 90vw, 48vw"
              className="hero-photo"
            />
          </div>
          <div className="hero-sticker">
            <span>Made for</span>
            <strong>your moment</strong>
          </div>
          <p className="hero-photo-caption">A little sweetness goes a long way.</p>
        </div>
      </div>
    </section>
  );
}

export function OccasionGrid() {
  return (
    <section className="section-space">
      <div className="section-wrap">
        <div className="section-head-row mb-8">
          <div>
            <p className="eyebrow">Choose your reason</p>
            <h2 className="section-heading mt-2">What are we celebrating?</h2>
          </div>
          <Link className="inline-flex items-center gap-1 text-sm font-bold text-plum" href="/shop">
            See all bakes <ChevronRight size={16} />
          </Link>
        </div>
        <div className="occasion-grid">
          {occasions.map(({ title, href, Icon }, index) => (
            <Link href={href} className="occasion-tile" key={title} data-index={index}>
              <span className="occasion-icon"><Icon size={21} strokeWidth={1.5} /></span>
              <span className="font-display text-xl">{title}</span>
              <span className="occasion-arrow"><ChevronRight size={17} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section className="section-space featured-section">
      <div className="section-wrap">
        <div className="section-head-row mb-8">
          <div>
            <p className="eyebrow">A few favourites to start</p>
            <h2 className="section-heading mt-2">Something worth sharing.</h2>
            <p className="section-copy mt-3">
              Browse the menu, choose the style and details, then send your request to Tina on WhatsApp.
            </p>
          </div>
          <Link className="inline-flex items-center gap-1 text-sm font-bold text-plum" href="/shop">
            Browse the full menu <ChevronRight size={16} />
          </Link>
        </div>
        <ProductGrid products={products.filter((product) => product.featured)} />
        <p className="photo-disclaimer">
          Photos are styling references. Tina confirms the achievable finish and current price for every order.
        </p>
      </div>
    </section>
  );
}

export function StoryTeaser() {
  return (
    <section className="section-space">
      <div className="section-wrap story-grid">
        <div className="story-photo">
          <Image
            src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1200&q=85"
            alt="Detailed celebration cake styling, shown as a visual reference"
            fill
            unoptimized
            sizes="(max-width: 900px) 90vw, 45vw"
          />
          <span className="story-photo-tag">The art of the finishing touch</span>
        </div>
        <div>
          <p className="eyebrow">A local bakery, a personal touch</p>
          <h2 className="section-heading mt-2">Your celebration deserves more than an ordinary cake.</h2>
          <p className="section-copy mt-4">
            Tina Bakers creates cakes and bakes for birthdays, weddings, graduations and the everyday moments that bring people together in Meru.
          </p>
          <p className="section-copy mt-3">
            Tell us what you are celebrating, the date and the look you have in mind. We’ll discuss the details with you before confirming your order.
          </p>
          <Link className="button button-secondary mt-6" href="/about">
            More about Tina Bakers <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CustomCakeCta() {
  return (
    <section className="custom-cta">
      <div className="custom-cta-inner">
        <div>
          <p className="eyebrow text-[#f1d8bd]">Something made just for you</p>
          <h2>Have a picture in mind? Let’s bring it to the table.</h2>
          <p className="custom-cta-copy">Share your inspiration, event date and guest count. We’ll take it from there.</p>
        </div>
        <Link className="button button-light shrink-0" href="/custom-cakes">
          Start a custom enquiry <ChevronRight size={17} />
        </Link>
      </div>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    { number: "01", title: "Choose your bake", copy: "Browse cakes, cupcakes and pastries. Pick your size or pack where available." },
    { number: "02", title: "Send your request", copy: "Add your date and delivery details. Your order opens in WhatsApp, ready for Tina." },
    { number: "03", title: "Confirm the details", copy: "Tina confirms availability, final pricing and delivery before you make payment." },
  ];
  return (
    <section className="section-space">
      <div className="section-wrap">
        <p className="eyebrow">Ordering, made simple</p>
        <h2 className="section-heading mt-2">From idea to order in a few steps.</h2>
        <div className="steps-grid mt-8">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-num">{step.number}</span>
              <h3>{step.title}</h3>
              <p className="max-w-sm text-sm text-[#746b70]">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeLocation() {
  return (
    <section className="section-space location-section">
      <LocationBlock />
    </section>
  );
}

export function HomeTrustNote() {
  return (
    <div className="section-wrap trust-strip">
      <span><Wheat size={16} /> Made to order in Meru</span>
      <span><Clock3 size={16} /> Delivery date confirmed with Tina</span>
      <span><MessageCircle size={16} /> Simple WhatsApp ordering</span>
      <span><Sparkles size={16} /> Designed around your occasion</span>
    </div>
  );
}
