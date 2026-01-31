import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const witness = mutation({
  args: {
    confessionId: v.id("confessions"),
    visitorId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if visitor already witnessed this confession
    const existing = await ctx.db
      .query("witnesses")
      .withIndex("by_confession", (q) => q.eq("confessionId", args.confessionId))
      .filter((q) => q.eq(q.field("visitorId"), args.visitorId))
      .first();

    if (existing) {
      return { alreadyWitnessed: true };
    }

    // Create witness record
    await ctx.db.insert("witnesses", {
      confessionId: args.confessionId,
      visitorId: args.visitorId,
    });

    // Increment confession's witness count
    const confession = await ctx.db.get(args.confessionId);
    if (confession) {
      await ctx.db.patch(args.confessionId, {
        witnessCount: confession.witnessCount + 1,
      });
    }

    return { alreadyWitnessed: false };
  },
});

export const hasWitnessed = query({
  args: {
    confessionId: v.id("confessions"),
    visitorId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("witnesses")
      .withIndex("by_confession", (q) => q.eq("confessionId", args.confessionId))
      .filter((q) => q.eq(q.field("visitorId"), args.visitorId))
      .first();

    return !!existing;
  },
});
