export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-peach/30 border-t-peach rounded-full mx-auto glass-shimmer" />
        <p className="mt-4 text-dark/50 font-body text-sm">Loading...</p>
      </div>
    </div>
  );
}
