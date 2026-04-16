import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3", align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-4xl leading-[0.94] tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-md text-sm leading-7 text-[var(--muted-foreground)] sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
