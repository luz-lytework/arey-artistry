import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-cream/80" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-cream mb-2">
              Arey Artistry
            </h3>
            <p className="text-sm text-cream/60 font-body leading-relaxed">
              Timeless Dishware with Artistic Flare
            </p>
            <p className="mt-3 text-sm text-cream/50 font-body">
              Handcrafted fused glass by Ilene Arey. Every piece is unique, fired with care,
              and made to be treasured.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Ilene" },
                { href: "/products", label: "Product Samples" },
                { href: "/events", label: "Shows & Events" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-peach transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-3">
              Get in Touch
            </h4>
            <p className="text-sm text-cream/60 font-body leading-relaxed">
              Interested in a custom piece or wholesale inquiry?
            </p>
            <Link
              href="/contact"
              className="inline-block mt-3 px-5 py-2 bg-peach text-dark text-sm font-body font-semibold rounded-md hover:bg-peach-dark transition-colors"
            >
              Contact Ilene
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/10 text-center">
          <p className="text-xs text-cream/40 font-body">
            &copy; {currentYear} Arey Artistry. All rights reserved. Handcrafted in the USA.
          </p>
        </div>
      </div>
    </footer>
  );
}
