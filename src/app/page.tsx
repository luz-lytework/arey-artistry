import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getFeaturedProducts,
  getUpcomingEvents,
  getFeaturedTestimonials,
  getPageSections,
} from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import type { Product, Event, Testimonial, PageSection } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  path: "/",
});

export default async function HomePage() {
  const [featuredProducts, upcomingEvents, testimonials, pageSections] =
    await Promise.all([
      getFeaturedProducts(),
      getUpcomingEvents(),
      getFeaturedTestimonials(),
      getPageSections("home"),
    ]);

  // Find hero section from page content
  const heroSection = pageSections.find((s) => s.section === "hero");
  const introSection = pageSections.find((s) => s.section === "intro");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Home", url: "/" }])
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden texture-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight">
              {heroSection?.heading || "Timeless Dishware with Artistic Flare"}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-dark/70 font-body leading-relaxed max-w-2xl">
              {heroSection?.body ||
                "Each piece of fused glass dishware is handcrafted by artist Ilene Arey — fired, shaped, and finished with care. No two pieces are alike."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={heroSection?.cta_url || "/products"}
                className="px-6 py-3 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors text-base"
              >
                {heroSection?.cta_text || "View Collection"}
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border-2 border-dark/20 text-dark font-body font-semibold rounded-md hover:border-dark/40 hover:bg-dark/5 transition-colors text-base"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-10 right-0 w-72 h-72 bg-peach/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-peach/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* ── Intro Section ── */}
      {introSection && (
        <section className="py-16 sm:py-20 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {introSection.heading && (
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-6">
                {introSection.heading}
              </h2>
            )}
            <p className="text-lg text-dark/70 font-body leading-relaxed">
              {introSection.body}
            </p>
          </div>
        </section>
      )}

      {/* ── Featured Products ── */}
      <section className="py-16 sm:py-20 bg-cream-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
              Featured Pieces
            </h2>
            <p className="mt-3 text-dark/60 font-body text-lg">
              A selection of handcrafted fused glass dishware
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-dark/50 font-body py-12">
              Featured pieces coming soon. Check back for our latest creations.
            </p>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-block px-6 py-3 border-2 border-peach text-dark font-body font-semibold rounded-md hover:bg-peach hover:text-dark transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
              Upcoming Shows & Events
            </h2>
            <p className="mt-3 text-dark/60 font-body text-lg">
              Come see the work in person
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-dark/50 font-body py-12">
              No upcoming events scheduled. Follow us for announcements about future shows.
            </p>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-block px-6 py-3 border-2 border-peach text-dark font-body font-semibold rounded-md hover:bg-peach hover:text-dark transition-colors"
            >
              See All Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-20 bg-dark text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-cream">
              What People Are Saying
            </h2>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <p className="text-center text-cream/50 font-body py-12">
              Testimonials coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 texture-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
            Interested in a Custom Piece?
          </h2>
          <p className="mt-4 text-lg text-dark/70 font-body">
            Whether you are looking for a unique gift, a custom commission, or wholesale
            opportunities, Ilene would love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 px-8 py-3.5 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors text-lg"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}

// ── Subcomponents ──

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-cream rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square bg-cream-dark relative overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name || product.title || "Fused glass product"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-warm-gray">
            <svg className="w-16 h-16 glass-shimmer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-dark">
          {product.name || product.title}
        </h3>
        <p className="text-sm text-warm-gray font-body mt-1">
          {product.category && (
            <span className="capitalize">{product.category.replace("_", " ")}</span>
          )}
          {product.catalog_number && (
            <span className="ml-2 text-warm-gray-light">#{product.catalog_number}</span>
          )}
        </p>
        {product.description && (
          <p className="mt-2 text-sm text-dark/60 font-body line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-cream-dark/50 rounded-lg p-6 border border-cream-dark">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl font-semibold text-dark">
            {event.name || event.title}
          </h3>
          <p className="mt-1 text-sm text-peach-dark font-body font-medium">
            {formatDate(event.start_date)}
            {event.end_date && event.end_date !== event.start_date && (
              <> &ndash; {formatDate(event.end_date)}</>
            )}
          </p>
        </div>
        {event.status === "upcoming" && (
          <span className="shrink-0 px-2.5 py-0.5 text-xs font-body font-medium bg-peach/20 text-peach-dark rounded-full">
            Upcoming
          </span>
        )}
      </div>
      {event.location && (
        <p className="mt-3 text-sm text-dark/70 font-body">{event.location}</p>
      )}
      {event.address && (
        <p className="text-sm text-dark/50 font-body">{event.address}</p>
      )}
      {event.hours && (
        <p className="mt-1 text-sm text-dark/50 font-body">{event.hours}</p>
      )}
      {event.booth_number && (
        <p className="mt-1 text-sm text-dark/50 font-body">
          Booth #{event.booth_number}
        </p>
      )}
      {event.event_url && (
        <a
          href={event.event_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-peach-dark hover:text-peach font-body font-medium underline underline-offset-2"
        >
          Event Details
        </a>
      )}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="bg-dark-light rounded-lg p-6 border border-cream/10">
      <p className="text-cream/90 font-body italic leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="mt-4">
        <cite className="not-italic">
          <span className="text-peach font-body font-semibold text-sm">
            {testimonial.author}
          </span>
          {testimonial.location && (
            <span className="text-cream/40 font-body text-sm ml-2">
              {testimonial.location}
            </span>
          )}
        </cite>
      </footer>
    </blockquote>
  );
}
