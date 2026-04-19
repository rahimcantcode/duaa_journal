"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { LogoutButton } from "@/components/shared/logout-button";
import { MobileBottomNav } from "@/components/ui/mobile-bottom-nav";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { SettingsField } from "@/components/ui/settings-field";
import { SoftButton } from "@/components/ui/soft-button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const THEME_STORAGE_KEY = "amina-theme";

const themeOptions = [
  {
    id: "sage",
    label: "Sage Calm",
    description: "The original soft green balance.",
    swatches: ["#A8BFA3", "#F4D6D6", "#D6E6F2"],
  },
  {
    id: "rose",
    label: "Rose Soft",
    description: "A warmer, blush-led variation.",
    swatches: ["#F4D6D6", "#A8BFA3", "#D6E6F2"],
  },
  {
    id: "sky",
    label: "Sky Light",
    description: "A cooler, airy blue-led variation.",
    swatches: ["#D6E6F2", "#A8BFA3", "#F4D6D6"],
  },
] as const;

type ThemeId = (typeof themeOptions)[number]["id"];

type SettingsPageClientProps = {
  userId: string;
  initialName: string;
  authEmail: string;
};

function getInitialTheme(): ThemeId {
  if (typeof window === "undefined") {
    return "sage";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return themeOptions.some((theme) => theme.id === storedTheme) ? (storedTheme as ThemeId) : "sage";
}

export function SettingsPageClient({
  userId,
  initialName,
  authEmail,
}: SettingsPageClientProps) {
  const [name, setName] = useState(initialName || "Amina Benaissa");
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(getInitialTheme);
  const [message, setMessage] = useState("Save preferences");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.dataset.theme = selectedTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
  }, [selectedTheme]);

  function handleSave() {
    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();

        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            id: userId,
            full_name: name.trim() || "Amina Benaissa",
            email: authEmail,
          },
          { onConflict: "id" },
        );

        if (profileError) {
          setMessage("Could not save your profile right now.");
          return;
        }

        setMessage("Preferences saved");
      } catch {
        setMessage("Could not save your settings right now.");
      }
    });
  }

  return (
    <PageShell className="gap-6 pb-28 pt-6">
      <SectionHeader
        eyebrow="Settings"
        title="Your space, shaped quietly around you."
        description="Personal details, theme, and the page friends can use to leave duaa requests."
      />

      <section className="space-y-5 rounded-[30px] border border-white/70 bg-white/78 p-5 shadow-[0_24px_70px_rgba(98,113,95,0.12)]">
        <div className="flex items-center gap-4 rounded-[26px] bg-[var(--accent-soft)]/80 p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 font-display text-2xl text-[var(--sage-deep)]">
            A
          </div>
          <div className="space-y-1">
            <p className="font-medium text-[var(--foreground)]">{name || "Amina Benaissa"}</p>
            <p className="text-sm text-[var(--muted-foreground)]">A quiet home for your journal and Hajj notes.</p>
          </div>
        </div>

        <SettingsField label="Name" value={name} onChange={setName} />
        <SettingsField label="Email" value={authEmail} type="email" readOnly />

        <div className="space-y-3 rounded-[26px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(251,252,250,0.94))] p-4 shadow-[0_14px_34px_rgba(106,118,99,0.07)]">
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--foreground)]">Friends&apos; duaa requests</p>
            <p className="text-sm leading-6 text-[var(--muted-foreground)]">
              Friends can now leave duaa requests directly on your Send page. They will appear privately in your journal.
            </p>
          </div>
          <SoftButton variant="secondary" className="w-full justify-center" asChild>
            <Link href="/send">Preview Send page</Link>
          </SoftButton>
        </div>

        <div className="space-y-3 rounded-[26px] border border-white/65 bg-[var(--card)]/90 p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--foreground)]">Theme</p>
            <p className="text-sm text-[var(--muted-foreground)]">
              Choose the palette balance that feels most like home.
            </p>
          </div>

          <div className="space-y-3">
            {themeOptions.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setSelectedTheme(theme.id)}
                className={cn(
                  "w-full rounded-[22px] border p-4 text-left transition-[transform,box-shadow,border-color] duration-300 active:scale-[0.985]",
                  selectedTheme === theme.id
                    ? "border-[rgba(146,174,141,0.72)] bg-white/90 shadow-[0_18px_38px_rgba(106,118,99,0.12)]"
                    : "border-white/65 bg-[var(--card)]/80 shadow-[0_12px_26px_rgba(106,118,99,0.06)]",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[var(--foreground)]">{theme.label}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{theme.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {theme.swatches.map((color) => (
                      <span
                        key={color}
                        className="h-6 w-6 rounded-full border border-white/70"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <SoftButton className="w-full justify-center" onClick={handleSave} disabled={isPending}>
          {isPending ? "Saving" : message}
        </SoftButton>
        <LogoutButton />
      </section>

      <MobileBottomNav />
    </PageShell>
  );
}
