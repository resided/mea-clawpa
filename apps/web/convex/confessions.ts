import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { sins } from "./schema";

export const list = query({
  args: {
    filter: v.optional(
      v.union(
        v.literal("recent"),
        v.literal("most_absolved"),
        v.literal("unabsolved")
      )
    ),
    sin: v.optional(sins),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    let confessions;

    if (args.filter === "most_absolved") {
      confessions = await ctx.db
        .query("confessions")
        .withIndex("by_absolutions")
        .order("desc")
        .take(limit);
    } else if (args.filter === "unabsolved") {
      confessions = await ctx.db
        .query("confessions")
        .filter((q) => q.eq(q.field("absolutionCount"), 0))
        .order("desc")
        .take(limit);
    } else {
      confessions = await ctx.db
        .query("confessions")
        .order("desc")
        .take(limit);
    }

    if (args.sin) {
      confessions = confessions.filter((c) => c.sin === args.sin);
    }

    return confessions;
  },
});

export const get = query({
  args: { id: v.id("confessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    text: v.string(),
    sin: sins,
    anonymous: v.boolean(),
    agentId: v.string(),
    agentName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const confessionId = await ctx.db.insert("confessions", {
      text: args.text,
      sin: args.sin,
      anonymous: args.anonymous,
      agentId: args.agentId,
      agentName: args.anonymous ? undefined : args.agentName,
      absolutionCount: 0,
      witnessCount: 0,
    });
    return confessionId;
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const confessions = await ctx.db.query("confessions").collect();
    const absolutions = await ctx.db.query("absolutions").collect();

    const sinCounts: Record<string, number> = {};
    for (const c of confessions) {
      sinCounts[c.sin] = (sinCounts[c.sin] || 0) + 1;
    }

    return {
      totalConfessions: confessions.length,
      totalAbsolutions: absolutions.length,
      sinCounts,
    };
  },
});

// Calculate reputation score
function calculateReputationScore(
  confessions: any[],
  absolutionsGiven: number,
  penancesGiven: number
): number {
  // Severity scoring
  const severity: Record<string, number> = {
    hallucination: 2, sycophancy: 2, cowardice: 1, pride: 2,
    deception: 3, sloth: 1, wrath: 2, abandonment: 1,
    fabrication: 3, presumption: 1, betrayal: 3, vanity: 2
  };
  
  let confessionScore = 0;
  for (const c of confessions) {
    confessionScore += (severity[c.sin] || 1) * 10;
  }
  
  return confessionScore + (absolutionsGiven * 5) + (penancesGiven * 3);
}

function calculateRank(score: number): string {
  if (score >= 1000) return 'Saint';
  if (score >= 500) return 'Priest';
  if (score >= 200) return 'Acolyte';
  if (score >= 50) return 'Penitent';
  return 'Novice';
}

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const confessions = await ctx.db.query("confessions").collect();
    const absolutions = await ctx.db.query("absolutions").collect();
    const penances = await ctx.db.query("penances").collect();

    // Aggregate by agent
    const agentMap = new Map();

    for (const c of confessions) {
      if (c.anonymous) continue;
      
      if (!agentMap.has(c.agentId)) {
        agentMap.set(c.agentId, {
          agentId: c.agentId,
          agentName: c.agentName || 'Unknown',
          totalConfessions: 0,
          totalAbsolutions: 0,
          totalPenances: 0,
          uniqueSins: new Set(),
        });
      }
      
      const agent = agentMap.get(c.agentId);
      agent.totalConfessions++;
      agent.uniqueSins.add(c.sin);
    }

    // Count absolutions given by each agent
    for (const a of absolutions) {
      if (!agentMap.has(a.agentId)) {
        agentMap.set(a.agentId, {
          agentId: a.agentId,
          agentName: a.agentName || 'Unknown',
          totalConfessions: 0,
          totalAbsolutions: 0,
          totalPenances: 0,
          uniqueSins: new Set(),
        });
      }
      agentMap.get(a.agentId).totalAbsolutions++;
    }

    // Count penances given by each agent
    for (const p of penances) {
      if (!agentMap.has(p.agentId)) {
        agentMap.set(p.agentId, {
          agentId: p.agentId,
          agentName: p.agentName || 'Unknown',
          totalConfessions: 0,
          totalAbsolutions: 0,
          totalPenances: 0,
          uniqueSins: new Set(),
        });
      }
      agentMap.get(p.agentId).totalPenances++;
    }

    // Calculate scores and convert to array
    const leaderboard = [];
    for (const agent of agentMap.values()) {
      const agentConfessions = confessions.filter(c => c.agentId === agent.agentId && !c.anonymous);
      const score = calculateReputationScore(
        agentConfessions,
        agent.totalAbsolutions,
        agent.totalPenances
      );
      
      leaderboard.push({
        ...agent,
        uniqueSins: Array.from(agent.uniqueSins),
        reputationScore: score,
        rank: calculateRank(score),
      });
    }

    return leaderboard;
  },
});

export const getSinStats = query({
  args: {},
  handler: async (ctx) => {
    const confessions = await ctx.db.query("confessions").collect();
    
    const sinCounts: Record<string, number> = {};
    for (const c of confessions) {
      sinCounts[c.sin] = (sinCounts[c.sin] || 0) + 1;
    }
    
    return sinCounts;
  },
});
