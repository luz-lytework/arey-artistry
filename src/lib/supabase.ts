import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://lncnhoubnqgdfqgpksvc.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuY25ob3VibnFnZGZxZ3Brc3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MTU0MjYsImV4cCI6MjA5MTI5MTQyNn0.mqdoLnCUduqNRKbxKiffxyBJotEB8iswyoHUYe8_9TE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
