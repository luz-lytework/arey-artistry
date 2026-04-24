import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import ContactForm from "./ContactForm";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Ilene Arey for custom commissions, wholesale inquiries, event bookings, or general questions about handcrafted fused glass dishware.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Contact", url: "/contact" },
            ])
          ),
        }}
      />

      {/* ── Page Header ── */}
      <section className="py-16 sm:py-20 texture-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-dark/60 font-body">
            Have a question, want to commission a piece, or interested in wholesale?
            Ilene would love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-dark mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact info */}
              <div>
                <h3 className="font-heading text-xl font-semibold text-dark mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {settings.email && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 text-peach-dark shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-dark/70 hover:text-peach-dark font-body transition-colors"
                      >
                        {settings.email}
                      </a>
                    </div>
                  )}
                  {settings.phone && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 text-peach-dark shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a
                        href={`tel:${settings.phone}`}
                        className="text-dark/70 hover:text-peach-dark font-body transition-colors"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  )}
                  {settings.location && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 text-peach-dark shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-dark/70 font-body">
                        {settings.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Social links */}
              {(settings.facebook || settings.instagram || settings.etsy) && (
                <div>
                  <h3 className="font-heading text-xl font-semibold text-dark mb-4">
                    Follow Along
                  </h3>
                  <div className="space-y-2">
                    {settings.facebook && (
                      <a
                        href={settings.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-dark/70 hover:text-peach-dark font-body transition-colors"
                      >
                        Facebook
                      </a>
                    )}
                    {settings.instagram && (
                      <a
                        href={settings.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-dark/70 hover:text-peach-dark font-body transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {settings.etsy && (
                      <a
                        href={settings.etsy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-dark/70 hover:text-peach-dark font-body transition-colors"
                      >
                        Etsy Shop
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* What to expect */}
              <div className="bg-cream-dark/30 rounded-lg p-5">
                <h3 className="font-heading text-lg font-semibold text-dark mb-3">
                  What to Expect
                </h3>
                <ul className="space-y-2 text-sm text-dark/60 font-body">
                  <li className="flex items-start gap-2">
                    <span className="text-peach-dark mt-1">&#8226;</span>
                    <span>Ilene personally reads and responds to every inquiry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-peach-dark mt-1">&#8226;</span>
                    <span>Expect a reply within 1-2 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-peach-dark mt-1">&#8226;</span>
                    <span>Custom commissions typically take 4-6 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-peach-dark mt-1">&#8226;</span>
                    <span>Wholesale inquiries welcome for boutiques and galleries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
