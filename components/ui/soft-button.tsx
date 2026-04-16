"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type SoftButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd"
> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

export function SoftButton({
  className,
  asChild = false,
  variant = "primary",
  ...props
}: SoftButtonProps) {
  if (asChild) {
    return (
      <Slot
        className={cn(
          "inline-flex min-h-12 transform-gpu items-center gap-2 rounded-full px-5 text-sm font-medium transition-[transform,box-shadow,background-color,color] duration-300 active:scale-[0.975]",
          variant === "primary" &&
            "bg-[var(--sage)] text-[var(--sage-deep)] shadow-[0_18px_38px_rgba(127,150,123,0.18)] hover:bg-[var(--sage-strong)]/80 active:shadow-[0_22px_42px_rgba(127,150,123,0.22)]",
          variant === "secondary" &&
            "border border-white/70 bg-white/72 text-[var(--foreground)] shadow-[0_16px_34px_rgba(106,118,99,0.08)] hover:bg-white/88 active:shadow-[0_20px_36px_rgba(106,118,99,0.12)]",
          variant === "ghost" &&
            "bg-transparent text-[var(--muted-foreground)] hover:bg-white/45 active:bg-white/60",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <button
      className={cn(
        "inline-flex min-h-12 transform-gpu items-center gap-2 rounded-full px-5 text-sm font-medium transition-[transform,box-shadow,background-color,color] duration-300 active:scale-[0.972]",
        variant === "primary" &&
          "bg-[var(--sage)] text-[var(--sage-deep)] shadow-[0_18px_38px_rgba(127,150,123,0.18)] hover:bg-[var(--sage-strong)]/80 hover:shadow-[0_22px_42px_rgba(127,150,123,0.22)]",
        variant === "secondary" &&
          "border border-white/70 bg-white/72 text-[var(--foreground)] shadow-[0_16px_34px_rgba(106,118,99,0.08)] hover:bg-white/88 hover:shadow-[0_20px_36px_rgba(106,118,99,0.12)]",
        variant === "ghost" &&
          "bg-transparent text-[var(--muted-foreground)] hover:bg-white/45 active:bg-white/60",
        className,
      )}
      {...props}
    />
  );
}
