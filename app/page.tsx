import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { HajjSeasonCard } from "@/components/home/hajj-season-card";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { MobileBottomNav } from "@/components/ui/mobile-bottom-nav";
import { PageShell } from "@/components/ui/page-shell";
import { SoftButton } from "@/components/ui/soft-button";

export default function HomePage() {
  return (
    <PageShell className="gap-12 pb-28 pt-8">
      <AnimatedReveal className="space-y-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-medium tracking-[0.18em] text-[var(--muted-foreground)] uppercase shadow-[0_18px_40px_rgba(121,140,118,0.10)] backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-[var(--sage-strong)]" />
          Welcome to Amina&apos;s Hajj 2026 portal
        </div>

        <div className="space-y-5">
          <h1 className="font-display text-[3.55rem] leading-[0.88] tracking-[-0.04em] text-[var(--foreground)] sm:text-[4.2rem]">
            Amina Benaissa&apos;s
            <span className="block text-[var(--sage-deep)]">Duaa Journal</span>
          </h1>
          <p className="max-w-md text-[15px] leading-7 text-[var(--muted-foreground)]">
            A quiet place for the duaas you carry into Hajj, for your family, your future, and what your heart is still asking
            for.
          </p>
        </div>
        <p className="max-w-md text-sm leading-7 text-[var(--muted-foreground)]">
          If you love her, this is also where you can leave a duaa request for her to carry with her.
        </p>
      </AnimatedReveal>

      <AnimatedReveal delay={0.04}>
        <section className="relative left-1/2 w-screen max-w-none -translate-x-1/2 space-y-6 px-4 py-1 sm:px-6">
          <div className="mx-auto w-full max-w-[42rem]">
            <Image
              src="/home-featured-duaa.png"
              alt="A soft illustration reflecting prayer, calm, and the nearness of Hajj."
              width={960}
              height={1200}
              className="h-auto w-full rounded-[32px] object-contain shadow-[0_30px_82px_rgba(102,116,98,0.16)]"
              sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) calc(100vw - 3rem), 42rem"
            />
          </div>
          <div className="mx-auto flex w-full max-w-[42rem] justify-center px-2">
            <SoftButton
              asChild
              className="min-h-14 w-full justify-center bg-[var(--sage-strong)] text-[var(--foreground)] shadow-[0_22px_54px_rgba(127,150,123,0.24)] sm:w-auto sm:px-7"
            >
              <Link href="/send">
                Leave a duaa request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </SoftButton>
          </div>
        </section>
      </AnimatedReveal>

      <AnimatedReveal delay={0.05}>
        <HajjSeasonCard />
      </AnimatedReveal>

      <AnimatedReveal delay={0.1}>
        <section className="grid gap-4">
          <article className="rounded-[30px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,252,250,0.96))] p-5 shadow-[0_24px_60px_rgba(104,119,100,0.10)]">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(122,122,122,0.82)]">
                  For Amina
                </p>
                <h2 className="font-display text-[2rem] leading-[0.95] text-[var(--foreground)]">
                  Open your journal
                </h2>
                <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                  Return to the duaas, notes, and quiet intentions you want to keep close through Hajj season.
                </p>
              </div>
              <SoftButton asChild>
                <Link href="/journal">
                  Enter your journal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </SoftButton>
            </div>
          </article>

          <article className="rounded-[30px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(251,252,250,0.94))] p-5 shadow-[0_22px_54px_rgba(104,119,100,0.09)]">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(122,122,122,0.82)]">
                  For loved ones
                </p>
                <h2 className="font-display text-[2rem] leading-[0.95] text-[var(--foreground)]">
                  Send your duaa request
                </h2>
                <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                  Write what you want Amina to make duaa for during Hajj, and it will reach her privately.
                </p>
              </div>
              <SoftButton asChild variant="secondary">
                <Link href="/send">Leave a duaa request</Link>
              </SoftButton>
            </div>
          </article>
        </section>
      </AnimatedReveal>

      <AnimatedReveal delay={0.18}>
        <section className="grid gap-4 sm:grid-cols-2">
          {[
            "Journal: a private space for the prayers she wants to carry into Hajj.",
            "Guide: a calm companion for the steps waiting ahead.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[26px] border border-white/60 bg-white/65 p-5 text-sm leading-6 text-[var(--muted-foreground)] shadow-[0_18px_40px_rgba(110,126,107,0.08)]"
            >
              {item}
            </div>
          ))}
        </section>
      </AnimatedReveal>

      <MobileBottomNav />
    </PageShell>
  );
}
