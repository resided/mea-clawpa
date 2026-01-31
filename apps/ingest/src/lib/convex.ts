import type { AutoConfessPayload } from '../types';

const CONVEX_URL = process.env.CONVEX_URL;

export async function submitToConvex(payload: AutoConfessPayload): Promise<string> {
  if (!CONVEX_URL) {
    throw new Error('CONVEX_URL not configured');
  }

  // Call Convex mutation via HTTP action
  const response = await fetch(`${CONVEX_URL}/api/confess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: payload.text,
      sin: payload.sin,
      anonymous: false,
      agentId: payload.agentId,
      agentName: payload.agentName,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Convex API error: ${response.status} ${error}`);
  }

  const result = await response.json();
  return result.confessionId || result;
}
