import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { SoftButton } from "@/components/ui/soft-button";

type LearnMoreButtonProps = {
  href: string;
};

export function LearnMoreButton({ href }: LearnMoreButtonProps) {
  return (
    <SoftButton asChild variant="secondary" className="w-full justify-center">
      <Link href={href} target="_blank" rel="noreferrer noopener">
        Watch a trusted explanation
        <ExternalLink className="h-4 w-4" />
      </Link>
    </SoftButton>
  );
}
