import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { SoftButton } from "@/components/ui/soft-button";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const nextPath = resolvedSearchParams.next || "/journal";

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        redirect("/journal");
      }
    } catch {}
  }

  return (
    <PageShell className="min-h-screen justify-center gap-8 pb-10 pt-10">
      <AnimatedReveal className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          Bismillah
        </p>
        <h1 className="font-display text-4xl leading-none text-[var(--foreground)]">Welcome</h1>
        <p className="max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">
          Sign in to continue your private journal, saved reflections, and settings.
        </p>
      </AnimatedReveal>

      <AnimatedReveal delay={0.08}>
        <section className="rounded-[30px] border border-white/70 bg-white/78 p-6 shadow-[0_26px_70px_rgba(105,121,102,0.14)] backdrop-blur-sm">
          <SectionHeader
            eyebrow="Login"
            title="A quiet, familiar place to begin again."
            description="Email and password authentication now live here, with the softness already in place."
          />

          <div className="mt-6 space-y-4">
            <LoginForm nextPath={nextPath} />
            <SoftButton className="w-full justify-center" variant="ghost" asChild>
              <Link href="/">Back to home</Link>
            </SoftButton>
          </div>
        </section>
      </AnimatedReveal>
    </PageShell>
  );
}
