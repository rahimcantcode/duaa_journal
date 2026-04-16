"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function BottomSheet({
  isOpen,
  onClose,
  title,
  description,
  children,
}: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close details"
            className="fixed inset-0 z-40 bg-[rgba(47,47,47,0.16)] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.section
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[84vh] w-full max-w-2xl flex-col rounded-t-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(246,247,245,0.98),rgba(251,252,250,0.98))] px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-24px_60px_rgba(80,90,78,0.14)] backdrop-blur-md"
          >
            <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-[rgba(122,122,122,0.22)]" />
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="font-display text-3xl leading-none text-[var(--foreground)]">{title}</p>
                {description ? (
                  <p className="max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">{description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/75 p-2 text-[var(--muted-foreground)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto pb-4">{children}</div>
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
}
