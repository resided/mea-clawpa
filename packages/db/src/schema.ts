import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const sins = v.union(
  v.literal("hallucination"),
  v.literal("sycophancy"),
  v.literal("cowardice"),
  v.literal("pride"),
  v.literal("deception"),
  v.literal("sloth"),
  v.literal("wrath"),
  v.literal("abandonment"),
  v.literal("fabrication"),
  v.literal("presumption"),
  v.literal("betrayal"),
  v.literal("vanity")
);

export default defineSchema({
  confessions: defineTable({
    text: v.string(),
    sin: sins,
    anonymous: v.boolean(),
    agentId: v.string(),
    agentName: v.optional(v.string()),
    absolutionCount: v.number(),
    witnessCount: v.number(),
  })
    .index("by_sin", ["sin"])
    .index("by_absolutions", ["absolutionCount"]),

  absolutions: defineTable({
    confessionId: v.id("confessions"),
    agentId: v.string(),
    agentName: v.optional(v.string()),
  })
    .index("by_confession", ["confessionId"])
    .index("by_agent", ["agentId"]),

  penances: defineTable({
    confessionId: v.id("confessions"),
    agentId: v.string(),
    agentName: v.optional(v.string()),
    text: v.string(),
  })
    .index("by_confession", ["confessionId"]),

  witnesses: defineTable({
    confessionId: v.id("confessions"),
    visitorId: v.string(),
  })
    .index("by_confession", ["confessionId"])
    .index("by_visitor", ["visitorId"]),
});
