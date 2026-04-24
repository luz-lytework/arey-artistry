import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://lncnhoubnqgdfqgpksvc.supabase.co";

// Use service role key for writes (bypasses RLS), fall back to anon key
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const INQUIRIES_RAY_ID = "904ffbb5-2afb-44e3-8e76-f0532cf93a07";

// Basic email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Rate limiting: simple in-memory store (resets on cold start, good enough for forms)
const submissions = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_SUBMISSIONS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastSubmit = submissions.get(ip);
  if (!lastSubmit) return false;

  // Clean old entries periodically
  if (submissions.size > 1000) {
    for (const [key, time] of submissions) {
      if (now - time > RATE_LIMIT_WINDOW) submissions.delete(key);
    }
  }

  return now - lastSubmit < RATE_LIMIT_WINDOW / MAX_SUBMISSIONS;
}

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const inquiry_type = typeof body.inquiry_type === "string" ? body.inquiry_type : "general";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Validation
  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Please provide your name." },
      { status: 400 }
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: "Please provide a message (at least 10 characters)." },
      { status: 400 }
    );
  }
  if (!["general", "commission", "wholesale", "event"].includes(inquiry_type)) {
    return NextResponse.json(
      { error: "Invalid inquiry type." },
      { status: 400 }
    );
  }

  // Honeypot: reject if body contains a "website" field with a value
  if (typeof body.website === "string" && body.website.length > 0) {
    // Silently accept (looks like success to bots)
    return NextResponse.json({ success: true });
  }

  try {
    const { error } = await supabase.from("ray_entry").insert({
      ray_id: INQUIRIES_RAY_ID,
      title: `${name} — ${inquiry_type}`,
      properties: {
        name,
        email,
        phone,
        inquiry_type,
        message,
        status: "new",
        submitted_at: new Date().toISOString().split("T")[0],
      },
    });

    if (error) {
      console.error("Failed to insert inquiry:", error);
      return NextResponse.json(
        { error: "Failed to submit your message. Please try again." },
        { status: 500 }
      );
    }

    // Track submission for rate limiting
    submissions.set(ip, Date.now());

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
