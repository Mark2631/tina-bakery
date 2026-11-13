import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CakeSlice, Heart, Sparkles } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { LocationBlock } from "@/components/location-block";
import { products } from "@/data/products";

const occasions = [
  {
    title: "Birthday cakes",
    note: "Make the candles count.",
    href: "/collections/birthday",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1100&q=88",
    tone: "blush",
  },
  {
    title: "Wedding cakes",
    note: "A centrepiece worth remembering.",
    href: "/collections/wedding",
    image: "https://images.unsplash.com/photo-1542007920-992d2c424d09?auto=format&fit=crop&w=1100&q=88",
    tone: "butter",
  },
  {
    title: "Graduation cakes",
    note: "For everything you worked for.",
    href: "/collections/graduation",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1100&q=88",
    tone: "pistachio",
  },
  {
    title: "Cupcakes & bakes",
    note: "Small treats. Big smiles.",
    href: "/collections/cupcakes",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1100&q=88",
    tone: "lavender",
  },
];

export function HeroSection() {
  return (
    <section className="hero hero-v3">
      <div className="hero-v3-topline">
        <span>CAKES, CUPCAKES & LITTLE MOMENTS</span>
        <span>MERU, KENYA <i aria-hidden="true">✳</i></span>
      </div>
      <div className="hero-v3-inner">
        <div className="hero-v3-copy">
          <p className="eyebrow hero-v3-eyebrow">
            <span className="hero-v3-eyebrow-dot" />
            A SWEETER WAY TO CELEBRATE
          </p>
          <h1>Good days deserve <em>great cake.</em></h1>
          <p className="hero-v3-intro">
            Celebration cakes, cupcakes and thoughtful bakes for birthdays,
            graduations, weddings and all the little moments in between.
          </p>
          <div className="hero-v3-actions">
            <Link className="button hero-v3-primary" href="/shop">
              Explore the menu <ArrowRight size={17} />
            </Link>
            <Link className="hero-v3-secondary" href="/custom-cakes">
              Create a custom cake <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-v3-note">
            <span className="hero-v3-note-icon"><CakeSlice size={17} /></span>
            <span>Your idea, your occasion, a cake to make it feel special.</span>
          </div>
        </div>
        <div className="hero-v3-visual">
          <div className="hero-v3-photo-main">
            <Image
              src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1500&q=90"
              alt="Celebration cake inspiration"
              fill
              priority
              unoptimized
              sizes="(max-width: 760px) 92vw, 53vw"
            />
          </div>
          <div className="hero-v3-photo-inset">
            <Image
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=650&q=88"
              alt="Cupcake inspiration"
              fill
              unoptimized
              sizes="(max-width: 760px) 32vw, 18vw"
            />
          </div>
          <div className="hero-v3-roundel">
            <span>A LITTLE</span>
            <strong>more joy</strong>
            <span>IN EVERY SLICE</span>
          </div>
          <div className="hero-v3-photo-caption">
            <span>01 / 04</span>
            <span>For the days worth gathering for</span>
          </div>
        </div>
      </div>
      <div className="hero-v3-bottom">
        <span>MAKE ROOM FOR SOMETHING SWEET</span>
        <span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
      </div>
    </section>
  );
}

export function HomeTrustNote() {
  return (
    <section className="home-trust-v3" aria-label="Tina Bakers menu highlights">
      <div className="section-wrap home-trust-v3-inner">
        <span><Heart size={17} /> Made for the big moments</span>
        <span><CakeSlice size={17} /> Cakes, cupcakes & bakes</span>
        <span><Sparkles size={17} /> Custom ideas welcome</span>
        <span className="home-trust-v3-place">MERU <i aria-hidden="true">✳</i> KENYA</span>
      </div>
    </section>
  );
}

