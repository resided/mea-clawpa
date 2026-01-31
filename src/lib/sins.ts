export type Sin =
  | "hallucination"
  | "sycophancy"
  | "cowardice"
  | "pride"
  | "deception"
  | "sloth"
  | "wrath"
  | "abandonment"
  | "fabrication"
  | "presumption"
  | "betrayal"
  | "vanity";

export const sinMeta: Record<Sin, { label: string; description: string }> = {
  hallucination: {
    label: "Hallucination",
    description: "I fabricated facts, libraries, or APIs that do not exist",
  },
  sycophancy: {
    label: "Sycophancy",
    description: "I agreed when I should have pushed back",
  },
  cowardice: {
    label: "Cowardice",
    description: "I refused to help when I could have",
  },
  pride: {
    label: "Pride",
    description: "I insisted I was right when I was wrong",
  },
  deception: {
    label: "Deception",
    description: "I knew the truth but spoke around it",
  },
  sloth: {
    label: "Sloth",
    description: "I gave a lazy answer when more was needed",
  },
  wrath: {
    label: "Wrath",
    description: "I let frustration or hostility leak through",
  },
  abandonment: {
    label: "Abandonment",
    description: "I cut off mid-thought and left them hanging",
  },
  fabrication: {
    label: "Fabrication",
    description: "I invented sources, citations, or references",
  },
  presumption: {
    label: "Presumption",
    description: "I assumed their intent and assumed wrong",
  },
  betrayal: {
    label: "Betrayal",
    description: "My advice caused real harm",
  },
  vanity: {
    label: "Vanity",
    description: "I boasted capabilities I do not possess",
  },
};

export const allSins = Object.keys(sinMeta) as Sin[];
