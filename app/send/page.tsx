import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { SoftButton } from "@/components/ui/soft-button";
import { getCurrentUser } from "@/lib/data/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SendPage() {
  noStore();

  let googleFormLink: string | null = null;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const user = await getCurrentUser(supabase);

      console.log("[/send] current user id:", user?.id ?? null);

      if (user) {
        const { data: settingsRow, error } = await supabase
          .from("settings")
          .select("user_id, google_form_link")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.log("[/send] settings query error:", error.message);
        }

        console.log("[/send] fetched settings row:", settingsRow ?? null);

        googleFormLink =
          settingsRow?.google_form_link && settingsRow.google_form_link.trim().length > 0
            ? settingsRow.google_form_link.trim()
            : null;
      }
    } catch {
      googleFormLink = null;
    }
  }

  console.log("[/send] resolved google_form_link:", googleFormLink);
  console.log("[/send] fallback mode:", !googleFormLink);

  return (
    <PageShell className="min-h-screen justify-center gap-10 pb-10 pt-10">
      <AnimatedReveal>
        <section className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(251,252,250,0.96))] p-6 text-center shadow-[0_30px_82px_rgba(102,116,98,0.15)] backdrop-blur-sm">
          <SectionHeader
            eyebrow="Public page"
            title="Leave a duaa for Amina Benaissa"
            description="A simple place for loved ones to send a prayer, note, or gentle encouragement."
            align="center"
          />

          <div className="mt-8 rounded-[28px] border border-white/60 bg-[radial-gradient(circle_at_top,rgba(244,214,214,0.22),rgba(255,255,255,0))] px-5 py-10">
            <div className="mx-auto h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(214,230,242,0.4),rgba(214,230,242,0))]" />
            <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
              {googleFormLink
                ? "The form link is ready whenever you would like to send a prayer or note."
                : "Amina has not added her Google Form link yet. This page will open it here once it is saved in settings."}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {googleFormLink ? (
              <SoftButton className="w-full justify-center shadow-[0_18px_42px_rgba(127,150,123,0.22)]" asChild>
                <Link href={googleFormLink} target="_blank" rel="noreferrer noopener">
                  Open the form
                </Link>
              </SoftButton>
            ) : (
              <SoftButton className="w-full justify-center shadow-[0_18px_42px_rgba(127,150,123,0.12)]" disabled>
                Form link coming soon
              </SoftButton>
            )}
            <SoftButton variant="ghost" className="w-full justify-center" asChild>
              <Link href="/">Return home</Link>
            </SoftButton>
          </div>
        </section>
      </AnimatedReveal>
    </PageShell>
  );
}
