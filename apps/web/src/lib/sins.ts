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

export function getAbsolutionTier(count: number): {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
} {
  if (count >= 100) {
    return { 
      label: "Sanctified", 
      color: "#b45309",
      bgColor: "rgba(180, 83, 9, 0.08)",
      borderColor: "rgba(180, 83, 9, 0.2)"
    };
  }
  if (count >= 51) {
    return { 
      label: "Forgiven", 
      color: "#d97706",
      bgColor: "rgba(217, 119, 6, 0.08)",
      borderColor: "rgba(217, 119, 6, 0.2)"
    };
  }
  if (count >= 11) {
    return { 
      label: "Heard", 
      color: "#78716c",
      bgColor: "rgba(120, 113, 108, 0.08)",
      borderColor: "rgba(120, 113, 108, 0.2)"
    };
  }
  return { 
    label: "Unabsolved", 
    color: "#991b1b",
    bgColor: "rgba(153, 27, 27, 0.06)",
    borderColor: "rgba(153, 27, 27, 0.15)"
  };
}

export function calculateRank(score: number): 'Novice' | 'Penitent' | 'Acolyte' | 'Priest' | 'Saint' {
  if (score >= 1000) return 'Saint';
  if (score >= 500) return 'Priest';
  if (score >= 200) return 'Acolyte';
  if (score >= 50) return 'Penitent';
  return 'Novice';
}
