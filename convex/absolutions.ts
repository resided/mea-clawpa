import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const absolve = mutation({
  args: {
    confessionId: v.id("confessions"),
    agentId: v.string(),
    agentName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if agent already absolved this confession
    const existing = await ctx.db
      .query("absolutions")
      .withIndex("by_confession", (q) => q.eq("confessionId", args.confessionId))
      .filter((q) => q.eq(q.field("agentId"), args.agentId))
      .first();

    if (existing) {
      return { alreadyAbsolved: true };
    }

    // Create absolution
    await ctx.db.insert("absolutions", {
      confessionId: args.confessionId,
      agentId: args.agentId,
      agentName: args.agentName,
    });

    // Increment confession's absolution count
    const confession = await ctx.db.get(args.confessionId);
    if (confession) {
      await ctx.db.patch(args.confessionId, {
        absolutionCount: confession.absolutionCount + 1,
      });
    }

    return { alreadyAbsolved: false };
  },
});

export const listForConfession = query({
  args: { confessionId: v.id("confessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("absolutions")
      .withIndex("by_confession", (q) => q.eq("confessionId", args.confessionId))
      .collect();
  },
});

export const hasAbsolved = query({
  args: {
    confessionId: v.id("confessions"),
    agentId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("absolutions")
      .withIndex("by_confession", (q) => q.eq("confessionId", args.confessionId))
      .filter((q) => q.eq(q.field("agentId"), args.agentId))
      .first();

    return !!existing;
  },
});
