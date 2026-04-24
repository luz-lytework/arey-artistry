import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import ProductGallery from "./ProductGallery";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Product Samples",
  description:
    "Browse handcrafted fused glass dishware by Ilene Arey — bowls, trays, platters, clocks, spoon rests, and wall art. Each piece is unique.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();

  // Extract unique categories
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  ).sort();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Product Samples", url: "/products" },
            ])
          ),
        }}
      />

      {/* ── Page Header ── */}
      <section className="py-16 sm:py-20 texture-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark">
            Product Samples
          </h1>
          <p className="mt-4 text-lg text-dark/60 font-body max-w-2xl mx-auto">
            Each piece of fused glass is handcrafted and one-of-a-kind. Browse the collection
            below to see what is available and get inspired for a custom commission.
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <ProductGallery products={products} categories={categories} />
          ) : (
            <div className="text-center py-20">
              <svg
                className="w-20 h-20 mx-auto text-warm-gray-light glass-shimmer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h2 className="mt-6 font-heading text-2xl font-bold text-dark">
                Collection Coming Soon
              </h2>
              <p className="mt-2 text-dark/60 font-body">
                Products are being added to the gallery. Check back soon to see
                the full collection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Commission CTA ── */}
      <section className="py-16 sm:py-20 bg-cream-dark/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark">
            Do Not See What You Are Looking For?
          </h2>
          <p className="mt-4 text-lg text-dark/70 font-body">
            Ilene accepts custom commissions. Share your vision and she will create a
            piece tailored to your style, colors, and dimensions.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3.5 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors text-lg"
          >
            Request a Commission
          </a>
        </div>
      </section>
    </>
  );
}
