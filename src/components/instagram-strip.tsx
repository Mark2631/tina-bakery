import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SafeImage } from "@/components/safe-image";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=850&q=88",
    alt: "Cupcakes with buttercream decoration",
    label: "Little details",
  },
  {
    src: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=850&q=88",
    alt: "Chocolate cake styling inspiration",
    label: "Chocolate moments",
  },
  {
    src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=850&q=88",
    alt: "Cupcake styling inspiration",
    label: "A little colour",
  },
  {
    src: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=850&q=88",
    alt: "Celebration cake styling inspiration",
    label: "Made to celebrate",
  },
];

export function InstagramStrip() {
  return (
    <section className="section-space instagram-section home-gallery-v3">
      <div className="section-wrap">
        <div className="section-head-row">
          <div>
            <p className="eyebrow">A little inspiration</p>
            <h2 className="section-heading">Details worth dreaming about.</h2>
            <p className="section-copy">
              Explore colours, finishes and cake ideas. The photos here are
              styling references for this demo, not a verified product gallery.
            </p>
          </div>
          <Link className="section-link" href="/custom-cakes">
            Make it your own <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="home-gallery-grid">
          {gallery.map((item, index) => (
            <Link className="home-gallery-tile" href="/custom-cakes" key={item.src}>
              <SafeImage
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                sizes="(max-width: 700px) 46vw, 24vw"
              />
              <span className="home-gallery-tile-number">0{index + 1}</span>
              <span className="home-gallery-tile-label">{item.label}</span>
              <span className="home-gallery-tile-arrow"><ArrowUpRight size={17} /></span>
            </Link>
          ))}
        </div>
        <p className="photo-disclaimer">
          Replace these reference images with Tina Bakers’ own cake photographs before the public launch.
        </p>
      </div>
    </section>
  );
}
