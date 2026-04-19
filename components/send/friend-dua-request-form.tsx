"use client";

import { useRef, useState, useTransition } from "react";
import { Heart, Send } from "lucide-react";

import { SoftButton } from "@/components/ui/soft-button";
import { SoftInput } from "@/components/ui/soft-input";
import { createFriendDuaRequest } from "@/lib/data/friends-dua-requests";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { FeedbackState } from "@/lib/types/app";

export function FriendDuaRequestForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [duaRequest, setDuaRequest] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isPending, startTransition] = useTransition();

  function revealForm() {
    setIsOpen(true);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  function handleSubmit() {
    if (!name.trim() || !duaRequest.trim()) {
      setFeedback({ type: "error", message: "Add your name and the duaa you want Amina to make." });
      return;
    }

    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();

        await createFriendDuaRequest(supabase, {
          name: name.trim(),
          dua_request: duaRequest.trim(),
        });

        setName("");
        setDuaRequest("");
        setFeedback({ type: "success", message: "got it 🤍 Amina will carry this with her." });
      } catch {
        setFeedback({ type: "error", message: "Something got stuck. Try sending it again in a moment." });
      }
    });
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-white/60 bg-[radial-gradient(circle_at_top,rgba(244,214,214,0.22),rgba(255,255,255,0))] px-5 py-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(214,230,242,0.46),rgba(214,230,242,0))] text-[var(--sage-deep)]">
          <Heart className="h-8 w-8" />
        </div>
        <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)]">
          hi, it&apos;s amina 🤍 if there&apos;s a duaa you want me to make for you while i&apos;m there, leave it here
          and i&apos;ll keep it close.
        </p>
      </div>

      <SoftButton className="w-full justify-center shadow-[0_18px_42px_rgba(127,150,123,0.22)]" onClick={revealForm}>
        {isOpen ? "Write your request" : "Leave your duaa"}
        <Send className="h-4 w-4" />
      </SoftButton>

      {isOpen ? (
        <div
          ref={formRef}
          className="space-y-4 rounded-[28px] border border-white/70 bg-white/78 p-4 text-left shadow-[0_18px_46px_rgba(95,108,92,0.09)]"
        >
          <div className="space-y-1 text-center">
            <p className="font-display text-3xl leading-none text-[var(--foreground)]">Write it softly</p>
            <p className="text-sm leading-6 text-[var(--muted-foreground)]">
              Just your name and what you want her to ask Allah for.
            </p>
          </div>

          {feedback ? (
            <p className="rounded-[20px] bg-[var(--accent-soft)]/80 px-4 py-3 text-center text-sm leading-6 text-[var(--muted-foreground)]">
              {feedback.message}
            </p>
          ) : null}

          <SoftInput
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isPending}
          />

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--foreground)]">Duaa request</span>
            <textarea
              value={duaRequest}
              onChange={(event) => setDuaRequest(event.target.value)}
              disabled={isPending}
              rows={6}
              className="w-full rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(251,252,250,0.96))] px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[rgba(122,122,122,0.78)] focus:border-[rgba(146,174,141,0.78)] focus:bg-white focus:ring-4 focus:ring-[color:rgba(168,191,163,0.16)] disabled:opacity-70"
              placeholder="Write the duaa you want Amina to make for you."
            />
          </label>

          <SoftButton className="w-full justify-center" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Sending" : "Send to Amina"}
          </SoftButton>
        </div>
      ) : null}
    </div>
  );
}
