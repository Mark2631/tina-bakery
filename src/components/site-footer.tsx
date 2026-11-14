import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Link className="footer-wordmark" href="/" aria-label="Tina Bakers home">
              <span className="footer-logo-panel">
                <Image
                  src="/images/tina-bakers-logo.webp"
                  alt="Tina Bakers"
                  width={520}
                  height={296}
                  className="footer-logo-image"
                />
              </span>
            </Link>
            <p>Cakes, bakes and little reasons to celebrate. Made to order in Meru, Kenya.</p>
            <a className="footer-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> Say hello on WhatsApp <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <Link href="/shop">The menu</Link>
            <Link href="/collections/birthday">Celebrations</Link>
            <Link href="/custom-cakes">Custom cakes</Link>
            <Link href="/about">Our story</Link>
          </div>
          <div className="footer-column">
            <h2>Visit & connect</h2>
            <Link href="/contact">Find us in Meru</Link>
            <a href="https://www.instagram.com/tina.bakers" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a>
            <a href="https://www.facebook.com/angelotinabakers" target="_blank" rel="noreferrer"><Facebook size={15} /> Facebook</a>
            <Link href="/policies">Ordering information</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tina Bakers · Meru, Kenya</span>
          <span>Made with a little more care.</span>
        </div>
      </div>
    </footer>
  );
}
