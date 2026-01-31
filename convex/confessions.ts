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
