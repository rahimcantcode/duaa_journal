"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type JournalCategoryCardData = {
  id: string;
  title: string;
  description: string;
  accent: "sage" | "pink" | "blue";
  countLabel: string;
  quote: string;
};

const accentStyles: Record<JournalCategoryCardData["accent"], string> = {
  sage: "bg-[rgba(168,191,163,0.18)] text-[var(--sage-deep)]",
  pink: "bg-[rgba(244,214,214,0.42)] text-[var(--foreground)]",
  blue: "bg-[rgba(214,230,242,0.48)] text-[var(--foreground)]",
};

type JournalCategoryCardProps = {
  category: JournalCategoryCardData;
  index: number;
  onOpen: () => void;
};

export function JournalCategoryCard({
  category,
  index,
  onOpen,
}: JournalCategoryCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{
        scale: 1.012,
        boxShadow: "0 26px 64px rgba(96,111,93,0.15)",
      }}
      transition={{ type: "spring", stiffness: 340, damping: 24, mass: 0.7 }}
      onClick={onOpen}
      className={cn(
        "group relative block overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(251,252,250,0.95))] p-5 text-left shadow-[0_18px_42px_rgba(96,111,93,0.10)] backdrop-blur-sm transition-shadow duration-300",
        index % 2 === 0
          ? "ml-4 w-[calc(100%-1rem)] sm:ml-8 sm:w-[calc(100%-2rem)]"
          : "ml-8 w-[calc(100%-2rem)] sm:ml-12 sm:w-[calc(100%-3rem)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute left-[-1.15rem] top-9 h-4 w-4 rounded-full border border-white/70 bg-[rgba(237,243,235,0.94)] shadow-[0_0_0_8px_rgba(246,247,245,0.88)]" />
      <div className="pointer-events-none absolute inset-y-8 left-0 w-12 bg-[linear-gradient(90deg,rgba(168,191,163,0.08),rgba(168,191,163,0))]" />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className={cn("inline-flex rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.14em] uppercase opacity-80", accentStyles[category.accent])}>
              {category.countLabel}
            </div>
            <h2 className="font-display text-[2rem] leading-none text-[var(--foreground)]">{category.title}</h2>
          </div>
          <div className="rounded-full bg-[rgba(237,243,235,0.8)] p-2 text-[var(--sage-deep)] transition group-active:scale-95">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        <p className="text-sm leading-6 text-[var(--muted-foreground)]">{category.description}</p>

        <div className="rounded-[24px] border border-white/60 bg-[linear-gradient(180deg,rgba(251,252,250,0.92),rgba(255,255,255,0.76))] p-4">
          <p className="text-sm leading-7 text-[var(--foreground)]">&ldquo;{category.quote}&rdquo;</p>
        </div>
      </div>
    </motion.button>
  );
}
