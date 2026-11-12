import type { Metadata } from "next";
import { CustomCakeForm } from "@/components/custom-cake-form";

export const metadata: Metadata = {
  title: "Custom cakes",
  description:
    "Plan a handmade custom cake with Tina Bakers in Meru. Tell us your occasion, size, flavour, and date on WhatsApp.",
};

export default function CustomCakesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section-wrap">
          <p className="eyebrow">Made around your moment</p>
          <h1>The cake you&apos;re imagining — we can bake it.</h1>
          <p className="section-copy">
            Share a few details, and Tina will follow up on WhatsApp to talk
            through the design, timing, and a quote.
          </p>
        </div>
      </section>
      <section className="section-wrap py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <CustomCakeForm />
          <p className="mt-4 text-center text-xs text-[#746b70]">
            Custom cakes need at least 48 hours notice. We&apos;ll confirm
            availability and pricing with you before we bake.
          </p>
        </div>
      </section>
    </>
  );
}
