import * as React from "react";

import { cn } from "@/lib/utils";

type SoftInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function SoftInput({ label, className, ...props }: SoftInputProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[var(--foreground)]">{label}</span>
      <input
        className={cn(
          "h-14 w-full rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(251,252,250,0.96))] px-4 text-[15px] text-[var(--foreground)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[rgba(122,122,122,0.78)] focus:border-[rgba(146,174,141,0.78)] focus:bg-white focus:ring-4 focus:ring-[color:rgba(168,191,163,0.16)]",
          className,
        )}
        {...props}
      />
    </label>
  );
}
