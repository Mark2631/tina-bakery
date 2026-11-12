import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="footer-grid">
          <div>
            <Link className="brand-mark footer-brand" href="/" aria-label="Tina Bakers home">
              <Image src="/tina-bakers-mark.svg" alt="" width={42} height={42} />
              <span className="brand-type">
                <span className="brand-name">Tina Bakers</span>
                <span className="brand-subtitle">MERU · KENYA</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/65">
              Beautiful cakes and bakes for the moments that matter.
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
            <h2 className="footer-heading">Find us</h2>
            <div className="footer-link-list">
              <Link href="/contact">Contact & location</Link>
              <span>Meru, Kenya 60200</span>
              <span>Delivery areas and hours confirmed on enquiry</span>
              <Link href="/policies">Ordering information</Link>
            </div>
          </div>
          <div>
            <h2 className="footer-heading">Say hello</h2>
            <div className="footer-link-list">
              <a href={whatsappUrl()}>
                <MessageCircle className="mr-2 inline" size={15} />
                WhatsApp: 0790 187 080
              </a>
              <a href="https://www.instagram.com/tina.bakers" target="_blank" rel="noreferrer">
                <Instagram className="mr-2 inline" size={15} />
                Instagram
              </a>
              <a href="https://www.facebook.com/angelotinabakers" target="_blank" rel="noreferrer">
                <Facebook className="mr-2 inline" size={15} />
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tina Bakers · Meru, Kenya</span>
          <span>Orders confirmed directly with the bakery.</span>
        </div>
      </div>
    </footer>
  );
}
