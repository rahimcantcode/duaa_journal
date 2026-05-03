"use client";

import { useState } from "react";
import { BookMarked, BookOpenText, ExternalLink, Footprints } from "lucide-react";

import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { GuideDetailSheet } from "@/components/ui/guide-detail-sheet";
import { HajjStepCard } from "@/components/ui/hajj-step-card";
import { JourneyScrollPath } from "@/components/ui/journey-scroll-path";
import { MobileBottomNav } from "@/components/ui/mobile-bottom-nav";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { hajjSteps } from "@/lib/mock-data";

type GuideMode = "steps" | "duaas";
type DuaaBookId = "quran-sunnah" | "hajj-umrah-cards";

type DuaaBook = {
  id: DuaaBookId;
  title: string;
  label: string;
  description: string;
  href: string;
  pages: string;
};

const guideModeCopy: Record<GuideMode, { title: string; description: string }> = {
  steps: {
    title: "Hajj steps, held in a calm and clear rhythm.",
    description:
      "A gentle companion for the path ahead, with deeper guidance available whenever you want to slow down and open a step.",
  },
  duaas: {
    title: "Duaa books, close when you need them.",
    description:
      "A quiet shelf of duaas to keep nearby as you move through the journey.",
  },
};

const duaaBooks: DuaaBook[] = [
  {
    id: "quran-sunnah",
    title: "Duaa from Qur'an and Sunnah",
    label: "Qur'an and Sunnah",
    description: "Invocations gathered from Qur'an and Sunnah for steady reflection.",
    href: "/duaa-book.pdf",
    pages: "Book PDF",
  },
  {
    id: "hajj-umrah-cards",
    title: "Hajj and Umrah Dua Cards",
    label: "Hajj and Umrah",
    description: "A short set of dua cards for the moments of Hajj and Umrah.",
    href: "/hajj-umrah-dua-cards.pdf",
    pages: "6 pages",
  },
];

export default function GuidePage() {
  const [activeMode, setActiveMode] = useState<GuideMode>("steps");
  const [activeBookId, setActiveBookId] = useState<DuaaBookId>("quran-sunnah");
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const activeStep = hajjSteps.find((step) => step.id === activeStepId) ?? null;
  const activeCopy = guideModeCopy[activeMode];
  const activeBook = duaaBooks.find((book) => book.id === activeBookId) ?? duaaBooks[0];

  return (
    <>
      <PageShell className="relative gap-8 overflow-hidden pb-28 pt-6">
        <JourneyScrollPath variant="compact" />

        <AnimatedReveal className="relative z-10">
          <SectionHeader
            eyebrow="My journey"
            title={activeCopy.title}
            description={activeCopy.description}
          />
        </AnimatedReveal>

        <section className="relative z-10 rounded-full border border-white/70 bg-white/68 p-1.5 shadow-[0_18px_42px_rgba(96,111,93,0.09)] backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "steps" as const, label: "Hajj steps", icon: Footprints },
              { id: "duaas" as const, label: "Duaa book", icon: BookOpenText },
            ].map((mode) => {
              const isActive = activeMode === mode.id;
              const Icon = mode.icon;

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => {
                    setActiveMode(mode.id);
                    setActiveStepId(null);
                  }}
                  className={`inline-flex min-w-0 items-center justify-center gap-2 rounded-full px-3 py-3 text-sm font-medium transition-[background-color,box-shadow,color,transform] duration-300 active:scale-[0.985] ${
                    isActive
                      ? "bg-[rgba(237,243,235,0.96)] text-[var(--sage-deep)] shadow-[0_12px_30px_rgba(106,118,99,0.12)]"
                      : "text-[rgba(122,122,122,0.86)]"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <AnimatedReveal className="relative z-10" delay={0.04}>
          <section className="rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,252,250,0.95))] p-5 shadow-[0_24px_64px_rgba(99,113,95,0.11)]">
            <div className="space-y-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(122,122,122,0.8)]">
                {activeMode === "steps" ? "Guide flow" : "Duaa book"}
              </p>
              <p className="font-display text-[2rem] leading-[0.95] text-[var(--foreground)]">
                {activeMode === "steps"
                  ? "Scan the step, then open it when you want the fuller picture."
                  : "Choose the dua book you want to keep close right now."}
              </p>
              <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                {activeMode === "steps"
                  ? "Each card keeps the main journey light, while the detail view holds practical reminders, what to do, and one calm video path for learning more."
                  : "Two quiet references for the duaas you want nearby during Hajj and Umrah."}
              </p>
            </div>
          </section>
        </AnimatedReveal>

        {activeMode === "steps" ? (
          <section className="relative z-10 space-y-4">
            {hajjSteps.map((step, index) => (
              <AnimatedReveal key={step.id} delay={0.06 + index * 0.05}>
                <HajjStepCard step={step} onOpen={() => setActiveStepId(step.id)} />
              </AnimatedReveal>
            ))}
          </section>
        ) : (
          <AnimatedReveal className="relative z-10" delay={0.06}>
            <section className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {duaaBooks.map((book) => {
                  const isSelected = activeBook.id === book.id;

                  return (
                    <article
                      key={book.id}
                      className={`relative overflow-hidden rounded-[28px] border p-4 shadow-[0_18px_42px_rgba(99,113,95,0.09)] transition ${
                        isSelected
                          ? "border-[rgba(168,191,163,0.58)] bg-[linear-gradient(180deg,rgba(237,243,235,0.88),rgba(251,252,250,0.98))]"
                          : "border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(251,252,250,0.98))]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveBookId(book.id)}
                        className="block w-full text-left active:scale-[0.99]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl bg-white/72 p-3 text-[var(--sage-deep)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.72)]">
                            <BookMarked className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[rgba(122,122,122,0.74)]">
                              {book.label}
                            </p>
                            <h2 className="mt-1 font-display text-2xl leading-none text-[var(--foreground)]">
                              {book.title}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                              {book.description}
                            </p>
                          </div>
                        </div>
                      </button>
                      <div className="mt-4 flex items-center justify-between gap-3 pl-14">
                        <span className="rounded-full bg-white/74 px-3 py-1 text-[11px] font-medium text-[rgba(93,115,89,0.78)]">
                          {book.pages}
                        </span>
                        <a
                          href={book.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-2 text-xs font-medium text-[var(--sage-deep)]"
                        >
                          Open
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="hidden overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(251,252,250,0.98))] shadow-[0_24px_64px_rgba(99,113,95,0.11)] md:block">
                <div className="flex items-center justify-between gap-4 border-b border-white/70 px-4 py-3">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{activeBook.title}</p>
                    <p className="text-xs leading-5 text-[var(--muted-foreground)]">{activeBook.description}</p>
                  </div>
                  <a
                    href={activeBook.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-2 text-xs font-medium text-[var(--sage-deep)]"
                  >
                    Open
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <iframe
                  title={`${activeBook.title} book`}
                  src={`${activeBook.href}#view=FitH`}
                  className="h-[76vh] min-h-[34rem] w-full bg-white"
                />
              </div>
            </section>
          </AnimatedReveal>
        )}

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
