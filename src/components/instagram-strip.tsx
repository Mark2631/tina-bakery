import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

const gallery = [
  { src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=700&q=80", alt: "Cupcake styling reference" },
  { src: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=700&q=80", alt: "Chocolate cake styling reference" },
  { src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=700&q=80", alt: "Cupcakes with buttercream reference" },
  { src: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=700&q=80", alt: "Celebration cake styling reference" },
];

export function InstagramStrip() {
  return (
    <section className="section-space instagram-section">
      <div className="section-wrap">
        <div className="section-head-row mb-7">
          <div>
            <p className="eyebrow">The inspiration board</p>
            <h2 className="section-heading mt-2">Sweet details. Lovely moments.</h2>
            <p className="section-copy mt-3">A glimpse of the colours, textures and details that make a celebration feel special.</p>
          </div>
          <Link className="inline-flex items-center gap-2 font-bold text-plum" href="https://www.instagram.com/tina.bakers" target="_blank" rel="noreferrer">
            <Instagram size={19} />
            @tina.bakers
          </Link>
        </div>
        <div className="instagram-grid">
          {gallery.map((image) => (
            <Link className="insta-tile" href="https://www.instagram.com/tina.bakers" key={image.src} target="_blank" rel="noreferrer" aria-label="Visit Tina Bakers on Instagram">
              <Image src={image.src} alt={image.alt} fill unoptimized sizes="(max-width: 640px) 42vw, 16vw" />
              <span className="insta-open"><Instagram size={18} /></span>
            </Link>
          ))}
        </div>
        <p className="photo-disclaimer">These are visual references, not a live Instagram feed or verified Tina Bakers product photographs.</p>
      </div>
    </section>
  );
}
