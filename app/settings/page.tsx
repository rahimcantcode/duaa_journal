import { redirect } from "next/navigation";

import { SettingsPageClient } from "@/components/settings/settings-page-client";
import { SetupRequiredCard } from "@/components/shared/setup-required-card";
import { PageShell } from "@/components/ui/page-shell";
import { getCurrentUser } from "@/lib/data/auth";
import { getOrCreateProfile } from "@/lib/data/profile";
import { getOrCreateUserSettings } from "@/lib/data/settings";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <PageShell className="gap-6 pb-28 pt-6">
        <SetupRequiredCard
          title="Supabase is not connected yet."
          description="Add your Supabase URL and anon key in `.env.local`, then these settings will save to your real account."
        />
      </PageShell>
    );
  }

  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUser(supabase);

  if (!user) {
    redirect("/login");
  }

  const [profile, settings] = await Promise.all([
    getOrCreateProfile(supabase, user),
    getOrCreateUserSettings(supabase, user.id),
  ]);

  return (
    <SettingsPageClient
      userId={user.id}
      initialName={profile.full_name || "Amina Benaissa"}
      authEmail={user.email ?? ""}
      initialGoogleFormLink={settings?.google_form_link ?? ""}
    />
  );
}
