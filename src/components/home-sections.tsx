import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CakeSlice, Heart, Sparkles } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { LocationBlock } from "@/components/location-block";
import { products } from "@/data/products";

const occasions = [
  {
    title: "Birthday cakes",
    note: "Make a wish. Make it yours.",
    href: "/collections/birthday",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=900&q=85",
    tone: "blush",
  },
  {
    title: "Wedding cakes",
    note: "A centrepiece for your day.",
    href: "/collections/wedding",
    image: "https://images.unsplash.com/photo-1542007920-992d2c424d09?auto=format&fit=crop&w=900&q=85",
    tone: "butter",
  },
  {
    title: "Cupcakes",
    note: "Little things, big joy.",
    href: "/collections/cupcakes",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85",
    tone: "pistachio",
  },
  {
    title: "Everyday bakes",
    note: "Something sweet for later.",
    href: "/collections/pastries",
    image: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?auto=format&fit=crop&w=900&q=85",
    tone: "lavender",
  },
];

export function HeroSection() {
  return (
    <section className="hero hero--editorial">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" />
            THE LITTLE CAKE STUDIO IN MERU
          </div>
          <h1>Make room for <em>something sweet.</em></h1>
          <p className="hero-intro">
            Cakes with character, bakes worth sharing and thoughtful details for the moments you want to remember.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/shop">
              Explore the menu <ArrowRight size={17} />
            </Link>
            <Link className="hero-text-link" href="/custom-cakes">
              Dream up a custom cake <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hero-local">
            <span className="hero-local-mark"><CakeSlice size={16} /></span>
            Freshly imagined. Made to order in Meru, Kenya.
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <Image
              src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1600&q=90"
              alt="An elegant celebration cake with fresh decoration, shown as a bakery style reference"
              fill
              priority
              unoptimized
              sizes="(max-width: 760px) 100vw, 54vw"
              className="hero-photo"
            />
          </div>
          <div className="hero-photo-tag">
            <span>THE ART OF</span>
            <strong>celebrating</strong>
          </div>
          <div className="hero-photo-caption">
            <span>01 / 04</span>
            <span>Made for the good moments</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom-note">
        <span>GOOD THINGS ARE BAKED HERE</span>
        <span>MERU · KENYA</span>
      </div>
    </section>
  );
}

export function HomeTrustNote() {
  return (
    <section className="brand-promise-row" aria-label="Tina Bakers highlights">
      <div className="section-wrap brand-promise-inner">
        <span><Sparkles size={16} /> Made for your moment</span>
        <span><CakeSlice size={16} /> Baked to order</span>
        <span><Heart size={16} /> Finished with care</span>
        <span>Easy WhatsApp ordering <ArrowUpRight size={15} /></span>
      </div>
    </section>
  );
}

export function OccasionGrid() {
  return (
    <section className="section-space occasion-section">
      <div className="section-wrap">
        <div className="section-head-row">
          <div>
            <p className="eyebrow">A reason to get together</p>
            <h2 className="section-heading">What are we celebrating?</h2>
          </div>
          <Link className="section-link" href="/shop">See everything <ArrowRight size={16} /></Link>
        </div>
        <div className="occasion-grid">
          {occasions.map((item, index) => (
            <Link className={"occasion-card occasion-card--" + item.tone} href={item.href} key={item.title}>
              <div className="occasion-card-image">
                <Image src={item.image} alt={item.title + " styling reference"} fill unoptimized sizes="(max-width: 640px) 46vw, 24vw" />
              </div>
              <div className="occasion-card-copy">
                <span>0{index + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.note}</small>
                </div>
                <ArrowUpRight size={18} />
              </div>
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
        <div className="section-head-row">
          <div>
            <p className="eyebrow">A few good places to start</p>
            <h2 className="section-heading">The ones everyone gathers around.</h2>
            <p className="section-copy">A little menu of cakes and bakes to make choosing easy.</p>
          </div>
          <Link className="section-link" href="/shop">Browse the full menu <ArrowRight size={16} /></Link>
        </div>
        <ProductGrid products={products.filter((product) => product.featured)} />
        <p className="photo-disclaimer">Photography and menu prices are illustrative demo content, not verified Tina Bakers product images or a confirmed price list.</p>
      </div>
    </section>
  );
}

export function StoryTeaser() {
  return (
    <section className="section-space story-section">
      <div className="section-wrap story-grid">
        <div className="story-photo">
          <Image
            src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1200&q=85"
            alt="Layered cake with elegant frosting details, shown as a visual reference"
            fill
            unoptimized
            sizes="(max-width: 760px) 100vw, 48vw"
          />
          <span className="story-photo-note">A little care goes a long way.</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">A local bakery with a personal touch</p>
          <h2 className="section-heading">Not just dessert. Part of the memory.</h2>
          <p className="section-copy">
            From the first candle to the last slice, a good cake has a way of bringing people together. Tina Bakers makes cakes and bakes for birthdays, weddings, graduations and everyday celebrations in Meru.
          </p>
          <p className="section-copy">
            Bring an idea, a colour palette or a favourite flavour. We’ll help you shape the details before your order is confirmed.
          </p>
          <Link className="button button-secondary" href="/about">A little about us <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

export function CustomCakeCta() {
  return (
    <section className="custom-cta">
      <div className="custom-cta-inner">
        <div className="custom-cta-image">
          <Image
            src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1000&q=85"
            alt="Decorated cake used as a custom cake style reference"
            fill
            unoptimized
            sizes="(max-width: 760px) 90vw, 38vw"
          />
        </div>
        <div className="custom-cta-copy">
          <p className="eyebrow">Have something in mind?</p>
          <h2>Tell us the idea. We’ll bring the buttercream.</h2>
          <p>Share your date, number of guests and inspiration. We’ll take it from there, one delicious detail at a time.</p>
          <Link className="button button-dark" href="/custom-cakes">Plan a custom cake <ArrowRight size={17} /></Link>
        </div>
      </div>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    { number: "01", title: "Pick your favourite", copy: "Choose a cake or bake and add the details that make it yours." },
    { number: "02", title: "Send your request", copy: "Your order details open in WhatsApp, ready to send to Tina." },
    { number: "03", title: "Confirm together", copy: "Tina checks availability and confirms the actual price and collection or delivery." },
  ];
  return (
    <section className="section-space order-section">
      <div className="section-wrap">
        <div className="order-intro">
          <p className="eyebrow">Simple from the first click</p>
          <h2 className="section-heading">Your next celebration, sorted.</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
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
