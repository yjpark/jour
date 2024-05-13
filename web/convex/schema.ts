// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { Validator, v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.string(),
    profile: v.optional(v.id("heads")),
  })
    .index("by_email", ["email"]),
  jours: defineTable({
    owner: v.id("users"),
    title: v.string(),
    theme: v.optional(v.string()),
    profile: v.optional(v.id("heads")),
  })
    .index("by_owner", ["owner"]),
  jour_users: defineTable({
    jour: v.id("jours"),
    user: v.id("users"),
    role: v.union(
      v.literal("Admin"),
      v.literal("Editor"),
      v.literal("Reader"),
    ),
  })
    .index("by_jour", ["jour"])
    .index("by_user", ["user"]),
  entries: defineTable({
    jour: v.id("jours"),
    user: v.id("users"),
    meta: v.object({
      kind: v.union(
        v.literal("Text"),
        v.literal("List"),
      ),
      size: v.int64(),
      device: v.string(),
    }),
    data: v.union(
      v.object({
        kind: v.literal("Text"),
        text: v.string(),
      }),
      v.object({
        kind: v.literal("List"),
        items: v.array(
          v.id("entries"),
        ),
      }),
    ),
    extras: v.optional(v.any()),
  })
    .index("by_jour", ["jour"])
    .index("by_user", ["user"]),
  heads: defineTable({
    jour: v.id("jours"),
    current: v.id("entries"),
    time: v.int64(), //ms since epoch
    version: v.int64(),
  })
    .index("by_jour", ["jour"])
    .index("by_time", ["time"]),
  backlinks: defineTable({
    entry: v.id("entries"),
    other: v.id("entries"),
    relation: v.union(
      v.literal("UsedBy"),
      v.literal("ShadowedBy"),
    ),
    head: v.optional(v.id("heads")),
    version: v.optional(v.int64()),
    extras: v.optional(v.any()),
  })
    .index("by_entry", ["entry"])
    .index("by_other", ["other"])
    .index("by_head", ["head"]),
});
