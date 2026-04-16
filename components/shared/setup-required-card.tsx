type SetupRequiredCardProps = {
  title: string;
  description: string;
};

export function SetupRequiredCard({ title, description }: SetupRequiredCardProps) {
  return (
    <section className="rounded-[30px] border border-white/70 bg-white/78 p-5 shadow-[0_24px_70px_rgba(98,113,95,0.12)]">
      <div className="space-y-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[rgba(122,122,122,0.82)]">
          Setup needed
        </p>
        <h2 className="font-display text-3xl leading-none text-[var(--foreground)]">{title}</h2>
        <p className="text-sm leading-7 text-[var(--muted-foreground)]">{description}</p>
      </div>
    </section>
  );
}
