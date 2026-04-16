import type { SupabaseClient } from "@supabase/supabase-js";

import type { Dua, DuaInsert, DuaUpdate } from "@/lib/types/app";
import type { Database } from "@/lib/types/supabase";

export async function getUserDuas(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("duas")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data satisfies Dua[];
}

export async function getUserDuasByCategory(
  supabase: SupabaseClient<Database>,
  userId: string,
  categoryId: string,
) {
  const { data, error } = await supabase
    .from("duas")
    .select("*")
    .eq("user_id", userId)
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data satisfies Dua[];
}

export async function createDua(
  supabase: SupabaseClient<Database>,
  input: DuaInsert,
) {
  const { data, error } = await supabase.from("duas").insert(input).select().single();

  if (error) {
    throw error;
  }

  return data satisfies Dua;
}

export async function updateDua(
  supabase: SupabaseClient<Database>,
  duaId: string,
  input: DuaUpdate,
) {
  const { data, error } = await supabase
    .from("duas")
    .update(input)
    .eq("id", duaId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data satisfies Dua;
}

export async function deleteDua(
  supabase: SupabaseClient<Database>,
  duaId: string,
) {
  const { error } = await supabase.from("duas").delete().eq("id", duaId);

  if (error) {
    throw error;
  }
}

export async function toggleFavorite(
  supabase: SupabaseClient<Database>,
  duaId: string,
  currentValue: boolean,
) {
  return updateDua(supabase, duaId, { is_favorite: !currentValue });
}
