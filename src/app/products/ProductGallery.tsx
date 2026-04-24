"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";

interface ProductGalleryProps {
  products: Product[];
  categories: string[];
}

export default function ProductGallery({
  products,
  categories,
}: ProductGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  const expanded = expandedProduct
    ? products.find((p) => p.id === expandedProduct)
    : null;

  const formatCategory = (cat: string) =>
    cat.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* ── Category filters ── */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-colors ${
              activeCategory === null
                ? "bg-peach text-dark"
                : "bg-cream-dark text-dark/60 hover:bg-cream-dark/80"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-peach text-dark"
                  : "bg-cream-dark text-dark/60 hover:bg-cream-dark/80"
              }`}
            >
              {formatCategory(cat)}
            </button>
          ))}
        </div>
      )}

      {/* ── Product grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filtered.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() =>
              setExpandedProduct(
                expandedProduct === product.id ? null : product.id
              )
            }
            className="text-left group bg-cream rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-peach focus:ring-offset-2"
            aria-expanded={expandedProduct === product.id}
          >
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
                  <svg
                    className="w-16 h-16 glass-shimmer"
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
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-heading text-lg font-semibold text-dark">
                {product.name || product.title}
              </h3>
              <p className="text-sm text-warm-gray font-body mt-1">
                {product.category && (
                  <span className="capitalize">
                    {formatCategory(product.category)}
                  </span>
                )}
                {product.catalog_number && (
                  <span className="ml-2 text-warm-gray-light">
                    #{product.catalog_number}
                  </span>
                )}
              </p>
              {product.description && (
                <p className="mt-2 text-sm text-dark/60 font-body line-clamp-2">
                  {product.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-dark/50 font-body py-12">
          No products in this category yet.
        </p>
      )}

      {/* ── Expanded product modal ── */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${expanded.name || expanded.title}`}
          onClick={() => setExpandedProduct(null)}
          onKeyDown={(e) => e.key === "Escape" && setExpandedProduct(null)}
        >
          <div
            className="bg-cream rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-cream-dark">
              {expanded.image_url ? (
                <Image
                  src={expanded.image_url}
                  alt={expanded.name || expanded.title || "Product detail"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 672px) 100vw, 672px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-warm-gray">
                  <svg
                    className="w-24 h-24"
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
                </div>
              )}
              <button
                type="button"
                onClick={() => setExpandedProduct(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-dark/50 text-cream rounded-full flex items-center justify-center hover:bg-dark/70 transition-colors"
                aria-label="Close product details"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Details */}
            <div className="p-6">
              <h2 className="font-heading text-2xl font-bold text-dark">
                {expanded.name || expanded.title}
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {expanded.category && (
                  <span className="px-3 py-1 bg-peach/20 text-peach-dark text-sm font-body font-medium rounded-full">
                    {formatCategory(expanded.category)}
                  </span>
                )}
                {expanded.catalog_number && (
                  <span className="px-3 py-1 bg-cream-dark text-dark/60 text-sm font-body rounded-full">
                    Catalog #{expanded.catalog_number}
                  </span>
                )}
                {expanded.available && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-body font-medium rounded-full">
                    Available
                  </span>
                )}
                {expanded.commission_ok && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-body font-medium rounded-full">
                    Commissions OK
                  </span>
                )}
              </div>

              {expanded.description && (
                <p className="mt-4 text-dark/70 font-body leading-relaxed">
                  {expanded.description}
                </p>
              )}

              {expanded.dimensions && (
                <p className="mt-3 text-sm text-dark/50 font-body">
                  <span className="font-medium text-dark/70">Dimensions:</span>{" "}
                  {expanded.dimensions}
                </p>
              )}

              <div className="mt-6 pt-4 border-t border-cream-dark">
                <a
                  href="/contact"
                  className="inline-block px-6 py-2.5 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors text-sm"
                >
                  Inquire About This Piece
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
