import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Create a single supabase client for the entire app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

// Client-side singleton to prevent multiple instances
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
};

// Server-side client (for server components and API routes)
export const createServerSupabaseClient = () => {
  // Use the same environment variables for server-side
  const serverSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serverSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!serverSupabaseUrl || !serverSupabaseAnonKey) {
    throw new Error("Missing Supabase environment variables for server client");
  }

  return createClient<Database>(serverSupabaseUrl, serverSupabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
};
