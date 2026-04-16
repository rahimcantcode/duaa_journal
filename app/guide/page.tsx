"use client";

import { useState } from "react";

import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { GuideDetailSheet } from "@/components/ui/guide-detail-sheet";
import { HajjStepCard } from "@/components/ui/hajj-step-card";
import { JourneyScrollPath } from "@/components/ui/journey-scroll-path";
import { MobileBottomNav } from "@/components/ui/mobile-bottom-nav";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { hajjSteps } from "@/lib/mock-data";

export default function GuidePage() {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const activeStep = hajjSteps.find((step) => step.id === activeStepId) ?? null;

  return (
    <>
      <PageShell className="relative gap-8 overflow-hidden pb-28 pt-6">
        <JourneyScrollPath variant="compact" />

        <AnimatedReveal className="relative z-10">
          <SectionHeader
            eyebrow="My journey"
            title="Hajj steps, held in a calm and clear rhythm."
            description="A gentle companion for the path ahead, with deeper guidance available whenever you want to slow down and open a step."
          />
        </AnimatedReveal>

        <AnimatedReveal className="relative z-10" delay={0.04}>
          <section className="rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,252,250,0.95))] p-5 shadow-[0_24px_64px_rgba(99,113,95,0.11)]">
            <div className="space-y-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(122,122,122,0.8)]">
                Guide flow
              </p>
              <p className="font-display text-[2rem] leading-[0.95] text-[var(--foreground)]">
                Scan the step, then open it when you want the fuller picture.
              </p>
              <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                Each card keeps the main journey light, while the detail view holds practical reminders, what to do, and one calm video path for learning more.
              </p>
            </div>
          </section>
        </AnimatedReveal>

        <section className="relative z-10 space-y-4">
          {hajjSteps.map((step, index) => (
            <AnimatedReveal key={step.id} delay={0.06 + index * 0.05}>
              <HajjStepCard step={step} index={index} onOpen={() => setActiveStepId(step.id)} />
            </AnimatedReveal>
          ))}
        </section>

        <MobileBottomNav />
      </PageShell>

      <GuideDetailSheet
        step={activeStep}
        isOpen={Boolean(activeStep)}
        onClose={() => setActiveStepId(null)}
      />
    </>
  );
}
