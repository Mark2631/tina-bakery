import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ordering & policies",
  description:
    "Delivery, lead times, cancellations, and allergy information for Tina Bakers orders.",
};

const policies = [
  {
    title: "Delivery zones & fees",
    paragraphs: [
      "We arrange delivery around Meru, including Meru Town, Meru CBD, Nchiru, and Mitunguu. If you are elsewhere, ask us and we’ll confirm whether we can deliver.",
      "Delivery fees depend on the destination and are confirmed with you on WhatsApp before the order is agreed. No delivery fee is charged or collected through this website.",
    ],
  },
  {
    title: "Lead times",
    paragraphs: [
      "Please allow at least 24 hours for standard cakes and bakes. Custom cakes and tiered designs need at least 48 hours notice.",
      "All orders are subject to availability. Your date is confirmed once Tina Bakers replies to agree the details and timing.",
    ],
  },
  {
    title: "Changes & cancellations",
    paragraphs: [
      "If you need to change or cancel an order, contact us as soon as possible on WhatsApp. We’ll discuss what can be changed based on the order details and how far along preparation is.",
      "Custom designs and orders already being prepared may have limited change options. We’ll confirm any arrangements with you directly.",
    ],
  },
  {
    title: "Allergy information",
    paragraphs: [
      "Please tell us about allergies or dietary requirements before placing an order. We’ll check the recipe and kitchen handling with you before confirming whether a bake is suitable.",
      "We cannot promise an allergen-free environment unless Tina Bakers has confirmed that directly for your specific order. If you have a serious allergy, please contact us before ordering.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section-wrap">
          <p className="eyebrow">The useful details</p>
          <h1>Ordering, made clear.</h1>
          <p className="section-copy">
            A few things to know before we start baking for your moment.
          </p>
        </div>
      </section>
      <section className="section-wrap py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {policies.map((policy, index) => (
            <section
              className="border-b border-plum/15 py-7 first:pt-0"
              key={policy.title}
            >
              <p className="eyebrow">0{index + 1}</p>
              <h2 className="mt-2 font-display text-2xl text-plum">
                {policy.title}
              </h2>
              {policy.paragraphs.map((paragraph) => (
                <p className="mt-3 text-[#655c63]" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <div className="mt-8 bg-[#f1eadb] p-5">
            <h2 className="font-display text-xl text-plum">
              Need to check something first?
            </h2>
            <p className="mt-2 text-sm text-[#746b70]">
              We&apos;re happy to talk through your date, delivery area, or
              ingredients.
            </p>
            <a
              className="button button-plum mt-4"
              href={whatsappUrl(
                "Hi Tina Bakers, I have a question about ordering.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              Ask us on WhatsApp
            </a>
          </div>
          <p className="mt-7 text-sm text-[#746b70]">
            You can also read our{" "}
            <Link
              className="font-bold text-plum underline underline-offset-4"
              href="/contact"
            >
              contact details
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
