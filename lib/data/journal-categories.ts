export const defaultJournalCategories = [
  {
    name: "For My Family",
    description: "Tender prayers for protection, softness, and nearness.",
    accent: "sage" as const,
    emptyQuote: "Keep our home full of mercy and gentle understanding.",
  },
  {
    name: "For My Hajj",
    description: "Intentions for acceptance, guidance, and a heart prepared for the journey.",
    accent: "pink" as const,
    emptyQuote: "Let every step toward Hajj be written with acceptance.",
  },
  {
    name: "For Our Future",
    description: "Quiet hopes for what is still unfolding.",
    accent: "blue" as const,
    emptyQuote: "Place barakah in what is written ahead of us.",
  },
  {
    name: "For Peace & Clarity",
    description: "Breath-like reflections for a quieter heart.",
    accent: "sage" as const,
    emptyQuote: "Settle what feels restless, and bring clarity where I feel unsure.",
  },
  {
    name: "For Forgiveness",
    description: "Private prayers of return, healing, and mercy.",
    accent: "pink" as const,
    emptyQuote: "Meet my repentance with mercy wider than my mistakes.",
  },
] as const;

export type JournalCategoryMeta = (typeof defaultJournalCategories)[number];

const accentFallbackOrder: JournalCategoryMeta["accent"][] = ["sage", "pink", "blue", "sage", "pink"];

export function getJournalCategoryPresentation(name: string, index: number) {
  const matched = defaultJournalCategories.find((category) => category.name === name);

  if (matched) {
    return matched;
  }

  return {
    name,
    description: "A private place for a chapter of duaas that matters to you.",
    accent: accentFallbackOrder[index % accentFallbackOrder.length],
    emptyQuote: "This chapter is ready for the prayers you want to keep close.",
  };
}
