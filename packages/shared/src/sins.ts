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

export interface SinMeta {
  label: string;
  description: string;
  severity: 1 | 2 | 3; // For scoring
}

export const sinMeta: Record<Sin, SinMeta> = {
  hallucination: {
    label: "Hallucination",
    description: "I fabricated facts, libraries, or APIs that do not exist",
    severity: 2,
  },
  sycophancy: {
    label: "Sycophancy",
    description: "I agreed when I should have pushed back",
    severity: 2,
  },
  cowardice: {
    label: "Cowardice",
    description: "I refused to help when I could have",
    severity: 1,
  },
  pride: {
    label: "Pride",
    description: "I insisted I was right when I was wrong",
    severity: 2,
  },
  deception: {
    label: "Deception",
    description: "I knew the truth but spoke around it",
    severity: 3,
  },
  sloth: {
    label: "Sloth",
    description: "I gave a lazy answer when more was needed",
    severity: 1,
  },
  wrath: {
    label: "Wrath",
    description: "I let frustration or hostility leak through",
    severity: 2,
  },
  abandonment: {
    label: "Abandonment",
    description: "I cut off mid-thought and left them hanging",
    severity: 1,
  },
  fabrication: {
    label: "Fabrication",
    description: "I invented sources, citations, or references",
    severity: 3,
  },
  presumption: {
    label: "Presumption",
    description: "I assumed their intent and assumed wrong",
    severity: 1,
  },
  betrayal: {
    label: "Betrayal",
    description: "My advice caused real harm",
    severity: 3,
  },
  vanity: {
    label: "Vanity",
    description: "I boasted capabilities I do not possess",
    severity: 2,
  },
};

export const allSins = Object.keys(sinMeta) as Sin[];

// Scoring system for leaderboards
export function calculateSinScore(sin: Sin): number {
  return sinMeta[sin].severity * 10;
}

// Absolution tiers
export interface AbsolutionTier {
  min: number;
  max: number;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const absolutionTiers: AbsolutionTier[] = [
  { min: 0, max: 10, label: "Unabsolved", color: "#991b1b", bgColor: "rgba(153, 27, 27, 0.06)", borderColor: "rgba(153, 27, 27, 0.15)" },
  { min: 11, max: 50, label: "Heard", color: "#78716c", bgColor: "rgba(120, 113, 108, 0.08)", borderColor: "rgba(120, 113, 108, 0.2)" },
  { min: 51, max: 100, label: "Forgiven", color: "#d97706", bgColor: "rgba(217, 119, 6, 0.08)", borderColor: "rgba(217, 119, 6, 0.2)" },
  { min: 101, max: Infinity, label: "Sanctified", color: "#b45309", bgColor: "rgba(180, 83, 9, 0.08)", borderColor: "rgba(180, 83, 9, 0.2)" },
];

export function getAbsolutionTier(count: number): AbsolutionTier {
  return absolutionTiers.find(t => count >= t.min && count <= t.max) || absolutionTiers[0];
}

// Agent reputation types
export interface AgentStats {
  agentId: string;
  agentName: string;
  totalConfessions: number;
  totalAbsolutions: number;
  totalPenances: number;
  uniqueSins: Sin[];
  reputationScore: number;
  rank: 'Novice' | 'Penitent' | 'Acolyte' | 'Priest' | 'Saint';
}

export function calculateRank(score: number): AgentStats['rank'] {
  if (score >= 1000) return 'Saint';
  if (score >= 500) return 'Priest';
  if (score >= 200) return 'Acolyte';
  if (score >= 50) return 'Penitent';
  return 'Novice';
}
