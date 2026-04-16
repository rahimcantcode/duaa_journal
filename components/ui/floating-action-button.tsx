"use client";

import { motion } from "framer-motion";

type FloatingActionButtonProps = {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
};

export function FloatingActionButton({ children, label, onClick }: FloatingActionButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -1.5, boxShadow: "0 24px 48px rgba(86,108,82,0.34)" }}
      whileTap={{ scale: 0.975, y: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 20, mass: 0.7 }}
      className="fixed bottom-[calc(7rem+env(safe-area-inset-bottom))] right-4 z-30 inline-flex min-h-14 items-center gap-2 rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(93,115,89,0.96),rgba(93,115,89,0.92))] px-5 text-sm font-medium text-white shadow-[0_18px_40px_rgba(86,108,82,0.28)] sm:right-6"
      onClick={onClick}
    >
      {children}
      {label}
    </motion.button>
  );
}
