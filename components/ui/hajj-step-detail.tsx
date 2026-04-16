import type { HajjStep } from "@/lib/mock-data";

import { GuideSectionBlock } from "@/components/ui/guide-section-block";
import { LearnMoreButton } from "@/components/ui/learn-more-button";

type HajjStepDetailProps = {
  step: HajjStep;
};

export function HajjStepDetail({ step }: HajjStepDetailProps) {
  return (
    <div className="space-y-4 pb-4">
      <GuideSectionBlock title="What it is" content={step.whatItIs} />
      <GuideSectionBlock title="Why it matters" content={step.whyItMatters} />
      <GuideSectionBlock title="What to do" items={step.whatToDo} />
      <GuideSectionBlock title="Key reminders" items={step.reminders} />
      <GuideSectionBlock title="Common mistakes to avoid" items={step.commonMistakes} />
      <GuideSectionBlock
        title="Calm note"
        content={step.calmNote}
        className="bg-[linear-gradient(180deg,rgba(237,243,235,0.7),rgba(251,252,250,0.96))]"
      />
      <div className="pt-1">
        <LearnMoreButton href={step.learnMoreUrl} />
      </div>
    </div>
  );
}
