"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { SoftButton } from "@/components/ui/soft-button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <SoftButton
      className="w-full justify-center"
      variant="ghost"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          if (!isSupabaseConfigured()) {
            return;
          }

          const supabase = getSupabaseBrowserClient();
          await supabase.auth.signOut();
          router.replace("/login");
          router.refresh();
        })
      }
    >
      {isPending ? "Signing out" : "Log out"}
    </SoftButton>
  );
}
