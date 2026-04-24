import type { Metadata } from "next";
import { getUpcomingEvents, getCompletedEvents } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import type { Event } from "@/lib/types";

export const revalidate = 120;

export const metadata: Metadata = buildMetadata({
  title: "Shows & Events",
  description:
    "See where Arey Artistry will be exhibiting next. Find upcoming craft shows, art fairs, and events featuring handcrafted fused glass by Ilene Arey.",
  path: "/events",
});

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateRange(start: string, end: string): string {
  if (!start) return "";
  if (!end || start === end) return formatDate(start);
  const s = new Date(start + "T00:00:00");
  const e = new Date(end + "T00:00:00");
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.toLocaleDateString("en-US", { month: "long" })} ${s.getDate()}\u2013${e.getDate()}, ${s.getFullYear()}`;
  }
  return `${formatDate(start)} \u2013 ${formatDate(end)}`;
}

export default async function EventsPage() {
  const [upcoming, completed] = await Promise.all([
    getUpcomingEvents(),
    getCompletedEvents(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Shows & Events", url: "/events" },
            ])
          ),
        }}
      />

      {/* ── Page Header ── */}
      <section className="py-16 sm:py-20 texture-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark">
            Shows & Events
          </h1>
          <p className="mt-4 text-lg text-dark/60 font-body">
            Come see the work in person at an upcoming show or event
          </p>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark mb-8">
            Upcoming Events
          </h2>

          {upcoming.length > 0 ? (
            <div className="space-y-6">
              {upcoming.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="bg-cream-dark/30 rounded-lg p-8 text-center">
              <p className="text-dark/60 font-body text-lg">
                No upcoming events scheduled at this time.
              </p>
              <p className="mt-2 text-dark/40 font-body">
                Check back soon for announcements about future shows and craft fairs.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Past Events ── */}
      {completed.length > 0 && (
        <section className="py-12 sm:py-16 bg-cream-dark/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark mb-8">
              Past Events
            </h2>
            <div className="space-y-4">
              {completed.map((event) => (
                <div
                  key={event.id}
                  className="bg-cream/60 rounded-lg p-5 border border-cream-dark/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-dark/70">
                        {event.name || event.title}
                      </h3>
                      {event.location && (
                        <p className="text-sm text-dark/40 font-body">
                          {event.location}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-dark/40 font-body shrink-0">
                      {formatDateRange(event.start_date, event.end_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-dark">
            Want to Book Ilene for Your Event?
          </h2>
          <p className="mt-4 text-lg text-dark/70 font-body">
            If you organize craft fairs, art shows, or community events, reach out to discuss
            booth availability and participation.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3.5 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors text-lg"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}

function EventRow({ event }: { event: Event }) {
  return (
    <div className="bg-cream rounded-lg p-6 border border-cream-dark shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-xl font-semibold text-dark">
              {event.name || event.title}
            </h3>
            <span className="shrink-0 px-2.5 py-0.5 text-xs font-body font-medium bg-peach/20 text-peach-dark rounded-full">
              {event.status === "active" ? "Happening Now" : "Upcoming"}
            </span>
          </div>

          <p className="mt-2 text-sm text-peach-dark font-body font-medium">
            {formatDateRange(event.start_date, event.end_date)}
          </p>

          <div className="mt-3 space-y-1">
            {event.location && (
              <p className="text-sm text-dark/70 font-body flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-warm-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.location}</span>
              </p>
            )}
            {event.address && (
              <p className="text-sm text-dark/50 font-body pl-6">
                {event.address}
              </p>
            )}
            {event.hours && (
              <p className="text-sm text-dark/50 font-body flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-warm-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{event.hours}</span>
              </p>
            )}
            {event.booth_number && (
              <p className="text-sm text-dark/50 font-body pl-6">
                Booth #{event.booth_number}
              </p>
            )}
          </div>
        </div>

        {event.event_url && (
          <a
            href={event.event_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 border border-peach text-dark text-sm font-body font-medium rounded-md hover:bg-peach hover:text-dark transition-colors"
          >
            Event Page
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      {event.notes && (
        <p className="mt-4 pt-3 border-t border-cream-dark text-sm text-dark/50 font-body">
          {event.notes}
        </p>
      )}
    </div>
  );
}
