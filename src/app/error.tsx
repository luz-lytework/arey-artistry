"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl font-bold text-dark">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-dark/60 font-body">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-block mt-6 px-6 py-3 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
