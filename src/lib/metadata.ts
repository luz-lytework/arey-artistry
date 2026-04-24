import type { Metadata } from "next";

const SITE_NAME = "Arey Artistry";
const SITE_URL = "https://areyartistry.com";
const SITE_DESCRIPTION =
  "Handcrafted fused glass dishware by Ilene Arey. Timeless bowls, trays, platters, clocks, and spoon rests — each piece uniquely crafted with artistic flare.";

export function buildMetadata(overrides: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const title = overrides.title
    ? `${overrides.title} | ${SITE_NAME}`
    : `${SITE_NAME} — Timeless Dishware with Artistic Flare`;
  const description = overrides.description || SITE_DESCRIPTION;
  const url = `${SITE_URL}${overrides.path || ""}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ── JSON-LD helpers ──

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    priceRange: "$$",
    image: `${SITE_URL}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    sameAs: [],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ilene Arey",
    jobTitle: "Glass Artist",
    worksFor: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
    },
    url: `${SITE_URL}/about`,
  };
}
