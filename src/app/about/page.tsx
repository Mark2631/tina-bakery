import type { Metadata } from "next";
import Link from "next/link";
import {
  Facebook,
  HandHeart,
  Instagram,
  Leaf,
  Sparkles,
  Wheat,
} from "lucide-react";
import { LocationBlock } from "@/components/location-block";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Meet Tina Bakers, an artisan bakery making cakes by hand in Meru, Kenya.",
};

const values = [
  {
    title: "Handmade",
    copy: "Every cake is prepared in our own kitchen, finished by hand, and made for the person you have in mind.",
    Icon: HandHeart,
  },
  {
    title: "Fresh",
    copy: "We bake to order, using fresh ingredients and giving every detail the time it deserves.",
    Icon: Leaf,
  },
  {
    title: "Celebratory",
    copy: "From small family birthdays to wedding receptions, we believe the best moments are shared around a table.",
    Icon: Sparkles,
  },
];
const process = [
  "Ingredients sourced fresh",
  "Baked to order",
  "Delivered with care",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section-wrap">
          <p className="eyebrow">Our story · Meru, Kenya</p>
          <h1>Baked with love in the heart of Meru.</h1>
          <p className="section-copy">
            A local bakery, a real kitchen, and a lot of care for the moments
            that bring people together.
          </p>
        </div>
      </section>
      <section className="section-space">
        <div className="section-wrap story-grid">
          <div>
            <p className="eyebrow">A little about us</p>
            <h2 className="section-heading mt-2">
              Good things are better when they&apos;re shared.
            </h2>
            <p className="section-copy mt-5">
              Tina Bakers has been a part of Meru&apos;s celebrations for years.
              From small family birthdays to grand wedding receptions, every
              cake that leaves our kitchen is made by hand with fresh
              ingredients and genuine care.
            </p>
            <p className="section-copy mt-4">
              We bake everything ourselves. When you order from Tina Bakers,
              you&apos;re speaking directly with the people who will make your
              cake—so we can listen, plan, and get the little details right.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="button button-outline"
                href="https://www.instagram.com/tina.bakers"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={17} />
                Instagram
              </a>
              <a
                className="button button-outline"
                href="https://www.facebook.com/angelotinabakers"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook size={17} />
                Facebook
              </a>
            </div>
          </div>
          <div
            className="story-art"
            role="img"
            aria-label="A warm illustration celebrating the Tina Bakers kitchen"
          >
            <div className="story-placeholder">
              <Wheat size={34} strokeWidth={1.2} />
              <span className="font-display text-2xl">
                A little love in every layer.
              </span>
              <span className="text-xs text-[#746b70]">
                A portrait of Tina can be added when she shares a photo.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space bg-[#f1eadb]">
        <div className="section-wrap">
          <p className="eyebrow">What matters in our kitchen</p>
          <h2 className="section-heading mt-2">Baked with care, every time.</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {values.map(({ title, copy, Icon }) => (
              <article className="border-t border-gold pt-5" key={title}>
                <Icon className="text-caramel" size={27} strokeWidth={1.3} />
                <h3 className="mt-4 font-display text-2xl text-plum">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-[#746b70]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="section-wrap">
          <p className="eyebrow">From our kitchen to you</p>
          <h2 className="section-heading mt-2">The care is in every step.</h2>
          <div className="steps-grid mt-8">
            {process.map((item, index) => (
              <article className="step-card" key={item}>
                <span className="step-num">0{index + 1}</span>
                <h3>{item}</h3>
                <p className="max-w-xs text-sm text-[#746b70]">
                  {index === 0
                    ? "We plan each bake around the ingredients and details that make it yours."
                    : index === 1
                      ? "Our team prepares your order fresh in the Tina Bakers kitchen."
                      : "We arrange the details with you so your cake arrives ready for its moment."}
                </p>
              </article>
            ))}
          </div>
          <Link className="button button-plum mt-7" href="/shop">
            Browse our cakes
          </Link>
        </div>
      </section>
      <section className="section-space bg-[#f1eadb]">
        <LocationBlock />
      </section>
    </>
  );
}
