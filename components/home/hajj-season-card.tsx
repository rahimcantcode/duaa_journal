"use client";

import { HajjCountdown } from "@/components/home/hajj-countdown";

const expectedDates = [
  { label: "Dhul Hijjah begins (expected)", value: "18 May 2026" },
  { label: "Hajj begins (expected)", value: "25 May 2026" },
  { label: "Day of Arafah (expected)", value: "26 May 2026" },
  { label: "Eid al-Adha (expected)", value: "27 May 2026" },
];

export function HajjSeasonCard() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,252,250,0.96))] shadow-[0_30px_82px_rgba(102,116,98,0.14)] backdrop-blur-sm">
      <div className="relative px-5 py-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(168,191,163,0.16),rgba(168,191,163,0))]" />

        <div className="relative space-y-5">
          <div className="space-y-2.5">
            <p className="block text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(122,122,122,0.82)]">
              This season
            </p>
            <h2 className="font-display text-[2.2rem] leading-[0.94] text-[var(--foreground)]">
              Hajj is drawing near
            </h2>
            <p className="max-w-md text-sm leading-7 text-[var(--muted-foreground)]">
              A season of surrender, mercy, remembrance, and prayers carried with a softer heart.
            </p>
          </div>

          <div className="rounded-[26px] border border-white/65 bg-white/68 p-4 shadow-[0_16px_36px_rgba(95,108,92,0.08)]">
            <HajjCountdown />
          </div>

          <div className="space-y-3">
            {expectedDates.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-[22px] border border-white/60 bg-[rgba(255,255,255,0.52)] px-4 py-3"
              >
                <span className="text-sm text-[var(--muted-foreground)]">{item.label}</span>
                <span className="text-sm font-medium text-[var(--foreground)]">{item.value}</span>
              </div>
            ))}
          </div>

          <p className="text-xs leading-6 text-[rgba(122,122,122,0.86)]">
            Expected dates may shift with moon sighting.
          </p>
        </div>
      </div>
    </section>
  );
}
