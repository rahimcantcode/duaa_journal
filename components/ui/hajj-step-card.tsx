"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import type { HajjStep } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type HajjStepCardProps = {
  step: HajjStep;
  onOpen: () => void;
};

export function HajjStepCard({ step, onOpen }: HajjStepCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{
        scale: 1.01,
        boxShadow: "0 22px 48px rgba(99,113,95,0.14)",
      }}
      transition={{ type: "spring", stiffness: 340, damping: 24, mass: 0.7 }}
      onClick={onOpen}
      className={cn(
        "relative w-full overflow-hidden rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(251,252,250,0.94))] p-5 text-left shadow-[0_18px_42px_rgba(99,113,95,0.09)]",
      )}
    >
      <div className="pointer-events-none absolute left-[-1.1rem] top-8 h-4 w-4 rounded-full border border-white/70 bg-[rgba(237,243,235,0.94)] shadow-[0_0_0_8px_rgba(246,247,245,0.88)]" />
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[rgba(122,122,122,0.82)]">
              {step.moment}
            </p>
            <h2 className="font-display text-3xl leading-none text-[var(--foreground)]">{step.title}</h2>
          </div>
          <div className="rounded-full bg-[rgba(237,243,235,0.8)] p-2 text-[var(--sage-deep)]">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
        <p className="text-sm leading-7 text-[var(--muted-foreground)]">{step.shortSummary}</p>
        <div className="flex flex-wrap gap-2">
          {step.quickPoints.slice(0, 4).map((point) => (
            <span
              key={point}
              className="rounded-full bg-[rgba(237,243,235,0.7)] px-3 py-1 text-[11px] leading-5 text-[rgba(93,115,89,0.88)]"
            >
              {point}
            </span>
          ))}
        </div>
        <div className="pt-1 text-sm font-medium text-[var(--sage-deep)]">View details</div>
      </div>
    </motion.button>
  );
}
