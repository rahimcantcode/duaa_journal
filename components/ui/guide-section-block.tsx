import { cn } from "@/lib/utils";

type GuideSectionBlockProps = {
  title: string;
  content?: string;
  items?: string[];
  className?: string;
};

export function GuideSectionBlock({
  title,
  content,
  items,
  className,
}: GuideSectionBlockProps) {
  return (
    <section
      className={cn(
        "rounded-[24px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(251,252,250,0.96))] p-4 shadow-[0_14px_30px_rgba(95,108,92,0.07)]",
        className,
      )}
    >
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-[0.01em] text-[var(--foreground)]">{title}</h3>
        {content ? (
          <p className="text-sm leading-7 text-[var(--muted-foreground)]">{content}</p>
        ) : null}
        {items?.length ? (
          <ul className="space-y-2.5">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-[var(--muted-foreground)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sage-strong)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
