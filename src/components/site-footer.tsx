import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="footer-grid">
          <div>
            <Link className="brand-mark" href="/" aria-label="Tina Bakers home">
              <span className="brand-seal" aria-hidden="true">
                T
              </span>
              <span>
                <span className="brand-name">Tina Bakers</span>
                <span className="brand-subtitle">Meru · Kenya</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/65">
              Baked with love, made for your special moments.
            </p>
          </div>
          <div>
            <h2 className="footer-heading">Explore</h2>
            <div className="footer-link-list">
              <Link href="/shop">Shop all bakes</Link>
              <Link href="/collections/birthday">Occasions</Link>
              <Link href="/custom-cakes">Custom cakes</Link>
              <Link href="/about">Our story</Link>
            </div>
          </div>
          <div>
            <h2 className="footer-heading">Come by</h2>
            <div className="footer-link-list">
              <Link href="/contact">Contact us</Link>
              <span>Meru, Kenya 60200</span>
              <span>Mon–Sat · 8:00 AM–6:30 PM</span>
              <span>Sunday · Closed</span>
              <Link href="/policies">Ordering &amp; policies</Link>
            </div>
          </div>
          <div>
            <h2 className="footer-heading">Say hello</h2>
            <div className="footer-link-list">
              <a href={whatsappUrl()}>
                <MessageCircle className="mr-2 inline" size={15} />
                WhatsApp: 0790 187 080
              </a>
              <a
                href="https://www.instagram.com/tina.bakers"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="mr-2 inline" size={15} />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/angelotinabakers"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook className="mr-2 inline" size={15} />
                Angelo Tina Bakers
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 Tina Bakers · Meru, Kenya</span>
          <span>Handmade here, shared with love.</span>
        </div>
      </div>
    </footer>
  );
}
