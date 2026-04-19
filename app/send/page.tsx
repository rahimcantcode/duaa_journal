import Link from "next/link";

import { FriendDuaRequestForm } from "@/components/send/friend-dua-request-form";
import { SetupRequiredCard } from "@/components/shared/setup-required-card";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { SoftButton } from "@/components/ui/soft-button";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function SendPage() {
  if (!isSupabaseConfigured()) {
    return (
      <PageShell className="min-h-screen justify-center gap-6 pb-10 pt-10">
        <SetupRequiredCard
          title="This page is almost ready."
          description="Once Supabase is connected, loved ones can send duaa requests for Amina to carry during Hajj."
        />
      </PageShell>
    );
  }

  return (
    <PageShell className="min-h-screen justify-center gap-10 pb-10 pt-10">
      <AnimatedReveal>
        <section className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(251,252,250,0.96))] p-6 text-center shadow-[0_30px_82px_rgba(102,116,98,0.15)] backdrop-blur-sm">
          <SectionHeader
            eyebrow="For loved ones"
            title="Leave a duaa request for Amina"
            description="A little place to send what you want her to keep in her heart during Hajj."
            align="center"
          />

          <div className="mt-8">
            <FriendDuaRequestForm />
          </div>

          <SoftButton variant="ghost" className="mt-5 w-full justify-center" asChild>
            <Link href="/">Return home</Link>
          </SoftButton>
        </section>
      </AnimatedReveal>
    </PageShell>
  );
}
