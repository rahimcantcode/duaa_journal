"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookHeart, Home, Send, Settings2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/journal", label: "Journal", icon: BookHeart },
  { href: "/guide", label: "Guide", icon: Sparkles },
  { href: "/send", label: "Send", icon: Send },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-2xl justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex w-full items-center justify-between rounded-full border border-white/70 bg-[rgba(255,255,255,0.68)] px-3 py-2 shadow-[0_-4px_22px_rgba(123,138,119,0.06),0_20px_52px_rgba(93,109,90,0.10)] backdrop-blur-xl">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition-[color,transform] duration-300 active:scale-[0.97]",
                isActive ? "text-[var(--sage-deep)]" : "text-[rgba(122,122,122,0.9)]",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="bottom-nav-pill"
                  className="absolute inset-0 rounded-full bg-[rgba(237,243,235,0.92)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                  transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.6 }}
                />
              ) : null}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
