import type { Metadata } from "next";
import { Beiruti, Literata } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { organizationJsonLd } from "@/lib/metadata";
import "./globals.css";

const beiruti = Beiruti({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "600", "700"],
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Arey Artistry — Timeless Dishware with Artistic Flare",
    template: "%s | Arey Artistry",
  },
  description:
    "Handcrafted fused glass dishware by Ilene Arey. Timeless bowls, trays, platters, clocks, and spoon rests — each piece uniquely crafted with artistic flare.",
  metadataBase: new URL("https://areyartistry.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Arey Artistry",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${beiruti.variable} ${literata.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-dark">
        <noscript>
          <div className="noscript-message">
            <h2>Arey Artistry</h2>
            <p>Timeless Dishware with Artistic Flare</p>
            <p>
              Handcrafted fused glass dishware by Ilene Arey. Bowls, trays, platters, clocks,
              spoon rests, and wall art — each piece uniquely crafted with artistic flare.
            </p>
            <p>Services: Custom commissions, wholesale, event exhibitions</p>
            <p>Contact: Visit areyartistry.com/contact to reach Ilene</p>
          </div>
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