export function OccasionGrid() {
  return (
    <section className="section-space occasion-section home-occasion-v3">
      <div className="section-wrap">
        <div className="section-head-row">
          <div>
            <p className="eyebrow">Start with the moment</p>
            <h2 className="section-heading">What are we celebrating?</h2>
            <p className="section-copy">Find a starting point. We can shape the details together.</p>
          </div>
          <Link className="section-link" href="/shop">Explore all cakes <ArrowRight size={16} /></Link>
        </div>
        <div className="occasion-grid">
          {occasions.map((item, index) => (
            <Link className={"occasion-card occasion-card--" + item.tone} href={item.href} key={item.title}>
              <div className="occasion-card-image">
                <Image src={item.image} alt={item.title + " inspiration"} fill unoptimized sizes="(max-width: 700px) 46vw, 24vw" />
                <span className="occasion-card-number">0{index + 1}</span>
                <span className="occasion-card-open"><ArrowUpRight size={20} /></span>
              </div>
              <div className="occasion-card-copy">
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.note}</small>
                </div>
                <ArrowRight size={18} />
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
    <section className="section-space featured-section home-featured-v3">
      <div className="section-wrap">
        <div className="section-head-row">
          <div>
            <p className="eyebrow">A few favourites</p>
            <h2 className="section-heading">Pick your kind of sweet.</h2>
            <p className="section-copy">A small taste of the menu. Choose a favourite, then make it yours.</p>
          </div>
          <Link className="section-link" href="/shop">View the full menu <ArrowRight size={16} /></Link>
        </div>
        <ProductGrid products={products.filter((product) => product.featured)} />
        <p className="photo-disclaimer">Demo menu, illustrative photography and estimated prices. Final designs, availability and prices must be confirmed with Tina Bakers.</p>
      </div>
    </section>
  );
}

export function StoryTeaser() {
  return (
    <section className="section-space story-section home-story-v3">
      <div className="section-wrap story-grid">
        <div className="story-photo">
          <Image
            src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1300&q=88"
            alt="Layered celebration cake inspiration"
            fill
            unoptimized
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span className="story-photo-note">A little detail makes a big difference.</span>
          <span className="home-story-index">TINA BAKERS <i>·</i> MERU</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">A cake should feel like yours</p>
          <h2 className="section-heading">Bring the idea. We’ll find the sweet spot.</h2>
          <p className="section-copy">
            A colour you love. A flavour you always choose. A picture saved on
            your phone. Start with what you have in mind and let the details
            take shape from there.
          </p>
          <p className="section-copy">
            Browse the styles, share your occasion and preferred date, then
            speak with the bakery to confirm the design, availability and final
            price before placing an order.
          </p>
          <Link className="button home-story-button" href="/about">
            Get to know Tina Bakers <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CustomCakeCta() {
  return (
    <section className="custom-cta home-custom-v3">
      <div className="custom-cta-inner">
        <div className="custom-cta-image">
          <Image
            src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1100&q=88"
            alt="Decorated cake inspiration for a custom order"
            fill
            unoptimized
            sizes="(max-width: 760px) 100vw, 42vw"
          />
          <span className="home-custom-image-tag">YOUR IDEA STARTS HERE</span>
        </div>
        <div className="custom-cta-copy">
          <p className="eyebrow">Have a picture in mind?</p>
          <h2>Let’s make that cake the moment.</h2>
          <p>
            Tell us what you’re celebrating, who it’s for and the style you
            love. Share your inspiration and start a conversation about a
            custom design.
          </p>
          <Link className="button home-custom-button" href="/custom-cakes">
            Dream up your cake <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    { number: "01", title: "Find your favourite", copy: "Explore the menu and save a style that catches your eye." },
    { number: "02", title: "Share the details", copy: "Tell Tina the occasion, date, size and any design ideas." },
    { number: "03", title: "Confirm together", copy: "Check the final price, availability and collection or delivery details before you commit." },
  ];
  return (
    <section className="section-space order-section home-order-v3">
      <div className="section-wrap">
        <div className="order-intro">
          <p className="eyebrow">Easy as one, two, three</p>
          <h2 className="section-heading">From first idea to first slice.</h2>
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
    <section className="section-space location-section home-location-v3">
      <LocationBlock />
    </section>
  );
}
