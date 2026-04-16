import type { SupabaseClient } from "@supabase/supabase-js";

import { defaultJournalCategories } from "@/lib/data/journal-categories";
import type { Category } from "@/lib/types/app";
import type { Database } from "@/lib/types/supabase";

const duplicateNameErrorCode = "23505";

export async function getUserCategories(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data satisfies Category[];
}

export async function ensureDefaultCategories(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  await supabase.rpc("ensure_default_categories_for_user", {
    target_user_id: userId,
  });

  const categories = await getUserCategories(supabase, userId);

  const existingNames = new Set(categories.map((category) => category.name.toLowerCase()));
  const missing = defaultJournalCategories
    .filter((category) => !existingNames.has(category.name.toLowerCase()))
    .map((category) => ({
      user_id: userId,
      name: category.name,
    }));

  if (missing.length) {
    const { error } = await supabase.from("categories").insert(missing);

    if (error && error.code !== duplicateNameErrorCode) {
      throw error;
    }
  }
}

export async function createCategory(
  supabase: SupabaseClient<Database>,
  input: {
    user_id: string;
    name: string;
  },
) {
  const { data, error } = await supabase.from("categories").insert(input).select().single();

  if (error) {
    if (error.code === duplicateNameErrorCode) {
      throw new Error("A category with that name already exists.");
    }
    throw error;
  }

  return data satisfies Category;
}

export async function updateCategory(
  supabase: SupabaseClient<Database>,
  categoryId: string,
  name: string,
) {
  const { data, error } = await supabase
    .from("categories")
    .update({ name })
    .eq("id", categoryId)
    .select()
    .single();

  if (error) {
    if (error.code === duplicateNameErrorCode) {
      throw new Error("A category with that name already exists.");
    }
    throw error;
  }

  return data satisfies Category;
}

export async function deleteCategory(
  supabase: SupabaseClient<Database>,
  categoryId: string,
) {
  const { count, error: countError } = await supabase
    .from("duas")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId);

  if (countError) {
    throw countError;
  }

  if (count && count > 0) {
    throw new Error("Move or delete the duaas in this category before removing it.");
  }

  const { error } = await supabase.from("categories").delete().eq("id", categoryId);

  if (error) {
    throw error;
  }
}

export async function syncLegacyDuaCategories(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const [categories, legacyDuas] = await Promise.all([
    getUserCategories(supabase, userId),
    supabase
      .from("duas")
      .select("id, category")
      .eq("user_id", userId)
      .is("category_id", null),
  ]);

  if (legacyDuas.error) {
    throw legacyDuas.error;
  }

  const categoryMap = new Map(categories.map((category) => [category.name, category.id]));
  for (const dua of legacyDuas.data) {
    const categoryId = categoryMap.get(dua.category);

    if (!categoryId) {
      continue;
    }

    const { error } = await supabase
      .from("duas")
      .update({ category_id: categoryId })
      .eq("id", dua.id);

    if (error) {
      throw error;
    }
  }
}
