import type { SupabaseClient, User } from "@supabase/supabase-js";

import { getUserDisplayName } from "@/lib/data/auth";
import type { Profile } from "@/lib/types/app";
import type { Database } from "@/lib/types/supabase";

export async function getCurrentUserProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data satisfies Profile | null;
}

export async function getOrCreateProfile(
  supabase: SupabaseClient<Database>,
  user: User,
) {
  const existingProfile = await getCurrentUserProfile(supabase, user.id);

  if (existingProfile) {
    return existingProfile;
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        full_name: getUserDisplayName(user),
        email: user.email ?? null,
      },
      { onConflict: "id" },
    )
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data satisfies Profile;
}
