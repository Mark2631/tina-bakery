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
  {
    title: "Graduations",
    href: "/collections/graduation",
    Icon: GraduationCap,
  },
  { title: "Cupcakes", href: "/collections/cupcakes", Icon: PartyPopper },
  {
    title: "Corporate",
    href: "/collections/corporate",
    Icon: BriefcaseBusiness,
  },
];

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          <p className="eyebrow">A little Meru warmth, freshly baked</p>
          <h1>Baked with love, made for your special moments.</h1>
          <p>
            Celebrating Meru&apos;s families one cake at a time since we opened
            our doors.
          </p>
          <div className="hero-actions">
            <Link className="button button-plum" href="/shop">
              Shop cakes <ChevronRight size={17} />
            </Link>
            <Link className="button button-outline" href="/custom-cakes">
              Order a custom cake
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs text-[#6c5f69]">
            <MapPin size={15} className="text-caramel" />
            Handmade in Meru, Kenya
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="A simple illustration of a celebration cake"
        >
          <span className="hero-spark one" aria-hidden="true">
            ✳
          </span>
          <span className="hero-spark two" aria-hidden="true">
            ✳
          </span>
          <div className="hero-cake" aria-hidden="true">
            <div className="cake-tier top" />
            <div className="cake-tier" />
            <div className="cake-plate" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function OccasionGrid() {
  return (
    <section className="section-space">
      <div className="section-wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Made for the moments that matter</p>
            <h2 className="section-heading mt-2">What are we celebrating?</h2>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-sm font-bold text-plum"
            href="/shop"
          >
            See all cakes <ChevronRight size={16} />
          </Link>
        </div>
        <div className="occasion-grid">
          {occasions.map(({ title, href, Icon }) => (
            <Link href={href} className="occasion-tile" key={title}>
              <span className="occasion-icon">
                <Icon size={21} strokeWidth={1.5} />
              </span>
              <span className="font-display text-xl">{title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section className="section-space bg-[#f1eadb]">
      <div className="section-wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Baked in small batches</p>
            <h2 className="section-heading mt-2">Fresh from our oven.</h2>
            <p className="section-copy mt-3">
              Every bake is made in our kitchen in Meru, with care from the
              first whisk to the final finish.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-sm font-bold text-plum"
            href="/shop"
          >
            Browse the whole menu <ChevronRight size={16} />
          </Link>
        </div>
        <ProductGrid
          products={products.filter((product) => product.featured)}
        />
      </div>
    </section>
  );
}

export function StoryTeaser() {
  return (
    <section className="section-space">
      <div className="section-wrap story-grid">
        <div
          className="story-art"
          role="img"
          aria-label="Warm illustration representing the Tina Bakers kitchen"
        >
          <div className="story-placeholder">
            <Wheat size={32} strokeWidth={1.2} />
            <span className="font-display text-2xl">
              Made by hand, right here in Meru.
            </span>
            <span className="text-xs text-[#746b70]">
              A founder portrait can be added when Tina shares a photo.
            </span>
          </div>
        </div>
        <div>
          <p className="eyebrow">A bakery with heart</p>
          <h2 className="section-heading mt-2">
            Every cake is made by hand, right here in Meru.
          </h2>
          <p className="section-copy mt-4">
            We&apos;re Tina Bakers: a real local bakery making the cakes and
            bakes that bring people together. From a family birthday to a
            wedding table, each order is prepared in our own kitchen with fresh
            ingredients and genuine care.
          </p>
          <p className="section-copy mt-3">
            No middlemen, no ready-made cakes—just thoughtful baking for your
            special moment.
          </p>
          <Link className="button button-outline mt-6" href="/about">
            Meet Tina Bakers <ChevronRight size={16} />
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
          <p className="eyebrow text-[#e4c77f]">A cake, just for your moment</p>
          <h2>
            Tell us what you&apos;re celebrating — we&apos;ll bake it for you.
          </h2>
        </div>
        <Link className="button button-gold shrink-0" href="/custom-cakes">
          Plan a custom cake <ChevronRight size={17} />
        </Link>
      </div>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    {
      number: "01",
      title: "Browse our cakes",
      copy: "Find a favourite, or tell us what you have in mind.",
    },
    {
      number: "02",
      title: "WhatsApp your order",
      copy: "Share the size, flavour, message, and date that work for you.",
    },
    {
      number: "03",
      title: "We bake & deliver",
      copy: "Tina confirms the details, then our kitchen gets baking.",
    },
  ];
  return (
    <section className="section-space">
      <div className="section-wrap">
        <p className="eyebrow">Simple as one, two, three</p>
        <h2 className="section-heading mt-2">
          A lovely cake is closer than you think.
        </h2>
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
    <section className="section-space bg-[#f1eadb]">
      <LocationBlock />
    </section>
  );
}

export function HomeTrustNote() {
  return (
    <div className="section-wrap flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-plum/10 py-5 text-xs font-semibold text-[#746b70]">
      <span className="inline-flex items-center gap-2">
        <Wheat size={16} className="text-caramel" />
        Handmade in our Meru kitchen
      </span>
      <span className="inline-flex items-center gap-2">
        <Clock3 size={16} className="text-caramel" />
        Baked fresh to order
      </span>
      <span className="inline-flex items-center gap-2">
        <MessageCircle size={16} className="text-caramel" />
        Order by WhatsApp
      </span>
      <span className="inline-flex items-center gap-2">
        <Sparkles size={16} className="text-caramel" />
        Made for your moment
      </span>
    </div>
  );
}
