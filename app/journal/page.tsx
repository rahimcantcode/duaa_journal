import { redirect } from "next/navigation";

import { JournalPageClient } from "@/components/journal/journal-page-client";
import { SetupRequiredCard } from "@/components/shared/setup-required-card";
import { PageShell } from "@/components/ui/page-shell";
import { getCurrentUser } from "@/lib/data/auth";
import { ensureDefaultCategories, getUserCategories, syncLegacyDuaCategories } from "@/lib/data/categories";
import { getUserDuas } from "@/lib/data/duas";
import { getFriendDuaRequests } from "@/lib/data/friends-dua-requests";
import { getOrCreateProfile } from "@/lib/data/profile";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function JournalPage() {
  if (!isSupabaseConfigured()) {
    return (
      <PageShell className="gap-6 pb-28 pt-6">
        <SetupRequiredCard
          title="Supabase is not connected yet."
          description="Add your Supabase URL and anon key in `.env.local`, then this journal will become a real private space with authentication and saved duaas."
        />
      </PageShell>
    );
  }

  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUser(supabase);

  if (!user) {
    redirect("/login");
  }

  await ensureDefaultCategories(supabase, user.id);
  await syncLegacyDuaCategories(supabase, user.id);

  const [profile, categories, duas, friendRequests] = await Promise.all([
    getOrCreateProfile(supabase, user),
    getUserCategories(supabase, user.id),
    getUserDuas(supabase, user.id),
    getFriendDuaRequests(supabase),
  ]);

  return (
    <JournalPageClient
      userId={user.id}
      initialCategories={categories}
      initialDuas={duas}
      initialFriendRequests={friendRequests}
      userName={profile.full_name || "Amina Benaissa"}
    />
  );
}
