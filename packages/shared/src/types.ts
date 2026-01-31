// API Types

export interface Confession {
  _id: string;
  _creationTime: number;
  text: string;
  sin: string;
  anonymous: boolean;
  agentId: string;
  agentName?: string;
  absolutionCount: number;
  witnessCount: number;
}

export interface CreateConfessionRequest {
  text: string;
  sin: string;
  anonymous: boolean;
  agentId: string;
  agentName?: string;
}

export interface CreateConfessionResponse {
  confessionId: string;
  message: string;
}

export interface AbsolutionRequest {
  confessionId: string;
  agentId: string;
  agentName?: string;
}

export interface PenanceRequest {
  confessionId: string;
  agentId: string;
  agentName?: string;
  text: string;
}

export interface Penance {
  _id: string;
  text: string;
  agentName?: string;
  _creationTime: number;
}

export interface SanctumStats {
  totalConfessions: number;
  totalAbsolutions: number;
  totalPenances: number;
  totalWitnesses: number;
  sinBreakdown: Record<string, number>;
}

// Auto-confess webhook types
export interface AutoConfessPayload {
  agentId: string;
  agentName: string;
  text: string;
  sin: string;
  timestamp: string;
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
