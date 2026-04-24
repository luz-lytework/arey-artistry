// ── Ray IDs for Arey Artistry (field: c2bee028-14a6-4177-a88c-32ae7ba0777f) ──

export const RAY_IDS = {
  EVENTS: "4a01db92-c208-4de7-bae7-7319a50796f3",
  PRODUCTS: "f36f8ee2-3ccf-4d5f-8913-38fe315593a1",
  TESTIMONIALS: "f9bb3d0c-f22f-438e-be21-1b244b591fb8",
  PAGES: "c83b67aa-c688-4a26-a904-84b021557e2f",
  SITE_SETTINGS: "206eb6b0-a20a-41d1-b178-cdb2e7c318bc",
  INQUIRIES: "904ffbb5-2afb-44e3-8e76-f0532cf93a07",
} as const;

// ── Data shapes (based on lyte schemas) ──

export interface Product {
  id: string;
  title: string;
  name: string;
  catalog_number: string;
  category: string;
  description: string;
  image_url: string;
  dimensions: string;
  available: boolean;
  commission_ok: boolean;
  featured: boolean;
  sort_order: number;
}

export interface Event {
  id: string;
  title: string;
  name: string;
  start_date: string;
  end_date: string;
  location: string;
  address: string;
  hours: string;
  event_url: string;
  status: "upcoming" | "active" | "completed" | "cancelled";
  booth_number: string;
  notes: string;
}

export interface Testimonial {
  id: string;
  title: string;
  quote: string;
  author: string;
  location: string;
  date: string;
  product_ref: string;
  featured: boolean;
}

export interface PageSection {
  id: string;
  title: string;
  page_slug: string;
  section: string;
  heading: string;
  body: string;
  image_url: string;
  cta_text: string;
  cta_url: string;
  sort_order: number;
}

export interface SiteSetting {
  id: string;
  title: string;
  setting_key: string;
  value: string;
  category: string;
  active: boolean;
}

export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  inquiry_type: "general" | "commission" | "wholesale" | "event";
  message: string;
}

// ── Raw ray_entry row ──
export interface RayEntry {
  id: string;
  title: string;
  properties: Record<string, unknown>;
  created_at: string;
}
