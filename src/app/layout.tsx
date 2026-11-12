import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tina Bakers | Handmade cakes in Meru",
    template: "%s | Tina Bakers",
  },
  description:
    "Handmade cakes and bakes for your special moments. Order from Tina Bakers in Meru, Kenya, and talk to us on WhatsApp.",
  metadataBase: new URL("https://tinabakers.co.ke"),
  openGraph: {
    title: "Tina Bakers | Handmade cakes in Meru",
    description: "Baked with love, made for your special moments.",
    locale: "en_KE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4B2058",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${jakarta.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
