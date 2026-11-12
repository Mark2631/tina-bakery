"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-context";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/birthday", label: "Occasions" },
  { href: "/custom-cakes", label: "Custom cakes" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Contact" },
];

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <Link className="brand-mark" href="/" aria-label="Tina Bakers home" onClick={onClick}>
      <Image src="/tina-bakers-mark.svg" alt="" width={42} height={42} priority />
      <span className="brand-type">
        <span className="brand-name">Tina Bakers</span>
        <span className="brand-subtitle">MERU · KENYA</span>
      </span>
    </Link>
  );
}

export function AnnouncementBar() {
  return (
    <div className="announcement">
      <span className="announcement-dot" aria-hidden="true" />
      <span>Made to order in Meru</span>
      <span className="announcement-separator" aria-hidden="true">·</span>
      <span>Order and confirm on WhatsApp</span>
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
          <div className="flex items-center justify-between">
            <BrandMark onClick={() => onOpenChange(false)} />
            <Dialog.Close className="icon-button border-white/30 text-white" aria-label="Close navigation">
              <X size={20} />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
          <nav aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => onOpenChange(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => onOpenChange(false)}>
              Your order {count ? "(" + count + ")" : ""}
            </Link>
          </nav>
          <p className="mt-auto text-sm text-white/65">
            Beautiful cakes for the moments that matter.
          </p>
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
          <button type="button" className="mobile-menu-trigger" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu size={23} />
          </button>
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <div className="header-actions">
            <Link href="/shop" className="header-order-link">Order a cake</Link>
            <button type="button" className="cart-trigger" aria-label={"Open cart, " + count + " items"} onClick={() => setDrawerOpen(true)}>
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
