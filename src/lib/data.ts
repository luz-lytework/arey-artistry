import { supabase } from "./supabase";
import {
  RAY_IDS,
  type Product,
  type Event,
  type Testimonial,
  type PageSection,
  type SiteSetting,
  type RayEntry,
} from "./types";

// ── Generic fetcher ──

async function fetchRayEntries(rayId: string): Promise<RayEntry[]> {
  const { data, error } = await supabase
    .from("ray_entry")
    .select("id, title, properties, created_at")
    .eq("ray_id", rayId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Failed to fetch ray ${rayId}:`, error);
    return [];
  }

  return (data || []) as RayEntry[];
}

function mapEntry<T>(entry: RayEntry): T {
  const props = entry.properties as Record<string, unknown>;
  return {
    id: entry.id,
    title: entry.title,
    ...props,
  } as T;
}

// ── Products ──

export async function getProducts(): Promise<Product[]> {
  const entries = await fetchRayEntries(RAY_IDS.PRODUCTS);
  return entries.map(mapEntry<Product>);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

// ── Events ──

export async function getEvents(): Promise<Event[]> {
  const entries = await fetchRayEntries(RAY_IDS.EVENTS);
  return entries.map(mapEntry<Event>);
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await getEvents();
  return events
    .filter((e) => e.status === "upcoming" || e.status === "active")
    .sort((a, b) => (a.start_date || "").localeCompare(b.start_date || ""));
}

export async function getCompletedEvents(): Promise<Event[]> {
  const events = await getEvents();
  return events
    .filter((e) => e.status === "completed")
    .sort((a, b) => (b.start_date || "").localeCompare(a.start_date || ""));
}

// ── Testimonials ──

export async function getTestimonials(): Promise<Testimonial[]> {
  const entries = await fetchRayEntries(RAY_IDS.TESTIMONIALS);
  return entries.map(mapEntry<Testimonial>);
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials();
  return testimonials.filter((t) => t.featured);
}

// ── Pages ──

export async function getPageSections(pageSlug: string): Promise<PageSection[]> {
  const entries = await fetchRayEntries(RAY_IDS.PAGES);
  const sections = entries.map(mapEntry<PageSection>);
  return sections
    .filter((s) => s.page_slug === pageSlug)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

// ── Site Settings ──

export async function getSiteSettings(): Promise<Record<string, string>> {
  const entries = await fetchRayEntries(RAY_IDS.SITE_SETTINGS);
  const settings = entries.map(mapEntry<SiteSetting>);
  const map: Record<string, string> = {};
  for (const s of settings) {
    if (s.active !== false) {
      map[s.setting_key] = s.value;
    }
  }
  return map;
}
