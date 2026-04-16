"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

type JourneyScrollPathProps = {
  variant?: "default" | "compact";
  className?: string;
};

export function JourneyScrollPath({
  variant = "default",
  className,
}: JourneyScrollPathProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.3,
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["2%", "92%"]);
  const parallaxY = useTransform(scrollY, [0, 1800], [0, -72]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-y-0 left-0 right-0 z-0 opacity-95",
        className,
      )}
    >
      <motion.div className="relative h-full w-full" style={{ y: parallaxY }}>
        <motion.div
          className="absolute left-[4.35rem] h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(168,191,163,0.30),rgba(168,191,163,0))] blur-xl"
          style={{ top: orbY }}
        />
        <svg
          className="h-full w-full"
          viewBox="0 0 420 1800"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d={
              variant === "compact"
                ? "M68 40C82 150 54 236 88 332C122 428 62 530 92 646C122 762 72 886 104 1012C132 1122 92 1244 110 1370C126 1484 102 1602 124 1738"
                : "M72 28C104 160 44 240 92 358C134 464 56 586 110 704C156 804 88 928 128 1058C166 1188 104 1316 144 1454C174 1560 132 1686 160 1772"
            }
            stroke="rgba(109, 134, 106, 0.24)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="5 12"
          />
          <motion.path
            d={
              variant === "compact"
                ? "M68 40C82 150 54 236 88 332C122 428 62 530 92 646C122 762 72 886 104 1012C132 1122 92 1244 110 1370C126 1484 102 1602 124 1738"
                : "M72 28C104 160 44 240 92 358C134 464 56 586 110 704C156 804 88 928 128 1058C166 1188 104 1316 144 1454C174 1560 132 1686 160 1772"
            }
            stroke="rgba(109, 134, 106, 0.56)"
            strokeWidth="2.8"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
