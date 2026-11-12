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

const siteUrl = "https://tina-bakery.vercel.app";

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Tina Bakers",
  description: "Cakes and bakes for celebrations and special moments in Meru, Kenya.",
  url: siteUrl,
  telephone: "+254790187080",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Meru",
    postalCode: "60200",
    addressCountry: "KE",
  },
  sameAs: [
    "https://www.instagram.com/tina.bakers",
    "https://www.facebook.com/angelotinabakers",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tina Bakers | Cakes & bakes in Meru",
    template: "%s | Tina Bakers",
  },
  description:
    "Explore celebration cakes, cupcakes and thoughtful bakes from Tina Bakers in Meru, Kenya. Choose a design and confirm your order directly on WhatsApp.",
  applicationName: "Tina Bakers",
  icons: { icon: "/tina-bakers-mark.svg" },
  openGraph: {
    title: "Tina Bakers | Cakes & bakes in Meru",
    description: "Beautiful cakes and bakes for the moments that matter.",
    url: siteUrl,
    siteName: "Tina Bakers",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tina Bakers | Cakes & bakes in Meru",
    description: "Beautiful cakes and bakes for the moments that matter.",
  },
};

export const viewport: Viewport = {
  themeColor: "#A45140",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c"),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
