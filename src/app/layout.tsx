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
  title: "Arey Artistry — Timeless Dishware with Artistic Flare",
  description:
    "Handcrafted fused glass dishware by Ilene Arey. Timeless bowls, trays, platters, clocks, and spoon rests — each piece uniquely crafted with artistic flare.",
  metadataBase: new URL("https://areyartistry.com"),
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
            <p>
              This site works best with JavaScript enabled. You can still browse all content,
              but some interactive features like the product gallery and contact form require JavaScript.
            </p>
          </div>
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
