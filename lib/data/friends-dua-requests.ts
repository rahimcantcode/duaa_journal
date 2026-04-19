import type { SupabaseClient } from "@supabase/supabase-js";

import type { FriendDuaRequest, FriendDuaRequestInsert } from "@/lib/types/app";
import type { Database } from "@/lib/types/supabase";

export async function getFriendDuaRequests(
  supabase: SupabaseClient<Database>,
) {
  const { data, error } = await supabase
    .from("friends_dua_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data satisfies FriendDuaRequest[];
}

export async function createFriendDuaRequest(
  supabase: SupabaseClient<Database>,
  input: FriendDuaRequestInsert,
) {
  const { error } = await supabase
    .from("friends_dua_requests")
    .insert(input);

  if (error) {
    throw error;
  }
}
