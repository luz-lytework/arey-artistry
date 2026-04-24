import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Arey Artistry",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center texture-bg">
      <div className="max-w-md mx-auto px-4 text-center">
        <h1 className="font-heading text-6xl font-bold text-dark">404</h1>
        <p className="mt-4 text-lg text-dark/60 font-body">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
