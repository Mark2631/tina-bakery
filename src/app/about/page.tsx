import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  HandHeart,
  Instagram,
  Leaf,
  Sparkles,
} from "lucide-react";
import { LocationBlock } from "@/components/location-block";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Explore the cakes and bakes available from Tina Bakers in Meru, Kenya.",
};

const values = [
  {
    title: "Made for moments",
    copy: "Explore cake styles for birthdays, weddings, graduations and other occasions worth celebrating.",
    Icon: HandHeart,
  },
  {
    title: "Made to order",
    copy: "Share your occasion, preferred finish and date so the details can be discussed before an order is confirmed.",
    Icon: Leaf,
  },
  {
    title: "Celebratory",
    copy: "From small family birthdays to wedding receptions, we believe the best moments are shared around a table.",
    Icon: Sparkles,
  },
];
const process = [
  "Choose your style",
  "Confirm the details",
  "Arrange collection or delivery",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section-wrap">
          <p className="eyebrow">Our story · Meru, Kenya</p>
          <h1>Baked with love in the heart of Meru.</h1>
          <p className="section-copy">
            A Meru bakery for cakes, cupcakes and the moments worth celebrating.
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
              The menu brings together celebration cakes, cupcakes and bakes
              for birthdays, graduations, weddings and everyday gatherings.
              Browse the styles, choose the details that matter to you and
              start a conversation with the bakery.
            </p>
            <p className="section-copy mt-4">
              Share your preferred style, flavour, occasion and date. The
              bakery can discuss the request with you and confirm availability,
              final pricing and collection or delivery arrangements.
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
          <div className="story-photo">
            <Image
              src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1200&q=85"
              alt="Celebration cake detail used as a styling reference"
              fill
              unoptimized
              sizes="(max-width: 900px) 90vw, 45vw"
            />
            <span className="story-photo-tag">A little love in every layer</span>
          </div>
        </div>
      </section>
      <section className="section-space bg-[#f1eadb]">
        <div className="section-wrap">
          <p className="eyebrow">The Tina Bakers approach</p>
          <h2 className="section-heading mt-2">A cake for the occasion you have in mind.</h2>
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
          <p className="eyebrow">How ordering works</p>
          <h2 className="section-heading mt-2">A simple way to get started.</h2>
          <div className="steps-grid mt-8">
            {process.map((item, index) => (
              <article className="step-card" key={item}>
                <span className="step-num">0{index + 1}</span>
                <h3>{item}</h3>
                <p className="max-w-xs text-sm text-[#746b70]">
                  {index === 0
                    ? "Choose a cake style, flavour and occasion from the menu."
                    : index === 1
                      ? "Discuss the requested date, finish and any personal details with the bakery."
                      : "Confirm whether collection or delivery is available for your order."}
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
