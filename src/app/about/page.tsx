import Image from "next/image";
import type { Metadata } from "next";
import { getPageSections, getTestimonials } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd, personJsonLd } from "@/lib/metadata";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "About Ilene",
  description:
    "Meet Ilene Arey — the artist behind Arey Artistry. Learn about her journey with fused glass and the process of creating handcrafted dishware.",
  path: "/about",
});

export default async function AboutPage() {
  const [pageSections, testimonials] = await Promise.all([
    getPageSections("about"),
    getTestimonials(),
  ]);

  const bioSection = pageSections.find((s) => s.section === "bio");
  const processSection = pageSections.find((s) => s.section === "process");
  const storySection = pageSections.find((s) => s.section === "story");
  const remainingSections = pageSections.filter(
    (s) => !["bio", "process", "story"].includes(s.section)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "About Ilene", url: "/about" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd()),
        }}
      />

      {/* ── Page Header ── */}
      <section className="py-16 sm:py-20 texture-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark">
            About Ilene
          </h1>
          <p className="mt-4 text-lg text-dark/60 font-body">
            The artist behind every piece
          </p>
        </div>
      </section>

      {/* ── Bio Section ── */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-cream-dark">
              {bioSection?.image_url ? (
                <Image
                  src={bioSection.image_url}
                  alt="Ilene Arey, glass artist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-warm-gray">
                  <div className="text-center">
                    <svg
                      className="w-20 h-20 mx-auto glass-shimmer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <p className="mt-2 text-sm">Photo coming soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bio text */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-6">
                {bioSection?.heading || "Meet the Artist"}
              </h2>
              <div className="prose prose-lg">
                <p className="text-dark/70 font-body leading-relaxed text-lg">
                  {bioSection?.body ||
                    "Ilene Arey is a fused glass artist who creates one-of-a-kind dishware pieces. Each bowl, tray, platter, and decorative item is carefully designed, cut, and fired in her studio kiln. With a passion for color, texture, and form, Ilene transforms sheets of glass into functional art that brings warmth and beauty to every table."}
                </p>
              </div>
              {bioSection?.cta_text && bioSection?.cta_url && (
                <a
                  href={bioSection.cta_url}
                  className="inline-block mt-6 px-6 py-3 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors"
                >
                  {bioSection.cta_text}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Story Section ── */}
      {storySection && (
        <section className="py-16 sm:py-20 bg-cream-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-6 text-center">
              {storySection.heading || "The Story"}
            </h2>
            <p className="text-lg text-dark/70 font-body leading-relaxed text-center">
              {storySection.body}
            </p>
          </div>
        </section>
      )}

      {/* ── The Process ── */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark">
              {processSection?.heading || "The Fused Glass Process"}
            </h2>
            <p className="mt-3 text-dark/60 font-body text-lg max-w-2xl mx-auto">
              {processSection?.body ||
                "Every piece goes through a meticulous multi-step process, from design to final firing."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Design",
                description:
                  "Each piece begins with a vision — selecting colors, patterns, and shapes that will complement the final form.",
              },
              {
                step: "02",
                title: "Cut & Layer",
                description:
                  "Glass sheets are carefully scored, cut, and layered to create depth and visual interest in the finished piece.",
              },
              {
                step: "03",
                title: "Kiln Firing",
                description:
                  "The layered glass is placed in a kiln and fired at temperatures up to 1500°F, fusing the layers into one solid piece.",
              },
              {
                step: "04",
                title: "Shaping & Finishing",
                description:
                  "After cooling, the fused piece may be slumped over a mold to create functional shapes like bowls and trays.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-peach/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading text-xl font-bold text-peach-dark">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-dark/60 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Additional page sections ── */}
      {remainingSections.map((section) => (
        <section
          key={section.id}
          className="py-16 sm:py-20 bg-cream-dark/20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {section.heading && (
              <h2 className="font-heading text-3xl font-bold text-dark mb-6 text-center">
                {section.heading}
              </h2>
            )}
            {section.body && (
              <p className="text-lg text-dark/70 font-body leading-relaxed text-center">
                {section.body}
              </p>
            )}
            {section.image_url && (
              <div className="mt-8 relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={section.image_url}
                  alt={section.heading || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-20 bg-dark text-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-cream text-center mb-12">
              Kind Words
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <blockquote
                  key={t.id}
                  className="bg-dark-light rounded-lg p-6 border border-cream/10"
                >
                  <p className="text-cream/90 font-body italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4">
                    <cite className="not-italic">
                      <span className="text-peach font-body font-semibold text-sm">
                        {t.author}
                      </span>
                      {t.location && (
                        <span className="text-cream/40 font-body text-sm ml-2">
                          {t.location}
                        </span>
                      )}
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
