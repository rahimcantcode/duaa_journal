import type { SupabaseClient } from "@supabase/supabase-js";

import { getPublicProfileEmail } from "@/lib/supabase/env";
import type { Database } from "@/lib/types/supabase";

export async function getPublicGoogleFormLink(
  supabase: SupabaseClient<Database>,
) {
  const { data, error } = await supabase.rpc("get_public_google_form_link", {
    target_email: getPublicProfileEmail(),
    target_name: "Amina Benaissa",
  });

  if (error) {
    return null;
  }

  return data;
}
