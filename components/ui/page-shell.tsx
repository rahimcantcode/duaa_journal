"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  const { scrollY } = useScroll();
  const topOrbY = useTransform(scrollY, [0, 1200], [-8, 28]);
  const rightOrbY = useTransform(scrollY, [0, 1200], [0, 42]);
  const leftOrbY = useTransform(scrollY, [0, 1200], [0, 54]);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[-12rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,191,163,0.26),rgba(168,191,163,0))] blur-[6px]"
          style={{ y: topOrbY }}
        />
        <motion.div
          className="absolute right-[-5rem] top-[12rem] h-[15rem] w-[15rem] rounded-full bg-[radial-gradient(circle,rgba(214,230,242,0.28),rgba(214,230,242,0))]"
          style={{ y: rightOrbY }}
        />
        <motion.div
          className="absolute left-[-4rem] top-[22rem] h-[13rem] w-[13rem] rounded-full bg-[radial-gradient(circle,rgba(244,214,214,0.24),rgba(244,214,214,0))]"
          style={{ y: leftOrbY }}
        />
        <div className="absolute inset-x-0 top-[32%] h-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.34),rgba(255,255,255,0))]" />
      </div>

      <div className={cn("relative mx-auto flex w-full max-w-2xl flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6", className)}>
        {children}
      </div>
    </main>
  );
}
