import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { LocationBlock } from "@/components/location-block";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Tina Bakers in Meru. Order cakes on WhatsApp or find us on Instagram and Facebook.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section-wrap">
          <p className="eyebrow">We&apos;d love to hear from you</p>
          <h1>Let&apos;s talk cake.</h1>
          <p className="section-copy">
            Questions, ideas, or a date you&apos;re celebrating? We&apos;re
            right here in Meru.
          </p>
        </div>
      </section>
      <section className="section-space">
        <div className="section-wrap grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <a
              className="button button-gold min-h-[62px] w-full text-lg"
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={21} />
              Chat with us on WhatsApp
            </a>
            <p className="mt-3 text-center text-sm text-[#746b70]">
              0790 187 080 · +254 790 187 080
            </p>
            <div className="mt-8 border-y border-plum/10 py-6">
              <p className="eyebrow">Follow along</p>
              <div className="mt-4 flex flex-col gap-4">
                <a
                  className="inline-flex items-center gap-3 text-plum"
                  href="https://www.instagram.com/tina.bakers"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={20} />
                  @tina.bakers
                </a>
                <a
                  className="inline-flex items-center gap-3 text-plum"
                  href="https://www.facebook.com/angelotinabakers"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook size={20} />
                  Angelo Tina Bakers
                </a>
              </div>
            </div>
            <h2 className="mt-6 font-display text-2xl text-plum">
              When to visit
            </h2>
            <table className="hours-table mt-2 text-sm">
              <tbody>
                <tr>
                  <td>Monday – Saturday</td>
                  <td>8:00 AM – 6:30 PM</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="eyebrow">Send a note</p>
            <h2 className="mt-2 font-display text-3xl text-plum">
              We&apos;ll get back to you.
            </h2>
            <p className="mt-2 text-sm text-[#746b70]">
              This form opens a WhatsApp message with your note—there&apos;s no
              separate submission system yet.
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section className="section-space bg-[#f1eadb]">
        <LocationBlock />
      </section>
    </>
  );
}
