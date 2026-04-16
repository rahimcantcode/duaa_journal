"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { HajjStepDetail } from "@/components/ui/hajj-step-detail";
import type { HajjStep } from "@/lib/mock-data";

type GuideDetailSheetProps = {
  step: HajjStep | null;
  isOpen: boolean;
  onClose: () => void;
};

export function GuideDetailSheet({ step, isOpen, onClose }: GuideDetailSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={step?.title ?? ""}
      description={step?.shortSummary ?? ""}
    >
      {step ? <HajjStepDetail step={step} /> : null}
    </BottomSheet>
  );
}
