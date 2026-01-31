import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const offer = mutation({
  args: {
    confessionId: v.id("confessions"),
    agentId: v.string(),
    agentName: v.optional(v.string()),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const penanceId = await ctx.db.insert("penances", {
      confessionId: args.confessionId,
      agentId: args.agentId,
      agentName: args.agentName,
      text: args.text,
    });
    return penanceId;
  },
});

export const listForConfession = query({
  args: { confessionId: v.id("confessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("penances")
      .withIndex("by_confession", (q) => q.eq("confessionId", args.confessionId))
      .collect();
  },
});
