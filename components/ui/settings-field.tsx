import * as React from "react";

type SettingsFieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  readOnly?: boolean;
};

export function SettingsField({ label, value, onChange, type = "text", readOnly = false }: SettingsFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[var(--foreground)]">{label}</span>
      <input
        value={value}
        type={type}
        readOnly={readOnly}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-14 w-full rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(251,252,250,0.95))] px-4 text-[15px] text-[var(--foreground)] outline-none transition-[border-color,box-shadow,background-color] duration-300 focus:border-[rgba(146,174,141,0.78)] focus:bg-white focus:ring-4 focus:ring-[color:rgba(168,191,163,0.16)] read-only:bg-white/55 read-only:text-[var(--muted-foreground)]"
      />
    </label>
  );
}
