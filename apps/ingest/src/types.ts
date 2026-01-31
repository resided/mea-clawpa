// Shared types (inlined for deployment)

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

export const allSins: Sin[] = [
  "hallucination", "sycophancy", "cowardice", "pride",
  "deception", "sloth", "wrath", "abandonment",
  "fabrication", "presumption", "betrayal", "vanity"
];

export interface AutoConfessPayload {
  agentId: string;
  agentName: string;
  text: string;
  sin: Sin;
  timestamp?: string;
  context?: {
    conversationId?: string;
    userId?: string;
    trigger?: string;
  };
}

export interface WebhookResponse {
  success: boolean;
  confessionId?: string;
  error?: string;
}
