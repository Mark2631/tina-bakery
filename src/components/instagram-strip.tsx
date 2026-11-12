import Link from "next/link";
import { Instagram } from "lucide-react";

export function InstagramStrip() {
  return (
    <section className="section-space bg-[#f0eadb]">
      <div className="section-wrap">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">A peek at our kitchen</p>
            <h2 className="section-heading mt-2 text-3xl sm:text-4xl">
              Find us on Instagram{" "}
              <span className="text-caramel">@tina.bakers</span>
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 font-bold text-plum"
            href="https://www.instagram.com/tina.bakers"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={19} />
            Follow along
          </Link>
        </div>
        <div className="instagram-grid">
          {Array.from({ length: 6 }, (_, index) => (
            <Link
              className="insta-tile"
              href="https://www.instagram.com/tina.bakers"
              key={index}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit Tina Bakers Instagram, post ${index + 1}`}
            >
              <Instagram size={24} strokeWidth={1.4} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
