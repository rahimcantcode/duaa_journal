"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, PencilLine, X } from "lucide-react";

import { SoftButton } from "@/components/ui/soft-button";
import type { Dua } from "@/lib/types/app";

type CategoryReadingViewProps = {
  isOpen: boolean;
  title: string;
  description: string;
  entries: Dua[];
  onClose: () => void;
  onEdit?: (entry: Dua) => void;
};

function formatEntryDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function CategoryReadingView({
  isOpen,
  title,
  description,
  entries,
  onClose,
  onEdit,
}: CategoryReadingViewProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[var(--background)] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]"
        >
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-[-10rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,191,163,0.22),rgba(168,191,163,0))]" />
            <div className="absolute right-[-5rem] top-[16rem] h-[14rem] w-[14rem] rounded-full bg-[radial-gradient(circle,rgba(214,230,242,0.24),rgba(214,230,242,0))]" />
            <div className="absolute left-[-4rem] bottom-[12rem] h-[12rem] w-[12rem] rounded-full bg-[radial-gradient(circle,rgba(244,214,214,0.22),rgba(244,214,214,0))]" />
          </div>

          <div className="relative mx-auto flex min-h-full w-full max-w-2xl flex-col gap-6">
            <div className="sticky top-[max(1rem,env(safe-area-inset-top))] z-10 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close full category view"
                className="rounded-full border border-white/70 bg-white/78 p-3 text-[var(--muted-foreground)] shadow-[0_14px_34px_rgba(96,111,93,0.12)] backdrop-blur-xl"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <header className="rounded-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,252,250,0.96))] p-6 shadow-[0_28px_78px_rgba(110,126,107,0.14)]">
              <div className="space-y-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(122,122,122,0.8)]">
                  Reading view
                </p>
                <h1 className="font-display text-[3rem] leading-[0.88] tracking-[-0.03em] text-[var(--foreground)]">
                  {title}
                </h1>
                <p className="max-w-md text-sm leading-7 text-[var(--muted-foreground)]">{description}</p>
                <p className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-xs font-medium text-[var(--sage-deep)]">
                  {entries.length} {entries.length === 1 ? "duaa" : "duaas"}
                </p>
              </div>
            </header>

            <div className="space-y-4">
              {entries.length ? (
                entries.map((entry, index) => (
                  <motion.article
                    key={entry.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(251,252,250,0.96))] p-5 shadow-[0_18px_48px_rgba(96,111,93,0.09)]"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h2 className="font-display text-2xl leading-none text-[var(--foreground)]">
                          {entry.title || "Untitled duaa"}
                        </h2>
                        <p className="text-xs text-[rgba(122,122,122,0.78)]">
                          {formatEntryDate(entry.created_at)}
                        </p>
                      </div>
                      {entry.is_favorite ? (
                        <div className="rounded-full bg-[var(--accent-soft)] p-2 text-[var(--sage-deep)]">
                          <Heart className="h-4 w-4 fill-current" />
                        </div>
                      ) : null}
                    </div>

                    <p className="whitespace-pre-wrap text-[15px] leading-8 text-[var(--muted-foreground)]">
                      {entry.content}
                    </p>

                    {onEdit ? (
                      <button
                        type="button"
                        onClick={() => onEdit(entry)}
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/72 px-4 py-2 text-sm text-[var(--sage-deep)]"
                      >
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </button>
                    ) : null}
                  </motion.article>
                ))
              ) : (
                <article className="rounded-[30px] border border-white/70 bg-white/82 p-6 text-center shadow-[0_18px_48px_rgba(96,111,93,0.08)]">
                  <p className="font-display text-3xl leading-none text-[var(--foreground)]">
                    This category is still quiet.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    Add a duaa when you are ready, then return here to read it softly.
                  </p>
                </article>
              )}
            </div>

            <SoftButton className="w-full justify-center" variant="secondary" onClick={onClose}>
              Close reading view
            </SoftButton>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
