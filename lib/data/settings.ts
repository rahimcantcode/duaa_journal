import type { SupabaseClient } from "@supabase/supabase-js";

import type { UserSettings } from "@/lib/types/app";
import type { Database } from "@/lib/types/supabase";

export async function getUserSettings(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data satisfies UserSettings | null;
}

export async function getOrCreateUserSettings(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const existingSettings = await getUserSettings(supabase, userId);

  if (existingSettings) {
    return existingSettings;
  }

  const { data, error } = await supabase
    .from("settings")
    .upsert(
      {
        user_id: userId,
        google_form_link: null,
      },
      { onConflict: "user_id" },
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data satisfies UserSettings;
}

export async function updateSettings(
  supabase: SupabaseClient<Database>,
  input: {
    user_id: string;
    google_form_link: string | null;
  },
) {
  const { data, error } = await supabase
    .from("settings")
    .upsert(input, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data satisfies UserSettings;
}
