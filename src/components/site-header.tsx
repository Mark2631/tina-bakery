"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-context";

const navLinks = [
  { href: "/shop", label: "Cakes & bakes" },
  { href: "/collections/snacks", label: "Gifts & snacks" },
  { href: "/collections/birthday", label: "Celebrations" },
  { href: "/custom-cakes", label: "Custom cakes" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Find us" },
];

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      className="brand-mark"
      href="/"
      aria-label="Tina Bakers home"
      onClick={onClick}
    >
      <Image
        src="/images/tina-bakers-logo.webp"
        alt="Tina Bakers"
        width={520}
        height={296}
        priority
        className="brand-logo-image"
      />
    </Link>
  );
}

export function AnnouncementBar() {
  return (
    <div className="announcement">
      <span className="announcement-dot" />
      <span>Fresh ideas, cakes and gifts in Meru</span>
      <span className="announcement-divider">—</span>
      <span>Let’s make something worth celebrating</span>
    </div>
  );
}

export function MobileNavDrawer({
  open,
  onOpenChange,
  count,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-nav-overlay" />
        <Dialog.Content className="mobile-drawer">
          <div className="mobile-drawer-head">
            <BrandMark onClick={() => onOpenChange(false)} />
            <Dialog.Close className="icon-button" aria-label="Close navigation">
              <X size={20} />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
          <nav aria-label="Mobile navigation">
            {navLinks.map((link, index) => (
              <Link key={link.href} href={link.href} onClick={() => onOpenChange(false)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {link.label}
                <ArrowUpRight size={17} />
              </Link>
            ))}
            <Link href="/cart" onClick={() => onOpenChange(false)}>
              <span>{String(navLinks.length + 1).padStart(2, "0")}</span>
              Your order {count ? "(" + count + ")" : ""}
              <ShoppingBag size={17} />
            </Link>
          </nav>
          <div className="mobile-drawer-note">
            <span>BAKED IN MERU, KENYA</span>
            <p>Good things are better when they’re shared.</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setDrawerOpen } = useCart();

  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="header-inner">
          <button
            type="button"
            className="mobile-menu-trigger"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={23} />
          </button>
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/shop" className="header-order-link">
              Order a cake <ArrowUpRight size={15} />
            </Link>
            <button
              type="button"
              className="cart-trigger"
              aria-label={"Open cart, " + count + " items"}
              onClick={() => setDrawerOpen(true)}
            >
              <ShoppingBag size={19} />
              {count > 0 && <span className="cart-count" aria-live="polite">{count}</span>}
            </button>
          </div>
        </div>
      </header>
      <MobileNavDrawer open={menuOpen} onOpenChange={setMenuOpen} count={count} />
    </>
  );
}
