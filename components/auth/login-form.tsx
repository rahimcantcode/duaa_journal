"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { SoftButton } from "@/components/ui/soft-button";
import { SoftInput } from "@/components/ui/soft-input";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type Mode = "signin" | "signup";

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [fullName, setFullName] = useState("Amina Benaissa");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isConfigured = isSupabaseConfigured();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConfigured) {
      setMessage("Add your Supabase environment variables to enable authentication.");
      return;
    }

    setMessage(null);

    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();

        if (mode === "signin") {
          const { error } = await supabase.auth.signInWithPassword({ email, password });

          if (error) {
            setMessage(error.message);
            return;
          }

          router.replace(nextPath);
          router.refresh();
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        if (data.session) {
          router.replace("/journal");
          router.refresh();
          return;
        }

        setMessage("Account created. Check your email if confirmation is enabled, then sign in.");
        setMode("signin");
      } catch {
        setMessage("Something went wrong. Please try again softly.");
      }
    });
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div className="inline-flex rounded-full border border-white/70 bg-white/60 p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`rounded-full px-4 py-2 text-sm transition ${mode === "signin" ? "bg-[var(--accent-soft)] text-[var(--sage-deep)]" : "text-[var(--muted-foreground)]"}`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded-full px-4 py-2 text-sm transition ${mode === "signup" ? "bg-[var(--accent-soft)] text-[var(--sage-deep)]" : "text-[var(--muted-foreground)]"}`}
        >
          Sign up
        </button>
      </div>

      {mode === "signup" ? (
        <SoftInput
          label="Full name"
          placeholder="Amina Benaissa"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      ) : null}

      <SoftInput
        label="Email"
        type="email"
        placeholder="amina@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <SoftInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {message ? (
        <p className="rounded-[20px] bg-white/65 px-4 py-3 text-sm leading-6 text-[var(--muted-foreground)]">
          {message}
        </p>
      ) : null}

      <SoftButton className="w-full justify-center" disabled={isPending}>
        {isPending ? "Please wait" : mode === "signin" ? "Sign in" : "Create account"}
      </SoftButton>
    </form>
  );
}
