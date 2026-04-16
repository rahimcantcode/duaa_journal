import { Heart, Pencil, Trash2 } from "lucide-react";

type DuaaEntryCardProps = {
  entry: {
    title: string | null;
    content: string;
    created_at: string;
    is_favorite: boolean;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleFavorite?: () => void;
};

function formatEntryDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function DuaaEntryCard({ entry, onEdit, onDelete, onToggleFavorite }: DuaaEntryCardProps) {
  return (
    <article className="rounded-[24px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(251,252,250,0.98))] p-4 shadow-[0_14px_30px_rgba(95,108,92,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">{entry.title || "Untitled duaa"}</h3>
        <span className="text-[11px] text-[rgba(122,122,122,0.82)]">{formatEntryDate(entry.created_at)}</span>
      </div>
      <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{entry.content}</p>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleFavorite}
          className="rounded-full bg-[var(--accent-soft)] p-2 text-[var(--sage-deep)]"
        >
          <Heart className={`h-4 w-4 ${entry.is_favorite ? "fill-current" : ""}`} />
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full bg-white/75 p-2 text-[var(--muted-foreground)]"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full bg-white/75 p-2 text-[var(--muted-foreground)]"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
