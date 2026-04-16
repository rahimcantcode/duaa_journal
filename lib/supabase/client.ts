"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/types/supabase";

let browserClient: SupabaseClient<Database> | undefined;

export function getSupabaseBrowserClient() {
  const { url, anonKey } = getSupabaseEnv();

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(url, anonKey);
  }

  return browserClient;
}
