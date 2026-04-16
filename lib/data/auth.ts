import type { SupabaseClient, User } from "@supabase/supabase-js";

import type { Database } from "@/lib/types/supabase";

export async function getCurrentUser(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export function getUserDisplayName(user: User | null) {
  return user?.user_metadata.full_name ?? "Amina Benaissa";
}
